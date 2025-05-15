import cors from "cors";
import express from "express";
import { applyCron } from "./lib/cron.js";
import { CreateAppContext, TAppContext } from "./lib/ctx.js";
import { env } from "./lib/env.js";
import { logger } from "./lib/logger.js";
import { applyPassportToExpressApp } from "./lib/passport.js";
import { applyTrpcToExpressApp } from "./lib/trpc.js";
import { trpcRouter } from "./router/index.js";

let ctx: TAppContext | null = null;

(async () => {
  try {
    const app = express();
    ctx = CreateAppContext();

    app.use(cors());

    applyPassportToExpressApp(app, ctx);
    await applyTrpcToExpressApp(app, ctx, trpcRouter);
    applyCron(ctx);

    app.use((error: unknown, req: express.Request, res: express.Response, next: express.NextFunction) => {
      logger.error("express", error);
      if (res.headersSent) {
        next(error);
        return;
      }
      res.status(500).send("Internal server error");
    });

    app.listen(env.PORT, () => {
      logger.info("express", `Server started on http://localhost:${env.PORT}`);
    });
    throw new Error("ERR2");
  } catch (e) {
    await ctx?.stop();
    logger.error("app", e);
  }
})();
