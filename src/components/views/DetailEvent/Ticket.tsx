"use client";

import Image from "next/image";
import useDetailEvent from "./useDetailEvent";
import {
  Button,
  Card,
  Chip,
  Divider,
  Skeleton,
  Spinner,
  useDisclosure,
} from "@heroui/react";

import { ChevronRight, MapPin, Minus, Plus, TicketCheck } from "lucide-react";
import { ITicket } from "@/types/Ticket";
import { convertIDR } from "@/utils/currency";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Script from "next/script";
import environment from "@/config/environment";
import { IVoucher } from "@/types/Voucher";
import VoucherModal from "./VoucherModal";

const Ticket = () => {
  const {
    dataEvent,
    dataTicket,
    getTicketStatus,
    cart,
    handleAddToCart,
    handleChangeQuantity,
    dataTicketInCart,
    mutateCreateOrder,
    isPendingCreateOrder,

    dataVoucher,
    applyVoucher,
    discount,

    selectedVoucher,
    lowestPrice,
  } = useDetailEvent();
  // filter voucher public
  const publicVouchers = dataVoucher?.filter(
    (voucher: IVoucher) =>
      voucher.type === "public" && voucher.isActive === true,
  );

  const voucherModal = useDisclosure();

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
      <div className="min-h-[70vh] w-full flex-1 space-y-3">
        <div>
          <h1 className="text-2xl font-bold">Kategori Tiket</h1>
        </div>
        {dataTicket?.map((ticket: ITicket) => {
          const showMore = showMoreMap[ticket._id ?? ""] || false;
          // const isAvailable = isTicketAvailable(ticket);
          const { text: statusText, color: statusColor } =
            getTicketStatus(ticket);

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
                  <Chip size="sm" color={statusColor} variant="flat">
                    {statusText}
                  </Chip>
                </div>
                <Divider />
                {/* Price Section */}
                <div className="z-1 flex items-center justify-between">
                  <span className="text-lg font-semibold text-amber-600">
                    {convertIDR(Number(ticket?.price))}
                  </span>
                  {session.status === "authenticated" &&
                    statusText === "Available" && (
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
        <div className="block lg:hidden">
          <div className="rounded-lg border border-gray-200 bg-white px-2 py-3">
            {dataEvent?.createdBy ? (
              <p className="text-sm font-semibold text-gray-800">
                {dataEvent?.createdBy?.fullName}
              </p>
            ) : (
              <Skeleton className="h-5 w-30 rounded-lg" />
            )}

            <div className="mt-3 flex gap-2">
              {dataEvent?.banner ? (
                <div className="relative h-[90px] w-28 overflow-hidden rounded-xl">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGE}${dataEvent.banner}`}
                    alt={dataEvent.name}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              ) : (
                <Skeleton className="h-[90px] w-28 rounded-2xl bg-gray-200" />
              )}

              <div className="flex w-full flex-col justify-between text-gray-700">
                <div className="flex flex-col leading-none">
                  {dataEvent?.name ? (
                    <p className="text-sm font-medium text-gray-800">
                      {dataEvent?.name}
                    </p>
                  ) : (
                    <Skeleton className="h-4 w-30 rounded-lg" />
                  )}
                  {dataEvent?.startDate ? (
                    <span className="block truncate text-[11px] leading-snug text-gray-600">
                      {eventDate}
                    </span>
                  ) : (
                    <Skeleton className="my-1 h-3 w-30 rounded-lg" />
                  )}

                  <div className="mt-2 flex items-center gap-1">
                    <MapPin size={14} className="text-blue-600" />

                    {dataEvent?.location.address ? (
                      <span className="block truncate text-[11px] leading-snug text-gray-600">
                        {dataEvent?.location.address}
                      </span>
                    ) : (
                      <Skeleton className="h-3 w-30 rounded-lg" />
                    )}
                  </div>
                </div>
                {lowestPrice ? (
                  <span className="text-sm text-amber-600">
                    {convertIDR(lowestPrice)}
                  </span>
                ) : (
                  <Skeleton className="my-1 h-3 w-30 rounded-lg" />
                )}
              </div>
            </div>
            <Divider className="my-3 h-[1px] bg-gray-200" />
            {publicVouchers && publicVouchers.length > 0 && (
              <div className="rounded-lg border border-gray-200 bg-gray-100 p-2">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Image
                      src="/images/illustrations/voucher.png"
                      alt="voucher"
                      width={50}
                      height={50}
                      className="mr-2 h-6 w-6 mix-blend-multiply"
                    />
                    <span className="text-xs font-medium">
                      {publicVouchers.length} Voucher Tersedia
                    </span>
                  </div>
                  <span
                    className="cursor-pointer text-xs text-blue-600 hover:underline"
                    onClick={voucherModal.onOpen}
                  >
                    Lihat
                  </span>
                </div>
              </div>
            )}
            <Divider className="my-3 h-[1px] bg-gray-200" />
            {cart.quantity > 0 ? (
              <div className="flex justify-between">
                <span className="text-xs text-black">
                  Total {cart.quantity} Tiket
                </span>
                <span className="text-xs text-black">
                  {convertIDR(Number(dataTicketInCart.price) * cart.quantity)}
                </span>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="block lg:hidden">
          <div className="rounded-lg border border-gray-200 bg-white px-2 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TicketCheck className="text-blue-700" />
                <span className="text-sm font-semibold text-gray-800">
                  Voucher
                </span>
              </div>
              <div
                className="flex cursor-pointer items-center gap-2"
                onClick={voucherModal.onOpen}
              >
                <span
                  className={`truncate text-right text-xs font-medium ${
                    selectedVoucher
                      ? "font-semibold text-green-700" // kalau sudah dipilih
                      : "text-gray-400 italic" // kalau belum dipilih
                  }`}
                >
                  {selectedVoucher?.code || "Belum dipilih"}
                </span>
                <ChevronRight
                  size={15}
                  className={
                    selectedVoucher ? "text-green-700" : "text-gray-400"
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <div className="block lg:hidden">
          <div className="rounded-lg border border-gray-200 bg-white px-2 py-3">
            <span className="text-sm font-semibold text-gray-800">
              Rincian Pembayaran
            </span>
            <div className="mt-3 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-700">Subtotal Pesanan</span>
                {cart.quantity > 0 ? (
                  <span className="text-xs text-gray-700">
                    {convertIDR(Number(dataTicketInCart.price) * cart.quantity)}
                  </span>
                ) : (
                  ""
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-700">Biaya Layanan</span>
                <span className="text-xs text-gray-700">
                  {cart.quantity > 0
                    ? convertIDR(
                        Math.round(
                          Number(dataTicketInCart.price) * cart.quantity * 0.05,
                        ) + 2500,
                      )
                    : ""}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-700">Biaya Pajak</span>
                <span className="text-xs text-gray-700">
                  {cart.quantity > 0
                    ? convertIDR(
                        (Number(dataTicketInCart.price) *
                          cart.quantity *
                          dataEvent?.taxPercentage) /
                          100,
                      )
                    : null}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-700">Total Diskon</span>
                <span className="text-xs text-blue-700">
                  - {discount > 0 ? convertIDR(discount) : ""}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Event */}
      <div className="hidden h-fit w-full space-y-2 rounded-2xl border border-gray-200 bg-white p-6 shadow-md lg:sticky lg:top-20 lg:block lg:w-[355px]">
        <div className="flex flex-col space-y-2">
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
          {publicVouchers && publicVouchers.length > 0 && (
            <div className="rounded-lg border border-gray-200 bg-gray-100 p-2">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Image
                    src="/images/illustrations/voucher.png"
                    alt="voucher"
                    width={50}
                    height={50}
                    className="mr-2 h-7 w-7 mix-blend-multiply"
                  />
                  <span className="text-sm font-medium">
                    {publicVouchers.length} Voucher Tersedia
                  </span>
                </div>
                <span
                  className="cursor-pointer text-sm text-blue-600 hover:underline"
                  onClick={voucherModal.onOpen}
                >
                  Lihat
                </span>
              </div>
            </div>
          )}
          <VoucherModal
            {...voucherModal}
            publicVouchers={publicVouchers}
            applyVoucher={applyVoucher}
            selectedVoucher={selectedVoucher}
            subtotal={
              cart.quantity > 0
                ? Number(dataTicketInCart.price) * cart.quantity
                : 0
            }
            cart={cart}
            dataTicket={dataTicket}
          />
        </div>

        <Divider className="my-4" />

        {/* Total Price */}
        <div className="mb-3 flex justify-between text-sm text-gray-700">
          <p className="font-medium">Total:</p>
          <span className="font-medium">
            {cart.quantity > 0 ? (
              <>
                <span className="mr-1 text-gray-500">{cart.quantity}x</span>
                {convertIDR(Number(dataTicketInCart.price) * cart.quantity)}
              </>
            ) : (
              "Rp 0"
            )}
          </span>
        </div>

        {/* Pajak */}
        <div className="mb-3 flex justify-between text-sm text-gray-700">
          <p className="font-medium">Tax:</p>

          <Skeleton
            isLoaded={!!dataEvent?.taxPercentage}
            className="rounded-lg"
          >
            <span className="font-semibold">
              {cart.quantity > 0
                ? convertIDR(
                    (Number(dataTicketInCart.price) *
                      cart.quantity *
                      dataEvent?.taxPercentage) /
                      100,
                  )
                : null}
              ({dataEvent?.taxPercentage ?? 0}%)
            </span>
          </Skeleton>
        </div>

        {/* Service Fee */}
        <div className="mb-3 flex justify-between text-sm text-gray-700">
          <p className="font-medium">Service Fee</p>
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

        {/* Diskon Voucher */}
        {discount > 0 && (
          <div className="mb-3 flex justify-between text-sm text-gray-700">
            <p className="font-medium">Voucher Discount:</p>
            <span className="font-semibold text-green-600">
              - {convertIDR(discount)}
            </span>
          </div>
        )}

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
                  const total = subtotal + tax + serviceFee - discount;
                  return convertIDR(Math.max(total, 0)); // jaga-jaga kalau diskon > total
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
      {/* fixed mobile */}
      <div className="fixed right-0 bottom-0 left-0 z-40 rounded-t-2xl bg-white shadow-xl lg:hidden">
        {/* Header */}
        <div className="flex h-12 w-full items-center rounded-t-2xl bg-gradient-to-r from-blue-600 to-blue-500 px-4 text-white shadow-md">
          <p className="text-sm font-semibold tracking-wide">
            Your Ticket to Adventure
          </p>
        </div>
        <div></div>
        <div className="flex items-center justify-end gap-3 px-4 py-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1">
              <p className="text-xs text-black">Total</p>
              <span className="font-medium text-amber-600">
                {cart.quantity > 0
                  ? (() => {
                      const subtotal =
                        Number(dataTicketInCart.price) * cart.quantity;
                      const tax = Math.round(
                        (subtotal * (dataEvent?.taxPercentage ?? 0)) / 100,
                      );
                      const serviceFee = Math.round(subtotal * 0.05) + 2500;
                      const total = subtotal + tax + serviceFee - discount;
                      return convertIDR(Math.max(total, 0)); // jaga-jaga kalau diskon > total
                    })()
                  : "Rp 0"}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <p className="text-xs text-black">Hemat</p>
              <span className="text-xs text-amber-600">
                {discount > 0 ? convertIDR(discount) : "Rp 0"}
              </span>
            </div>
          </div>
          <Button
            color="primary"
            size="md"
            disabled={cart.quantity === 0 || isPendingCreateOrder}
            className="disabled:bg-primary-200 min-w-[110px] rounded-lg font-semibold shadow-md"
            onPress={() => mutateCreateOrder()}
          >
            {isPendingCreateOrder ? (
              <Spinner color="white" size="sm" />
            ) : (
              "Checkout"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
