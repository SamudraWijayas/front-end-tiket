"use client";

import Image from "next/image";
import {
  Calendar,
  Clock,
  MapPin,

  ArrowUpRight,
} from "lucide-react";
import useDetailEvent from "./useDetailEvent";
import { Skeleton } from "@heroui/react";
import { useState } from "react";
import Link from "next/link";
import { ILineup } from "@/types/Lineup";

const Event = () => {
  const {
    dataEvent,
    minTicket,
    dataLineup,

  } = useDetailEvent();

  const [showMore, setShowMore] = useState(false);

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

  const socialMediaList = [
    {
      key: "instagram",
      nama: "Instagram",
      prefix: "https://instagram.com/",
      icon: "/images/icon/ig.svg",
    },
    {
      key: "tiktok",
      nama: "Tiktok",
      prefix: "https://tiktok.com/@",
      icon: "/images/icon/tt.svg",
    },
    {
      key: "website",
      prefix: "",
      nama: "Website",
      icon: "/images/icon/web.png",
    },
    {
      key: "facebook",
      prefix: "https://facebook.com/",
      nama: "Facebook",
      icon: "/images/icon/fb.png",
    },
    {
      key: "telegram",
      nama: "Telegram",
      prefix: "https://t.me/",
      icon: "/images/icon/tele.svg",
    },
    {
      key: "whatsapp",
      nama: "WhatsApp",
      prefix: "https://wa.me/62",
      icon: "/images/icon/wa.svg",
    },
    {
      key: "x",
      nama: "X",
      prefix: "https://x.com/",
      icon: "/images/icon/x.svg",
    },
  ];

  return (
    <div className="mx-auto mt-28 mb-8 flex w-full max-w-6xl flex-col justify-center gap-8 px-4 lg:flex-row lg:px-0">
      {/* Konten Kiri */}
      <div className="min-h-[70vh] w-full flex-1 space-y-6">
        {/* Banner */}
        <Skeleton
          className="h-[400px] w-full rounded-2xl shadow-md"
          isLoaded={!!dataEvent?.banner}
        >
          {dataEvent?.banner ? (
            <div className="relative h-[400px] w-full overflow-hidden rounded-2xl shadow-md">
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGE}${dataEvent.banner}`}
                alt={dataEvent.name}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          ) : (
            <div className="h-[400px] w-full rounded-2xl bg-gray-200" />
          )}
        </Skeleton>

        {/* Deskripsi */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">Deskripsi</h2>
          <Skeleton
            className="min-h-[120px] w-full rounded-lg"
            isLoaded={!!dataEvent?.description}
          >
            <div className="relative">
              <div
                className={`prose max-w-none leading-relaxed text-gray-700 ${
                  !showMore ? "line-clamp-3 overflow-hidden transition-all" : ""
                }`}
                dangerouslySetInnerHTML={{
                  __html: dataEvent?.description || "",
                }}
              />

              {dataEvent?.description && (
                <button
                  onClick={() => setShowMore(!showMore)}
                  className="mt-4 text-sm font-bold text-blue-800 transition hover:underline"
                >
                  {showMore
                    ? "Tampilkan Lebih Sedikit"
                    : "Tampilkan Lebih Banyak"}
                </button>
              )}
            </div>
          </Skeleton>
        </div>
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">Lineup</h2>
          <Skeleton
            className="min-h-[120px] w-full rounded-lg"
            isLoaded={!!dataLineup?.length}
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {dataLineup?.map((artis: ILineup) => (
                <a
                  key={artis._id || artis.nama}
                  href={artis.sosialmedia}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-3 rounded border border-gray-200 p-2 shadow-sm transition hover:bg-gray-50 hover:shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative h-16 w-16 flex-shrink-0">
                      <Image
                        src={
                          artis.foto
                            ? `${process.env.NEXT_PUBLIC_IMAGE}${artis.foto}`
                            : "/default.png"
                        }
                        alt={artis.nama}
                        fill
                        className="rounded object-cover"
                      />
                    </div>
                    <span className="font-medium text-gray-700">
                      {artis.nama}
                    </span>
                  </div>
                  {artis.sosialmedia && (
                    <ArrowUpRight
                      size={20}
                      className="text-gray-400 transition hover:text-gray-700"
                    />
                  )}
                </a>
              ))}
            </div>
          </Skeleton>
        </div>
      </div>

      {/* Info Event */}
      <div className="h-fit w-full rounded-2xl border border-gray-200 bg-white p-6 shadow-md lg:sticky lg:top-20 lg:w-[355px]">
        <div className="flex flex-col space-y-5">
          <h1 className="text-lg font-bold text-gray-900">{dataEvent?.name}</h1>

          <div className="flex flex-col space-y-3 text-gray-700">
            <div className="flex w-4/5 items-center gap-2">
              <Calendar size={18} className="text-blue-600" />
              <Skeleton
                isLoaded={!!dataEvent?.startDate}
                className="w-full rounded-lg"
              >
                <span>{eventDate}</span>
              </Skeleton>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={18} className="text-blue-600" />
              <Skeleton
                isLoaded={!!dataEvent?.startDate}
                className="w-1/3 rounded-lg"
              >
                <span>{eventTime} WIB</span>
              </Skeleton>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={20} className="text-blue-600" />
              <Skeleton
                isLoaded={!!dataEvent?.location.address}
                className="min-h-[26px] w-full rounded-lg" // kasih min-h biar gak ilang
              >
                <span className="block">{dataEvent?.location.address}</span>
              </Skeleton>
            </div>
          </div>

          <div className="">
            <span className="text-sm text-gray-400">Dibuat oleh</span>
            <Skeleton
              isLoaded={!!dataEvent?.createdBy}
              className="min-h-[26px] w-full rounded-lg"
            >
              <p className="text-sm font-bold text-gray-800">
                {dataEvent?.createdBy?.fullName}
              </p>
            </Skeleton>
          </div>

          <div className="hidden lg:inline-block">
            <Skeleton
              isLoaded={!!formattedTicketPrice}
              className="mb-2 h-8 rounded-lg"
            >
              <span className="text-lg font-semibold text-gray-900">
                Mulai Dari {formattedTicketPrice}
              </span>
            </Skeleton>
            <Link
              href={`/event/${dataEvent?.slug}/tickets`}
              className="block w-full rounded-lg bg-blue-600 px-4 py-2 text-center text-white shadow transition hover:bg-blue-700"
            >
              Beli Sekarang
            </Link>
          </div>

          {/* Media Sosial */}
        </div>
        <div className="mt-5 grid grid-cols-2 gap-2">
          {socialMediaList.map((item) => {
            const value =
              dataEvent?.socialMedia?.[
                item.key as keyof typeof dataEvent.socialMedia
              ];
            if (!value) return null; // kalau kosong -> skip
            return (
              <a
                href={`${item.prefix}${value}`}
                key={item.key}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-start gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
              >
                <Image
                  src={item.icon}
                  alt={item.key}
                  width={22}
                  height={22}
                  className="cursor-pointer"
                />
                <p>
                  {item.nama}
                  {/* <span>{value}</span> */}
                </p>
              </a>
            );
          })}
        </div>

        <div className="bayangan fixed right-0 bottom-0 left-0 z-100 bg-white p-4 shadow-md lg:hidden lg:p-0 lg:shadow-none">
          <Skeleton
            isLoaded={!!formattedTicketPrice}
            className="mb-2 h-8 rounded-lg"
          >
            <span className="text-lg font-semibold text-gray-900">
              Mulai Dari {formattedTicketPrice}
            </span>
          </Skeleton>
          <Link
            href={`/event/${dataEvent?.slug}/tickets`}
            className="block w-full rounded-lg bg-blue-600 px-4 py-2 text-center text-white shadow transition hover:bg-blue-700"
          >
            Beli Sekarang
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Event;
