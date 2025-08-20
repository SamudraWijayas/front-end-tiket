import {
  DELAY,
  LIMIT_DEFAULT,
  LIMIT_LIST,
  PAGE_DEFAULT,
} from "@/constants/list.constants";
import { useRouter } from "next/router";
import useDebounce from "./useDebounce";
import { ChangeEvent, useEffect } from "react";

const useChangeUrl = () => {
  const router = useRouter();
  const debounce = useDebounce();
  const currentLimit = router.query.limit || LIMIT_LIST[0].value;
  const currentPage = router.query.page || 1;
  const currentSearch = router.query.search || "";

  const setUrl = () => {
    router.replace({
      query: {
        limit: currentLimit || LIMIT_DEFAULT,
        page: currentPage || PAGE_DEFAULT,
        search: currentSearch,
      },
    });
  };

  useEffect(() => {
    if (router.isReady) {
      setUrl();
    }
  }, [router.isReady]);
  
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
    setUrl,
    currentPage,
    currentLimit,
    currentSearch,
    handleChangePage,
    handleChangeLimit,
    handleClearSearch,
    handleSearch,
  };
};
export default useChangeUrl;
