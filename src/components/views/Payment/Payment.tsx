import { useRouter } from "next/router";
import React from "react";
import Image from "next/image";

const Payment = () => {
  const router = useRouter();
  const { order_id, transaction_status } = router.query;

  // Mapping status Midtrans → UI status
  const getStatusInfo = (trxStatus?: string) => {
    switch (trxStatus) {
      case "settlement":
        return {
          title: "Success",
          message:
            "Thank you for your order! We’ve received your payment successfully.",
          image: "/images/illustrations/payment-success.png",
        };
      case "pending":
        return {
          title: "Pending",
          message:
            "Your payment is still pending. Please complete the payment following the instructions.",
          image: "/images/illustrations/payment-pending.png", // bikin ilustrasi pending
        };
      case "deny":
      case "expire":
      case "cancel":
        return {
          title: "Failed",
          message: "Your transaction failed or expired. Please try again.",
          image: "/images/illustrations/payment-failed.jpg",
        };
      default:
        return {
          title: "Unknown",
          message:
            "We cannot determine your transaction status. Please contact support.",
          image: "/images/illustrations/payment-failed.jpg",
        };
    }
  };

  const { title, message, image } = getStatusInfo(transaction_status as string);

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 text-center shadow-xl">
        {/* Icon */}
        <div className="flex flex-col items-center justify-center">
          <Image src={image} alt={title} width={300} height={300} />
        </div>

        {/* Title */}
        <h2 className="mb-2 text-2xl font-bold text-gray-800 capitalize">
          Transaction {title}
        </h2>

        {/* Subtitle */}
        <p className="mb-6 text-gray-500">{message}</p>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-4">
          <button
            className="rounded-lg border border-gray-300 px-6 py-2 font-medium text-gray-700 transition hover:bg-gray-100"
            onClick={() => router.push(`/transaction/${order_id}`)}
          >
            View Order
          </button>
          <button
            className="bg-primary rounded-lg px-6 py-2 font-medium text-white transition hover:bg-blue-800"
            onClick={() => router.push("/event")}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
