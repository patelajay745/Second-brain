import { ReactElement } from "react";

interface SidebarProp {
  text: string;
  icon: ReactElement;
  onClick?: () => void;
}

export const SidebarItem: React.FC<SidebarProp> = ({ text, icon, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex text-gray-700 py-2 cursor-pointer hover:bg-gray-200 rounded max-w-48 pl-4 transition-all duration-100"
    >
      <div className="pr-2">{icon}</div>
      <div> {text}</div>
    </div>
  );
};
