// components/SimplePagination.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface SimplePaginationProps {
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  setPage: () => void;
}

export default function SimplePagination({
  currentPage,
  hasNextPage,
  hasPreviousPage,
  setPage,
}: SimplePaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string | number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value.toString());
      return params.toString();
    },
    [searchParams]
  );

  const handlePageChange = (page: number) => {
    router.push(`?${createQueryString("page", page)}`);
  };

  return (
    <div className="flex justify-between my-4">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={!hasPreviousPage}
        className="px-4 py-2 border rounded disabled:opacity-50 bg-gray-100 hover:bg-gray-200"
        aria-label="Previous page"
      >
        ← Previous
      </button>

      <span className="px-4 py-2">Page {currentPage}</span>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={!hasNextPage}
        className="px-4 py-2 border rounded disabled:opacity-50 bg-gray-100 hover:bg-gray-200"
        aria-label="Next page"
      >
        Next →
      </button>
    </div>
  );
}
