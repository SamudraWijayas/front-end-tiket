import { ChevronLeft } from "lucide-react";

interface PropTypes {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const DashboardLayoutHeader = ({ collapsed, setCollapsed }: PropTypes) => {
  return (
    <header className="relative z-10 flex h-[60px] items-center justify-between bg-white px-4 shadow-md transition-colors dark:bg-slate-900">
      <div className="flex items-center gap-x-3">
        <button
          className="btn-ghost size-10"
          onClick={() => setCollapsed(!collapsed)}
        >
          <ChevronLeft className={collapsed ? "rotate-180" : ""} />
        </button>
      </div>
      <div className="flex items-center gap-x-3">
        <button className="size-10 overflow-hidden rounded-full">gambar</button>
      </div>
    </header>
  );
};

export default DashboardLayoutHeader;
