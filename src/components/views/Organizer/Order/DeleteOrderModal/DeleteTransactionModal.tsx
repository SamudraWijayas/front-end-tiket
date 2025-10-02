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
import useDeleteOrderModal from "./useDeleteOrderModal";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchOrders: () => void;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
}

const DeleteOrderModal = (props: PropTypes) => {
  const {
    isOpen,
    onClose,
    onOpenChange,
    selectedId,
    setSelectedId,
    refetchOrders,
  } = props;

  const {
    mutateDeleteOrder,
    isPendingMutateDeleteOrder,
    isSuccessMutateDeleteOrder,
  } = useDeleteOrderModal();

  useEffect(() => {
    if (isSuccessMutateDeleteOrder) {
      onClose();
      refetchOrders();
      setSelectedId("");
    }
  }, [isSuccessMutateDeleteOrder]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent className="m-4">
        <ModalHeader>Delete Order</ModalHeader>
        <ModalBody>
          <p className="text-medium">
            Are you sure you want to delete this Order?
          </p>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            variant="flat"
            onPress={() => {
              onClose();
              setSelectedId("");
            }}
            disabled={isPendingMutateDeleteOrder}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            type="submit"
            disabled={isPendingMutateDeleteOrder}
            onPress={() => mutateDeleteOrder(selectedId)}
          >
            {isPendingMutateDeleteOrder ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Delete Order"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteOrderModal;
