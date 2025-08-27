import Image from "next/image";
import { Calendar, Clock, MapPin, Instagram, Globe } from "lucide-react";

const Event = () => {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col justify-center gap-6 px-4 lg:flex-row lg:px-0 my-6">
      {/* Konten Kiri */}
      <div className="min-h-[70vh] w-full flex-1 space-y-4">
        {/* Banner */}
        <div className="relative h-[400px] w-full overflow-hidden rounded-xl shadow-lg">
          <Image
            src="/images/general/logogreen.jpg"
            alt="Amanda Festival"
            fill
            className="object-cover"
          />
        </div>

        {/* Deskripsi */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Deskripsi</h2>
          <p className="line-clamp-3 leading-relaxed text-gray-700">
            Amanda Festival 2025. Dalam rangka merayakan 25 tahun perjalanan
            Amanda Brownies, hadir sebuah konser perayaan spesial bertajuk
            Amanda Festival sebagai puncak acara ulang tahun ke 25 Amanda
            Brownies. Festival ini bukan hanya sekadar konser musik spektakuler,
            tetapi juga menghadirkan pengalaman yang tak terlupakan bagi semua
            pengunjung.
          </p>
          <button className="text-blue-600 hover:underline">
            Tampilkan Lebih Banyak
          </button>
        </div>
      </div>

      {/* Info Event */}
      <div className="h-fit w-full rounded-xl border border-gray-200 p-6 shadow-sm lg:sticky lg:top-20 lg:w-86">
        <div className="flex flex-col space-y-4">
          <h1 className="text-3xl font-extrabold">AMANDA FESTIVAL</h1>

          <div className="flex flex-col space-y-2 text-gray-700">
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

          <p className="text-sm text-gray-500">
            Dibuat Oleh Amanda Festival 2025
          </p>

          <div>
            <span className="text-lg font-semibold">Mulai Dari Rp125.000</span>
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
