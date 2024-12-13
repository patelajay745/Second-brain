import { LinkType } from "@/types/link";
import { ShareIcon } from "../../icons/ShareIcon";
import { DeleteIcon } from "@/icons/DeleteIcon";
import { YoutubeIcon } from "@/icons/YoutubeIcon";
import { TwitterIcon } from "@/icons/TwitterIcon";
import { TwitterComponent } from "./TwitterComponent";
import { YoutubeComponent } from "./YoutubeComponent";

interface cardProps {
  title: string;
  link: string;
  type: LinkType;
  tags: string[];
  onShare: () => void;
  onDelete?: () => void;
  showDelete?: boolean;
}

export const Card = ({
  title,
  link,
  type,
  onShare,
  tags,
  onDelete,
  showDelete = true,
}: cardProps) => {
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
          <div onClick={onShare} className="pr-4 text-gray-500">
            <ShareIcon />
          </div>
          {showDelete && (
            <div className="pr-2 text-gray-500">
              <button onClick={onDelete}>
                <DeleteIcon />
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="pt-4">
        {type === "Youtube" ? (
          <YoutubeComponent videolink={link} />
        ) : (
          <TwitterComponent link={link.replace("x.com", "twitter.com")} />
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="bg-purple-50 px-2 py-1 rounded-lg flex items-center gap-1 whitespace-nowrap text-purple-600"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};
