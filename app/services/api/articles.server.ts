import { Article } from "~/db/schema/articles";

const articles: Article[] = [
  {
    id: "1",
    title: "My first Article",
    summary: "This is the summary of my first article",
    location: "public/articles/test-article1.md",
    createdAt: new Date(),
  },
  {
    id: "2",
    title: "My second Article",
    summary: "This is the summary of my second article",
    location: "public/articles/test-article2.md",
    createdAt: new Date(),
  },
  {
    id: "3",
    title: "My third Article",
    summary: "This is the summary of my third article",
    location: "public/articles/test-article3.md",
    createdAt: new Date(),
  },
];

export const ArticlesService = {
  articles,
};
