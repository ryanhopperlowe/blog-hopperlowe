import { LoaderFunctionArgs, MetaFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Markdown } from "~/components/Markdown";
import { ArticlesService } from "~/services/api/articles.server";

export async function loader({ params }: LoaderFunctionArgs) {
  const { id } = params;

  if (!id) throw redirect("/blog");

  const article = await ArticlesService.getArticle.execute(id);

  return { article };
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: data?.article.title || "Blog Post" },
    { description: data?.article.summary || "Blog Post" },
    { "og:title": data?.article.title || "Blog Post" },
    { "og:description": data?.article.summary || "Blog Post" },
    { "og:site_name": "Ryan Hopper-Lowe" },
  ];
};

export default function ArticlePage() {
  const { article } = useLoaderData<typeof loader>();

  return (
    <div className="pb-5">
      <article className="my-5 mx-2 mb-10">
        <Markdown>{article.content}</Markdown>
      </article>

      <footer className="my-5 mx-2">
        <p className="text-sm text-gray-500">
          {article.createdAt.toLocaleDateString()} by {article.author}
        </p>
      </footer>
    </div>
  );
}
