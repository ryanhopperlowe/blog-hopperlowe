import { LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { Header } from "~/components/Header";
import { RootLayout } from "~/components/Layout";
import { AuthService } from "~/services/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await AuthService.isAuthenticated(request);

  return { isAuthed: !!user };
}

export default function Layout() {
  const { isAuthed } = useLoaderData<typeof loader>();

  return (
    <RootLayout>
      <Header isAuthed={isAuthed} />

      <div className="h-full overflow-auto flex-1">
        <main className="h-full container mx-auto">
          <Outlet />
        </main>
      </div>
    </RootLayout>
  );
}
