import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
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
      <Card className="w-full max-w-xl">
        <CardHeader>Login</CardHeader>

        <CardBody className="flex flex-col gap-4">
          <fetcher.Form method="post" className="flex flex-col gap-4">
            <Input name="email" label="Email" type="email" />

            <Input name="password" label="Password" type="password" />

            {data?.error && <p className="text-danger">{data.error.message}</p>}

            <Button
              color="primary"
              type="submit"
              isLoading={isLoading}
              disabled={isLoading}
            >
              Login
            </Button>
          </fetcher.Form>
        </CardBody>
      </Card>
    </div>
  );
}
