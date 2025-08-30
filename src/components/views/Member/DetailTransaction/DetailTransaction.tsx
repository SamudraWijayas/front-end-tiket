"use client";

import React from "react";
import { Ticket, Boxes, MapPin, QrCode } from "lucide-react";
import { Chip, Divider, Skeleton, Card, Button } from "@heroui/react";
import { convertIDR } from "@/utils/currency";
import useDetailTransaction from "./useDetailTransaction";
import { QRCodeSVG } from "qrcode.react";
import Script from "next/script";
import environment from "@/config/environment";

const TransactionDetailPage = () => {
  const { dataTransaction, dataEvent, dataTicket } = useDetailTransaction();

  return (
    <div className="flex justify-center bg-gradient-to-b from-gray-50 to-white px-4 py-10">
      <Script
        src={environment.MIDTRANS_SNAP_URL}
        data-client-key={environment.MIDTRANS_CLIENT_KEY}
        strategy="lazyOnload"
      />
      <div className="w-full max-w-3xl space-y-8 rounded-2xl bg-white p-8 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">
            Transaction Details
          </h2>
        </div>

        {/* Order Info */}
        <Card className="p-6 shadow-sm">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Order ID */}
            <div>
              <p className="text-sm text-gray-500">Order ID</p>
              <Skeleton isLoaded={!!dataTransaction?.orderId}>
                <p className="text-lg font-semibold text-gray-800">
                  {dataTransaction?.orderId}
                </p>
              </Skeleton>
            </div>

            {/* Status */}
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <Skeleton isLoaded={!!dataTransaction?.orderId}>
                <Chip
                  color={
                    dataTransaction?.status === "completed"
                      ? "success"
                      : dataTransaction?.status === "pending"
                        ? "warning"
                        : "danger"
                  }
                  variant="flat"
                  size="sm"
                  className="mt-1 font-medium"
                >
                  {dataTransaction?.status.charAt(0).toUpperCase() +
                    dataTransaction?.status.slice(1)}
                </Chip>
              </Skeleton>
            </div>

            {/* Event */}
            <div>
              <p className="text-sm text-gray-500">Event</p>
              <Skeleton isLoaded={!!dataTransaction?.orderId}>
                <div className="mt-1 flex items-center gap-2 text-gray-700">
                  <Ticket size={16} /> {dataEvent?.name}
                </div>
              </Skeleton>
            </div>

            {/* Location */}
            <div>
              <p className="text-sm text-gray-500">Location</p>
              <div className="mt-1 flex items-center gap-2 text-gray-700">
                <MapPin size={16} /> {dataEvent?.location?.address}
              </div>
            </div>
          </div>
        </Card>

        {/* Tickets */}
        <Card className="p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-800">Tickets</h3>
          <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-4">
            <div className="flex items-center gap-2 text-gray-700">
              <Boxes size={18} /> <span>{dataTicket?.name}</span>
            </div>
            <span className="font-semibold text-gray-900">
              {`${convertIDR(Number(dataTicket?.price) || 0)} x ${
                dataTransaction?.quantity || 1
              }`}
            </span>
          </div>
        </Card>

        {/* QR Codes */}
        {dataTransaction?.status === "completed" && (
          <Card className="p-6 shadow-sm">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-800">
              <QrCode size={18} /> Your Ticket
            </h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {dataTransaction?.vouchers?.map(
                (voucher: { voucherId: string }) => (
                  <div
                    key={`voucher-${voucher.voucherId}`}
                    className="flex flex-col items-center rounded-xl border border-dashed border-gray-300 bg-white p-4 shadow-sm"
                  >
                    <QRCodeSVG value={voucher.voucherId} size={128} />
                    <p className="mt-2 text-xs text-gray-500">
                      {voucher.voucherId}
                    </p>
                  </div>
                ),
              )}
            </div>
          </Card>
        )}
        {dataTransaction?.status === "pending" && (
          <Button
            color="primary"
            className="w-fit"
            onPress={() =>
              window.snap.pay(dataTransaction?.payment?.token ?? "")
            }
          >
            Pay Now
          </Button>
        )}
        {/* Footer */}
        <Divider />
        <div className="flex items-center justify-between text-lg">
          <span className="font-semibold text-gray-700">Total</span>
          <span className="font-bold text-green-600">
            {convertIDR(Number(dataTransaction?.total) || 0)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetailPage;
