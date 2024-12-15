import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { ArticlesService } from "~/services/api/articles.server";

export async function loader({ params }: LoaderFunctionArgs) {
  const { id } = params;
  const article = ArticlesService.articles.find((article) => article.id === id);

  if (!article) throw redirect("/blog");

  return { article };
}

export default function ArticlePage() {
  return <div>Blog Article Page</div>;
}
