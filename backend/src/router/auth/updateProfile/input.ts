import { z } from "zod";

export const zUpdateProfileTrpcInput = z.object({
  login: z
    .string()
    .min(1, "Login is required!")
    .regex(/^[a-z0-9-]+$/, "Login may contain only lowercase letters, numbers and dashes"),
  name: z.string().max(50).default(""),
});
