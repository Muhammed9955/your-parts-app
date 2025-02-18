// app/[lang]/posts/[id]/edit/page.tsx
"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/components/ui/Button/Button";
import { useGetPost, useUpdatePost } from "@/hooks/usePosts";
import PostForm from "@/components/posts/PostForm";
import { UpdatePostDto } from "@/types/post";
import { useTranslations } from "next-intl";

export default function EditPostPage() {
  const params = useParams();
  const router = useRouter();
  const postId = params.id as string;
  const lang = params.locale as string;

  const t_home = useTranslations("home");
  const t_edit_post = useTranslations("edit_post");
  const t_actions = useTranslations("actions");

  const { data: post, isLoading, isError } = useGetPost(postId);
  const updatePostMutation = useUpdatePost(postId);

  const handleSubmit = async (data: UpdatePostDto) => {
    try {
      await updatePostMutation.mutateAsync(data);
      router.push(`/${lang}/posts/${postId}`);
    } catch (error) {
      console.error("Failed to update post:", error);
    }
  };

  if (isLoading) {
    return <div className="text-center py-10"> {t_home("loading")} </div>;
  }

  if (isError || !post) {
    return (
      <div className="text-center py-10 text-red-500"> {t_home("error")} </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold"> {t_edit_post("title")} </h1>
          <div className="flex gap-2">
            <Link href={`/${lang}/`}>
              <Button variant="secondary"> {t_actions("back")} </Button>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <PostForm
            initialValues={post}
            onSubmit={handleSubmit}
            isSubmitting={updatePostMutation.isPending}
          />
        </div>
      </div>
    </div>
  );
}
