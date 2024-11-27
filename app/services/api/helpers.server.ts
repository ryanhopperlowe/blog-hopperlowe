import { ZodError, ZodSchema } from "zod";
import { zfd } from "zod-form-data";
import { ErrorHelper } from "~/lib/errors";

type ActionProps<
  TInput,
  TOutput,
  TIntent extends string | undefined = undefined,
  TError extends ErrorHelper | undefined = undefined
> = {
  inputSchema?: ZodSchema<TInput>;
  outputSchema?: ZodSchema<TOutput>;
  callback?: (params: { input: TInput }) => Promise<TOutput>;
  intent?: TIntent;
  errors?: TError[];
};

class ActionBuilder<
  TInput,
  TOutput,
  TError extends ErrorHelper | undefined = undefined,
  TIntent extends string | undefined = undefined
> {
  private props: ActionProps<TInput, TOutput, TIntent, TError> = {};

  constructor(props: ActionProps<TInput, TOutput, TIntent, TError> = {}) {
    this.props = props;
  }

  intent(intent: string) {
    return new ActionBuilder({
      ...this.props,
      intent,
    });
  }

  input<TNewInput>(schema: ZodSchema<TNewInput>) {
    return new ActionBuilder({
      ...this.props,
      callback: undefined,
      inputSchema: schema,
    });
  }

  output<TNewOutput>(schema: ZodSchema<TNewOutput>) {
    return new ActionBuilder({
      ...this.props,
      callback: undefined,
      outputSchema: schema,
    });
  }

  action(callback: (params: { input: TInput }) => Promise<TOutput>) {
    return new ActionBuilder({
      ...this.props,
      callback,
    });
  }

  errors<TError extends ErrorHelper>(errors: TError[]) {
    return new ActionBuilder({
      ...this.props,
      errors,
    });
  }

  getAction() {
    if (!this.props.callback) {
      throw new Error("Action is not defined");
    }

    const callback = this.props.callback;
    const inputSchema = this.props.inputSchema;
    const outputSchema = this.props.outputSchema;
    const intent = this.props.intent;

    const baseAction = async (input: TInput) => {
      const output = await callback({ input });

      if (outputSchema) return outputSchema.parse(output);

      return output;
    };

    const execute = async (_input: TInput) => {
      let input = _input;

      if (inputSchema) input = inputSchema.parse(_input);

      return await baseAction(input);
    };

    const executeFromFormData = async (formData: FormData) => {
      if (!inputSchema) throw new Error("Input schema is not defined");

      const parsed = await zfd.formData(inputSchema).parseAsync(formData);

      return await execute(parsed);
    };

    return {
      errors: [ZodError<TInput>, ZodError, ...(this.props.errors || [])],
      execute,
      executeFromFormData,
      intent: intent as TIntent,
    };
  }
}

export const createAction = () => new ActionBuilder();
