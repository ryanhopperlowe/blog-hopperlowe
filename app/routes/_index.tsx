import { type MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Blog - Ryan Hopper-Lowe" },
    { name: "description", content: "Blog - Ryan Hopper-Lowe" },
  ];
};

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-16">
        <header className="flex flex-col items-center gap-9">
          <h1 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100">
            Coming Soon!
          </h1>
        </header>
      </div>
    </div>
  );
}
