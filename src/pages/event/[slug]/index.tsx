import LandingPageLayout from "@/components/layouts/LandingPageLayout";
import DetailEvent from "@/components/views/DetailEvent";

import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // sesuai kebutuhan
  variable: "--font-poppins",
});

export default function Event() {
  return (
    <div className={poppins.className}>
      <LandingPageLayout
        title="Event"
        navbarBgColor="bg-white"
        navbarColor="text-black"
        navbarPathColor="font-extrabold"
      >
        <DetailEvent />
      </LandingPageLayout>
    </div>
  );
}
