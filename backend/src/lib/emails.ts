import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { routes } from "@notes/ui/src/lib/routes.js";
import { type User } from "@prisma/client";
import fg from "fast-glob";
import Handlebars from "handlebars";
import _ from "lodash";
import { env } from "./env.js";
import { logger } from "./logger.js";

// import { sendEmailThroughBrevo } from "./brevo.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getHbrTemplates = _.memoize(async () => {
  const htmlPathsPattern = path.resolve(__dirname, "../emails/dist/**/*.html");
  const htmlPaths = fg.sync(htmlPathsPattern);
  const hbrTemplates: Record<string, HandlebarsTemplateDelegate> = {};
  for (const htmlPath of htmlPaths) {
    const templateName = path.basename(htmlPath, ".html");
    const htmlTemplate = await fs.readFile(htmlPath, "utf8");
    hbrTemplates[templateName] = Handlebars.compile(htmlTemplate);
  }
  return hbrTemplates;
});

const getEmailHtml = async (templateName: string, templateVariables: Record<string, string> = {}) => {
  const hbrTemplates = await getHbrTemplates();
  const hbrTemplate = hbrTemplates[templateName];
  const html = hbrTemplate(templateVariables);
  return html;
};

const sendEmail = async ({
  to,
  subject,
  templateName,
  templateVariables = {},
}: {
  to: string;
  subject: string;
  templateName: string;
  templateVariables?: Record<string, any>;
}) => {
  try {
    const fullTemplateVaraibles = {
      ...templateVariables,
      homeUrl: env.UI_URL,
    };
    const html = await getEmailHtml(templateName, fullTemplateVaraibles);
    // const { loggableResponse } = await sendEmailThroughBrevo({ to, html, subject });
    logger.info("email", "sendEmail", {
      to,
      subject,
      templateName,
      fullTemplateVaraibles,
      html,
      // response: loggableResponse,
    });
    return { ok: true };
  } catch (error) {
    logger.error("email", error, { to, templateName, templateVariables });
    return { ok: false };
  }
};

export const sendWelcomeEmail = async ({ user }: { user: Pick<User, "login" | "email"> }) => {
  return await sendEmail({
    to: user.email,
    subject: "Thanks For Registration!",
    templateName: "welcome",
    templateVariables: {
      userLogin: user.login,
      addNoteUrl: `${env.UI_URL}${routes.createNote()}`,
    },
  });
};
