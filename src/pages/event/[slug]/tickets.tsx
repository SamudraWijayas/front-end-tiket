import LandingPageLayout from "@/components/layouts/LandingPageLayout";
import Ticket from "@/components/views/DetailEvent/Ticket";
import { IEvent } from "@/types/Event";
import axios from "axios";
import { GetServerSideProps } from "next";

import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // sesuai kebutuhan
  variable: "--font-poppins",
});

interface PageProps {
  dataEvent: IEvent;
}

interface IEventResponse {
  data: IEvent;
}
function stripTags(html: string) {
  return html.replace(/<[^>]*>?/gm, "").trim();
}

export default function Event({ dataEvent }: PageProps) {
  return (
    <div className={poppins.className}>
      <LandingPageLayout
        title={`${dataEvent.name} - Tickets `}
        description={stripTags(dataEvent.description || "")}
        image={`${process.env.NEXT_PUBLIC_IMAGE}${dataEvent.banner}`}
        navbarBgColor="bg-white"
        navbarColor="text-black"
        navbarPathColor="font-extrabold"
      >
        <Ticket />
      </LandingPageLayout>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params!;
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  try {
    const { data } = await axios.get<IEventResponse>(
      `${API_URL}/events/${slug}/slug`,
    );

    return {
      props: {
        dataEvent: data.data, // ✅ hanya ambil isi event
      },
    };
  } catch (error) {
    console.error("Error fetching event:", error);
    return {
      notFound: true, // tampilkan 404 kalau gagal fetch
    };
  }
};
