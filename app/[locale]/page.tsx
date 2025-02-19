// app/[lang]/posts/page.tsx
"use client";

// import { useState } from "react";
// import Link from "next/link";
// import { useAppwritePagination } from "@/hooks/usePosts";
import Button from "@/components/ui/Button/Button";
// import Pagination from "@/components/ui/Pagination/Pagination";
// import PostList from "@/components/posts/PostList";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
// import { Models } from "appwrite";

// const ITEMS_PER_PAGE = 10;

// interface AppwritePaginationResponse {
//   total: number;
//   documents: Models.Document[]; // Replace 'any' with your actual document type
//   isLoading: boolean;
//   isError: boolean;
// }

export default function PostsPage() {
  const t = useTranslations("home");

  // const [currentPage, setCurrentPage] = useState(1);

  // const {
  //   data: { total, documents },
  //   isLoading,
  //   isError,
  // } = useAppwritePagination<AppwritePaginationResponse>(
  //   currentPage,
  //   ITEMS_PER_PAGE
  // );
  // console.log({ data });
  // const totalPages = Math.ceil((total ?? 0) / ITEMS_PER_PAGE);
  // // console.log({ totalPages });
  // const handlePageChange = (newPage: number) => {
  //   setCurrentPage(newPage);
  //   window.scrollTo(0, 0);
  // };

  // const [page, setPage] = useState(1);
  // const limit = 10;

  // // Fetch posts with React Query
  // const { data, isLoading, isError } = useGetPosts(page, limit);
  // console.log({ data });
  // const posts = documents || [];

  // if (isLoading) {
  //   return <div className="text-center py-10"> {t("loading")}</div>;
  // }

  // if (isError) {
  //   return <div className="text-center py-10 text-red-500"> {t("error")} </div>;
  // }

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
      {/* <PostList posts={posts} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      /> */}
    </div>
  );
}
