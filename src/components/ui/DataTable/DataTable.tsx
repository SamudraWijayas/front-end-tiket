import {
  Button,
  Input,
  Pagination,
  Select,
  SelectItem,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import type { Key } from "@react-types/shared";
import { ReactNode, useMemo, useState } from "react";
import { Search, Trash2 } from "lucide-react";
import { LIMIT_LIST } from "@/constants/list.constants";
import { cn } from "@/utils/cn";
import useChangeUrl from "@/hooks/useChangeUrls";

interface ColumnType {
  uid: string;
  name: string;
}

interface PropsTypes {
  buttonTopContentLabel?: string;
  columns: ColumnType[];
  data: Record<string, unknown>[];
  emptyContent: string | React.ReactNode;
  isLoading?: boolean;
  onClickButtonTopContent?: () => void;
  onDeleteSelected?: (ids: string[]) => void; // ➝ tambahan prop untuk hapus
  renderCell: (item: Record<string, unknown>, columnKey: Key) => ReactNode;
  totalPages: number;
  showLimit?: boolean;
  showSearch?: boolean;
  withSelection?: boolean;
}

const DataTable = (props: PropsTypes) => {
  const {
    currentLimit,
    currentPage,
    handleChangePage,
    handleChangeLimit,
    handleClearSearch,
    handleSearch,
  } = useChangeUrl();

  const {
    buttonTopContentLabel,
    columns,
    emptyContent,
    data,
    isLoading,
    onClickButtonTopContent,
    onDeleteSelected,
    renderCell,
    totalPages,
    showLimit = true,
    showSearch = true,
    withSelection = false,
  } = props;

  // state untuk baris yang dipilih
  const [selectedKeys, setSelectedKeys] = useState<"all" | Set<Key>>(new Set());

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col-reverse items-start justify-between gap-y-4 rounded-xl bg-white p-5 shadow-sm lg:flex-row lg:items-center">
        {showSearch && (
          <Input
            isClearable
            className="w-full sm:max-w-[24%]"
            placeholder="Search by name"
            startContent={<Search />}
            onClear={handleClearSearch}
            onChange={handleSearch}
          />
        )}
        <div className="flex items-center gap-2">
          {withSelection &&
            selectedKeys !== "all" &&
            (selectedKeys as Set<Key>).size > 0 && (
              <Button
                color="danger"
                variant="flat"
                startContent={<Trash2 size={16} />}
                onPress={() =>
                  onDeleteSelected?.(
                    Array.from(selectedKeys as Set<Key>) as string[],
                  )
                }
              >
                Delete ({(selectedKeys as Set<Key>).size})
              </Button>
            )}

          {withSelection && selectedKeys === "all" && (
            <Button
              color="danger"
              variant="flat"
              startContent={<Trash2 size={16} />}
              onPress={() =>
                onDeleteSelected?.(data.map((item) => item._id as string))
              }
            >
              Delete All
            </Button>
          )}

          {buttonTopContentLabel && (
            <Button color="primary" onPress={onClickButtonTopContent}>
              {buttonTopContentLabel}
            </Button>
          )}
        </div>
      </div>
    );
  }, [
    buttonTopContentLabel,
    handleSearch,
    handleClearSearch,
    onClickButtonTopContent,
    selectedKeys,
    onDeleteSelected,
    data,
  ]);

  const ButtomContent = useMemo(() => {
    return (
      <div className="flex items-center justify-center lg:justify-between">
        {showLimit && (
          <Select
            className="hidden max-w-36 lg:block"
            size="md"
            selectedKeys={[`${currentLimit}`]}
            selectionMode="single"
            onChange={handleChangeLimit}
            startContent={<p className="text-small">Show:</p>}
            disallowEmptySelection
          >
            {LIMIT_LIST.map((item) => (
              <SelectItem key={item.value}>{item.label}</SelectItem>
            ))}
          </Select>
        )}
        {totalPages > 1 && (
          <Pagination
            isCompact
            showControls
            color="primary"
            page={Number(currentPage)}
            total={totalPages}
            onChange={handleChangePage}
            loop
          />
        )}
      </div>
    );
  }, [
    currentLimit,
    currentPage,
    totalPages,
    handleChangeLimit,
    handleChangePage,
  ]);

  return (
    <Table
      selectionMode={withSelection ? "multiple" : "none"}
      selectedKeys={withSelection ? selectedKeys : undefined}
      onSelectionChange={withSelection ? setSelectedKeys : undefined}
      bottomContent={ButtomContent}
      bottomContentPlacement="outside"
      topContentPlacement="outside"
      topContent={topContent}
      classNames={{
        base: "max-full",
        wrapper: cn({ "overflow-x-hidden": isLoading }),
      }}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid as Key}>
            {column.name as string}
          </TableColumn>
        )}
      </TableHeader>

      <TableBody
        items={isLoading ? [] : data}
        emptyContent={emptyContent}
        isLoading={isLoading}
        loadingContent={
          <div className="flex items-center justify-center">
            <Spinner />
          </div>
        }
      >
        {(item) => (
          <TableRow key={item._id as Key}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default DataTable;
