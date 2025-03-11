import { trpc } from "../../../lib/trpc.js";
import { getHashPassword } from "../../../utils/getHashPassword.js";
import { zUpdatePasswordTrpcInput } from "./input.js";

export const updatePasswordTrpcRoute = trpc.procedure
  .input(zUpdatePasswordTrpcInput)
  .mutation(async ({ ctx, input }) => {
    if (!ctx.me) {
      throw new Error("UNAUTHORIZED");
    }

    if (ctx.me.password !== getHashPassword(input.oldPassword)) {
      throw new Error("Wrong old password");
    }

    const updatedUser = await ctx.prisma.user.update({
      where: { id: ctx.me.id },
      data: { password: getHashPassword(input.newPassword) },
    });
    ctx.me = updatedUser;

    return true;
  });
