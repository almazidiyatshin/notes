import { toClientMe } from "../../../lib/models.js";
import { trpc } from "../../../lib/trpc.js";
import { zUpdateProfileTrpcInput } from "./input.js";

export const updateProfileTrpcRoute = trpc.procedure.input(zUpdateProfileTrpcInput).mutation(async ({ ctx, input }) => {
  if (!ctx.me) {
    throw new Error("UNAUTHORIZED");
  }

  if (ctx.me.login !== input.login) {
    const exUser = await ctx.prisma.user.findUnique({
      where: {
        login: input.login,
      },
    });

    if (exUser) {
      throw new Error("User with this login already exists");
    }
  }

  const updatedUser = await ctx.prisma.user.update({ where: { id: ctx.me.id }, data: input });
  ctx.me = updatedUser;

  return toClientMe(updatedUser);
});
