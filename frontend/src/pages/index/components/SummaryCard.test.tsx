import "@lib/i18next";

import { SummaryCard } from "@pages/index/components/SummaryCard";
import { act } from "@testing-library/react";
import { renderWithRouter } from "@utils/componentTesting";
import i18next from "i18next";
import { expect, test } from "vitest";

test("SummaryCard open button should have correct href", () => {
  i18next.changeLanguage("en_US");

  const { getByText } = renderWithRouter(
    <SummaryCard
      summary={{
        id: 123,
        name: "foo.ifc",
        schema: "IFC4",
      }}
      onPreviewClick={() => {}}
      onDeleteClick={() => {}}
    />
  );

  const openButton = getByText("Open");
  expect(openButton).toBeInTheDocument();
  expect(openButton).toHaveAttribute("href", "/view/123");
});

test("SummaryCard preview button should work", () => {
  i18next.changeLanguage("en_US");

  let previewClicked = false;

  const { getByText } = renderWithRouter(
    <SummaryCard
      summary={{
        id: 123,
        name: "foo.ifc",
        schema: "IFC4",
      }}
      onPreviewClick={() => (previewClicked = true)}
      onDeleteClick={() => {}}
    />
  );

  expect(previewClicked).toBe(false);

  const previewButton = getByText("Preview");
  expect(previewButton).toBeInTheDocument();

  act(() => {
    previewButton.click();
  });

  expect(previewClicked).toBe(true);
});

test("SummaryCard delete button should work", () => {
  i18next.changeLanguage("en_US");

  let deleteClicked = false;

  const { getByLabelText } = renderWithRouter(
    <SummaryCard
      summary={{
        id: 123,
        name: "foo.ifc",
        schema: "IFC4",
      }}
      onPreviewClick={() => {}}
      onDeleteClick={() => (deleteClicked = true)}
    />
  );

  expect(deleteClicked).toBe(false);

  const deleteButton = getByLabelText("Delete");
  expect(deleteButton).toBeInTheDocument();

  act(() => {
    deleteButton.click();
  });

  expect(deleteClicked).toBe(true);
});
