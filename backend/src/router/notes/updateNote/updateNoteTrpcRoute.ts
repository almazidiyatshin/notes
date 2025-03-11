import { trpc } from "../../../lib/trpc.js";
import { zUpdateNoteTrpcInput } from "./input.js";

export const updateNoteTrpcRoute = trpc.procedure.input(zUpdateNoteTrpcInput).mutation(async ({ ctx, input }) => {
  const { id, ...noteData } = input;

  if (!ctx.me) {
    throw new Error("UNAUTHORIZED");
  }

  const exNote = await ctx.prisma.note.findUnique({
    where: { id },
  });

  if (!exNote) {
    throw new Error("NOTE_FOUND");
  }

  if (exNote.authorId !== ctx.me.id) {
    throw new Error("NOT_YOUR_NOTE");
  }

  const note = await ctx.prisma.note.update({ where: { id }, data: noteData });
  return { note };
});
