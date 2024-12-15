import { Button, Input, Textarea } from "@nextui-org/react";
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import { ZodError } from "zod";
import { InternalServerError } from "~/lib/errors";
import { handlePromise } from "~/lib/handlePromise";
import { ArticlesService } from "~/services/api/articles.server";
import { AuthService } from "~/services/auth.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await AuthService.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  return null;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "create-article") {
    const user = await AuthService.isAuthenticated(request, {
      failureRedirect: "/login",
    });

    formData.set("authorId", user.id);

    const { error } = await handlePromise(
      ArticlesService.createArticle.executeFromFormData(formData),
      { caughtErrors: ArticlesService.createArticle.errors }
    );

    if (error instanceof InternalServerError) {
      return { error: error.message };
    }

    if (error instanceof ZodError) {
      return { validationErrors: error.flatten().fieldErrors };
    }

    throw redirect("/blog");
  }
};

export default function CreateArticle() {
  const fetcher = useFetcher<typeof action>();

  const isLoading = fetcher.state === "submitting";

  const { validationErrors, error } = fetcher.data || {};

  return (
    <fetcher.Form className="flex flex-col gap-4 m-2" method="post">
      <h1 className="text-2xl font-bold">Create Article</h1>

      <input type="hidden" name="intent" value="create-article" />

      <Input
        label="Title"
        name="title"
        isInvalid={!!validationErrors?.title}
        errorMessage={validationErrors?.title?.[0]}
      />

      <Textarea
        label="Summary"
        name="summary"
        rows={3}
        isInvalid={!!validationErrors?.summary}
        errorMessage={validationErrors?.summary?.[0]}
      />

      <Input
        label="Location"
        name="location"
        isInvalid={!!validationErrors?.location}
        errorMessage={validationErrors?.location?.[0]}
      />

      {error && <p className="text-red-500">{error}</p>}

      <Button
        type="submit"
        variant="solid"
        color="primary"
        isDisabled={isLoading}
        isLoading={isLoading}
      >
        Create
      </Button>
    </fetcher.Form>
  );
}
