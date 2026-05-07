import React, { useMemo, useState } from "react";
import Image from "next/image";
import {
  ShieldCheck,
  BadgeCheck,
  Zap,
  Wallet,
  Sparkles,
  Layers3,
} from "lucide-react";

/**
 * IMAGE VARIANT 4 KOMBINASI
 */
const imageMap: Record<string, string[]> = {
  "Kain-Tanpa QR": [
    "/images/general/logo-green-jokindes.png",
    "/images/general/logo-green-jokindes.png",
    "/images/general/logo-green-jokindes.png",
  ],
  "Kain-Dengan QR": [
    "/images/general/logo-green-jokindes.png",
    "/images/general/logo-green-jokindes.pngp",
    "/images/general/logo-green-jokindes.png",
  ],
  "Kertas-Tanpa QR": [
    "/images/general/logo-green-jokindes.png",
    "/images/general/logo-green-jokindes.png",
    "/images/general/logo-green-jokindes.png",
  ],
  "Kertas-Dengan QR": [
    "/images/general/logo-green-jokindes.png",
    "/images/general/logo-green-jokindes.png",
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
  const [qty, setQty] = useState(1);

  const key = `${material}-${qrType}` as keyof typeof imageMap;
  const images = imageMap[key];

  const totalPrice = useMemo(() => qty * 3000, [qty]);

  return (
    <section className="bg-[#f5f6fa] px-4 py-8 lg:px-10">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="mb-10 text-center">
          <h1 className="text-2xl font-bold lg:text-4xl">
            Lebih Praktis Dengan Artatix
          </h1>
        </div>

        <div className="grid gap-10 lg:grid-cols-[3fr_1fr]">

          {/* LEFT */}
          <div>

            {/* IMAGE */}
            <div className="flex gap-4 rounded-3xl p-6">

              {/* THUMB (always 3) */}
              <div className="flex gap-3 lg:flex-col">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={cn(
                      "overflow-hidden rounded-2xl border transition",
                      activeIndex === i
                        ? "border-indigo-500 ring-2 ring-indigo-200"
                        : "border-slate-200"
                    )}
                  >
                    <Image
                      src={img}
                      alt="thumb"
                      width={110}
                      height={110}
                      className="h-24 w-24 object-cover lg:h-28 lg:w-28"
                    />
                  </button>
                ))}
              </div>

              {/* MAIN IMAGE */}
              <div className="relative w-full overflow-hidden rounded-2xl bg-white">
                <Image
                  src={images[activeIndex]}
                  alt="main"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* BENEFIT */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {benefits.map(({ title, icon: Icon }, i) => (
                <div key={i} className="rounded-2xl bg-white p-6 shadow-sm">
                  <div className="text-center">
                    <Icon className="mx-auto mb-2 text-indigo-500" />
                    <p className="font-semibold">{title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-5">

            {/* MATERIAL */}
            <div>
              <h3 className="mb-2 font-semibold">Bahan</h3>
              <div className="flex gap-2">
                {(["Kain", "Kertas"] as Material[]).map((m) => (
                  <button
                    key={m}
                    onClick={() => {
                      setMaterial(m);
                      setActiveIndex(0);
                    }}
                    className={cn(
                      "rounded-xl border px-3 py-2",
                      material === m && "bg-indigo-50 border-indigo-500"
                    )}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* QR */}
            <div>
              <h3 className="mb-2 font-semibold">QR</h3>
              <div className="flex gap-2">
                {(["Tanpa QR", "Dengan QR"] as QRType[]).map((q) => (
                  <button
                    key={q}
                    onClick={() => {
                      setQrType(q);
                      setActiveIndex(0);
                    }}
                    className={cn(
                      "rounded-xl border px-3 py-2",
                      qrType === q && "bg-indigo-50 border-indigo-500"
                    )}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* QTY */}
            <input
              type="number"
              min={1}
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              className="w-full rounded-xl border px-3 py-2"
            />

            {/* TOTAL */}
            <div className="rounded-2xl bg-white p-4 text-center">
              <p>Total</p>
              <h2 className="text-2xl font-bold">
                Rp{totalPrice.toLocaleString("id-ID")}
              </h2>
            </div>

            <button className="w-full rounded-2xl bg-indigo-600 py-3 text-white">
              Pesan Sekarang
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Wristband;