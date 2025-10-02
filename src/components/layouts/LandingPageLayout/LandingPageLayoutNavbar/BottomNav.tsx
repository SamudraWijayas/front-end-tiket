"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {  FileText, Search, User } from "lucide-react";
import { NAV_ITEMS } from "../LandingPageLayout.constants";
import { useSession } from "next-auth/react";
import { Fragment } from "react";

interface PropTypes {
  onOpenProfile?: () => void;
  onOpenSearch?: () => void;
}

const BottomNav = (props: PropTypes) => {
  const { onOpenProfile, onOpenSearch } = props;
  const pathname = usePathname();
  const session = useSession();

  const isAuthenticated = session.status === "authenticated";

  return (
    <div className="fixed bottom-4 left-1/2 z-30 w-[92%] max-w-md -translate-x-1/2 rounded-2xl border border-gray-200 bg-white/90 shadow-xl backdrop-blur-md lg:hidden">
      <div className="flex items-center justify-around py-3">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center gap-1 transition-all duration-300 ${
                isActive ? "text-blue-600" : "text-gray-500 hover:text-blue-500"
              }`}
            >
              <Icon
                size={24}
                className={`transition-transform duration-300 ${
                  isActive ? "scale-110 stroke-blue-600" : "stroke-gray-500"
                }`}
              />
              <span
                className={`text-xs font-medium ${
                  isActive ? "text-blue-600" : "text-gray-500"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
        {/* Search button */}
        <div
          onClick={onOpenSearch}
          className="flex cursor-pointer flex-col items-center text-xs text-gray-500 hover:text-blue-500"
        >
          <Search size={22} />
          <span>Search</span>
        </div>
        {/* <Link
          href="/search"
          className={`flex flex-col items-center gap-1 transition-all duration-300 ${
            pathname === "/transaction"
              ? "text-blue-600"
              : "text-gray-500 hover:text-blue-500"
          }`}
        >
          <Search 
            size={24}
            className={`transition-transform duration-300 ${
              pathname === "/transaction"
                ? "scale-110 stroke-blue-600"
                : "stroke-gray-500"
            }`}
          />
          <span
            className={`text-xs font-medium ${
              pathname === "/transaction" ? "text-blue-600" : "text-gray-500"
            }`}
          >
            Search
          </span>
        </Link> */}
        {isAuthenticated ? (
          <Fragment>
            <Link
              href="/transaction"
              className={`flex flex-col items-center gap-1 transition-all duration-300 ${
                pathname === "/transaction"
                  ? "text-blue-600"
                  : "text-gray-500 hover:text-blue-500"
              }`}
            >
              <FileText
                size={24}
                className={`transition-transform duration-300 ${
                  pathname === "/transaction"
                    ? "scale-110 stroke-blue-600"
                    : "stroke-gray-500"
                }`}
              />
              <span
                className={`text-xs font-medium ${
                  pathname === "/transaction"
                    ? "text-blue-600"
                    : "text-gray-500"
                }`}
              >
                Transaction
              </span>
            </Link>

            <div
              onClick={onOpenProfile}
              className="flex cursor-pointer flex-col items-center bg-none text-xs"
            >
              <User size={22} />
              <span>Profile</span>
            </div>
          </Fragment>
        ) : null}
      </div>
    </div>
  );
};

export default BottomNav;
