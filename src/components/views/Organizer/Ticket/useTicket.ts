import useChangeUrl from "@/hooks/useChangeUrls";
import orderServices from "@/services/order.service";
import voucherServices from "@/services/voucher.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import Swal from "sweetalert2";

type Voucher = {
  _id: string;
  isPrint: boolean;
  // Tambahkan properti lain sesuai kebutuhan
};

type Order = {
  orderId: string;
  createdBy?: { fullName?: string };
  events?: { name?: string };
  ticket?: { name?: string; price?: number };
  status: string;
  vouchers: Voucher[];
};

const useOrder = () => {
  const router = useRouter();
  const { currentLimit, currentPage, currentSearch } = useChangeUrl();
  const [selectedId, setSelectedId] = useState("");

  const getOrganizerOrders = async () => {
    const params = `limit=${currentLimit}&page=${currentPage}&search=${currentSearch}`;
    const res = await orderServices.getTicketByOrganizer(params);
    const { data } = res;
    return data;
  };

  const {
    data: dataOrders,
    isLoading: isLoadingOrders,
    isRefetching: isRefetchingOrders,
    refetch: refetchOrders,
  } = useQuery({
    queryKey: ["OrganizerOrder", currentPage, currentLimit, currentSearch],
    queryFn: () => getOrganizerOrders(),
    enabled: router.isReady && !!currentPage && !!currentLimit,
  });
  const transformOrdersToVouchers = (orders: Order[]) => {
    return orders.flatMap((order) =>
      order.vouchers.map((v) => ({
        ...v,
        orderId: order.orderId,
        fullName: order.createdBy?.fullName ?? "-",
        eventName: order.events?.name ?? "-",
        ticketName: order.ticket?.name ?? "-",
        ticketPrice: order.ticket?.price ?? 0,
        status: order.status,
      })),
    );
  };

  const {
    mutate: scanVoucher,
    data: dataScan,
    isPending: isScanning,
  } = useMutation({
    mutationFn: (voucherId: string) =>
      voucherServices.scanVoucher(voucherId).then((res) => res.data),
    onMutate: () => {
      Swal.fire({
        title: "Scanning voucher...",
        didOpen: () => Swal.showLoading(),
        allowOutsideClick: false,
        allowEscapeKey: false,
      });
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Barcode sudah digunakan",
      });
    },
    onSuccess: (data) => {
      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: data?.meta?.message || "Barcode berhasil digunakan",
      });
    },
  });

  return {
    dataOrders,
    isLoadingOrders,
    isRefetchingOrders,
    refetchOrders,
    transformedOrders: transformOrdersToVouchers(dataOrders?.data || []),
    selectedId,
    setSelectedId,
    // expose mutation ke component
    scanVoucher,
    dataScan,
    isScanning,
  };
};

export default useOrder;
