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
import useAddUserModal from "./useAddUserModal";
import { Controller } from "react-hook-form";
import { useEffect } from "react";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchUser: () => void;
}

const AddUserModal = ({
  isOpen,
  onClose,
  onOpenChange,
  refetchUser,
}: PropTypes) => {
  const {
    control,
    errors,
    reset,
    handleSubmitForm,
    handleAddUser,
    isPendingMutateAddUser,
    isSuccessMutateAddUser,
  } = useAddUserModal();

  useEffect(() => {
    if (isSuccessMutateAddUser) {
      onClose();
      refetchUser();
    }
  }, [isSuccessMutateAddUser]);

  const disabledSubmit = isPendingMutateAddUser;

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <form onSubmit={handleSubmitForm(handleAddUser)}>
        <ModalContent className="m-4">
          <ModalHeader>Add User</ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-2">
              {/* Nama kategori */}
              <Controller
                name="fullName"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    autoFocus
                    label="Full Name"
                    isInvalid={!!errors.fullName}
                    errorMessage={errors.fullName?.message}
                    className="mb-2"
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
                    isInvalid={!!errors.username}
                    errorMessage={errors.username?.message}
                    className="mb-2"
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="email"
                    label="Email"
                    isInvalid={!!errors.email}
                    errorMessage={errors.email?.message}
                    className="mb-2"
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="password"
                    label="Password"
                    isInvalid={!!errors.password}
                    errorMessage={errors.password?.message}
                    className="mb-2"
                  />
                )}
              />
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="password"
                    label="Konfirmasi kata sandi"
                    isInvalid={!!errors.confirmPassword}
                    errorMessage={errors.confirmPassword?.message}
                    className="mb-2"
                  />
                )}
              />
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Status"
                    variant="bordered"
                    isInvalid={!!errors.role}
                    errorMessage={errors.role?.message}
                    disallowEmptySelection
                  >
                    <SelectItem key="admin">admin</SelectItem>
                    <SelectItem key="organizer">organizer</SelectItem>
                  </Select>
                )}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" variant="flat" disabled={disabledSubmit}>
              Cancel
            </Button>
            <Button color="primary" type="submit" disabled={disabledSubmit}>
              {isPendingMutateAddUser ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Add User"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddUserModal;
