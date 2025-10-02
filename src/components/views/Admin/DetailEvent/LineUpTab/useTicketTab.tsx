import orderServices from "@/services/order.service";
import ticketService from "@/services/ticket.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useTicketTab = () => {
  const { query, isReady } = useRouter();

  const getTicketByEventId = async () => {
    const { data } = await ticketService.getTicketsByEventId(`${query.id}`);
    return data.data;
  };
  const getTotalOrderByEvent = async () => {
    const { data } = await orderServices.getTotalOrderById(`${query.id}`);
    return data.data;
  };

  const { data: dataTotalOrder, refetch: refetchTotalOrder } = useQuery({
    queryKey: ["Event"],
    queryFn: getTotalOrderByEvent,
    enabled: isReady,
  });

  const {
    data: dataTicket,
    refetch: refetchTicket,
    isPending: isPendingTicket,
    isRefetching: isRefetchingTicket,
  } = useQuery({
    queryKey: ["Tickets"],
    queryFn: getTicketByEventId,
    enabled: isReady,
  });

  return {
    dataTicket,
    refetchTicket,
    isPendingTicket,
    isRefetchingTicket,
  };
};

export default useTicketTab;
