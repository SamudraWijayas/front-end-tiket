import { ToasterContext } from "@/contexts/ToasterContext";
import categoryService from "@/services/category.service";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useDeleteCategoryModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const deleteCategory = async (id: string) => {
    const res = await categoryService.deleteCategory(id);
    return res;
  };

  const {mutate: mutateDeleteCategory, isPending: isPendingMutateDeleteCategory, isSuccess: isSuccessMutateDeleteCategory} = useMutation({
    mutationFn: deleteCategory,
    onError: (error: Error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Category deleted successfully",
      });
    },
  });

  return {
   mutateDeleteCategory,
   isPendingMutateDeleteCategory,
   isSuccessMutateDeleteCategory,
  };
};

export default useDeleteCategoryModal;
