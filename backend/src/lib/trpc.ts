import { initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import { type Express } from "express";
import { TTrpcRouter } from "../router/index.js";

export const trpc = initTRPC.create();

export const applyTrpcToExpressApp = (expressApp: Express, trpcRouter: TTrpcRouter) => {
  expressApp.use(
    "/trpc",
    trpcExpress.createExpressMiddleware({
      router: trpcRouter,
    })
  );
};
