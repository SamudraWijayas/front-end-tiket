import { ToasterContext } from "@/contexts/ToasterContext";
import orderServices from "@/services/order.service";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useDeleteTransactionModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const deleteTransaction = async (id: string) => {
    const res = await orderServices.deleteOrder(id);
    return res;
  };

  const {
    mutate: mutateDeleteTransaction,
    isPending: isPendingMutateDeleteTransaction,
    isSuccess: isSuccessMutateDeleteTransaction,
  } = useMutation({
    mutationFn: deleteTransaction,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Delete transaction success",
      });
    },
  });

  return {
    mutateDeleteTransaction,
    isPendingMutateDeleteTransaction,
    isSuccessMutateDeleteTransaction,
  };
};

export default useDeleteTransactionModal;
