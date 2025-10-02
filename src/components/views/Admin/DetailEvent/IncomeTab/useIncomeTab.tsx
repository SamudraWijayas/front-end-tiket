import orderServices from "@/services/order.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useTicketTab = () => {
  const { query, isReady } = useRouter();

  const getTotalOrderByEvent = async () => {
    const { data } = await orderServices.getEventTicketTotals(`${query.id}`);
    return data.data;
  };

  const { data: dataTotalOrder, refetch: refetchTotalOrder } = useQuery({
    queryKey: ["EventTicketTotals"],
    queryFn: getTotalOrderByEvent,
    enabled: isReady,
  });

  const getEventTotalIncome = async () => {
    console.log("🔥 getTotalAllTicketById dipanggil dengan id:", query.id);

    const { data } = await orderServices.getEventTotalIncome(`${query.id}`);
    console.log("🚀 allTicket raw response:", data);
    return data.data;
  };

  const { data: TotalIncome, refetch: refetchTicketOrder } = useQuery({
    queryKey: ["EventTotalIncome"],
    queryFn: getEventTotalIncome,
    enabled: isReady,
  });

  console.log("📦 TotalIncome dari useQuery:", TotalIncome);

  return {
    dataTotalOrder,
    refetchTotalOrder,
    TotalIncome,
    refetchTicketOrder,
  };
};

export default useTicketTab;
