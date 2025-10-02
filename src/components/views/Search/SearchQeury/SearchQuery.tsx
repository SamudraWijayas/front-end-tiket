import React from "react";
import useQuerySearch from "./useSearchQuery";
import { useParams } from "next/navigation";
import { IEvent } from "@/types/Event";
import CardEvent from "@/components/ui/CardEvent";
import Image from "next/image";

const QuerySearch = () => {
  const params = useParams();
  const query = params?.query as string;

  // pass query dari URL ke hook
  const {
    dataEventsSearch,
    isLoadingEventsSearch,
    isRefetchingEventsSearch,
    ticketsByEvent,
  } = useQuerySearch(query);
  const total =
    dataEventsSearch?.meta?.total ?? dataEventsSearch?.data?.length ?? 0;

  return (
    <div className="min-h-screen bg-white px-4 py-6 sm:px-6 lg:px-15">
      <h1 className="mb-2 text-3xl font-extrabold">Hasil Pencarian</h1>
      {!isLoadingEventsSearch && !isRefetchingEventsSearch && (
        <p className="text-md mb-4 text-gray-600">
          Ditemukan <span className="font-semibold">{total}</span> hasil untuk
          <span className="text-blue-600 italic"> &quot;{query}&quot;</span>
        </p>
      )}
      <div className="mb-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {!isLoadingEventsSearch && !isRefetchingEventsSearch
          ? dataEventsSearch?.data?.map((event: IEvent) => (
              <CardEvent
                event={event}
                key={`card-event-${event._id}`}
                ticketPrice={event._id ? ticketsByEvent[event._id] : ""}
              />
            ))
          : Array.from({ length: 4 }).map((_, index) => (
              <CardEvent key={`card-event-loading-${index}`} isLoading={true} />
            ))}
      </div>
      {dataEventsSearch?.data?.length < 1 &&
        !isLoadingEventsSearch &&
        !isRefetchingEventsSearch && (
          <div className="flex flex-col items-center justify-center gap-4 py-20">
            <Image
              src="/images/illustrations/nodata.jpg"
              alt="no-data"
              width={200}
              height={200}
            />
            <h2 className="text-black text-center text-2xl font-extrabold">
              Tidak ada Event yang cocok
            </h2>
          </div>
        )}
    </div>
  );
};

export default QuerySearch;
