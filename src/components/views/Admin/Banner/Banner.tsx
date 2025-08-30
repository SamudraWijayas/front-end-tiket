import DataTable from "@/components/ui/DataTable";
import { Chip, useDisclosure } from "@heroui/react";
import Image from "next/image";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { COLUMN_LISTS_BANNER } from "./Banner.constants";
import useBanner from "./useBanner";
import AddBannerModal from "./AddBannerModal";
import DeleteBannerModal from "./DeleteBannerModal";
import useChangeUrl from "@/hooks/useChangeUrls";
import DropdownAction from "@/components/commons/DropdownAction";

const Banner = () => {
  const { push, isReady, query } = useRouter();
  const {
    isRefetchingBanner,
    refetchBanner,
    dataBanner,
    isLoadingBanner,

    selectedId,
    setSelectedId,
  } = useBanner();

  const addBannerModal = useDisclosure();
  const deleteBannerModal = useDisclosure();

  const { setUrl } = useChangeUrl();

  useEffect(() => {
    if (isReady) {
      setUrl();
    }
  }, [isReady]);

  const renderCell = useCallback(
    (banner: Record<string, unknown>, columnKey: Key) => {
      const cellValue = banner[columnKey as keyof typeof banner];
      switch (columnKey) {
        case "image":
          return (
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGE}${cellValue}`}
              width={100}
              height={100}
              alt="image"
              className="aspect-video h-20 w-26 rounded-lg object-cover"
            />
          );
        case "isShow":
          return (
            <Chip
              color={cellValue === true ? "success" : "danger"}
              variant="flat"
              size="sm"
            >
              {cellValue === true ? "Show" : "Hide"}
            </Chip>
          );
        case "actions":
          return (
            <DropdownAction
              onClickDetail={() => push(`/admin/banner/${banner._id}`)}
              onClickDelete={() => {
                setSelectedId(`${banner._id}`);
                deleteBannerModal.onOpen();
              }}
              textButtonDetail="Detail Banner"
              textButtonDelete="Delete Banner"
            />
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [push],
  );

  return (
    <section>
      {Object.keys(query).length > 0 && (
        <DataTable
          buttonTopContentLabel="Create Banner"
          columns={COLUMN_LISTS_BANNER}
          data={dataBanner?.data || []}
          emptyContent="Banner is empty"
          isLoading={isLoadingBanner || isRefetchingBanner}
          onClickButtonTopContent={addBannerModal.onOpen}
          renderCell={renderCell}
          totalPages={dataBanner?.pagination.totalPages || 0}
        />
      )}
      <AddBannerModal refetchBanner={refetchBanner} {...addBannerModal} />
      <DeleteBannerModal
        refetchBanner={refetchBanner}
        {...deleteBannerModal}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
    </section>
  );
};

export default Banner;
