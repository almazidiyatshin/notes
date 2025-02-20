import cors from "cors";
import express from "express";
import { CreateAppContext, TAppContext } from "./lib/ctx.js";
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

    app.listen(3000, () => {
      console.log("Server started on http://localhost:3000");
    });
  } catch (e) {
    await ctx?.stop();
    console.error(e);
  }
})();
