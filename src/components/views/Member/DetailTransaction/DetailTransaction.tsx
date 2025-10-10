"use client";

import React, { useState } from "react";
import {
  MapPin,
  QrCode,
  Download,
  ChevronDown,
} from "lucide-react";
import { Divider, Skeleton, Card, Button } from "@heroui/react";
import { convertIDR } from "@/utils/currency";
import { convertTime } from "@/utils/date";
import useDetailTransaction from "./useDetailTransaction";
import { QRCodeSVG } from "qrcode.react";
import Script from "next/script";
import environment from "@/config/environment";
import NextImage from "next/image";

const TransactionDetailPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    dataTransaction,
    dataEvent,
    dataTicket,
    handleCancelTransaction,
    dataBarcode,
  } = useDetailTransaction();

  // Download QR code (convert SVG → high-res PNG)
  const handleDownloadQR = (id: string) => {
    const svg = document.getElementById(`qr-${id}`) as SVGSVGElement | null;
    if (!svg) return;

    const serializer = new XMLSerializer();
    const svgData = serializer.serializeToString(svg);

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    const svgBlob = new Blob([svgData], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      const scale = 2; // scale ×2 biar lebih tajam
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      ctx?.scale(scale, scale);
      ctx?.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);

      const pngUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = pngUrl;
      link.download = `barcode-${id}.png`;
      link.click();
    };

    img.src = url;
  };

  const [showToast, setShowToast] = useState(false);

  const handleCopy = () => {
    if (dataTransaction?.orderId) {
      navigator.clipboard.writeText(dataTransaction.orderId);
      setShowToast(true);

      // otomatis hilang setelah 2 detik
      setTimeout(() => setShowToast(false), 2000);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3 bg-gradient-to-b from-gray-50 to-white px-4 py-3">
      {/* Midtrans script */}
      <Script
        src={environment.MIDTRANS_SNAP_URL}
        data-client-key={environment.MIDTRANS_CLIENT_KEY}
        strategy="lazyOnload"
      />

      {/* Order Status */}
      <Card className="w-full max-w-3xl overflow-hidden rounded-lg">
        <Skeleton isLoaded={!!dataTransaction?.status}>
          <div
            className={`px-5 py-3 text-white ${
              dataTransaction?.status === "completed"
                ? "bg-[#229787]"
                : dataTransaction?.status === "pending"
                  ? "bg-yellow-700"
                  : "bg-red-700"
            }`}
          >
            <h2 className="text-lg font-semibold">
              {dataTransaction?.status === "completed"
                ? "Pesanan Selesai"
                : dataTransaction?.status === "pending"
                  ? "Menunggu Pembayaran"
                  : "Pembayaran Gagal"}
            </h2>
          </div>
        </Skeleton>

        <div className="space-y-3 p-5">
          <h1 className="text-lg font-semibold text-gray-800">Info Pesanan</h1>

          <Skeleton isLoaded={!!dataTransaction?.orderId}>
            <p className="text-sm text-gray-600">
              Invoice:{" "}
              <span className="font-semibold text-gray-900">
                {dataTransaction?.noFaktur}
              </span>
            </p>
          </Skeleton>

          <Skeleton isLoaded={!!dataTransaction?.payment?.transaction_time}>
            <p className="text-xs text-gray-500">
              {convertTime(dataTransaction?.createdAt)}
            </p>
          </Skeleton>

          <Divider className="my-2" />

          <Skeleton
            isLoaded={!!dataEvent?.location?.address}
            className="h-10 rounded-lg"
          >
            <div className="flex items-center gap-2 text-gray-700">
              <MapPin size={16} />
              <div className="flex flex-col">
                <p className="line-clamp-1 font-medium">
                  {dataEvent?.location?.address}
                </p>
                <p className="text-sm text-gray-500">
                  {dataTransaction?.createdBy?.fullName}
                </p>
              </div>
            </div>
          </Skeleton>
        </div>
      </Card>

      {/* Main Transaction Card */}
      <Card className="w-full max-w-3xl space-y-3 rounded-lg px-4 py-3">
        {dataEvent?.createdBy ? (
          <p className="text-sm font-semibold text-gray-800">
            {dataEvent?.createdBy?.fullName}
          </p>
        ) : (
          <Skeleton className="h-5 w-30 rounded-lg" />
        )}

        {/* Event Summary */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-2">
            {dataEvent?.banner ? (
              <div className="relative h-[90px] w-28 overflow-hidden rounded-xl lg:w-40">
                <NextImage
                  src={`${process.env.NEXT_PUBLIC_IMAGE}${dataEvent.banner}`}
                  alt={dataEvent.name}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            ) : (
              <Skeleton className="h-[90px] w-28 rounded-2xl bg-gray-200 lg:w-40" />
            )}
            <div className="flex w-full flex-col leading-none">
              {dataEvent?.name ? (
                <p className="text-sm font-medium text-gray-800">
                  {dataEvent?.name}
                </p>
              ) : (
                <Skeleton className="h-4 w-30 rounded-lg" />
              )}
              <div className="flex items-center justify-between">
                {dataTicket?.name ? (
                  <span className="text-xs text-gray-600">
                    {dataTicket?.name}
                  </span>
                ) : (
                  <Skeleton className="mt-1 h-4 w-30 rounded-lg" />
                )}
                {dataTransaction?.quantity ? (
                  <span className="text-xs text-gray-500">
                    x{dataTransaction?.quantity}
                  </span>
                ) : (
                  <Skeleton className="mt-1 h-3 w-30 rounded-lg" />
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2">
            <p className="text-xs text-gray-500">Total Pesanan:</p>
            {dataTransaction?.total ? (
              <span className="text-sm font-medium">
                {convertIDR(dataTransaction?.grandTotal)}
              </span>
            ) : (
              <Skeleton className="my-1 h-3 w-30 rounded-lg" />
            )}
          </div>
        </div>

        {/* QR Codes */}
        {dataTransaction?.status === "completed" && (
          <div>
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-800">
              <QrCode size={18} /> Tiket Kamu
            </h3>
            <div className="grid gap-6 sm:grid-cols-2">
              {dataBarcode?.map((barcode: { code: string; _id: string }) => (
                <Skeleton
                  key={`barcode-${barcode._id}`}
                  isLoaded={!!barcode.code}
                >
                  <div className="flex flex-col items-center rounded-xl border border-dashed border-gray-300 bg-gray-50 p-5">
                    <QRCodeSVG
                      id={`qr-${barcode._id}`} // pakai _id biar unik
                      value={barcode.code}
                      size={128}
                    />
                    <p className="mt-2 text-xs text-gray-600">{barcode.code}</p>
                    <Button
                      size="sm"
                      variant="flat"
                      color="primary"
                      className="mt-3 flex items-center gap-1"
                      onPress={() => handleDownloadQR(barcode._id)}
                    >
                      <Download size={16} /> Download
                    </Button>
                  </div>
                </Skeleton>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <Divider className="mt-3 h-[1px] bg-gray-200" />
        {/* Breakdown */}
        <div className="flex flex-col">
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isOpen ? "mb-3 max-h-64" : "max-h-0"
            }`}
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-700">Subtotal Pesanan</span>
                <span className="text-xs text-gray-700">
                  {convertIDR(dataTransaction?.total)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-700">Biaya Layanan</span>
                <span className="text-xs text-gray-700">
                  {convertIDR(dataTransaction?.serviceFee)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-700">Biaya Pajak</span>
                <span className="text-xs text-gray-700">
                  {convertIDR(dataTransaction?.pajak)}
                </span>
              </div>
              {dataTransaction?.discount > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-700">Total Diskon</span>
                  <span className="text-xs text-gray-700">
                    {convertIDR(dataTransaction.discount)}
                  </span>
                </div>
              )}
            </div>
            <Divider className="mt-3 h-[1px] bg-gray-200" />
          </div>
          <button
            className="flex items-center justify-end gap-1 transition"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="flex items-center gap-2">
              <p className="text-sm text-gray-500">Total Pesanan:</p>
              {dataTransaction?.total ? (
                <span className="text-sm font-medium text-amber-600">
                  {convertIDR(dataTransaction?.grandTotal)}
                </span>
              ) : (
                <Skeleton className="my-1 h-3 w-30 rounded-lg" />
              )}
            </div>
            <ChevronDown
              className={`h-4 w-4 text-gray-500 transition-transform duration-300 ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>
        </div>
      </Card>

      {/* Pending Payment */}
      {dataTransaction?.status === "pending" && (
        <Card className="w-full max-w-3xl space-y-6 rounded-lg px-4 py-3">
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-1 text-sm text-black hover:bg-gray-100"
              onPress={handleCancelTransaction}
            >
              Batalkan Pesanan
            </Button>
            <Button
              className="bg-primary flex-1 rounded-md px-3 py-1 text-sm text-white hover:bg-blue-700"
              onPress={() =>
                window.snap.pay(dataTransaction?.payment?.token ?? "")
              }
            >
              Bayar Sekarang
            </Button>
          </div>
        </Card>
      )}

      {dataTransaction?.status === "completed" && (
        <Card className="w-full max-w-3xl space-y-2 rounded-lg px-4 py-3">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xs font-semibold sm:text-base lg:text-sm">
              No. Pesanan
            </h3>
            <div className="relative">
              <div className="flex items-center gap-2">
                <p className="text-xs lg:text-sm">{dataTransaction?.orderId}</p>
                <button
                  onClick={handleCopy}
                  className="rounded-md border border-gray-400 px-1 py-[2px] text-xs transition hover:bg-gray-100"
                >
                  Salin
                </button>
              </div>
              {/* 
              {showToast && (
                <div className="animate-fade-in-out absolute bottom-[-40px] left-1/2 z-[100] -translate-x-1/2 rounded-md bg-black px-3 py-1 text-xs text-white shadow-md">
                  Disalin
                </div>
              )} */}
            </div>
            {showToast && (
              <div className="animate-fade-in-out fixed bottom-10 left-1/2 z-[100] -translate-x-1/2 rounded-md bg-black px-3 py-2 text-sm text-white shadow-md">
                Disalin
              </div>
            )}
          </div>
          <div className="flex items-center justify-between">
            <h3 className="text-xs sm:text-base lg:text-sm">
              Metode Pembayaran
            </h3>
            <p className="text-xs text-gray-700 lg:text-sm">
              {dataTransaction?.payment?.payment_type === "bank_transfer"
                ? `Bank Transfer - ${dataTransaction?.payment?.bank?.toUpperCase() ?? "-"}`
                : (dataTransaction?.payment?.payment_type?.toUpperCase() ??
                  "-")}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-700 lg:text-sm">
              Nota Pesanan / Faktur
            </span>
            <span className="text-xs text-gray-700 lg:text-sm">
              {dataTransaction?.noFaktur}
            </span>
          </div>
        </Card>
      )}
    </div>
  );
};

export default TransactionDetailPage;
