import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import { type Express } from "express";
import SuperJSON from "superjson";
import { expressHandler } from "trpc-playground/handlers/express";
import { TTrpcRouter } from "../router/index.js";
import { TExpressRequest } from "../types/trpc.js";
import { TAppContext } from "./ctx.js";

const getCreateTrpcContext =
  (appContext: TAppContext) =>
  ({ req }: trpcExpress.CreateExpressContextOptions) => ({
    ...appContext,
    me: (req as TExpressRequest).user || null,
  });

type TTrpcContext = inferAsyncReturnType<ReturnType<typeof getCreateTrpcContext>>;

export const trpc = initTRPC.context<TTrpcContext>().create({ transformer: SuperJSON });

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
