import useChangeUrl from "@/hooks/useChangeUrls";
import eventServices from "@/services/event.service";
import ticketService from "@/services/ticket.service";
import { IEvent } from "@/types/Event";
import { ITicket } from "@/types/Ticket";
import { useQueries, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useEvent = () => {
  const router = useRouter();
  const {
    currentLimit,
    currentPage,
    currentCategory,
    currentIsFeatured,
    currentIsOnline,
  } = useChangeUrl();

  const getEvents = async () => {
    const params = `limit=${currentLimit}&page=${currentPage}&isPublish=true&category=${currentCategory}&isFeatured=${currentIsFeatured}&isOnline=${currentIsOnline}`;
    const res = await eventServices.getEvents(params);
    const { data } = res;
    return data;
  };

  const {
    data: dataEvents,
    isLoading: isLoadingEvents,
    isRefetching: isRefetchingEvents,
    refetch: refetchEvents,
  } = useQuery({
    queryKey: [
      "Events",
      currentPage,
      currentLimit,
      currentCategory,
      currentIsFeatured,
      currentIsOnline,
    ],
    queryFn: () => getEvents(),
    enabled: router.isReady && !!currentPage && !!currentLimit,
  });

  let ticketsByEvent: Record<string, string> = {}; // simpan harga termurah langsung

  const featuredEventIds =
    dataEvents?.data?.map((event: IEvent) => event._id as string) || [];

  const ticketQueries = useQueries({
    queries: featuredEventIds.map((eventId: string) => ({
      queryKey: ["Tickets", eventId],
      queryFn: async (): Promise<ITicket[]> => {
        const { data } = await ticketService.getTicketsByEventId(eventId);
        return data.data as ITicket[];
      },
      enabled: !!eventId,
    })),
  });

  if (featuredEventIds.length && ticketQueries.length) {
    ticketsByEvent = featuredEventIds.reduce(
      (acc: Record<string, string>, eventId: string, idx: number) => {
        const data = ticketQueries[idx]?.data;

        if (Array.isArray(data) && data.length > 0) {
          // urutkan tiket berdasarkan harga ASC
          const sorted = [...data].sort(
            (a, b) => Number(a.price) - Number(b.price),
          );

          // simpan langsung HARGA TERMURAH (string/number)
          acc[eventId] = sorted[0].price.toString();
        } else {
          acc[eventId] = ""; // kalau tidak ada tiket
        }

        return acc;
      },
      {} as Record<string, string>,
    );
  }

  return {
    dataEvents,
    isLoadingEvents,
    isRefetchingEvents,
    refetchEvents,
    ticketsByEvent,
  };
};

export default useEvent;
