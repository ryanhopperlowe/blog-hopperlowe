import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import ReactMarkdown from "react-markdown";
import { ArticlesService } from "~/services/api/articles.server";

export async function loader({ params }: LoaderFunctionArgs) {
  const { id } = params;

  if (!id) throw redirect("/blog");

  const article = await ArticlesService.getArticle.execute(id);

  return { article };
}

export default function ArticlePage() {
  const { article } = useLoaderData<typeof loader>();

  return (
    <div className="pb-5">
      <article className="my-5 mx-2 mb-10">
        <ReactMarkdown>{article.content}</ReactMarkdown>
      </article>

      <footer className="my-5 mx-2">
        <p className="text-sm text-gray-500">
          {article.createdAt.toLocaleDateString()} by {article.author}
        </p>
      </footer>
    </div>
  );
}
