import DashboardLayout from "@/components/layouts/DashboardLayout";
import Ticket from "@/components/views/Organizer/Ticket";

const TransactionAdminPage = () => {
  return (
    <DashboardLayout
      title="Ticket"
      description="List of all ticket"
      type="organizer"
    >
      <Ticket />
    </DashboardLayout>
  );
};

export default TransactionAdminPage;
