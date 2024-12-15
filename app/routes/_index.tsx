import { redirect, type MetaFunction } from "@remix-run/node";
import { RootLayout } from "~/components/Layout";

export const meta: MetaFunction = () => {
  return [
    { title: "Blog - Ryan Hopper-Lowe" },
    { name: "description", content: "Blog - Ryan Hopper-Lowe" },
  ];
};

export async function loader() {
  throw redirect("/blog");
}

export default function Index() {
  return (
    <RootLayout>
      <div className="h-full flex flex-col items-center justify-center gap-16">
        <header className="flex flex-col items-center gap-9">
          <h1 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100">
            Coming Soon!
          </h1>
        </header>
      </div>
    </RootLayout>
  );
}
