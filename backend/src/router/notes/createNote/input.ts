import { z } from "zod";

export const zCreateNoteTrpcInput = z.object({
  title: z.string().min(1, "Title is required!"),
  text: z.string().min(1, "Text is required!"),
});
