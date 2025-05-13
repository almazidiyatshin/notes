import { zStringMin, zStringRequired } from "@notes/shared/src/zod.js";
import { z } from "zod";

export const zCreateNoteTrpcInput = z.object({
  title: zStringRequired,
  text: zStringMin(3),
});
