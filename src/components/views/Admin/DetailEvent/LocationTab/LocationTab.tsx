import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Select,
  SelectItem,
  Skeleton,
  Spinner,
} from "@heroui/react";
import useLocationTab from "./useLocationTab";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { IEventForm, IRegency } from "@/types/Event";

interface PropTypes {
  dataEvent: IEventForm;
  dataDefaultRegion: string;
  isPendingDefaultRegion: boolean;
  onUpdate: (data: IEventForm) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const LocationTab = (props: PropTypes) => {
  const {
    dataEvent,
    dataDefaultRegion,
    isPendingDefaultRegion,
    onUpdate,
    isPendingUpdate,
    isSuccessUpdate,
  } = props;
  const {
    controlUpdateLocation,
    errorsUpdateLocation,
    handleSubmitUpdateLocation,
    setValueUpdateLocation,
    resetFormWithData,

    dataRegion,
    searchRegency,
    handleSearchRegion,
  } = useLocationTab();

  useEffect(() => {
    if (dataEvent) {
      setValueUpdateLocation("address", `${dataEvent?.location?.address}`);
      setValueUpdateLocation("isOnline", `${dataEvent?.isOnline}`);
      setValueUpdateLocation("region", `${dataEvent?.location?.region}`);
      setValueUpdateLocation(
        "latitude",
        `${dataEvent?.location?.coordinates[0]}`,
      );
      setValueUpdateLocation(
        "longitude",
        `${dataEvent?.location?.coordinates[1]}`,
      );
    }
  }, [dataEvent]);

  useEffect(() => {
    // Only reset the form if the update was initiated from this tab
    // This prevents the form from being cleared when other tabs update successfully
    if (isSuccessUpdate) {
      // Optional: You can add a flag to track which tab initiated the update
      // For now, we'll not reset automatically to prevent data loss
      // resetUpdateLocation();
    }
  }, [isSuccessUpdate]);
  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Event Location</h1>
        <p className="text-small text-default-400 w-full">
          Manage location of this event
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateLocation(onUpdate)}
        >
          <Skeleton
            isLoaded={!!dataEvent?.location?.address}
            className="rounded-lg"
          >
            <Controller
              name="address"
              control={controlUpdateLocation}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Address"
                  variant="bordered"
                  labelPlacement="outside"
                  type="text"
                  isInvalid={errorsUpdateLocation.address !== undefined}
                  errorMessage={errorsUpdateLocation.address?.message}
                />
              )}
            />
          </Skeleton>
          <Skeleton isLoaded={!!dataEvent} className="rounded-lg">
            <Controller
              name="isOnline"
              control={controlUpdateLocation}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Online / Offline"
                  labelPlacement="outside"
                  variant="bordered"
                  isInvalid={errorsUpdateLocation.isOnline !== undefined}
                  errorMessage={errorsUpdateLocation.isOnline?.message}
                  disallowEmptySelection
                  defaultSelectedKeys={[dataEvent?.isOnline ? "true" : "false"]}
                >
                  <SelectItem key="true">
                    Online
                  </SelectItem>
                  <SelectItem key="false">
                    Offline
                  </SelectItem>
                </Select>
              )}
            />
          </Skeleton>
          <Skeleton
            isLoaded={!!dataEvent?.location?.coordinates[0]}
            className="rounded-lg"
          >
            <Controller
              name="latitude"
              control={controlUpdateLocation}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Latitude"
                  variant="bordered"
                  labelPlacement="outside"
                  type="text"
                  isInvalid={errorsUpdateLocation.latitude !== undefined}
                  errorMessage={errorsUpdateLocation.latitude?.message}
                />
              )}
            />
          </Skeleton>
          <Skeleton
            isLoaded={!!dataEvent?.location?.coordinates[1]}
            className="rounded-lg"
          >
            <Controller
              name="longitude"
              control={controlUpdateLocation}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Longitude"
                  variant="bordered"
                  labelPlacement="outside"
                  type="text"
                  isInvalid={errorsUpdateLocation.longitude !== undefined}
                  errorMessage={errorsUpdateLocation.longitude?.message}
                />
              )}
            />
          </Skeleton>
          <Skeleton
            isLoaded={!!dataEvent?.location?.region && !isPendingDefaultRegion}
            className="rounded-lg"
          >
            {!isPendingDefaultRegion ? (
              <Controller
                name="region"
                control={controlUpdateLocation}
                render={({ field: { onChange, ...field } }) => (
                  <Autocomplete
                    {...field}
                    defaultItems={
                      dataRegion?.data.data && searchRegency !== ""
                        ? dataRegion?.data.data
                        : []
                    }
                    defaultInputValue={dataDefaultRegion}
                    label="City"
                    labelPlacement="outside"
                    variant="bordered"
                    onInputChange={(search) => handleSearchRegion(search)}
                    isInvalid={errorsUpdateLocation.region !== undefined}
                    errorMessage={errorsUpdateLocation.region?.message}
                    onSelectionChange={(value) => onChange(value)}
                    placeholder="Search city here..."
                  >
                    {(regency: IRegency) => (
                      <AutocompleteItem key={`${regency.id}`}>
                        {regency.name}
                      </AutocompleteItem>
                    )}
                  </Autocomplete>
                )}
              />
            ) : (
              <div className="h-16 w-full" />
            )}
          </Skeleton>
          <div className="flex gap-2 mt-2">
            <Button
              color="primary"
              className="disabled:bg-default-500 flex-1"
              type="submit"
              disabled={isPendingUpdate || !dataEvent?._id}
            >
              {isPendingUpdate ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Save Changes"
              )}
            </Button>
            <Button
              color="default"
              variant="bordered"
              onClick={() => resetFormWithData(dataEvent)}
              disabled={!dataEvent}
            >
              Reset
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};

export default LocationTab;
