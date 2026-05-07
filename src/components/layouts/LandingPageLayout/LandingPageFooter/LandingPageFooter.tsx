import React from "react";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";


const LandingPageFooter = () => {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#0B1220] text-white">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-green-500/10 blur-3xl" />
      <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="max-w-8xl relative z-10 mx-auto px-6 py-16 lg:px-12">
        {/* Top */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-5 flex items-center gap-3">
              <div className="relative h-14 w-14 overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-2 shadow-lg shadow-green-500/10 backdrop-blur">
                <Image
                  src="/images/general/logo-white-jokindes.png"
                  alt="JokiNdess Fest"
                  fill
                  className="object-contain p-2"
                />
              </div>

              <div>
                <h2 className="text-2xl font-black tracking-tight text-white">
                  JokiNdess Fest
                </h2>

                <p className="text-sm text-gray-400">
                  Platform tiket event modern
                </p>
              </div>
            </div>

            <p className="max-w-md text-sm leading-relaxed text-gray-400">
              Temukan berbagai event terbaik dengan pengalaman pemesanan tiket
              yang cepat, aman, dan modern untuk semua kebutuhan acara Anda.
            </p>

            {/* Social */}
            <div className="mt-6 flex items-center gap-4">
              <a
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-300 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:bg-blue-500 hover:text-white"
              >
                <Facebook size={18} />
              </a>

              <a
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-300 transition-all duration-300 hover:-translate-y-1 hover:border-pink-500 hover:bg-pink-500 hover:text-white"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Menu */}
          <div>
            <h3 className="mb-5 text-lg font-bold">Informasi</h3>

            <ul className="space-y-4 text-sm text-gray-400">
              <li>
                <Link href="#" className="transition hover:text-green-400">
                  Syarat & Ketentuan
                </Link>
              </li>

              <li>
                <Link href="#" className="transition hover:text-green-400">
                  Kebijakan Privasi
                </Link>
              </li>

              <li>
                <Link href="#" className="transition hover:text-green-400">
                  Bantuan & Support
                </Link>
              </li>

              <li>
                <Link href="#" className="transition hover:text-green-400">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Event */}
          <div>
            <h3 className="mb-5 text-lg font-bold">Event</h3>

            <ul className="space-y-4 text-sm text-gray-400">
              <li>
                <Link href="#" className="transition hover:text-green-400">
                  Konser Musik
                </Link>
              </li>

              <li>
                <Link href="#" className="transition hover:text-green-400">
                  Seminar
                </Link>
              </li>

              <li>
                <Link href="#" className="transition hover:text-green-400">
                  Workshop
                </Link>
              </li>

              <li>
                <Link href="#" className="transition hover:text-green-400">
                  Festival
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-lg font-bold">Hubungi Kami</h3>

            <ul className="space-y-5 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <div className="mt-1 text-green-400">
                  <MapPin size={18} />
                </div>

                <span>
                  Way Halim Permai, Bandar Lampung, Lampung, Indonesia
                </span>
              </li>

              <li className="flex items-center gap-3">
                <div className="text-green-400">
                  <Mail size={18} />
                </div>

                <span>tiket@jokindess.com</span>
              </li>

              <li className="flex items-center gap-3">
                <div className="text-green-400">
                  <Phone size={18} />
                </div>

                <span>+62 877-1851-7731</span>
              </li>
            </ul>

            {/* CTA */}
            <button className="group mt-6 inline-flex items-center gap-2 rounded-2xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-green-700">
              Hubungi Sekarang
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-gray-500 md:flex-row">
          <p>
            © 2026{" "}
            <span className="font-semibold text-white">JokiNdess Fest</span>.
            All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <Link href="#" className="transition hover:text-green-400">
              Privacy
            </Link>

            <Link href="#" className="transition hover:text-green-400">
              Terms
            </Link>

            <Link href="#" className="transition hover:text-green-400">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingPageFooter;
