import { forwardRef } from "react";
import { CrossIcon } from "../../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const CreateContentModal = forwardRef<HTMLDivElement, Props>(
  ({ open, onClose }: Props, ref) => {
    return (
      <div>
        {open && (
          <div className="fixed inset-0 bg-black opacity-60 flex justify-center items-center">
            {/* Overlay with opacity */}
            <div className="absolute inset-0"></div>

            {/* Modal content, fully opaque */}
            <div className="z-10">
              <div
                ref={ref}
                className="bg-white p-4 rounded-lg max-w-md w-full"
              >
                <div className="flex justify-end mb-2">
                  <div className="cursor-pointer" onClick={onClose}>
                    <CrossIcon />
                  </div>
                </div>

                <div>
                  <div className="mb-4">
                    <Input type="text" placeholder="title" />
                    <Input type="text" placeholder="Link" />
                  </div>

                  <div className="flex justify-center">
                    <Button
                      variant="primary"
                      text="submit"
                      className="p-4 text-black"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
);
