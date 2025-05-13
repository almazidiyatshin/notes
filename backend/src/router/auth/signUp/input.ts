import { zEmailRequired, zLoginRequired, zStringRequired } from "@notes/shared/src/zod.js";
import { z } from "zod";

export const zSignUpTrpcInput = z.object({
  login: zLoginRequired,
  password: zStringRequired,
  email: zEmailRequired,
});
