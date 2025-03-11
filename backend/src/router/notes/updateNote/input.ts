import { z } from "zod";
import { zCreateNoteTrpcInput } from "../createNote/input.js";

export const zUpdateNoteTrpcInput = zCreateNoteTrpcInput.extend({
  id: z.string().min(1, "Id is required!"),
});
