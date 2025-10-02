import { Inter } from "next/font/google";
import Homes from "@/components/views/Home";
import LandingPageLayout from "@/components/layouts/LandingPageLayout";
import useCheckProfile from "@/hooks/isProfileComplete";
import { Metadata } from "next";

// Inisialisasi font Inter
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // opsional, bisa dipakai di CSS variable
  weight: ["400", "500", "600", "700"], // pilih weight yang mau digunakan
});

export const metadata: Metadata = {
  title: "Home | Jokindess",
  description: "Platform Terbaim untuk beli tiket dan buat acara",
};

export default function Home() {
  useCheckProfile();

  return (
    <div className={inter.className}>
      <LandingPageLayout
        title="Home - Platform Terbaim untuk beli tiket dan buat acara"
        description="Platform Terbaim untuk beli tiket dan buat acara"
        navbarBgColor="bg-white"
        navbarColor="text-black"
        navbarPathColor="text-blue-600"
      >
        <Homes />
      </LandingPageLayout>
    </div>
  );
}
