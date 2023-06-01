export type Comment = {
  key: number;
  authorId: string;
  content: string;
  createdAt: Date;
};

export type Blog = {
  slug: string;
  title: string;
  authorId: string;
  createdAt: Date;
  content: string;
  description: string;
  [key: string]: unknown;
};
