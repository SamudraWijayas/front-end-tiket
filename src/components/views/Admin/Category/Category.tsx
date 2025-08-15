import DataTable from "@/components/ui/DataTable";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import Image from "next/image";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { EllipsisVertical } from "lucide-react";
import { useRouter } from "next/router";
import { COLUMN_LIST_CATEGORY } from "./Categort.constants";
import useCategory from "./useCategory";
import InputFile from "@/components/ui/InputFile";

const Category = () => {
  const { push, isReady, query } = useRouter();
  const {
    currentPage,
    currentLimit,
    isRefetchingCategory,
    dataCategory,
    isLoadingCategory,
    setURL,
    handleChangePage,
    handleChangeLimit,
    handleClearSearch,
    handleSearch,
  } = useCategory();

  useEffect(() => {
    if (isReady) {
      setURL();
    }
  }, [isReady]);

  const renderCell = useCallback(
    (category: Record<string, unknown>, columnKey: Key) => {
      const cellValue = category[columnKey as keyof typeof category];
      switch (columnKey) {
        // case "icon":
        //   return (
        //     <Image src={`${cellValue}`} width={100} height={100} alt="icon" />
        //   );
        case "actions":
          return (
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <EllipsisVertical className="text-default-700" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  key="detail-category-button"
                  onPress={() => push(`/admin/category/${category._id}`)}
                >
                  Detail Category
                </DropdownItem>
                <DropdownItem
                  key="delete-category-button"
                  className="text-red-500"
                >
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
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
          currentPage={Number(currentPage)}
          data={dataCategory?.data || []}
          emptyContent="Category is empty"
          isLoading={isLoadingCategory || isRefetchingCategory}
          limit={String(currentLimit)}
          onChangeLimit={handleChangeLimit}
          onChangeSearch={handleSearch}
          onCahngePage={handleChangePage}
          onClearSearch={handleClearSearch}
          onClickButtonTopContent={() => {}}
          renderCell={renderCell}
          totalPages={dataCategory?.pagination.totalPages || 0}
        />
      )}
      <InputFile name={""}></InputFile>
    </section>
  );
};

export default Category;
