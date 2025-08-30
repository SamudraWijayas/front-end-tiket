import { ToasterContext } from "@/contexts/ToasterContext";
import authServices from "@/services/auth.service";
import { IProfile } from "@/types/Auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";

const useProfile = () => {
  const { isReady } = useRouter();
  const { setToaster } = useContext(ToasterContext);

  const getProfile = async () => {
    const { data } = await authServices.getProfile();
    return data.data;
  };

  const { data: dataProfile, refetch: refetchProfile } = useQuery({
    queryKey: ["Profile"],
    queryFn: getProfile,
    enabled: isReady,
  });

  const updateProfile = async (payload: IProfile) => {
    const { data } = await authServices.updateProfile(payload);
    return data.data;
  };

  const {
    mutate: mutateUpdateProfile,
    isPending: isPendingMutateUpdateProfile,
    isSuccess: isSuccessMutateUpdateProfile,
  } = useMutation({
    mutationFn: (payload: IProfile) => updateProfile(payload),
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      refetchProfile();
      setToaster({
        type: "success",
        message: "Success update profile",
      });
    },
  });

  const handleUpdateProfile = (data: IProfile) => mutateUpdateProfile(data);

  return {
    dataProfile,
    handleUpdateProfile,
    isPendingMutateUpdateProfile,
    isSuccessMutateUpdateProfile,
  };
};

export default useProfile;
