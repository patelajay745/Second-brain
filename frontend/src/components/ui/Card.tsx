import { ShareIcon } from "../../icons/ShareIcon";

interface cardProps {
  title: string;
  link: string;
  type: "Youtube" | "Tweet";
}

export const Card = ({ title, link, type }: cardProps) => {
  return (
    <div className="bg-white rounded-md  text-black min-w-96 p-8 border-gray-200 border">
      <div className="flex justify-between ">
        <div className="flex items-center text-md ">
          <div className="text-gray-500 pr-2">
            <ShareIcon />
          </div>
          {title}
        </div>
        <div className="flex ">
          <div className="pr-2 text-gray-500">
            <ShareIcon />
          </div>
          <div className="pr-2 text-gray-500">
            <ShareIcon />
          </div>
        </div>
      </div>

      <div className="pt-4">
        {type === "Youtube" ? (
          <iframe
            className="w-full"
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
