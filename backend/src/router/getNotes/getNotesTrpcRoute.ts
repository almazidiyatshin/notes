import { notes } from "../../lib/notes.js";
import { trpc } from "../../lib/trpc.js";

export const getNotesTrpcRoute = trpc.procedure.query(() => {
  return {
    notes,
  };
});
