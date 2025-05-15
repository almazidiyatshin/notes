import { ExpectedError } from "../../../lib/error.js";
import { trpcLoggedProcedure } from "../../../lib/trpc.js";
import { getHashPassword } from "../../../utils/getHashPassword.js";
import { zUpdatePasswordTrpcInput } from "./input.js";

export const updatePasswordTrpcRoute = trpcLoggedProcedure
  .input(zUpdatePasswordTrpcInput)
  .mutation(async ({ ctx, input }) => {
    if (!ctx.me) {
      throw new Error("UNAUTHORIZED");
    }

    if (ctx.me.password !== getHashPassword(input.oldPassword)) {
      throw new ExpectedError("Wrong old password");
    }

    const updatedUser = await ctx.prisma.user.update({
      where: { id: ctx.me.id },
      data: { password: getHashPassword(input.newPassword) },
    });
    ctx.me = updatedUser;

    return true;
  });
