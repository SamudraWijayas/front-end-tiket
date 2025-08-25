import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Skeleton,
  Spinner,
} from "@heroui/react";
import Image from "next/image";
import InputFile from "@/components/ui/InputFile";
import useIconTab from "./useIconTab";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { ICategory } from "@/types/Category";

interface PropTypes {
  currentIcon: string;
  onUpdate: (data: ICategory) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const IconTab = (props: PropTypes) => {
  const { currentIcon, onUpdate, isPendingUpdate, isSuccessUpdate } = props;

  const {
    preview,
    controlUpdateIcon,
    handleSubmitUpdateIcon,
    errorsUpdateIcon,
    handleDeleteIcon,
    handleUploadIcon,
    resetUpdateIcon,
    isPendingMutateUploadFile,
    isPendingMutateDeleteFile,
  } = useIconTab();

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdateIcon();
    }
  }, [isSuccessUpdate]);
  return (
    <Card className="w-full rounded-3xl border border-gray-100 bg-gradient-to-br from-white to-gray-50 p-4 shadow-xl transition-all hover:shadow-2xl lg:w-1/2">
      {/* Header */}
      <CardHeader className="flex-col items-start space-y-2 border-b border-gray-100 pb-4">
        <h1 className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent">
          Category Icon
        </h1>
        <p className="text-sm text-gray-500">
          Upload and manage your category icon with ease and style ✨
        </p>
      </CardHeader>

      {/* Body */}
      <CardBody className="p-6">
        <form
          className="flex flex-col gap-6"
          onSubmit={handleSubmitUpdateIcon(onUpdate)}
        >
          {/* Current Icon Preview */}
          <Skeleton
            isLoaded={!!currentIcon}
            className="relative flex aspect-video items-center justify-center rounded-2xl border border-gray-200 bg-gray-50 shadow-inner"
          >
            {currentIcon ? (
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGE}${currentIcon}`}
                alt="icon"
                fill
                className="!relative rounded-xl object-contain p-4 transition-transform hover:scale-105"
              />
            ) : (
              <span className="text-sm text-gray-400">No Icon Available</span>
            )}
          </Skeleton>

          {/* Upload New Icon */}
          <Controller
            name="icon"
            control={controlUpdateIcon}
            render={({ field: { onChange, ...field } }) => (
              <InputFile
                {...field}
                onDelete={() => handleDeleteIcon(onChange)}
                onUpload={(files) => handleUploadIcon(files, onChange)}
                isUploading={isPendingMutateUploadFile}
                isDeleting={isPendingMutateDeleteFile}
                isInvalid={errorsUpdateIcon.icon !== undefined}
                errorMessage={errorsUpdateIcon.icon?.message}
                isDropable
                label={
                  <p className="text-sm font-medium text-gray-600">
                    Drag & drop or click to upload new icon
                  </p>
                }
                preview={preview}
              />
            )}
          />

          {/* Button */}
          <Button
            color="primary"
            type="submit"
            className="mt-2 w-full rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 py-3 text-base font-semibold shadow-md transition-transform hover:scale-[1.02] hover:shadow-lg disabled:cursor-not-allowed disabled:from-gray-400 disabled:to-gray-400"
            disabled={isPendingMutateUploadFile || isPendingUpdate || !preview}
          >
            {isPendingUpdate ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Shave Changes Icon"
            )}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default IconTab;
