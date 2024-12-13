import { CrossIcon } from "@/icons/CrossIcon";
import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "./Button";
import { Toaster } from "./toaster";
import { shareBrain } from "@/api/brain";
import { toast } from "@/hooks/use-toast";

interface ShareModalProps {
  open: boolean;
  onClose?: () => void;
}

export const ShareContentModal: React.FC<ShareModalProps> = ({
  open,
  onClose,
}) => {
  const [isClipBoardButtonEnable, setIsClipBoardButtonEnable] = useState(
    localStorage.getItem("brainShareStatus") === "true"
  );
  const [shareUrl, setShareUrl] = useState(
    localStorage.getItem("brainShareUrl") || ""
  );
  const [isShared, setIsShared] = useState(
    localStorage.getItem("brainShareStatus") === "true"
  );

  const onclickSwitch = async (checked: boolean) => {
    try {
      const response = await shareBrain({ share: `${checked}` });
      if (response.status != 200) {
        return;
      }

      const currentOrigin = window.location.origin;
      const newShareUrl = `${currentOrigin}/brain/${response.data.data}`;

      setShareUrl(newShareUrl);
      setIsShared(checked);
      setIsClipBoardButtonEnable(checked);

      localStorage.setItem("brainShareStatus", checked.toString());
      localStorage.setItem("brainShareUrl", newShareUrl);
    } catch (error) {
      console.log(error);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    toast({
      variant: "success",
      title: "Link is copied to clipboard",
    });
  };
  return (
    <div>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <Toaster />
          <div
            className="fixed inset-0 bg-black bg-opacity-60"
            onClick={onClose}
          />

          <div className="bg-white rounded-lg p-6 relative z-10 w-56">
            <div className=" flex justify-end mb-4">
              <button onClick={onClose}>
                <CrossIcon />
              </button>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-center mb-4">
                Share Your brain
              </h2>

              <div className="flex justify-between bg-gray-50 items-center p-3 rounded-lg mb-6">
                <span className="font-medium text-gray-700">Share</span>
                <Switch
                  checked={isShared}
                  onCheckedChange={onclickSwitch}
                  className="flex items-center bg-red-300 "
                />
              </div>

              <div className="space-y-3 ">
                <Button
                  onclick={copyToClipboard}
                  loading={!isClipBoardButtonEnable}
                  className="w-full"
                  variant="primary"
                  text="Copy to ClipBoard"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
