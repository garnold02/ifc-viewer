import { createContext, useContext } from "react";

export type IfcContextType = {
  ifcId: number | null;
};

export const IfcContext = createContext<IfcContextType>({ ifcId: null });

export const useIfcContext = () => useContext(IfcContext);
