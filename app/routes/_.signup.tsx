import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import { ZodError } from "zod";
import { Input } from "~/components/ui/form/input";
import { Button } from "~/components/ui/button";
import { handlePromise } from "~/lib/handlePromise";
import { userService } from "~/services/api/users.server";
import { AuthService } from "~/services/auth.server";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent");

  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (intent === "signup") {
    const { error } = await handlePromise(
      userService.createUser.executeFromFormData(formData),
      { caughtErrors: userService.createUser.errors }
    );

    if (error instanceof ZodError) {
      return { validationErrors: error.flatten().fieldErrors };
    }

    throw redirect("/login");
  }
}

export async function loader({ request }: LoaderFunctionArgs) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return await AuthService.isAuthenticated(request, {
    successRedirect: "/",
  });
}

export default function Login() {
  const fetcher = useFetcher<typeof action>();

  const isLoading = fetcher.state === "submitting";

  const validationErrors = fetcher.data?.validationErrors || {};
  console.log(validationErrors);

  return (
    <fetcher.Form method="post" className="card bg-base-200">
      <div className="card-body">
        <div className="card-header">
          <h2 className="card-title">Sign Up</h2>
        </div>

        <div className="card-content flex flex-col gap-4">
          <input type="hidden" name="intent" value="signup" />

          <Input
            name="email"
            label="Email"
            type="email"
            placeholder="Email"
            error={validationErrors?.email?.[0]}
          />

          <Input
            name="password"
            label="Password"
            type="password"
            placeholder="Password"
            error={validationErrors?.password?.[0]}
          />

          <Input
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="Confirm Password"
            error={validationErrors?.confirmPassword?.[0]}
          />

          <Button loading={isLoading} disabled={isLoading} type="submit">
            Sign Up
          </Button>
        </div>
      </div>
    </fetcher.Form>
  );
}
