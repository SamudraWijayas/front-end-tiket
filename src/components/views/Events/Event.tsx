import { IEvent } from "@/types/Event";
import useEvent from "./useEvent";
import CardEvent from "@/components/ui/CardEvent";
import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import useChangeUrl from "@/hooks/useChangeUrls";
import EventFooter from "./EventFooter";
import EventFilter from "./EventFilter";
import Image from "next/image";

const Event = () => {
  const router = useRouter();
  const hasSetUrl = useRef(false);

  const {
    dataEvents,
    isLoadingEvents,
    isRefetchingEvents,
    ticketsByEvent,
  } = useEvent();

  const { setUrlExplore } = useChangeUrl();

  // ✅ SAFE: hanya jalan 1x
  useEffect(() => {
    if (!router.isReady) return;
    if (hasSetUrl.current) return;

    hasSetUrl.current = true;

    setUrlExplore();
  }, [router.isReady, setUrlExplore]);

  return (
    <div className="mb-6 flex w-full flex-col justify-center gap-6">
      <EventFilter />

      <div className="min-h-[70vh] w-full flex-1 px-4 sm:px-6 lg:px-15">
        {/* GRID EVENT */}
        <div className="mb-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {!isLoadingEvents && !isRefetchingEvents ? (
            dataEvents?.data?.map((event: IEvent) => (
              <CardEvent
                event={event}
                key={`card-event-${event._id}`}
                ticketPrice={
                  event._id ? ticketsByEvent[event._id] : ""
                }
              />
            ))
          ) : (
            Array.from({ length: 4 }).map((_, index) => (
              <CardEvent
                key={`card-event-loading-${index}`}
                isLoading={true}
              />
            ))
          )}
        </div>

        {/* PAGINATION */}
        {!isLoadingEvents &&
          dataEvents?.data?.length > 0 && (
            <EventFooter
              totalPages={dataEvents?.pagination?.totalPages}
            />
          )}

        {/* EMPTY STATE */}
        {dataEvents?.data?.length < 1 &&
          !isLoadingEvents &&
          !isRefetchingEvents && (
            <div className="flex flex-col items-center justify-center gap-4 py-20">
              <Image
                src="/images/illustrations/nodata.jpg"
                alt="no-data"
                width={200}
                height={200}
              />
              <h2 className="text-center text-2xl font-extrabold text-black">
                Tidak ada Event yang cocok
              </h2>
            </div>
          )}
      </div>
    </div>
  );
};

export default Event;