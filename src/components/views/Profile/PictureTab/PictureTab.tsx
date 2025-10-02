import InputFile from "@/components/ui/InputFile";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Skeleton,
  Spinner,
} from "@heroui/react";
import usePictureTab from "./usePictureTab";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { IProfile } from "@/types/Auth";

interface PropTypes {
  currentPicture: string;
  onUpdate: (data: IProfile) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const PictureTab = ({
  currentPicture,
  onUpdate,
  isPendingUpdate,
  isSuccessUpdate,
}: PropTypes) => {
  const {
    handleDeletePicture,
    handleUploadPicture,
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,

    controlUpdatePicture,
    errorsUpdatePicture,
    handleSubmitUpdatePicture,
    resetUpdatePicture,

    preview,
  } = usePictureTab();

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdatePicture();
    }
  }, [isSuccessUpdate, resetUpdatePicture]);

  return (
    <Card className="border-default-200 w-full rounded-2xl border shadow-md">
      <CardHeader className="flex-col items-center gap-1 text-center">
        <h1 className="text-foreground text-lg font-semibold">
          Profile Picture
        </h1>
        <p className="text-default-500 text-sm">
          Upload and manage your profile photo
        </p>
      </CardHeader>

      <CardBody>
        <form
          className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between"
          onSubmit={handleSubmitUpdatePicture(onUpdate)}
        >
          {/* Current Picture */}
          <div className="flex flex-col items-center gap-2 lg:w-1/3">
            <p className="text-default-600 text-sm font-medium">
              Current Picture
            </p>
            <Skeleton
              isLoaded={!!currentPicture}
              className="h-40 w-40 rounded-full"
            >
              <Avatar
                src={`${process.env.NEXT_PUBLIC_IMAGE}${currentPicture}`}
                alt="Profile"
                showFallback
                className="border-default-300 h-40 w-40 rounded-full border-2 shadow-sm"
              />
            </Skeleton>
          </div>

          {/* Upload & Action */}
          <div className="flex w-full flex-col gap-6 lg:w-2/3">
            <Controller
              name="profilePicture"
              control={controlUpdatePicture}
              render={({ field: { onChange, ...field } }) => (
                <InputFile
                  {...field}
                  onDelete={() => handleDeletePicture(onChange)}
                  onUpload={(files) => handleUploadPicture(files, onChange)}
                  isUploading={isPendingMutateUploadFile}
                  isDeleting={isPendingMutateDeleteFile}
                  isInvalid={errorsUpdatePicture.profilePicture !== undefined}
                  errorMessage={errorsUpdatePicture.profilePicture?.message}
                  isDropable
                  className="border-default-300 hover:border-primary rounded-xl border border-dashed transition-colors"
                  label={
                    <p className="text-default-600 mb-2 text-sm font-medium">
                      Upload New Picture
                    </p>
                  }
                  preview={typeof preview === "string" ? preview : ""}
                />
              )}
            />

            <Button
              type="submit"
              color="primary"
              className="w-full rounded-xl font-medium disabled:opacity-60"
              disabled={
                isPendingMutateUploadFile || isPendingUpdate || !preview
              }
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

export default PictureTab;
