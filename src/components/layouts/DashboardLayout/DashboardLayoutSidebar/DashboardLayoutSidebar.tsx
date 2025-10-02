import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/utils/cn";
import { Avatar, Button, Skeleton } from "@heroui/react";
import { LogOut, ChevronRight } from "lucide-react";
import { IUser } from "@/types/User";

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
  dataProfile: IUser;
}

const DashboardLayoutSidebar = (props: PropTypes) => {
  const { sidebarItems, isOpen, collapsed, dataProfile } = props;

  const router = useRouter();
  const session = useSession();
  const isAuthenticated = session.status === "authenticated";
  const isLoadingSession = session.status === "loading";

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
    <aside
      className={cn(
        "fixed top-0 left-0 z-50 flex h-screen flex-col justify-between border-r border-gray-200 bg-white px-3 py-4 transition-all duration-300",
        collapsed ? "w-[80px]" : "w-[260px]",
        // mobile handling
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
      )}
    >
      {/* Top Brand */}
      <div>
        <div className="mb-6 flex items-center gap-2 px-2">
          <Image
            src="/images/general/logogreen.jpg"
            alt="logo"
            width={52}
            height={52}
            className="cursor-pointer"
            onClick={() => router.push("/")}
          />
          {!collapsed && (
            <span className="text-lg font-semibold text-gray-800">
              Tiketbdl
            </span>
          )}
        </div>

        {/* MAIN MENU */}
        {/* <p className="mb-2 px-2 text-xs font-semibold text-gray-400 uppercase">
          Main Menu
        </p> */}
        <nav
          className={cn("flex flex-col space-y-3", collapsed && "items-center")}
        >
          {sidebarItems.map((item) => {
            const isActive = router.pathname.startsWith(item.href);
            return (
              <Link
                key={item.key}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-[14px] font-medium transition-colors",
                  isActive
                    ? "bg-blue-200/50 text-blue-700 border border-blue-400/50"
                    : "text-gray-700 hover:bg-gray-50",
                )}
              >
                <span className="text-sm">{item.icon}</span>
                {!collapsed && item.label}
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

        {!collapsed && (
          <Button
            fullWidth
            className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 font-medium text-white shadow-md transition-all hover:bg-red-600 hover:shadow-lg"
            onPress={() => signOut()}
          >
            <LogOut size={20} />
            Logout
          </Button>
        )}

        {/* User card */}
        {!collapsed && (
          <>
            {isLoadingSession ? (
              // Skeleton saat loading
              <div className="flex w-full max-w-[300px] items-center gap-3">
                <div>
                  <Skeleton className="flex h-12 w-12 rounded-full" />
                </div>
                <div className="flex w-full flex-col gap-2">
                  <Skeleton className="h-3 w-3/5 rounded-lg" />
                  <Skeleton className="h-3 w-4/5 rounded-lg" />
                </div>
              </div>
            ) : (
              // Card user ketika sudah ada data
              isAuthenticated && (
                <div className="mt-3 flex items-center justify-between rounded-lg border border-gray-200 p-3">
                  <div className="flex items-center gap-2">
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
                    <div>
                      <p className="max-w-[150px] truncate text-sm font-medium text-gray-800">
                        {dataProfile?.fullName}
                      </p>
                      <p className="max-w-[150px] truncate text-xs text-gray-500">
                        {dataProfile?.email}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => signOut()}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              )
            )}
          </>
        )}
      </div>
    </aside>
  );
};

export default DashboardLayoutSidebar;
