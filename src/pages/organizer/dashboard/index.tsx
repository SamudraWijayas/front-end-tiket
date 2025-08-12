import DashboardLayout from "@/components/layouts/DashboardLayout";
import Dashboard from "@/components/views/Organizer/Dashboard";

const DashboardAdminrPage = () => {
  return (
    <DashboardLayout title="Dashboard" description="Dashboard Organizer" type="organizer">
      <Dashboard />
    </DashboardLayout>
  );
};
export default DashboardAdminrPage;
