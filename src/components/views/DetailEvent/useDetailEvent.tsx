import eventServices from "@/services/event.service";
import ticketServices from "@/services/ticket.service";
import { ICart, ITicket } from "@/types/Ticket";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext, useMemo, useState } from "react";
import { defaultCart } from "./DetailEvent.constants";
import orderServices from "@/services/order.service";
import { ToasterContext } from "@/contexts/ToasterContext";
import voucherServices from "@/services/voucher.service";
import { IVoucher } from "@/types/Voucher";
import { convertIDR } from "@/utils/currency";
import lineupServices from "@/services/lineup.service";

const useDetailEvent = () => {
  const router = useRouter();
  const [selectedVoucher, setSelectedVoucher] = useState<IVoucher | null>(null);
  const { setToaster } = useContext(ToasterContext);
  const getEventBySlug = async () => {
    const { data } = await eventServices.getEventBySlug(`${router.query.slug}`);
    return data.data;
  };

  const { data: dataEvent, isLoading: isLoadingDetailEvent } = useQuery({
    queryKey: ["Event By Slug"],
    queryFn: getEventBySlug,
    enabled: router.isReady,
  });

  const getLineupByEventId = async () => {
    const { data } = await lineupServices.getLineupsByEventId(
      `${dataEvent?._id}`,
    );
    return data.data;
  };

  const {
    data: dataLineup,
    refetch: refetchLineup,
    isPending: isPendingLineup,
    isRefetching: isRefetchingLineup,
  } = useQuery({
    queryKey: ["Lineups"],
    queryFn: getLineupByEventId,
    enabled: !!dataEvent?._id && router.isReady,
  });

  const getTicketsByEventId = async () => {
    const { data } = await ticketServices.getTicketsByEventId(
      `${dataEvent._id}`,
    );
    return data.data;
  };

  const { data: dataTicket } = useQuery({
    queryKey: ["Tickets"],
    queryFn: getTicketsByEventId,
    enabled: !!dataEvent?._id,
  });
  // voucher
  const getVoucherByEventId = async () => {
    const { data } = await voucherServices.getVouchersByEventId(
      `${dataEvent._id}`,
    );
    return data.data;
  };

  const { data: dataVoucher } = useQuery({
    queryKey: ["Vouchers"],
    queryFn: getVoucherByEventId,
    enabled: !!dataEvent?._id,
  });

  // cart
  const [cart, setCart] = useState<ICart>(defaultCart);

  const dataTicketInCart = useMemo(() => {
    if (dataTicket) {
      return dataTicket.find((ticket: ITicket) => ticket._id === cart.ticket);
    }
    return null;
  }, [dataTicket, cart]);

  // Cek status tiket
  const isTicketAvailable = (ticket: ITicket) => {
    if (!ticket.isActive) return false;
    if (ticket.quotaType === "unlimited") return true;
    return Number(ticket.quantity) > 0;
  };
  type ChipColor =
    | "secondary"
    | "success"
    | "danger"
    | "primary"
    | "default"
    | "warning";

  const getTicketStatus = (
    ticket: ITicket,
  ): { text: string; color: ChipColor } => {
    if (!ticket.isActive) return { text: "Ditutup", color: "secondary" };
    if (ticket.quotaType === "unlimited")
      return { text: "Available", color: "success" };
    return Number(ticket.quantity) > 0
      ? { text: "Available", color: "success" }
      : { text: "Sold Out", color: "danger" };
  };

  const handleAddToCart = (ticket: string) => {
    if (!ticket) {
      // Reset cart
      setCart({
        events: "",
        ticket: "",
        quantity: 0,
      });
      return;
    }

    setCart({
      events: dataEvent._id as string,
      ticket,
      quantity: 1,
    });
  };

  const handleChangeQuantity = (type: "increment" | "decrement") => {
    if (!dataTicketInCart) return;

    const maxQty =
      dataTicketInCart.quotaType === "limited"
        ? Math.min(dataTicketInCart.quantity, dataTicketInCart.maxPurchase)
        : dataTicketInCart.maxPurchase;

    if (type === "increment") {
      if (cart.quantity < maxQty) {
        setCart((prev: ICart) => ({ ...prev, quantity: prev.quantity + 1 }));
      } else {
        // Tambahkan pesan toaster kalau sudah mencapai maxPurchase
        setToaster({
          type: "error",
          message: `Maksimal pembelian tiket ini adalah ${maxQty} tiket`,
        });
      }
    } else {
      if (cart.quantity <= 1) {
        setCart(defaultCart);
      } else {
        setCart((prev: ICart) => ({ ...prev, quantity: prev.quantity - 1 }));
      }
    }
  };

  const createOrder = async () => {
    const payload = {
      ...cart,
      vouchertiket: selectedVoucher?._id ?? undefined, // <-- sertakan id voucher
    };

    const { data } = await orderServices.createOrder(payload);
    return data.data;
  };

  const { mutate: mutateCreateOrder, isPending: isPendingCreateOrder } =
    useMutation({
      mutationFn: createOrder,
      onError: (error) => {
        setToaster({
          type: "error",
          message: error.message,
        });
      },
      onSuccess: (result) => {
        const transactionToken = result.payment.token;
        window.snap.pay(transactionToken);
      },
    });

  //   ticket kecil
  const getSmallTicket = async () => {
    const { data } = await ticketServices.getTicketsByEventId(
      `${dataEvent._id}`,
    );
    const tickets = data.data;

    if (!tickets || tickets.length === 0) return null;

    // Beri tipe eksplisit untuk prev dan current
    const minPriceTicket = tickets.reduce(
      (prev: { price: number }, current: { price: number }) => {
        return prev.price < current.price ? prev : current;
      },
    );

    return minPriceTicket;
  };

  const { data: minTicket, isLoading: isLoadingMinTicket } = useQuery({
    queryKey: ["Tickets", dataEvent?._id],
    queryFn: getSmallTicket,
    enabled: !!dataEvent?._id,
  });

  // fungsi apply voucher
  const applyVoucher = async (voucher: IVoucher | { code: string }) => {
    if (!cart.ticket) {
      setToaster({ type: "error", message: "Pilih tiket dulu" });
      return;
    }

    try {
      const { data } = await voucherServices.validateVoucher(
        voucher.code as string,
        cart.ticket,
        dataEvent._id,
      );

      const selected = data.data;

      // Validasi minimal transaksi
      const subtotal = Number(dataTicketInCart?.price) * cart.quantity;
      if (subtotal < (selected.minTransaction ?? 0)) {
        setToaster({
          type: "error",
          message: `Voucher ini hanya berlaku untuk transaksi minimal ${convertIDR(
            selected.minTransaction ?? 0,
          )}`,
        });
        return;
      }

      // Validasi applicableTickets
      if (
        selected.applicableTickets &&
        selected.applicableTickets.length > 0 &&
        !selected.applicableTickets.includes(cart.ticket)
      ) {
        setToaster({
          type: "error",
          message: "Voucher ini tidak berlaku untuk tiket yang dipilih",
        });
        return;
      }

      setSelectedVoucher(selected);
      setToaster({ type: "success", message: "Voucher berhasil digunakan" });
    } catch {
      setToaster({
        type: "error",
        message: "Voucher tidak valid",
      });
    }
  };

  // fungsi hitung diskon voucher
  const calculateDiscount = () => {
    if (!selectedVoucher || cart.quantity === 0 || !dataTicketInCart) return 0;

    const subtotal = Number(dataTicketInCart.price) * cart.quantity;

    // Cek minimal transaksi
    if (subtotal < (selectedVoucher.minTransaction ?? 0)) return 0;

    if (selectedVoucher.discountType === "persentase") {
      const discount =
        (subtotal * (selectedVoucher.discountPercentage ?? 0)) / 100;
      // Maksimal diskon
      return Math.min(discount, selectedVoucher.maxDiscount ?? discount);
    }

    if (selectedVoucher.discountType === "jumlah tetap") {
      // Jumlah tetap
      return selectedVoucher.nominaldeduction ?? 0;
    }

    return 0;
  };

  const discount = calculateDiscount();

  return {
    dataEvent,
    isLoadingDetailEvent,
    dataTicket,
    minTicket,
    isLoadingMinTicket,

    dataVoucher,

    dataTicketInCart,
    cart,
    handleAddToCart,
    handleChangeQuantity,
    mutateCreateOrder,
    isPendingCreateOrder,
    createOrder,

    selectedVoucher,
    applyVoucher,
    discount,
    isTicketAvailable,
    getTicketStatus,

    dataLineup,
    refetchLineup,
    isPendingLineup,
    isRefetchingLineup,
  };
};

export default useDetailEvent;
