import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { cn } from "@/utils/cn";

interface SidebarItem {
  key: string;
  label: string;
  href: string;
  icon: ReactNode;
}

interface PropTypes {
  sidebarItems: SidebarItem[];
  isOpen: boolean;
}

const DashboardLayoutSidebar = ({ sidebarItems, isOpen }: PropTypes) => {
  const router = useRouter();

  return (
    <div
      className={cn(
        "border-gray-200/50 fixed z-50 flex h-screen w-full max-w-[300px] -translate-x-full flex-col justify-between border-r-1 bg-white px-4 py-6 transition-all lg:relative lg:translate-x-0",
        { "translate-x-0": isOpen },
      )}
    >
      <div>
        <div className="flex justify-center">
          <Image
            src="/images/general/logo.svg"
            alt="logo"
            width={180}
            height={60}
            className="mb-6 w-32 cursor-pointer"
            onClick={() => router.push("/")}
          />
        </div>

        {/* Tambah space antar list item */}
        <List className="!mt-4 !space-y-2">
          {sidebarItems.map((item) => {
            const isActive = router.pathname === item.href;
            return (
              <ListItemButton
                key={item.key}
                onClick={() => router.push(item.href)}
                selected={isActive}
                className={cn(
                  "!rounded-xl",
                  isActive && "!bg-red-500 !text-white hover:!bg-red-600",
                )}
              >
                <ListItemIcon
                  className={cn(isActive ? "!text-white" : "text-gray-600")}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            );
          })}
        </List>
      </div>

      <div className="flex items-center p-1">
        <button
          className="w-full rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          onClick={() => signOut()}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default DashboardLayoutSidebar;
