import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "../constants";
import { BinaryParser } from "../../utils/BinaryParser";

export const useGetIfcRootNode = (id: number | null) =>
  useQuery({
    enabled: id !== null,
    queryKey: ["ifc", "file", id, "root_node"],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/ifc/file/${id}/root_node`);
      const arrayBuffer = await response.arrayBuffer();
      const binaryParser = new BinaryParser(arrayBuffer);
      return binaryParser.getIfcNode();
    },
  });
