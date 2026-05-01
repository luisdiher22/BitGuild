"use client";

import { QueryClientProvider, type QueryClient } from "@tanstack/react-query";
import {
  loggerLink,
  unstable_httpBatchStreamLink,
} from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server";
import { useState } from "react";
import superjson from "superjson";

import { env } from "~/env";
import { type AppRouter } from "~/server/api/root";
import { makeQueryClient } from "./query-client";

let clientQueryClientSingleton: QueryClient | undefined = undefined;

const getQueryClient = () => {
  if (typeof window === "undefined") return makeQueryClient();
  return (clientQueryClientSingleton ??= makeQueryClient());
};

export const api = createTRPCReact<AppRouter>();

export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;

function getBaseUrl() {
  if (typeof window !== "undefined") return window.location.origin;
  if (env.NEXT_PUBLIC_APP_URL) return env.NEXT_PUBLIC_APP_URL;
  return "http://localhost:3000";
}

export function TRPCReactProvider(props: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  const [trpcClient] = useState(() =>
    api.createClient({
      links: [
        loggerLink({
          enabled: (op) =>
            process.env.NODE_ENV === "development" ||
            (op.direction === "down" && op.result instanceof Error),
        }),
        unstable_httpBatchStreamLink({
          transformer: superjson,
          url: getBaseUrl() + "/api/trpc",
          headers: () => {
            const headers = new Headers();
            headers.set("x-trpc-source", "nextjs-react");
            return headers;
          },
        }),
      ],
    }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <api.Provider client={trpcClient} queryClient={queryClient}>
        {props.children}
      </api.Provider>
    </QueryClientProvider>
  );
}
