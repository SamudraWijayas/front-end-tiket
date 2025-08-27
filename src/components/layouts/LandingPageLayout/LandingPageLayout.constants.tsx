import { Home, FileText, Ticket } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", href: "/", icon: Home },
  { label: "Transaction", href: "/transaction", icon: FileText },
  { label: "Event", href: "/event", icon: FileText },
  { label: "Tickets", href: "/tickets", icon: Ticket },
];

const BUTTON_ITEMS = [
  { label: "Login", href: "/auth/login", variant: "flat" },
  { label: "Register", href: "/auth/register", variant: "solid" },
];

export { NAV_ITEMS, BUTTON_ITEMS };
