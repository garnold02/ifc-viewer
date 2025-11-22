import { IconButtonLink } from "@components/IconButtonLink";
import { renderWithRouter } from "@utils/componentTesting";
import { expect, test } from "vitest";

test("IconButtonLink component should link to the given page", () => {
  const { getByRole } = renderWithRouter(
    <IconButtonLink to="/view/$fileId" params={{ fileId: "123" }} />
  );
  expect(getByRole("link")).toBeInTheDocument();
  expect(getByRole("link")).toHaveAttribute("href", "/view/123");
});
