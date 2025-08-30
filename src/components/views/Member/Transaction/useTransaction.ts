import useChangeUrl from "@/hooks/useChangeUrls";
import orderServices from "@/services/order.service";
import { useQuery } from "@tanstack/react-query";

const useTransaction = () => {
  const { currentLimit, currentPage } = useChangeUrl();

  const getMemberTransactions = async () => {
    const params = `limit=${currentLimit}&page=${currentPage}`;
    const res = await orderServices.getMemberOrder(params);
    const { data } = res;
    return data;
  };

  const { data: dataTransactions, isLoading: isLoadingTransactions } = useQuery(
    {
      queryKey: ["Banners"],
      queryFn: getMemberTransactions,
    },
  );

  return {
    dataTransactions,
    isLoadingTransactions,
  };
};

export default useTransaction;
