// app/[lang]/posts/page.tsx
"use client";

import { useState } from "react";
// import Link from "next/link";
import { useAppwritePagination, useGetPosts } from "@/hooks/usePosts";
import Button from "@/components/ui/Button/Button";
import Pagination from "@/components/ui/Pagination/Pagination";
import SearchBar from "@/components/SearchBar";
import PostList from "@/components/posts/PostList";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

const ITEMS_PER_PAGE = 10;

export default function PostsPage() {
  const t = useTranslations("home");

  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError, error } = useAppwritePagination(
    currentPage,
    ITEMS_PER_PAGE
  );

  const totalPages = data ? Math.ceil(data.total / ITEMS_PER_PAGE) : 0;
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo(0, 0);
  };

  // const [page, setPage] = useState(1);
  // const limit = 10;

  // // Fetch posts with React Query
  // const { data, isLoading, isError } = useGetPosts(page, limit);
  console.log({ data });
  const posts = data?.documents || [];

  if (isLoading) {
    return <div className="text-center py-10"> {t("loading")}</div>;
  }

  if (isError) {
    return <div className="text-center py-10 text-red-500"> {t("error")} </div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{t("title")}</h1>
        {/* <Link href={`/${lang}/posts/create`}> */}
        <Link href={`/posts/create`}>
          <Button variant="primary"> {t("create")} </Button>
        </Link>
      </div>

      {/* <SearchBar /> */}
      <PostList posts={posts} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
