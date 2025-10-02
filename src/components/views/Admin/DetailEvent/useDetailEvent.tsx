import { ToasterContext } from "@/contexts/ToasterContext";
import eventServices from "@/services/event.service";
import { IEvent, IEventForm } from "@/types/Event";
import { toDateStandard } from "@/utils/date";
import { DateValue } from "@internationalized/date";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";

const useDetailEvent = () => {
  const { query, isReady } = useRouter();
  const { setToaster } = useContext(ToasterContext);

  const getEventById = async () => {
    const { data } = await eventServices.getEventById(`${query.id}`);
    return data.data;
  };

  const { data: dataEvent, refetch: refetchEvent } = useQuery({
    queryKey: ["Event"],
    queryFn: getEventById,
    enabled: isReady,
  });

  const updateEvent = async (payload: IEvent) => {
    const { data } = await eventServices.updateEvent(`${query.id}`, payload);
    return data.data;
  };

  const {
    mutate: mutateUpdateEvent,
    isPending: isPendingMutateUpdateEvent,
    isSuccess: isSuccessMutateUpdateEvent,
  } = useMutation({
    mutationFn: (payload: IEvent) => updateEvent(payload),
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: (result) => {
      refetchEvent();
      setToaster({
        type: "success",
        message: "Update event successfully",
      });
    },
  });

  const handleUpdateEvent = (data: IEvent) => mutateUpdateEvent(data);

  const handleUpdateInfo = (data: IEventForm) => {
    const payload = {
      ...data,
      startDate: toDateStandard(data.startDate as DateValue),
      endDate: toDateStandard(data.endDate as DateValue),
    };
    mutateUpdateEvent(payload);
  };

  const handleUpdateLocation = (data: IEventForm) => {
    const payload = {
      ...data,
      location: {
        address: `${data.address}`,
        region: `${data.region}`,
        coordinates: [Number(data.latitude), Number(data.longitude)],
      },
    };
    mutateUpdateEvent(payload);
  };

  const { data: dataDefaultRegion, isPending: isPendingDefaultRegion } =
    useQuery({
      queryKey: ["defaultRegion", dataEvent?.location?.region],
      queryFn: () =>
        eventServices.getRegencyById(dataEvent?.location?.region as string),
      enabled: !!dataEvent?.location?.region,
    });



  return {
    dataEvent,

    handleUpdateEvent,

    isPendingMutateUpdateEvent,
    isSuccessMutateUpdateEvent,

    handleUpdateLocation,
    handleUpdateInfo,

    dataDefaultRegion,
    isPendingDefaultRegion,
  };
};

export default useDetailEvent;
