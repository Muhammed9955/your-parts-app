// src/components/features/posts/PostForm/PostForm.tsx
import React, { useState } from "react";
import Button from "@/components/ui/Button/Button";
import { Post, CreatePostDto, UpdatePostDto } from "@/types/post";
import { useTranslations } from "next-intl";

interface PostFormProps {
  initialValues?: Partial<Post>;
  onSubmit: (data: CreatePostDto | UpdatePostDto) => void;
  isSubmitting: boolean;
}

const PostForm: React.FC<PostFormProps> = ({
  initialValues = {},
  onSubmit,
  isSubmitting,
}) => {
  const [formData, setFormData] = useState<CreatePostDto | UpdatePostDto>({
    title: initialValues.title || "",
    body: initialValues.body || "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const t_form = useTranslations("form");
  const t_actions = useTranslations("actions");

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title?.trim()) {
      newErrors.title = t_form("titleRequired");
    }

    if (!formData.body?.trim()) {
      newErrors.body = t_form("bodyRequired");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {t_form("title")}
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md ${
            errors.title ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-500">{errors.title}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="body"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {t_form("body")}
        </label>
        <textarea
          id="body"
          name="body"
          rows={6}
          value={formData.body}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md ${
            errors.body ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.body && (
          <p className="mt-1 text-sm text-red-500">{errors.body}</p>
        )}
      </div>

      <div className="flex justify-end">
        <Button type="submit" variant="primary" isLoading={isSubmitting}>
          {initialValues.$id ? t_actions("update") : t_actions("create")}
        </Button>
      </div>
    </form>
  );
};

export default PostForm;
