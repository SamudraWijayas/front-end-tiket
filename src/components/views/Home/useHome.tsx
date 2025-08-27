import {
  LIMIT_BANNER,
  LIMIT_CATEGORY,
  LIMIT_EVENT,
  PAGE_DEFAULT,
} from "@/constants/list.constants";
import bannerServices from "@/services/banner.service";
import categoryServices from "@/services/category.service";
import eventServices from "@/services/event.service";
import ticketService from "@/services/ticket.service";
import { useQuery, useQueries } from "@tanstack/react-query";
import { IEvent } from "@/types/Event";
import { ITicket } from "@/types/Ticket";

const useHome = () => {
  const getBanners = async () => {
    const params = `limit=${LIMIT_BANNER}&page=${PAGE_DEFAULT}`;
    const res = await bannerServices.getBanners(params);
    const { data } = res;
    return data;
  };

  const { data: dataBanners, isLoading: isLoadingBanners } = useQuery({
    queryKey: ["Banners"],
    queryFn: getBanners,
  });

  const getCategories = async () => {
    const params = `limit=${LIMIT_CATEGORY}&page=${PAGE_DEFAULT}`;
    const res = await categoryServices.getCategories(params);
    const { data } = res;
    return data;
  };

  const { data: dataCategories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ["Categories"],
    queryFn: getCategories,
  });

  const getEvents = async (params: string) => {
    const res = await eventServices.getEvents(params);
    const { data } = res;
    return data;
  };

  const currentEventQuery = `limit=${LIMIT_EVENT}&page=${PAGE_DEFAULT}&isPublish=true`;

  const { data: dataFeaturedEvents, isLoading: isLoadingFeaturedEvents } =
    useQuery({
      queryKey: ["FeaturedEvents"],
      queryFn: () => getEvents(`${currentEventQuery}&isFeatured=true`),
    });

  const { data: dataLatestEvents, isLoading: isLoadingLatestEvents } = useQuery(
    {
      queryKey: ["LatestEvents"],
      queryFn: () => getEvents(currentEventQuery),
    },
  );

  // Ambil tiket untuk setiap featured event
  let ticketsByFeaturedEvent: Record<string, string> = {}; // simpan harga termurah langsung

  const featuredEventIds =
    dataFeaturedEvents?.data?.map((event: IEvent) => event._id as string) || [];

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
    ticketsByFeaturedEvent = featuredEventIds.reduce(
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
    dataBanners,
    isLoadingBanners,
    dataFeaturedEvents,
    isLoadingFeaturedEvents,
    dataLatestEvents,
    isLoadingLatestEvents,
    dataCategories,
    isLoadingCategories,
    ticketsByFeaturedEvent,
  };
};

export default useHome;
