import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { createTrpcRouter } from "../lib/trpc.js";
import { getMeTrpcRoute } from "./auth/getMe/getMeTrpcRoute.js";
import { signInTrpcRoute } from "./auth/signIn/signInTrpcRoute.js";
import { signUpTrpcRoute } from "./auth/signUp/signUpTrpcRoute.js";
import { updatePasswordTrpcRoute } from "./auth/updatePassword/updatePasswordTrpcRoute.js";
import { updateProfileTrpcRoute } from "./auth/updateProfile/updateProfileTrpcRoute.js";
import { createNoteTrpcRoute } from "./notes/createNote/createNoteTrpcRoute.js";
import { deleteNoteTrpcRoute } from "./notes/deleteNote/deleteNoteTrpcRoute.js";
import { getNoteTrpcRoute } from "./notes/getNote/index.js";
import { getNotesTrpcRoute } from "./notes/getNotes/index.js";
import { updateNoteTrpcRoute } from "./notes/updateNote/updateNoteTrpcRoute.js";

export const trpcRouter = createTrpcRouter({
  getNotes: getNotesTrpcRoute,
  getNote: getNoteTrpcRoute,
  createNote: createNoteTrpcRoute,
  updateNote: updateNoteTrpcRoute,
  deleteNote: deleteNoteTrpcRoute,
  signUp: signUpTrpcRoute,
  signIn: signInTrpcRoute,
  getMe: getMeTrpcRoute,
  updateProfile: updateProfileTrpcRoute,
  updatePassword: updatePasswordTrpcRoute,
});

export type TTrpcRouter = typeof trpcRouter;
export type TTrpcRouterInput = inferRouterInputs<TTrpcRouter>;
export type TTrpcRouterOutput = inferRouterOutputs<TTrpcRouter>;
