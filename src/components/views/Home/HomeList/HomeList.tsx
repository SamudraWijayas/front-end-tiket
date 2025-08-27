import { IEvent } from "@/types/Event";
import { ICategory } from "@/types/Category";
import Link from "next/link";
import CardEvent from "@/components/ui/CardEvent";
import { Select, SelectItem } from "@heroui/react";

interface PropTypes {
  title: string;
  events: IEvent[];
  categories: { data: ICategory[] };
  ticketsByEvent: Record<string, string>; // tiket dikelompokkan per eventId
  isLoading: boolean;
  loadingCate: boolean;
  urlMore?: string;
}

const HomeList = ({
  title,
  events,
  ticketsByEvent,
  isLoading,
  categories,
  urlMore = "/event",
}: PropTypes) => {
  console.log(categories);

  return (
    <div className="mt-6 mb-6 px-0 text-gray-800 sm:px-6 lg:px-15">
      {/* Header: Judul + Select Kategori */}
      <div className="mb-6 flex flex-col gap-4 px-6 sm:flex-row sm:items-center sm:justify-between sm:gap-0 lg:px-0">
        <h2 className="text-2xl font-extrabold">{title}</h2>

        <Select className="max-w-xs" label="Pilih Kategori" variant="flat">
          {Array.isArray(categories?.data) && categories.data.length > 0 ? (
            categories.data.map((category) => (
              <SelectItem key={`select-cate-${category._id}`}>
                {category.name}
              </SelectItem>
            ))
          ) : (
            <SelectItem>Tidak ada kategori</SelectItem>
          )}
        </Select>
      </div>

      {/* Grid Card Event */}
      <div className="grid grid-cols-1 gap-6 px-6 sm:grid-cols-2 md:grid-cols-3 lg:px-0 xl:grid-cols-4">
        {!isLoading
          ? events.map((event) => (
              <CardEvent
                key={`card-event-${event._id}`}
                event={event}
                ticketPrice={event._id ? ticketsByEvent[event._id] : ""}
              />
            ))
          : Array.from({ length: 4 }).map((_, index) => (
              <CardEvent
                key={`card-event-loading-${index}`}
                isLoading={isLoading}
              />
            ))}
      </div>

      {/* Link Tampilkan Lebih Banyak */}
      <Link
        href={urlMore}
        className="text-sm font-medium text-blue-600 hover:underline"
      >
        Tampilkan Lebih Banyak
      </Link>
    </div>
  );
};

export default HomeList;
