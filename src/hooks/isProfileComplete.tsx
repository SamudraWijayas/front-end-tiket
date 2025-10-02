import { useEffect, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { ToasterContext } from "@/contexts/ToasterContext";
import authServices from "@/services/auth.service";

const useCheckProfile = () => {
  const router = useRouter();
  const { setToaster } = useContext(ToasterContext);

  // 1️⃣ Ambil profil user
  const getProfile = async () => {
    const { data } = await authServices.getProfile();
    return data.data;
  };

  const {
    data: dataProfile,
    refetch: refetchProfile,
    isLoading,
  } = useQuery({
    queryKey: ["Profile"],
    queryFn: getProfile,
    enabled: true, // langsung fetch
  });

  // 2️⃣ Cek apakah profil lengkap
  useEffect(() => {
    if (dataProfile && dataProfile.isProfileComplete === false) {
      setToaster({
        type: "info",
        message: "Silakan lengkapi profil Anda terlebih dahulu",
      });
      router.replace("/auth/complete-profile");
    }
  }, [dataProfile, router, setToaster]);

  return {
    dataProfile,
    refetchProfile,
    isLoading,
  };
};

export default useCheckProfile;
