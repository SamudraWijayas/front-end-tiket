import { Inter } from "next/font/google";
import Events from "@/components/views/Event";
import LandingPageLayout from "@/components/layouts/LandingPageLayout";

// Inisialisasi font Inter
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // opsional, bisa dipakai di CSS variable
  weight: ["400", "500", "600", "700"], // pilih weight yang mau digunakan
});

export default function Event() {
  return (
    <div className={inter.className}>
      <LandingPageLayout title="Event">
        <Events />
      </LandingPageLayout>
    </div>
  );
}
