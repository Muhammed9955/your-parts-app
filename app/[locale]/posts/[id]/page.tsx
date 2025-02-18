// app/[lang]/posts/[id]/page.tsx
"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/components/ui/Button/Button";
import { useGetPost, useDeletePost } from "@/hooks/usePosts";
import { useTranslations } from "next-intl";

export default function ViewPostPage() {
  const params = useParams();
  const lang = params.locale as string;
  const router = useRouter();
  const postId = params.id as string;

  const t_home = useTranslations("home");
  const t_actions = useTranslations("actions");
  const t_form = useTranslations("form");

  const { data: post, isLoading, isError } = useGetPost(postId);
  const deletePostMutation = useDeletePost();

  const handleDelete = async () => {
    if (window.confirm(t_form("delete_message"))) {
      try {
        await deletePostMutation.mutateAsync(postId);
        router.push(`/${lang}/posts`);
      } catch (error) {
        console.error("Failed to delete post:", error);
      }
    }
  };

  if (isLoading) {
    return <div className="text-center py-10">{t_home("loading")} </div>;
  }

  if (isError || !post) {
    return (
      <div className="text-center py-10 text-red-500">{t_home("error")} </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{post.title}</h1>
          <div className="flex gap-2">
            <Link href={`/${lang}`}>
              <Button variant="secondary">{t_actions("back")}</Button>
            </Link>
            <Link href={`/${lang}/posts/${postId}/edit`}>
              <Button variant="primary"> {t_actions("edit")} </Button>
            </Link>
            <Button
              variant="danger"
              onClick={handleDelete}
              isLoading={deletePostMutation.isPending}
            >
              {t_actions("delete")}
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-gray-700 whitespace-pre-wrap">{post.body}</p>

          <div className="mt-6 text-gray-500 text-sm">
            <p>Created: {new Date(post.createdAt).toLocaleString()}</p>
            <p>Post ID: {post.$id}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
