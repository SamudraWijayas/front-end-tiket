"use client";

import Image from "next/image";
import { Calendar, Clock, MapPin, Instagram, Globe } from "lucide-react";
import useDetailEvent from "./useDetailEvent";
import { Skeleton } from "@heroui/react";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const Event = () => {
  const { dataEvent, minTicket } = useDetailEvent();

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

  return (
    <div className="mx-auto my-8 flex w-full max-w-6xl flex-col justify-center gap-8 px-4 lg:flex-row lg:px-0">
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
            <div className="relative ">
              <div
                className={`leading-relaxed whitespace-pre-line text-gray-700 ${
                  !showMore ? "line-clamp-3 transition-all" : ""
                }`}
              >
                {dataEvent?.description}
              </div>

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
      </div>

      {/* Info Event */}
      <div className="h-fit w-full rounded-2xl border border-gray-200 bg-white p-6 shadow-md lg:sticky lg:top-20 lg:w-[355px]">
        <div className="flex flex-col space-y-5">
          <h1 className="text-lg font-bold text-gray-900">{dataEvent?.name}</h1>

          <div className="flex flex-col space-y-3 text-gray-700">
            <div className="flex items-center gap-2">
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
                className="w-full rounded-lg"
              >
                <span>{eventTime} WIB</span>
              </Skeleton>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={20} className="text-blue-600" />
              <Skeleton
                isLoaded={!!dataEvent?.location.address}
                className="w-full rounded-lg"
              >
                <span>{dataEvent?.location.address}</span>
              </Skeleton>
            </div>
          </div>

          <div className="">
            <span className="text-sm text-gray-400">Dibuat oleh</span>
            <Skeleton isLoaded={!!dataEvent?.createdBy}>
              <p className="text-sm font-bold text-gray-800">
                {dataEvent?.createdBy?.fullName}
              </p>
            </Skeleton>
          </div>

          <div>
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
          <div className="mt-5 flex gap-2">
            <button className="flex flex-1 items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100">
              <Instagram size={16} className="text-pink-500" /> Instagram
            </button>
            <button className="flex flex-1 items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100">
              <Globe size={16} className="text-green-600" /> Website
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Event;
