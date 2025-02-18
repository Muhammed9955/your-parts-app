import axios from "axios";
import { Post, PostsResponse } from "@/types/post";

const API_BASE_URL = "https://dummyjson.com";

export const postsApi = {
  getPosts: async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    const response = await axios.get<PostsResponse>(`${API_BASE_URL}/posts`, {
      params: {
        skip,
        limit,
      },
    });

    return {
      posts: response.data.posts,
      total: response.data.total,
    };
  },

  getPost: async (id: number) => {
    const response = await axios.get<Post>(`${API_BASE_URL}/posts/${id}`);
    return response.data;
  },

  createPost: async (post: Omit<Post, "id" | "reactions" | "tags">) => {
    const response = await axios.post<Post>(`${API_BASE_URL}/posts/add`, {
      ...post,
      userId: 1, // DummyJSON requires userId
    });
    return response.data;
  },

  updatePost: async (id: number, post: Partial<Post>) => {
    const response = await axios.put<Post>(`${API_BASE_URL}/posts/${id}`, post);
    return response.data;
  },

  deletePost: async (id: number) => {
    const response = await axios.delete<Post>(`${API_BASE_URL}/posts/${id}`);
    return response.data;
  },

  // Additional DummyJSON specific endpoints
  searchPosts: async (query: string) => {
    const response = await axios.get<PostsResponse>(
      `${API_BASE_URL}/posts/search`,
      {
        params: { q: query },
      }
    );
    return response.data;
  },

  getPostsByUser: async (userId: number) => {
    const response = await axios.get<PostsResponse>(
      `${API_BASE_URL}/posts/user/${userId}`
    );
    return response.data;
  },
};
