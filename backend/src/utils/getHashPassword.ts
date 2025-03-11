import * as crypto from "crypto";
import { env } from "../lib/env.js";

export const getHashPassword = (password: string) =>
  crypto.createHash("sha256").update(`${env.PASSWORD_SALT}${password}`).digest("hex");
