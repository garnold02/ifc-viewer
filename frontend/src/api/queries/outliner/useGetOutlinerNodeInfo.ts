import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "../../constants";
import type { OutlinerNodeInfo } from "./types";

const getOutlinerNodeInfo = async (id: number) => {
  const response = await fetch(`${API_BASE_URL}/outliner/node/${id}/info`);
  const json = await response.json();
  return json as OutlinerNodeInfo;
};

export const useGetOutlinerNodeInfo = (id: number) =>
  useQuery({
    queryKey: ["getOutlinerNodeInfo", id],
    queryFn: () => getOutlinerNodeInfo(id),
  });
