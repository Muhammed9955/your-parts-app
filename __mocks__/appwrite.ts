// __mocks__/appwrite.ts
import { vi } from "vitest";

// Mock post data
const mockPosts = [
  { id: "1", title: "Test Post 1", body: "Content 1", createdAt: "2023-01-01" },
  { id: "2", title: "Test Post 2", body: "Content 2", createdAt: "2023-01-02" },
];

// Mock single post
const mockPost = {
  id: "1",
  title: "Test Post 1",
  body: "Content 1",
  createdAt: "2023-01-01",
};

// Mock databases
export const databases = {
  // List documents (get multiple posts)
  listDocuments: vi.fn().mockResolvedValue({
    documents: mockPosts,
    total: mockPosts.length,
  }),

  // Get a single document
  getDocument: vi.fn().mockResolvedValue(mockPost),

  // Create a document
  createDocument: vi.fn().mockImplementation((_, __, ___, data) => {
    return Promise.resolve({
      id: "new-id",
      ...data,
      createdAt: new Date().toISOString(),
    });
  }),

  // Update a document
  updateDocument: vi.fn().mockImplementation((_, __, id, data) => {
    return Promise.resolve({
      id,
      ...data,
      updatedAt: new Date().toISOString(),
    });
  }),

  // Delete a document
  deleteDocument: vi.fn().mockResolvedValue({ status: "success" }),
};

// Mock Appwrite client
export const client = {
  setEndpoint: vi.fn().mockReturnThis(),
  setProject: vi.fn().mockReturnThis(),
};

// Mock for ID generation
export const ID = {
  unique: vi.fn().mockReturnValue("new-id"),
};
