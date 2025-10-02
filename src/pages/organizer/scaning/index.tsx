import DashboardLayout from "@/components/layouts/DashboardLayout";
import ScanTicket from "@/components/views/Organizer/Ticket/ScanTiket/ScanTicket";

const ScanningPage = () => {
  return (
    <DashboardLayout
      title="Ticket Scanning"
      description="Scan tickets for your events in real-time"
      type="organizer"
    >
      <ScanTicket />
    </DashboardLayout>
  );
};

export default ScanningPage;
