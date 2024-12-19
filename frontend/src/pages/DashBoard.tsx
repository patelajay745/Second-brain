import { useMemo, useRef, useState } from "react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { CreateContentModal } from "../components/ui/CreateContentModal";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { Sidebar } from "../components/ui/Sidebar";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteAContent, getAllContent } from "@/api/content";
import { useFilter } from "@/hooks/useFilter";
import { toast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { ShareContentModal } from "@/components/ui/ShareContentModal";

interface contentType {
  _id: string;
  link: string;
  type: "Youtube" | "Tweet";
  title: string;
  tags: string[];
}

function DashBoard() {
  const ref = useRef(null);
  const { filter, setFilter } = useFilter();
  const queryClient = useQueryClient();

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const OpenCreateModal = () => {
    setCreateModalOpen(true);
  };

  const OpenShareModal = () => {
    setShareModalOpen(true);
  };

  const { data: contents, isLoading } = useQuery({
    queryKey: ["contents"],
    queryFn: async () => {
      const response = await getAllContent();
      if (response.status != 200) {
        console.log(response);
        console.log(response.statusText);
      }
      return response.data.data;
    },
  });

  const filteredContents = useMemo(() => {
    if (!contents) return [];
    if (filter === "All") return contents;

    return contents.filter((content: contentType) => content.type === filter);
  }, [contents, filter]);

  const { mutate } = useMutation({
    mutationFn: deleteAContent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contents"] });
    },
  });

  const deleteContent = (id: string) => {
    mutate(id);
  };

  const shareContent = (link: string) => {
    navigator.clipboard.writeText(link);
    toast({
      variant: "success",
      title: "Link is copied to clipboard",
    });
  };

  return (
    <div className="flex">
      <Sidebar onFilterChange={setFilter} />
      <Toaster />

      <div className="p-8 bg-gray-100 ml-72 flex-1 min-h-screen">
        <CreateContentModal
          ref={ref}
          open={createModalOpen}
          onClose={() => {
            setCreateModalOpen(false);
          }}
        />

        <ShareContentModal
          onClose={() => setShareModalOpen(false)}
          open={shareModalOpen}
        />

        <div className="flex justify-end gap-4">
          <Button
            variant="secondary"
            text="Share brain"
            onclick={OpenShareModal}
            startIcon={<ShareIcon />}
          ></Button>

          <Button
            variant="primary"
            text="Add Content"
            onclick={OpenCreateModal}
            startIcon={<PlusIcon />}
          ></Button>
        </div>

        <div className="flex gap-4 mt-10 flex-wrap">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            filteredContents?.map((data: contentType) => (
              <Card
                key={data._id}
                title={data.title}
                link={data.link}
                type={data.type}
                tags={data.tags}
                onShare={() => shareContent(data.link)}
                onDelete={() => deleteContent(data._id)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
