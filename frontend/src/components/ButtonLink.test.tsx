import { ButtonLink } from "@components/ButtonLink";
import { renderWithRouter } from "@utils/componentTesting";
import { expect, test } from "vitest";

test("ButtonLink component should link to the given page", () => {
  const { getByRole } = renderWithRouter(
    <ButtonLink to="/view/$fileId" params={{ fileId: "123" }} />
  );
  expect(getByRole("link")).toBeInTheDocument();
  expect(getByRole("link")).toHaveAttribute("href", "/view/123");
});
