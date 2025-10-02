"use client";

import React from "react";
import { MapPin, QrCode, Download } from "lucide-react";
import { Divider, Skeleton, Card, Button } from "@heroui/react";
import { convertIDR } from "@/utils/currency";
import { convertTime } from "@/utils/date";
import useDetailTransaction from "./useDetailTransaction";
import { QRCodeSVG } from "qrcode.react";
import Script from "next/script";
import environment from "@/config/environment";
import NextImage from "next/image";

const TransactionDetailPage = () => {
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
              Order ID:{" "}
              <span className="font-semibold text-gray-900">
                {dataTransaction?.orderId}
              </span>
            </p>
          </Skeleton>

          <Skeleton isLoaded={!!dataTransaction?.createdAt}>
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
      <Card className="w-full max-w-3xl space-y-6 rounded-lg p-6">
        <Skeleton
          isLoaded={!!dataEvent?.name}
          className="h-5 w-full rounded-lg"
        >
          <h3 className="text-lg font-semibold sm:text-base">
            {dataEvent?.name}
          </h3>
        </Skeleton>

        {/* Event Summary */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Skeleton isLoaded={!!dataEvent?.banner} className="rounded-lg">
              <NextImage
                src={
                  dataEvent?.banner
                    ? `${process.env.NEXT_PUBLIC_IMAGE}${dataEvent?.banner}`
                    : "/default-event.jpg"
                }
                alt={dataEvent?.name ?? "No Event"}
                width={96}
                height={96}
                className="h-24 w-24 rounded-lg object-cover"
              />
            </Skeleton>
            <div>
              <Skeleton isLoaded={!!dataTicket?.name} className="h-5 w-full">
                <p className="text-md line-clamp-1 font-medium text-gray-800">
                  {dataTicket?.name}
                </p>
              </Skeleton>
              <Skeleton
                isLoaded={!!dataTransaction?.quantity}
                className="h-5 w-full"
              >
                <p className="mt-2 text-sm text-gray-500">
                  {dataTransaction?.quantity ?? 0} tiket
                </p>
              </Skeleton>
            </div>
          </div>

          <div className="text-right">
            <Skeleton
              isLoaded={!!dataTransaction?.total}
              className="h-5 w-full"
            >
              <p className="text-xl font-bold text-gray-900">
                {convertIDR(Number(dataTransaction?.total) || 0)}
              </p>
            </Skeleton>
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
        <Divider />
        <Skeleton isLoaded={!!dataTransaction?.total}>
          <div className="flex justify-end text-lg">
            <span className="font-bold text-gray-800">
              Total Pesanan:&nbsp;
              {convertIDR(Number(dataTransaction?.total) || 0)}
            </span>
          </div>
        </Skeleton>
      </Card>

      {/* Pending Payment */}
      {dataTransaction?.status === "pending" && (
        <Card className="w-full max-w-3xl space-y-6 rounded-lg p-6">
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
        <Card className="w-full max-w-3xl space-y-6 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold sm:text-base">No. Pesanan</h3>
            <p>{dataTransaction?.orderId}</p>
          </div>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold sm:text-base">
              Metode Pembayaran
            </h3>
            <p>
              {dataTransaction?.payment?.payment_type}{" "}
              <span className="uppercase">
                ({dataTransaction?.payment?.bank})
              </span>
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default TransactionDetailPage;
