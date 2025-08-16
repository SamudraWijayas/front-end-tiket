import {
  DELAY,
  LIMIT_DEFAULT,
  LIMIT_LIST,
  PAGE_DEFAULT,
} from "@/constants/list.constants";
import useDebounce from "@/hooks/useDebounce";
import categoryService from "@/services/category.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";

const useCategory = () => {
  const router = useRouter();
  const debounce = useDebounce();
  const [selectedId, setSelectedId] = useState<string>("");
  const currentLimit = router.query.limit || LIMIT_LIST[0].value;
  const currentPage = router.query.page || 1;
  const currentSearch = router.query.search || "";

  const setURL = () => {
    router.replace({
      query: {
        limit: currentLimit || LIMIT_DEFAULT,
        page: currentPage || PAGE_DEFAULT,
        search: currentSearch,
      },
    });
  };

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
    queryKey: ["Category", currentLimit, currentPage, currentSearch],
    queryFn: getCategories,
    enabled: router.isReady && !!currentPage && !!currentLimit,
  });

  const handleChangePage = (page: number) => {
    router.push({
      query: {
        ...router.query,
        page,
      },
    });
  };

  const handleChangeLimit = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedLimit = e.target.value;
    router.push({
      query: {
        ...router.query,
        limit: selectedLimit,
        page: PAGE_DEFAULT,
      },
    });
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    debounce(() => {
      const search = e.target.value;
      router.push({
        query: {
          ...router.query,
          search,
          page: PAGE_DEFAULT,
        },
      });
    }, DELAY);
  };

  const handleClearSearch = () => {
    router.push({
      query: {
        ...router.query,
        search: "",
        page: PAGE_DEFAULT,
      },
    });
  };

  return {
    setURL,
    dataCategory,
    isLoadingCategory,
    currentPage,
    currentLimit,
    currentSearch,
    isRefetchingCategory,
    refetchCategory,
    handleChangePage,
    handleChangeLimit,
    handleClearSearch,
    handleSearch,
    selectedId,
    setSelectedId,
  };
};

export default useCategory;
