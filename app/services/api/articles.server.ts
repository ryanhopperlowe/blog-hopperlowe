import parseMD from "parse-md";
import fs from "fs";
import { InternalServerError, NotFoundError } from "~/lib/errors";
import { createAction } from "./helpers.server";
import { z } from "zod";
import path from "path";

const articlesSchema = z.object({
  id: z.string(),
  author: z.string(),
  title: z.string(),
  summary: z.string(),
  content: z.string(),
  createdAt: z.date(),
  draft: z.boolean(),
});

const articleMeta = z.object({
  title: z.string(),
  summary: z.string(),
  createdAt: z.date(),
  author: z.string().catch("Ryan Hopper-Lowe"),
  draft: z.boolean().catch(false),
  ids: z.string().array().catch([]),
});

const articleSchemaV2 = articleMeta.extend({
  id: z.string(),
  content: z.string(),
});

const getArticle = createAction()
  .input(z.string())
  .output(articlesSchema)
  .errors([NotFoundError, InternalServerError])
  .action(async ({ input }) => {
    try {
      const article = loadArticles().find(
        (article) => article.id === input || article.ids.includes(input)
      );

      if (!article) throw new NotFoundError("Article not found");

      return article;
    } catch (_) {
      throw new InternalServerError("Failed to read article");
    }
  })
  .getAction();

const getArticlesV2 = createAction()
  .output(articleSchemaV2.array())
  .errors([InternalServerError])
  .action(async () => {
    try {
      return loadArticles()
        .filter((a) => !a.draft)
        .sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
    } catch (_) {
      throw new InternalServerError("Failed to load Articles");
    }
  })
  .getAction();

export const ArticlesService = {
  getArticle: getArticle,
  getArticlesV2: getArticlesV2,
};

const formatId = (val: string) =>
  val.replace(/\.md$/, "").replace(/^\d{4}-\d{2}-\d{2}-/, "");

function loadArticles() {
  const getPath = (filename: string) =>
    path.join(path.join(path.dirname("."), "public/articles"), filename);

  const dir = fs.readdirSync(getPath(""));

  return dir
    .map((filename) => {
      const { content, metadata } = parseMD(
        fs.readFileSync(getPath(filename)).toString()
      );
      const { data: meta, error } = articleMeta.safeParse(metadata);

      if (error) {
        console.error(error.flatten().fieldErrors);
        return null;
      }

      return { ...meta, id: formatId(filename), content: content };
    })
    .filter((f) => !!f);
}
