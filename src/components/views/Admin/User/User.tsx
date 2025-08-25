import { Tab, Tabs } from "@heroui/react";
import AdminTab from "./AdminTab";
import MemberTab from "./MemberTab";
import OrganizerTab from "./OrganizerTab";

const User = () => {
  return (
    <Tabs aria-label="Options" variant="underlined">
      <Tab key="admin" title="Admin">
        <AdminTab />
      </Tab>
      <Tab key="member" title="Member">
        <MemberTab />
      </Tab>
      <Tab key="organizer" title="Organizer">
        <OrganizerTab />
      </Tab>
    </Tabs>
  );
};

export default User;
