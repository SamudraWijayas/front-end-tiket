import PageHead from "@/components/commons/PageHead";
import { Geist, Geist_Mono } from "next/font/google";
import { getServerSession } from "next-auth/next";
import { GetServerSidePropsContext } from "next";

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
    <div
      className={`${geistSans.className} ${geistMono.className} grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-sans sm:p-20`}
    >
      <main className="row-start-2 flex flex-col items-center gap-[32px] sm:items-start">
        <PageHead />
        hello world
      </main>
    </div>
  );
}
