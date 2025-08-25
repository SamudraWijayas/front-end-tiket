import { Tab, Tabs } from "@heroui/react";
import InfoTab from "./InfoTab";
import CoverTab from "./CoverTab";
import useDetailEvent from "./useDetailEvent";
import LocationTab from "./LocationTab";
import TicketTab from "./TicketTab";

const DetailEvent = () => {
  const {
    dataEvent,

    handleUpdateEvent,
    isPendingMutateUpdateEvent,
    isSuccessMutateUpdateEvent,
    handleUpdateInfo,
    handleUpdateLocation,
    dataDefaultRegion,
    isPendingDefaultRegion,
  } = useDetailEvent();
  return (
    <Tabs aria-label="Options" variant="underlined">
      <Tab key="cover" title="Cover">
        <CoverTab
          currentCover={dataEvent?.banner}
          onUpdate={handleUpdateEvent}
          isPendingUpdate={isPendingMutateUpdateEvent}
          isSuccessUpdate={isSuccessMutateUpdateEvent}
        />
      </Tab>
      <Tab key="info" title="Info Event">
        <InfoTab
          dataEvent={dataEvent}
          onUpdate={handleUpdateInfo}
          isPendingUpdate={isPendingMutateUpdateEvent}
          isSuccessUpdate={isSuccessMutateUpdateEvent}
        />
      </Tab>
      <Tab key="location" title="Location">
        <LocationTab
          dataEvent={dataEvent}
          dataDefaultRegion={dataDefaultRegion?.data?.data[0]?.name}
          isPendingDefaultRegion={isPendingDefaultRegion}
          onUpdate={handleUpdateLocation}
          isPendingUpdate={isPendingMutateUpdateEvent}
          isSuccessUpdate={isSuccessMutateUpdateEvent}
        />
      </Tab>
      <Tab key="ticket" title="Ticket">
        <TicketTab/>
      </Tab>
    </Tabs>
  );
};

export default DetailEvent;
