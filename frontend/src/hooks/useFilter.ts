import { useCallback, useState } from "react";

export const useFilter = () => {
  const [filter, setFilter] = useState("All");
  const handleFilterChange = useCallback((newFilter: string) => {
    setFilter(newFilter);
  }, []);

  return { filter, setFilter: handleFilterChange };
};
