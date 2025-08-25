import DashboardLayout from "@/components/layouts/DashboardLayout";
import Banner from "@/components/views/Admin/Banner";

const AdminBannerPage = () => {
  return (
    <DashboardLayout
      title="Banner"
      description="List of all, banners, create new banner, adn manageexisting banners"
      type="admin"
    >
      <Banner />
    </DashboardLayout>
  );
};
export default AdminBannerPage;
