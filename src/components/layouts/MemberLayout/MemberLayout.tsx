import PageHead from "@/components/commons/PageHead";
import { ReactNode } from "react";

interface PropTypes {
  children: ReactNode;
  title?: string;
}

const MemberLayout = (props: PropTypes) => {
  const { children, title } = props;
  return (
    <div className="">
      <PageHead title={title} />
      {children}
    </div>
  );
};

export default MemberLayout;
