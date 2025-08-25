import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailEvent from "@/components/views/Admin/DetailEvent";

const AdminDetailEventPage = () => {
  return (
    <DashboardLayout
      title="Detail Event"
      description="Manage the details of a specific event, including editing and viewing information."
      type="admin"
    >
      <DetailEvent />
    </DashboardLayout>
  );
};
export default AdminDetailEventPage;
