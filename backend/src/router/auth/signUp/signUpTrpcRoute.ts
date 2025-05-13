import { EUserPermission } from "@prisma/client";
import { sendWelcomeEmail } from "../../../lib/emails.js";
import { trpcLoggedProcedure } from "../../../lib/trpc.js";
import { getHashPassword } from "../../../utils/getHashPassword.js";
import { signJWT } from "../../../utils/signJWT.js";
import { zSignUpTrpcInput } from "./input.js";

export const signUpTrpcRoute = trpcLoggedProcedure.input(zSignUpTrpcInput).mutation(async ({ ctx, input }) => {
  const exUserByLogin = await ctx.prisma.user.findFirst({ where: { login: input.login } });

  if (exUserByLogin) {
    throw new Error("User already exists");
  }

  const exUserByEmail = await ctx.prisma.user.findFirst({ where: { email: input.email } });

  if (exUserByEmail) {
    throw new Error("User already exists");
  }

  const user = await ctx.prisma.user.create({
    data: {
      login: input.login,
      password: getHashPassword(input.password),
      permissions: [EUserPermission.BASIC],
      email: input.email,
    },
  });

  sendWelcomeEmail({ user });

  const token = signJWT(user.id);

  return { token };
});
