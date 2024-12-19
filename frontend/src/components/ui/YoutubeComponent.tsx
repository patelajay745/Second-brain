import { useState, useEffect } from "react";

export const YoutubeComponent = ({ videolink }: { videolink: string }) => {
  const [isVisible, setIsVisible] = useState(false);

  const videoId = videolink.split("v=").pop();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      });
    });
    const element = document.querySelector(".youtube-player");

    if (!element) return;

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="youtube-player">
      {isVisible && (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      )}
    </div>
  );
};
