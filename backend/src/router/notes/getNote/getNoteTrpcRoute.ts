import { trpcLoggedProcedure } from "../../../lib/trpc.js";
import { zGetNoteTrpcInput } from "./input.js";

export const getNoteTrpcRoute = trpcLoggedProcedure.input(zGetNoteTrpcInput).query(async ({ ctx, input }) => {
  const note = await ctx.prisma.note.findUnique({
    where: { id: input.id },
    include: { author: { select: { id: true, login: true, name: true } } },
  });
  return { note };
});
