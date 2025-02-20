import { trpc } from "../../lib/trpc.js";
import { getHashPassword } from "../../utils/getHashPassword.js";
import { signJWT } from "../../utils/signJWT.js";
import { zSignUpTrpcInput } from "./input.js";

export const signUpTrpcRoute = trpc.procedure.input(zSignUpTrpcInput).mutation(async ({ ctx, input }) => {
  const exUser = await ctx.prisma.user.findFirst({ where: { login: input.login } });

  if (exUser) {
    throw new Error("User already exists");
  }

  const user = await ctx.prisma.user.create({
    data: { login: input.login, password: getHashPassword(input.password) },
  });

  const token = signJWT(user.id);

  return { token };
});
