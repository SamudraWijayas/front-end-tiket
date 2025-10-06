import React from "react";
import { Calendar } from "lucide-react";
import useTransaction from "./useTransaction";
import { IOrder } from "@/types/Order";
import { Chip, Divider, Skeleton } from "@heroui/react";
import { convertIDR } from "@/utils/currency";
import { convertTime } from "@/utils/date";
import Link from "next/link";
import Image from "next/image";

const Transaction = () => {
  const { dataTransactions, isLoadingTransactions } = useTransaction();

  const transactions = dataTransactions?.data ?? [];
  const hasTransactions = transactions.length > 0;

  return (
    <div className="flex justify-center px-2 pt-5 sm:px-4">
      <div className="mt-4 mb-6 w-full max-w-5xl space-y-4">
        <h1 className="text-xl font-bold sm:text-2xl">Riwayat Pesanan</h1>

        {/* Loading Skeleton */}
        {isLoadingTransactions && (
          <>
            {Array.from({ length: 3 }).map((_, idx) => (
              <div
                key={`skeleton-${idx}`}
                className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
              >
                <Skeleton className="h-5 w-32 rounded" />
                <Skeleton className="h-5 w-20 rounded" />
                <Divider />
                <Skeleton className="h-4 w-28 rounded" />
              </div>
            ))}
          </>
        )}

        {/* Empty State */}
        {!isLoadingTransactions && !hasTransactions && (
          <div className="flex flex-col items-center justify-center gap-4 py-20">
            <Image
              src="/images/illustrations/nodata.jpg"
              alt="no-data"
              width={200}
              height={200}
            />
            <h2 className="text-center text-xl font-bold sm:text-2xl">
              Belum ada transaksi
            </h2>
          </div>
        )}

        {/* Data Available */}
        {!isLoadingTransactions && hasTransactions && (
          <>
            {transactions.map((transaction: IOrder) => (
              <div
                key={transaction?._id}
                className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
              >
                {/* Header */}
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold sm:text-base">
                    {transaction?.events?.name ?? "No Event"}
                  </h3>
                  <Chip
                    size="sm"
                    variant="flat"
                    color={
                      transaction?.status === "completed"
                        ? "success"
                        : transaction?.status === "pending"
                          ? "warning"
                          : "danger"
                    }
                  >
                    {transaction?.status === "completed"
                      ? "Selesai"
                      : transaction?.status === "pending"
                        ? "Pending"
                        : "Dibatalkan"}
                  </Chip>
                </div>

                {/* Body */}
                <div className="my-2 grid gap-3 sm:grid-cols-2 sm:items-center">
                  {/* Left: Image + Info */}
                  <div className="flex items-center gap-3">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_IMAGE}${transaction?.events?.banner ?? ""}`}
                      alt={transaction?.events?.name ?? "No Event"}
                      width={80}
                      height={80}
                      className="h-24 w-24 rounded-md object-cover"
                    />
                    <div className="flex flex-col gap-1">
                      <span className="text-md font-medium text-gray-800">
                        {transaction?.ticket?.name ?? "-"}
                      </span>
                      <span className="text-sm text-gray-500">
                        {transaction?.quantity ?? 0} tiket
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <Calendar size={14} />
                        {convertTime(transaction?.createdAt)}
                      </span>
                    </div>
                  </div>

                  {/* Right: Harga */}
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Total Pesanan</p>
                    <p className="text-base font-bold text-gray-800">
                      {transaction?.total
                        ? convertIDR(Number(transaction.total))
                        : "-"}
                    </p>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-2">
                  <Link
                    href={`/transaction/${transaction?.orderId}`}
                    className="rounded-md border border-gray-300 px-3 py-1 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Lihat Detail
                  </Link>
                  <Link
                    href="/event"
                    className="bg-primary rounded-md px-3 py-1 text-sm text-white hover:bg-blue-700"
                  >
                    Beli Lagi
                  </Link>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Transaction;
