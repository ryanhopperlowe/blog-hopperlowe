import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import { ZodError } from "zod";
import { RootLayout } from "~/components/Layout";
import { ConflictError } from "~/lib/errors";
import { handlePromise } from "~/lib/handlePromise";
import { userService } from "~/services/api/users.server";
import { AuthService } from "~/services/auth.server";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "signup") {
    const { error } = await handlePromise(
      userService.createUser.executeFromFormData(formData),
      { caughtErrors: userService.createUser.errors }
    );

    if (error instanceof ZodError) {
      return { validationErrors: error.flatten().fieldErrors };
    }

    if (error instanceof ConflictError) {
      return { conflictError: error.message };
    }

    throw redirect("/login");
  }
}

export async function loader({ request }: LoaderFunctionArgs) {
  return await AuthService.isAuthenticated(request, {
    successRedirect: "/",
  });
}

export default function Login() {
  const fetcher = useFetcher<typeof action>();

  const isLoading = fetcher.state === "submitting";

  const validationErrors = fetcher.data?.validationErrors || {};

  return (
    <RootLayout>
      <div className="h-full flex justify-center items-center">
        <Card className="w-full max-w-xl">
          <fetcher.Form method="post">
            <CardHeader>Sign Up</CardHeader>

            <CardBody className="flex flex-col gap-4">
              <input type="hidden" name="intent" value="signup" />

              <Input
                name="email"
                label="Email"
                type="email"
                isInvalid={
                  !!validationErrors?.email || !!fetcher.data?.conflictError
                }
                errorMessage={
                  validationErrors?.email?.[0] || fetcher.data?.conflictError
                }
              />

              <Input
                name="password"
                label="Password"
                type="password"
                isInvalid={!!validationErrors?.password}
                errorMessage={validationErrors?.password?.[0]}
              />

              <Input
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                isInvalid={!!validationErrors?.confirmPassword}
                errorMessage={validationErrors?.confirmPassword?.[0]}
              />

              <Button
                isLoading={isLoading}
                disabled={isLoading}
                color="primary"
                type="submit"
              >
                Sign Up
              </Button>
            </CardBody>
          </fetcher.Form>
        </Card>
      </div>
    </RootLayout>
  );
}
