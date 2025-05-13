import { zEmailRequired, zLoginRequired } from "@notes/shared/src/zod.js";
import { z } from "zod";

export const zUpdateProfileTrpcInput = z.object({
  login: zLoginRequired,
  name: z.string().max(50).default(""),
  email: zEmailRequired,
});
