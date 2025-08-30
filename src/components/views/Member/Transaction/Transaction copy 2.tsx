"use client";

import React, { useEffect } from "react";
import { Calendar, Boxes, User, Dot, Ticket } from "lucide-react";
import useTransaction from "./useTransaction";
import { IOrder } from "@/types/Order";
import { Chip, Divider } from "@heroui/react";
import { convertIDR } from "@/utils/currency";
import { convertTime } from "@/utils/date";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Transaction = () => {
  const { dataTransactions } = useTransaction();
  const session = useSession();
  const router = useRouter();

  const isAuthenticated = session.status === "authenticated";

  useEffect(() => {
    if (session.status === "unauthenticated") {
      router.push("/auth/login"); // arahkan ke halaman login
    }
  }, [session.status, router]);

  if (!isAuthenticated)
    return (
      <div className="flex min-h-[80vh] items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md rounded-xl bg-white p-8 text-center shadow-xl">
          <div className="flex flex-col items-center justify-center">
            <Image
              src="/images/illustrations/akses-ditolak.png"
              alt="success"
              width={300}
              height={300}
            />
          </div>

          {/* Title */}
          <h2 className="mb-2 text-2xl font-bold text-gray-800 capitalize">
            Akses Ditolak
          </h2>
        </div>
      </div>
    );

  return (
    <div className="flex justify-center px-4">
      <div className="mt-6 mb-6 w-full max-w-6xl space-y-4">
        <h1 className="text-2xl font-bold">Transaksi</h1>

        {dataTransactions?.data?.map((transaction: IOrder) => (
          <div
            key={`trans-${transaction?._id}`}
            className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            {/* Header: Order ID + Total */}
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">
                {transaction?.orderId ?? "No Order ID"}
              </h3>
              <span className="text-lg font-bold text-gray-800">
                {convertIDR(Number(transaction?.total))}
              </span>
            </div>

            {/* Status + Event + Tickets */}
            <div className="flex flex-col gap-2 text-sm lg:flex-row lg:items-center lg:justify-between lg:gap-0">
              <div className="flex flex-wrap items-center gap-2 text-gray-600 lg:gap-4">
                <Chip
                  color={
                    transaction?.status === "completed"
                      ? "success"
                      : transaction?.status === "pending"
                        ? "warning"
                        : "danger"
                  }
                  variant="flat"
                  size="sm"
                >
                  {transaction?.status === "completed"
                    ? "Completed"
                    : transaction?.status === "pending"
                      ? "Pending"
                      : "Cancelled"}
                </Chip>

                <span className="flex items-center gap-1">
                  <Ticket size={16} /> {transaction?.events?.name ?? "No Event"}
                </span>

                <span className="flex items-center gap-1">
                  <Boxes size={16} /> {transaction?.quantity ?? 0} tickets
                </span>
              </div>

              <div className="flex items-center text-gray-500">
                <span className="flex items-center gap-1">
                  <User size={16} />
                  {transaction?.createdBy?.fullName ?? "Unknown User"}
                </span>
                <Dot size={30} className="text-gray-400" />
                <span className="flex items-center gap-1">
                  <Calendar size={16} />
                  {convertTime(transaction?.createdAt)}
                </span>
              </div>
            </div>

            <Divider />

            <Link
              href={`/transaction/${transaction?.orderId}`}
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
            >
              Expand Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Transaction;
