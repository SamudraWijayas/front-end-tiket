import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { Button } from "@heroui/react";
import Link from "next/link";
import { cn } from "@/utils/cn";
import { LogOut } from "lucide-react";

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
        "fixed z-50 flex h-screen w-full max-w-[280px] -translate-x-full flex-col justify-between border-r border-gray-200/50 bg-white px-4 py-6 shadow-lg transition-transform duration-300 lg:relative lg:translate-x-0",
        { "translate-x-0": isOpen }
      )}
    >
      {/* Logo */}
      <div>
        <div className="flex justify-center">
          <Image
            src="/images/general/logo.svg"
            alt="logo"
            width={180}
            height={60}
            className="mb-8 w-32 cursor-pointer transition-transform hover:scale-105"
            onClick={() => router.push("/")}
          />
        </div>

        {/* Sidebar Menu */}
        <nav className="space-y-2">
          {sidebarItems.map((item) => {
            const isActive = router.pathname.startsWith(item.href);
            return (
              <Link
                key={item.key}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium transition-all duration-200 hover:bg-blue-50 hover:text-blue-600",
                  isActive &&
                    "bg-blue-500 text-white shadow-md hover:bg-blue-600 hover:text-white"
                )}
              >
                <span
                  className={cn(
                    "text-xl transition-colors",
                    isActive ? "text-white" : "text-gray-500"
                  )}
                >
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout Button */}
      <div className="mt-4">
        <Button
          fullWidth
          className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 font-medium text-white shadow-md transition-all hover:bg-red-600 hover:shadow-lg"
          onPress={() => signOut()}
        >
          <LogOut size={20} />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default DashboardLayoutSidebar;
