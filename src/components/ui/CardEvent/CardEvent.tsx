import { IEvent } from "@/types/Event";
import { cn } from "@/utils/cn";
import { Card, CardBody, CardFooter, Skeleton } from "@heroui/react";
import Link from "next/link";
import Image from "next/image";
import { Fragment } from "react";

interface PropTypes {
  event?: IEvent;
  className?: string;
  isLoading?: boolean;
  ticketPrice?: string;
}

const CardEvent = ({ event, className, isLoading, ticketPrice }: PropTypes) => {
  const dateObj = new Date(event?.startDate || "");
  const day = dateObj.getDate();
  const month = dateObj
    .toLocaleDateString("en-US", { month: "short" })
    .toUpperCase();
  const year = dateObj.getFullYear();

  const formattedTicketPrice =
    ticketPrice && ticketPrice !== ""
      ? new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
        }).format(Number(ticketPrice))
      : null;

  return (
    <Card
      shadow="sm"
      isPressable
      as={Link}
      href={`/event/${event?.slug}`}
      className={cn(className, "group mb-4 cursor-pointer overflow-hidden p-0")}
    >
      {!isLoading ? (
        <Fragment>
          <CardBody className="p-0">
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGE}${event?.banner}`}
                alt={`${event?.name}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </CardBody>

          <CardFooter className="flex-col items-start p-0 text-left">
            <div className="flex flex-1 items-start gap-4 px-4 pt-4 pb-1">
              {/* Date Box */}
              <div className="flex flex-col items-center justify-center rounded-md bg-gray-100 px-3 py-2">
                <span className="text-[11px] font-semibold tracking-wide text-gray-500">
                  {month}
                </span>
                <span className="text-2xl leading-none font-extrabold text-gray-800">
                  {day}
                </span>
                <span className="text-[11px] text-gray-400">{year}</span>
              </div>

              {/* Title + Description */}
              <div className="flex flex-col gap-1">
                <h3 className="line-clamp-1 text-base font-semibold text-gray-900">
                  {event?.name}
                </h3>
                {/* <div
                  className="line-clamp-1 text-sm text-gray-600"
                  dangerouslySetInnerHTML={{ __html: event?.description || "" }}
                /> */}
                <p className="line-clamp-2 text-sm text-gray-500">
                  {event?.location?.address}
                </p>
              </div>
            </div>

            {/* Location */}
            {/* <div className="w-full px-4 pb-4">
              <p className="line-clamp-1 text-sm text-gray-500">
                {event?.location?.address}
              </p>
            </div> */}

            <div className="w-full px-4 pb-4">
              {isLoading ? (
                // Kondisi card masih loading
                <Skeleton className="bg-default-200 h-4 w-1/3 rounded-lg" />
              ) : !ticketPrice ? (
                // Kalau tiket belum muncul
                <p className="text-sm text-gray-500 italic">
                  Belum ada tiket...
                </p>
              ) : (
                // Kalau tiket sudah ada
                <div className="border-t border-gray-300/50">
                  <div className="flex items-center justify-between pt-3">
                    <p className="text-[12px] font-semibold text-gray-600">
                      Mulai Dari
                    </p>
                    <p className="text-[13px] font-semibold text-black">
                      {formattedTicketPrice}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </CardFooter>
        </Fragment>
      ) : (
        <Fragment>
          {/* Skeleton Image */}
          <CardBody className="p-0">
            <Skeleton className="h-48 w-full rounded-none" />
          </CardBody>

          <CardFooter className="flex w-full flex-col items-start gap-2 px-4 pb-4">
            <div className="flex w-full max-w-[300px] items-center gap-3">
              <div>
                <Skeleton className="flex h-16 w-12 rounded-lg" />
              </div>
              <div className="flex w-full flex-col gap-2">
                <Skeleton className="h-3 w-3/5 rounded-lg" />
                <Skeleton className="h-3 w-4/5 rounded-lg" />
              </div>
            </div>
            <Skeleton className="bg-default-200 mt-2 h-3 w-3/5 rounded-lg" />
            <Skeleton className="bg-default-200 h-3 w-4/5 rounded-lg" />
          </CardFooter>
        </Fragment>
      )}
    </Card>
  );
};

export default CardEvent;
