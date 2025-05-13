import { CronJob } from "cron";
import { type TAppContext } from "./ctx.js";
import { logger } from "./logger.js";

export const applyCron = (ctx: TAppContext) => {
  new CronJob(
    "0 10 1 * *", // At 10:00 on day-of-month 1
    () => {
      logger.info("cron", "Hello!", { ctx });
    },
    null,
    true
  );
};
