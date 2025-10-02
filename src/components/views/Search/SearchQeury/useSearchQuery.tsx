import { DELAY } from "@/constants/list.constants";
import useDebounce from "@/hooks/useDebounce";
import eventServices from "@/services/event.service";
import ticketService from "@/services/ticket.service";
import { IEvent } from "@/types/Event";
import { ITicket } from "@/types/Ticket";
import { useQueries, useQuery } from "@tanstack/react-query";
import { ChangeEvent, useState, useEffect } from "react";

const useQuerySearch = (defaultSearch = "") => {
  const [search, setSearch] = useState(defaultSearch);
  const debounce = useDebounce();

  // 🔑 sync state kalau defaultSearch berubah (misalnya dari URL params)
  useEffect(() => {
    if (defaultSearch) {
      setSearch(defaultSearch);
    }
  }, [defaultSearch]);

  const getEventsSearch = async () => {
    const params = `search=${search}`;
    const res = await eventServices.getEventsNoLimit(params);
    return res.data; // asumsi { data, meta }
  };

  const {
    data: dataEventsSearch,
    isLoading: isLoadingEventsSearch,
    isRefetching: isRefetchingEventsSearch,
  } = useQuery({
    queryKey: ["EventsSearch", search],
    queryFn: getEventsSearch,
    enabled: !!search, // jangan fetch kalau kosong
  });

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    debounce(() => setSearch(e.target.value), DELAY);
  };

  // tiket

  let ticketsByEvent: Record<string, string> = {}; // simpan harga termurah langsung

  const featuredEventIds =
    dataEventsSearch?.data?.map((event: IEvent) => event._id as string) || [];

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
    dataEventsSearch,
    isLoadingEventsSearch,
    isRefetchingEventsSearch,
    handleSearch,
    search,
    setSearch,
    ticketsByEvent
  };
};

export default useQuerySearch;
