import { z } from "zod";
import { notes } from "../../lib/notes.js";
import { trpc } from "../../lib/trpc.js";

export const getNoteTrpcRoute = trpc.procedure.input(z.object({ id: z.string() })).query(({ input }) => {
  const note = notes.find((note) => note.id === input.id);

  return { note: note || null };
});
