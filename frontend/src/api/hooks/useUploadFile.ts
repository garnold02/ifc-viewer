import { API_BASE_URL } from "@api/constants";
import type { UploadFileResult } from "@api/types/uploadFileResult";
import { queryClient } from "@lib/reactQuery";
import { useMutation } from "@tanstack/react-query";

export const useUploadFile = () =>
  useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`${API_BASE_URL}/api/file`, {
        method: "POST",
        body: formData,
      });

      const json = await response.json();
      return json as UploadFileResult;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["api", "summaries"] }),
  });
