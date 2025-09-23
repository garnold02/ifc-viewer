import type { PropertySetPropertyValue } from "../../api/queries/psets/types";
import CropSquareIcon from "@mui/icons-material/CropSquare";
import NumbersIcon from "@mui/icons-material/Numbers";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import BuildIcon from "@mui/icons-material/Build";
import AlarmIcon from "@mui/icons-material/Alarm";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import ScaleIcon from "@mui/icons-material/Scale";

type Props = {
  valueType: PropertySetPropertyValue["type"];
};

export const InspectorPropertyValueIcon = ({ valueType }: Props) => {
  switch (valueType) {
    case "area":
      return <CropSquareIcon fontSize="small" />;

    case "bounded":
      return null;

    case "complex":
      return null;

    case "count":
      return <NumbersIcon fontSize="small" />;

    case "enumerated":
      return null;

    case "length":
      return <SquareFootIcon fontSize="small" />;

    case "list":
      return null;

    case "reference":
      return null;

    case "single":
      return <BuildIcon fontSize="small" />;

    case "table":
      return null;

    case "time":
      return <AlarmIcon fontSize="small" />;

    case "volume":
      return <ViewInArIcon fontSize="small" />;

    case "weight":
      return <ScaleIcon fontSize="small" />;

    default:
      return null;
  }
};
