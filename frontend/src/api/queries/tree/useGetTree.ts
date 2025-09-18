import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "../../constants";
import type { TreeNode } from "./types";

const getTree = async () => {
  const response = await fetch(`${API_BASE_URL}/tree`);
  const json = await response.json();
  return json as TreeNode;
};

export const useGetTree = () =>
  useQuery({
    queryKey: ["getTree"],
    queryFn: getTree,
  });
