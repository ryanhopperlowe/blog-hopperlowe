import fs from "fs";
import { Article } from "~/db/schema/articles";
import { InternalServerError, NotFoundError } from "~/lib/errors";
import { createAction } from "./helpers.server";
import { z } from "zod";

const articles: Article[] = [
  {
    id: "1",
    author: "Ryan Hopper-Lowe",
    title: "Why I left Next.js in the dust",
    summary: "My personal journey through the world of React metaframeworks.",
    location: "public/articles/remix-over-nextjs.md",
    createdAt: new Date(2024, 11, 15),
    draft: false,
  },
  {
    id: "2",
    author: "Ryan Hopper-Lowe",
    title: "You're using useRef wrong",
    summary: "Some fun facts about the useRef hook in React.",
    location: "public/articles/use-ref-wrong.md",
    createdAt: new Date(2024, 11, 18),
    draft: false,
  },
  {
    id: "3",
    author: "Ryan Hopper-Lowe",
    title: "You probably never needed Zustand",
    summary:
      "A look at why React state management libraries are a waste of time.",
    location: "public/articles/ditch-state-management.md",
    createdAt: new Date(2025, 0, 9),
    draft: false,
  },
  {
    id: "4",
    author: "Ryan Hopper-Lowe",
    title: "I might be ditching React 🤯",
    summary: "My take on a newer framework.",
    location: "public/articles/2025-02-27-i-tried-svelte.md",
    createdAt: new Date(2025, 1, 27),
    draft: false,
  },
];

const articlesSchema = z.object({
  id: z.string(),
  author: z.string(),
  title: z.string(),
  summary: z.string(),
  content: z.string(),
  createdAt: z.date(),
  draft: z.boolean(),
});

const getArticles = createAction()
  .errors([NotFoundError, InternalServerError])
  .output(z.array(articlesSchema.omit({ content: true })))
  .action(async () => articles.filter((article) => !article.draft))
  .getAction();

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
  getArticles,
  getArticle,
};
