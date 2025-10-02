import { Button, Card, CardBody, Chip, Skeleton } from "@heroui/react";
import useDetailOrder from "./useDetailOrder";
import { convertIDR } from "@/utils/currency";
import { QRCodeSVG } from "qrcode.react";
import { convertTime } from "@/utils/date";
import Link from "next/link";
import {
  Ticket,
  Calendar,
  MapPin,
  Hash,
  CreditCard,
  CheckCircle,
  Clock,
} from "lucide-react"; // ✅ modern icons

const DetailOrder = () => {
  const { dataOrder, dataEvent, dataTicket } = useDetailOrder();

  return (
    <Card className="rounded-2xl border border-gray-100 bg-white shadow-lg">
      <CardBody className="flex flex-col gap-8 p-6">
        {/* Order Info */}
        <div className="flex flex-col gap-3">
          <h4 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
            <CreditCard className="text-primary h-5 w-5" /> Order Details
          </h4>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Order ID */}
            <div className="space-y-1">
              <p className="flex items-center gap-1 text-sm font-semibold text-gray-600">
                <Hash className="h-4 w-4 text-gray-400" /> Order ID
              </p>
              <Skeleton
                isLoaded={!!dataOrder?.orderId}
                className="h-4 rounded-md"
              >
                <p className="text-sm text-gray-900">{dataOrder?.orderId}</p>
              </Skeleton>
            </div>

            {/* Ticket */}
            <div className="space-y-1">
              <p className="flex items-center gap-1 text-sm font-semibold text-gray-600">
                <Ticket className="h-4 w-4 text-gray-400" /> Ticket
              </p>
              <Skeleton
                isLoaded={!!dataTicket?.name}
                className="h-4 rounded-md"
              >
                <p className="text-sm text-gray-900">
                  {`${dataTicket?.name} (${convertIDR(
                    dataTicket?.price,
                  )}) x ${dataOrder?.quantity}`}
                </p>
              </Skeleton>
            </div>

            {/* Total */}
            <div className="space-y-1">
              <p className="flex items-center gap-1 text-sm font-semibold text-gray-600">
                <CreditCard className="h-4 w-4 text-gray-400" /> Total
              </p>
              <Skeleton
                isLoaded={!!dataOrder?.total}
                className="h-4 rounded-md"
              >
                <p className="text-sm font-medium text-gray-900">
                  {convertIDR(dataOrder?.total)}
                </p>
              </Skeleton>
            </div>

            {/* Status */}
            <div className="space-y-1">
              <p className="flex items-center gap-1 text-sm font-semibold text-gray-600">
                <Clock className="h-4 w-4 text-gray-400" /> Status
              </p>
              <Skeleton
                isLoaded={!!dataOrder?.status}
                className="h-4 rounded-md"
              >
                <Chip
                  className="capitalize"
                  color={
                    dataOrder?.status === "completed" ? "success" : "warning"
                  }
                  variant="flat"
                  size="sm"
                  startContent={
                    dataOrder?.status === "completed" ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <Clock className="h-4 w-4" />
                    )
                  }
                >
                  {dataOrder?.status}
                </Chip>
              </Skeleton>
            </div>
          </div>
        </div>

        {/* Ticket Info */}
        {dataOrder?.status === "completed" && (
          <div className="flex flex-col gap-3">
            <h4 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
              <Ticket className="text-primary h-5 w-5" /> Your Tickets
            </h4>

            <div className="mt-2 grid gap-6 lg:grid-cols-2">
              {dataOrder?.vouchers.map(
                (voucher: { voucherId: string; isPrint: boolean }) => (
                  <Card
                    shadow="sm"
                    key={`voucher-${voucher.voucherId}`}
                    className="rounded-xl border border-gray-100 bg-gray-50/60 p-4 transition hover:shadow-md"
                  >
                    <CardBody className="flex flex-col items-center gap-6 lg:flex-row">
                      {/* QR Code */}
                      <div className="flex w-full max-w-[150px] justify-center rounded-xl border border-gray-200 bg-white p-3 shadow-sm lg:w-1/4">
                        <QRCodeSVG
                          value={voucher.voucherId}
                          className="!h-auto !w-full"
                        />
                      </div>

                      {/* Ticket Info */}
                      <div className="flex-1 space-y-4 text-center lg:text-left">
                        <h2 className="text-primary text-xl font-bold">
                          {dataEvent?.name}
                        </h2>

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                          {/* Date */}
                          <div className="font-semibold">
                            <p className="flex items-center gap-1 text-sm text-gray-500">
                              <Calendar className="h-4 w-4 text-gray-400" />{" "}
                              Date
                            </p>
                            <p className="text-sm text-gray-900">
                              {`${convertTime(dataEvent?.startDate)} - ${convertTime(dataEvent?.endDate)}`}
                            </p>
                          </div>

                          {/* Location */}
                          <div className="font-semibold">
                            <p className="flex items-center gap-1 text-sm text-gray-500">
                              <MapPin className="h-4 w-4 text-gray-400" />{" "}
                              Location
                            </p>
                            <p className="text-sm text-gray-900">
                              {dataEvent?.isOnline ? "Online" : "Offline"}
                            </p>
                          </div>
                          <div className="font-semibold">
                            <p className="flex items-center gap-1 text-sm text-gray-500">
                              Status
                            </p>
                            <Chip
                              size="sm"
                              variant="flat"
                              color={voucher.isPrint ? "success" : "danger"}
                            >
                              {voucher.isPrint ? "Printed" : "Not Printed"}
                            </Chip>
                          </div>
                        </div>

                        {dataEvent?.isOnline && (
                          <Button
                            as={Link}
                            href={`${dataEvent?.location?.address}`}
                            variant="solid"
                            color="primary"
                            className="mt-2 font-medium shadow-sm"
                          >
                            Join Now
                          </Button>
                        )}
                      </div>
                    </CardBody>
                  </Card>
                ),
              )}
            </div>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default DetailOrder;
