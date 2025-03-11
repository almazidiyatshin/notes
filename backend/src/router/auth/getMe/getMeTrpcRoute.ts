import { toClientMe } from "../../../lib/models.js";
import { trpc } from "../../../lib/trpc.js";

export const getMeTrpcRoute = trpc.procedure.query(async ({ ctx }) => {
  return { me: toClientMe(ctx.me) };
});
