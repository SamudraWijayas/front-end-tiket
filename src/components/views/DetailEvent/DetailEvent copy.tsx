import React from "react";
import Image from "next/image";
import { Calendar, Clock, MapPin } from "lucide-react";

interface LineupItem {
  id: number;
  name: string;
  image: string;
}

const lineup: LineupItem[] = [
  { id: 1, name: "VIERRATALE", image: "/images/vierratale.jpg" },
  { id: 2, name: "DNA (DJ ALLOY & DJ JAYJAX)", image: "/images/general/logo.png" },
  {
    id: 3,
    name: "Ari Lesmana Feat OomLeoBerkaraoke",
    image: "/images/ari.jpg",
  },
];

const DetailEvent = () => {
  return (
    <div className="mx-auto max-w-6xl space-y-6 p-4">
      {/* Banner utama */}
      <div className="relative h-[400px] w-full overflow-hidden rounded-2xl shadow-lg">
        <Image
          src="/images/general/logogreen.jpg"
          alt="Amanda Festival"
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Info Kanan */}
        <div className="flex flex-col gap-4 lg:w-1/3">
          <h1 className="text-3xl font-extrabold">AMANDA FESTIVAL</h1>
          <div className="flex flex-col gap-3 text-gray-700">
            <div className="flex items-center gap-2">
              <Calendar size={18} />
              <span>26 Oktober 2025</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={18} />
              <span>15:00 WIB</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={18} />
              <span>
                Halaman Parkir BSCC DOME Balikpapan, Kota Balikpapan, Kalimantan
                Timur
              </span>
            </div>
          </div>
          <div className="">
            
          </div>
          <p className="text-sm text-gray-500">
            Dibuat Oleh Amanda Festival 2025
          </p>
          <div>
            <span className="text-lg font-semibold">Mulai Dari Rp125.000</span>
          </div>
          <button className="mt-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
            Beli Sekarang
          </button>

          {/* Media Sosial */}
          <div className="mt-4 flex gap-2">
            <button className="flex items-center gap-1 rounded border px-3 py-1 hover:bg-gray-100">
              Instagram
            </button>
            <button className="flex items-center gap-1 rounded border px-3 py-1 hover:bg-gray-100">
              Website
            </button>
          </div>
        </div>

        {/* Konten Kiri */}
        <div className="flex flex-col gap-6 lg:w-2/3">

          {/* Deskripsi */}
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Deskripsi</h2>
            <p className="line-clamp-3 text-gray-700">
              Amanda Festival 2025. Dalam rangka merayakan 25 tahun perjalanan
              Amanda Brownies, hadir sebuah konser perayaan spesial bertajuk
              Amanda Festival sebagai puncak acara ulang tahun ke 25 Amanda
              Brownies. Festival ini bukan hanya sekadar konser musik
              spektakuler, tetapi juga menghadirkan pengalaman yang tak
              terlupakan bagi semua pengunjung.
            </p>
            <button className="text-blue-600 hover:underline">
              Tampilkan Lebih Banyak
            </button>
          </div>

          {/* Lineup */}
          <div>
            <h2 className="mb-3 text-xl font-semibold">Lineup</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {lineup.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 rounded-lg border p-3 shadow-sm transition hover:shadow-md"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={70}
                    height={70}
                    className="rounded-lg object-cover"
                  />
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailEvent;
