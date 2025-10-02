import DataTable from "@/components/ui/DataTable";
import { Chip, Button } from "@heroui/react";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { Key } from "react";
import useChangeUrl from "@/hooks/useChangeUrls";
import { convertIDR } from "@/utils/currency";
import useOrder from "./useTicket";
import Link from "next/link";

interface VoucherRow {
  _id: string;
  isPrint: boolean;
  orderId: string;
  fullName: string;
  eventName: string;
  ticketName: string;
  ticketPrice: number;
  status: string;
}

const Order = () => {
  const { isReady, query } = useRouter();
  const { transformedOrders, isLoadingOrders, isRefetchingOrders } = useOrder();
  const { setUrl } = useChangeUrl();

  useEffect(() => {
    if (isReady) setUrl();
  }, [isReady]);

  const renderCell = useCallback(
    (row: Record<string, unknown>, columnKey: Key) => {
      // Safe cast: Record<string, unknown> -> unknown -> VoucherRow
      const r = row as unknown as VoucherRow;

      switch (columnKey) {
        case "fullName":
          return r.fullName ?? "-";
        case "eventName":
          return r.eventName ?? "-";
        case "ticketName":
          return r.ticketName ?? "-";
        case "ticketPrice":
          return convertIDR(Number(r.ticketPrice));
        case "status":
          return (
            <Chip
              color={r.status === "completed" ? "success" : "warning"}
              size="sm"
              variant="flat"
            >
              {r.status}
            </Chip>
          );
        case "isPrint":
          return (
            <Chip
              color={r.isPrint ? "success" : "danger"}
              size="sm"
              variant="flat"
            >
              {r.isPrint ? "Scanned" : "Not Scanned"}
            </Chip>
          );
        default:
          return r[columnKey as keyof VoucherRow] ?? "-";
      }
    },
    [],
  );

  return (
    <section className="flex flex-col gap-6">
      <Link href="/organizer/scaning" passHref>
        <Button
          className="w-full rounded-lg px-6 py-3 shadow-md hover:shadow-xl md:w-fit"
          color="primary"
        >
          Scan QRCode Ticket
        </Button>
      </Link>

      {Object.keys(query).length > 0 && (
        <DataTable
          columns={[
            { name: "NAMA PEMESAN", uid: "fullName" },
            { name: "NAMA EVENT", uid: "eventName" },
            { name: "NAMA TICKET", uid: "ticketName" },
            { name: "PRICE", uid: "ticketPrice" },
            { name: "STATUS QRCODE", uid: "isPrint" },
            { name: "STATUS PEMBAYARAN", uid: "status" },
          ]}
          data={transformedOrders as Record<string, unknown>[]}
          emptyContent="No vouchers found"
          isLoading={isLoadingOrders || isRefetchingOrders}
          renderCell={renderCell}
          totalPages={Math.ceil(transformedOrders.length / 10)}
        />
      )}
    </section>
  );
};

export default Order;
