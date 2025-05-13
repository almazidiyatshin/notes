import { zStringRequired } from "@notes/shared/src/zod.js";
import { zCreateNoteTrpcInput } from "../createNote/input.js";

export const zUpdateNoteTrpcInput = zCreateNoteTrpcInput.extend({
  id: zStringRequired,
});
