import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Spinner,
} from "@heroui/react";
import useUpdateUserModal from "./useUpdateUserModal";
import { Controller } from "react-hook-form";
import { Dispatch, SetStateAction, useEffect } from "react";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchUser: () => void;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
}

const UpdateUserModal = (props: PropTypes) => {
  const {
    isOpen,
    onClose,
    onOpenChange,
    refetchUser,
    selectedId,
    setSelectedId,
  } = props;

  const {
    control,
    errors,
    reset,
    handleSubmitForm,
    handleUpdateUser,
    isPendingMutateUpdateUser,
    isSuccessMutateUpdateUser,
    setValueUpdateUser,
    fetchUserById, // tambahkan di hook untuk ambil detail user
  } = useUpdateUserModal(selectedId);

  // close otomatis setelah update sukses
  useEffect(() => {
    if (isSuccessMutateUpdateUser) {
      onClose();
      refetchUser();
      setSelectedId("");
    }
  }, [isSuccessMutateUpdateUser]);

  // fetch detail user ketika modal dibuka & ada selectedId
  useEffect(() => {
    if (selectedId) {
      fetchUserById(selectedId).then((user) => {
        console.log("Fetched user:", user); // <- ini untuk cek
        setValueUpdateUser("fullName", user.fullName ?? "");
        setValueUpdateUser("username", user.username ?? "");
        setValueUpdateUser("isActive", user.isActive ?? false);
      });
    }
  }, [selectedId, setValueUpdateUser, fetchUserById]);

  const handleOnClose = () => {
    reset();
    onClose();
    setSelectedId("");
  };

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
      onClose={handleOnClose}
    >
      <form onSubmit={handleSubmitForm(handleUpdateUser)}>
        <ModalContent className="m-4">
          <ModalHeader>Update User</ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-4">
              <p className="text-sm font-bold">Information</p>
              <div className="flex flex-col gap-4">
                <Controller
                  name="fullName"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      autoFocus
                      label="Full Name"
                      variant="bordered"
                      type="text"
                      isInvalid={errors.fullName !== undefined}
                      errorMessage={errors.fullName?.message}
                    />
                  )}
                />
                <Controller
                  name="username"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Username"
                      variant="bordered"
                      type="text"
                      isInvalid={errors.username !== undefined}
                      errorMessage={errors.username?.message}
                    />
                  )}
                />
                <Controller
                  name="isActive"
                  control={control}
                  render={({ field }) => (
                    <Select
                      selectedKeys={[field.value ? "true" : "false"]}
                      onSelectionChange={(keys) => {
                        const val = Array.from(keys)[0] === "true";
                        field.onChange(val);
                      }}
                      disallowEmptySelection
                    >
                      <SelectItem key="true">Active</SelectItem>
                      <SelectItem key="false">Not Active</SelectItem>
                    </Select>
                  )}
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              variant="flat"
              onPress={handleOnClose}
              disabled={isPendingMutateUpdateUser}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              type="submit"
              disabled={isPendingMutateUpdateUser}
            >
              {isPendingMutateUpdateUser ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Update User"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default UpdateUserModal;
