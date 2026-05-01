import { env } from "~/env";

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const Sentry = await import("@sentry/nextjs");
    Sentry.init({
      dsn: env.SENTRY_DSN,
      tracesSampleRate: env.NODE_ENV === "production" ? 0.1 : 1.0,
      debug: false,
      beforeSend(event) {
        // Strip PII before transmission (NFR-S2, GDPR)
        if (event.user) {
          delete event.user.email;
          delete event.user.username;
          delete event.user.ip_address;
        }
        if (event.request?.data && typeof event.request.data === "object") {
          const data = event.request.data as Record<string, unknown>;
          delete data.email;
          delete data.name;
          delete data.image;
        }
        return event;
      },
    });
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    const Sentry = await import("@sentry/nextjs");
    Sentry.init({
      dsn: env.SENTRY_DSN,
      tracesSampleRate: env.NODE_ENV === "production" ? 0.1 : 1.0,
      debug: false,
      beforeSend(event) {
        // Strip PII before transmission (NFR-S2, GDPR) — edge runtime parity
        if (event.user) {
          delete event.user.email;
          delete event.user.username;
          delete event.user.ip_address;
        }
        if (event.request?.data && typeof event.request.data === "object") {
          const data = event.request.data as Record<string, unknown>;
          delete data.email;
          delete data.name;
          delete data.image;
        }
        return event;
      },
    });
  }
}
