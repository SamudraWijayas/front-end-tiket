
import orderServices from "@/services/order.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";


const useDashboard = () => {
  const router = useRouter();



  const getOrderTotal = async () => {
    const res = await orderServices.getOrdersTotal();
    const { data } = res;
    return data;
  };

  const {
    data: dataOrderTotal,
    isLoading: isLoadingOrderTotal,
    isRefetching: isRefetchingOrderTotal,
    refetch: refetchOrderTotal,
  } = useQuery({
    queryKey: ["OrderTotal"],
    queryFn: getOrderTotal,
    enabled: router.isReady,
  });

  return {
    dataOrderTotal,
    isLoadingOrderTotal,
    isRefetchingOrderTotal,
    refetchOrderTotal,

  };
};

export default useDashboard;
