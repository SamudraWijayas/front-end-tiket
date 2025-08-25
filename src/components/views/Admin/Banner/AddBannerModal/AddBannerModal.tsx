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
import useAddBannerModal from "./useAddBannerModal";
import { Controller } from "react-hook-form";
import InputFile from "@/components/ui/InputFile";
import { useEffect } from "react";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchBanner: () => void;
}

const AddBannerModal = ({
  isOpen,
  onClose,
  onOpenChange,
  refetchBanner,
}: PropTypes) => {
  const {
    control,
    errors,
    handleSubmitForm,
    handleAddBanner,
    isSuccessMutateAddBanner,
    isPendingMutateAddBanner,
    preview,
    handleUploadImage,
    isPendingMutateUploadFile,
    handleDeleteImage,
    isPendingMutateDeleteFile,
    handleOnClose,
  } = useAddBannerModal();

  useEffect(() => {
    if (isSuccessMutateAddBanner) {
      onClose();
      refetchBanner();
    }
  }, [isSuccessMutateAddBanner]);

  const disabledSubmit =
    isPendingMutateAddBanner ||
    isPendingMutateUploadFile ||
    isPendingMutateDeleteFile;

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
      onClose={() => handleOnClose(onClose)}
    >
      <form onSubmit={handleSubmitForm(handleAddBanner)}>
        <ModalContent className="m-4">
          <ModalHeader>Add Banner</ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-2">
              {/* Nama kategori */}
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    autoFocus
                    label="Nama Kategori"
                    isInvalid={!!errors.title}
                    errorMessage={errors.title?.message}
                    className="mb-2"
                  />
                )}
              />

              {/* Deskripsi */}
              <Controller
                name="isShow"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Status"
                    variant="bordered"
                    isInvalid={!!errors.isShow}
                    errorMessage={errors.isShow?.message}
                    disallowEmptySelection
                  >
                    <SelectItem key="true">Publish</SelectItem>
                    <SelectItem key="false">Draft</SelectItem>
                  </Select>
                )}
              />

              {/* Image */}
              <p className="text-sm font-bold">Image</p>
              <Controller
                name="image"
                control={control}
                render={({ field: { onChange, ...field } }) => (
                  <InputFile
                    {...field}
                    onUpload={(files) => handleUploadImage(files, onChange)}
                    isUploading={isPendingMutateUploadFile}
                    isDeleting={isPendingMutateDeleteFile}
                    onDelete={() => handleDeleteImage(onChange)}
                    isInvalid={errors.image !== undefined}
                    errorMessage={errors.image?.message}
                    isDropable
                    preview={preview}
                  />
                )}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              variant="flat"
              onPress={() => handleOnClose(onClose)}
              disabled={disabledSubmit}
            >
              Cancel
            </Button>
            <Button color="primary" type="submit" disabled={disabledSubmit}>
              {isPendingMutateAddBanner ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Add Banner"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddBannerModal;
