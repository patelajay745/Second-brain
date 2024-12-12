import { AllLinkIcon } from "@/icons/AllLinkIcon";
import { Logo } from "../../icons/Logo";
import { TwitterIcon } from "../../icons/TwitterIcon";
import { YoutubeIcon } from "../../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";

interface SidebarProps {
  onFilterChange: (filter: string) => void;
}

export function Sidebar({ onFilterChange }: SidebarProps) {
  const onclickTwitter = () => {
    onFilterChange("Tweet");
  };

  const onclickYoutube = () => {
    onFilterChange("Youtube");
  };

  const onclickAll = () => {
    onFilterChange("All");
  };
  return (
    <div className="h-screen bg-white  border-r-2 w-72 position-fixed left-0 top-0 pl-6 ">
      <div className="flex text-2xl pt-4 items-center">
        <div className="pr-4 text-purple-600">
          <Logo />
        </div>
        Brainly
      </div>
      <div className="pt-4 pl-4">
        <SidebarItem onClick={onclickAll} text="All" icon={<AllLinkIcon />} />

        <SidebarItem
          onClick={onclickTwitter}
          text="Twitter"
          icon={<TwitterIcon />}
        />
        <SidebarItem
          onClick={onclickYoutube}
          text="Youtube"
          icon={<YoutubeIcon />}
        />
      </div>
    </div>
  );
}
