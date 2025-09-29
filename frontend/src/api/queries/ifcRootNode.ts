import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "../constants";
import { BinaryParser } from "../../utils/BinaryParser";

export const useGetIfcRootNode = (id: number | null) =>
  useQuery({
    enabled: id !== null,
    queryKey: ["ifc", id, "tree"],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/ifc/${id}/tree`);
      const arrayBuffer = await response.arrayBuffer();
      const binaryParser = new BinaryParser(arrayBuffer);
      return binaryParser.getIfcNode();
    },
  });
