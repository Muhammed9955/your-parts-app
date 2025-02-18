// tests/api.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
  searchPosts,
  getPaginatedDocuments,
} from "@/lib/services/posts"; // Adjust the import path as needed
import {
  databases,
  DATABASE_ID,
  POSTS_COLLECTION_ID,
  ID,
} from "@/lib/appwrite";


// Mock the Appwrite databases module
vi.mock("@/lib/appwrite", () => ({
  // Create a fake unique id generator
  ID: {
    unique: () => "unique-id",
  },
  DATABASE_ID: "mockDatabaseId",
  POSTS_COLLECTION_ID: "mockPostsCollectionId",
  databases: {
    createDocument: vi.fn(),
    listDocuments: vi.fn(),
    getDocument: vi.fn(),
    updateDocument: vi.fn(),
    deleteDocument: vi.fn(),
  },
}));

describe("Appwrite API Functions", () => {
  beforeEach(() => {
    // Clear mock history before each test
    vi.clearAllMocks();
  });

  describe("createPost", () => {
    it("should create a post and return the created post", async () => {
      const newPost = { title: "Test Post", content: "Test Content" };
      // Create a fake created post; note that createdAt is added by the function
      const createdPost = {
        $id: "unique-id",
        ...newPost,
        createdAt: new Date(),
      };

      // Mock createDocument to resolve with createdPost
      (databases.createDocument as vi.Mock).mockResolvedValue(createdPost);

      const result = await createPost(newPost);

      // Check that createDocument was called with the proper arguments.
      expect(databases.createDocument).toHaveBeenCalledWith(
        DATABASE_ID,
        POSTS_COLLECTION_ID,
        expect.any(String), // the unique id generated
        expect.objectContaining(newPost)
      );
      expect(result).toEqual(createdPost);
    });
  });

  describe("getPosts", () => {
    it("should return paginated posts with hasNextPage true when extra post exists", async () => {
      // Simulate response with one extra document than the pageSize (2 + 1 = 3 documents)
      const mockDocs = [
        { $id: "1", title: "Post 1", createdAt: new Date() },
        { $id: "2", title: "Post 2", createdAt: new Date() },
        { $id: "3", title: "Post 3", createdAt: new Date() },
      ];
      (databases.listDocuments as vi.Mock).mockResolvedValue({
        documents: mockDocs,
        total: 3,
      });

      // Call getPosts for page 1 with pageSize = 2
      const result = await getPosts(1, 2);

      // Expect that only the first 2 posts are returned and hasNextPage is true
      expect(result).toEqual({
        posts: mockDocs.slice(0, 2),
        hasNextPage: true,
        hasPreviousPage: false,
        currentPage: 1,
      });
      expect(databases.listDocuments).toHaveBeenCalledWith(
        DATABASE_ID,
        POSTS_COLLECTION_ID,
        [
          expect.objectContaining({}), // Query.limit
          expect.objectContaining({}), // Query.offset
          expect.objectContaining({}), // Query.orderDesc
        ]
      );
    });

    it("should return paginated posts with hasNextPage false when page has exact number of posts", async () => {
      // Simulate response with exactly 2 documents
      const mockDocs = [
        { $id: "1", title: "Post 1", createdAt: new Date() },
        { $id: "2", title: "Post 2", createdAt: new Date() },
      ];
      (databases.listDocuments as vi.Mock).mockResolvedValue({
        documents: mockDocs,
        total: 2,
      });

      const result = await getPosts(1, 2);

      expect(result).toEqual({
        posts: mockDocs,
        hasNextPage: false,
        hasPreviousPage: false,
        currentPage: 1,
      });
    });

    it("should throw an error when listDocuments fails", async () => {
      (databases.listDocuments as vi.Mock).mockRejectedValue(
        new Error("Test error")
      );

      await expect(getPosts(1, 2)).rejects.toThrow("Failed to fetch posts");
    });
  });

  describe("getPost", () => {
    it("should return a post by id", async () => {
      const post = {
        $id: "1",
        title: "Sample Post",
        content: "Content",
        createdAt: new Date(),
      };
      (databases.getDocument as vi.Mock).mockResolvedValue(post);

      const result = await getPost("1");

      expect(databases.getDocument).toHaveBeenCalledWith(
        DATABASE_ID,
        POSTS_COLLECTION_ID,
        "1"
      );
      expect(result).toEqual(post);
    });
  });

  describe("updatePost", () => {
    it("should update and return the post", async () => {
      const updateData = { title: "Updated Title" };
      const updatedPost = {
        $id: "1",
        title: "Updated Title",
        content: "Content",
        createdAt: new Date(),
      };
      (databases.updateDocument as vi.Mock).mockResolvedValue(updatedPost);

      const result = await updatePost("1", updateData);

      expect(databases.updateDocument).toHaveBeenCalledWith(
        DATABASE_ID,
        POSTS_COLLECTION_ID,
        "1",
        updateData
      );
      expect(result).toEqual(updatedPost);
    });
  });

  describe("deletePost", () => {
    it("should delete a post and return true", async () => {
      // Assume deleteDocument resolves to undefined
      (databases.deleteDocument as vi.Mock).mockResolvedValue(undefined);

      const result = await deletePost("1");

      expect(databases.deleteDocument).toHaveBeenCalledWith(
        DATABASE_ID,
        POSTS_COLLECTION_ID,
        "1"
      );
      expect(result).toBe(true);
    });
  });

  describe("searchPosts", () => {
    it("should return search results with hasNextPage true when extra post exists", async () => {
      const mockDocs = [
        { $id: "1", title: "Search Post 1", createdAt: new Date() },
        { $id: "2", title: "Search Post 2", createdAt: new Date() },
        { $id: "3", title: "Search Post 3", createdAt: new Date() },
      ];
      (databases.listDocuments as vi.Mock).mockResolvedValue({
        documents: mockDocs,
        total: 3,
      });

      const result = await searchPosts("Search", 1, 2);

      expect(result).toEqual({
        items: mockDocs.slice(0, 2),
        hasNextPage: true,
        hasPreviousPage: false,
        currentPage: 1,
      });
    });

    it("should throw an error when search fails", async () => {
      (databases.listDocuments as vi.Mock).mockRejectedValue(
        new Error("Search error")
      );

      await expect(searchPosts("Search", 1, 2)).rejects.toThrow(
        "Failed to search posts"
      );
    });
  });

  describe("getPaginatedDocuments", () => {
    it("should return paginated documents", async () => {
      const mockResponse = {
        documents: [
          { $id: "1", title: "Doc 1" },
          { $id: "2", title: "Doc 2" },
        ],
        total: 2,
      };
      (databases.listDocuments as vi.Mock).mockResolvedValue(mockResponse);

      const result = await getPaginatedDocuments(1, 2);

      // getPaginatedDocuments calls listDocuments with five arguments:
      // (DATABASE_ID, POSTS_COLLECTION_ID, queriesArray, limit, offset)
      expect(databases.listDocuments).toHaveBeenCalledWith(
        DATABASE_ID,
        POSTS_COLLECTION_ID,
        [],
        2,
        0
      );
      expect(result).toEqual(mockResponse);
    });

    it("should throw an error when fetching paginated documents fails", async () => {
      (databases.listDocuments as vi.Mock).mockRejectedValue(
        new Error("Pagination error")
      );

      await expect(getPaginatedDocuments(1, 2)).rejects.toThrow(
        "Pagination error"
      );
    });
  });
});
