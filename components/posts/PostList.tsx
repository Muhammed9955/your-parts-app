// components/PostList.tsx
import { Post } from "@/types/post";
import { useDeletePost } from "@/hooks/usePosts";
import { PostCard } from "./PostCard/PostCard";
import { useTranslations } from "next-intl";
import { Models } from "appwrite";

interface PostListProps {
  posts: Models.Document[];
}

export default function PostList({ posts }: PostListProps) {
  const t_form = useTranslations("form");

  const deletePostMutation = useDeletePost();
  const handleDelete = async (id: string) => {
    if (window.confirm(t_form("delete_message"))) {
      try {
        await deletePostMutation.mutateAsync(id);
      } catch (error) {
        console.error("Failed to delete post:", error);
      }
    }
  };

  return (
    <div className="">
      {posts.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No posts available</p>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post: Post) => (
            // <div
            //   key={post.$id}
            //   className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow p-4"
            // >
            //   <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            //   <p className="text-gray-700 mb-4 line-clamp-2">{post.body}</p>
            //   <div className="flex justify-end gap-2">
            //     <Link href={`/${lang}/posts/${post.$id}`}>
            //       <Button variant="secondary" size="sm">
            //         View
            //       </Button>
            //     </Link>
            //     <Link href={`/${lang}/posts/${post.$id}/edit`}>
            //       <Button variant="secondary" size="sm">
            //         Edit
            //       </Button>
            //     </Link>
            //     <Button
            //       variant="danger"
            //       size="sm"
            //       onClick={() => handleDelete(post.$id)}
            //       isLoading={deletePostMutation.isPending}
            //     >
            //       Delete
            //     </Button>
            //   </div>
            // </div>
            <PostCard
              post={post}
              key={post?.$id}
              onDelete={handleDelete}
              isDeleting={deletePostMutation?.isPending}
            />
          ))}
        </div>
      )}
    </div>
  );
}
