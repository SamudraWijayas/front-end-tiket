import eventServices from "@/services/event.service";
import ticketServices from "@/services/ticket.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useDetailEvent = () => {
  const router = useRouter();
  const getEventBySlug = async () => {
    const { data } = await eventServices.getEventBySlug(`${router.query.slug}`);
    return data.data;
  };

  const { data: dataEvent, isLoading: isLoadingDetailEvent } = useQuery({
    queryKey: ["Event By Slug"],
    queryFn: getEventBySlug,
    enabled: router.isReady,
  });

  const getTicketByEventId = async () => {
    const { data } = await ticketServices.getTicketsByEventId(
      `${dataEvent._id}`,
    );
    return data.data;
  };

  const { data: dataTicket, isLoading: isLoadingTicket } = useQuery({
    queryKey: ["Tickets"],
    queryFn: getTicketByEventId,
    enabled: !!dataEvent?.id,
  });

  //   ticket kecil
  const getSmallTicket = async () => {
    const { data } = await ticketServices.getTicketsByEventId(
      `${dataEvent._id}`,
    );
    const tickets = data.data;

    if (!tickets || tickets.length === 0) return null;

    // Beri tipe eksplisit untuk prev dan current
    const minPriceTicket = tickets.reduce(
      (prev: { price: number }, current: { price: number }) => {
        return prev.price < current.price ? prev : current;
      },
    );

    return minPriceTicket;
  };

  const { data: minTicket, isLoading: isLoadingMinTicket } = useQuery({
    queryKey: ["Tickets", dataEvent?._id],
    queryFn: getSmallTicket,
    enabled: !!dataEvent?._id,
  });

  return {
    dataEvent,
    isLoadingDetailEvent,
    dataTicket,
    isLoadingTicket,
    minTicket,
    isLoadingMinTicket,
  };
};

export default useDetailEvent;
