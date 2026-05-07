import { IEvent } from "@/types/Event";
import { ICategory } from "@/types/Category";
import Link from "next/link";
import CardEvent from "@/components/ui/CardEvent";
import { ArrowRight } from "lucide-react";

interface PropTypes {
  title: string;
  events: IEvent[];
  categories: { data: ICategory[] };
  ticketsByEvent: Record<string, string>;
  isLoading: boolean;
  loadingCate: boolean;
  urlMore?: string;
}

const HomeList = ({
  title,
  events,
  ticketsByEvent,
  isLoading,
  urlMore = "/event",
}: PropTypes) => {
  return (
    <section className="mt-10 mb-10 px-4 sm:px-6 lg:px-16">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-sm font-semibold tracking-widest text-green-700 uppercase">
            Explore Events
          </p>

          <h2 className="text-3xl font-black tracking-tight text-gray-900 lg:text-4xl">
            {title}
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-500 lg:text-base">
            Temukan berbagai event menarik dengan pengalaman terbaik dan
            pemesanan tiket yang mudah.
          </p>
        </div>

        <Link
          href={urlMore}
          className="group inline-flex items-center gap-2 rounded-full border border-green-700 px-5 py-3 text-sm font-semibold text-green-800 transition-all duration-300 hover:bg-green-700 hover:text-white"
        >
          Lihat Semua
          <ArrowRight
            size={18}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>

      {/* Event Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {!isLoading
          ? events.map((event) => (
              <div
                key={`card-event-${event._id}`}
                className="transition-transform duration-300 hover:-translate-y-1"
              >
                <CardEvent
                  event={event}
                  ticketPrice={event._id ? ticketsByEvent[event._id] : ""}
                />
              </div>
            ))
          : Array.from({ length: 8 }).map((_, index) => (
              <CardEvent
                key={`card-event-loading-${index}`}
                isLoading={true}
              />
            ))}
      </div>
    </section>
  );
};

export default HomeList;