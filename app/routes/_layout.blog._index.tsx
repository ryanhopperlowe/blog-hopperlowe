import { Card, CardBody, CardHeader, Link } from "@nextui-org/react";
import { useLoaderData } from "@remix-run/react";
import { ArticlesService } from "~/services/api/articles.server";

export async function loader() {
  return { articles: ArticlesService.articles };
}

export default function BlogPage() {
  const { articles } = useLoaderData<typeof loader>();

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Articles</h1>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        {articles.map((article) => (
          <Card
            key={article.id}
            isPressable
            className="border-none"
            as={Link}
            href={`/blog/${article.id}`}
          >
            <CardHeader className="pb-0 pt-4 px-4 flex-col items-start">
              <h2 className="font-bold text-xl">{article.title}</h2>
              <small className="text-default-500">
                Ryan Hopper-Lowe - {article.createdAt.toLocaleDateString()}
              </small>
            </CardHeader>

            <CardBody>
              <p className="text-default-500">{article.summary}</p>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
