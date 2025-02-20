import { z } from "zod";
import { trpc } from "../../lib/trpc.js";

export const getNoteTrpcRoute = trpc.procedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
  const note = await ctx.prisma.note.findUnique({ where: { id: input.id } });
  return { note };
});
