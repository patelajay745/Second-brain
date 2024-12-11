import { ContentInputType } from "@/types/content";
import { api } from ".";

export const createContent = (data: ContentInputType) => {
  return api.post("api/v1/content", data);
};

export const getAllContent = () => {
  return api.get("api/v1/content");
};
