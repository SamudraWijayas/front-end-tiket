import PageHead from "@/components/commons/PageHead";
import React, { Fragment, ReactNode } from "react";
import LandingPageLayoutNavbar from "./LandingPageLayoutNavbar";
import LandingPageFooter from "./LandingPageFooter";
import BottomNav from "./LandingPageLayoutNavbar/BottomNav";
import Profile from "@/components/views/Profile";
import { useDisclosure } from "@heroui/react";
import Search from "@/components/views/Search";

interface PropTypes {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;

  children: ReactNode;
  navbarBgColor?: string;
  navbarColor?: string;
  navbarPathColor?: string;
}

const LandingPageLayout = (props: PropTypes) => {
  const {
    title,
    description,
    keywords,
    image,

    children,
    navbarBgColor,
    navbarColor,
    navbarPathColor,
  } = props;
  const Profiles = useDisclosure();
  const Searches = useDisclosure();
  return (
    <Fragment>
      <PageHead
        title={title}
        description={description}
        keywords={keywords}
        image={image}
      />
      <LandingPageLayoutNavbar
        bgColor={navbarBgColor}
        color={navbarColor}
        pathColor={navbarPathColor}
        onOpenProfile={Profiles.onOpen}
      />
      <div className="mt-20">{children}</div>
      <Profile {...Profiles} />
      <BottomNav
        onOpenProfile={Profiles.onOpen}
        onOpenSearch={Searches.onOpen}
      />
      {/* search */}
      {Searches.isOpen && <Search onClose={Searches.onClose} />}

      <LandingPageFooter />
    </Fragment>
  );
};

export default LandingPageLayout;
