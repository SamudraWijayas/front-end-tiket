import LandingPageLayout from "@/components/layouts/LandingPageLayout";
import Transaction from "@/components/views/Member/Transaction";

const TransactionPage = () => {
  return (
    <LandingPageLayout
      title="Acara | Payment"
      navbarBgColor="bg-white"
      navbarColor="text-black"
      navbarPathColor="text-blue-600"
    >
      <Transaction />
    </LandingPageLayout>
  );
};
export default TransactionPage;
