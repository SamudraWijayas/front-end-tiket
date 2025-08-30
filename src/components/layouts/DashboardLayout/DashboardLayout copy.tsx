"use client";
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
import { AlignJustify, X } from "lucide-react";

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

  return (
    <>
      <PageHead title={title} />
      <div className="flex">
        {/* Sidebar */}
        <DashboardLayoutSidebar
          sidebarItems={type === "admin" ? SIDEBAR_ADMIN : SIDEBAR_ORGANIZER}
          isOpen={open}
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed(!collapsed)}
        />

        {/* Main Content */}
        <div
          className={`min-h-screen flex-1 overflow-y-auto transition-all duration-300 ${open ? "ml-0" : collapsed ? "lg:ml-[80px]" : "lg:ml-[260px]"}`}
        >
          <Navbar
            maxWidth="full"
            className="sticky top-0 z-40 bg-white px-4 shadow-sm"
          >
            <NavbarContent justify="start" className="gap-3">
              <NavbarBrand>
                <div className="flex flex-col leading-tight">
                  <p className="truncate text-lg font-semibold text-gray-800">
                    {title || "Dashboard Overview"}
                  </p>
                  <p className="truncate text-sm text-gray-500">
                    {description || "Welcome to your dashboard"}
                  </p>
                </div>
              </NavbarBrand>
            </NavbarContent>

            <NavbarContent justify="end" className="items-center gap-3">
              <Avatar
                src="/images/general/logo.png"
                alt="User Avatar"
                className="h-9 w-9 border border-gray-200 shadow-sm transition-transform hover:scale-105"
              />
              {/* Toggle button mobile */}
              <Button
                isIconOnly
                variant="light"
                radius="full"
                onPress={() => setOpen(!open)}
                aria-label={open ? "Close Menu" : "Open Menu"}
                className="hover:bg-gray-100 lg:hidden"
              >
                {open ? (
                  <X className="h-5 w-5 text-gray-700" />
                ) : (
                  <AlignJustify className="h-5 w-5 text-gray-700" />
                )}
              </Button>
            </NavbarContent>
          </Navbar>

          {/* Children */}
          <div className="p-4 sm:p-8">{children}</div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
