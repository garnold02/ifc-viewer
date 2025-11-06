import { API_BASE_URL } from "@api/constants";
import type { FileSummary } from "@api/types/fileSummary";
import { useQuery } from "@tanstack/react-query";

export const useGetFileSummary = (fileId: number) =>
  useQuery({
    queryKey: ["api", "file", fileId, "summary"],
    queryFn: async () => {
      const response = await fetch(
        `${API_BASE_URL}/api/file/${fileId}/summary`
      );
      const json = await response.json();
      return json as FileSummary;
    },
  });
