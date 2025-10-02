import countServices from "@/services/count.service";
import eventServices from "@/services/event.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useDashboard = () => {
  const router = useRouter();
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState<string>(
    currentYear.toString(),
  );

  // total keseluruhan
  const getOrderTotalOrganizer = async () => {
    const res = await countServices.getCountOrganizer(
      selectedEventId ?? undefined,
    );
    return res.data.data;
  };

  const { data: dataOrderTotal, isLoading: isLoadingOrderTotal } = useQuery({
    queryKey: ["OrderTotal", selectedEventId],
    queryFn: getOrderTotalOrganizer,
    enabled: router.isReady,
  });

  // total hari ini
  const getOrderTotalOrganizerToday = async () => {
    const res = await countServices.getCountOrganizerToday(
      selectedEventId ?? undefined,
    ); // 🚀 beda endpoint
    return res.data.data;
  };

  const { data: dataOrderTotalToday, isLoading: isLoadingOrderTotalToday } =
    useQuery({
      queryKey: ["OrderTotalToday", selectedEventId],
      queryFn: getOrderTotalOrganizerToday,
      enabled: router.isReady,
    });

  // total event
  const getTotalEvent = async () => {
    const res = await countServices.getOrderByEventOrganizer();
    return res.data.data; // ✅ langsung ambil "data"
  };

  const { data: dataTotalEvent, isLoading: isLoadingTotalEvent } = useQuery({
    queryKey: ["TotalEvent"],
    queryFn: getTotalEvent,
    enabled: router.isReady,
  });

  // Statistik harian
  const getSalesStats = async () => {
    const searchParams = new URLSearchParams();

    if (selectedEventId) searchParams.append("eventId", selectedEventId);
    if (selectedYear) searchParams.append("year", selectedYear.toString());

    const params = searchParams.toString(); // hasil: "eventId=123&year=2025"

    const res = await countServices.getSalesStats(params);
    return res.data.data;
  };

  const { data: dataSalesStats, isLoading: isLoadingSalesStats } = useQuery({
    queryKey: ["SalesStats", selectedEventId, selectedYear],
    queryFn: getSalesStats,
    enabled: router.isReady,
  });

  // Statistik tiket
  const getTicketStats = async () => {
    const res = await countServices.getTicketStats(
      selectedEventId ?? undefined,
    );
    return res.data.data;
  };
  const { data: dataTicketStats, isLoading: isLoadingTicketStats } = useQuery({
    queryKey: ["TicketStats", selectedEventId],
    queryFn: getTicketStats,
    enabled: router.isReady,
  });

  // event
  const getEvents = async () => {
    const res = await eventServices.getEventsSelectByOrganizer();
    return res?.data?.data ?? []; // selalu array
  };

  const {
    data: dataEvents,
    isLoading: isLoadingEvents,
    isRefetching: isRefetchingEvents,
    refetch: refetchEvents,
  } = useQuery({
    queryKey: ["DataEvents"],
    queryFn: getEvents,
  });

  useEffect(() => {
    if (dataEvents && dataEvents.length > 0 && !selectedEventId) {
      // Ambil event pertama sebagai default
      const firstEvent = dataEvents[0];
      setSelectedEventId(firstEvent._id);
    }
  }, [dataEvents, selectedEventId]);

  return {
    selectedEventId,
    setSelectedEventId,

    setSelectedYear,
    selectedYear,

    dataOrderTotal,
    isLoadingOrderTotal,
    dataOrderTotalToday,
    isLoadingOrderTotalToday,
    dataTotalEvent,
    isLoadingTotalEvent,
    dataSalesStats,
    isLoadingSalesStats,
    dataTicketStats,
    isLoadingTicketStats,

    dataEvents,
    isLoadingEvents,

    isRefetchingEvents,
    refetchEvents,
  };
};

export default useDashboard;
