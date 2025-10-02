import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@heroui/react";
import Image from "next/image";
import { IVoucher } from "@/types/Voucher";
import { convertIDR } from "@/utils/currency";
import { ICart, ITicket } from "@/types/Ticket";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  publicVouchers?: IVoucher[]; // optional, bisa undefined
  applyVoucher: (voucher: IVoucher | { code: string }) => void;
  selectedVoucher: IVoucher | null;
  subtotal: number;
  cart: ICart;
  dataTicket: ITicket[];
}

const VoucherModal = (props: PropTypes) => {
  const {
    isOpen,
    onClose,
    publicVouchers = [],
    applyVoucher,
    selectedVoucher,
    subtotal,
    cart,
    dataTicket,
  } = props;

  const [privateCode, setPrivateCode] = useState("");
  const [showAll, setShowAll] = useState(false);

  const handleOnClose = () => {
    onClose();
    setPrivateCode("");
    setShowAll(false);
  };

  // hanya tampilkan 2 voucher pertama jika showAll false
  const displayedVouchers = showAll
    ? publicVouchers
    : publicVouchers.slice(0, 2);

  // fungsi untuk warna voucher berdasarkan tipe diskon
  const getVoucherColor = (voucher: IVoucher) => {
    if (voucher.discountType === "persentase") return "bg-blue-600";
    if (voucher.discountType === "jumlah tetap") return "bg-amber-600";
    return "bg-gray-400";
  };

  return (
    <Modal
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
      onClose={handleOnClose}
      className="!z-[9999]"
    >
      <ModalContent className="!z-[9999] m-4 max-w-md rounded-2xl">
        <ModalHeader>
          <h1 className="text-lg font-bold text-gray-900">Daftar Voucher</h1>
        </ModalHeader>
        <Divider />
        <ModalBody className="mt-4 mb-6 space-y-4">
          {/* Input voucher private */}
          <div className="flex gap-2">
            <Input
              placeholder="Masukkan kode voucher"
              value={privateCode}
              onChange={(e) => setPrivateCode(e.target.value)}
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <button
              onClick={() => {
                if (privateCode.trim()) {
                  applyVoucher({ code: privateCode });
                  handleOnClose();
                }
              }}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-blue-700"
            >
              Gunakan
            </button>
          </div>

          {/* List voucher public */}
          <div className="space-y-3">
            {displayedVouchers.map((voucher) => {
              const isSelected = voucher._id === selectedVoucher?._id;
              const isValid =
                subtotal >= (voucher.minTransaction ?? 0) &&
                (!voucher.applicableTickets ||
                  voucher.applicableTickets.length === 0 ||
                  voucher.applicableTickets.includes(cart.ticket));

              const voucherColor = getVoucherColor(voucher);

              return (
                <div
                  key={voucher._id}
                  className={`relative flex w-full overflow-hidden rounded-lg border bg-white shadow transition hover:shadow-lg ${
                    isSelected
                      ? "border-green-500 ring-2 ring-green-300"
                      : "border-gray-200"
                  } ${!isValid ? "pointer-events-none opacity-50" : ""}`}
                >
                  {/* Ribbon kiri */}
                  <div
                    className={`absolute top-0 left-0 flex h-full w-[60px] items-center justify-center ${voucherColor}`}
                  >
                    <span className="rotate-180 text-[16px] font-bold text-white uppercase [writing-mode:vertical-rl]">
                      Discount
                    </span>
                  </div>

                  {/* Isi card */}
                  <div className="ml-[60px] flex flex-1 flex-col justify-between p-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-gray-900">
                          Potongan{" "}
                          {voucher.discountType === "persentase"
                            ? `${voucher.discountPercentage}%`
                            : `${convertIDR(Number(voucher.nominaldeduction))}`}
                        </span>
                      </div>

                      <p className="mt-1 text-sm text-gray-600">
                        Min. Transaksi{" "}
                        {convertIDR(Number(voucher.minTransaction))}
                      </p>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Image
                          src="/images/illustrations/voucher.png"
                          alt="Voucher"
                          width={28}
                          height={28}
                          className="rounded"
                        />
                        <span className="text-base font-semibold">
                          {voucher.code}
                        </span>
                      </div>

                      <button
                        onClick={() => {
                          if (isValid) {
                            applyVoucher(voucher);
                            handleOnClose();
                          }
                        }}
                        className={`rounded-md px-3 py-1 text-sm font-semibold text-white shadow transition ${
                          isSelected
                            ? "bg-green-600 hover:brightness-90"
                            : voucherColor + " hover:brightness-90"
                        } ${!isValid ? "cursor-not-allowed bg-gray-400 hover:bg-gray-400" : ""}`}
                      >
                        {isSelected ? "Dipakai" : "Gunakan"}
                      </button>
                    </div>
                    <div>
                      <Accordion>
                        <AccordionItem
                          aria-label="Syarat & Ketentuan"
                          title="Syarat & Ketentuan"
                        >
                          <div className="space-y-3">
                            {/* Maksimal Potongan */}
                            <div className="rounded-md border-l-4 border-amber-500 bg-amber-50 p-2">
                              <p className="text-sm font-semibold text-amber-800">
                                Maksimal Potongan:{" "}
                                {voucher.discountType === "persentase"
                                  ? convertIDR(
                                      (voucher.maxDiscount as number) || 0,
                                    )
                                  : convertIDR(
                                      (voucher.nominaldeduction as number) || 0,
                                    )}
                              </p>
                            </div>

                            {/* Berlaku untuk tiket */}
                            <div>
                              <p className="mb-1 text-sm font-semibold text-gray-700">
                                Berlaku untuk tiket:
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {voucher.applicableTickets &&
                                voucher.applicableTickets.length > 0 ? (
                                  voucher.applicableTickets.map((ticketId) => {
                                    const ticketName =
                                      dataTicket.find((t) => t._id === ticketId)
                                        ?.name || "Unknown";
                                    return (
                                      <span
                                        key={ticketId}
                                        className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800"
                                      >
                                        {ticketName}
                                      </span>
                                    );
                                  })
                                ) : (
                                  <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                                    Semua tiket
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Tombol show more / show less */}
          {publicVouchers.length > 2 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="mt-2 text-sm font-bold text-blue-600 hover:underline"
            >
              {showAll ? "Tampilkan Lebih Sedikit" : "Tampilkan Lebih Banyak"}
            </button>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default VoucherModal;
