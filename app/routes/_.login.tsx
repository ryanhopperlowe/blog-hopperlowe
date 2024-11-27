import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/form/input";
import { AuthService } from "~/services/auth.server";

export async function action({ request }: ActionFunctionArgs) {
  try {
    return await AuthService.authenticate("user-pass", request, {
      successRedirect: "/",
    });
  } catch (error) {
    if (error instanceof Response && error.status === 401) {
      return { error: new Error("Invalid email or password") };
    }

    throw error;
  }
}

export async function loader({ request }: LoaderFunctionArgs) {
  return await AuthService.isAuthenticated(request, {
    successRedirect: "/",
  });
}

export default function Login() {
  const fetcher = useFetcher<typeof action>();

  const data = fetcher.data;
  const isLoading = fetcher.state === "submitting";

  return (
    <div className="flex justify-center items-center h-full">
      <div className="card bg-base-200 w-full max-w-xl">
        <div className="card-body">
          <div className="card-header">
            <h2 className="card-title">Login</h2>
          </div>

          <fetcher.Form
            method="post"
            className="card-content flex flex-col gap-4"
          >
            <Input
              name="email"
              label="Email"
              type="email"
              placeholder="Email"
            />

            <Input
              name="password"
              label="Password"
              type="password"
              placeholder="Password"
            />

            {data?.error && (
              <p className="alert alert-error">{data.error.message}</p>
            )}

            <Button type="submit" loading={isLoading} disabled={isLoading}>
              Login
            </Button>
          </fetcher.Form>
        </div>
      </div>
    </div>
  );
}
