import { Inter } from "next/font/google";
import Homes from "@/components/views/Home";
import LandingPageLayout from "@/components/layouts/LandingPageLayout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

// Inisialisasi font Inter
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // opsional, bisa dipakai di CSS variable
  weight: ["400", "500", "600", "700"], // pilih weight yang mau digunakan
});

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // tunggu session
    if (session?.user?.isProfileComplete === false) {
      router.replace("/auth/complete-profile"); // redirect ke halaman edit profile
    }
  }, [session, status, router]);

  if (status === "loading") return <p>Loading...</p>;

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
