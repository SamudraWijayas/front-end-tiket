import LandingPageLayout from "@/components/layouts/LandingPageLayout";
import Payment from "@/components/views/Payment";

const PaymentPage = () => {
  return (
    <LandingPageLayout
      title="Acara | Payment"
      navbarBgColor="bg-white"
      navbarColor="text-black"
      navbarPathColor="text-blue-600"
    >
      <Payment />
    </LandingPageLayout>
  );
};

export default PaymentPage;
