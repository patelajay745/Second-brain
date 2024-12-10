import { useRef, useState } from "react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { CreateContentModal } from "../components/ui/CreateContentModal";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { useOnClickOutside } from "usehooks-ts";
import { Sidebar } from "../components/ui/Sidebar";
import { useContent } from "@/hooks/useContents";

interface contentType {
  _id: string;
  link: string;
  type: "Youtube" | "Tweet";
  title: string;
}

function DashBoard() {
  const ref = useRef(null);
  const contents = useContent();
  const [modalOpen, setModalOpen] = useState(false);

  const Openmodal = () => {
    setModalOpen(true);
  };

  const handleClickOutside = () => {
    setModalOpen(false);
  };

  useOnClickOutside(ref, handleClickOutside);

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

        <div className="flex gap-4 mt-10">
          {contents.map((data: contentType) => (
            <Card title={data.title} link={data.link} type={data.type} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
