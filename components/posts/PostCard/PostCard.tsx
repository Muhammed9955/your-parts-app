"use client";

import type { Post } from "@/types/post";
import Link from "next/link";
import { useParams } from "next/navigation";
import Button from "../../ui/Button/Button";
import { useTranslations } from "next-intl";

interface PostCardProps {
  post: Post;
  onDelete: (id: string) => void;
  isDeleting?: boolean;
}

export function PostCard({ post, onDelete, isDeleting }: PostCardProps) {
  const params = useParams();
  // console.log({ params });
  const lang = params.locale as string;
  const t = useTranslations("actions");

  return (
    <div
      key={post.$id}
      className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow p-4"
    >
      <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
      <p className="text-gray-700 mb-4 line-clamp-2">{post.body}</p>
      <div className="flex justify-end gap-2">
        <Link href={`/${lang}/posts/${post.$id}`}>
          <Button variant="secondary" size="sm">
            {t("view")}
          </Button>
        </Link>
        <Link href={`/${lang}/posts/${post.$id}/edit`}>
          <Button variant="secondary" size="sm">
            {t("edit")}
          </Button>
        </Link>
        <Button
          variant="danger"
          size="sm"
          onClick={() => onDelete(post.$id)}
          isLoading={isDeleting}
        >
          {t("delete")}
        </Button>
      </div>
    </div>
  );
}
