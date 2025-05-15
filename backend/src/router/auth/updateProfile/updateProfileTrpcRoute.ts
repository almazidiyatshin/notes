import { ExpectedError } from "../../../lib/error.js";
import { toClientMe } from "../../../lib/models.js";
import { trpcLoggedProcedure } from "../../../lib/trpc.js";
import { zUpdateProfileTrpcInput } from "./input.js";

export const updateProfileTrpcRoute = trpcLoggedProcedure
  .input(zUpdateProfileTrpcInput)
  .mutation(async ({ ctx, input }) => {
    if (!ctx.me) {
      throw new Error("UNAUTHORIZED");
    }

    if (ctx.me.login !== input.login) {
      const exUserByLogin = await ctx.prisma.user.findUnique({
        where: {
          login: input.login,
        },
      });

      if (exUserByLogin) {
        throw new ExpectedError("User with this login already exists");
      }

      const exUserByEmail = await ctx.prisma.user.findUnique({
        where: {
          email: input.email,
        },
      });

      if (exUserByEmail) {
        throw new ExpectedError("User with this email already exists");
      }
    }

    const updatedUser = await ctx.prisma.user.update({ where: { id: ctx.me.id }, data: input });
    ctx.me = updatedUser;

    return toClientMe(updatedUser);
  });
