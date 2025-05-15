import * as Sentry from "@sentry/react";
import { useEffect } from "react";
import { useMe } from "./ctx";
import { env } from "./env";

if (env.VITE_UI_SENTRY_DSN) {
  Sentry.init({
    dsn: env.VITE_UI_SENTRY_DSN,
    environment: env.HOST_ENV,
    normalizeDepth: 10,
    release: env.SOURCE_VERSION,
  });
}

export const sentryCaptureException = (error: Error) => {
  if (env.VITE_UI_SENTRY_DSN) {
    Sentry.captureException(error);
  }
};

export const SentryUser = () => {
  const me = useMe();
  useEffect(() => {
    if (env.VITE_UI_SENTRY_DSN) {
      if (me) {
        Sentry.setUser({
          email: me.email,
          id: me.id,
          ip_address: "{{auto}}",
          username: me.login,
        });
      } else {
        Sentry.setUser(null);
      }
    }
  }, [me]);
  return null;
};
