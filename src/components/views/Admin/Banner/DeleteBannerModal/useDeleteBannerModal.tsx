import { ToasterContext } from "@/contexts/ToasterContext";
import bannerService from "@/services/banner.service";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useDeleteBannerModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const deleteBanner = async (id: string) => {
    const res = await bannerService.deleteBanner(id);
    return res;
  };

  const {mutate: mutateDeleteBanner, isPending: isPendingMutateDeleteBanner, isSuccess: isSuccessMutateDeleteBanner} = useMutation({
    mutationFn: deleteBanner,
    onError: (error: Error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Banner deleted successfully",
      });
    },
  });

  return {
   mutateDeleteBanner,
   isPendingMutateDeleteBanner,
   isSuccessMutateDeleteBanner,
  };
};

export default useDeleteBannerModal;
