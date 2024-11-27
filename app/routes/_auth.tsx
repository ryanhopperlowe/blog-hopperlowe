import { LoaderFunctionArgs } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { AuthService } from "~/services/auth.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await AuthService.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  return null;
};

export default function Auth() {
  return <Outlet />;
}
