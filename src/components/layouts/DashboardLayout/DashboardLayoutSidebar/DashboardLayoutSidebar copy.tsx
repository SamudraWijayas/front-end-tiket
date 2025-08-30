import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/utils/cn";
import { Button } from "@heroui/react";
import { LogOut, ChevronRight, ChevronLeft } from "lucide-react";

interface SidebarItem {
  key: string;
  label: string;
  href: string;
  icon: ReactNode;
}

interface PropTypes {
  sidebarItems: SidebarItem[];
  isOpen: boolean;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

const DashboardLayoutSidebar = ({
  sidebarItems,
  isOpen,
  collapsed,
  onToggleCollapse,
}: PropTypes) => {
  const router = useRouter();

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-50 flex h-screen flex-col justify-between border-r border-gray-200 bg-white px-3 py-4 transition-all duration-300",
        collapsed ? "w-[80px]" : "w-[260px]",
        // mobile handling
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
      )}
    >
      {/* Brand */}
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
          {!collapsed && (
            <span className="text-lg font-semibold text-gray-800">
              Tiketbdl
            </span>
          )}
        </div>

        {/* MENU */}
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
                )}
              >
                <span className="text-lg">{item.icon}</span>
                {!collapsed && item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom */}
      <div className="space-y-2">
        {/* Collapse button desktop */}
        <Button
          isIconOnly
          variant="light"
          className="mx-auto hidden lg:flex"
          onPress={onToggleCollapse}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>

        <Button
          fullWidth={!collapsed}
          className={cn(
            "flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 font-medium text-white shadow-md transition-all hover:bg-red-600 hover:shadow-lg",
            collapsed && "justify-center",
          )}
          onPress={() => signOut()}
        >
          <LogOut size={20} />
          {!collapsed && "Logout"}
        </Button>

        {!collapsed && (
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
        )}
      </div>
    </aside>
  );
};

export default DashboardLayoutSidebar;
