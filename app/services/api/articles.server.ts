import {
  Articles,
  articleSchema,
  createArticleSchema,
} from "~/db/schema/articles";
import { InternalServerError } from "~/lib/errors";
import { DB } from "../db.server";
import { createAction } from "./helpers.server";

const createArticle = createAction()
  .input(createArticleSchema)
  .output(articleSchema)
  .errors([InternalServerError])
  .action(async ({ input }) => {
    const [article] = await DB.insert(Articles).values(input).returning();

    if (!article) throw new InternalServerError("Failed to create article");

    return article;
  })
  .getAction();

export const ArticlesService = {
  createArticle,
};
