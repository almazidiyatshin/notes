import { trpcLoggedProcedure } from "../../../lib/trpc.js";
import { getHashPassword } from "../../../utils/getHashPassword.js";
import { signJWT } from "../../../utils/signJWT.js";
import { zSignInTrpcInput } from "./input.js";

export const signInTrpcRoute = trpcLoggedProcedure.input(zSignInTrpcInput).mutation(async ({ ctx, input }) => {
  const user = await ctx.prisma.user.findUnique({
    where: { login: input.login, password: getHashPassword(input.password) },
  });

  if (!user) {
    throw new Error("Wrong login or password");
  }

  const token = signJWT(user.id);

  return { token };
});
