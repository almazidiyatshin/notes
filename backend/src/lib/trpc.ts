import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import { type Express } from "express";
import SuperJSON from "superjson";
import { expressHandler } from "trpc-playground/handlers/express";
import { TTrpcRouter } from "../router/index.js";
import { TExpressRequest } from "../types/trpc.js";
import { TAppContext } from "./ctx.js";
import { ExpectedError } from "./error.js";
import { logger } from "./logger.js";

const getCreateTrpcContext =
  (appContext: TAppContext) =>
  ({ req }: trpcExpress.CreateExpressContextOptions) => ({
    ...appContext,
    me: (req as TExpressRequest).user || null,
  });

type TTrpcContext = inferAsyncReturnType<ReturnType<typeof getCreateTrpcContext>>;

const trpc = initTRPC.context<TTrpcContext>().create({
  transformer: SuperJSON,
  errorFormatter: ({ shape, error }) => {
    const isExpected = error.cause instanceof ExpectedError;
    return {
      ...shape,
      data: {
        ...shape.data,
        isExpected,
      },
    };
  },
});

export const createTrpcRouter = trpc.router;

export const trpcLoggedProcedure = trpc.procedure.use(
  trpc.middleware(async ({ path, type, next, ctx, rawInput }) => {
    const start = Date.now();
    const result = await next();
    const durationMs = Date.now() - start;
    const meta = {
      path,
      type,
      userId: ctx.me?.id || null,
      durationMs,
      rawInput: rawInput || null,
    };
    if (result.ok) {
      logger.info(`trpc:${type}:success`, "Successfull request", { ...meta, output: result.data });
    } else {
      logger.error(`trpc:${type}:error`, result.error, meta);
    }
    return result;
  })
);

export const applyTrpcToExpressApp = async (expressApp: Express, appContext: TAppContext, trpcRouter: TTrpcRouter) => {
  expressApp.use(
    "/trpc",
    trpcExpress.createExpressMiddleware({
      router: trpcRouter,
      createContext: getCreateTrpcContext(appContext),
    })
  );

  expressApp.use(
    "/trpc-playground",
    await expressHandler({
      trpcApiEndpoint: "/trpc",
      playgroundEndpoint: "/trpc-playground",
      router: trpcRouter,
      request: {
        superjson: true,
      },
    })
  );
};
