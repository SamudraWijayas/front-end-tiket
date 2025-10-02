import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@heroui/react";
import { Dispatch, SetStateAction, useEffect } from "react";
import useDeleteEventModal from "./useDeleteEventModal";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchEvents: () => void;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
  selectedIds: string[]; // ✅ multiple
  setSelectedIds: Dispatch<SetStateAction<string[]>>; // ✅ multiple
}

const DeleteEventModal = (props: PropTypes) => {
  const {
    isOpen,
    onClose,
    onOpenChange,
    refetchEvents,
    selectedId,
    setSelectedId,
    selectedIds,
    setSelectedIds,
  } = props;

  const {
    mutateDeleteEvent,
    isPendingMutateDeleteEvent,
    isSuccessMutateDeleteEvent,
  } = useDeleteEventModal();

  useEffect(() => {
    if (isSuccessMutateDeleteEvent) {
      onClose();
      refetchEvents();
      setSelectedId("");
      setSelectedIds([]); // ✅ clear multiple
    }
  }, [isSuccessMutateDeleteEvent]);

  const handleDelete = () => {
    if (selectedIds.length > 0) {
      // ✅ hapus banyak
      selectedIds.forEach((id) => mutateDeleteEvent(id));
    } else if (selectedId) {
      // ✅ hapus single
      mutateDeleteEvent(selectedId);
    }

    refetchEvents();
    onClose();
    setSelectedId("");
    setSelectedIds([]);
  };

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent className="m-4">
        <ModalHeader>Delete Event</ModalHeader>
        <ModalBody>
          {selectedIds.length > 0 ? (
            <p>Are you sure you want to delete {selectedIds.length} events?</p>
          ) : (
            <p>Are you sure you want to delete this event?</p>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            variant="flat"
            onPress={() => {
              onClose();
              setSelectedId("");
              setSelectedIds([]);
            }}
            disabled={isPendingMutateDeleteEvent}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            type="submit"
            disabled={isPendingMutateDeleteEvent}
            onPress={handleDelete}
          >
            {isPendingMutateDeleteEvent ? (
              <Spinner size="sm" color="white" />
            ) : selectedIds.length > 0 ? (
              `Delete ${selectedIds.length} Events`
            ) : (
              "Delete Event"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteEventModal;
