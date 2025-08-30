
import useChangeUrl from "@/hooks/useChangeUrls";
import categoryService from "@/services/category.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const useCategory = () => {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string>("");
  const { currentLimit, currentPage, currentSearch } = useChangeUrl();

  const getCategories = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}`;
    if (currentSearch) {
      params += `&search=${currentSearch}`;
    }
    const res = await categoryService.getCategories(params);
    const { data } = res;
    return data;
  };

  const {
    data: dataCategory,
    isLoading: isLoadingCategory,
    isRefetching: isRefetchingCategory,
    refetch: refetchCategory,
  } = useQuery({
    queryKey: ["Categories", currentLimit, currentPage, currentSearch],
    queryFn: getCategories,
    enabled: router.isReady && !!currentPage && !!currentLimit,
  });

  return {
    dataCategory,
    isLoadingCategory,

    isRefetchingCategory,
    refetchCategory,

    selectedId,
    setSelectedId,
  };
};

export default useCategory;
