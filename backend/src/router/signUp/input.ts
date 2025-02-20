import { z } from "zod";

export const zSignUpTrpcInput = z.object({
  login: z
    .string()
    .min(1, "Login is required!")
    .regex(/^[a-z0-9-]+$/, "Login may contain only lowercase letters, numbers and dashes"),
  password: z.string().min(1, "Password is required!"),
});
