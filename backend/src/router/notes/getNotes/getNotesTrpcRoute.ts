import { trpc } from "../../../lib/trpc.js";
import { zGetNotesTrpcInput } from "./input.js";

export const getNotesTrpcRoute = trpc.procedure.input(zGetNotesTrpcInput).query(async ({ ctx, input }) => {
  const notes = await ctx.prisma.note.findMany({
    select: {
      id: true,
      title: true,
      text: true,
      serialNumber: true,
    },
    orderBy: [{ createdAt: "desc" }, { serialNumber: "desc" }],
    cursor: input.cursor ? { serialNumber: input.cursor } : undefined,
    take: input.limit + 1,
  });

  const nextNote = notes.at(input.limit);
  const nextCursor = nextNote?.serialNumber;
  const notesExceptNext = notes.slice(0, input.limit);

  return {
    notes: notesExceptNext,
    nextCursor,
  };
});
