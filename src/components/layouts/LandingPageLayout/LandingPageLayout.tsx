import PageHead from "@/components/commons/PageHead";
import React, { Fragment, ReactNode } from "react";
import LandingPageLayoutNavbar from "./LandingPageLayoutNavbar";
import LandingPageFooter from "./LandingPageFooter";
import BottomNav from "./LandingPageLayoutNavbar/BottomNav";

interface PropTypes {
  title: string;
  children: ReactNode;
}

const LandingPageLayout = (props: PropTypes) => {
  const { title, children } = props;
  return (
    <Fragment>
      <PageHead title={title} />
      <LandingPageLayoutNavbar />
      <div>
        {children}
      </div>
      <BottomNav/>
      <LandingPageFooter />
    </Fragment>
  );
};

export default LandingPageLayout;
