import { Tab, Tabs } from "@heroui/react";
import InfoTab from "./InfoTab";
import ImageTab from "./ImageTab";
import useDetailBanner from "./useDetailBanner";

const DetailBanner = () => {
  const {
    dataBanner,

    handleUpdateBanner,
    isPendingMutateUpdateBanner,
    isSuccessMutateUpdateBanner,
  } = useDetailBanner();
  return (
    <Tabs aria-label="Options" variant="underlined">
      <Tab key="image" title="Image Banner">
        <ImageTab
          currentImage={dataBanner?.image}
          onUpdate={handleUpdateBanner}
          isPendingUpdate={isPendingMutateUpdateBanner}
          isSuccessUpdate={isSuccessMutateUpdateBanner}
        />
      </Tab>
      <Tab key="info" title="Info Banner">
        <InfoTab
          dataBanner={dataBanner}
          onUpdate={handleUpdateBanner}
          isPendingUpdate={isPendingMutateUpdateBanner}
          isSuccessUpdate={isSuccessMutateUpdateBanner}
        />
      </Tab>
    </Tabs>
  );
};

export default DetailBanner;
