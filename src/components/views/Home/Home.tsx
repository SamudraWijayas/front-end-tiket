"use client";

import Image from "next/image";
import { MapPin, Search } from "lucide-react";
import { Card, Input, Select, SelectItem } from "@heroui/react";
import HomeSlider from "./HomeSlider";
import useHome from "./useHome";
import HomeList from "./HomeList";

export default function Home() {
  const {
    dataBanners,
    isLoadingBanners,
    dataFeaturedEvents,
    isLoadingFeaturedEvents,
    dataLatestEvents,
    isLoadingLatestEvents,
    dataCategories,
    isLoadingCategories,
  } = useHome();
  return (
    <>
      {/* <section className="flex h-screen w-full flex-col bg-gradient-to-r from-purple-600 to-pink-500 text-white">
        <div className="flex flex-1 items-center justify-between px-16">
          <div className="max-w-xl">
            <h1 className="mb-4 text-4xl font-bold">
              SBS MTV The Kpop Show Ticket Package
            </h1>
            <p className="mb-6 text-lg">
              Look no further! Our SBS The Show tickets are the simplest way for
              you to experience a live Kpop recording.
            </p>
            <div className="flex gap-4">
              <button className="rounded-full bg-pink-600 px-6 py-3 font-semibold transition hover:bg-pink-700">
                Get Ticket
              </button>
              <button className="rounded-full border border-white px-6 py-3 font-semibold transition hover:bg-white hover:text-pink-600">
                Learn More
              </button>
            </div>
          </div>

          <div className="relative h-[500px] w-[500px]">
            <Image
              src="/images/general/logo.png"
              alt="Event BTS"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </section>

      <div className="mx-auto -mt-14 w-[90%]">
        <Card className="mx-auto w-full max-w-6xl rounded-2xl bg-white p-6 shadow-xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="flex-1">
              <label htmlFor="">Search Event</label>
              <Input
                isClearable
                placeholder="Search Event"
                startContent={<Search className="text-gray-400" />}
                onClear={() => {}}
              />
            </div>

            <div className="flex-1">
              <Input
                isClearable
                placeholder="Location"
                startContent={<MapPin className="text-gray-400" />}
                onClear={() => {}}
              />
            </div>

            <div className="flex-1">
              <Select placeholder="Any date">
                <SelectItem>Any date</SelectItem>
                <SelectItem>Today</SelectItem>
                <SelectItem>This week</SelectItem>
                <SelectItem>This month</SelectItem>
              </Select>
            </div>
          </div>
        </Card>
      </div> */}
      <HomeSlider
        banners={dataBanners?.data}
        isLoadingBanners={isLoadingBanners}
      />
      <HomeList
        title="Featured Event"
        events={dataFeaturedEvents?.data}
        isLoading={isLoadingFeaturedEvents}
      />
    </>
  );
}
