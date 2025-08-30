import React from "react";
import { Calendar, Package, Boxes, User } from "lucide-react";
import useTransaction from "./useTransaction";

const transactions = [
  {
    id: "JPF-92457",
    status: "Requested",
    products: 14,
    items: 282,
    amount: 2600,
    payment: "Paid",
    user: "Hendry Warwick",
    date: "April 5, 2025",
    statusColor: "bg-blue-100 text-blue-600",
    paymentColor: "bg-green-100 text-green-600",
  },
  {
    id: "JPF-89012",
    status: "In Progress",
    products: 34,
    items: 132,
    amount: 3000,
    payment: "Paid",
    user: "Noah Martinez",
    date: "March 23, 2025",
    statusColor: "bg-yellow-100 text-yellow-600",
    paymentColor: "bg-green-100 text-green-600",
  },
  {
    id: "JPF-27182",
    status: "Aborted",
    products: 16,
    items: 175,
    amount: 3200,
    payment: "Unpaid",
    user: "Mason Lee",
    date: "March 20, 2025",
    statusColor: "bg-red-100 text-red-600",
    paymentColor: "bg-red-100 text-red-600",
  },
];

const Transaction = () => {
  const { dataTransactions } = useTransaction();
  console.log(dataTransactions);
  return (
    <div className="flex justify-center">
      <div className="mt-6 mb-6 w-full max-w-6xl space-y-4">
        <h1 className="text-2xl font-bold">Transaksi</h1>
        {transactions.map((category, idx) => (
          <div
            key={idx}
            className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{category.id}</h3>
              <div className="flex items-center gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${category.paymentColor}`}
                >
                  {category.payment}
                </span>
                <span className="text-lg font-bold">
                  ${category.amount.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Status + Products */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <span
                className={`rounded-full px-3 py-1 font-medium ${category.statusColor}`}
              >
                {category.status}
              </span>
              <span className="flex items-center gap-1">
                <Package size={16} /> {category.products} products
              </span>
              <span className="flex items-center gap-1">
                <Boxes size={16} /> {category.items} items
              </span>
            </div>

            {/* User + Date */}
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <User size={16} /> {category.user}
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={16} /> {category.date}
              </span>
            </div>

            {/* Expand details */}
            <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
              Expand Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Transaction;
