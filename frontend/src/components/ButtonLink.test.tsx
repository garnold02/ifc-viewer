import { ButtonLink } from "@components/ButtonLink";
import { customRender } from "@utils/componentTesting";
import { expect, test } from "vitest";

test("ButtonLink component should link to the given page", () => {
  const { getByRole } = customRender(
    <ButtonLink to="/view/$fileId" params={{ fileId: "123" }} />
  );
  expect(getByRole("link")).toBeInTheDocument();
  expect(getByRole("link")).toHaveAttribute("href", "/view/123");
});
