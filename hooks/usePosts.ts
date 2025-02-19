// src/hooks/usePosts.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  getPaginatedDocuments,
} from "@/lib/services/posts";
import { CreatePostDto, UpdatePostDto } from "@/types/post";
import { DATABASE_ID, POSTS_COLLECTION_ID, databases } from "@/lib/appwrite";
import { Query } from "appwrite";

export function useAppwritePagination(page: number, limit: number) {
  return useQuery({
    queryKey: ["documents", DATABASE_ID, POSTS_COLLECTION_ID, page, limit],
    queryFn: async () => {
      const offset = (page - 1) * limit;

      try {
        const response = await databases.listDocuments(
          DATABASE_ID,
          POSTS_COLLECTION_ID,
          [
            Query.limit(limit),
            Query.offset(offset),
            Query.orderDesc("$createdAt"),
          ]
        );

        return {
          documents: response.documents,
          total: response.total,
        };
      } catch (error) {
        console.error("Error fetching paginated documents:", error);
        throw error;
      }
    },
    keepPreviousData: true, // Keep previous data while fetching new data
  });
}

// Hook for getting all posts with pagination
// export const useGetPosts = (page: number = 1, limit: number = 10) => {
//   return useQuery({
//     queryKey: ["posts", page, limit],
//     queryFn: () => getPosts(page, limit),
//   });
// };

// Hook for getting a specific post
export const useGetPost = (id: string) => {
  return useQuery({
    queryKey: ["post", id],
    queryFn: () => getPost(id),
    enabled: !!id,
  });
};

// Hook for creating a new post
export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (post: CreatePostDto) => createPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

// Hook for updating a post
export const useUpdatePost = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (post: UpdatePostDto) => updatePost(id, post),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post", id] });
    },
  });
};

// Hook for deleting a post
export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};
