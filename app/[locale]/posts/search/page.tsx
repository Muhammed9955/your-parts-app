// app/[locale]/posts/search/page.tsx
import { useTranslations } from "next-intl";
import Pagination from "@/components/ui/Pagination/Pagination";
import PostList from "@/components/posts/PostList";
import { searchPosts } from "@/lib/services/posts";

interface SearchResultsPageProps {
  searchParams: {
    q?: string;
    page?: string;
  };
}

export default async function SearchResultsPage({
  searchParams,
}: SearchResultsPageProps) {
  const query = searchParams.q || "";
  const pageNumber = parseInt(searchParams.page || "1", 10);
  const pageSize = 10;

  const { posts, hasNextPage, hasPreviousPage, currentPage } =
    await searchPosts(query, pageNumber, pageSize);

  const t = useTranslations("search");

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">
        {t("results_for")} "{query}"
      </h1>

      {posts.length > 0 ? (
        <>
          <PostList posts={posts} />
          <Pagination
            currentPage={currentPage}
            hasNextPage={hasNextPage}
            hasPreviousPage={hasPreviousPage}
          />
        </>
      ) : (
        <p>{t("no_results")}</p>
      )}
    </div>
  );
}
