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
import useDeleteBannerModal from "./useDeleteBannerModal";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchBanner: () => void;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
}

const DeleteBannerModal = (props: PropTypes) => {
  const {
    isOpen,
    onClose,
    onOpenChange,
    refetchBanner,
    selectedId,
    setSelectedId,
  } = props;

  const {
    mutateDeleteBanner,
    isPendingMutateDeleteBanner,
    isSuccessMutateDeleteBanner,
  } = useDeleteBannerModal();

  useEffect(() => {
    if (isSuccessMutateDeleteBanner) {
      onClose();
      refetchBanner();
      setSelectedId("");
    }
  }, [isSuccessMutateDeleteBanner]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent className="m-4">
        <ModalHeader>Delete Banner</ModalHeader>
        <ModalBody>
          <p>
            Are you sure you want to delete this banner? This action cannot be
            undone.
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
            disabled={isPendingMutateDeleteBanner}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            type="submit"
            disabled={isPendingMutateDeleteBanner}
            onPress={() => {
              mutateDeleteBanner(selectedId);
              refetchBanner();
              onClose();
              setSelectedId("");
            }}
          >
            {isPendingMutateDeleteBanner ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Delete Banner"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteBannerModal;
