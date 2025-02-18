// src/types/post.ts
export interface Post {
  $id: string;
  title: string;
  body: string;
  createdAt: Date;
}

export type CreatePostDto = Omit<Post, "$id" | "createdAt">;
export type UpdatePostDto = Partial<CreatePostDto>;

export interface FetchPostsResult {
  posts: Post[];
  total: number;
}
