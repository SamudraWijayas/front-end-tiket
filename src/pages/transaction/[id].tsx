import LandingPageLayout from "@/components/layouts/LandingPageLayout";
import DetailTransaction from "@/components/views/Member/DetailTransaction";

const TransactionPage = () => {
  return (
    <LandingPageLayout
      title="Detail Transaction"
      navbarBgColor="bg-white"
      navbarColor="text-black"
      navbarPathColor="text-blue-600"
    >
      <DetailTransaction />
    </LandingPageLayout>
  );
};
export default TransactionPage;
