import { ReactNode, useState } from "react";
import PageHead from "@/components/commons/PageHead";
import DashboardLayoutSidebar from "./DashboardLayoutSidebar";
import { SIDEBAR_ADMIN, SIDEBAR_ORGANIZER } from "./DashboardLayout.constant";

// MUI
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { AlignJustify } from "lucide-react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";

interface PropTypes {
  children: ReactNode;
  description?: string;
  title?: string;
  type: string;
}

const DashboardLayout = (props: PropTypes) => {
  const { children, description, title, type = "admin" } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <PageHead title={title} />
      <div className="max-w-screen-3xl 3xl:container flex">
        {/* Sidebar */}
        <DashboardLayoutSidebar
          sidebarItems={type === "admin" ? SIDEBAR_ADMIN : SIDEBAR_ORGANIZER}
          isOpen={open}
        />

        {/* Main Section */}
        <div className="h-screen w-full overflow-y-auto">
          {/* Navbar */}
          <nav>
            <AppBar
              position="static"
              color="default"
              elevation={1}
              sx={{ backgroundColor: "white" }}
            >
              <Toolbar className="flex justify-between">
                <Box className="flex items-center gap-3">
                  <Typography variant="h6" component="div">
                    {title || "Dashboard"}
                  </Typography>
                </Box>
                <div className="flex gap-3">
                  <Avatar alt="User Avatar" src="/images/general/avatar.png" />
                  <IconButton
                    edge="start"
                    color="inherit"
                    aria-label={open ? "Close Menu" : "Open Menu"}
                    onClick={() => setOpen(!open)}
                    sx={{ display: { lg: "none" } }}
                  >
                    <AlignJustify />
                  </IconButton>
                </div>
              </Toolbar>
            </AppBar>
          </nav>

          {/* Page Content */}
          <div className="p-8">{children}</div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
