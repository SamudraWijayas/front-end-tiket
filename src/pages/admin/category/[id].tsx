import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailCategory from "@/components/views/Admin/DetailCategory";

const AdminDetailCategoryPage = () => {
  return (
    <DashboardLayout
      title="Detail Category"
      description="Manage the details of a specific category, including editing and viewing information."
      type="admin"
    >
      <DetailCategory />
    </DashboardLayout>
  );
};
export default AdminDetailCategoryPage;
