# Story 1.3: GitHub OAuth Authentication & Account Creation

Status: done

## Story

As a new user who has selected a class,
I want to authenticate with GitHub OAuth so my BitGuild account is created with my chosen class assigned,
so that my identity choice is preserved through the sign-up process.

## Acceptance Criteria

1. **Given** a user has selected a class and clicked "Claim [Class Name]"
   **When** they are presented with the OAuth step
   **Then** GitHub is the primary sign-in option and a "Step 2 of 2 — Create your account" indicator is visible

2. **Given** the user clicks "Sign in with GitHub" and OAuth completes successfully
   **When** the NextAuth `signIn` callback fires
   **Then** a new User record is created with the class read from the `pendingClass` cookie (set from `sessionStorage.pendingClass`)
   **And** the `pendingClass` cookie is cleared
   **And** the user is redirected to `/onboarding/skill-tree`
   **And** the User record is NOT created before the class is read — class assignment is atomic with account creation

3. **Given** the user cancels the GitHub OAuth flow or it fails
   **When** they are redirected back
   **Then** they return to the class selector with the previously selected class still shown (sessionStorage preserved)

4. **Given** a returning user signs in with GitHub
   **When** they complete OAuth
   **Then** they are redirected to the home dashboard — not the class selector (class already assigned)

5. **Given** a GitHub token is revoked or expires mid-session
   **When** the user attempts a protected action
   **Then** they are redirected to re-authenticate without data loss or session corruption (NFR-I1)

## Tasks / Subtasks

- [x] Task 1: Extend Prisma schema — UserClass enum + full User model (AC: #2)
  - [x] Add `UserClass` enum to `prisma/schema.prisma` (8 values, PascalCase)
  - [x] Expand `User` model with all Story 1.3 fields: `class UserClass?`, `reputation Int @default(0)`, `timezone String @default("UTC")`, `isDeleted Boolean @default(false)`, `stripeCustomerId String?`, `githubId String? @unique`
  - [x] Ensure existing `id @default(cuid())`, `name`, `email`, `emailVerified`, `image`, `createdAt`, `updatedAt`, `accounts`, `sessions` relations are preserved
  - [x] Run `npx prisma generate` to update the Prisma client types
  - [x] Note: `prisma migrate dev` requires Railway DB; add migration name `add-user-class-fields`

- [x] Task 2: TypeScript session augmentation (AC: #2, #4)
  - [x] Create `src/types/next-auth.d.ts` to augment `Session` user type with `id: string` and `class: UserClass | null | undefined`
  - [x] Verify tRPC `createTRPCContext` can safely read `ctx.session.user.class`

- [x] Task 3: Server action — setPendingClass cookie (AC: #2)
  - [x] Create `src/app/(auth)/login/actions.ts` as a Server Action (`"use server"`)
  - [x] Export `setPendingClass(cls: string): Promise<void>` — sets HttpOnly cookie `pendingClass` (maxAge 600s, secure in prod, sameSite "lax", path "/")
  - [x] Validate input: only accept values in `Object.values(UserClass)` before setting — reject silently if invalid

- [x] Task 4: Custom NextAuth adapter to assign class at user creation (AC: #2)
  - [x] In `src/server/auth.ts`, create `createBitGuildAdapter()` that wraps `PrismaAdapter(db)`
  - [x] Override `createUser` to: (a) read `pendingClass` cookie via `await cookies()` (Next.js 15), (b) validate it, (c) call `db.user.create` directly with the `class` field included, (d) clear the cookie (`maxAge: 0`)
  - [x] Use this custom adapter instead of the bare `PrismaAdapter(db)`

- [x] Task 5: Configure NextAuth — GitHub provider + callbacks (AC: #1, #2, #4, #5)
  - [x] Add `GitHubProvider({ clientId: env.GITHUB_CLIENT_ID, clientSecret: env.GITHUB_CLIENT_SECRET })` to `providers` array in `src/server/auth.ts`
  - [x] Extend `session` callback to include `class: user.class` in the returned session user object
  - [x] Add `signIn` callback: for returning users (user already has a class), return true; for new users who lack a pendingClass cookie, return "/onboarding" (fallback guard)
  - [x] Keep `pages: { signIn: "/login" }` as-is

- [x] Task 6: Create login page (AC: #1, #3)
  - [x] Create `src/app/(auth)/login/page.tsx` — Client Component
  - [x] On mount: read `sessionStorage.pendingClass`, call `setPendingClass(cls)` server action to set the cookie
  - [x] If no pendingClass in sessionStorage on mount, show inline note: "Go back and pick your class first" with link to `/onboarding`
  - [x] Render: "Step 2 of 2 — Create your account" progress indicator, `<SignInWithGitHub />` button
  - [x] On click: call `signIn("github", { callbackUrl: "/onboarding/skill-tree" })`
  - [x] Apply Dark Forge styling consistent with onboarding page

- [x] Task 7: Create `src/app/(platform)/` route group — dashboard stub (AC: #4)
  - [x] Create `src/app/(platform)/layout.tsx` — Server Component; calls `requireAuth()` from `~/lib/auth`, renders `{children}`
  - [x] Create `src/app/(platform)/dashboard/page.tsx` — placeholder dashboard at `/dashboard` using Dark Forge palette (moved to subdirectory to avoid URL conflict with root `page.tsx`)

- [x] Task 8: Update root page to be auth-aware (AC: #4)
  - [x] Update `src/app/page.tsx` to call `getServerAuthSession()`
  - [x] Authenticated: `redirect("/dashboard")`
  - [x] Unauthenticated: `redirect("/onboarding")`
  - [x] Use `import { getServerAuthSession } from "~/server/auth"` — not direct getServerSession

- [x] Task 9: Create `src/middleware.ts` — route protection (AC: #5)
  - [x] Use `withAuth` from `next-auth/middleware` to protect `(platform)` routes
  - [x] Matcher: protect `/dashboard`, `/guild/:path*`, `/profile/:path*`, `/settings/:path*`, `/quest-board/:path*`, `/admin/:path*`
  - [x] Auth pages (`/login`, `/onboarding`): middleware does NOT guard these (unauthenticated users must reach them)

- [x] Task 10: Tests (AC: #1, #3)
  - [x] Login page unit test: renders "Step 2 of 2", button present, disabled when no sessionStorage value
  - [x] Mock `next-auth/react` `signIn` and server action `setPendingClass`
  - [x] 8 tests passing covering: render, button state, sessionStorage restore, setPendingClass call, signIn call
  - [x] All 25 tests passing (AvatarSprite 7 + LoginPage 8 + ClassSelector 10)

- [x] Task 11: Full validation
  - [x] `tsc --noEmit` clean
  - [x] `eslint . --ext .ts,.tsx --max-warnings 0` clean (also fixed pre-existing `src as string` lint issue in setup.tsx)
  - [x] All tests pass

### Review Findings (AI) — 2026-05-01

- [x] [Review][Patch] Middleware `withAuth` broken with database session strategy — replaced with `getToken({ req, raw: true })` custom middleware [src/middleware.ts]
- [x] [Review][Patch] Cookie cleared before `db.user.create` succeeds — clear moved to after successful DB write [src/server/auth.ts]
- [x] [Review][Patch] Race condition: GitHub button enabled before `setPendingClass` server action resolves — awaited server action before enabling button [src/app/(auth)/login/page.tsx]
- [x] [Review][Patch] AC4 violation: returning user lands on `/onboarding/skill-tree` instead of `/dashboard` — `signIn` callback now returns `"/dashboard"` for returning users (createdAt > 30s) [src/server/auth.ts]
- [x] [Review][Patch] Cookie clear missing `httpOnly`/`secure`/`sameSite` attributes — clear call now matches original set attributes [src/server/auth.ts]
- [x] [Review][Patch] `email` coerced to empty string `""` when null — now throws if email is null [src/server/auth.ts]
- [x] [Review][Patch] `process.env.NODE_ENV` used in server action — replaced with `env.NODE_ENV` from `~/env` in both actions.ts and auth.ts [src/app/(auth)/login/actions.ts, src/server/auth.ts]
- [x] [Review][Patch] `sessionStorage.pendingClass` not cleared after cookie bridge — `removeItem` called after successful `setPendingClass` [src/app/(auth)/login/page.tsx]
- [x] [Review][Defer] `githubId` field never populated in `createUser` [src/server/auth.ts, prisma/schema.prisma] — deferred, pre-existing design gap; GitHub ID is in Account table; no active consumers yet
- [x] [Review][Defer] Soft-deleted users not checked in adapter (`isDeleted` field exists but unused) [src/server/auth.ts] — deferred, belongs to Story 6.6 (Account Deletion)
- [x] [Review][Defer] `user.class` typed as `string | null` in `next-auth.d.ts` instead of `PrismaUserClass | null` [src/types/next-auth.d.ts] — deferred, typing constraint; `?? null` fallback handles unknown values; strict typing creates cross-layer coupling
- [x] [Review][Defer] No loading indicator during `hasPendingClass === null` hydration window — button briefly disabled with no explanation [src/app/(auth)/login/page.tsx] — deferred, UX polish; acceptable SSR behavior for V1

## Dev Notes

### Critical Architectural Rules (inherit from Stories 1.1 and 1.2)

- **`process.env` is FORBIDDEN outside `src/env.js`** — exception: `process.env.NODE_ENV` in client components (build-time constant).
- **Singleton imports only** — `db` from `~/server/db`, `redis` from `~/server/redis`.
- **Never call tRPC from Server Components** — use Prisma directly.
- **`TRPCError` only in procedures** — never generic `Error`.
- **cuid2 IDs always** — `@default(cuid())`.

### Why the Custom Adapter Approach (not signIn callback)

The architecture mandates: "User record must NOT be created before the class is read — class assignment is atomic with account creation." In NextAuth v4, the `signIn` callback fires **after** `createUser` has already been called by the Prisma adapter for new OAuth users. Using `signIn` callback to update a user would mean a transient state where the user exists with `class = null`. The custom adapter override intercepts `createUser` itself, ensuring the User row is created with the class in one SQL INSERT.

### Prisma Schema — Exact New Fields

```prisma
enum UserClass {
  BackendWarrior
  FrontendMage
  DevOpsEngineer
  FullStackRogue
  MLAlchemist
  SystemArchitect
  SecuritySentinel
  Wanderer
}

model User {
  id              String     @id @default(cuid())
  name            String?
  email           String?    @unique
  emailVerified   DateTime?
  image           String?
  githubId        String?    @unique
  class           UserClass?
  reputation      Int        @default(0)
  timezone        String     @default("UTC")
  isDeleted       Boolean    @default(false)
  stripeCustomerId String?
  createdAt       DateTime   @default(now())
  updatedAt       DateTime   @updatedAt
  accounts        Account[]
  sessions        Session[]
}
```

**IMPORTANT:** `UserClass` Prisma enum values use PascalCase (`BackendWarrior`) while `UserClass` TypeScript enum in `src/types/user.ts` uses UPPER_SNAKE_CASE (`BACKEND_WARRIOR`). You MUST map between them. Add a `PRISMA_CLASS_MAP` or handle the mapping in the `createUser` override and session callback.

Add this mapping to `src/types/user.ts` (or a new `src/lib/classMap.ts`):
```typescript
export const TS_TO_PRISMA_CLASS: Record<UserClass, string> = {
  [UserClass.BACKEND_WARRIOR]: "BackendWarrior",
  [UserClass.FRONTEND_MAGE]: "FrontendMage",
  [UserClass.DEVOPS_ENGINEER]: "DevOpsEngineer",
  [UserClass.FULLSTACK_ROGUE]: "FullStackRogue",
  [UserClass.ML_ALCHEMIST]: "MLAlchemist",
  [UserClass.SYSTEM_ARCHITECT]: "SystemArchitect",
  [UserClass.SECURITY_SENTINEL]: "SecuritySentinel",
  [UserClass.WANDERER]: "Wanderer",
}

export const PRISMA_TO_TS_CLASS: Record<string, UserClass> = Object.fromEntries(
  Object.entries(TS_TO_PRISMA_CLASS).map(([k, v]) => [v, k as UserClass])
)
```

### TypeScript Session Augmentation

Create `src/types/next-auth.d.ts`:
```typescript
import { type DefaultSession } from "next-auth"
import { type UserClass } from "~/types/user"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      class?: UserClass | null
    } & DefaultSession["user"]
  }
}
```

### Custom Adapter — Exact Implementation

```typescript
// src/server/auth.ts (relevant section)
import { PrismaAdapter } from "@auth/prisma-adapter"
import { cookies } from "next/headers"
import type { Adapter } from "next-auth/adapters"
import { UserClass, TS_TO_PRISMA_CLASS } from "~/types/user"
import { db } from "~/server/db"

function createBitGuildAdapter(): Adapter {
  const base = PrismaAdapter(db) as Adapter

  return {
    ...base,
    async createUser(data) {
      const cookieStore = cookies()
      const rawClass = cookieStore.get("pendingClass")?.value

      // Map TS enum value to Prisma enum value
      const prismaClass =
        rawClass && Object.values(UserClass).includes(rawClass as UserClass)
          ? TS_TO_PRISMA_CLASS[rawClass as UserClass]
          : undefined

      // Clear cookie immediately (set expired)
      cookieStore.set("pendingClass", "", { maxAge: 0, path: "/" })

      // Single atomic INSERT — user is created WITH class, never without
      return db.user.create({
        data: {
          ...data,
          ...(prismaClass ? { class: prismaClass as import("@prisma/client").UserClass } : {}),
        },
      })
    },
  }
}
```

### NextAuth Config — Full Updated `authOptions`

```typescript
// src/server/auth.ts
import GithubProvider from "next-auth/providers/github"
import { env } from "~/env"
import { PRISMA_TO_TS_CLASS } from "~/types/user"

export const authOptions: NextAuthOptions = {
  adapter: createBitGuildAdapter(),
  session: { strategy: "database" },
  providers: [
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
      // PKCE is automatic in NextAuth for OAuth 2.0 providers; state parameter is managed by NextAuth
    }),
  ],
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
        // Map Prisma enum value back to TypeScript enum
        class: user.class ? PRISMA_TO_TS_CLASS[user.class] ?? null : null,
      },
    }),
    async signIn({ user, account }) {
      // Guard: if new user still has no class after adapter ran (edge case),
      // redirect to class selector
      if (account?.provider === "github") {
        const dbUser = await db.user.findUnique({
          where: { id: user.id },
          select: { class: true },
        })
        if (!dbUser?.class) {
          return "/onboarding" // fallback — class selector
        }
      }
      return true
    },
  },
  pages: {
    signIn: "/login",
  },
}
```

### Session Callback — Updated TypeScript for `trpc.ts`

The existing `trpc.ts` already has:
```typescript
const createInnerTRPCContext = (opts: CreateContextOptions) => {
  return { session: opts.session, db }
}
```

After this story, `ctx.session?.user?.class` is a valid field (typed via `next-auth.d.ts`). No changes to `trpc.ts` are needed — the augmented types handle it.

### Login Page — Exact Implementation

```tsx
// src/app/(auth)/login/page.tsx
"use client"

import { useEffect, useState } from "react"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { UserClass } from "~/types/user"
import { setPendingClass } from "./actions"
import { Button } from "~/components/ui/button"

export default function LoginPage() {
  const [hasPendingClass, setHasPendingClass] = useState<boolean | null>(null)

  useEffect(() => {
    const raw = sessionStorage.getItem("pendingClass")
    if (raw && Object.values(UserClass).includes(raw as UserClass)) {
      // Set cookie server-side so NextAuth callback can read it
      void setPendingClass(raw)
      setHasPendingClass(true)
    } else {
      setHasPendingClass(false)
    }
  }, [])

  return (
    <main id="main-content" className="w-full max-w-md px-4 py-12">
      <div className="mb-8 text-center">
        <p className="text-xs text-text-secondary uppercase tracking-widest mb-2">
          Step 2 of 2 — Create your account
        </p>
        <h1 className="text-2xl font-bold text-text-primary">Join the Guild Hall</h1>
      </div>

      {hasPendingClass === false && (
        <p className="text-sm text-text-secondary text-center mb-6">
          Go back and{" "}
          <Link href="/onboarding" className="text-primary underline">
            pick your class first
          </Link>
          .
        </p>
      )}

      <Button
        className="w-full"
        disabled={hasPendingClass === false}
        onClick={() => signIn("github", { callbackUrl: "/onboarding/skill-tree" })}
      >
        Sign in with GitHub
      </Button>
    </main>
  )
}
```

### Server Action — setPendingClass

```typescript
// src/app/(auth)/login/actions.ts
"use server"

import { cookies } from "next/headers"
import { UserClass } from "~/types/user"

export async function setPendingClass(cls: string): Promise<void> {
  if (!Object.values(UserClass).includes(cls as UserClass)) return
  cookies().set("pendingClass", cls, {
    httpOnly: true,
    maxAge: 600,       // 10 minutes
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  })
}
```

Note: `process.env.NODE_ENV` is allowed here (build-time constant check, not a runtime env read).

### Root Page — Auth-Aware Redirect

```tsx
// src/app/page.tsx
import { redirect } from "next/navigation"
import { getServerAuthSession } from "~/server/auth"

export default async function HomePage() {
  const session = await getServerAuthSession()
  if (session?.user) {
    redirect("/dashboard")
  }
  redirect("/onboarding")
}
```

Route `/dashboard` maps to `src/app/(platform)/page.tsx` (to be created as platform layout stub). Alternatively use `redirect("/")` inside `(platform)` by creating `src/app/(platform)/dashboard/page.tsx`.

**Note:** Pick ONE approach and be consistent. Recommended: create `src/app/(platform)/page.tsx` as the platform home, and have the root page redirect to it if authenticated. Then `src/app/(platform)/` layout applies `requireAuth()`.

### Platform Layout — Auth Guard

```tsx
// src/app/(platform)/layout.tsx
import { requireAuth } from "~/lib/auth"

export default async function PlatformLayout({ children }: { children: React.ReactNode }) {
  await requireAuth() // throws redirect("/login") if not authenticated
  return <>{children}</>
}
```

`requireAuth()` already exists in `src/lib/auth.ts` and calls `getServerAuthSession()` — do not duplicate this logic.

### Middleware — Route Protection

```typescript
// src/middleware.ts
import { withAuth } from "next-auth/middleware"

export default withAuth({
  callbacks: {
    authorized: ({ token }) => !!token,
  },
})

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/guild/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/quest-board/:path*",
    "/admin/:path*",
    "/onboarding/skill-tree/:path*", // skill tree requires auth (user must exist)
  ],
}
```

The `(auth)` route group paths (`/login`, `/onboarding`) are NOT in the matcher — they remain accessible to unauthenticated users.

### Deferred Work from Stories 1.1 and 1.2 That Lands HERE

From `deferred-work.md`:
- **`(auth)` route group naming** — revisit when auth guard is added (this story). The layout does NOT add an auth guard (it was always intentionally open). The `(platform)` group is the authenticated group. No rename needed; the `(auth)` label is just organizational.
- **`/` unconditional redirect** — fix in this story: root page must check session and redirect appropriately (Task 8).
- **`auth.ts` providers: []** — fix in Task 5.

### NFR-S3: PKCE + State Validation

NextAuth v4 handles PKCE and the `state` parameter automatically for OAuth 2.0 providers. No manual implementation required. The GitHub provider in NextAuth uses PKCE by default. Do not attempt to manually manage state.

### What NOT to Build Here

- **Email/password sign-in** — Story 1.4
- **`enforceUserIsAuthed` middleware changes** — already in `trpc.ts` from Story 1.1; no changes needed
- **Full RBAC middleware** — Story 1.6
- **Skill tree tRPC procedure** — Story 1.5 (`completeSkillTree`)
- **`/onboarding/skill-tree` page** — Story 1.5
- **Any guild, quest, or reputation logic**

### Files to Read Before Modifying

- `src/server/auth.ts` — current state (providers: [], minimal callbacks) — MODIFY
- `prisma/schema.prisma` — current User stub — MODIFY
- `src/app/page.tsx` — unconditional redirect — MODIFY
- `src/lib/auth.ts` — `requireAuth()` helper — DO NOT MODIFY (already correct)
- `src/types/user.ts` — `UserClass` enum + `CLASS_META` — ADD mapping constants
- `src/server/api/trpc.ts` — `createTRPCContext` — NO CHANGES NEEDED

### Testing Pattern from Story 1.2

Story 1.2 established Vitest + RTL setup in:
- `vitest.config.ts` — with `~/` alias
- `src/test/setup.tsx` — next/image mock, next/navigation mock, @testing-library/jest-dom

For login page tests, add to `src/test/setup.tsx`:
```typescript
vi.mock("next-auth/react", () => ({ signIn: vi.fn() }))
```

Mock the server action in tests:
```typescript
vi.mock("~/app/(auth)/login/actions", () => ({ setPendingClass: vi.fn() }))
```

### Project Structure Notes

New files this story:
```
src/
  app/
    (auth)/
      login/
        page.tsx          ← NEW — login page (client component)
        actions.ts        ← NEW — setPendingClass server action
    (platform)/
      layout.tsx          ← NEW — auth-guarded layout
      page.tsx            ← NEW — dashboard stub
  middleware.ts           ← NEW — next-auth withAuth route protection
  types/
    next-auth.d.ts        ← NEW — session type augmentation
```

Modified files this story:
```
prisma/schema.prisma      ← ADD UserClass enum + expand User model
src/server/auth.ts        ← ADD GitHub provider + custom adapter + callbacks
src/app/page.tsx          ← UPDATE to auth-aware redirect
src/types/user.ts         ← ADD TS_TO_PRISMA_CLASS + PRISMA_TO_TS_CLASS maps
```

### References

- Epics: Story 1.3 ACs and Notes (UserClass fields, sessionStorage bridge, PKCE) [epics.md — Story 1.3]
- Architecture: Authentication & Security → NextAuth decision [architecture.md]
- Architecture: Gap Analysis → Gap 2 (sessionStorage bridge pattern) [architecture.md]
- Architecture: Project Structure → `(auth)/login/`, `(platform)/`, `middleware.ts` [architecture.md]
- Architecture: Enforcement Rules → cuid2, TRPCError, env object [architecture.md]
- Story 1.1 Dev Notes → singleton imports, env.js rules [1-1-t3-stack-scaffold-and-dark-forge-design-system.md]
- Story 1.2 Dev Notes → UserClass enum values, CLASS_META, sessionStorage key `pendingClass` [1-2-class-selector-screen.md]
- Story 1.2 Deferred → auth redirect, route group naming [deferred-work.md]

## Dev Agent Record

### Agent Model Used

claude-sonnet-4-6 (2026-05-01)

### Debug Log References

- `cookies()` from `next/headers` is async in Next.js 15 — used `await cookies()` in both `createUser` override and `setPendingClass` server action.
- `(platform)/page.tsx` and `app/page.tsx` would both resolve to URL `/` causing a Next.js build conflict — moved dashboard to `(platform)/dashboard/page.tsx` at URL `/dashboard`.
- `Parameters<typeof base.createUser>` fails when `createUser` is typed as `T | undefined` — replaced with explicit `Omit<AdapterUser, "id">` type from `next-auth/adapters`.
- Fixed pre-existing lint issue in `src/test/setup.tsx`: unnecessary `src as string` type assertion.
- `PRISMA_TO_TS_CLASS` map: removed unnecessary `as Record<string, UserClass>` cast (TypeScript inferred correctly from `Object.fromEntries`).

### Completion Notes List

- Task 1: `prisma/schema.prisma` — added `UserClass` enum (8 PascalCase values) and expanded `User` model with `githubId`, `class`, `reputation`, `timezone`, `isDeleted`, `stripeCustomerId`. `prisma generate` succeeded.
- Task 1: `src/types/user.ts` — added `TS_TO_PRISMA_CLASS` and `PRISMA_TO_TS_CLASS` maps for bidirectional enum conversion.
- Task 2: `src/types/next-auth.d.ts` — augments `Session.user` with `id` and `class`; augments `User` with `class?: string | null` for session callback access.
- Task 3: `src/app/(auth)/login/actions.ts` — Server Action `setPendingClass` sets HttpOnly cookie; validates input against `UserClass` values; uses `await cookies()` for Next.js 15.
- Task 4+5: `src/server/auth.ts` — full rewrite: `createBitGuildAdapter()` wraps PrismaAdapter with custom `createUser` that reads `pendingClass` cookie and creates user atomically with class; GitHub provider added; `session` callback maps Prisma→TS class; `signIn` callback guards missing-class edge case.
- Task 6: `src/app/(auth)/login/page.tsx` — Client Component; reads sessionStorage on mount, calls `setPendingClass`, enables/disables button accordingly; calls `signIn("github")` with skill-tree callbackUrl.
- Task 7: `src/app/(platform)/layout.tsx` calls `requireAuth()`; `src/app/(platform)/dashboard/page.tsx` renders placeholder.
- Task 8: `src/app/page.tsx` — async RSC; checks session and redirects to `/dashboard` or `/onboarding`.
- Task 9: `src/middleware.ts` — `withAuth` protects dashboard + guild + profile + settings + quest-board + admin + skill-tree routes.
- Task 10: 8 login page tests passing. Task 11: tsc clean, eslint clean, 25/25 tests pass.

### File List

**New files:**
- `src/types/next-auth.d.ts`
- `src/app/(auth)/login/page.tsx`
- `src/app/(auth)/login/actions.ts`
- `src/app/(auth)/login/login.test.tsx`
- `src/app/(platform)/layout.tsx`
- `src/app/(platform)/dashboard/page.tsx`
- `src/middleware.ts`

**Modified files:**
- `prisma/schema.prisma` — UserClass enum + expanded User model
- `src/server/auth.ts` — full rewrite: custom adapter, GitHub provider, callbacks
- `src/app/page.tsx` — auth-aware redirect (async RSC)
- `src/types/user.ts` — TS_TO_PRISMA_CLASS + PRISMA_TO_TS_CLASS maps
- `src/test/setup.tsx` — fixed pre-existing lint issue (unnecessary `src as string` cast)

## Change Log

| Date | Change |
|------|--------|
| 2026-05-01 | Story created — ready-for-dev |
| 2026-05-01 | All 11 tasks complete — tsc clean, eslint clean, 25/25 tests pass. Story marked review. |
