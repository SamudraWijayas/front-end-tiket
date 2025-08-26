import PageHead from "@/components/commons/PageHead";
import React, { Fragment, ReactNode } from "react";
import LandingPageLayoutNavbar from "./LandingPageLayoutNavbar";
import LandingPageFooter from "./LandingPageFooter";

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
      <div className="py-10 md:p-6">
        {children}
      </div>
      <LandingPageFooter />
    </Fragment>
  );
};

export default LandingPageLayout;
