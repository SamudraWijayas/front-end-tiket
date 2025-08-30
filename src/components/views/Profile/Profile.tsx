import {

  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tab,
  Tabs,
} from "@heroui/react";
import useProfile from "./useProfile";
import PictureTab from "./PictureTab";
import InfoTab from "./InfoTab";
import SecurityTab from "./SecurityTab";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
}

const Profile = ({ isOpen, onClose, onOpenChange }: PropTypes) => {
  const {
    dataProfile,
    handleUpdateProfile,
    isPendingMutateUpdateProfile,
    isSuccessMutateUpdateProfile,
  } = useProfile();

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
      size="4xl"
      onClose={onClose}
    >
      <ModalContent className="m-4 rounded-2xl shadow-xl">
        <ModalHeader className="text-xl font-bold">
          Profile
        </ModalHeader>
        <ModalBody className="space-y-1">
          <Tabs aria-label="Options">
            <Tab key="Picture" title="Picture">
              <PictureTab
                currentPicture={dataProfile?.profilePicture}
                onUpdate={handleUpdateProfile}
                isPendingUpdate={isPendingMutateUpdateProfile}
                isSuccessUpdate={isSuccessMutateUpdateProfile}
              />
            </Tab>
            <Tab key="Info" title="Info">
              <InfoTab
                dataProfile={dataProfile}
                onUpdate={handleUpdateProfile}
                isPendingUpdate={isPendingMutateUpdateProfile}
                isSuccessUpdate={isSuccessMutateUpdateProfile}
              />
            </Tab>
            <Tab key="Security" title="Security">
              <SecurityTab />
            </Tab>
          </Tabs>
        </ModalBody>
        <ModalFooter className="gap-2">
          <Button color="default" variant="flat" onPress={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Profile;
