import {
  LayoutDashboard,
  Settings,
  Wallet,
  List,
  Tag,
  Bookmark,
  User,
  Ticket,
} from "lucide-react";
const SIDEBAR_ADMIN = [
  {
    key: "dashboard",
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    key: "user",
    label: "User",
    href: "/admin/user",
    icon: <User />,
  },
  {
    key: "event",
    label: "Event",
    href: "/admin/event",
    icon: <List />,
  },
  {
    key: "category",
    label: "Category",
    href: "/admin/category",
    icon: <Tag />,
  },
  {
    key: "banner",
    label: "Banner",
    href: "/admin/banner",
    icon: <Bookmark />,
  },
  {
    key: "transaction",
    label: "Transaction",
    href: "/admin/transaction",
    icon: <Wallet />,
  },
  {
    key: "setting",
    label: "Setting",
    href: "/member/setting",
    icon: <Settings />,
  },
];
const SIDEBAR_ORGANIZER = [
  {
    key: "dashboard",
    label: "Dashboard",
    href: "/organizer/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    key: "event",
    label: "Event",
    href: "/organizer/event",
    icon: <List />,
  },
  {
    key: "order",
    label: "Order",
    href: "/organizer/order",
    icon: <Wallet />,
  },
  {
    key: "tiket",
    label: "Tiket",
    href: "/organizer/tiket",
    icon: <Ticket />,
  },
  {
    key: "setting",
    label: "Setting",
    href: "/organizer/setting",
    icon: <Settings />,
  },
];

export { SIDEBAR_ADMIN, SIDEBAR_ORGANIZER };
