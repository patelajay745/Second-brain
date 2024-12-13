import { brainContent } from "@/api/brain";
import { Card } from "@/components/ui/Card";
import { Sidebar } from "@/components/ui/Sidebar";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import { useFilter } from "@/hooks/useFilter";
import { useQuery } from "@tanstack/react-query";
import React, { useMemo } from "react";
import { useParams } from "react-router-dom";

interface contentType {
  _id: string;
  link: string;
  type: "Youtube" | "Tweet";
  title: string;
  tags: string[];
}

export const SharedBrain: React.FC = () => {
  const { filter, setFilter } = useFilter();
  const { id } = useParams();

  console.log(id);

  const { data: contents, isLoading } = useQuery({
    queryKey: ["contents"],
    queryFn: async () => {
      if (!id) return;
      const response = await brainContent(id);
      return response.data.data.content || [];
    },
  });

  const filteredContents = useMemo(() => {
    if (!Array.isArray(contents)) return [];
    if (filter === "All") return contents;

    return contents.filter((content: contentType) => content.type === filter);
  }, [contents, filter]);

  const shareContent = (link: string) => {
    navigator.clipboard.writeText(link);
    toast({
      variant: "success",
      title: "Link is copied to clipboard",
    });
  };
  return (
    <div className="flex">
      <Sidebar logoutButton={false} onFilterChange={setFilter} />
      <Toaster />

      <div className="p-8 bg-gray-100 ml-72 flex-1 min-h-screen">
        <div className="flex gap-4 mt-10 flex-wrap">
          {isLoading ? (
            <div>Loading...</div>
          ) : filteredContents.length === 0 ? (
            <div className="w-full text-center text-gray-500 mt-10">
              No content found{filter !== "All" && ` for ${filter} filter`}
            </div>
          ) : (
            filteredContents?.map((data: contentType) => (
              <Card
                showDelete={false}
                key={data._id}
                title={data.title}
                link={data.link}
                type={data.type}
                tags={data.tags}
                onShare={() => shareContent(data.link)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};
