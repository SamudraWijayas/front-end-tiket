import PageHead from "@/components/commons/PageHead";
import React, { Fragment, ReactNode } from "react";
import LandingPageLayoutNavbar from "./LandingPageLayoutNavbar";
import LandingPageFooter from "./LandingPageFooter";
import BottomNav from "./LandingPageLayoutNavbar/BottomNav";

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
  return (
    <Fragment>
      <PageHead title={title} />
      <LandingPageLayoutNavbar
        bgColor={navbarBgColor}
        color={navbarColor}
        pathColor={navbarPathColor}
      />
      <div>{children}</div>
      <BottomNav />
      <LandingPageFooter />
    </Fragment>
  );
};

export default LandingPageLayout;
