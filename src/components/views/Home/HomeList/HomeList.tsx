import { IEvent } from "@/types/Event";
import Link from "next/link";
import Image from "next/image";

interface PropTypes {
  title: string;
  events: IEvent[];
  isLoading: boolean;
}

const HomeList = ({ title, events, isLoading }: PropTypes) => {
  return (
    <div className="mt-6 mb-6 px-0 text-gray-800 sm:px-6 lg:px-15">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between px-6 lg:px-0">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <Link
          href="/event"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          See More
        </Link>
      </div>

      {/* Event Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {isLoading ? (
          [...Array(6)].map((_, idx) => (
            <div
              key={idx}
              className="h-72 animate-pulse rounded-xl bg-gray-200"
            />
          ))
        ) : events.length > 0 ? (
          events.map((event) => {
            const dateObj = new Date(event.startDate);
            const day = dateObj.getDate();
            const month = dateObj
              .toLocaleDateString("en-US", { month: "short" })
              .toUpperCase();

            return (
              <Link
                key={event._id}
                href={`/event/${event._id}`}
                className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-300 bg-white shadow transition hover:shadow-lg"
              >
                {/* Event Image */}
                <div className="relative h-48 w-full">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGE}${event.banner}`}
                    alt={`${event.name}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Event Info */}
                <div className="flex flex-1 items-start p-4 gap-4">
                  {/* Date Box */}
                  <div className="flex flex-col items-center justify-center rounded-md bg-gray-100 px-3 py-2">
                    <span className="text-xs font-semibold text-gray-500">
                      {month}
                    </span>
                    <span className="text-xl font-bold text-gray-800">
                      {day}
                    </span>
                  </div>

                  {/* Title + Description */}
                  <div className="flex flex-col">
                    <h3 className="line-clamp-1 text-sm font-semibold text-gray-900">
                      {event.name}
                    </h3>
                    <p className="line-clamp-2 text-sm text-gray-500">
                      {event.description}
                    </p>
                  </div>
                </div>
                <div className="px-4 pb-4">
                  <p>{event.location?.address}</p>
                </div>
              </Link>
            );
          })
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No events available
          </p>
        )}
      </div>
    </div>
  );
};

export default HomeList;
