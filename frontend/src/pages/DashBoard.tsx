import { useRef, useState } from "react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { CreateContentModal } from "../components/ui/CreateContentModal";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { useOnClickOutside } from "usehooks-ts";
import { Sidebar } from "../components/ui/Sidebar";

function DashBoard() {
  const ref = useRef(null);
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
        <div className="flex justify-end gap-2">
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

        <div className="flex gap-4">
          <Card
            title="This is sample post "
            link="https://www.youtube.com/watch?v=gUdZyHiKfvU"
            type="Youtube"
          />

          <Card
            title="This is sample post "
            link="https://www.youtube.com/watch?v=gUdZyHiKfvU"
            type="Youtube"
          />

          <Card
            title="This is sample post "
            link="https://twitter.com/ajaypatel745/status/1865510353112596833"
            type="Tweet"
          />
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
