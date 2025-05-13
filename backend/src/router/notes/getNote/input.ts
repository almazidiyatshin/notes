import { zStringRequired } from "@notes/shared/src/zod.js";
import { z } from "zod";

export const zGetNoteTrpcInput = z.object({
  id: zStringRequired,
});
