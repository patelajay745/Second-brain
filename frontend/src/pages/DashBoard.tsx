import { useRef, useState } from "react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { CreateContentModal } from "../components/ui/CreateContentModal";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { useOnClickOutside } from "usehooks-ts";
import { Sidebar } from "../components/ui/Sidebar";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteAContent, getAllContent } from "@/api/content";

interface contentType {
  _id: string;
  link: string;
  type: "Youtube" | "Tweet";
  title: string;
  tags: string[];
}

function DashBoard() {
  const ref = useRef(null);
  const queryClient = useQueryClient();

  const [modalOpen, setModalOpen] = useState(false);

  const Openmodal = () => {
    setModalOpen(true);
  };

  const handleClickOutside = () => {
    setModalOpen(false);
  };

  useOnClickOutside(ref, handleClickOutside);

  const { data: contents, isLoading } = useQuery({
    queryKey: ["contents"],
    queryFn: async () => {
      const response = await getAllContent();
      return response.data.data;
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: deleteAContent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contents"] });
    },
  });

  const deleteContent = (id: string) => {
    mutate(id);
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="p-8 bg-gray-100 flex-1">
        <CreateContentModal
          ref={ref}
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
          }}
        />
        <div className="flex justify-end gap-4">
          <Button
            variant="secondary"
            text="Share brain"
            startIcon={<ShareIcon />}
          ></Button>

          <Button
            variant="primary"
            text="Add Content"
            onclick={Openmodal}
            startIcon={<PlusIcon />}
          ></Button>
        </div>

        <div className="flex gap-4 mt-10 flex-wrap">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            contents?.map((data: contentType) => (
              <Card
                key={data._id}
                title={data.title}
                link={data.link}
                type={data.type}
                tags={data.tags}
                onclick={() => deleteContent(data._id)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
