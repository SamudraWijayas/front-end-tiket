import { IUser } from "@/types/User";
import DataTable from "@/components/ui/DataTable";
import { Chip, useDisclosure } from "@heroui/react";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import useMemberTab from "./useMemberTab";

import useChangeUrl from "@/hooks/useChangeUrls";
import DropdownAction from "@/components/commons/DropdownAction";
import { COLUMN_LIST_USER } from "../User.constants";
import AddUserModal from "../AddUserModal";
import DeleteUserModal from "../DeleteUserModal";
import UpdateUserModal from "../UpdateUserModal";

const MemberTab = () => {
  const { isReady, query } = useRouter();
  const {
    isRefetchingUsers,
    refetchUsers,
    dataUsers,
    isLoadingUsers,

    selectedId,
    setSelectedId,
  } = useMemberTab();

  const addUserModal = useDisclosure();
  const deleteUserModal = useDisclosure();
  const updateUserModal = useDisclosure();

  const { setUrl } = useChangeUrl();

  useEffect(() => {
    if (isReady) {
      setUrl();
    }
  }, [isReady]);

  const renderCell = useCallback(
    (user: Record<string, unknown>, columnKey: Key) => {
      const cellValue = user[columnKey as keyof typeof user];
      switch (columnKey) {
        case "isActive":
          return (
            <Chip
              color={cellValue === true ? "success" : "danger"}
              variant="flat"
              size="sm"
            >
              {cellValue === true ? "Active" : "Not Active"}
            </Chip>
          );
        case "actions":
          return (
            <DropdownAction
              onClickDetail={() => {
                setSelectedId(`${user._id}`);
                updateUserModal.onOpen();
              }}
              onClickDelete={() => {
                setSelectedId(`${user._id}`);
                deleteUserModal.onOpen();
              }}
              textButtonDetail="Detail Users"
              textButtonDelete="Delete Users"
            />
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [setSelectedId, updateUserModal, deleteUserModal],
  );

  return (
    <section>
      {Object.keys(query).length > 0 && (
        <DataTable
          buttonTopContentLabel="Create User"
          columns={COLUMN_LIST_USER}
          data={
            dataUsers?.data?.filter((user: IUser) => user.role === "member") ||
            []
          }
          emptyContent="Member is empty"
          isLoading={isLoadingUsers || isRefetchingUsers}
          onClickButtonTopContent={addUserModal.onOpen}
          renderCell={renderCell}
          totalPages={dataUsers?.pagination.totalPages || 0}
        />
      )}
      <AddUserModal refetchUser={refetchUsers} {...addUserModal} />
      <DeleteUserModal
        refetchUsers={refetchUsers}
        {...deleteUserModal}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
      <UpdateUserModal
        {...updateUserModal}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchUser={refetchUsers}
      />
    </section>
  );
};

export default MemberTab;
