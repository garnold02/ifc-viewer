import { Dialog, DialogContent, DialogTitle, Stack } from "@mui/material";
import { useIfcStore } from "../../../../stores/ifc/store";
import { useTranslation } from "react-i18next";
import { ElementReference } from "../ElementReference";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Fragment } from "react/jsx-runtime";

export const Details = () => {
  const { t } = useTranslation(undefined, {
    keyPrefix: "pages.view.components.Details",
  });

  const elementStack = useIfcStore((state) => state.details.elementStack);
  const clearElementStack = useIfcStore(
    (state) => state.details.clearElementStack
  );

  return (
    <Dialog open={elementStack.length > 0} onClose={clearElementStack}>
      <DialogTitle>{t("title")}</DialogTitle>
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
          {elementStack.length > 0
            ? // <Attributes
              //   key={elementStack[elementStack.length - 1]}
              //   id={elementStack[elementStack.length - 1]}
              //   defaultExpanded
              // />
              null
            : null}
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
