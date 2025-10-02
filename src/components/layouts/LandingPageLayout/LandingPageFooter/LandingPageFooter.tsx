import React from "react";
import { Facebook, Instagram, Phone, Mail, MapPin } from "lucide-react";

const LandingPageFooter = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 px-0 sm:px-6 lg:px-10 border-t border-gray-200">
      <div className="mx-auto grid max-w-8xl grid-cols-1 gap-8 px-6 py-10 sm:grid-cols-2 md:grid-cols-4">
        {/* Syarat & Ketentuan */}
        <div>
          <h3 className="mb-3 font-bold">Syarat & Ketentuan</h3>
          <ul className="space-y-2 text-sm">
            <li>Aturan Pembelian Tiket</li>
            <li>Kebijakan Refund atau Pembatalan</li>
            <li>Hak & Kewajiban Pengguna</li>
            <li>Batasan Tanggung Jawab Platform</li>
          </ul>
        </div>

        {/* Kebijakan Privasi */}
        <div>
          <h3 className="mb-3 font-bold">Kebijakan Privasi</h3>
          <ul className="space-y-2 text-sm">
            <li>Create and Set Up</li>
            <li>Sell Tickets</li>
            <li>Online RSVP</li>
            <li>Online Events</li>
          </ul>
        </div>

        {/* FAQ */}
        <div>
          <h3 className="mb-3 font-bold">FAQ</h3>
          <ul className="space-y-2 text-sm">
            <li>Cara Membeli Tiket</li>
            <li>Cara Mendapatkan e-ticket</li>
            <li>Metode Pembayaran</li>
          </ul>
        </div>

        {/* Hubungi Kami */}
        <div>
          <h3 className="mb-3 font-bold">Hubungi Kami</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <MapPin size={16} />
              <span>Wayhalim Permai, Ada Gang Masuk Dikit</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} />
              <span>tiket@gmail.com</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} />
              <span>+6289579807555</span>
            </li>
          </ul>

          {/* Social Icons */}
          <div className="mt-4 flex gap-4">
            <a href="#" className="hover:text-blue-600">
              <Facebook size={20} />
            </a>

            <a href="#" className="hover:text-pink-600">
              <Instagram size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-300 py-4 text-center text-sm">
        Copyright 2025 <span className="font-semibold">JokiNdess Fest</span>
      </div>
    </footer>
  );
};

export default LandingPageFooter;
