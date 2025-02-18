// app/[lang]/posts/create/page.tsx
"use client";

import { useRouter, useParams } from "next/navigation";
import PostForm from "@/components/posts/PostForm";
import { useCreatePost } from "@/hooks/usePosts";
import { CreatePostDto } from "@/types/post";
import Link from "next/link";
import Button from "@/components/ui/Button/Button";
import { useTranslations } from "next-intl";

export default function CreatePostPage() {
  const router = useRouter();
  const params = useParams();
  const lang = params.locale as string;

  const createPostMutation = useCreatePost();

  const t = useTranslations("home");
  const t_actions = useTranslations("actions");

  const handleSubmit = async (data: CreatePostDto) => {
    try {
      const newPost = await createPostMutation.mutateAsync(data);
      // router.push(`/${lang}/posts/${newPost.$id}`);
      router.push(`/${lang}/posts/${newPost.$id}`);
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{t("create")} </h1>
          <Link href={`/${lang}`}>
            <Button variant="secondary">{t_actions("back")}</Button>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <PostForm
            onSubmit={handleSubmit}
            isSubmitting={createPostMutation.isPending}
          />
        </div>
      </div>
    </div>
  );
}
