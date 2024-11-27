import { LoaderFunctionArgs } from "@remix-run/node";
import { AuthService } from "~/services/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
  return await AuthService.logout(request, { redirectTo: "/login" });
}
