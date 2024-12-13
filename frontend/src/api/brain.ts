import { ShareBrainInputType } from "@/types/brain";
import { api } from ".";

export const shareBrain = (data: ShareBrainInputType) => {
  return api.post("/api/v1/brain/share", data);
};

export const brainContent = (id: string) => {
  return api.get(`api/v1/brain/${id}`);
};
