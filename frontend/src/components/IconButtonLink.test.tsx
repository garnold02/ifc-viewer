import { IconButtonLink } from "@components/IconButtonLink";
import { customRender } from "@utils/componentTesting";
import { expect, test } from "vitest";

test("IconButtonLink component should link to the given page", () => {
  const { getByRole } = customRender(
    <IconButtonLink to="/view/$fileId" params={{ fileId: "123" }} />
  );
  expect(getByRole("link")).toBeInTheDocument();
  expect(getByRole("link")).toHaveAttribute("href", "/view/123");
});
