"use client";

import { env } from "~/env";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { useEffect } from "react";

export function PHProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const key = env.NEXT_PUBLIC_POSTHOG_KEY;
    const host = env.NEXT_PUBLIC_POSTHOG_HOST;

    if (key) {
      posthog.init(key, {
        api_host: host,
        capture_pageview: false,
        capture_pageleave: true,
        loaded: (ph) => {
          if (process.env.NODE_ENV === "development") ph.debug();
        },
      });
    }
  }, []);

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
