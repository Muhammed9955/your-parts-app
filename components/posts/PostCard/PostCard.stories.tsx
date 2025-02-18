// components/PostCard/PostCard.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { PostCard } from "./PostCard";
import { Post } from "@/types/post";
import { action } from "@storybook/addon-actions";
// import { RouterContext } from "next/dist/shared/lib/router-context";
// import { mockRouter } from "next-router-mock";

const meta: Meta<typeof PostCard> = {
  title: "Components/PostCard",
  component: PostCard,
  tags: ["autodocs"],
  argTypes: {
    onDelete: { action: "deleteClicked" },
    isDeleting: { control: "boolean" },
  },
  //   decorators: [
  //     (Story) => (
  //       <RouterContext.Provider value={{ ...mockRouter, query: { lang: "en" } }}>
  //         <Story />
  //       </RouterContext.Provider>
  //     ),
  //   ],
};

export default meta;

type Story = StoryObj<typeof PostCard>;

const samplePost: Post = {
  $id: "1",
  title: "Sample Blog Post",
  body: "This is a sample blog post content. It can be quite long and will be truncated with line clamping in the card component.",
  createdAt: new Date(),
  // Add other required Post type fields here
};

// Default state
export const Default: Story = {
  args: {
    post: samplePost,
    onDelete: action("delete-clicked"),
    isDeleting: false,
  },
};

// Deleting state
export const Deleting: Story = {
  args: {
    post: samplePost,
    onDelete: action("delete-clicked"),
    isDeleting: true,
  },
};
