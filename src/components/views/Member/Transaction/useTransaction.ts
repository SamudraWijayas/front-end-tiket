import useChangeUrl from "@/hooks/useChangeUrls";
import orderServices from "@/services/order.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useTransaction = () => {
  const router = useRouter();
  const { currentLimit, currentPage } = useChangeUrl();

  const getMemberTransactions = async () => {
    const params = `limit=${currentLimit}&page=${currentPage}`;
    const res = await orderServices.getMemberOrder(params);
    return res.data;
  };

  const {
    data: dataTransactions,
    isLoading: isLoadingTransactions,
    isFetching,
  } = useQuery({
    queryKey: ["transactions", currentPage, currentLimit], // ✅ dinamis & unik per page
    queryFn: getMemberTransactions,
    enabled: router.isReady && !!currentPage && !!currentLimit, // ✅ fetch hanya jika param siap
  });

  return {
    dataTransactions,
    isLoadingTransactions: isLoadingTransactions || isFetching,
  };
};

export default useTransaction;
