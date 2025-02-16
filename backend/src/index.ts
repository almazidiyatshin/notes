import cors from "cors";
import express from "express";
import { applyTrpcToExpressApp } from "./lib/trpc.js";
import { trpcRouter } from "./router/index.js";

const app = express();

app.use(cors());

applyTrpcToExpressApp(app, trpcRouter);

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
