"use client";

import React, { Fragment, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
  ButtonProps,
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { cn } from "@/utils/cn";
import { BUTTON_ITEMS, NAV_ITEMS } from "../LandingPageLayout.constants";
import SearchBar from "./InputSearch";
import useLandingPageLayoutNavbar from "./useLandingPageLayoutNavbar";

const LandingPageLayoutNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const session = useSession();
  const { dataProfile } = useLandingPageLayoutNavbar();
  const isLoadingSession = session.status === "loading";

  const isAuthenticated = session.status === "authenticated";

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
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      className="top-0 right-0 left-0 z-50 shadow-md backdrop-blur-md lg:h-20"
      maxWidth="full"
      shouldHideOnScroll={false} // Kalau ingin tetap muncul saat scroll
    >
      <div className="max-w-screen-3xl mx-auto flex w-full items-center justify-between px-0 sm:px-6 lg:px-10">
        {/* Left: Brand + Navigation */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <NavbarBrand className="gap-2">
            <Image
              width={50}
              height={50}
              src="/images/general/logogreen.jpg"
              alt="logo"
              className="cursor-pointer"
            />
          </NavbarBrand>

          {/* Desktop Nav */}
          <NavbarContent className="hidden gap-10 lg:flex">
            {NAV_ITEMS.map((item) => (
              <NavbarItem
                key={item.label}
                as={Link}
                href={item.href}
                className={cn(
                  "hover:text-primary text-sm text-black",
                  router.pathname === item.href && "text-primary-500",
                )}
              >
                {item.label}
              </NavbarItem>
            ))}
          </NavbarContent>
        </div>

        {/* Right: Search + Auth */}
        <NavbarContent justify="end" className="gap-6">
          {/* Search */}
          <NavbarItem>
            <SearchBar />
          </NavbarItem>

          {/* Authenticated / Guest */}
          {/* Authenticated / Guest */}
          {isLoadingSession ? (
            // bisa skeleton atau kosong dulu
            <NavbarItem className="hidden lg:flex">
              <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200" />
            </NavbarItem>
          ) : isAuthenticated ? (
            <NavbarItem className="hidden lg:flex">
              <Dropdown>
                <DropdownTrigger>
                  <Avatar
                    src={dataProfile?.profilePicture || undefined}
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
                  <DropdownItem key="profile" href="/member/profile">
                    Profile
                  </DropdownItem>
                  <DropdownItem key="signout" onPress={() => signOut()}>
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarItem>
          ) : (
            <div className="flex gap-4">
              {BUTTON_ITEMS.map((item) => (
                <NavbarItem key={item.label}>
                  <Button
                    color="primary"
                    variant={item.variant as ButtonProps["variant"]}
                  >
                    {item.label}
                  </Button>
                </NavbarItem>
              ))}
            </div>
          )}
        </NavbarContent>

        {/* Toggle always visible on mobile */}
        {/* <NavbarMenuToggle
          className="flex lg:hidden"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        /> */}
      </div>

      {/* Mobile Menu */}
      <NavbarMenu className="gap-4 bg-white/90 backdrop-blur-md">
        {/* Authenticated / Guest */}
        {isAuthenticated ? (
          <Fragment>
            <NavbarMenuItem
              className={cn({ hidden: dataProfile?.role !== "admin" })}
            >
              <Link
                href="/admin/dashboard"
                className="hover:text-primary text-lg font-medium text-black"
              >
                Admin
              </Link>
            </NavbarMenuItem>

            <NavbarMenuItem>
              <Link
                href="/member/profile"
                className="hover:text-primary text-lg font-medium text-black"
              >
                Profile
              </Link>
            </NavbarMenuItem>

            <NavbarMenuItem>
              <Button
                color="primary"
                onPress={() => signOut()}
                className="mt-2 w-full"
                variant="bordered"
                size="md"
              >
                Log Out
              </Button>
            </NavbarMenuItem>
          </Fragment>
        ) : (
          <Fragment>
            {BUTTON_ITEMS.map((item) => (
              <NavbarMenuItem key={`button-${item.label}`}>
                <Button
                  as={Link}
                  color="primary"
                  href={item.href}
                  fullWidth
                  variant={item.variant as ButtonProps["variant"]}
                  size="md"
                >
                  {item.label}
                </Button>
              </NavbarMenuItem>
            ))}
          </Fragment>
        )}
      </NavbarMenu>
    </Navbar>
  );
};

export default LandingPageLayoutNavbar;
