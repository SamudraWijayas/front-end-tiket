import DropdownAction from "@/components/commons/DropdownAction";
import DataTable from "@/components/ui/DataTable";
import { convertIDR } from "@/utils/currency";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  useDisclosure,
} from "@heroui/react";
import { Fragment, Key, ReactNode, useCallback, useState } from "react";
import { COLUMN_LIST_TICKET } from "./TicketTab.constants";
import { Plus } from "lucide-react"; // ✅ ikon add biar lebih modern
import Image from "next/image";
import useTicketTab from "./useTicketTab";
import { ITicket } from "@/types/Ticket";
import AddTicketModal from "./AddTicketModal";
import DeleteTicketModal from "./DeleteTicketModal";
import UpdateTicketModal from "./UpdateTicketModal";

const TicketTab = () => {
  const { dataTicket, refetchTicket, isPendingTicket, isRefetchingTicket } =
    useTicketTab();
  const addTicketModal = useDisclosure();
  const deleteTicketModal = useDisclosure();
  const updateTicketModal = useDisclosure();

  const [selectedDataTicket, setSelectedDataTicket] = useState<ITicket | null>(
    null,
  );

  const renderCell = useCallback(
    (ticket: Record<string, unknown>, columnKey: Key) => {
      const cellValue = ticket[columnKey as keyof typeof ticket];
      switch (columnKey) {
        case "price":
          return (
            <span className="font-medium text-gray-700">
              {convertIDR(cellValue as number)}
            </span>
          );
        case "actions":
          return (
            <DropdownAction
              onClickDetail={() => {
                setSelectedDataTicket(ticket as ITicket);
                updateTicketModal.onOpen();
              }}
              onClickDelete={() => {
                setSelectedDataTicket(ticket as ITicket);
                deleteTicketModal.onOpen();
              }}
              textButtonDetail="Detail Ticket"
              textButtonDelete="Delete Ticket"
            />
          );
        default:
          return (
            <span className="text-gray-600">{cellValue as ReactNode}</span>
          );
      }
    },
    [],
  );

  return (
    <Fragment>
      <Card className="w-full rounded-2xl border border-gray-100 bg-white shadow-md">
        {/* Header */}
        <CardHeader className="flex flex-col gap-3 border-b border-gray-100 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              🎟️ Event Tickets
            </h1>
            <p className="text-sm text-gray-500">
              Manage and organize tickets for this event
            </p>
          </div>

          <Button
            color="primary"
            startContent={<Plus className="h-4 w-4" />}
            className="font-medium shadow-sm"
            onPress={addTicketModal.onOpen}
          >
            Add New Ticket
          </Button>
        </CardHeader>

        {/* Body */}
        <CardBody className="p-6">
          <DataTable
            columns={COLUMN_LIST_TICKET}
            data={dataTicket || []}
            emptyContent={
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <Image
                  src="/images/general/logo.svg"
                  alt="Empty tickets"
                  width={100}
                  height={100}
                  className="h-32 w-32 opacity-70"
                />
                <p className="mt-4 text-gray-500">No tickets available yet</p>
                <Button
                  size="sm"
                  className="mt-3"
                  color="primary"
                  startContent={<Plus className="h-4 w-4" />}
                  onPress={addTicketModal.onOpen}
                >
                  Create First Ticket
                </Button>
              </div>
            }
            isLoading={isPendingTicket || isRefetchingTicket}
            renderCell={renderCell}
            totalPages={1}
            showSearch={false}
            showLimit={false}
          />
        </CardBody>
      </Card>
      <AddTicketModal {...addTicketModal} refetchTicket={refetchTicket} />
      <DeleteTicketModal
        {...deleteTicketModal}
        selectedDataTicket={selectedDataTicket}
        setSelectedDataTicket={setSelectedDataTicket}
        refetchTicket={refetchTicket}
      />
      <UpdateTicketModal
        {...updateTicketModal}
        selectedDataTicket={selectedDataTicket}
        setSelectedDataTicket={setSelectedDataTicket}
        refetchTicket={refetchTicket}
      />
    </Fragment>
  );
};

export default TicketTab;
