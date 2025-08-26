import PageHead from "@/components/commons/PageHead";
import { Geist, Geist_Mono } from "next/font/google";
import Homes from "@/components/views/Home";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div>
      <PageHead />
      <Homes />
    </div>
  );
}
