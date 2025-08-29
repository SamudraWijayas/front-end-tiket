import { CheckCircle } from "lucide-react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import usePayment from "./usePayment";

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
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-lg">
        <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-500" />
        <h2 className="mb-2 text-2xl font-bold text-gray-800">{status}</h2>
        <button
          className="inline-block rounded bg-green-600 px-6 py-2 text-white transition hover:bg-green-700"
          onClick={() => router.push(`/member/transaction/${order_id}`)}
        >
          Check your transaction here
        </button>
      </div>
    </div>
  );
};

export default Payment;
