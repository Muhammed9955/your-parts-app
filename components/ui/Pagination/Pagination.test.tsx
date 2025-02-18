// Pagination.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Pagination from "./Pagination";

// Mock the next-intl hook so that it returns a simple function that returns the key.
vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

describe("Pagination component", () => {
  it("renders correctly with current page and total pages", () => {
    render(
      <Pagination currentPage={2} totalPages={5} onPageChange={vi.fn()} />
    );

    // Check if the buttons are rendered using the mocked translation keys
    expect(screen.getByText("prev")).toBeInTheDocument();
    expect(screen.getByText("next")).toBeInTheDocument();
    // The text content is "page 2 - 5" (depending on spacing, you may adjust this test)
    expect(screen.getByText(/page/)).toHaveTextContent("page 2 - 5");
  });

  it("disables the 'prev' button on the first page", () => {
    const onPageChange = vi.fn();
    render(
      <Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />
    );
    const prevButton = screen.getByText("prev");
    expect(prevButton).toBeDisabled();

    // Even if clicked, onPageChange should not be called
    fireEvent.click(prevButton);
    expect(onPageChange).not.toHaveBeenCalled();
  });

  it("disables the 'next' button on the last page", () => {
    const onPageChange = vi.fn();
    render(
      <Pagination currentPage={5} totalPages={5} onPageChange={onPageChange} />
    );
    const nextButton = screen.getByText("next");
    expect(nextButton).toBeDisabled();

    // Even if clicked, onPageChange should not be called
    fireEvent.click(nextButton);
    expect(onPageChange).not.toHaveBeenCalled();
  });

  it("calls onPageChange with the previous page when 'prev' is clicked", () => {
    const onPageChange = vi.fn();
    render(
      <Pagination currentPage={3} totalPages={5} onPageChange={onPageChange} />
    );
    const prevButton = screen.getByText("prev");

    fireEvent.click(prevButton);
    expect(onPageChange).toHaveBeenCalledWith(2); // currentPage - 1
  });

  it("calls onPageChange with the next page when 'next' is clicked", () => {
    const onPageChange = vi.fn();
    render(
      <Pagination currentPage={3} totalPages={5} onPageChange={onPageChange} />
    );
    const nextButton = screen.getByText("next");

    fireEvent.click(nextButton);
    expect(onPageChange).toHaveBeenCalledWith(4); // currentPage + 1
  });
});
