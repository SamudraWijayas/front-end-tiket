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
    <div className="mx-auto my-8 flex w-full max-w-6xl flex-col justify-center gap-8 px-4 lg:flex-row lg:px-0">
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
                  <span className="text-lg font-semibold text-black">
                    {convertIDR(Number(ticket?.price))}
                  </span>
                  {session.status === "authenticated" &&
                    Number(ticket.quantity) > 0 && (
                      <>
                        {cart.ticket === ticket._id ? (
                          <div className="flex items-center gap-2">
                            {/* <button
                              onClick={() => handleChangeQuantity("decrement")}
                              className="rounded-sm border p-2 hover:bg-gray-100 disabled:opacity-40"
                              disabled={cart.quantity <= 1}
                            >
                              <Minus size={16} />
                            </button> */}
                            <button
                              onClick={() => {
                                if (cart.quantity === 1) {
                                  // Reset cart, biar balik ke Add To Cart
                                  handleAddToCart("");
                                } else {
                                  handleChangeQuantity("decrement");
                                }
                              }}
                              className="rounded-sm border p-2 hover:bg-gray-100"
                            >
                              <Minus size={16} />
                            </button>

                            <span className="text-md w-6 text-center font-bold">
                              {cart.quantity}
                            </span>
                            <button
                              onClick={() => handleChangeQuantity("increment")}
                              className="rounded-sm border p-2 hover:bg-gray-100"
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
      <div className="h-fit w-full space-y-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-md lg:sticky lg:top-20 lg:w-[355px]">
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
        <div className="flex items-center justify-between text-sm text-gray-700">
          <p className="font-semibold">Total:</p>
          <span className="font-bold">
            {cart.quantity > 0
              ? convertIDR(Number(dataTicketInCart.price) * cart.quantity)
              : "Rp 0"}
          </span>
        </div>
        <Divider />
        <Button
          fullWidth
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
  );
};

export default Ticket;
