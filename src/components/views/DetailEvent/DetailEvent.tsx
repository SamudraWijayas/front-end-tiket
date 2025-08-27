import Image from "next/image";
import { Calendar, Clock, MapPin, Instagram, Globe } from "lucide-react";
import useDetailEvent from "./useDetailEvent";
import { convertTime } from "@/utils/date";
import { Skeleton } from "@heroui/react";

const Event = () => {
  const {
    dataEvent,
    isLoadingDetailEvent,
    dataTicket,
    isLoadingTicket,
    minTicket,
    isLoadingMinTicket,
  } = useDetailEvent();
  const eventDate = dataEvent?.startDate
    ? new Date(dataEvent.startDate).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "-";

  const eventTime = dataEvent?.startDate
    ? new Date(dataEvent.startDate).toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "-";

  const formattedTicketPrice = minTicket?.price
    ? new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(minTicket.price)
    : null;

  return (
    <div className="mx-auto my-6 flex w-full max-w-6xl flex-col justify-center gap-6 px-4 lg:flex-row lg:px-0">
      {/* Konten Kiri */}
      <div className="min-h-[70vh] w-full flex-1 space-y-4">
        {/* Banner */}
        <Skeleton
          className="mb-4 h-[400px] w-full rounded-xl shadow-lg"
          isLoaded={!!dataEvent?.banner}
        >
          {dataEvent?.banner ? (
            <div className="relative h-[400px] w-full overflow-hidden rounded-xl shadow-lg">
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGE}${dataEvent.banner}`}
                alt={dataEvent.name}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="h-[400px] w-full rounded-xl bg-gray-200" />
          )}
        </Skeleton>

        {/* {dataEvent?.banner && (
          <div className="relative h-[400px] w-full overflow-hidden rounded-xl shadow-lg">
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGE}${dataEvent.banner}`}
              alt={dataEvent.name}
              fill
              className="object-cover"
            />
          </div>
        )} */}

        {/* Deskripsi */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Deskripsi</h2>
          <Skeleton
            className="mt-2 h-32 w-full rounded-lg"
            isLoaded={!!dataEvent?.description}
          >
            <p className="line-clamp-3 leading-relaxed text-gray-700">
              {dataEvent?.description}
            </p>
          </Skeleton>

          <button className="text-blue-600 hover:underline">
            Tampilkan Lebih Banyak
          </button>
        </div>
      </div>

      {/* Info Event */}
      <div className="h-fit w-full rounded-xl border border-gray-200 p-6 shadow-sm lg:sticky lg:top-20 lg:w-86">
        <div className="flex w-full max-w-[300px] items-center gap-3"></div>
        <div className="flex flex-col space-y-4">
          <Skeleton isLoaded={!!dataEvent?.name} className="mb-2 w-2/3 rounded">
            <h1 className="text-xl font-extrabold">{dataEvent?.name}</h1>
          </Skeleton>

          <div className="flex flex-col space-y-2 text-gray-700">
            <div className="flex items-center gap-2">
              <Calendar size={18} />
              <Skeleton
                isLoaded={!!eventDate}
                className="mb-2 h-8 items-center rounded-lg"
              >
                <span>{eventDate}</span>
              </Skeleton>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={18} />
              <Skeleton isLoaded={!!eventTime} className="mb-2 h-8 rounded-lg">
                <span>{eventTime} WIB</span>
              </Skeleton>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={18} />
              <span>{dataEvent?.location.address}</span>
            </div>
          </div>

          <p className="text-sm text-gray-500">
            Dibuat Oleh Amanda Festival 2025
          </p>

          <div>
            <Skeleton
              isLoaded={!!formattedTicketPrice}
              className="mb-2 h-8 rounded-lg"
            >
              <span className="text-lg font-semibold">
                Mulai Dari {formattedTicketPrice}
              </span>
            </Skeleton>
          </div>

          <button className="mt-2 w-full rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700">
            Beli Sekarang
          </button>

          {/* Media Sosial */}
          <div className="mt-4 flex gap-2">
            <button className="flex flex-1 items-center justify-center gap-1 rounded-lg border px-3 py-2 transition hover:bg-gray-100">
              <Instagram size={16} /> Instagram
            </button>
            <button className="flex flex-1 items-center justify-center gap-1 rounded-lg border px-3 py-2 transition hover:bg-gray-100">
              <Globe size={16} /> Website
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Event;
