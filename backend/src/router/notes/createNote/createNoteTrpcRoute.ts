import { trpcLoggedProcedure } from "../../../lib/trpc.js";
import { zCreateNoteTrpcInput } from "./input.js";

export const createNoteTrpcRoute = trpcLoggedProcedure.input(zCreateNoteTrpcInput).mutation(async ({ ctx, input }) => {
  if (!ctx.me) {
    throw new Error("UNAUTHORIZED");
  }

  const note = await ctx.prisma.note.create({ data: { ...input, authorId: ctx.me.id } });
  return { note };
});
