import { ToasterContext } from "@/contexts/ToasterContext";
import categoryService from "@/services/category.service";
import { ICategory } from "@/types/Category";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";

const useDetailCategory = () => {
  const { query, isReady } = useRouter();
const { setToaster } = useContext(ToasterContext);


  const getCategoryId = async (id: string) => {
    const { data } = await categoryService.getCategoryById(id);
    return data.data;
  };

  const {
    data: dataCategory,
    refetch: refetchCategory,
  } = useQuery({
    queryKey: ["category", query.id],
    queryFn: () => getCategoryId(query.id as string),
    enabled: isReady && !!query.id,
  });

  const updateCategory = async (payload: ICategory) => {
    const { data } = await categoryService.updateCategory(
      `${query.id}`,
      payload,
    );
    return data.data;
  };

  const {
    mutate: mutateUpdateCategory,
    isPending: isPendingMutateUpdateCategory,
    isSuccess: isSuccessMutateUpdateCategory,
  } = useMutation({
    mutationFn: (payload: ICategory) => updateCategory(payload),
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: (result) => {
      refetchCategory();
      setToaster({
        type: "success",
        message: "Update category successfully",
      });
    },
  });

  

  const handleUpdateCategory = async (data: ICategory) =>
    mutateUpdateCategory(data);

  return {
    dataCategory,

    handleUpdateCategory,

    isPendingMutateUpdateCategory,
    isSuccessMutateUpdateCategory,
  };
};

export default useDetailCategory;
