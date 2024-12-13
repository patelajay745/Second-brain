import { forwardRef, useState } from "react";
import { CrossIcon } from "../../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { ContentInputType } from "@/types/content";
import { createContent } from "@/api/content";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Toaster } from "./toaster";

interface props {
  open: boolean;
  onClose: () => void;
}

export const CreateContentModal = forwardRef<HTMLDivElement, props>(
  ({ open, onClose }: props, ref) => {
    const queryClient = useQueryClient();
    const { register, handleSubmit, setValue, reset } =
      useForm<ContentInputType>();
    const [currentTag, setCurrentTag] = useState("");
    const [tags, setTags] = useState<string[]>([]);

    const { mutate, isPending } = useMutation({
      mutationFn: createContent,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["contents"] });
        setTags([]);
        reset();
        onClose();
      },
      onError: (error) => {
        console.error("Error creating content:", error);
      },
    });

    const onSubmit: SubmitHandler<ContentInputType> = async (data) => {
      mutate(data);
    };

    setValue("tags", tags);

    const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && currentTag.trim()) {
        e.preventDefault();
        if (!tags.includes(currentTag.trim())) {
          const newTags = [...tags, currentTag.trim()];
          setTags(newTags);
          setValue("tags", newTags);
        }
        setCurrentTag("");
      }
    };

    const removeTag = (tagToRemove: string) => {
      const newTags = tags.filter((tag) => tag !== tagToRemove);
      setTags(newTags);
      setValue("tags", newTags);
    };

    return (
      <div>
        {open && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
              className="fixed inset-0 bg-black bg-opacity-60"
              onClick={onClose}
            />

            <div
              ref={ref}
              className="bg-white rounded-lg p-6  relative z-10 w-[480px]"
            >
              <div className="flex justify-end mb-4">
                <button
                  onClick={onClose}
                  className="hover:bg-gray-100 p-1 rounded-full transition-colors"
                >
                  <CrossIcon />
                </button>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-center mb-4">
                  Add New Memory
                </h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="space-y-3">
                    <Input
                      className="w-full"
                      type="text"
                      placeholder="Title"
                      {...register("title")}
                    />
                    <Input
                      className="w-full"
                      type="text"
                      placeholder="Link"
                      {...register("link")}
                    />

                    <select
                      {...register("type")}
                      name="type"
                      className="py-2 border  rounded-lg my-2 px-4 w-full"
                    >
                      <option value="">Please Select Type</option>
                      <option value="Youtube">Youtube</option>
                      <option value="Tweet">Tweet</option>
                    </select>

                    <div className="space-y-2">
                      <Input
                        className="w-full"
                        type="text"
                        placeholder="Add tags (press Enter)"
                        value={currentTag}
                        onChange={(e) => setCurrentTag(e.target.value)}
                        onKeyDown={handleTagInput}
                      />

                      <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-gray-200 px-2 py-1 rounded-md flex items-center gap-1 whitespace-nowrap"
                          >
                            {tag}
                            <button
                              type="button"
                              onClick={() => removeTag(tag)}
                              className="text-gray-500 hover:text-gray-700"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex w-full mt-6">
                    <Button
                      loading={isPending}
                      type="submit"
                      variant="primary"
                      text="Submit"
                      className="p-4 w-full text-black"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
);
