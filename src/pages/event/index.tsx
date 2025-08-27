import { Inter } from "next/font/google";
import LandingPageLayout from "@/components/layouts/LandingPageLayout";
import Events from "@/components/views/Events";

// Inisialisasi font Inter
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // opsional, bisa dipakai di CSS variable
  weight: ["400", "500", "600", "700"], // pilih weight yang mau digunakan
});

export default function Event() {
  return (
    <div className={inter.className}>
      <LandingPageLayout title="Event" navbarBgColor="bg-blue-800" navbarColor="text-white" navbarPathColor="font-extrabold">
        <Events/>
      </LandingPageLayout>
    </div>
  );
}
