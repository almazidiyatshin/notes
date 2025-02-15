import { initTRPC } from "@trpc/server";
import _ from "lodash";
import { z } from "zod";

const trpc = initTRPC.create();

const notes = _.times(100, (i) => ({
  id: `${i + 1}`,
  title: `Note ${i + 1}`,
  text: `Text ${i + 1}`,
}));

export const trpcRouter = trpc.router({
  getNotes: trpc.procedure.query(() => {
    return {
      notes,
    };
  }),
  getNote: trpc.procedure.input(z.object({ id: z.string() })).query(({ input }) => {
    const note = notes.find((note) => note.id === input.id);

    return { note: note || null };
  }),
});

export type TTrpcRouter = typeof trpcRouter;
