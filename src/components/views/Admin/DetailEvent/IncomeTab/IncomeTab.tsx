import { Card, CardBody, CardHeader } from "@heroui/react";
import Image from "next/image";
import useIncomeTab from "./useIncomeTab";
import { convertIDR } from "@/utils/currency";
import { IOrderSummary } from "@/types/Order";

const IncomeTab = () => {
  const { dataTotalOrder, TotalIncome } = useIncomeTab();

  // pastikan selalu array
  const orders: IOrderSummary[] = Array.isArray(dataTotalOrder)
    ? dataTotalOrder
    : [];

  const totalAllTickets = TotalIncome ?? null;

  if (orders.length === 0 && !totalAllTickets) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <Image
          src="/images/illustrations/nodata.jpg"
          alt="No data"
          width={120}
          height={120}
          className="opacity-70"
        />
        <p className="mt-6 text-lg font-medium text-gray-500">
          No income available yet
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Title + total income summary */}
      <div className="text-left">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-gray-800">Income Summary</h2>
          {totalAllTickets && (
            <div className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
              {convertIDR(totalAllTickets.totalAmount)}
            </div>
          )}
        </div>
        <p className="mt-1 text-gray-500">
          Overview of orders and income by ticket
        </p>
      </div>

      {/* Cards per ticket */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {orders.map((item) => (
          <Card
            key={item.ticketId}
            className="rounded-2xl border border-gray-100 shadow-md transition-all duration-300 hover:shadow-xl"
          >
            <CardHeader className="flex flex-col items-start rounded-t-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4 text-white">
              <h3 className="text-lg font-semibold">{item.eventName}</h3>
              <span className="mt-1 text-sm opacity-90">{item.ticketName}</span>
            </CardHeader>

            <CardBody className="flex flex-col gap-4 p-5">
              {/* Total Orders */}
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Total Orders</span>
                <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-600">
                  {item.totalOrders}
                </span>
              </div>

              {/* Total Income */}
              <div>
                <span className="text-gray-500">Total Income</span>
                <div className="text-2xl font-extrabold text-green-600">
                  {convertIDR(item.totalAmount)}
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default IncomeTab;
