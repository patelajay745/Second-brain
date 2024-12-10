import { forwardRef } from "react";
import { CrossIcon } from "../../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";

interface props {
  open: boolean;
  onClose: () => void;
}

export const CreateContentModal = forwardRef<HTMLDivElement, props>(
  ({ open, onClose }: props, ref) => {
    return (
      <div>
        {open && (
          <div className="w-screen h-screen bg-black fixed top-0 left-0 opacity-60 flex justify-center">
            <div className="flex flex-col justify-center">
              <span ref={ref} className="bg-white opacity-100 p-4 rounded-lg">
                <div className="flex justify-end ">
                  <div className="cursor-pointer" onClick={onClose}>
                    <CrossIcon />
                  </div>
                </div>

                <div>
                  <div className="">
                    <Input
                      type="text"
                      onChange={() => {}}
                      placeholder="title"
                    />
                    <Input type="text" onChange={() => {}} placeholder="Link" />
                  </div>

                  <div className="flex justify-center">
                    <Button
                      variant="primary"
                      text="submit"
                      className="p-4 text-black"
                    />
                  </div>
                </div>
              </span>
            </div>
          </div>
        )}
      </div>
    );
  }
);
