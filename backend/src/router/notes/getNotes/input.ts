import { z } from "zod";

export const zGetNotesTrpcInput = z.object({
  limit: z.number().min(1).max(100).default(10),
  cursor: z.coerce.number().optional(),
});
