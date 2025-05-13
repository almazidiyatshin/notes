import { trpcLoggedProcedure } from "../../../lib/trpc.js";
import { canEditNote } from "../../../utils/permissions.js";
import { zUpdateNoteTrpcInput } from "./input.js";

export const updateNoteTrpcRoute = trpcLoggedProcedure.input(zUpdateNoteTrpcInput).mutation(async ({ ctx, input }) => {
  const { id, ...noteData } = input;

  if (!ctx.me) {
    throw new Error("UNAUTHORIZED");
  }

  const exNote = await ctx.prisma.note.findUnique({
    where: { id },
  });

  if (!exNote) {
    throw new Error("NOT_FOUND");
  }

  if (!canEditNote(ctx.me, exNote)) {
    throw new Error("NOT_YOUR_NOTE");
  }

  const note = await ctx.prisma.note.update({ where: { id }, data: noteData });
  return { note };
});
