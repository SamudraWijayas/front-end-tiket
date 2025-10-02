import { DELAY } from "@/constants/list.constants";
import useDebounce from "@/hooks/useDebounce";
import eventServices from "@/services/event.service";
import { useQuery } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";

const useSearch = () => {
  const [search, setSearch] = useState("");
  const debounce = useDebounce();

  const getEventsSearch = async () => {
    const params = `search=${search}`;
    const res = await eventServices.getEventsNoLimit(params);
    const { data } = res;
    return data;
  };
  const {
    data: dataEventsSearch,
    isLoading: isLoadingEventsSearch,
    isRefetching: isRefetchingEventsSearch,
  } = useQuery({
    queryKey: ["EventsSearch", search],
    queryFn: getEventsSearch,
    enabled: !!search,
  });
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    debounce(() => setSearch(e.target.value), DELAY);
  };
  return {
    dataEventsSearch,
    isLoadingEventsSearch,
    isRefetchingEventsSearch,
    handleSearch,
    search,
    setSearch,
  };
};

export default useSearch;
