# Deferred Work

## Deferred from: code review of 1-1-t3-stack-scaffold-and-dark-forge-design-system (2026-05-01)

- **Client-side Sentry not initialized** — `SentryProvider.tsx` was dead code (never imported). AC3 only requires server error capture. Properly add `sentry.client.config.ts` in Story 6.7 (security hardening story).
- **CSP `unsafe-inline` in production script-src** — nonce-based CSP is the correct fix; requires Next.js middleware for per-request nonces. Assigned to Story 6.7.
- **CI deploy `--detach` means Railway build failures invisible** — standard Railway async pattern. Add a post-deploy health-check polling step in a future ops/CI story.
- **Sentry `beforeSend` does not strip request headers** — `Authorization`, `Cookie`, and other PII-carrying headers not redacted. Add header scrubbing in Story 6.7 alongside broader PII audit.
- **Redis unconditional singleton: double module-eval race + serverless future** — benign on Railway long-running Node process. The globalThis pattern inherently has a TOCTOU window on concurrent cold starts; acceptable trade-off for V1. Revisit if moving to serverless.

## Deferred from: code review of 1-2-class-selector-screen (2026-05-01)

- **`(auth)` route group name implies an auth guard** — spec defines this structure; revisit naming/structure in Story 1.3 when the auth guard is actually added to the layout.
- **`focused` init=0 causes a tabindex flash before `useEffect` restores sessionStorage** — low impact for V1; address if accessibility audit flags it. `ClassSelector.tsx:17`.
- **`window.innerWidth` in `handleKeyDown` goes stale on window resize** — low impact with only 8 items in a fixed grid. `ClassSelector.tsx:38`.
- **`onError` mock in test setup types handler as `() => void`** — any future `onError` handler reading `event.target` will get `undefined`. Fix when expanding image error handling. `src/test/setup.tsx`.
- **Sprite paths are hardcoded strings with no build-time existence check** — AvatarSprite error fallback handles broken images gracefully for V1. `src/types/user.ts`.
- **Empty `alt` prop produces blank AvatarSprite fallback** — out of scope for current callers; guard if component is reused with decorative images. `AvatarSprite.tsx:36`.
- **AvatarSprite error state is permanent, no retry path** — low risk for local placeholder sprites; revisit when real CDN assets are introduced.
- **`aria-multiselectable={false}` not declared on listbox** — ARIA default for listbox is single-select; add for explicitness in a future a11y pass. `ClassSelector.tsx`.
- **`/` unconditional redirect ignores authenticated state** — explicitly deferred to Story 1.3 which adds the auth-aware redirect logic. `src/app/page.tsx`.
- **Pre-existing: `auth.ts` has `providers: []`** — Story 1.3 adds GitHub OAuth provider.
- **Pre-existing: `redis.ts` missing `redis.on("error", ...)` handler** — process crash on ECONNREFUSED; add in a future ops/reliability story.
- **Pre-existing: PostHog double-init in React 18 Strict Mode** — add `posthog.__loaded` guard; assign to Story 6.7 or a monitoring story.

## Deferred from: code review of 1-3-github-oauth-authentication-and-account-creation (2026-05-01)

- **`githubId` field never populated in `createUser`** — schema adds `User.githubId String? @unique` but `createBitGuildAdapter.createUser` only writes email/name/image/class; GitHub ID lives in the `Account` table via `linkAccount`. No active consumers yet; decide whether to denormalize via `linkAccount` override or drop the column in a future story.
- **Soft-deleted users not checked in adapter** — `isDeleted Boolean @default(false)` is schema-only; neither the custom adapter nor base PrismaAdapter filters soft-deleted users on re-sign-in. A unique constraint error will surface if a soft-deleted user tries to re-register with the same email. Belongs to Story 6.6 (Account Deletion with Tenure Anonymization).
- **`user.class` typed as `string | null` in `next-auth.d.ts`** — too permissive; any string passes through the session callback's `PRISMA_TO_TS_CLASS` lookup. Strict typing as `PrismaUserClass | null` creates cross-layer coupling. The `?? null` fallback handles unknown values gracefully for V1; revisit if runtime class validation becomes a security concern.
- **No loading indicator during `hasPendingClass === null` hydration window** — button is disabled with no visual feedback until `useEffect` resolves sessionStorage. UX polish; acceptable SSR behavior for V1. Address in a future UI pass.

## Deferred from: code review of 1-3-github-oauth-authentication-and-account-creation (2026-05-01, human review)

- **Returning-user detection: 30-second `createdAt` heuristic** — `signIn` callback uses `Date.now() - createdAt < 30_000` to distinguish new from returning users; clock skew or slow OAuth could misroute a new user to `/dashboard`. Deferred as acceptable V1 risk. Address with a `justCreated` DB flag or wider window in an auth hardening story. [src/server/auth.ts:78-79]
- **User created with `class = null` when `pendingClass` cookie expires** — if cookie expires before OAuth completes, `createUser` runs without a class; `signIn` redirects to `/onboarding` for retry. Violates strict atomicity (AC2). Deferred; address abort-on-missing-class behavior in a dedicated auth hardening story. [src/server/auth.ts:75]
- **`getToken({ req, raw: true })` discards decoded payload** — works correctly for current cookie-presence check, but any future middleware needing claims (user id, class) must remove `raw: true` first. [src/middleware.ts:6]
- **`TS_TO_PRISMA_CLASS`/`PRISMA_TO_TS_CLASS` have three sync points** — Prisma enum, TS enum, and the map constants must all stay in sync when a new class is added; no compile-time enforcement. Consider generating the map from the Prisma-generated type in a future refactor.
- **No DB transaction wrapping `db.user.create` + cookie clear** — full atomicity not achievable without a Prisma transaction spanning the NextAuth adapter boundary. Platform limitation for V1.
- **`setPendingClass` server action has no rate limiting** — a caller could invoke it in a tight loop to probe valid class values. Platform/infra concern; address in Story 6.7 or a rate-limiting middleware pass.
- **`stripeCustomerId` added to schema without surrounding billing infrastructure** — intentional forward-declaration for Epic 5 (Heroic Mode & Subscriptions); ensure it's wired up in Story 5.1.
