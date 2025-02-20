import { type User } from "@prisma/client";
import { type Request } from "express";

export type TExpressRequest = Request & {
  user: User | undefined;
};
