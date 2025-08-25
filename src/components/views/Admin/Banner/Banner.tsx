import { Key, ReactNode, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import DataTable from "@/components/ui/DataTable";
import { Chip, useDisclosure } from "@heroui/react";
import DropdownAction from "@/components/commons/DropdownAction";

import useChangeUrl from "@/hooks/useChangeUrls";
import useBanner from "./useBanner";

import { COLUMN_LISTS_BANNER } from "./Banner.constants";
import AddBannerModal from "./AddBannerModal";
import DeleteBannerModal from "./DeleteBannerModal";

const Banner = () => {
  const { push, isReady, query } = useRouter();
  const { setUrl } = useChangeUrl();

  const {
    dataBanner,
    isLoadingBanner,
    isRefetchingBanner,
    refetchBanner,
    selectedId,
    setSelectedId,
  } = useBanner();

  const addBannerModal = useDisclosure();
  const deleteBannerModal = useDisclosure();

  // Set URL saat router ready
  useEffect(() => {
    if (isReady) {
      setUrl();
    }
  }, [isReady, setUrl]);

  // Render setiap cell di DataTable
  const renderCell = useCallback(
    (banner: Record<string, unknown>, columnKey: Key) => {
      const cellValue = banner[columnKey as keyof typeof banner];

      switch (columnKey) {
        case "image":
          return (
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGE}${cellValue}`}
                width={300}
                height={100}
                className="rounded-lg"
                alt="icon"
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
    [push, setSelectedId, deleteBannerModal],
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
