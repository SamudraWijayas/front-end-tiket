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
import useDeleteUserModal from "./useDeleteUserModal";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchUsers: () => void;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
}

const DeleteUserModal = (props: PropTypes) => {
  const {
    isOpen,
    onClose,
    onOpenChange,
    refetchUsers,
    selectedId,
    setSelectedId,
  } = props;

  const {
    mutateDeleteUser,
    isPendingMutateDeleteUser,
    isSuccessMutateDeleteUser,
  } = useDeleteUserModal();

  useEffect(() => {
    if (isSuccessMutateDeleteUser) {
      onClose();
      refetchUsers();
      setSelectedId("");
    }
  }, [isSuccessMutateDeleteUser]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent className="m-4">
        <ModalHeader>Delete User</ModalHeader>
        <ModalBody>
          <p>Are you sure </p>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            variant="flat"
            onPress={() => {
              onClose();
              setSelectedId("");
            }}
            disabled={isPendingMutateDeleteUser}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            type="submit"
            disabled={isPendingMutateDeleteUser}
            onPress={() => {
              mutateDeleteUser(selectedId);
              refetchUsers();
              onClose();
              setSelectedId("");
            }}
          >
            {isPendingMutateDeleteUser ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Delete User"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteUserModal;
