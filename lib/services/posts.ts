import {
  databases,
  DATABASE_ID,
  POSTS_COLLECTION_ID,
  ID,
} from "@/lib/appwrite";
import {
  Post,
  CreatePostDto,
  UpdatePostDto,
  PaginatedResult,
} from "@/types/post";
import { Query } from "appwrite";

// Create a post
export async function createPost(post: CreatePostDto) {
  return (await databases.createDocument(
    DATABASE_ID,
    POSTS_COLLECTION_ID,
    ID.unique(),
    {
      ...post,
      createdAt: new Date(),
    }
  )) as unknown as Post;
}

// // Get all posts with pagination
// export async function getPosts(page: number = 1, limit: number = 10) {
//   const offset = (page - 1) * limit;

//   const response = await databases.listDocuments(
//     DATABASE_ID,
//     POSTS_COLLECTION_ID,
//     [
//       Query.limit(limit),
//       Query.offset(offset),
//       Query.orderDesc('$createdAt')
//     ]
//   );

//   return {
//     posts: response.documents as unknown as Post[],
//     total: response.total
//   };
// }

export async function getPosts(
  page: number = 1,
  pageSize: number = 10
): Promise<PaginationResult<Post>> {
  try {
    const offset = (page - 1) * pageSize;

    const response = await databases.listDocuments(
      DATABASE_ID,
      POSTS_COLLECTION_ID,
      [
        Query.limit(pageSize + 1), // Request one extra item to check for next page
        Query.offset(offset),
        Query.orderDesc("$createdAt"),
      ]
    );

    const hasNextPage = response.documents.length > pageSize;
    const posts = hasNextPage
      ? response.documents.slice(0, pageSize)
      : response.documents;

    return {
      posts: posts as Post[],
      hasNextPage,
      hasPreviousPage: page > 1,
      currentPage: page,
    };
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Failed to fetch posts");
  }
}

// Get a specific post by ID
export async function getPost(id: string) {
  return (await databases.getDocument(
    DATABASE_ID,
    POSTS_COLLECTION_ID,
    id
  )) as unknown as Post;
}

// Update an existing post
export async function updatePost(id: string, post: UpdatePostDto) {
  return (await databases.updateDocument(
    DATABASE_ID,
    POSTS_COLLECTION_ID,
    id,
    post
  )) as unknown as Post;
}

// Delete a post
export async function deletePost(id: string) {
  await databases.deleteDocument(DATABASE_ID, POSTS_COLLECTION_ID, id);

  return true;
}

// lib/appwrite.ts (add this function)
export async function searchPosts(
  query: string,
  page: number = 1,
  pageSize: number = 10
): Promise<PaginationResult<Post>> {
  try {
    const offset = (page - 1) * pageSize;

    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID as string,
      [
        Query.limit(pageSize + 1),
        Query.offset(offset),
        Query.search("title", query),
      ]
    );

    const hasNextPage = response.documents.length > pageSize;
    const posts = hasNextPage
      ? response.documents.slice(0, pageSize)
      : response.documents;

    return {
      items: posts as Post[],
      hasNextPage,
      hasPreviousPage: page > 1,
      currentPage: page,
    };
  } catch (error) {
    console.error("Error searching posts:", error);
    throw new Error("Failed to search posts");
  }
}

export async function getPaginatedDocuments(page = 1, limit = 10) {
  const offset = (page - 1) * limit;

  try {
    const response = await databases.listDocuments(
        DATABASE_ID,
        POSTS_COLLECTION_ID,
      [
        // Add any queries here if needed
      ],
      limit,
      offset
    );

    return {
      documents: response.documents,
      total: response.total,
    };
  } catch (error) {
    console.error("Error fetching paginated documents:", error);
    throw error;
  }
}
