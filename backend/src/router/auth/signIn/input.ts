import { zLoginRequired, zStringRequired } from "@notes/shared/src/zod.js";
import { z } from "zod";

export const zSignInTrpcInput = z.object({
  login: zLoginRequired,
  password: zStringRequired,
});
