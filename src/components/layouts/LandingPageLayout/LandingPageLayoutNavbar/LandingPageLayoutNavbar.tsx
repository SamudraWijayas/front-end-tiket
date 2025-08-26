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
      className="max-w-screen-3xl 3xl:container"
      maxWidth="full"
      shouldHideOnScroll
    >
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
        <NavbarContent className="hidden gap-6 lg:flex">
          {NAV_ITEMS.map((item) => (
            <NavbarItem
              key={item.label}
              as={Link}
              href={item.href}
              className={cn(
                "text-default-700 hover:text-primary font-medium",
                router.pathname === item.href && "text-primary-500 font-bold",
              )}
            >
              {item.label}
            </NavbarItem>
          ))}
        </NavbarContent>
      </div>

      {/* Right: Search + Auth */}
      <NavbarContent justify="end" className="hidden gap-6 lg:flex">
        {/* Search */}
        <NavbarItem>
          <SearchBar />
        </NavbarItem>

        {/* Authenticated / Guest */}
        {isAuthenticated ? (
          <NavbarItem>
            <Dropdown>
              <DropdownTrigger>
                <Avatar
                  src={dataProfile?.profilePicture || undefined}
                  name={initial}
                  showFallback
                  className={`cursor-pointer ${bg} ${text} ${border} font-semibold`}
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
      <NavbarMenuToggle
        className="flex lg:hidden"
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
      />

      {/* Mobile Menu */}
      <NavbarMenu className="gap-4 bg-white/90 backdrop-blur-md">
        {/* Nav Items */}
        {NAV_ITEMS.map((item) => (
          <NavbarMenuItem
            key={`nav-${item.label}`}
            className={cn(
              "text-default-700 hover:text-primary font-medium",
              router.pathname === item.href && "text-primary font-bold",
            )}
          >
            <Link
              href={item.href}
              size="lg"
              className={cn(
                "text-default-700 hover:text-primary font-medium",
                router.pathname === item.href && "text-primary-500 font-bold",
              )}
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}

        {/* Authenticated / Guest */}
        {isAuthenticated ? (
          <Fragment>
            <NavbarMenuItem
              className={cn({ hidden: dataProfile?.role !== "admin" })}
            >
              <Link
                href="/admin/dashboard"
                className="text-default-700 text-lg hover:text-primary font-medium"
              >
                Admin
              </Link>
            </NavbarMenuItem>

            <NavbarMenuItem>
              <Link
                href="/member/profile"
                className="text-default-700 text-lg hover:text-primary font-medium"
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
