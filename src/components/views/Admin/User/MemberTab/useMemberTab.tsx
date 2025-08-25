import useChangeUrl from "@/hooks/useChangeUrls";
import userServices from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const useMemberTab = () => {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string>("");
  const { currentLimit, currentPage, currentSearch } = useChangeUrl();

  const getUsers = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}`;
    if (currentSearch) {
      params += `&search=${currentSearch}`;
    }
    const res = await userServices.getUsers(params);
    const { data } = res;
    return data;
  };

  const {
    data: dataUsers,
    isLoading: isLoadingUsers,
    isRefetching: isRefetchingUsers,
    refetch: refetchUsers,
  } = useQuery({
    queryKey: ["Users", currentLimit, currentPage, currentSearch],
    queryFn: getUsers,
    enabled: router.isReady && !!currentPage && !!currentLimit,
  });

  return {
    dataUsers,
    isLoadingUsers,

    isRefetchingUsers,
    refetchUsers,

    selectedId,
    setSelectedId,
  };
};

export default useMemberTab;
