import DataTable from "@/components/ui/DataTable";
import { Chip, useDisclosure } from "@heroui/react";
import Image from "next/image";
import { Key, ReactNode, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { COLUMN_LIST_EVENT } from "./Event.constants";

import useChangeUrl from "@/hooks/useChangeUrls";
import DropdownAction from "@/components/commons/DropdownAction";
import AddEventModal from "./AddEventModal";
import DeleteEventModal from "./DeleteEventModal";
import useEvent from "./useEvent";

const Event = () => {
  const { push, isReady, query } = useRouter();
  const {
    isRefetchingEvents,
    refetchEvents,
    dataEvents,
    isLoadingEvents,

    selectedId,
    setSelectedId,
  } = useEvent();

  const [selectedIds, setSelectedIds] = useState<string[]>([]); // ✅ multiple

  const addEventModal = useDisclosure();
  const deleteEventModal = useDisclosure();

  const { setUrl } = useChangeUrl();

  useEffect(() => {
    if (isReady) {
      setUrl();
    }
  }, [isReady]);

  const renderCell = useCallback(
    (event: Record<string, unknown>, columnKey: Key) => {
      const cellValue = event[columnKey as keyof typeof event];
      switch (columnKey) {
        case "banner":
          return (
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGE}${cellValue}`}
              className="aspect-video w-36 rounded-lg object-cover"
              width={200}
              height={100}
              alt="icon"
            />
          );
        case "isPublish":
          return (
            <Chip
              color={cellValue === true ? "success" : "danger"}
              variant="flat"
              size="sm"
            >
              {cellValue === true ? "Published" : "Unpublished"}
            </Chip>
          );
        case "actions":
          return (
            <DropdownAction
              onClickDetail={() => push(`/organizer/event/${event._id}`)}
              onClickDelete={() => {
                setSelectedId(`${event._id}`);
                deleteEventModal.onOpen();
              }}
              textButtonDetail="Detail Event"
              textButtonDelete="Delete Event"
            />
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [push, setSelectedId, deleteEventModal],
  );

  return (
    <section>
      {Object.keys(query).length > 0 && (
        <DataTable
          buttonTopContentLabel="Create Event"
          columns={COLUMN_LIST_EVENT}
          data={dataEvents?.data || []}
          emptyContent="Event is empty"
          isLoading={isLoadingEvents || isRefetchingEvents}
          onClickButtonTopContent={addEventModal.onOpen}
          renderCell={renderCell}
          totalPages={dataEvents?.pagination.totalPages || 0}
          // ✅ multiple delete callback
          withSelection={true} // ✅ checkbox muncul
          onDeleteSelected={(ids) => {
            setSelectedIds(ids); // ✅ simpan ke state multiple
            deleteEventModal.onOpen(); // ✅ langsung buka modal
          }}
        />
      )}
      <AddEventModal refetchEvents={refetchEvents} {...addEventModal} />
      <DeleteEventModal
        refetchEvents={refetchEvents}
        {...deleteEventModal}
        // ✅ kirim state single & multiple
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
      />
    </section>
  );
};

export default Event;
