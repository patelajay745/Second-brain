import { api } from "@/api";
import { useEffect, useState } from "react";

export const useContent = () => {
  const [contents, setContents] = useState([]);

  useEffect(() => {
    try {
        api.get("api/v1/content").then((response) => {
          console.log(response);
          setContents(response.data.data);
        });
    } catch (error) {
        console.error("Error fetching content:", error);
    }
  }, []);

  return contents;
};
