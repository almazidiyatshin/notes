import { ExpectedError } from "../../../lib/error.js";
import { trpcLoggedProcedure } from "../../../lib/trpc.js";
import { canEditNote } from "../../../utils/permissions.js";
import { zDeleteNoteTrpcInput } from "./input.js";

export const deleteNoteTrpcRoute = trpcLoggedProcedure.input(zDeleteNoteTrpcInput).mutation(async ({ ctx, input }) => {
  const { id } = input;

  if (!ctx.me) {
    throw new Error("UNAUTHORIZED");
  }

  const exNote = await ctx.prisma.note.findUnique({
    where: { id },
  });

  if (!exNote) {
    throw new ExpectedError("NOT_FOUND");
  }

  if (!canEditNote(ctx.me, exNote)) {
    throw new ExpectedError("NOT_YOUR_NOTE");
  }

  await ctx.prisma.note.delete({ where: { id } });
  return {};
});
