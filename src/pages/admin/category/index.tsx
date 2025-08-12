import DashboardLayout from "@/components/layouts/DashboardLayout";
import Category from "@/components/views/Admin/Category";

const AdminCategoryPage = () => {
  return (
    <DashboardLayout
      title="Category"
      description="List of all, Categories, create new category, adn manageexisting categories"
      type="admin"
    >
      <Category />
    </DashboardLayout>
  );
};
export default AdminCategoryPage;
