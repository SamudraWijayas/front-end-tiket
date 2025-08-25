import DataTable from "@/components/ui/DataTable";
import {

  useDisclosure,
} from "@heroui/react";
import Image from "next/image";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { COLUMN_LIST_CATEGORY } from "./Category.constants";
import useCategory from "./useCategory";
import AddCategoryModal from "./AddCategoryModal";
import DeleteCategoryModal from "./DeleteCategoryModal";
import useChangeUrl from "@/hooks/useChangeUrls";
import DropdownAction from "@/components/commons/DropdownAction";

const Category = () => {
  const { push, isReady, query } = useRouter();
  const {
    isRefetchingCategory,
    refetchCategory,
    dataCategory,
    isLoadingCategory,

    selectedId,
    setSelectedId,
  } = useCategory();

  const addCategoryModal = useDisclosure();
  const deleteCategoryModal = useDisclosure();

  const { setUrl } = useChangeUrl();

  useEffect(() => {
    if (isReady) {
      setUrl();
    }
  }, [isReady]);

  const renderCell = useCallback(
    (category: Record<string, unknown>, columnKey: Key) => {
      const cellValue = category[columnKey as keyof typeof category];
      switch (columnKey) {
        case "icon":
          return (
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGE}${cellValue}`}
              width={100}
              height={100}
              alt="icon"
            />
          );
        case "actions":
          return (
            <DropdownAction
              onClickDetail={() => push(`/admin/category/${category._id}`)}
              onClickDelete={() => {
                setSelectedId(`${category._id}`);
                deleteCategoryModal.onOpen();
              }}
              textButtonDetail="Detail Category"
              textButtonDelete="Delete Category"
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
          buttonTopContentLabel="Create Category"
          columns={COLUMN_LIST_CATEGORY}
          data={dataCategory?.data || []}
          emptyContent="Category is empty"
          isLoading={isLoadingCategory || isRefetchingCategory}
          onClickButtonTopContent={addCategoryModal.onOpen}
          renderCell={renderCell}
          totalPages={dataCategory?.pagination.totalPages || 0}
        />
      )}
      <AddCategoryModal
        refetchCategory={refetchCategory}
        {...addCategoryModal}
      />
      <DeleteCategoryModal
        refetchCategory={refetchCategory}
        {...deleteCategoryModal}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
    </section>
  );
};

export default Category;
