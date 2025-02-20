import { trpc } from "../../lib/trpc.js";
import { zCreateNoteTrpcInput } from "./input.js";

export const createNoteTrpcRoute = trpc.procedure.input(zCreateNoteTrpcInput).mutation(async ({ ctx, input }) => {
  const note = await ctx.prisma.note.create({ data: input });
  return { note };
});
