import { LinkType } from "@/types/link";
import { ShareIcon } from "../../icons/ShareIcon";
import { DeleteIcon } from "@/icons/DeleteIcon";
import { YoutubeIcon } from "@/icons/YoutubeIcon";
import { TwitterIcon } from "@/icons/TwitterIcon";

interface cardProps {
  title: string;
  link: string;
  type: LinkType;
  onclick: () => void;
}

export const Card = ({ title, link, type, onclick }: cardProps) => {
  return (
    <div className="bg-white rounded-md text-black w-96 p-8 border-gray-200 border shadow-2xl self-start ">
      <div className="flex justify-between">
        <div className="flex items-center text-md font-semibold">
          <div className="text-gray-500 pr-2">
            {type === "Youtube" ? <YoutubeIcon /> : <TwitterIcon />}
          </div>
          {title}
        </div>
        <div className="flex">
          <div className="pr-4 text-gray-500">
            <ShareIcon />
          </div>
          <div className="pr-2 text-gray-500">
            <button onClick={onclick}>
              <DeleteIcon />
            </button>
          </div>
        </div>
      </div>
      <div className="pt-4">
        {type === "Youtube" ? (
          <iframe
            className="w-full aspect-video"
            src={link.replace("watch", "embed").replace("?v=", "/")}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        ) : (
          <blockquote className="twitter-tweet">
            <a href={link.replace("x.com", "twitter.com")}></a>
          </blockquote>
        )}
      </div>
    </div>
  );
};
