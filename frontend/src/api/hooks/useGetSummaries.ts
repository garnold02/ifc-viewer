import { API_BASE_URL } from "@api/constants";
import type { FileSummary } from "@api/types/fileSummary";
import { useQuery } from "@tanstack/react-query";

export const useGetSummaries = () =>
  useQuery({
    queryKey: ["api", "summaries"],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/api/summaries`);
      const content = await response.json();
      return content as FileSummary[];
    },
  });
