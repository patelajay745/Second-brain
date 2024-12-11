import { forwardRef, useState } from "react";
import { CrossIcon } from "../../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { ContentInputType } from "@/types/content";
import { api } from "@/api";
import { createContent } from "@/api/content";
import { error } from "console";

interface props {
  open: boolean;
  onClose: () => void;
}

export const CreateContentModal = forwardRef<HTMLDivElement, props>(
  ({ open, onClose }: props, ref) => {
    const { register, handleSubmit, setValue, reset } =
      useForm<ContentInputType>();
    const [currentTag, setCurrentTag] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const onSubmit: SubmitHandler<ContentInputType> = async (data) => {
      console.log(data);
      setLoading(true);
      try {
        const response = await createContent(data);
        console.log(response);

        if (response.status != 201) {
          throw new Error("User registration failed: " + response.statusText);
        }

         onClose();
      } catch (error) {
        console.log(error);
      }

      setTags([]);
      reset();
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
                      loading={loading}
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
