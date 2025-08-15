import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/utils/cn";
import { Button } from "@heroui/react";
import { LogOut, ChevronRight } from "lucide-react";

interface SidebarItem {
  key: string;
  label: string;
  href: string;
  icon: ReactNode;
}

interface PropTypes {
  sidebarItems: SidebarItem[];
  isOpen: boolean;
  isCollapsed: boolean;
}

const DashboardLayoutSidebar = ({
  sidebarItems,
  isOpen,
  isCollapsed,
}: PropTypes) => {
  const router = useRouter();

  return (
    <aside
      className={cn(
        "fixed z-50 flex h-screen w-full max-w-[260px] -translate-x-full flex-col justify-between border-r border-gray-200 bg-white px-3 py-4 transition-all duration-300 lg:relative lg:translate-x-0",
        { "translate-x-0": isOpen },
        { "translate-x-0": !isCollapsed },
        isCollapsed && "md:w-[70px] md:items-center",
      )}
    >
      {/* Top Brand */}
      <div>
        <div className="mb-6 flex items-center gap-2 px-2">
          <Image
            src="/images/general/logo.svg"
            alt="logo"
            width={32}
            height={32}
            className="cursor-pointer"
            onClick={() => router.push("/")}
          />
          {!isCollapsed && (
            <span className="text-lg font-semibold text-gray-800">Fokys</span>
          )}
        </div>

        {/* MAIN MENU */}
        {/* <p className="mb-2 px-2 text-xs font-semibold text-gray-400 uppercase">
          Main Menu
        </p> */}
        <nav className="space-y-1">
          {sidebarItems.map((item) => {
            const isActive = router.pathname.startsWith(item.href);
            return (
              <Link
                key={item.key}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-blue-100 text-gray-900"
                    : "text-gray-600 hover:bg-gray-50",
                  isCollapsed && "justify-center",
                )}
              >
                <span className="text-lg">{item.icon}</span>
                {!isCollapsed && (
                  <p className="whitespace-nowrap">{item.label}</p>
                )}
              </Link>
            );
          })}
        </nav>

        {/* <p className="mt-6 mb-2 px-2 text-xs font-semibold text-gray-400 uppercase">
        Others
      </p> */}
      </div>
      {/* Bottom Section */}
      <div className="space-y-2">
        {/* Extra links */}
        {/* <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-50">
          👥 Invite Teams
        </button>
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-50">
          ⚙️ Settings
        </button>
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-50">
          ❓ Help Center
        </button> */}
        <Button
          fullWidth
          className={cn(
            "sidebar-item bg-red-500",
            isCollapsed && "md:w-[45px]",
          )}
          onPress={() => signOut()}
        >
          <LogOut size={20} />
          {!isCollapsed && "Logout"}
        </Button>
        <button
          onClick={() => signOut()}
          className={cn("sidebar-item", isCollapsed && "md:w-[45px]")}
        >
          <LogOut size={22} className="flex-shrink-0" />
          {!isCollapsed && <p className="whitespace-nowrap">Logout</p>}
        </button>

        {/* User card */}
        <div className="mt-3 flex items-center justify-between rounded-lg border border-gray-200 p-3">
          <div className="flex items-center gap-2">
            <Image
              src="/images/general/logo.png"
              alt="User Avatar"
              width={32}
              height={32}
              className="rounded-full"
            />
            <div>
              <p className="text-sm font-medium text-gray-800">
                Bruce Willingham
              </p>
              <p className="text-xs text-gray-500">willingbruce@fokys.com</p>
            </div>
          </div>
          <button
            onClick={() => signOut()}
            className="text-gray-400 hover:text-red-500"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default DashboardLayoutSidebar;
