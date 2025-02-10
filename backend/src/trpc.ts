import { initTRPC } from "@trpc/server";

const trpc = initTRPC.create();

export const trpcRouter = trpc.router({
  getNotes: trpc.procedure.query(() => {
    return {
      notes: [
        { id: 1, title: "Note 1", text: "Olala1" },
        { id: 2, title: "Note 2", text: "Olala2" },
      ],
    };
  }),
});

export type TTrpcRouter = typeof trpcRouter;
