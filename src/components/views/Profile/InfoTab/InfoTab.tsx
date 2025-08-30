import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Skeleton,
  Spinner,
} from "@heroui/react";
import useInfoTab from "./useInfoTab";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { IProfile } from "@/types/Auth";

interface PropTypes {
  dataProfile: IProfile;
  onUpdate: (data: IProfile) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const InfoTab = ({
  dataProfile,
  onUpdate,
  isPendingUpdate,
  isSuccessUpdate,
}: PropTypes) => {
  const {
    controlUpdateInfo,
    errorsUpdateInfo,
    handleSubmitUpdateInfo,
    resetUpdateInfo,
    setValueUpdateInfo,
  } = useInfoTab();

  useEffect(() => {
    if (dataProfile) {
      setValueUpdateInfo("fullName", `${dataProfile?.fullName}`);
    }
  }, [dataProfile]);

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdateInfo();
    }
  }, [isSuccessUpdate]);

  return (
    <Card className="border-default-200 w-full rounded-2xl border shadow-md">
      <CardHeader className="flex-col items-center gap-1 text-center">
        <h1 className="text-foreground text-lg font-semibold">
          User Information
        </h1>
        <p className="text-default-500 text-sm">
          Manage account details and update profile info
        </p>
      </CardHeader>

      <CardBody>
        <form
          className="grid grid-cols-1 gap-6 lg:grid-cols-2"
          onSubmit={handleSubmitUpdateInfo(onUpdate)}
        >
          {/* Username */}
          <Skeleton isLoaded={!!dataProfile?.username} className="rounded-lg">
            <Input
              label="Username"
              labelPlacement="outside"
              variant="bordered"
              disabled
              value={dataProfile?.username}
              className="rounded-xl"
            />
          </Skeleton>

          {/* Email */}
          <Skeleton isLoaded={!!dataProfile?.email} className="rounded-lg">
            <Input
              label="Email"
              labelPlacement="outside"
              variant="bordered"
              disabled
              value={dataProfile?.email}
              className="rounded-xl"
            />
          </Skeleton>

          {/* Role */}
          <Skeleton isLoaded={!!dataProfile?.role} className="rounded-lg">
            <Input
              label="Role"
              labelPlacement="outside"
              variant="bordered"
              disabled
              value={dataProfile?.role}
              className="rounded-xl"
            />
          </Skeleton>

          {/* Fullname */}
          <Skeleton isLoaded={!!dataProfile?.fullName} className="rounded-lg">
            <Controller
              name="fullName"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Full Name"
                  labelPlacement="outside"
                  placeholder="Enter your full name"
                  variant="bordered"
                  isInvalid={errorsUpdateInfo.fullName !== undefined}
                  errorMessage={errorsUpdateInfo.fullName?.message}
                  className="rounded-xl"
                />
              )}
            />
          </Skeleton>

          {/* Submit button */}
          <div className="col-span-1 flex justify-end lg:col-span-2">
            <Button
              color="primary"
              className="w-full rounded-xl font-medium lg:w-auto"
              type="submit"
              disabled={isPendingUpdate || !dataProfile?._id}
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
