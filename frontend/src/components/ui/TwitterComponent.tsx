import { Tweet } from "react-tweet";

export const TwitterComponent = ({ link }: { link: string }) => {
  const tweetId = link.split("/").pop();

  if (!tweetId) return;

  return <Tweet id={tweetId} />;
};
