import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { EllipsisVertical } from "lucide-react";

interface PropTypes {
  textButtonDetail: string;
  textButtonDelete: string;
  onClickDetail: () => void;
  onClickDelete: () => void;
}

const DropdownAction = (props: PropTypes) => {
  const { textButtonDetail, textButtonDelete, onClickDetail, onClickDelete } = props;
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly size="sm" variant="light">
          <EllipsisVertical className="text-default-700" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem key="detail-event-button" onPress={onClickDetail}>
          {textButtonDetail}
        </DropdownItem>
        <DropdownItem
          key="delete-event-button"
          className="text-red-500"
          onPress={onClickDelete}
        >
          {textButtonDelete}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
export default DropdownAction;
