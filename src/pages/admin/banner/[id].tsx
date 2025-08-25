import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailBanner from "@/components/views/Admin/DetailBanner";

const AdminDetailBannerPage = () => {
  return (
    <DashboardLayout
      title="Detail Banner"
      description="Manage the details of a specific banner, including editing and viewing information."
      type="admin"
    >
      <DetailBanner />
    </DashboardLayout>
  );
};
export default AdminDetailBannerPage;
