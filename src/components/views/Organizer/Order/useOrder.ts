import { ToasterContext } from "@/contexts/ToasterContext";
import useChangeUrl from "@/hooks/useChangeUrls";
import orderServices from "@/services/order.service";
import voucherServices from "@/services/voucher.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext, useState } from "react";

const useOrder = () => {
  const router = useRouter();
  const { setToaster } = useContext(ToasterContext);
  const { currentLimit, currentPage, currentSearch } = useChangeUrl();
  const [selectedId, setSelectedId] = useState("");

  const getAdminOrders = async () => {
    const params = `limit=${currentLimit}&page=${currentPage}&search=${currentSearch}`;
    const res = await orderServices.getOrderByEventOrganizer(params);
    const { data } = res;
    return data;
  };

  const {
    data: dataOrders,
    isLoading: isLoadingOrders,
    isRefetching: isRefetchingOrders,
    refetch: refetchOrders,
  } = useQuery({
    queryKey: ["AdminOrder", currentPage, currentLimit, currentSearch],
    queryFn: () => getAdminOrders(),
    enabled: router.isReady && !!currentPage && !!currentLimit,
  });

  const {
    mutate: scanVoucher,
    data: dataScan,
    isPending: isScanning,
    error: errorScan,
  } = useMutation({
    mutationFn: (voucherId: string) =>
      voucherServices.scanVoucher(voucherId).then((res) => res.data),
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message || "Terjadi kesalahan",
      });
    },
    onSuccess: (data) => {
      setToaster({
        type: "success",
        message: data?.meta?.message || "Barcode berhasil digunakan",
      });
    },
  });

  return {
    dataOrders,
    isLoadingOrders,
    isRefetchingOrders,
    refetchOrders,

    selectedId,
    setSelectedId,
    // expose mutation ke component
    scanVoucher,
    dataScan,
    isScanning,
    errorScan,
  };
};

export default useOrder;
