import { MetaFunction, useRouteError } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Blog" },
    { "og:title": "Blog" },
    { description: "Blog posts by Ryan Hopper-Lowe" },
    { "og:description": "Blog posts by Ryan Hopper-Lowe" },
    { "og:site_name": "Ryan Hopper-Lowe" },
  ];
};

export function ErrorBoundary() {
  const error = useRouteError();
  const message = error instanceof Error ? error.message : "Unknown error";
  return (
    <div className="flex justify-center h-full pt-10">
      <h2 className="text-red-500">{message}</h2>
    </div>
  );
}
