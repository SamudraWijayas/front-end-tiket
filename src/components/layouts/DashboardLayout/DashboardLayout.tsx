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
} from "@heroui/react";
import { AlignJustify } from "lucide-react";

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
  const [open, setOpen] = useState(false);

  return (
    <>
      <PageHead title={title} />
      <div className="max-w-screen-3xl 3xl:container flex">
        {/* Sidebar */}
        <DashboardLayoutSidebar
          sidebarItems={type === "admin" ? SIDEBAR_ADMIN : SIDEBAR_ORGANIZER}
          isOpen={open}
        />

        {/* Main Section */}

        <div className="h-screen w-full overflow-y-auto">
          <Navbar
            maxWidth="full"
            className="sticky top-0 z-40 bg-white px-4 shadow-sm"
          >
            {/* Left side */}
            <NavbarContent justify="start" className="gap-3">
              <NavbarBrand>
                <div className="flex flex-col leading-tight">
                  <p className="text-lg font-semibold text-gray-800">
                    {title || "Dashboard Overview"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {description || "Welcome to your dashboard"}
                  </p>
                </div>
              </NavbarBrand>
            </NavbarContent>

            {/* Right side */}
            <NavbarContent justify="end" className="items-center gap-3">
              {/* Avatar */}
              <Avatar
                src="/images/general/logo.png"
                alt="User Avatar"
                className="h-9 w-9 border border-gray-200 shadow-sm transition-transform hover:scale-105"
              />

              {/* toogle */}
              <Button
                isIconOnly
                variant="light"
                radius="full"
                onPress={() => setOpen(!open)}
                aria-label={open ? "Close Menu" : "Open Menu"}
                className="hover:bg-gray-100 lg:hidden"
              >
                <AlignJustify className="h-5 w-5 text-gray-700" />
              </Button>
            </NavbarContent>
          </Navbar>

          {/* Navbar */}

          {/* Page Content */}
          <div className="p-8">{children}</div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
