import LandingPageLayout from "@/components/layouts/LandingPageLayout";

export default function SearchIndexPage() {
  return (
    <LandingPageLayout
      title="Search"
      navbarBgColor="bg-white"
      navbarColor="text-black"
      navbarPathColor="text-blue-600"
    >
      <div className="flex h-60 items-center justify-center">
        <h1 className="text-xl font-semibold text-gray-700">
          Silakan masukkan kata kunci pencarian
        </h1>
      </div>
    </LandingPageLayout>
  );
}
