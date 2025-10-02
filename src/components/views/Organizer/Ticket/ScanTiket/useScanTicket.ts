import voucherServices from "@/services/voucher.service";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import Swal from "sweetalert2";

const useOrder = () => {
  const [selectedId, setSelectedId] = useState("");

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
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        window.location.reload(); // ⬅️ refresh setelah error
      });
    },
    onSuccess: (data) => {
      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: data?.meta?.message || "Barcode berhasil digunakan",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        window.location.reload(); // ⬅️ refresh setelah success
      });
    },
  });

  return {
    selectedId,
    setSelectedId,
    scanVoucher,
    dataScan,
    isScanning,
  };
};

export default useOrder;
