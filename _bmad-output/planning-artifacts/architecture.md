---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
lastStep: 8
status: 'complete'
completedAt: '2026-04-30'
inputDocuments:
  - '_bmad-output/planning-artifacts/prd.md'
  - '_bmad-output/planning-artifacts/research/market-developer-social-platform-research-2026-04-29.md'
workflowType: 'architecture'
project_name: 'BitGuild'
user_name: 'Luis'
date: '2026-04-30'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**
61 FRs across 8 capability areas:
- Identity & Onboarding (FR1–FR6): Class selection, pixel sprite avatars, 5-slot skill tree, API-enforced class constraints
- Guild Operations (FR7–FR19): Formation, role-targeted LFG slots, application flow, tenure recording, milestones
- Quest Board & Discovery (FR20–FR30): Three-tier system (Untested Tier → Rising Lane / Main Board), auto-archive, community flagging, auto-quarantine
- Reputation, Trust & Moderation (FR31–FR35): Configurable reputation gate, rate limiting on earning actions, admin audit tools
- Daily Engagement & Commitment Signals (FR36–FR41): Per-timezone daily reset, idempotent streak tracking, real-time tenure recording, GDPR anonymization on deletion
- Profile & Proof-of-Work (FR42–FR43, V2)
- Subscription Tiers & Access Control (FR44–FR49): RBAC + class constraints enforced at API level; Stripe data model architected in V1
- Platform Administration (FR50–FR55): Moderation queue, reputation audits, suspension/appeal flow

**Non-Functional Requirements:**
20 NFRs across 6 dimensions:
- Performance: 2s page loads, 500ms action responses, 5s guild roster updates, 15-min daily reset window
- Security: TLS, PII-free logs/URLs, OAuth 2.0 + PKCE, OWASP Top 10, GDPR (30-day export / 7-day deletion), PCI DSS SAQ A
- Scalability: V1 = 500 concurrent users; V2 = 10K without re-architecture; indefinite tenure history storage; horizontally scalable job system
- Reliability: 99.5% uptime, 99.9% daily reset success, zero data loss, idempotent streak calculation
- Accessibility: WCAG 2.1 Level AA throughout
- Integration: GitHub OAuth (V1), Stripe (V1), GitHub webhooks + Discord bot (V2, both async/non-blocking)

**Scale & Complexity:**

- Primary domain: Full-stack web platform with real-time features
- Complexity level: Medium-High
- Estimated architectural components: ~8–10 (API server, frontend SPA, PostgreSQL, Redis, background job worker, WebSocket/SSE layer, object storage, admin dashboard, Stripe webhook handler, V2 data pipeline)

### Technical Constraints & Dependencies

- **No mobile app** — desktop-first; responsive layout sufficient for V1
- **No multi-tenancy** — shared instance, user-scoped data ownership
- **Stripe must be architected in V1 data model** even if billing UI ships post-launch
- **Admin-configurable reputation threshold** must not require code deployment to change
- **Streak calculation is timezone-aware** — "daily" relative to user's declared timezone, not UTC
- **GDPR Option A** — anonymize tenure records on deletion, do not erase (consent required at signup)
- **PII must never appear in server logs, error traces, or shareable URLs**
- **Class constraints enforced at API layer**, not solely UI

### Cross-Cutting Concerns Identified

- **Authentication & Authorization:** Dual-layer RBAC + class constraints; GitHub OAuth with PKCE; session management
- **Rate Limiting:** Reputation-earning actions (upvotes, quest posts, guild applications) — API-layer enforcement, not UI
- **Background Job Processing:** Daily reset (per-timezone, idempotent), streak calculation, 7-day quest auto-archive, contribution prompts, V2 Living Intelligence Feed data pipeline
- **Real-Time Updates:** Guild roster changes within 5 seconds (WebSockets or SSE)
- **Data Privacy & Compliance:** GDPR export/deletion, CCPA, PII handling, audit trail for moderation actions
- **Caching:** Quest board feeds, reputation scores, profile data — high-read, lower-write patterns
- **State Machine Logic:** Quest board tier transitions, quarantine workflow, guild slot state management

## Starter Template Evaluation

### Primary Technology Domain

Full-stack web platform with real-time features, background job processing, and complex dual-layer permission enforcement.

### Starter Options Considered

| Option | Strengths | Why Rejected |
|---|---|---|
| T3 Stack (Next.js + tRPC + Prisma + NextAuth + Tailwind) | Type-safe end-to-end, RBAC middleware composable via tRPC | — Selected |
| Next.js standalone (no tRPC) | Simpler REST API | Loses compile-time RBAC safety; more boilerplate for permission middleware |
| Remix + Prisma | Excellent web fundamentals, progressive enhancement | Smaller ecosystem; less out-of-the-box for auth + payments |
| Separate frontend + Hono/Fastify backend | Clean separation, native WebSocket server | Higher operational complexity for a 1-2 engineer team; SSE in Next.js is sufficient |

### Selected Starter: T3 Stack → deployed on Railway

**Rationale:**
- tRPC middleware composability is the cleanest implementation for dual-layer RBAC + class constraints (enforced at API level per FR5, FR49)
- Prisma's type-safe schema handles complex relational queries (tenure history, reputation, quest state machine) without runtime surprises
- NextAuth covers GitHub OAuth + PKCE (NFR-S3) and 2FA extensibility (FR58)
- Tailwind + shadcn/ui accelerates WCAG 2.1 AA-compliant component development (NFR-A1)
- Railway deployment supports persistent Node.js services (required for BullMQ worker + SSE connections) unlike Vercel's serverless timeout constraints

**Initialization Command:**

```bash
npm create t3-app@latest BitGuild
# Prompts: TypeScript ✓ | Tailwind ✓ | tRPC ✓ | Prisma ✓ | NextAuth ✓ | App Router ✓
```

**Then add (first implementation stories):**

```bash
npm install bullmq ioredis stripe @stripe/stripe-js
npm install shadcn/ui    # component library
```

**Architectural Decisions Provided by Starter:**

**Language & Runtime:**
TypeScript throughout — frontend, API procedures, database schema, and background workers share types. Compile-time errors catch permission mismatches before runtime.

**Styling Solution:**
Tailwind CSS (utility-first) + shadcn/ui (accessible, unstyled component primitives). Provides WCAG 2.1 AA baseline. Dark/gritty RotMG theme applied via CSS variables in globals.css — all components inherit without per-component overrides.

**API Layer:**
tRPC with App Router — type-safe procedures with composable middleware. RBAC middleware and class-constraint middleware written once and applied per procedure. No separate API schema or OpenAPI spec needed for internal client-server communication.

**Database ORM:**
Prisma 7 — schema-first, migration-based. Complex relations (users ↔ guilds ↔ tenure records ↔ quests) are type-safe at query time. Enum support handles class types and quest states natively.

**Authentication:**
NextAuth.js — GitHub OAuth provider (primary), credentials provider (email/password fallback). Session strategy: database sessions (required for streak + reputation lookups per request without extra DB calls).

**Build Tooling:**
Next.js 15 (App Router) — React Server Components for quest board feed and profile pages (fast initial load, meets NFR-P1 2s target). Client components only where interactivity is required. Standalone output mode for Railway deployment.

**Background Job Layer (added story):**
BullMQ + Redis — separate worker process. Handles: daily reset per-timezone (cron jobs), streak idempotency (Redis atomic SETNX prevents race conditions per NFR-P4), 7-day quest auto-archive, day-3 contribution prompts. Worker scales horizontally (NFR-SC4) — add more workers, not a new scheduler.

**Real-Time Layer (added story):**
Server-Sent Events via Next.js Route Handlers — guild roster updates pushed to active viewers within 5 seconds (NFR-P5). No external service required. Client reconnects automatically on disconnect.

**Deployment:**
Railway — Next.js service + PostgreSQL (Prisma migrations on deploy) + Redis instance. Persistent process model supports BullMQ worker + long-lived SSE connections. ~$15-45/month at V1 scale (500 concurrent users).

**Code Organization:**
T3 default: `src/server/api/routers/` for tRPC routers, `src/server/api/trpc.ts` for middleware composition, `prisma/schema.prisma` for data model, `src/app/` for Next.js App Router pages and SSE route handlers.

**Development Experience:**
Hot reloading (Next.js dev server), Prisma Studio for database inspection, tRPC panel for procedure testing, BullMQ Board for job queue visibility.

**Note:** Project initialization using the above command should be the first implementation story. Redis + BullMQ worker setup is the second.

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**
- Dual-layer permission enforcement: tRPC middleware (RBAC + class constraints, FR5, FR49)
- Streak race condition prevention: Redis atomic ops — not DB transactions (NFR-P4)
- Database sessions via NextAuth Prisma adapter (per-request role/class lookups)
- Stripe raw Route Handler outside tRPC (signature verification requires raw body)
- BullMQ worker as separate Railway service (persistent process, scales independently)

**Important Decisions (Shape Architecture):**
- Redis caching: reputation scores (5-min TTL), quest board feed (30s TTL), revoked token blacklist
- Rate limiting: `@upstash/ratelimit` sliding window inside tRPC middleware (NFR-S4)
- 2FA: TOTP via `otplib` — encrypted secret in user record, second step post-auth (FR58)
- SSE connection map: in-memory `Map<guildId, Set<Controller>>` on Next.js server (NFR-P5)
- Cursor-based infinite scroll: tRPC `useInfiniteQuery` + Prisma cursor pagination
- CI/CD: GitHub Actions (type-check + lint) → Railway GitHub integration auto-deploy

**Deferred Decisions (Post-MVP):**
- Redis Pub/Sub for SSE fan-out (needed only when multiple Next.js instances required at V2 scale)
- Matching algorithm (V3+ — requires 6+ months of behavioral data)
- Self-hosted PostHog (cloud free tier sufficient through V2)

### Data Architecture

| Decision | Choice | Rationale |
|---|---|---|
| Caching layer | Redis — reputation score cache (5-min TTL), quest board feed (30s TTL), revoked token blacklist | Already provisioned for BullMQ; no second infrastructure piece |
| Session storage | Database sessions via NextAuth Prisma adapter | Per-request reputation + class lookups without extra round trips |
| Streak race condition | Redis atomic `SETNX` / `INCR` | Only atomic ops guarantee no double-increment across concurrent sessions (NFR-P4) |
| Validation | Zod (bundled with T3) — schema shared between client forms and tRPC input | Single source of truth; no duplicated validation logic |

### Authentication & Security

| Decision | Choice | Rationale |
|---|---|---|
| Rate limiting | `@upstash/ratelimit` (sliding window) on Railway Redis | Prevents boundary bursts; runs in tRPC middleware before procedure body (NFR-S4) |
| 2FA | TOTP via `otplib` (Google Authenticator / Authy compatible) | No external service; TOTP secret encrypted in user record; second step after initial auth (FR58) |
| PII in logs | Prisma query logging off in production; Sentry `beforeSend` redacts email/name/profile fields | Satisfies NFR-S2 without a log scrubbing pipeline |
| RBAC enforcement | tRPC middleware layer — `enforceUserIsAuthed`, `enforceReputation`, `enforceClass` middleware composed per procedure | Write once, apply everywhere; compile-time type safety catches missing checks |

### API & Communication Patterns

| Decision | Choice | Rationale |
|---|---|---|
| Error handling | `TRPCError` codes → typed error shapes on client; server errors → Sentry; user-facing messages generic | No stack traces or PII leaked to clients |
| Stripe webhooks | Raw Next.js Route Handler at `/app/api/webhooks/stripe/route.ts` (outside tRPC) | Requires raw body for Stripe signature verification; tRPC parses bodies before procedures |
| SSE connection management | In-memory `Map<guildId, Set<ReadableStreamController>>` on Next.js server; roster mutation pushes to all active controllers | Sufficient for V1 (single Next.js instance); upgrade to Redis Pub/Sub at V2 if horizontal scaling needed |
| Internal API | tRPC only — no REST or GraphQL for client↔server communication | Type-safe end-to-end; permission middleware composable |

### Frontend Architecture

| Decision | Choice | Rationale |
|---|---|---|
| State management | React Query via tRPC (`useQuery`/`useMutation`) for server state; `useState`/`useReducer` for local UI — no Zustand/Redux | RSC handles page-level data; no global store needed for V1 |
| Sprite rendering | Static PNG sprites in `/public/sprites/[class].png`; CSS layering for V2 cosmetic unlocks | CDN-cacheable, no canvas complexity; class determines file at render time |
| Quest board pagination | Cursor-based infinite scroll — tRPC `useInfiniteQuery` + Prisma cursor pagination; "Load more" button (not auto-scroll) | Stable under concurrent inserts; avoids feed overconsumption |
| Forms | React Hook Form + Zod resolvers — schema defined once, shared across client validation and tRPC input | T3 standard pattern; eliminates duplicated validation |

### Infrastructure & Deployment

| Decision | Choice | Rationale |
|---|---|---|
| CI/CD | GitHub Actions (type-check + lint) → Railway GitHub integration auto-deploys `main`; PR preview deployments | Zero-config Railway integration; Actions gate catches type errors before deploy |
| Error monitoring | Sentry (free tier) | Best-in-class Next.js integration; session replay for debugging onboarding; free tier covers V1 volume |
| Analytics | PostHog cloud (free tier) | Tracks exact V1 success metrics: Day-7 retention, streak engagement, quest board funnels |
| Secrets | Railway environment variables (encrypted at rest); `.env.local` for local dev | No separate vault needed at V1 scale |
| DB migrations | `prisma migrate deploy` as Railway pre-deploy command | Migration runs before new code goes live; rollback = redeploy previous version |
| BullMQ worker | Separate Railway service in same project | Independent scaling from web tier; persistent process required |

### Decision Impact Analysis

**Implementation Sequence:**
1. T3 app scaffold + Railway project (Next.js + PostgreSQL + Redis services)
2. Prisma schema (users, guilds, quests, tenure records, sessions, subscriptions)
3. NextAuth setup (GitHub OAuth + credentials + Prisma adapter + database sessions)
4. tRPC middleware stack (auth, RBAC, class constraints, rate limiting)
5. BullMQ worker service (daily reset, streak jobs, auto-archive)
6. Stripe integration (data model + webhook handler + subscription management)
7. SSE Route Handler + connection map (guild roster real-time)
8. Sentry + PostHog instrumentation
9. Core feature routers (identity, guilds, quests, reputation, admin)

**Cross-Component Dependencies:**
- tRPC middleware depends on: NextAuth session (user identity) + Prisma (role/class lookup) + Redis (rate limit state)
- BullMQ jobs depend on: Prisma (user/guild data) + Redis (streak atomic ops) + tRPC not involved (jobs call DB directly)
- SSE depends on: tRPC mutation side effects triggering connection map pushes — guild mutations must call the SSE notifier
- Stripe webhooks depend on: Prisma (subscription record updates) — must update user's Heroic Mode status atomically

## Implementation Patterns & Consistency Rules

### Critical Conflict Points Identified
14 areas where AI agents could make different choices without explicit rules.

---

### Naming Patterns

**Database (Prisma Schema):**
- Model names: PascalCase singular — `User`, `Guild`, `Quest`, `TenureRecord`
- Field names: camelCase — `userId`, `createdAt`, `guildLeadId`
- Foreign keys: camelCase relation field — `userId` not `user_id` or `fk_user`
- Enums: PascalCase — `UserClass`, `QuestStatus`, `GuildSlotStatus`
- IDs: Always `cuid2` via `@default(cuid())` — never auto-increment integers (safe in URLs, globally unique)

```prisma
// ✅ Correct
model Guild {
  id        String   @id @default(cuid())
  leadId    String
  createdAt DateTime @default(now())
}
// ❌ Wrong
model guilds {
  guild_id Int @id @default(autoincrement())
}
```

**tRPC Routers & Procedures:**
- Router names: camelCase + `Router` suffix — `guildRouter`, `questRouter`, `userRouter`
- Procedure names: camelCase verb-noun — `getById`, `create`, `update`, `list`, `delete`
- One router per domain — `guild`, `quest`, `user`, `reputation`, `admin`, `subscription`

```typescript
// ✅ Correct
export const guildRouter = createTRPCRouter({
  getById: protectedProcedure.input(...).query(...),
  create: protectedProcedure.input(...).mutation(...),
  listOpen: publicProcedure.input(...).query(...),
})
// ❌ Wrong
export const GuildRouter = createTRPCRouter({
  GetGuildById: ...,
  guild_create: ...,
})
```

**File & Directory Naming:**
- Next.js route segments: lowercase kebab-case — `/guild/[id]/`, `/quest-board/`
- React components: PascalCase — `GuildCard.tsx`, `QuestBoard.tsx`, `StreakBadge.tsx`
- Server utilities: camelCase — `rateLimit.ts`, `sseManager.ts`, `reputationGate.ts`
- tRPC router files: camelCase — `guild.ts`, `quest.ts` (inside `src/server/api/routers/`)
- BullMQ job files: camelCase + `Job` suffix — `dailyResetJob.ts`, `questArchiveJob.ts`
- Test files: co-located, same name + `.test.ts` — `guildRouter.test.ts` next to `guildRouter.ts`

**TypeScript Code:**
- Components: PascalCase
- Functions/variables: camelCase
- Constants: `UPPER_SNAKE_CASE` — `MAX_SKILL_SLOTS = 5`, `REPUTATION_GATE_DEFAULT = 100`
- Types & Interfaces: PascalCase, no `I` prefix — `GuildMember`, `QuestPayload`
- Enums: PascalCase — `UserClass.BackendWarrior`, `QuestStatus.Untested`

---

### Structure Patterns

**Project Organization (T3 layout extended):**
```
src/
  app/                         # Next.js App Router
    api/
      trpc/[trpc]/route.ts     # tRPC handler
      webhooks/stripe/route.ts # Raw Stripe webhook
      sse/guild/[id]/route.ts  # SSE endpoint per guild
    (auth)/                    # Auth pages group
    (platform)/                # Main app pages group
  components/
    ui/                        # shadcn/ui primitives only
    guild/                     # Guild-specific components
    quest/                     # Quest board components
    profile/                   # Profile components
    admin/                     # Admin dashboard components
    shared/                    # Cross-feature shared components
  server/
    api/
      routers/                 # One file per domain
      trpc.ts                  # Middleware composition
      root.ts                  # Router aggregation
    db.ts                      # Single Prisma instance
    redis.ts                   # Single Redis instance
    sse.ts                     # SSE connection map
  workers/
    index.ts                   # Worker entrypoint
    jobs/                      # One file per job type
  lib/                         # Shared utilities (client + server safe)
  env.js                       # Validated env vars (T3 default)
prisma/
  schema.prisma
```

**Component Organization:**
- Feature components live in `src/components/[feature]/`
- `src/components/ui/` contains **only** shadcn/ui primitives — never custom logic here
- Shared cross-feature components (e.g., `AvatarSprite`, `ReputationBadge`) go in `src/components/shared/`

---

### Format Patterns

**tRPC Responses — no manual wrapping:**
```typescript
// ✅ Correct — return data directly
getById: protectedProcedure
  .input(z.object({ id: z.string() }))
  .query(async ({ ctx, input }) => {
    return ctx.db.guild.findUniqueOrThrow({ where: { id: input.id } })
  }),

// ❌ Wrong — never wrap in {success, data}
  .query(async ({ ctx, input }) => {
    return { success: true, data: guild }  // tRPC already wraps
  }),
```

**Errors — always TRPCError in procedures:**
```typescript
// ✅ Correct
throw new TRPCError({ code: "NOT_FOUND", message: "Guild not found" })
throw new TRPCError({ code: "FORBIDDEN", message: "Class constraint: Wanderers cannot fill engineering slots" })

// ❌ Wrong
throw new Error("Guild not found")   // not typed, no HTTP code
```

**Pagination — always cursor-based:**
```typescript
// ✅ Correct input/output shape for all list procedures
input: z.object({ cursor: z.string().optional(), limit: z.number().min(1).max(50).default(20) })
output: { items: Guild[], nextCursor: string | undefined }

// ❌ Wrong — never offset pagination
input: z.object({ page: z.number(), pageSize: z.number() })
```

**Dates — always Date objects in Prisma, ISO strings over the wire:**
```prisma
// ✅ In schema — always DateTime, never String or Int for dates
createdAt DateTime @default(now())
// tRPC serializes Date to ISO string automatically — no manual conversion needed
```

---

### Communication Patterns

**SSE Event Naming — `namespace:entity:action`:**
```typescript
// ✅ Correct
"guild:roster:updated"
"guild:slot:opened"
"guild:slot:filled"

// ❌ Wrong
"GUILD_ROSTER_UPDATE" | "guildRosterUpdated" | "roster-update"
```

**SSE Event Payload shape:**
```typescript
type SSEEvent<T> = {
  event: string      // e.g. "guild:roster:updated"
  data: T
  timestamp: string  // ISO string
}
```

**BullMQ naming:**
- Queue names: kebab-case — `daily-reset`, `quest-archive`, `contribution-prompt`
- Job names: camelCase — `dailyReset`, `questArchive`, `contributionPrompt`

**tRPC Cache Invalidation — always invalidate, never manual refetch:**
```typescript
// ✅ Correct — after guild roster mutation
await utils.guild.getById.invalidate({ id: guildId })

// ❌ Wrong
await refetch()  // bypasses React Query cache coordination
```

---

### Process Patterns

**Server Components vs tRPC — strict boundary:**
```typescript
// ✅ Server Components: call Prisma directly for initial page data
const guild = await db.guild.findUniqueOrThrow({ where: { id } })

// ✅ Client Components: use tRPC hooks for mutations + reactive queries
const { data } = api.guild.getById.useQuery({ id })
const { mutate } = api.guild.applyToSlot.useMutation()

// ❌ Wrong — never call tRPC from Server Components
```

**Auth in Server Components — shared helper only:**
```typescript
// ✅ Correct — import from shared helper
import { requireAuth } from "~/lib/auth"
const session = await requireAuth()  // throws redirect if unauthenticated

// ❌ Wrong — duplicate getServerSession calls in every page
```

**Environment Variables — always use env object:**
```typescript
// ✅ Correct
import { env } from "~/env"
const stripeKey = env.STRIPE_SECRET_KEY

// ❌ Wrong
const stripeKey = process.env.STRIPE_SECRET_KEY  // not validated, not typed
```

**Singleton Instances — never instantiate directly:**
```typescript
// ✅ Always import from server modules
import { db } from "~/server/db"
import { redis } from "~/server/redis"

// ❌ Wrong
const prisma = new PrismaClient()  // creates new connection pool
const r = new Redis(...)            // creates new connection
```

**Rate Limiting — middleware, not procedure body:**
```typescript
// ✅ Correct — composable middleware
export const rateLimitedProcedure = protectedProcedure.use(reputationRateLimitMiddleware)

// ❌ Wrong — inline per procedure
create: protectedProcedure.mutation(async ({ ctx }) => {
  await checkRateLimit(ctx.session.user.id)  // duplicated everywhere
})
```

**Loading States — tRPC hook state, not useState:**
```typescript
// ✅ Correct
const { data, isLoading, isError } = api.quest.list.useQuery(...)
if (isLoading) return <QuestBoardSkeleton />

// ❌ Wrong
const [loading, setLoading] = useState(false)
```

---

### Enforcement Guidelines

**All AI Agents MUST:**
- Use `cuid2` IDs — never auto-increment integers
- Use `TRPCError` in procedures — never generic `Error`
- Use cursor-based pagination — never offset/page-based
- Import `db` from `~/server/db` and `redis` from `~/server/redis` — never instantiate
- Use `env` object — never `process.env` directly
- Co-locate tests with source files — never in a separate `__tests__/` root
- Call Prisma directly in Server Components — never use tRPC from RSC
- Apply rate limiting in tRPC middleware — never inside procedure body
- Invalidate tRPC cache after mutations — never manually refetch

**Anti-Patterns to Reject in Code Review:**
- `new PrismaClient()` anywhere outside `src/server/db.ts`
- `new Redis(...)` anywhere outside `src/server/redis.ts`
- `process.env.X` outside `src/env.js`
- `throw new Error(...)` inside a tRPC procedure
- `page` / `pageSize` in any pagination input
- `skip`/`take` offset in Prisma queries (use cursor instead)
- `{ success: true, data: ... }` response wrapping in tRPC
- `useState` for loading when tRPC `isLoading` is available

## Project Structure & Boundaries

### Complete Project Directory Structure

```
BitGuild/
├── .github/
│   └── workflows/
│       └── ci.yml                    # Type-check + lint → Railway deploy
├── .env.example
├── .gitignore
├── next.config.js
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── railway.json                      # Railway service config
│
├── prisma/
│   ├── schema.prisma                 # All models: User, Guild, Quest, TenureRecord, Subscription, etc.
│   └── migrations/                   # Prisma migrate output
│
├── public/
│   ├── sprites/                      # Static PNGs per class (FR2)
│   │   ├── backend-warrior.png
│   │   ├── frontend-mage.png
│   │   ├── devops-engineer.png
│   │   ├── fullstack-rogue.png
│   │   ├── ml-alchemist.png
│   │   ├── system-architect.png
│   │   ├── security-sentinel.png
│   │   └── wanderer.png
│   └── icons/
│
└── src/
    ├── env.js                        # Zod-validated env vars — only place process.env is accessed
    ├── middleware.ts                  # Next.js middleware — auth redirect, no PII in URLs
    │
    ├── app/
    │   ├── globals.css               # CSS variables for RotMG gritty dark theme
    │   ├── layout.tsx                # Root layout (PostHog, Sentry providers)
    │   │
    │   ├── api/
    │   │   ├── trpc/[trpc]/route.ts  # tRPC HTTP handler
    │   │   ├── auth/[...nextauth]/route.ts  # NextAuth handler
    │   │   ├── webhooks/
    │   │   │   └── stripe/route.ts   # Raw Stripe webhook (signature verify + subscription sync)
    │   │   └── sse/
    │   │       └── guild/[id]/route.ts  # SSE stream — guild roster events (NFR-P5)
    │   │
    │   ├── (auth)/                   # Unauthenticated page group
    │   │   ├── layout.tsx
    │   │   ├── login/page.tsx        # GitHub OAuth + email/password (FR56, FR57)
    │   │   └── onboarding/
    │   │       ├── page.tsx          # Class selection before account creation (FR1, FR2)
    │   │       └── skill-tree/page.tsx  # 5-slot skill tree setup (FR3)
    │   │
    │   └── (platform)/              # Authenticated app group
    │       ├── layout.tsx            # Sidebar, streak display, nav
    │       ├── page.tsx              # Home dashboard
    │       ├── quest-board/
    │       │   ├── page.tsx          # Main board + Rising Lane tabs (FR20–FR29)
    │       │   └── [id]/page.tsx     # Quest detail + upvote/flag actions
    │       ├── guild/
    │       │   ├── page.tsx          # Guild discovery feed
    │       │   ├── new/page.tsx      # Guild creation + equity agreement (FR7)
    │       │   └── [id]/
    │       │       ├── page.tsx      # Guild profile — live roster, milestones (FR12, FR13)
    │       │       └── settings/page.tsx  # Guild lead management (FR8, FR11, FR16)
    │       ├── profile/
    │       │   ├── page.tsx          # Own profile (editable)
    │       │   └── [username]/page.tsx  # Public profile — tenure history, streak (FR32, FR39)
    │       ├── settings/
    │       │   ├── page.tsx          # Account settings, data export (FR59)
    │       │   ├── security/page.tsx # 2FA enable/disable (FR58)
    │       │   └── subscription/page.tsx  # Heroic Mode billing (FR44–FR48)
    │       └── admin/
    │           ├── layout.tsx        # Admin role gate
    │           ├── page.tsx          # Admin overview
    │           ├── flags/page.tsx    # Flag queue + quarantine actions (FR50, FR51)
    │           ├── reputation/page.tsx  # Reputation audit + threshold config (FR54, FR55)
    │           └── suspensions/page.tsx # Suspension + appeal management (FR52, FR53)
    │
    ├── components/
    │   ├── ui/                       # shadcn/ui primitives ONLY — no custom logic
    │   │   ├── button.tsx
    │   │   ├── card.tsx
    │   │   ├── dialog.tsx
    │   │   ├── input.tsx
    │   │   ├── badge.tsx
    │   │   └── ...
    │   ├── shared/                   # Cross-feature components
    │   │   ├── AvatarSprite.tsx      # Pixel sprite renderer — reads class → PNG (FR2)
    │   │   ├── ReputationBadge.tsx   # Rep score chip (FR32)
    │   │   ├── StreakBadge.tsx       # Active streak counter (FR37)
    │   │   ├── TenureHistory.tsx     # Read-only tenure record list (FR39)
    │   │   ├── SkillTreeDisplay.tsx  # Read-only 5-slot display
    │   │   └── ClassBadge.tsx        # Class name + icon chip
    │   ├── guild/
    │   │   ├── GuildCard.tsx         # Guild list item
    │   │   ├── GuildRoster.tsx       # Live roster — subscribes to SSE (NFR-P5)
    │   │   ├── GuildSlot.tsx         # Filled slot or gray silhouette (FR12)
    │   │   ├── GuildForm.tsx         # Create/edit guild fields (FR7)
    │   │   ├── EquityAgreement.tsx   # Equity declaration at formation (FR7)
    │   │   ├── LFGSlotForm.tsx       # Post role-targeted LFG slot (FR8)
    │   │   ├── ApplicationForm.tsx   # Apply to slot (FR9)
    │   │   ├── ApplicationReview.tsx # Lead reviews applicants + tenure (FR10)
    │   │   └── MilestoneForm.tsx     # Post guild milestone (FR15)
    │   ├── quest/
    │   │   ├── QuestCard.tsx         # Quest list item + tier badge
    │   │   ├── QuestBoard.tsx        # Feed — Main + Rising Lane tabs (FR20–FR24)
    │   │   ├── QuestForm.tsx         # Post quest — standard + Wanderer template (FR20, FR22)
    │   │   ├── QuestTierBadge.tsx    # Untested / Rising Lane / Main / Quarantined
    │   │   ├── UpvoteButton.tsx      # Upvote with rate-limit feedback (FR26)
    │   │   └── FlagButton.tsx        # Flag quest with reason (FR28)
    │   ├── profile/
    │   │   ├── ProfileHeader.tsx     # Sprite + class + username + streak
    │   │   ├── SkillTreeEditor.tsx   # 5-slot selector — enforces MAX_SKILL_SLOTS (FR3, FR4)
    │   │   └── CommitmentHistory.tsx # Full tenure history list (FR39)
    │   ├── onboarding/
    │   │   ├── ClassSelector.tsx     # Class pick — 8 classes, sprite preview (FR1)
    │   │   └── SkillTreeSetup.tsx    # Initial 5-slot skill declaration (FR3)
    │   └── admin/
    │       ├── FlagQueue.tsx         # Flagged quests with context + actions (FR50, FR51)
    │       ├── ReputationAudit.tsx   # Board post ratio audit (FR54)
    │       └── SuspensionPanel.tsx   # Issue/lift/appeal suspensions (FR52, FR53)
    │
    ├── server/
    │   ├── db.ts                     # Single PrismaClient instance (singleton)
    │   ├── redis.ts                  # Single ioredis instance (singleton)
    │   ├── sse.ts                    # Connection map + notifyGuild() function
    │   ├── auth.ts                   # NextAuth config (providers, Prisma adapter, callbacks)
    │   └── api/
    │       ├── root.ts               # Merges all routers
    │       ├── trpc.ts               # createTRPCContext, middleware:
    │       │                         #   enforceUserIsAuthed
    │       │                         #   enforceReputation (main board gate, FR33)
    │       │                         #   enforceClass (Wanderer constraints, FR5)
    │       │                         #   enforceGuildLead
    │       │                         #   enforceAdmin
    │       │                         #   reputationRateLimit (FR35)
    │       └── routers/
    │           ├── user.ts           # Identity, onboarding, auth, GDPR (FR1–FR6, FR56–FR61)
    │           ├── guild.ts          # Guild CRUD, LFG, applications, milestones (FR7–FR19)
    │           ├── quest.ts          # Quest board, tiers, upvotes, flags (FR20–FR29)
    │           ├── reputation.ts     # Reputation scoring, rate limits (FR31–FR35)
    │           ├── engagement.ts     # Streak display, tenure history (FR36–FR41)
    │           ├── subscription.ts   # Heroic Mode, Stripe portal (FR44–FR48)
    │           └── admin.ts          # Flag queue, audits, suspensions (FR50–FR55)
    │
    ├── workers/
    │   ├── index.ts                  # Worker process entry — registers all queues/processors
    │   └── jobs/
    │       ├── dailyResetJob.ts      # Cron: per-timezone reset, idempotent (FR36, NFR-R2, NFR-R4)
    │       ├── streakUpdateJob.ts    # Redis SETNX atomic streak increment/break (FR37, NFR-P4)
    │       ├── questArchiveJob.ts    # 7-day auto-archive for unvoted Untested quests (FR27)
    │       └── contributionPromptJob.ts  # Day-3 streak-break notification (FR38)
    │
    ├── lib/
    │   ├── auth.ts                   # requireAuth() — throws redirect for RSC pages
    │   ├── permissions.ts            # RBAC helpers + class constraint predicates (shared)
    │   ├── reputation.ts             # Reputation score calculation + gate check
    │   ├── stripe.ts                 # Stripe client + createCheckoutSession + portal helpers
    │   └── utils.ts                  # cn(), formatDate(), truncate(), etc.
    │
    └── types/
        ├── index.ts                  # Re-exports
        ├── user.ts                   # UserClass enum, UserProfile, SessionUser
        ├── guild.ts                  # Guild, GuildSlot, GuildMembership, LFGApplication
        └── quest.ts                  # Quest, QuestStatus enum, QuestTier enum
```

---

### Prisma Schema Models

```
User               — id, class (UserClass), reputation, timezone, isDeleted, stripeCustomerId
Guild              — id, leadId, name, domainTags, equityAgreement, level, isActive
GuildMembership    — userId, guildId, class, joinedAt, leftAt (null = active)
GuildSlot          — id, guildId, requiredClass, requiredSkills, status (Open/Filled/Silhouette)
LFGApplication     — id, slotId, applicantId, message, status (Pending/Approved/Rejected)
TenureRecord       — id, userId (nullable after anon), guildId, class, joinedAt, leftAt, anonymized
Quest              — id, authorId, title, body, status (Untested/RisingLane/Main/Archived/Quarantined), upvoteCount, flagCount, isWandererTemplate
QuestUpvote        — userId, questId (unique pair)
QuestFlag          — id, reporterId, questId, reason, resolvedAt
Streak             — userId (unique), currentStreak, longestStreak, lastResetDate
Subscription       — userId, stripeCustomerId, stripePriceId, status, currentPeriodEnd
GuildMilestone     — id, guildId, title, body, postedAt
Session            — NextAuth standard
Account            — NextAuth standard
VerificationToken  — NextAuth standard
```

---

### Architectural Boundaries

**API Boundaries:**

| Boundary | Entry Point | Auth Required | Notes |
|---|---|---|---|
| tRPC API | `/api/trpc/[trpc]` | Per-procedure middleware | All client↔server calls |
| NextAuth | `/api/auth/[...nextauth]` | None | GitHub OAuth + credentials |
| Stripe Webhook | `/api/webhooks/stripe` | Stripe signature | Raw body, outside tRPC |
| SSE Stream | `/api/sse/guild/[id]` | Session cookie | Long-lived, guild-scoped |
| Public pages | `/quest-board`, `/profile/[username]` | None | Read-only, guest browsing |

**Service Boundaries (Railway):**

| Service | Entrypoint | Scales Independently |
|---|---|---|
| `BitGuild-web` | `next start` | Yes — stateless Next.js |
| `BitGuild-worker` | `src/workers/index.ts` | Yes — add workers for job throughput |
| `BitGuild-db` | Managed PostgreSQL | Railway managed |
| `BitGuild-redis` | Managed Redis | Railway managed |

**Data Boundaries:**
- **Prisma (write path):** All DB writes go through tRPC procedures or BullMQ jobs — never raw SQL
- **Redis:** Streaks (atomic ops), rate limit windows, SSE heartbeat keys, session blacklist
- **SSE:** Read-only push from server to client — no bidirectional communication
- **Stripe:** Card data never touches BitGuild servers (PCI DSS SAQ A) — Checkout + Portal hosted by Stripe

---

### Requirements to Structure Mapping

| FR Category | Primary Router | Key Components | Jobs |
|---|---|---|---|
| Identity & Onboarding (FR1–FR6) | `user.ts` | `ClassSelector`, `SkillTreeSetup`, `AvatarSprite` | — |
| Guild Operations (FR7–FR19) | `guild.ts` | `GuildRoster`, `GuildSlot`, `ApplicationReview` | — |
| Quest Board (FR20–FR30) | `quest.ts` | `QuestBoard`, `QuestForm`, `UpvoteButton`, `FlagButton` | `questArchiveJob` |
| Reputation & Moderation (FR31–FR35) | `reputation.ts` | `FlagQueue`, `ReputationAudit` | — |
| Daily Engagement (FR36–FR41) | `engagement.ts` | `StreakBadge`, `TenureHistory` | `dailyResetJob`, `streakUpdateJob`, `contributionPromptJob` |
| Subscriptions (FR44–FR48) | `subscription.ts` | subscription page | Stripe webhook handler |
| Admin (FR50–FR55) | `admin.ts` | `FlagQueue`, `SuspensionPanel`, `ReputationAudit` | — |
| Account & Compliance (FR56–FR61) | `user.ts` | settings pages | GDPR export (async, manual trigger) |

**Cross-Cutting Concerns:**

| Concern | Location |
|---|---|
| RBAC + class constraints | `src/server/api/trpc.ts` — middleware composition |
| Rate limiting | `src/server/api/trpc.ts` — `reputationRateLimit` middleware |
| PII protection | Sentry `beforeSend` in `app/layout.tsx`; Prisma logging off in `src/server/db.ts` |
| GDPR anonymization | `user.ts` router — `deleteAccount` procedure triggers tenure anonymization |
| Stripe subscription sync | `/api/webhooks/stripe/route.ts` — updates `Subscription` model |
| SSE notification | `src/server/sse.ts` — `notifyGuild()` called from guild tRPC mutations |

---

### Data Flow

**Quest board read (Server Component):**
`page.tsx` → `db.quest.findMany()` → RSC renders HTML → client hydrates

**Upvote (Client Component mutation):**
`UpvoteButton` → `api.quest.upvote.useMutation()` → tRPC → `reputationRateLimit` middleware → `db.questUpvote.create()` + `db.quest.update(upvoteCount++)` → tRPC cache invalidate

**Guild roster real-time (SSE):**
Member joins/leaves → `guild.ts` mutation → `notifyGuild(guildId, "guild:roster:updated", payload)` → SSE controller pushes to all active `GuildRoster` clients

**Daily reset (BullMQ):**
`dailyResetJob` cron fires per timezone batch → `db.user.findMany({ where: { timezone } })` → for each user: Redis `SETNX` streak key → `db.streak.update()` → enqueue `contributionPromptJob` if streak broken day 3

**Stripe subscription:**
User clicks upgrade → `subscription.ts` → `createCheckoutSession()` → redirect to Stripe Hosted Checkout → Stripe webhook → `/api/webhooks/stripe` → `db.subscription.upsert()` → user `isHeroicMode` updated

## Architecture Validation Results

### Coherence Validation ✅

**Decision Compatibility:**
All technology choices are mutually compatible. Next.js 15, tRPC, Prisma 7, NextAuth.js, Tailwind, and shadcn/ui form the established T3 ecosystem with no version conflicts. BullMQ + ioredis works natively with Node.js persistent processes on Railway. SSE via Next.js Route Handlers requires no custom server. Stripe + NextAuth operate as independent concerns with no integration conflicts. Sentry and PostHog coexist in root `layout.tsx` without interference.

**Pattern Consistency:**
Naming conventions (PascalCase Prisma models, camelCase fields, cuid2 IDs) align with Prisma and TypeScript conventions throughout. tRPC middleware composition (one middleware per permission concern, composed per procedure) is consistent with T3 patterns. SSE event naming (`namespace:entity:action`) and BullMQ queue/job naming (kebab/camelCase) are internally consistent and clearly distinct.

**Structure Alignment:**
App Router page groups `(auth)/` and `(platform)/` correctly separate unauthenticated and authenticated flows. The BullMQ worker as a separate Railway service correctly handles the persistent process requirement. The Stripe webhook as a raw Route Handler (outside tRPC) correctly addresses the raw body requirement for signature verification.

---

### Requirements Coverage Validation ✅

**Functional Requirements Coverage:**
All 61 FRs are architecturally supported:
- FR1–FR6 (Identity & Onboarding): onboarding pages + ClassSelector + AvatarSprite + user.ts router
- FR7–FR19 (Guild Operations): guild pages + GuildRoster + ApplicationReview + guild.ts router
- FR20–FR30 (Quest Board): quest-board pages + QuestBoard + UpvoteButton + FlagButton + quest.ts + questArchiveJob
- FR31–FR35 (Reputation): reputation.ts router + reputationRateLimit middleware
- FR36–FR41 (Daily Engagement): dailyResetJob + streakUpdateJob + contributionPromptJob + engagement.ts
- FR44–FR48 (Subscriptions): subscription.ts + Stripe webhook handler + Subscription model
- FR49 (RBAC at API): tRPC middleware stack in trpc.ts
- FR50–FR55 (Admin): admin.ts router + admin pages + admin components
- FR56–FR61 (Account & Compliance): NextAuth + user.ts + settings pages + GDPR flows

**Non-Functional Requirements Coverage:**
All 20 NFRs are addressed:
- NFR-P1–P2 (page loads, action latency): RSC initial render + lightweight tRPC mutations
- NFR-P3 (daily reset window): BullMQ timezone-batched cron jobs
- NFR-P4 (streak race conditions): Redis atomic SETNX
- NFR-P5 (5s guild roster): SSE Route Handler + notifyGuild()
- NFR-S1–S7 (Security): TLS via Railway, Sentry beforeSend PII redaction, NextAuth OAuth/PKCE, tRPC middleware rate limiting, Prisma parameterized queries, GDPR flows in user.ts, Stripe Hosted Checkout (PCI DSS SAQ A)
- NFR-SC1–SC4 (Scalability): stateless Next.js + independent worker scaling + PostgreSQL indefinite storage + BullMQ horizontal scale
- NFR-R1–R4 (Reliability): Railway SLA, BullMQ retry + idempotency, PostgreSQL transactions, Redis SETNX idempotency
- NFR-A1–A4 (Accessibility): shadcn/ui WCAG AA baseline, AvatarSprite alt text, CSS variable contrast, keyboard nav
- NFR-I1–I4 (Integrations): NextAuth OAuth resilience, Subscription model for Stripe V1, BullMQ async for V2 webhooks

---

### Gap Analysis Results

**Important Gaps — Resolved:**

**Gap 1: Admin-configurable reputation threshold needs a PlatformConfig model**
FR33 and FR55 require threshold adjustability without code deployment. Resolution: add `PlatformConfig` model to Prisma schema — key/value store for admin-adjustable platform settings. The `enforceReputation` middleware reads from this model (cached in Redis with short TTL). The `admin.ts` router exposes `updateConfig` procedure.

```prisma
model PlatformConfig {
  key       String   @id           // e.g. "reputation_gate_threshold"
  value     String                 // stored as string, parsed by consumer
  updatedAt DateTime @updatedAt
  updatedBy String                 // admin userId who last changed it
}
```

**Gap 2: Class selection pre-account-creation requires sessionStorage bridge**
FR1 requires class selection *before* account creation. Mechanism: unauthenticated visitor selects class at `/onboarding` → `ClassSelector` stores class in `sessionStorage` → user completes GitHub OAuth → NextAuth `signIn` callback reads + clears `sessionStorage` → `user.ts` `completeOnboarding` procedure creates user record with stored class. Agents must implement this exactly — creating the user before class selection violates the core UX requirement.

**Gap 3: Account deletion must be async via BullMQ**
NFR-S6 requires PII removal within 7 days. The `deleteAccount` procedure marks `User.isDeleted: true` immediately (disables login + public visibility), then enqueues `accountDeletionJob` which performs anonymization within the 7-day SLA. Add `accountDeletionJob.ts` to `src/workers/jobs/`. Add `isDeleted Boolean @default(false)` to the `User` model.

---

### Architecture Completeness Checklist

**✅ Requirements Analysis**
- [x] Project context thoroughly analyzed (61 FRs, 20 NFRs, 8 capability areas)
- [x] Scale and complexity assessed (Medium-High, V1 500 → V2 10K without re-arch)
- [x] Technical constraints identified (no mobile, no multi-tenancy, Stripe V1, timezone-aware reset)
- [x] Cross-cutting concerns mapped (RBAC, rate limiting, jobs, real-time, privacy, caching)

**✅ Architectural Decisions**
- [x] Critical decisions documented (stack, deployment, real-time, jobs, auth, payments)
- [x] Technology stack fully specified (T3 + Railway + BullMQ + SSE + Sentry + PostHog)
- [x] Integration patterns defined (Stripe webhook, GitHub OAuth, SSE, BullMQ)
- [x] Performance considerations addressed (RSC, Redis caching, async jobs, cursor pagination)

**✅ Implementation Patterns**
- [x] Naming conventions established (DB, tRPC, files, TypeScript)
- [x] Structure patterns defined (component organization, singleton imports, RSC vs client boundary)
- [x] Communication patterns specified (SSE events, BullMQ queues, tRPC cache invalidation)
- [x] Process patterns documented (error handling, rate limiting, loading states, auth in RSC)

**✅ Project Structure**
- [x] Complete directory structure defined (all files mapped to FRs)
- [x] Component boundaries established (ui/ vs shared/ vs feature/, server/ vs lib/)
- [x] Integration points mapped (API boundaries, service boundaries, data boundaries)
- [x] Requirements to structure mapping complete (all 8 FR categories → routers + components + jobs)

---

### Architecture Readiness Assessment

**Overall Status: READY FOR IMPLEMENTATION**

**Confidence Level: High**

Three gaps identified and resolved within this validation step — none required reversing any prior decision. All additions were additive: one Prisma model, one worker job, one documented pre-auth flow.

**Key Strengths:**
- tRPC middleware composition makes RBAC + class constraints compile-time safe and DRY
- BullMQ worker as a separate Railway service gives independent scaling for job throughput
- Redis atomic ops for streak calculation eliminate the race condition class of bugs entirely
- Cursor-based pagination future-proofs the quest board against concurrent insert anomalies
- SSE without an external service reduces operational surface area at V1 scale

**Areas for Future Enhancement (post-V1):**
- Redis Pub/Sub for SSE fan-out when multiple Next.js instances needed (V2 scale)
- Commitment signal matching algorithm (V3 — requires 6+ months behavioral data)
- Self-hosted PostHog (cloud free tier sufficient through V2)
- Linear integration for quest milestone tracking (V3+)

---

### Implementation Handoff

**AI Agent Guidelines:**
- Follow all architectural decisions exactly as documented — no improvisation on stack choices
- Use implementation patterns as the source of truth for naming, structure, and error handling
- Respect the RSC vs Client Component boundary strictly — Prisma in RSC, tRPC hooks in client
- Every guild mutation must call `notifyGuild()` after the DB write — SSE consistency depends on this
- The `PlatformConfig` model is the only place platform-wide config values live — never hardcode thresholds
- Class selection flow must use `sessionStorage` bridge — do not create User record before class is chosen

**First Implementation Priority:**
```bash
npm create t3-app@latest BitGuild
# Prompts: TypeScript ✓ | Tailwind ✓ | tRPC ✓ | Prisma ✓ | NextAuth ✓ | App Router ✓

npm install bullmq ioredis stripe @stripe/stripe-js otplib
npx shadcn@latest init
```
Then: Railway project setup → PostgreSQL + Redis services → Prisma schema (with PlatformConfig + isDeleted) → NextAuth config → tRPC middleware stack
