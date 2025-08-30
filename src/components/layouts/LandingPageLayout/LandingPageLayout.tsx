import PageHead from "@/components/commons/PageHead";
import React, { Fragment, ReactNode } from "react";
import LandingPageLayoutNavbar from "./LandingPageLayoutNavbar";
import LandingPageFooter from "./LandingPageFooter";
import BottomNav from "./LandingPageLayoutNavbar/BottomNav";
import Profile from "@/components/views/Profile";
import { useDisclosure } from "@heroui/react";

interface PropTypes {
  title: string;
  children: ReactNode;
  navbarBgColor?: string;
  navbarColor?: string;
  navbarPathColor?: string;
}

const LandingPageLayout = (props: PropTypes) => {
  const { title, children, navbarBgColor, navbarColor, navbarPathColor } =
    props;
  const Profiles = useDisclosure();
  return (
    <Fragment>
      <PageHead title={title} />
      <LandingPageLayoutNavbar
        bgColor={navbarBgColor}
        color={navbarColor}
        pathColor={navbarPathColor}
        onOpenProfile={Profiles.onOpen}
      />
      <div>{children}</div>
      <Profile {...Profiles} />
      <BottomNav onOpenProfile={Profiles.onOpen} />
      <LandingPageFooter />
    </Fragment>
  );
};

export default LandingPageLayout;
