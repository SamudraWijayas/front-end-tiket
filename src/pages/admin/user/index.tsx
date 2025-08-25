import DashboardLayout from "@/components/layouts/DashboardLayout";
import User from "@/components/views/Admin/User";

const AdminCategoryPage = () => {
  return (
    <DashboardLayout
      title="Users"
      description="List of all, Users, create new category, adn manageexisting categories"
      type="admin"
    >
      <User />
    </DashboardLayout>
  );
};
export default AdminCategoryPage;
