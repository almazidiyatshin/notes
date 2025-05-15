import { zEnvHost, zEnvNonemptyTrimmed, zEnvNonemptyTrimmedRequiredOnNotLocal } from "@notes/shared/src/zod";
import { z } from "zod";

export const zEnv = z.object({
  NODE_ENV: z.enum(["development", "production"]),
  VITE_BACKEND_TRPC_URL: zEnvNonemptyTrimmed,
  VITE_UI_URL: zEnvNonemptyTrimmed,
  HOST_ENV: zEnvHost,
  VITE_UI_SENTRY_DSN: zEnvNonemptyTrimmedRequiredOnNotLocal,
  SOURCE_VERSION: zEnvNonemptyTrimmedRequiredOnNotLocal,
});

export const env = zEnv.parse(process.env);
