declare global {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type Todo = any;

  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      SESSION_SECRET: string;
      MY_EMAIL_REGEX: string;
    }
  }
}

export {};
