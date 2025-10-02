import DashboardLayout from "@/components/layouts/DashboardLayout";
import Order from "@/components/views/Organizer/Order";

const TransactionAdminPage = () => {
  return (
    <DashboardLayout
      title="Transaction"
      description="List of all transaction"
      type="organizer"
    >
      <Order />
    </DashboardLayout>
  );
};

export default TransactionAdminPage;
