import DashboardLayout from "@/components/layouts/DashboardLayout";
import Member from "@/components/views/Member";

const MemberPage = () => {
  return (
    <DashboardLayout title="Tiket | Member" type="member">
      <Member />
    </DashboardLayout>
  );
};
export default MemberPage;
