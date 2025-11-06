import { API_BASE_URL } from "@api/constants";
import { queryClient } from "@lib/reactQuery";
import { useMutation } from "@tanstack/react-query";

export const useDeleteFile = () =>
  useMutation({
    mutationFn: async (fileId: number) => {
      await fetch(`${API_BASE_URL}/api/file/${fileId}`, {
        method: "DELETE",
      });
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["api", "summaries"] }),
  });
