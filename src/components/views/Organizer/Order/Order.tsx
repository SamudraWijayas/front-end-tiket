import DataTable from "@/components/ui/DataTable";
import { Chip, useDisclosure, Button } from "@heroui/react";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect, useState } from "react";
import { COLUMN_LISTS_ORDER } from "./Order.constants";
import useChangeUrl from "@/hooks/useChangeUrls";
import DropdownAction from "@/components/commons/DropdownAction";
import { convertIDR } from "@/utils/currency";
import DeleteOrderModal from "./DeleteOrderModal";
import useOrder from "./useOrder";
// import QrReader from "react-qr-reader";
import { Scanner } from "@yudiel/react-qr-scanner";

const Order = () => {
  const { push, isReady, query } = useRouter();
  const {
    dataOrders,
    isLoadingOrders,
    isRefetchingOrders,
    refetchOrders,
    selectedId,
    setSelectedId,
    scanVoucher, // ambil dari useOrder hook yg udah ada
    isScanning,
  } = useOrder();

  const deleteOrderModal = useDisclosure();
  const { setUrl } = useChangeUrl();

  const [openScanner, setOpenScanner] = useState(false);

  useEffect(() => {
    if (isReady) {
      setUrl();
    }
  }, [isReady]);

  const renderCell = useCallback(
    (Order: Record<string, unknown>, columnKey: Key) => {
      const cellValue = Order[columnKey as keyof typeof Order];

      switch (columnKey) {
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
        case "events":
          // cek kalau events itu object dan punya property name
          return typeof Order.events === "object" && Order.events !== null
            ? ((Order.events as { name?: string }).name ?? "-")
            : "-";
        case "payment":
          // cek kalau events itu object dan punya property name
          return typeof Order.payment === "object" && Order.payment !== null
            ? ((Order.payment as { bank?: string }).bank ?? "-")
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
      {/* <Button
        color="primary"
        onClick={() => setOpenScanner(true)}
        className="w-fit"
      >
        Scan Voucher
      </Button> */}

      {/* ✅ Scanner muncul kalau openScanner true */}
      {openScanner && (
        <div className="relative w-full max-w-md overflow-hidden rounded-xl border p-2">
          <Scanner
            onScan={(results) => {
              console.log("Raw Results:", results);

              let voucherId: string | null = null;

              if (Array.isArray(results) && results[0]?.rawValue) {
                voucherId = results[0].rawValue;
              } else if (typeof results === "string") {
                voucherId = results;
              }

              if (voucherId) {
                console.log("QR Result:", voucherId);
                scanVoucher(voucherId); // trigger API
                setOpenScanner(false);
              }
            }}
            onError={(error: unknown) => {
              if (error instanceof Error) {
                console.error("Scanner Error:", error.message);
              } else {
                console.error("Scanner Unknown Error:", error);
              }
            }}
            constraints={{ facingMode: "environment" }}
          />
        </div>
      )}

      {/* Table */}
      {Object.keys(query).length > 0 && (
        <DataTable
          columns={COLUMN_LISTS_ORDER}
          data={dataOrders?.data || []}
          emptyContent="Order is empty"
          isLoading={isLoadingOrders || isRefetchingOrders}
          renderCell={renderCell}
          totalPages={dataOrders?.pagination.totalPages}
        />
      )}

      {/* Modal Delete */}
      <DeleteOrderModal
        {...deleteOrderModal}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchOrders={refetchOrders}
      />
    </section>
  );
};

export default Order;
