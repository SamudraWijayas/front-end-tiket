import { ICart, ITicket } from "@/types/Ticket";
import { convertIDR } from "@/utils/currency";
import { Button } from "@heroui/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Minus, Plus } from "lucide-react";

interface PropTypes {
  cart: ICart;
  onChangeQuantity: (type: "increment" | "decrement") => void;
  dataTicketInCart: ITicket;
}

const DetailEventCart = (props: PropTypes) => {
  const { cart, onChangeQuantity, dataTicketInCart } = props;
  const session = useSession();
  const router = useRouter();

  return (
    <div className="space-y-3 lg:sticky lg:top-[80px]">
      {session.status === "authenticated" ? (
        <>
          <h2 className="text-lg font-semibold text-gray-800">Jumlah Tiket</h2>

          <div className="border-y border-gray-200 py-2">
            {cart.ticket === "" ? (
              <p className="text-md text-gray-500">
                Cart masih kosong, pilih tiket dulu.
              </p>
            ) : (
              <div className="flex items-center justify-end rounded-xl">
                {/* Qty control */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onChangeQuantity("decrement")}
                    className="rounded-full border p-1 hover:bg-gray-100 disabled:opacity-40"
                    disabled={cart.quantity <= 0}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-6 text-center text-sm font-bold">
                    {cart.quantity}
                  </span>
                  <button
                    onClick={() => onChangeQuantity("increment")}
                    className="rounded-full border p-1 hover:bg-gray-100"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Total Harga */}
          <div className="flex items-center justify-between text-sm text-gray-700">
            <p className="font-semibold">Total:</p>
            <span className="font-bold">
              {cart.quantity > 0
                ? convertIDR(Number(dataTicketInCart.price) * cart.quantity)
                : "Rp 0"}
            </span>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center gap-3">
          <p className="text-sm text-gray-600">
            Login dulu untuk pesan tiket 🎟️
          </p>
          <Button
            color="primary"
            size="lg"
            as={Link}
            className="rounded-xl px-6 py-2 font-semibold shadow hover:shadow-lg"
            href={`/auth/login?callbackUrl=/event/${router.query.slug}`}
          >
            Login to Book
          </Button>
        </div>
      )}
    </div>
  );
};

export default DetailEventCart;
