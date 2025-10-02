import { ReactNode, useState } from "react";
import React from "react";
import PageHead from "@/components/commons/PageHead";
import DashboardLayoutSidebar from "./DashboardLayoutSidebar";
import { SIDEBAR_ADMIN, SIDEBAR_ORGANIZER } from "./DashboardLayout.constant";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  Avatar,
  Button,
  Skeleton,
} from "@heroui/react";
import { AlignJustify, X, ChevronLeft, ChevronRight } from "lucide-react"; // ✅ import X
import useDashboardLayout from "./useDashboardLayout";
import { useSession } from "next-auth/react";

interface PropTypes {
  children: ReactNode;
  description?: string;
  title?: string;
  type: string;
}

const DashboardLayout = ({
  children,
  description,
  title,
  type = "admin",
}: PropTypes) => {
  const [open, setOpen] = useState(false); // mobile
  const [collapsed, setCollapsed] = useState(false); // desktop
  const { dataProfile } = useDashboardLayout();
  const session = useSession();
  const isLoadingSession = session.status === "loading";
  const isAuthenticated = session.status === "authenticated";

  // Initials
  const initial = dataProfile?.fullName?.charAt(0).toUpperCase() || "U";

  // Flat avatar colors
  const flatColors = [
    { bg: "bg-pink-100", text: "text-pink-600", border: "border-pink-200" },
    { bg: "bg-blue-100", text: "text-blue-600", border: "border-blue-200" },
    { bg: "bg-green-100", text: "text-green-600", border: "border-green-200" },
    {
      bg: "bg-yellow-100",
      text: "text-yellow-600",
      border: "border-yellow-200",
    },
    {
      bg: "bg-purple-100",
      text: "text-purple-600",
      border: "border-purple-200",
    },
  ];

  const index = dataProfile?.fullName
    ? dataProfile.fullName.charCodeAt(0) % flatColors.length
    : 0;

  const { bg, text, border } = flatColors[index];

  return (
    <>
      <PageHead title={title} />
      <div className="max-w-screen-3xl 3xl:container flex bg-slate-100">
        {/* Sidebar */}
        <DashboardLayoutSidebar
          sidebarItems={type === "admin" ? SIDEBAR_ADMIN : SIDEBAR_ORGANIZER}
          isOpen={open}
          collapsed={collapsed}
          dataProfile={dataProfile}
        />

        {/* Main Section */}
        <div
          className={`min-h-screen flex-1 overflow-y-auto transition-all duration-300 ${open ? "ml-0" : collapsed ? "lg:ml-[80px]" : "lg:ml-[260px]"}`}
        >
          <Navbar
            maxWidth="full"
            className="sticky top-0 z-40 bg-white px-4 shadow-sm"
          >
            {/* Left side */}
            <NavbarContent justify="start" className="gap-3">
              <Button
                isIconOnly
                variant="light"
                className="mx-auto hidden bg-gray-200 lg:flex"
                onPress={() => setCollapsed(!collapsed)}
              >
                {collapsed ? <ChevronRight /> : <ChevronLeft />}
              </Button>
              <NavbarBrand>
                <div className="flex flex-col leading-tight">
                  <p className="max-w-[150px] truncate text-lg font-semibold text-gray-800 sm:max-w-[300px]">
                    {title || "Dashboard Overview"}
                  </p>
                  <p className="max-w-[200px] truncate text-sm text-gray-500 sm:max-w-[400px]">
                    {description || "Welcome to your dashboard"}
                  </p>
                </div>
              </NavbarBrand>
            </NavbarContent>

            {/* Right side */}
            <NavbarContent justify="end" className="items-center gap-3">
              {/* Avatar */}
              {isLoadingSession ? (
                <Skeleton className="flex h-12 w-12 rounded-full" />
              ) : (
                <Avatar
                  src={
                    dataProfile?.profilePicture
                      ? `${process.env.NEXT_PUBLIC_IMAGE}${dataProfile.profilePicture}`
                      : undefined
                  }
                  name={initial}
                  showFallback
                  className={`cursor-pointer ${bg} ${text} ${border} text-xl font-bold md:text-2xl`}
                />
              )}

              {/* Toggle button hanya di mobile */}
              <Button
                isIconOnly
                variant="light"
                radius="full"
                onPress={() => setOpen(!open)}
                aria-label={open ? "Close Menu" : "Open Menu"}
                className="hover:bg-gray-100 lg:hidden"
              >
                {open ? (
                  <X className="h-5 w-5 text-gray-700" /> // ✅ X saat open
                ) : (
                  <AlignJustify className="h-5 w-5 text-gray-700" /> // ✅ ☰ saat close
                )}
              </Button>
            </NavbarContent>
          </Navbar>

          {/* Page Content */}
          <div className="p-4 sm:p-8">{children}</div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
