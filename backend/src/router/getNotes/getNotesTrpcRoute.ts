import { trpc } from "../../lib/trpc.js";

export const getNotesTrpcRoute = trpc.procedure.query(async ({ ctx }) => {
  const notes = await ctx.prisma.note.findMany({
    select: {
      id: true,
      title: true,
      text: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return {
    notes,
  };
});
