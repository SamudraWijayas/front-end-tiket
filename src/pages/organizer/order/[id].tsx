import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailOrder from "@/components/views/Organizer/DetailOrder";

const DetailTransactionAdminPage = () => {
  return (
    <DashboardLayout
      title="Detail Transaction"
      description="Information for spesific transaction"
      type="organizer"
    >
      <DetailOrder />
    </DashboardLayout>
  );
};

export default DetailTransactionAdminPage;
