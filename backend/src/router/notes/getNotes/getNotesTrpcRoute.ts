import { trpcLoggedProcedure } from "../../../lib/trpc.js";
import { zGetNotesTrpcInput } from "./input.js";

export const getNotesTrpcRoute = trpcLoggedProcedure.input(zGetNotesTrpcInput).query(async ({ ctx, input }) => {
  if (!ctx.me) {
    throw new Error("UNAUTHORIZED");
  }

  const normalizedSearch = input.search ? input.search.trim().replace(/[\s\n\t]/g, " & ") : undefined;

  const notes = await ctx.prisma.note.findMany({
    select: {
      id: true,
      title: true,
      text: true,
      serialNumber: true,
    },
    where: {
      authorId: ctx.me?.id,
      ...(!!input.search && {
        OR: [
          {
            title: {
              contains: normalizedSearch,
              mode: "insensitive",
            },
          },
          {
            text: {
              contains: normalizedSearch,
              mode: "insensitive",
            },
          },
        ],
      }),
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
