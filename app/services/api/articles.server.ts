import { Article } from "~/db/schema/articles";

const articles: Article[] = [
  {
    title: "My first Article",
    summary: "This is the summary of my first article",
    location: "public/articles/test-article1.md",
  },
  {
    title: "My second Article",
    summary: "This is the summary of my second article",
    location: "public/articles/test-article2.md",
  },
  {
    title: "My third Article",
    summary: "This is the summary of my third article",
    location: "public/articles/test-article3.md",
  },
];

export const ArticlesService = {
  articles,
};
