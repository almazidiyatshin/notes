import { zStringRequired } from "@notes/shared/src/zod.js";
import { z } from "zod";

export const zDeleteNoteTrpcInput = z.object({
  id: zStringRequired,
});
