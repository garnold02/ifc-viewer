import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "../../constants";

const getGeometryList = async () => {
  const response = await fetch(`${API_BASE_URL}/geometry/list`);
  const json = await response.json();
  return json as number[];
};

export const useGetGeometryList = () =>
  useQuery({
    queryKey: ["getGeometryList"],
    queryFn: getGeometryList,
  });
