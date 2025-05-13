import { zStringRequired } from "@notes/shared/src/zod.js";
import { z } from "zod";

export const zUpdatePasswordTrpcInput = z.object({
  oldPassword: zStringRequired,
  newPassword: zStringRequired,
});
