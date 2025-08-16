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
}

const DashboardLayoutSidebar = ({ sidebarItems, isOpen }: PropTypes) => {
  const router = useRouter();

  return (
    <aside
      className={cn(
        "fixed z-50 flex h-screen w-full max-w-[260px] -translate-x-full flex-col justify-between border-r border-gray-200 bg-white px-3 py-4 transition-transform duration-300 lg:relative lg:translate-x-0",
        { "translate-x-0": isOpen },
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
          <span className="text-lg font-semibold text-gray-800">Tiketbdl</span>
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
                )}
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
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
          className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 font-medium text-white shadow-md transition-all hover:bg-red-600 hover:shadow-lg"
          onPress={() => signOut()}
        >
          <LogOut size={20} />
          Logout
        </Button>

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
