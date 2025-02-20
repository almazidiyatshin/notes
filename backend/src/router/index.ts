import { trpc } from "../lib/trpc.js";
import { createNoteTrpcRoute } from "./createNote/createNoteTrpcRoute.js";
import { getMeTrpcRoute } from "./getMe/getMeTrpcRoute.js";
import { getNoteTrpcRoute } from "./getNote/index.js";
import { getNotesTrpcRoute } from "./getNotes/index.js";
import { signInTrpcRoute } from "./signIn/signInTrpcRoute.js";
import { signUpTrpcRoute } from "./signUp/signUpTrpcRoute.js";

export const trpcRouter = trpc.router({
  getNotes: getNotesTrpcRoute,
  getNote: getNoteTrpcRoute,
  createNote: createNoteTrpcRoute,
  signUp: signUpTrpcRoute,
  signIn: signInTrpcRoute,
  getMe: getMeTrpcRoute,
});

export type TTrpcRouter = typeof trpcRouter;
