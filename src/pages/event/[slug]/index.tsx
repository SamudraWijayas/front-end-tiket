import LandingPageLayout from "@/components/layouts/LandingPageLayout";
import DetailEvent from "@/components/views/DetailEvent";
import { IEvent } from "@/types/Event";
import axios from "axios";
import { Poppins } from "next/font/google";
import { GetServerSideProps } from "next";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
  // console.log("data event:", dataEvent);

  return (
    <div className={poppins.className}>
      <LandingPageLayout
        title={`${dataEvent.name}`}
        description={stripTags(dataEvent.description || "")}
        image={`${process.env.NEXT_PUBLIC_IMAGE}${dataEvent.banner}`}
        keywords={`${dataEvent.name}, tiket ${dataEvent.name}, ${dataEvent.name} tiket, event ${dataEvent.name}`}
        navbarBgColor="bg-white"
        navbarColor="text-black"
        navbarPathColor="text-blue-600"
      >
        <DetailEvent />
      </LandingPageLayout>
    </div>
  );
}

// ✅ Ambil slug via context.params (bukan props langsung)
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
