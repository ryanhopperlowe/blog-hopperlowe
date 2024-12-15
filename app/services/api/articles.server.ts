import fs from "fs";
import { Article } from "~/db/schema/articles";
import { InternalServerError, NotFoundError } from "~/lib/errors";
import { createAction } from "./helpers.server";
import { z } from "zod";

const articles: Article[] = [
  {
    id: "1",
    author: "Ryan Hopper-Lowe",
    title: "My first Article",
    summary: "This is the summary of my first article",
    location: "public/articles/test-article1.md",
    createdAt: new Date(),
  },
  {
    id: "2",
    author: "Ryan Hopper-Lowe",
    title: "My second Article",
    summary: "This is the summary of my second article",
    location: "public/articles/test-article2.md",
    createdAt: new Date(),
  },
  {
    id: "3",
    author: "Ryan Hopper-Lowe",
    title: "My third Article",
    summary: "This is the summary of my third article",
    location: "public/articles/test-article3.md",
    createdAt: new Date(),
  },
  {
    id: "4",
    author: "Ryan Hopper-Lowe",
    title: "Error Article",
    summary: "This is the summary of my fourth article",
    location: "",
    createdAt: new Date(),
  },
];

const articlesSchema = z.object({
  id: z.string(),
  author: z.string(),
  title: z.string(),
  summary: z.string(),
  content: z.string(),
  createdAt: z.date(),
});

const getArticle = createAction()
  .input(z.string())
  .output(articlesSchema)
  .errors([NotFoundError, InternalServerError])
  .action(async ({ input }) => {
    const article = articles.find((article) => article.id === input);

    if (!article) throw new NotFoundError("Article not found");

    try {
      const content = fs.readFileSync(article.location).toString();

      return { ...article, content };
    } catch (_) {
      throw new InternalServerError("Failed to read article");
    }
  })
  .getAction();

export const ArticlesService = {
  articles,
  getArticle,
};
