import LandingPageLayout from "@/components/layouts/LandingPageLayout";
import Ticket from "@/components/views/DetailEvent/Ticket";


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
        <Ticket />
      </LandingPageLayout>
    </div>
  );
}
