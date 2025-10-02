import DashboardLayout from "@/components/layouts/DashboardLayout";
import Event from "@/components/views/Organizer/Event";

const AdminEventPage = () => {
  return (
    <DashboardLayout
      title="Event"
      description="List of all, Event, create new event, adn manageexisting event"
      type="organizer"
    >
      <Event />
    </DashboardLayout>
  );
};
export default AdminEventPage;
