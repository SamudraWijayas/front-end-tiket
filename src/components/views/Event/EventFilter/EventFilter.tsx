import { Controller } from "react-hook-form";
import useEventFilter from "./useEventFilter";
import {
  Autocomplete,
  AutocompleteItem,
  Select,
  SelectItem,
  Skeleton,
} from "@heroui/react";
import useChangeUrl from "@/hooks/useChangeUrls";
import { Fragment, useEffect } from "react";
import { ICategory } from "@/types/Category";

const EventFilter = () => {
  const { control, setValue, dataCategory, isSuccessGetCategory } =
    useEventFilter();
  const {
    handleChangeCategory,
    handleChangeIsOnline,
    handleChangeIsFeatured,
    currentCategory,
    currentIsOnline,
    currentIsFeatured,
  } = useChangeUrl();

  useEffect(() => {
    if (currentCategory !== "") {
      setValue("category", `${currentCategory}`);
      setValue("isOnline", `${currentIsOnline}`);
      setValue("isFeatured", `${currentIsFeatured}`);
    }
  }, [isSuccessGetCategory]);

  return (
    <div className="flex w-full flex-wrap items-center justify-between gap-4 bg-white p-4 shadow-md sm:px-6 lg:px-15">
      {/* Search Bar (kiri) */}
      <div className="w-full sm:flex-1">
        {/* <Controller
          name="search"
          control={control}
          render={({ field: { onChange, ...field } }) => (
            <input
              {...field}
              onChange={(e) => onChange(e.target.value)}
              type="text"
              placeholder="Search..."
              className="focus:ring-primary w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:outline-none"
            />
          )}
        /> */}
      </div>

      {/* Filter (kanan) */}
      <div className="flex w-full flex-wrap items-center justify-end gap-4 sm:w-auto sm:flex-nowrap">
        {isSuccessGetCategory ? (
          <Fragment>
            {/* Category */}
            <Controller
              name="category"
              control={control}
              render={({ field: { onChange, ...field } }) => (
                <Autocomplete
                  {...field}
                  defaultSelectedKey={`${currentCategory}`}
                  defaultItems={dataCategory?.data.data || []}
                  placeholder="Category"
                  variant="bordered"
                  onSelectionChange={(value) => {
                    onChange(value);
                    handleChangeCategory(value !== null ? `${value}` : "");
                  }}
                  className="w-full sm:w-48"
                >
                  {(category: ICategory) => (
                    <AutocompleteItem key={category._id}>
                      {category.name}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
              )}
            />

            {/* Online / Offline */}
            <Controller
              name="isOnline"
              control={control}
              render={({ field: { onChange, ...field } }) => (
                <Select
                  {...field}
                  placeholder="Online / Offline"
                  variant="bordered"
                  defaultSelectedKeys={[`${currentIsOnline}`]}
                  onChange={(e) => handleChangeIsOnline(e.target.value)}
                  className="w-full sm:w-40"
                >
                  <SelectItem key="true">Online</SelectItem>
                  <SelectItem key="false">Offline</SelectItem>
                </Select>
              )}
            />

            {/* Featured */}
            <Controller
              name="isFeatured"
              control={control}
              render={({ field: { onChange, ...field } }) => (
                <Select
                  {...field}
                  placeholder="Featured"
                  variant="bordered"
                  defaultSelectedKeys={[`${currentIsFeatured}`]}
                  onChange={(e) => handleChangeIsFeatured(e.target.value)}
                  className="w-full sm:w-40"
                >
                  <SelectItem key="true">Yes</SelectItem>
                  <SelectItem key="false">No</SelectItem>
                </Select>
              )}
            />
          </Fragment>
        ) : (
          <div className="flex w-full flex-wrap gap-4 sm:w-auto">
            <Skeleton className="h-12 w-full rounded-lg sm:w-48" />
            <Skeleton className="h-12 w-full rounded-lg sm:w-40" />
            <Skeleton className="h-12 w-full rounded-lg sm:w-40" />
          </div>
        )}
      </div>
    </div>
  );
};

export default EventFilter;
