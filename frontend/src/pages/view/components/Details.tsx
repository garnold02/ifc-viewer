import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
} from "@mui/material";
import { ElementReference } from "@pages/view/components/ElementReference";
import { PropertyTree } from "@pages/view/components/property/PropertyTree";
import { useIfcStore } from "@stores/ifc/store";
import { Fragment } from "react/jsx-runtime";
import { useTranslation } from "react-i18next";

export const Details = () => {
  const { t } = useTranslation(undefined, {
    keyPrefix: "pages.view.components.Details",
  });

  const elementStack = useIfcStore((state) => state.details.elementStack);
  const clearElementStack = useIfcStore(
    (state) => state.details.clearElementStack
  );

  return (
    <Dialog
      open={elementStack.length > 0}
      onClose={clearElementStack}
      fullScreen
    >
      <DialogTitle>
        <Stack direction="row" alignItems="center">
          {t("title")}
          <Box flexGrow={1} />
          <IconButton onClick={clearElementStack}>
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent dividers>
        <Stack gap={1}>
          <Stack direction="row" alignItems="center" flexWrap="wrap" rowGap={1}>
            {elementStack.map((id, i) => (
              <Fragment key={`${id}-${i}`}>
                <ElementReference id={id} stackPosition={i} />
                {i < elementStack.length - 1 ? <ArrowRightIcon /> : null}
              </Fragment>
            ))}
          </Stack>
          {elementStack.length > 0 ? (
            <>
              <Divider />
              <PropertyTree
                elementId={elementStack[elementStack.length - 1]}
                onlyAttributes
              />
            </>
          ) : null}
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
