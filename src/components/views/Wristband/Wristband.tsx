import React, { useMemo, useState } from "react";
import Image from "next/image";

import {
  ShieldCheck,
  BadgeCheck,
  Zap,
  Wallet,
  Sparkles,
  Layers3,
  Clock3,
  Ticket,
  QrCode,
  FileText,
} from "lucide-react";

const imageMap: Record<string, string[]> = {
  "Kain-Tanpa QR": [
    "/images/writsband/kain-non.png",
    "/images/writsband/kain-non1.png",
    "/images/general/logo-green-jokindes.png",
  ],
  "Kain-Dengan QR": [
    "/images/writsband/kain-barcode.png",
    "/images/writsband/kain-barcode1.png",
    "/images/general/logo-green-jokindes.png",
  ],
  "Kertas-Tanpa QR": [
    "/images/writsband/kertas-non.png",
    "/images/writsband/kertas-non1.png",
    "/images/general/logo-green-jokindes.png",
  ],
  "Kertas-Dengan QR": [
    "/images/writsband/kertas-barcode.png",
    "/images/writsband/kertas-barcode1.png",
    "/images/general/logo-green-jokindes.png",
  ],
};

const benefits = [
  { title: "Terintegrasi", icon: BadgeCheck },
  { title: "Bebas Kustomisasi", icon: Sparkles },
  { title: "Variatif", icon: Layers3 },
  { title: "Harga Kompetitif", icon: Wallet },
  { title: "Proses Cepat", icon: Zap },
  { title: "Terpercaya", icon: ShieldCheck },
];

const cn = (...c: (string | false | undefined)[]) =>
  c.filter(Boolean).join(" ");

type Material = "Kain" | "Kertas";
type QRType = "Tanpa QR" | "Dengan QR";

const Wristband = () => {
  const [material, setMaterial] = useState<Material>("Kain");
  const [qrType, setQrType] = useState<QRType>("Tanpa QR");
  const [activeIndex, setActiveIndex] = useState(0);
  const [qty, setQty] = useState<string>("");

  const key = `${material}-${qrType}`;
  const images = imageMap[key] ?? imageMap["Kain-Tanpa QR"];

  const pricePerItem = material === "Kain" ? 3000 : 1000;

  const totalPrice = useMemo(() => {
    const quantity = Number(qty) || 0;
    return quantity * pricePerItem;
  }, [qty, pricePerItem]);

  const OptionButton = ({ active, onClick, children }: any) => (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition-all",
        active
          ? "border-green-500 bg-green-50 text-green-800"
          : "border-slate-300 bg-white text-slate-600",
      )}
    >
      {children}
    </button>
  );

  return (
    <section className="px-4 py-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mb-10 text-center">
          <h1 className="text-2xl font-bold text-slate-900 lg:text-4xl">
            Lebih Praktis dengan Ndes
          </h1>
          <p className="mx-auto mt-3 max-w-5xl text-sm leading-7 text-slate-500 lg:text-base">
            Ndes hadir sebagai solusi sederhana namun powerful untuk pengelolaan
            event. Dari penjualan tiket, manajemen peserta, hingga pencetakan
            tiket gelang, semua terhubung dalam satu sistem yang cepat, rapi,
            dan mudah digunakan.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[3fr_1.5fr]">
          {/* LEFT */}
          <div className="flex flex-col">
            {/* IMAGE GALLERY */}
            <div className="flex flex-col items-center justify-center gap-4 rounded-3xl p-4 lg:flex-row lg:p-6">
              {/* MAIN IMAGE (di atas mobile, kanan di desktop) */}
              <div className="relative order-1 aspect-[4/3] w-full overflow-hidden rounded-2xl lg:order-2 lg:aspect-[16/10]">
                <Image
                  src={images[activeIndex]}
                  alt="main"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* THUMBNAILS (di bawah mobile, kiri di desktop) */}
              <div className="order-2 flex w-full gap-3 overflow-x-auto lg:order-1 lg:w-auto lg:flex-col lg:overflow-visible">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={cn(
                      "shrink-0 overflow-hidden rounded-2xl border transition",
                      activeIndex === i
                        ? "border-green-800 ring-2 ring-green-200"
                        : "border-slate-200",
                    )}
                  >
                    <Image
                      src={img}
                      alt="thumb"
                      width={110}
                      height={110}
                      className="h-20 w-20 object-cover sm:h-24 sm:w-24 lg:h-28 lg:w-28"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* BENEFITS */}
            <div className="mt-5 hidden lg:block">
              <h2 className="mb-5 text-xl font-bold text-slate-900">
                Benefit Yang Didapat
              </h2>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {benefits.map(({ title, icon: Icon }, i) => (
                  <div
                    key={i}
                    className="group relative rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-green-100 hover:shadow-xl"
                  >
                    {/* subtle glow effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-50/0 via-green-50/30 to-green-100/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    <div className="relative flex flex-col items-center text-center">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-green-800 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-green-100">
                        <Icon size={22} />
                      </div>

                      <h3 className="text-sm font-semibold text-slate-800 transition-colors group-hover:text-green-700">
                        {title}
                      </h3>

                      {/* optional accent line */}
                      <div className="mt-3 h-1 w-0 rounded-full bg-green-800 transition-all duration-300 group-hover:w-10" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-5">
            <div className="rounded-2xl bg-green-50 p-4 text-sm text-green-800">
              <p className="font-semibold">Tips</p>
              <p className="mt-1">
                Pemesanan tiket gelang dengan tipe yang terdapat QR Code, sudah
                termasuk gratis sistem validasi
              </p>
            </div>

            {/* MATERIAL */}
            <div>
              <h3 className="mb-3 text-lg font-semibold">Bahan</h3>
              <div className="flex gap-3">
                <OptionButton
                  active={material === "Kain"}
                  onClick={() => setMaterial("Kain")}
                >
                  <Ticket size={16} /> Kain
                </OptionButton>

                <OptionButton
                  active={material === "Kertas"}
                  onClick={() => setMaterial("Kertas")}
                >
                  <FileText size={16} /> Kertas
                </OptionButton>
              </div>
            </div>

            {/* QR */}
            <div>
              <h3 className="mb-3 text-lg font-semibold">QRCode</h3>
              <div className="flex gap-3">
                <OptionButton
                  active={qrType === "Tanpa QR"}
                  onClick={() => setQrType("Tanpa QR")}
                >
                  <Ticket size={16} /> Tanpa QR
                </OptionButton>

                <OptionButton
                  active={qrType === "Dengan QR"}
                  onClick={() => setQrType("Dengan QR")}
                >
                  <QrCode size={16} /> Dengan QR
                </OptionButton>
              </div>
            </div>

            {/* DESC */}
            <div>
              <h3 className="mb-3 text-lg font-semibold">Deskripsi</h3>
              <ul className="list-disc space-y-2 pl-5 text-sm text-slate-600">
                <li>Bahan kain premium tissue</li>
                <li>Ukuran 33cm x 1.5cm</li>
                <li>Cetak 1 sisi</li>
                <li>Tahan air</li>
                <li>Tidak mudah kotor</li>
                <li>Menggunakan central lock</li>
              </ul>
            </div>

            {/* QTY */}
            <div>
              <h3 className="mb-3 text-lg font-semibold">Jumlah Cetak</h3>
              <input
                type="number"
                placeholder="Masukan Jumlah Cetak"
                min={1}
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-2 outline-none focus:border-green-500"
              />
            </div>

            {/* INFO */}
            <div className="grid grid-cols-2 gap-3">
              {/* PRODUKSI */}
              <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                {/* subtle background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-50/0 via-green-50/30 to-green-100/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative flex flex-col items-center">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-800 transition-all group-hover:scale-110">
                    <Clock3 size={18} />
                  </div>

                  <p className="text-xs font-medium text-slate-500">Produksi</p>
                  <p className="mt-1 text-base font-bold text-slate-900">
                    4 - 6 hari
                  </p>
                </div>
              </div>

              {/* HARGA */}
              <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                {/* subtle background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-50/0 via-green-50/30 to-green-100/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative flex flex-col items-center">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-800 transition-all group-hover:scale-110">
                    <Wallet size={18} />
                  </div>

                  <p className="text-xs font-medium text-slate-500">
                    Harga / pcs
                  </p>
                  <p className="mt-1 text-base font-bold text-slate-900">
                    Rp{pricePerItem.toLocaleString("id-ID")}
                  </p>
                </div>
              </div>
            </div>

            {/* TOTAL */}
            <div className="relative overflow-hidden rounded-2xl border border-green-100 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              {/* glow background */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-50/40 via-green-50/10 to-transparent opacity-70" />

              <div className="relative">
                <p className="text-xs font-medium tracking-wide text-green-800 uppercase">
                  Total Pembayaran
                </p>

                <h2 className="mt-2 text-3xl font-extrabold text-slate-900 lg:text-4xl">
                  Rp{totalPrice.toLocaleString("id-ID")}
                </h2>

                <p className="mt-2 text-xs text-slate-500">
                  Sudah termasuk semua pilihan yang kamu pilih
                </p>
              </div>
            </div>

            <button className="w-full rounded-2xl bg-green-700 py-4 font-semibold text-white hover:bg-green-700">
              Pesan Sekarang
            </button>
          </div>
        </div>
        {/* BENEFITS */}
        <div className="mt-5 block lg:hidden">
          <h2 className="mb-5 text-xl font-bold text-slate-900">
            Benefit Yang Didapat
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map(({ title, icon: Icon }, i) => (
              <div
                key={i}
                className="group relative rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-green-100 hover:shadow-xl"
              >
                {/* subtle glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-50/0 via-green-50/30 to-green-100/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative flex flex-col items-center text-center">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-green-600 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-green-100">
                    <Icon size={22} />
                  </div>

                  <h3 className="text-sm font-semibold text-slate-800 transition-colors group-hover:text-green-700">
                    {title}
                  </h3>

                  {/* optional accent line */}
                  <div className="mt-3 h-1 w-0 rounded-full bg-green-500 transition-all duration-300 group-hover:w-10" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Wristband;
