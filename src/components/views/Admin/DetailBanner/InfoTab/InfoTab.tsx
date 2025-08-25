import { IBanner } from "@/types/Banner";
import {
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
import useInfoTab from "./useInfoTab";
import { Controller } from "react-hook-form";
import { useEffect } from "react";

interface PropTypes {
  dataBanner: IBanner;
  onUpdate: (data: IBanner) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const InfoTab = (props: PropTypes) => {
  const { dataBanner, onUpdate, isPendingUpdate, isSuccessUpdate } = props;
  const {
    controlUpdateInfo,
    handleSubmitUpdateInfo,
    errorsUpdateInfo,
    setValueUpdateInfo,
  } = useInfoTab();

  useEffect(() => {
    setValueUpdateInfo("title", `${dataBanner?.title}`);
    setValueUpdateInfo("isShow", `${dataBanner?.isShow}`);
  }, [dataBanner]);

  useEffect(() => {
    if (isSuccessUpdate) {
    }
  }, [isSuccessUpdate]);

  return (
    <Card className="w-full rounded-3xl border border-gray-100 bg-gradient-to-br from-white to-gray-50 shadow-xl transition-all hover:shadow-2xl lg:w-1/2">
      {/* Header */}
      <CardHeader className="flex-col items-start space-y-2 border-b border-gray-100 pb-4">
        <h1 className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent">
          Banner Information
        </h1>
        <p className="text-sm text-gray-500">
          Manage and update information of this banner with ease 📝
        </p>
      </CardHeader>

      {/* Body */}
      <CardBody className="p-6">
        <form
          className="flex flex-col gap-6"
          onSubmit={handleSubmitUpdateInfo(onUpdate)}
        >
          {/* Name */}
          <Skeleton
            isLoaded={!!dataBanner?.title}
            className="rounded-xl bg-gray-100/60"
          >
            <Controller
              name="title"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Title"
                  variant="bordered"
                  labelPlacement="outside"
                  type="text"
                  isInvalid={errorsUpdateInfo.title !== undefined}
                  errorMessage={errorsUpdateInfo.title?.message}
                  className="mt-2"
                />
              )}
            />
          </Skeleton>
          <Skeleton isLoaded={!!dataBanner} className="rounded-xl">
            <Controller
              name="isShow"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Status"
                  variant="bordered"
                  labelPlacement="outside"
                  className="rounded-xl"
                  disallowEmptySelection
                  isInvalid={errorsUpdateInfo.isShow !== undefined}
                  errorMessage={errorsUpdateInfo.isShow?.message}
                  defaultSelectedKeys={[
                    dataBanner?.isShow ? "true" : "false",
                  ]}
                >
                  <SelectItem key="true">Show</SelectItem>
                  <SelectItem key="false">Hide</SelectItem>
                </Select>
              )}
            />
          </Skeleton>

          {/* Button */}
          <Button
            color="primary"
            type="submit"
            className="mt-2 w-full rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 py-3 text-base font-semibold shadow-md transition-transform hover:scale-[1.02] hover:shadow-lg disabled:cursor-not-allowed disabled:from-gray-400 disabled:to-gray-400"
            disabled={isPendingUpdate || !dataBanner?._id}
          >
            {isPendingUpdate ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Shave Changes"
            )}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default InfoTab;
