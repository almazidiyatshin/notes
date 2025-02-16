import _ from "lodash";
import { notes } from "../../lib/notes.js";
import { trpc } from "../../lib/trpc.js";
import { zCreateNoteTrpcInput } from "./input.js";

export const createNoteTrpcRoute = trpc.procedure.input(zCreateNoteTrpcInput).mutation(({ input }) => {
  const note = { ...input, id: _.random().toString() };
  notes.unshift(note);

  return { note };
});
