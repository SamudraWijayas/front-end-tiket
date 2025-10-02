"use client";

import React, { Fragment, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
import { Search, Menu, X } from "lucide-react";

import { cn } from "@/utils/cn";
import { BUTTON_ITEMS, NAV_ITEMS } from "../LandingPageLayout.constants";
import useLandingPageLayoutNavbar from "./useLandingPageLayoutNavbar";
import { IEvent } from "@/types/Event";
import {
  Button,
  ButtonProps,
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownItem,
  Input,
  Listbox,
  ListboxItem,
  Spinner,
} from "@heroui/react";

interface PropTypes {
  bgColor?: string;
  className?: string;
  color?: string;
  pathColor?: string;
  onOpenProfile?: () => void;
}

const LandingPageLayoutNavbar = (props: PropTypes) => {
  const { bgColor, className, color, pathColor, onOpenProfile } = props;
  const router = useRouter();
  const session = useSession();

  const {
    dataProfile,
    dataEventsSearch,
    isLoadingEventsSearch,
    isRefetchingEventsSearch,
    handleSearch,
    search,
    setSearch,
  } = useLandingPageLayoutNavbar();

  const isLoadingSession = session.status === "loading";
  const isAuthenticated = session.status === "authenticated";

  const initial = dataProfile?.fullName?.charAt(0).toUpperCase() || "U";

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
    <nav
      className={cn(
        `fixed top-0 right-0 left-0 z-50 bg-transparent shadow-md backdrop-blur-md ${bgColor}`,
        className,
      )}
    >
      <div className="max-w-screen-3xl mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-15">
        {/* Left: Logo + Nav */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <Image
              width={50}
              height={50}
              src="/images/general/logogreen.jpg"
              alt="logo"
              className="cursor-pointer"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden gap-8 lg:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  `text-md font-semibold transition-colors hover:text-blue-600 ${color}`,
                  router.pathname === item.href && `${pathColor}`,
                )}
              >
                {item.label}
              </Link>
            ))}
            {isAuthenticated && (
              <Link
                href="/transaction"
                className={cn(
                  `text-md font-semibold transition-colors hover:text-blue-600 ${color}`,
                  router.pathname === "/transaction" && `${pathColor}`,
                )}
              >
                Transaction
              </Link>
            )}
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          {/* Search (desktop) */}
          <div className="relative hidden lg:block">
            <Input
              isClearable
              className="w-[400px]"
              placeholder="Search Event"
              startContent={<Search />}
              onClear={() => setSearch("")}
              onChange={handleSearch}
            />
            {search !== "" && (
              <Listbox
                items={dataEventsSearch?.data || []}
                className="absolute top-12 right-0 w-[300px] rounded-xl border border-gray-200 bg-white"
              >
                {!isRefetchingEventsSearch && !isLoadingEventsSearch ? (
                  (item: IEvent) => (
                    <ListboxItem key={item._id} href={`/event/${item.slug}`}>
                      <div className="flex items-center gap-2">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_IMAGE}${item.banner}`}
                          alt={`${item.name}`}
                          className="w-2/5 rounded-md"
                          width={100}
                          height={40}
                        />
                        <p className="line-clamp-2 w-3/5">{item.name}</p>
                      </div>
                    </ListboxItem>
                  )
                ) : (
                  <ListboxItem key="loading">
                    <Spinner color="danger" size="sm" />
                  </ListboxItem>
                )}
              </Listbox>
            )}
          </div>

          {/* Authenticated / Guest */}
          {isLoadingSession ? (
            <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200" />
          ) : isAuthenticated ? (
            <Dropdown>
              <DropdownTrigger>
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
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  key="admin"
                  href="/admin/dashboard"
                  className={cn({ hidden: dataProfile?.role !== "admin" })}
                >
                  Admin
                </DropdownItem>
                <DropdownItem
                  key="organizer"
                  href="/organizer/dashboard"
                  className={cn({ hidden: dataProfile?.role !== "organizer" })}
                >
                  Organizer
                </DropdownItem>
                <DropdownItem key="profile" onPress={onOpenProfile}>
                  Profile
                </DropdownItem>
                <DropdownItem
                  key="signout"
                  onPress={() => signOut({ callbackUrl: "/" })}
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <div className="hidden gap-3 lg:flex">
              {BUTTON_ITEMS.map((item) => (
                <Button
                  key={`button-${item.label}`}
                  as={Link}
                  color="primary"
                  href={item.href}
                  variant={item.variant as ButtonProps["variant"]}
                >
                  {item.label}
                </Button>
              ))}
            </div>
          )}

          {/* Mobile Menu Toggle */}
        </div>
      </div>
    </nav>
  );
};

export default LandingPageLayoutNavbar;
