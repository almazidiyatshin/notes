import { trpc } from "../lib/trpc.js";
import { createNoteTrpcRoute } from "./createNote/createNoteTrpcRoute.js";
import { getNoteTrpcRoute } from "./getNote/index.js";
import { getNotesTrpcRoute } from "./getNotes/index.js";

export const trpcRouter = trpc.router({
  getNotes: getNotesTrpcRoute,
  getNote: getNoteTrpcRoute,
  createNote: createNoteTrpcRoute,
});

export type TTrpcRouter = typeof trpcRouter;
