import { ToasterContext } from "@/contexts/ToasterContext";
import bannerService from "@/services/banner.service";
import { IBanner } from "@/types/Banner";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";

const useDetailBanner = () => {
  const { query, isReady } = useRouter();
  const { setToaster } = useContext(ToasterContext);

  const getBannerId = async () => {
    const { data } = await bannerService.getBannerById(`${query.id}`);
    return data.data;
  };

  const { data: dataBanner, refetch: refetchBanner } = useQuery({
    queryKey: ["Banner", query.id],
    queryFn: getBannerId,
    enabled: isReady && !!query.id,
  });

  const updateBanner = async (payload: IBanner) => {
    const { data } = await bannerService.updateBanner(`${query.id}`, payload);
    return data.data;
  };

  const {
    mutate: mutateUpdateBanner,
    isPending: isPendingMutateUpdateBanner,
    isSuccess: isSuccessMutateUpdateBanner,
  } = useMutation({
    mutationFn: (payload: IBanner) => updateBanner(payload),
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: (result) => {
      refetchBanner();
      setToaster({
        type: "success",
        message: "Update banner successfully",
      });
    },
  });

  const handleUpdateBanner = async (data: IBanner) => mutateUpdateBanner(data);

  return {
    dataBanner,

    handleUpdateBanner,

    isPendingMutateUpdateBanner,
    isSuccessMutateUpdateBanner,
  };
};

export default useDetailBanner;
