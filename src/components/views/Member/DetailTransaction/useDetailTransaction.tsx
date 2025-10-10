import { ToasterContext } from "@/contexts/ToasterContext";
import barcodeService from "@/services/barcode.service";
import eventServices from "@/services/event.service";
import orderServices from "@/services/order.service";
import ticketServices from "@/services/ticket.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";

const useDetailTransaction = () => {
  const router = useRouter();
  const { setToaster } = useContext(ToasterContext);

  const getOrderById = async () => {
    const { data } = await orderServices.getOrderById(`${router.query.id}`);
    return data.data;
  };

  const { data: dataTransaction, refetch: refetchTransaction } = useQuery({
    queryKey: ["Transaction"],
    queryFn: getOrderById,
    enabled: router.isReady,
  });
  const getBarcodeByOrderId = async () => {
    const { data } = await barcodeService.getBarcodeByOrderId(
      `${dataTransaction?._id}`,
    );
    return data.data; // <-- ambil array langsung
  };

  const { data: dataBarcode, refetch: refetchBarcode } = useQuery({
    queryKey: ["Barcode", dataTransaction?._id],
    queryFn: getBarcodeByOrderId,
    enabled: !!dataTransaction?._id,
  });
// event
  const getEventById = async () => {
    const { data } = await eventServices.getEventById(
      `${dataTransaction?.events}`,
    );
    return data.data;
  };

  const { data: dataEvent } = useQuery({
    queryKey: ["EventById"],
    queryFn: getEventById,
    enabled: !!dataTransaction?.events,
  });

  const getTicketsById = async () => {
    const { data } = await ticketServices.getTicketsById(
      `${dataTransaction?.ticket}`,
    );
    return data.data;
  };

  const { data: dataTicket } = useQuery({
    queryKey: ["Tickets"],
    queryFn: getTicketsById,
    enabled: !!dataTransaction?.ticket,
  });

  const handleCancelTransaction = async () => {
    if (!dataTransaction?.orderId) return;
    try {
      await orderServices.cancelOrder(dataTransaction.orderId);
      setToaster({
        type: "success",
        message: "Pesanan berhasil dibatalkan",
      });
      refetchTransaction(); // refresh data agar UI update
    } catch {
      setToaster({
        type: "error",
        message: "Gagal membatalkan pesanan",
      });
    }
  };

  return {
    dataTransaction,
    dataEvent,
    dataTicket,
    handleCancelTransaction,

    dataBarcode,
    refetchBarcode,
  };
};

export default useDetailTransaction;
