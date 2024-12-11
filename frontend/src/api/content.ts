import { ContentInputType } from "@/types/content";
import { api } from ".";

export const createContent = (data: ContentInputType) => {
  return api.post("api/v1/content", data);
};

export const getAllContent = () => {
  return api.get("api/v1/content");
};

export const deleteAContent = (id: string) => {
  return api.delete(`api/v1/content/${id}`);
};
