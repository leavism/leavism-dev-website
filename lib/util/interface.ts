export type Comment = {
  key: number;
  authorId: string;
  content: string;
  createdAt: Date;
};

export type Blog = {
  slug?: string;
  title?: string;
  author?: string;
  date?: Date;
  content?: string;
  excerpt?: string;
  [key: string]: unknown;
};
