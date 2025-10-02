import { Inter } from "next/font/google";
import Homes from "@/components/views/Home";
import LandingPageLayout from "@/components/layouts/LandingPageLayout";
import useCheckProfile from "@/hooks/isProfileComplete";

// Inisialisasi font Inter
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // opsional, bisa dipakai di CSS variable
  weight: ["400", "500", "600", "700"], // pilih weight yang mau digunakan
});

export default function Home() {
  const { dataProfile, isLoading } = useCheckProfile();
  return (
    <div className={inter.className}>
      <LandingPageLayout
        title="Home"
        navbarBgColor="bg-white"
        navbarColor="text-black"
        navbarPathColor="text-blue-600"
      >
        <Homes />
      </LandingPageLayout>
    </div>
  );
}
