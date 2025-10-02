import { ToasterContext } from "@/contexts/ToasterContext";
import orderServices from "@/services/order.service";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useDeleteOrderModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const deleteOrder = async (id: string) => {
    const res = await orderServices.deleteOrder(id);
    return res;
  };

  const {
    mutate: mutateDeleteOrder,
    isPending: isPendingMutateDeleteOrder,
    isSuccess: isSuccessMutateDeleteOrder,
  } = useMutation({
    mutationFn: deleteOrder,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Delete Order success",
      });
    },
  });

  return {
    mutateDeleteOrder,
    isPendingMutateDeleteOrder,
    isSuccessMutateDeleteOrder,
  };
};

export default useDeleteOrderModal;
