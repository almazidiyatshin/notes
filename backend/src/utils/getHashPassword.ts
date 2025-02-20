import * as crypto from "crypto";

export const getHashPassword = (password: string) => crypto.createHash("sha256").update(password).digest("hex");
