
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import usePayment from "./usePayment";
import Image from "next/image";

const Payment = () => {
  const router = useRouter();
  const { mutateUpdateOrderStatus } = usePayment();
  const { order_id, status } = router.query;

  useEffect(() => {
    if (router.isReady) {
      mutateUpdateOrderStatus();
    }
  }, [router.isReady]);

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 text-center shadow-xl">
        {/* Icon */}
        <div className="flex flex-col items-center justify-center">
          {/* <Image
              src="/images/general/logo.svg"
              alt="logo"
              width={180}
              height={180}
            /> */}
          <Image
            src={
              status === "success"
                ? "/images/illustrations/payment-success.png"
                : "/images/illustrations/payment-failed.jpg"
            }
            alt="success"
            width={300}
            height={300}
          />
        </div>

        {/* Title */}
        <h2 className="mb-2 text-2xl font-bold text-gray-800 capitalize">
          Transaction {status}
        </h2>

        {/* Subtitle */}
        <p className="mb-6 text-gray-500">
          Thank you for your order! We’ve received your payment successfully.
        </p>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-4">
          <button
            className="rounded-lg border border-gray-300 px-6 py-2 font-medium text-gray-700 transition hover:bg-gray-100"
            onClick={() => router.push(`/member/transaction/${order_id}`)}
          >
            View Order
          </button>
          <button
            className="rounded-lg bg-primary px-6 py-2 font-medium text-white transition hover:bg-blue-800"
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
