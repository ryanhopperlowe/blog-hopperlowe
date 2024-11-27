import { ErrorHelper } from "./errors";

export async function handlePromise<T, E extends ErrorHelper>(
  promise: Promise<T>,
  config?: { caughtErrors?: E[] }
): Promise<{ data: T; error: null } | { data: null; error: InstanceType<E> }> {
  const { caughtErrors } = config || {};
  try {
    const data = await promise;
    return { data, error: null };
  } catch (error) {
    if (!caughtErrors?.length)
      return { data: null, error: error as InstanceType<E> };

    if (caughtErrors?.some((EType) => error instanceof EType)) {
      return { data: null, error: error as InstanceType<E> };
    }

    throw error;
  }
}
