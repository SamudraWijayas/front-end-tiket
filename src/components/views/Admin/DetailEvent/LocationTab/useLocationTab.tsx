import { DELAY } from "@/constants/list.constants";
import useDebounce from "@/hooks/useDebounce";
import eventServices from "@/services/event.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdateLocation = yup.object().shape({
  isOnline: yup.string().required("Please select is online or offline"),
  latitude: yup.string().required("Please select is online or latitude"),
  longitude: yup.string().required("Please select is online or longitude"),
  region: yup.string().required("Please select region"),
  address: yup.string().required("Please input address"),
});
const useLocationTab = () => {
  const debounce = useDebounce();

  const {
    control: controlUpdateLocation,
    handleSubmit: handleSubmitUpdateLocation,
    formState: { errors: errorsUpdateLocation },
    reset: resetUpdateLocation,

    setValue: setValueUpdateLocation,
    getValues: getValuesUpdateLocation,
  } = useForm({
    resolver: yupResolver(schemaUpdateLocation),
  });

  const [searchRegency, setSearchRegency] = useState("");

  const { data: dataRegion } = useQuery({
    queryKey: ["Region", searchRegency],
    queryFn: () => eventServices.searchLocationByRegency(`${searchRegency}`),
    enabled: searchRegency !== "",
  });

  const handleSearchRegion = (region: string) => {
    debounce(() => setSearchRegency(region), DELAY);
  };

  // Function to manually reset form with current data
  const resetFormWithData = (dataEvent: { location?: { address?: string; region?: string; coordinates?: number[] }; isOnline?: boolean | string }) => {
    if (dataEvent) {
      setValueUpdateLocation("address", `${dataEvent?.location?.address}`);
      setValueUpdateLocation("isOnline", `${dataEvent?.isOnline}`);
      setValueUpdateLocation("region", `${dataEvent?.location?.region}`);
      setValueUpdateLocation(
        "latitude",
        `${dataEvent?.location?.coordinates?.[0]}`,
      );
      setValueUpdateLocation(
        "longitude",
        `${dataEvent?.location?.coordinates?.[1]}`,
      );
    }
  };

  return {
    controlUpdateLocation,
    handleSubmitUpdateLocation,
    errorsUpdateLocation,
    resetUpdateLocation,
    setValueUpdateLocation,
    getValuesUpdateLocation,

    dataRegion,
    handleSearchRegion,
    searchRegency,
    resetFormWithData,
  };
};
export default useLocationTab;
