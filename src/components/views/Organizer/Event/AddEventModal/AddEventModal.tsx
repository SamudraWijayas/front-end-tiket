import {
  Autocomplete,
  AutocompleteItem,
  Button,
  DatePicker,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Spinner,
  Textarea,
} from "@heroui/react";
import useAddEventModal from "./useAddEventModal";
import { Controller } from "react-hook-form";
import InputFile from "@/components/ui/InputFile";
import { useEffect } from "react";
import { ICategory } from "@/types/Category";
import { IRegency } from "@/types/Event";
import { getLocalTimeZone, now } from "@internationalized/date";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchEvents: () => void;
}

const AddEventModal = ({
  isOpen,
  onClose,
  onOpenChange,
  refetchEvents,
}: PropTypes) => {
  const {
    control,
    errors,
    handleSubmitForm,
    handleAddEvent,
    isSuccessMutateAddEvent,
    isPendingMutateAddEvent,
    preview,
    handleUploadBanner,
    isPendingMutateUploadFile,
    handleDeleteBanner,
    isPendingMutateDeleteFile,
    handleOnClose,
    dataCategory,
    dataRegion,
    searchRegency,
    handleSearchRegion,
    setValue,
    watch,
  } = useAddEventModal();

  useEffect(() => {
    if (isSuccessMutateAddEvent) {
      onClose();
      refetchEvents();
    }
  }, [isSuccessMutateAddEvent]);

  // Auto-sync slug with name field
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "name") {
        const slug = value.name
          ?.toString()
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "");
        setValue("slug", slug || "");
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setValue]);

  const disabledSubmit =
    isSuccessMutateAddEvent ||
    isPendingMutateUploadFile ||
    isPendingMutateDeleteFile;
    
  useEffect(() => {
    setValue("startDate", now(getLocalTimeZone()));
    setValue("endDate", now(getLocalTimeZone()));
  }, [onOpenChange]);
  
  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
      size="4xl"
      onClose={() => handleOnClose(onClose)}
    >
      <form onSubmit={handleSubmitForm(handleAddEvent)}>
        <ModalContent className="m-4 rounded-2xl shadow-xl">
          <ModalHeader className="text-xl font-bold">
            Create New Event
          </ModalHeader>
          <ModalBody className="space-y-6">
            {/* Section: Event Info */}
            <div>
              <h3 className="mb-3 text-base font-semibold">Event Info</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      autoFocus
                      label="Name"
                      variant="bordered"
                      isInvalid={!!errors.name}
                      errorMessage={errors.name?.message}
                    />
                  )}
                />
                <Controller
                  name="slug"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Slug"
                      variant="bordered"
                      isInvalid={!!errors.slug}
                      errorMessage={errors.slug?.message}
                      isReadOnly
                    />
                  )}
                />
                <Controller
                  name="category"
                  control={control}
                  render={({ field: { onChange, ...field } }) => (
                    <Autocomplete
                      {...field}
                      defaultItems={dataCategory?.data.data || []}
                      label="Category"
                      variant="bordered"
                      isInvalid={!!errors.category}
                      errorMessage={errors.category?.message}
                      onSelectionChange={(value) => onChange(value)}
                      placeholder="Search category..."
                    >
                      {(category: ICategory) => (
                        <AutocompleteItem key={`${category._id}`}>
                          {category.name}
                        </AutocompleteItem>
                      )}
                    </Autocomplete>
                  )}
                />
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      label="Description"
                      variant="bordered"
                      isInvalid={!!errors.description}
                      errorMessage={errors.description?.message}
                    />
                  )}
                />
              </div>
            </div>

            {/* Section: Date & Status */}
            <div>
              <h3 className="mb-3 text-base font-semibold">
                Schedule & Status
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Controller
                  name="startDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      label="Start Date"
                      variant="bordered"
                      hideTimeZone
                      showMonthAndYearPickers
                      isInvalid={!!errors.startDate}
                      errorMessage={errors.startDate?.message}
                    />
                  )}
                />
                <Controller
                  name="endDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      label="End Date"
                      variant="bordered"
                      hideTimeZone
                      showMonthAndYearPickers
                      isInvalid={!!errors.endDate}
                      errorMessage={errors.endDate?.message}
                    />
                  )}
                />
                <Controller
                  name="isPublish"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      label="Status"
                      variant="bordered"
                      isInvalid={!!errors.isPublish}
                      errorMessage={errors.isPublish?.message}
                      disallowEmptySelection
                    >
                      <SelectItem key="true">Publish</SelectItem>
                      <SelectItem key="false">Draft</SelectItem>
                    </Select>
                  )}
                />
                <Controller
                  name="isFeatured"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      label="Featured"
                      variant="bordered"
                      isInvalid={!!errors.isFeatured}
                      errorMessage={errors.isFeatured?.message}
                      disallowEmptySelection
                    >
                      <SelectItem key="true">Yes</SelectItem>
                      <SelectItem key="false">No</SelectItem>
                    </Select>
                  )}
                />
              </div>
            </div>

            {/* Section: Location */}
            <div>
              <h3 className="mb-3 text-base font-semibold">Location</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Controller
                  name="isOnline"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      label="Online / Offline"
                      variant="bordered"
                      isInvalid={!!errors.isOnline}
                      errorMessage={errors.isOnline?.message}
                      disallowEmptySelection
                    >
                      <SelectItem key="true">Online</SelectItem>
                      <SelectItem key="false">Offline</SelectItem>
                    </Select>
                  )}
                />
                <Controller
                  name="region"
                  control={control}
                  render={({ field: { onChange, ...field } }) => (
                    <Autocomplete
                      {...field}
                      defaultItems={
                        dataRegion?.data.data && searchRegency !== ""
                          ? dataRegion?.data.data
                          : []
                      }
                      label="City"
                      variant="bordered"
                      onInputChange={(search) => handleSearchRegion(search)}
                      isInvalid={!!errors.region}
                      errorMessage={errors.region?.message}
                      onSelectionChange={(value) => onChange(value)}
                      placeholder="Search city..."
                    >
                      {(regency: IRegency) => (
                        <AutocompleteItem key={`${regency.id}`}>
                          {regency.name}
                        </AutocompleteItem>
                      )}
                    </Autocomplete>
                  )}
                />
                <Controller
                  name="address"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Address"
                      variant="bordered"
                      isInvalid={!!errors.address}
                      errorMessage={errors.address?.message}
                    />
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <Controller
                    name="latitude"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Latitude"
                        variant="bordered"
                        isInvalid={!!errors.latitude}
                        errorMessage={errors.latitude?.message}
                      />
                    )}
                  />
                  <Controller
                    name="longitude"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Longitude"
                        variant="bordered"
                        isInvalid={!!errors.longitude}
                        errorMessage={errors.longitude?.message}
                      />
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Section: Cover */}
            <div>
              <h3 className="mb-3 text-base font-semibold">Cover</h3>
              <Controller
                name="banner"
                control={control}
                render={({ field: { onChange, ...field } }) => (
                  <InputFile
                    {...field}
                    onUpload={(files) => handleUploadBanner(files, onChange)}
                    isUploading={isPendingMutateUploadFile}
                    isDeleting={isPendingMutateDeleteFile}
                    onDelete={() => handleDeleteBanner(onChange)}
                    isInvalid={!!errors.banner}
                    errorMessage={errors.banner?.message}
                    isDropable
                    preview={preview}
                  />
                )}
              />
            </div>
          </ModalBody>
          <ModalFooter className="gap-2">
            <Button
              color="default"
              variant="flat"
              onPress={() => handleOnClose(onClose)}
              disabled={disabledSubmit}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              type="submit"
              className="font-semibold"
              disabled={disabledSubmit}
            >
              {isPendingMutateAddEvent ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Add Event"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddEventModal;
