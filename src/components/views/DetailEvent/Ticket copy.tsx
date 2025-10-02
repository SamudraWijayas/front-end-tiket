"use client";

import Image from "next/image";
import useDetailEvent from "./useDetailEvent";
import { Button, Card, Chip, Divider, Skeleton, Spinner } from "@heroui/react";

import { useRouter } from "next/router";
import { Minus, Plus } from "lucide-react";
import { ITicket } from "@/types/Ticket";
import { convertIDR } from "@/utils/currency";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Script from "next/script";
import environment from "@/config/environment";

const Ticket = () => {
  const {
    dataEvent,
    dataTicket,
    cart,
    handleAddToCart,
    handleChangeQuantity,
    dataTicketInCart,
    mutateCreateOrder,
    isPendingCreateOrder,
  } = useDetailEvent();
  const router = useRouter();
  const session = useSession();
  const [showMoreMap, setShowMoreMap] = useState<{ [key: string]: boolean }>(
    {},
  );

  const toggleShowMore = (id: string) => {
    setShowMoreMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const eventDate = dataEvent?.startDate
    ? new Date(dataEvent.startDate).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "-";

  return (
    <div className="mx-auto mt-28 mb-8 flex w-full max-w-6xl flex-col justify-center gap-8 px-4 lg:flex-row lg:px-0">
      <Script
        src={environment.MIDTRANS_SNAP_URL}
        data-client-key={environment.MIDTRANS_CLIENT_KEY}
        strategy="lazyOnload"
      />
      {/* Konten Kiri */}
      <div className="min-h-[70vh] w-full flex-1 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Kategori Tiket</h1>
        </div>
        {dataTicket?.map((ticket: ITicket) => {
          const showMore = showMoreMap[ticket._id ?? ""] || false;
          return (
            <Card
              key={ticket?._id}
              className="rounded-lg border border-gray-200 bg-white shadow-sm transition hover:shadow-lg"
            >
              <div className="flex flex-col gap-4 p-5">
                {/* Header Ticket */}
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h2 className="text-sm font-bold text-gray-900 lg:text-xl">
                      {ticket?.name}
                    </h2>
                    <div className="hidden lg:inline-block">
                      <div
                        className={`leading-relaxed whitespace-pre-line text-gray-700 ${
                          !showMore ? "line-clamp-3" : ""
                        }`}
                      >
                        {ticket?.description}
                      </div>

                      {ticket?.description && (
                        <button
                          onClick={() => toggleShowMore(ticket._id ?? "")}
                          className="mt-3 text-sm font-bold text-blue-800 transition hover:underline"
                        >
                          {showMore
                            ? "Tampilkan Lebih Sedikit"
                            : "Tampilkan Lebih Banyak"}
                        </button>
                      )}
                    </div>
                  </div>
                  {Number(ticket.quantity) > 0 ? (
                    <Chip size="sm" color="success" variant="flat">
                      Available
                    </Chip>
                  ) : (
                    <Chip size="sm" color="danger" variant="flat">
                      Sold Out
                    </Chip>
                  )}
                </div>
                <Divider />
                {/* Price Section */}
                <div className="z-1 flex items-center justify-between">
                  <span className="text-lg font-semibold text-amber-600">
                    {convertIDR(Number(ticket?.price))}
                  </span>
                  {session.status === "authenticated" &&
                    Number(ticket.quantity) > 0 && (
                      <>
                        {cart.ticket === ticket._id ? (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                if (cart.quantity === 1) {
                                  // Reset cart, biar balik ke Add To Cart
                                  handleAddToCart("");
                                } else {
                                  handleChangeQuantity("decrement");
                                }
                              }}
                              className="rounded-sm bg-gray-100 p-2 text-blue-700"
                            >
                              <Minus size={16} />
                            </button>

                            <span className="text-md w-6 text-center font-bold">
                              {cart.quantity}
                            </span>
                            <button
                              onClick={() => handleChangeQuantity("increment")}
                              className="rounded-sm bg-gray-100 p-2 text-blue-700"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        ) : (
                          <Button
                            size="sm"
                            color="primary"
                            className="rounded-lg font-semibold shadow-sm disabled:opacity-30"
                            onPress={() => handleAddToCart(`${ticket._id}`)}
                          >
                            Add To Cart
                          </Button>
                        )}
                      </>
                    )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Info Event */}
      <div className="h-fit w-full space-y-2 rounded-2xl border border-gray-200 bg-white p-6 shadow-md lg:sticky lg:top-20 lg:w-[355px]">
        <div className="flex flex-col space-y-1">
          <h1 className="text-lg font-bold">Detail Pesanan</h1>
          <Skeleton
            className="h-[200px] w-full rounded-2xl"
            isLoaded={!!dataEvent?.banner}
          >
            {dataEvent?.banner ? (
              <div className="relative h-[200px] w-full overflow-hidden rounded-xl">
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMAGE}${dataEvent.banner}`}
                  alt={dataEvent.name}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            ) : (
              <div className="h-[400px] w-full rounded-2xl bg-gray-200" />
            )}
          </Skeleton>
          <h1 className="text-lg font-bold text-gray-900">{dataEvent?.name}</h1>
          <div className="flex items-center gap-2">
            <Skeleton
              isLoaded={!!dataEvent?.startDate}
              className="w-full rounded-lg"
            >
              <span>{eventDate}</span>
            </Skeleton>
          </div>
        </div>

        <Divider className="my-4" />

        <div className="hidden lg:block">
          {/* Total Price */}
          <div className="mb-3 flex justify-between text-sm text-gray-700">
            <p className="font-medium">Total:</p>
            <span className="font-semibold">
              {cart.quantity > 0
                ? convertIDR(Number(dataTicketInCart.price) * cart.quantity)
                : "Rp 0"}
            </span>
          </div>

          {/* Pajak */}
          <div className="mb-3 flex justify-between text-sm text-gray-700">
            <p className="font-medium">Pajak:</p>

            <Skeleton
              isLoaded={!!dataEvent?.taxPercentage}
              className="rounded-lg"
            >
              <span className="font-semibold">
                {dataEvent?.taxPercentage ?? 0}%
              </span>
            </Skeleton>
          </div>

          {/* Service Fee */}
          <div className="mb-3 flex justify-between text-sm text-gray-700">
            <p className="font-medium">Service Fee:</p>
            <span className="font-semibold">
              {cart.quantity > 0
                ? convertIDR(
                    Math.round(
                      Number(dataTicketInCart.price) * cart.quantity * 0.05,
                    ) + 2500,
                  )
                : "Rp 0"}
            </span>
          </div>

          <Divider className="my-4" />

          {/* Grand Total */}
          <div className="mb-4 flex items-center justify-between text-base font-bold text-gray-900 md:text-lg">
            <p>Grand Total:</p>
            <span className="text-amber-600">
              {cart.quantity > 0
                ? (() => {
                    const subtotal =
                      Number(dataTicketInCart.price) * cart.quantity;
                    const tax = Math.round(
                      (subtotal * (dataEvent?.taxPercentage ?? 0)) / 100,
                    );
                    const serviceFee = Math.round(subtotal * 0.05) + 2500;
                    return convertIDR(subtotal + tax + serviceFee);
                  })()
                : "Rp 0"}
            </span>
          </div>

          {/* Checkout Button */}
          <Button
            fullWidth
            color="primary"
            size="md"
            disabled={cart.quantity === 0 || isPendingCreateOrder}
            className="disabled:bg-primary-200 mt-2"
            onPress={() => mutateCreateOrder()}
          >
            {isPendingCreateOrder ? <Spinner color="white" /> : "Checkout"}
          </Button>
        </div>

        <div className="fixed right-0 bottom-0 left-0 z-100 rounded-t-lg bg-white shadow-md lg:hidden lg:p-0 lg:shadow-none">
          <div className="flex h-10 w-full items-center rounded-t-lg bg-blue-600 px-4 py-6 text-white">
            <p>Your Ticket to Adventure</p>
          </div>
          {/* Total Price */}
          <div className="flex items-center justify-between p-4">
            <div className="mb-2 flex flex-col justify-between text-sm text-gray-700">
              <p className="font-semibold">Total Price</p>
              <span className="font-bold text-amber-600">
                {cart.quantity > 0
                  ? convertIDR(Number(dataTicketInCart.price) * cart.quantity)
                  : "Rp 0"}
              </span>
            </div>

            {/* Checkout Button */}
            <Button
              color="primary"
              size="md"
              disabled={cart.quantity === 0 || isPendingCreateOrder}
              className="disabled:bg-primary-200"
              onPress={() => mutateCreateOrder()}
            >
              {isPendingCreateOrder ? <Spinner color="white" /> : "Checkout"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
