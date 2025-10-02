import LandingPageLayout from "@/components/layouts/LandingPageLayout";
import QuerySearch from "@/components/views/Search/SearchQeury";

const TransactionPage = () => {
  return (
    <LandingPageLayout
      title="Acara | Payment"
      navbarBgColor="bg-white"
      navbarColor="text-black"
      navbarPathColor="text-blue-600"
    >
      <QuerySearch />
    </LandingPageLayout>
  );
};
export default TransactionPage;
