import DashboardLayout from "@/components/layouts/DashboardLayout";
import Transaction from "@/components/views/Admin/Transaction";

const TransactionAdminPage = () => {
  return (
    <DashboardLayout
      title="Transaction"
      description="List of all transaction"
      type="admin"
    >
      <Transaction />
    </DashboardLayout>
  );
};

export default TransactionAdminPage;
