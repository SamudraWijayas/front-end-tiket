import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  DatePicker,
  Input,
  Select,
  SelectItem,
  Skeleton,
  Spinner,
  Textarea,
} from "@heroui/react";
import useInfoTab from "./useInfoTab";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { IEventForm } from "@/types/Event";
import { ICategory } from "@/types/Category";
import { toInputDate } from "@/utils/date";

interface PropTypes {
  dataEvent: IEventForm;
  onUpdate: (data: IEventForm) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const InfoTab = (props: PropTypes) => {
  const { dataEvent, onUpdate, isPendingUpdate, isSuccessUpdate } = props;
  const {
    controlUpdateInfo,
    handleSubmitUpdateInfo,
    errorsUpdateInfo,
    setValueUpdateInfo,
    dataCategory,
  } = useInfoTab();

  useEffect(() => {
    setValueUpdateInfo("name", `${dataEvent?.name}`);
    setValueUpdateInfo("description", `${dataEvent?.description}`);
    setValueUpdateInfo("slug", `${dataEvent?.slug}`);
    setValueUpdateInfo("category", `${dataEvent?.category}`);
    setValueUpdateInfo("startDate", toInputDate(`${dataEvent?.startDate}`));
    setValueUpdateInfo("endDate", toInputDate(`${dataEvent?.endDate}`));
    setValueUpdateInfo("isPublish", `${dataEvent?.isPublish}`);
    setValueUpdateInfo("isFeatured", `${dataEvent?.isFeatured}`);
  }, [dataEvent]);

  useEffect(() => {
    // Only reset the form if the update was initiated from this tab
    // This prevents the form from being cleared when other tabs update successfully
    if (isSuccessUpdate) {
      // Optional: You can add a flag to track which tab initiated the update
      // For now, we'll not reset automatically to prevent data loss
      // resetUpdateInfo();
    }
  }, [isSuccessUpdate]);

  return (
    <Card className="w-full rounded-3xl border border-gray-200 bg-white p-4 shadow-lg transition-all duration-300 hover:shadow-2xl lg:w-2/3">
      {/* Header */}
      <CardHeader className="flex flex-col items-start space-y-2 border-b border-gray-100 pb-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold text-gray-900">
            Event Information
          </h1>
          {dataEvent?.isPublish ? (
            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
              Published
            </span>
          ) : (
            <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
              Draft
            </span>
          )}
        </div>
        <p className="text-sm text-gray-500">
          Manage and update information of this event 📝
        </p>
      </CardHeader>

      {/* Body */}
      <CardBody className="p-6">
        <form
          className="flex flex-col gap-5"
          onSubmit={handleSubmitUpdateInfo(onUpdate)}
        >
          {/* Name */}
          <Skeleton isLoaded={!!dataEvent?.name} className="rounded-xl">
            <Controller
              name="name"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Name"
                  variant="bordered"
                  className="rounded-xl"
                  labelPlacement="outside"
                  type="text"
                  isInvalid={errorsUpdateInfo.name !== undefined}
                  errorMessage={errorsUpdateInfo.name?.message}
                />
              )}
            />
          </Skeleton>

          {/* Slug */}
          <Skeleton isLoaded={!!dataEvent?.slug} className="rounded-xl">
            <Controller
              name="slug"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Slug"
                  variant="bordered"
                  className="rounded-xl"
                  labelPlacement="outside"
                  type="text"
                  isInvalid={errorsUpdateInfo.slug !== undefined}
                  errorMessage={errorsUpdateInfo.slug?.message}
                />
              )}
            />
          </Skeleton>

          {/* Category */}
          <Skeleton isLoaded={!!dataEvent?.category} className="rounded-xl">
            <Controller
              name="category"
              control={controlUpdateInfo}
              render={({ field: { onChange, ...field } }) => (
                <Autocomplete
                  {...field}
                  defaultItems={dataCategory?.data.data || []}
                  label="Category"
                  labelPlacement="outside"
                  variant="bordered"
                  className="rounded-xl"
                  defaultSelectedKey={dataEvent?.category}
                  isInvalid={errorsUpdateInfo.category !== undefined}
                  errorMessage={errorsUpdateInfo.category?.message}
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
          </Skeleton>

          {/* Dates */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Skeleton isLoaded={!!dataEvent?.startDate} className="rounded-xl">
              <Controller
                name="startDate"
                control={controlUpdateInfo}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    label="Start Date"
                    labelPlacement="outside"
                    variant="bordered"
                    className="rounded-xl"
                    hideTimeZone
                    showMonthAndYearPickers
                    isInvalid={errorsUpdateInfo.startDate !== undefined}
                    errorMessage={errorsUpdateInfo.startDate?.message}
                  />
                )}
              />
            </Skeleton>
            <Skeleton isLoaded={!!dataEvent?.endDate} className="rounded-xl">
              <Controller
                name="endDate"
                control={controlUpdateInfo}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    label="End Date"
                    labelPlacement="outside"
                    variant="bordered"
                    className="rounded-xl"
                    hideTimeZone
                    showMonthAndYearPickers
                    isInvalid={errorsUpdateInfo.endDate !== undefined}
                    errorMessage={errorsUpdateInfo.endDate?.message}
                  />
                )}
              />
            </Skeleton>
          </div>

          {/* Status & Featured */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Skeleton isLoaded={!!dataEvent} className="rounded-xl">
              <Controller
                name="isPublish"
                control={controlUpdateInfo}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Status"
                    variant="bordered"
                    className="rounded-xl"
                    disallowEmptySelection
                    isInvalid={errorsUpdateInfo.isPublish !== undefined}
                    errorMessage={errorsUpdateInfo.isPublish?.message}
                    defaultSelectedKeys={[
                      dataEvent?.isPublish ? "true" : "false",
                    ]}
                  >
                    <SelectItem key="true">Published</SelectItem>
                    <SelectItem key="false">Draft</SelectItem>
                  </Select>
                )}
              />
            </Skeleton>

            <Skeleton isLoaded={!!dataEvent} className="rounded-xl">
              <Controller
                name="isFeatured"
                control={controlUpdateInfo}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Featured"
                    variant="bordered"
                    className="rounded-xl"
                    disallowEmptySelection
                    isInvalid={errorsUpdateInfo.isFeatured !== undefined}
                    errorMessage={errorsUpdateInfo.isFeatured?.message}
                    defaultSelectedKeys={[
                      dataEvent?.isFeatured ? "true" : "false",
                    ]}
                  >
                    <SelectItem key="true">Yes</SelectItem>
                    <SelectItem key="false">No</SelectItem>
                  </Select>
                )}
              />
            </Skeleton>
          </div>

          {/* Description */}
          <Skeleton isLoaded={!!dataEvent?.description} className="rounded-xl">
            <Controller
              name="description"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Textarea
                  {...field}
                  label="Description"
                  labelPlacement="outside"
                  variant="bordered"
                  className="rounded-xl"
                  minRows={4}
                  isInvalid={errorsUpdateInfo.description !== undefined}
                  errorMessage={errorsUpdateInfo.description?.message}
                />
              )}
            />
          </Skeleton>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button
              color="primary"
              size="lg"
              className="disabled:bg-default-500 rounded-xl px-6 font-medium shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg"
              type="submit"
              disabled={isPendingUpdate || !dataEvent?._id}
            >
              {isPendingUpdate ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};

export default InfoTab;
