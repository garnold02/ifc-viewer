import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "../../constants";

const getOutlinerRoot = async () => {
  const response = await fetch(`${API_BASE_URL}/outliner/root`);
  const json = await response.json();
  return json as number;
};

export const useGetOutlinerRoot = () =>
  useQuery({
    queryKey: ["getOutlinerRoot"],
    queryFn: getOutlinerRoot,
  });
