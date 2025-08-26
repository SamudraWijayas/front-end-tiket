"use client";

import Link from "next/link";
import { useRouter } from "next/router";
import { Home, FileText, Ticket, Search, User } from "lucide-react";
import { NAV_ITEMS } from "../LandingPageLayout.constants";
import { useSession } from "next-auth/react";

const BottomNav = () => {
  const router = useRouter();
  const session = useSession();

  const isAuthenticated = session.status === "authenticated";

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full bg-white/90 shadow-md backdrop-blur-md lg:hidden">
      <div className="flex items-center justify-around py-2">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = router.pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center text-xs ${
                isActive ? "font-semibold text-blue-600" : "text-gray-500"
              }`}
            >
              <Icon
                size={22}
                className={`${isActive ? "stroke-blue-600" : "stroke-gray-500"}`}
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
        {isAuthenticated ? (
          <Link
            href="/member/profile"
            className={`flex flex-col items-center text-xs ${
              router.pathname === "/member/profile"
                ? "font-semibold text-blue-600"
                : "text-gray-500"
            }`}
          >
            <User
              size={22}
              className={`${
                router.pathname === "/member/profile"
                  ? "stroke-blue-600"
                  : "stroke-gray-500"
              }`}
            />
            <span>Profile</span>
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default BottomNav;
