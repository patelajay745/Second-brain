import { AllLinkIcon } from "@/icons/AllLinkIcon";
import { Logo } from "../../icons/Logo";
import { TwitterIcon } from "../../icons/TwitterIcon";
import { YoutubeIcon } from "../../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";
import { LogoutIcon } from "@/icons/LogOutIcon";

import Cookies from "js-cookie";
import { logoutUser } from "@/api/user";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  onFilterChange: (filter: string) => void;
}

export function Sidebar({ onFilterChange }: SidebarProps) {
  const navigate = useNavigate();
  const onclickTwitter = () => {
    onFilterChange("Tweet");
  };

  const onclickYoutube = () => {
    onFilterChange("Youtube");
  };

  const onclickAll = () => {
    onFilterChange("All");
  };

  const logout = async () => {
    try {
      const response = await logoutUser();

      if (response.status != 200) {
        throw new Error("User Logout: " + response.statusText);
      }

      navigate("/signin");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" fixed top-0 left-0 h-screen w-72 overflow-y-auto bg-white z-[1000] shadow-lg ">
      <div className="flex text-2xl pt-4 items-center pl-6">
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

      <div className="absolute bottom-0 w-full p-4">
        <SidebarItem onClick={logout} text="Logout" icon={<LogoutIcon />} />
      </div>
    </div>
  );
}
