import DataTable from "@/components/ui/DataTable";
import { Chip, Button } from "@heroui/react";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { COLUMN_LISTS_TICKET } from "./Ticket.constants";
import useChangeUrl from "@/hooks/useChangeUrls";
import { convertIDR } from "@/utils/currency";
import useOrder from "./useTicket";
import Link from "next/link";

const Order = () => {
  const { push, isReady, query } = useRouter();
  const { dataOrders, isLoadingOrders, isRefetchingOrders } = useOrder();

  const { setUrl } = useChangeUrl();

  useEffect(() => {
    if (isReady) {
      setUrl();
    }
  }, [isReady]);

  const renderCell = useCallback(
    (Order: Record<string, unknown>, columnKey: Key) => {
      const cellValue = Order[columnKey as keyof typeof Order];

      switch (columnKey) {
        case "events":
          // cek kalau events itu object dan punya property name
          return typeof Order.events === "object" && Order.events !== null
            ? ((Order.events as { name?: string }).name ?? "-")
            : "-";

        case "ticketName":
          return typeof Order.ticket === "object" && Order.ticket !== null
            ? ((Order.ticket as { name?: string }).name ?? "-")
            : "-";

        case "ticketPrice":
          return typeof Order.ticket === "object" && Order.ticket !== null
            ? convertIDR(
                Number((Order.ticket as { price?: number }).price ?? 0),
              )
            : "-";

        case "status":
          return (
            <Chip
              color={cellValue === "completed" ? "success" : "warning"}
              size="sm"
              variant="flat"
            >
              {cellValue as ReactNode}
            </Chip>
          );
        case "vouchers":
          if (!Array.isArray(Order.vouchers) || Order.vouchers.length === 0) {
            return "-";
          }
          return (
            <div className="flex flex-wrap gap-1">
              {Order.vouchers.map((v) => (
                <Chip
                  key={v._id}
                  color={v.isPrint ? "success" : "danger"}
                  size="sm"
                  variant="flat"
                >
                  {v.isPrint ? "Scanned" : "Not Scanned"}
                </Chip>
              ))}
            </div>
          );

        case "total":
          return convertIDR(Number(cellValue));

        default:
          return cellValue as ReactNode;
      }
    },
    [push],
  );

  return (
    <section className="flex flex-col gap-6">
      {/* ✅ Tombol buka kamera */}
      <Link href="/organizer/scaning" passHref>
        <Button
          color="primary"
          className="w-full rounded-lg px-6 py-3 shadow-md transition-all duration-200 hover:shadow-xl md:w-fit"
        >
          Scan Voucher
        </Button>
      </Link>

      {/* Table */}
      {Object.keys(query).length > 0 && (
        <DataTable
          columns={COLUMN_LISTS_TICKET}
          data={dataOrders?.data || []}
          emptyContent="Order is empty"
          isLoading={isLoadingOrders || isRefetchingOrders}
          renderCell={renderCell}
          totalPages={dataOrders?.pagination.totalPages}
        />
      )}
    </section>
  );
};

export default Order;
