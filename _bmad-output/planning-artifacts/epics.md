---
stepsCompleted: ['step-01-validate-prerequisites', 'step-01-requirements-confirmed', 'step-02-design-epics', 'step-03-epic-1', 'step-03-epic-2', 'step-03-epic-3', 'step-03-epic-4', 'step-03-epic-5', 'step-03-epic-6', 'step-04-final-validation']
inputDocuments:
  - '_bmad-output/planning-artifacts/prd.md'
  - '_bmad-output/planning-artifacts/architecture.md'
  - '_bmad-output/planning-artifacts/ux-design-specification.md'
---

# BitGuild - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for BitGuild, decomposing the requirements from the PRD, UX Design, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

**Identity & Onboarding**
- FR1: A new user can select a class (Backend Warrior, Frontend Mage, DevOps Engineer, Full-Stack Rogue, ML Alchemist, System Architect, Security Sentinel, or Wanderer) before completing account creation
- FR2: A user can view a gritty pixel-art sprite avatar on their profile reflecting their selected class
- FR3: A user can declare up to 5 skill tree selections (languages, frameworks, domains) during onboarding
- FR4: A user can update their skill tree selections after initial onboarding
- FR5: The system enforces class-based capability constraints at the API level — Wanderer class users cannot fill engineering slots or lead technical guilds
- FR6: *(V2)* A user's sprite avatar displays cosmetic unlocks earned through guild shipping achievements — cosmetic only, zero pay-to-win

**Guild Operations**
- FR7: A user can create a guild with declared role slots and a founding equity agreement
- FR8: A guild lead can post role-targeted LFG slots with specific class and skill requirements
- FR9: A user can apply to an open LFG slot with a brief application message
- FR10: A guild lead can approve or reject LFG applications, with access to each applicant's full profile and guild tenure history
- FR11: A guild lead can re-open an LFG slot when a member leaves or becomes inactive
- FR12: A guild member can view the current guild roster including unfilled slots displayed as gray silhouettes
- FR13: Any user can view a guild's public profile including domain tags, active roster, and milestone history
- FR14: Any authenticated user can follow (spectate) a guild's public progress
- FR15: A guild lead can post public guild milestones
- FR16: A guild lead can remove a member from the guild independently of any platform-level suspension
- FR17: A guild member can voluntarily leave a guild
- FR18: *(V2)* The platform tracks guild level progression through defined milestone stages (idea → forming → active → shipped → revenue)
- FR19: *(V2)* The platform broadcasts a "First Kill" celebration server-wide when a guild crosses a defined shipping milestone

**Quest Board & Content Discovery**
- FR20: An established user (above reputation threshold) can post a quest to the main quest board
- FR21: A new user (below reputation threshold) can post a quest to the Rising Lane feed
- FR22: A Wanderer class user can post a quest using a structured problem-statement template (problem statement, market evidence, role needed)
- FR23: Any guest or authenticated user can browse the main quest board (read-only for unauthenticated guests)
- FR24: An established user can browse the Rising Lane feed
- FR25: A new quest automatically starts in the Untested Tier (marked unverified) before graduating to the main board
- FR26: A user can upvote a quest in the Untested Tier or Rising Lane to advance it toward graduation
- FR27: The system automatically archives Untested Tier quests that receive no upvotes within 7 days
- FR28: A user can flag a quest as spam or a content policy violation
- FR29: The platform automatically quarantines a quest that receives 3 flags from established users
- FR30: *(V2)* The platform automatically surfaces validated market pain points from external sources as pre-populated quests with attached evidence

**Reputation, Trust & Moderation**
- FR31: A user earns reputation through upvoted quest posts, guild contributions, completed projects, and community engagement
- FR32: A user's reputation score is visible on their public profile
- FR33: The platform enforces a configurable reputation threshold gating main board posting; adjustable by a platform admin without a code deployment
- FR34: The platform maintains separate Rising Lane and main board feeds, ensuring new accounts are visible to established users who browse Rising Lane
- FR35: The platform rate-limits reputation-earning actions (upvotes, quest posts, guild applications) to prevent automated farming

**Daily Engagement & Commitment Signals**
- FR36: The platform executes a daily reset per user timezone, surfacing new quests and guild contribution prompts
- FR37: A user's active streak counter increments daily and is displayed publicly on their profile
- FR38: The system delivers a contribution prompt to a user on day 3 of a streak break
- FR39: A user's profile displays a complete guild tenure history (project name, class played, duration) without failure or success labels
- FR40: The system records and updates guild tenure history in real time as users join and leave guilds
- FR41: When a user deletes their account, their tenure history entries are anonymized to "Former [Class], [Duration]" — not erased — preserving guild commitment-signal integrity

**Profile & Proof-of-Work**
- FR42: *(V2)* A user can optionally browse and complete Builder Quests — scoped micro-challenges that produce a small shipped artifact
- FR43: *(V2)* Completed Builder Quests display on a user's public profile as proof-of-work artifacts, visible to guild leads reviewing LFG applications

**Subscription Tiers & Access Control**
- FR44: A free-tier user can access all core platform capabilities: browse, join guilds, apply to LFG slots, post quests via Rising Lane, track streaks, and lead 1 active guild
- FR45: A Heroic Mode subscriber can access advanced LFG matching filters (by skill tree, class, tenure patterns)
- FR46: A Heroic Mode subscriber can view a guild analytics dashboard showing contribution activity, streak health, and slot fill velocity
- FR47: A Heroic Mode subscriber's LFG applications are surfaced with priority to guild leads
- FR48: A Heroic Mode subscriber can lead up to 3 active guilds simultaneously
- FR49: The platform enforces role-based access control (Guest, New User, Established User, Wanderer, Heroic Mode, Guild Lead, Platform Admin) at the API level

**Platform Administration**
- FR50: A platform admin can view a moderation flag queue showing flagged content with context (post text, flag reasons, flagger and poster reputation scores)
- FR51: A platform admin can quarantine, approve, or dismiss flagged quests
- FR52: A platform admin can issue and lift user posting suspensions
- FR53: A platform admin can process and resolve user appeals against suspensions
- FR54: A platform admin can run reputation audits showing the percentage of board posts from below-threshold accounts
- FR55: A platform admin can adjust the reputation threshold via platform configuration without a code deployment

**Account Management & Compliance**
- FR56: A user can authenticate using GitHub OAuth as the primary sign-in method
- FR57: A user can authenticate using email and password as a fallback sign-in method
- FR58: A user can enable two-factor authentication on their account
- FR59: A user can export all their personal data on request (GDPR/CCPA compliance)
- FR60: A user can delete their account, triggering the tenure anonymization flow (Option A) and full PII removal
- FR61: The platform maintains a published content policy and DMCA takedown process accessible to all users

### NonFunctional Requirements

**Performance**
- NFR-P1: Quest board feed and user profile pages load within 2 seconds at the 95th percentile under normal load
- NFR-P2: LFG application submission and quest upvote actions return a confirmation response within 500ms at the 95th percentile
- NFR-P3: The daily reset completes for all users within their scheduled timezone window — no user experiences a reset delayed by more than 15 minutes
- NFR-P4: Streak state is consistent across concurrent sessions — no race conditions on streak increment or break; a user opening two tabs simultaneously cannot produce an inconsistent streak value
- NFR-P5: Guild roster updates (member join, leave, slot re-open) reflect on all active viewers within 5 seconds without a manual page refresh

**Security**
- NFR-S1: All data encrypted in transit using TLS 1.2 or higher; all PII and guild data encrypted at rest
- NFR-S2: No PII (name, email, profile data, guild membership) appears in server logs, error traces, or shareable URLs in plaintext
- NFR-S3: GitHub OAuth implementation follows OAuth 2.0 best practices including state parameter validation and PKCE; tokens stored securely, refresh/revocation handled gracefully
- NFR-S4: Rate limiting on all reputation-earning actions enforced at the API layer — not solely the UI — with limits sufficient to make automated farming economically unviable
- NFR-S5: The platform mitigates OWASP Top 10 vulnerabilities — XSS, CSRF, SQL injection, broken authentication — before launch
- NFR-S6: GDPR data export requests fulfilled within 30 days; account deletion and tenure anonymization complete within 7 days of request
- NFR-S7: Stripe payment integration meets PCI DSS SAQ A compliance — card data never touches BitGuild servers; all payment processing delegated to Stripe's hosted elements

**Scalability**
- NFR-SC1: V1 architecture supports 500 concurrent users without measurable performance degradation
- NFR-SC2: System designed to support 10,000 concurrent users (V2 horizon) without re-architecture — horizontal scaling of stateless services possible without schema changes
- NFR-SC3: Guild tenure history records accumulate indefinitely with no hard storage limits per user or per guild
- NFR-SC4: Daily reset job scales horizontally — adding more users requires increasing execution capacity, not re-engineering the scheduling system

**Reliability**
- NFR-R1: Platform availability target is 99.5% uptime, excluding scheduled maintenance windows communicated at least 24 hours in advance
- NFR-R2: The daily reset fires successfully for 99.9% of users on the scheduled day — a failed reset is a P1 incident requiring same-day resolution
- NFR-R3: Zero data loss on quest submissions, guild formation records, LFG applications, and streak records
- NFR-R4: Streak calculation is idempotent — if a reset job retries due to failure, a user's streak must not double-increment or falsely break

**Accessibility**
- NFR-A1: All primary user flows (onboarding, quest board browsing, guild application, profile viewing) conform to WCAG 2.1 Level AA
- NFR-A2: Pixel art sprite avatars include descriptive alt text for screen readers (e.g., "Backend Warrior sprite, [username]")
- NFR-A3: Color contrast ratios for all text and interactive elements meet WCAG 2.1 AA minimums — the gritty RotMG aesthetic must not sacrifice readability
- NFR-A4: All core platform actions are operable via keyboard navigation without requiring a mouse

**Integration**
- NFR-I1: *(V1)* GitHub OAuth token handling is resilient — revoked or expired tokens redirect users to re-authenticate without data loss or session corruption
- NFR-I2: *(V1)* Stripe integration is architected as a first-class payment rail in V1 — the data model and API surface support subscription management without retrofitting
- NFR-I3: *(V2)* GitHub webhook events that fail to process do not block guild functionality — webhook processing is async and failure-tolerant with retry logic
- NFR-I4: *(V2)* Discord bot guild channel creation is non-blocking — if Discord API is unavailable at guild formation, the guild is created successfully and Discord provisioning retries asynchronously

### Additional Requirements

Architecture-derived technical requirements that directly impact epic and story structure:

**Starter Template & Infrastructure Setup**
- T3 Stack selected: `npm create t3-app@latest BitGuild` (TypeScript ✓ | Tailwind ✓ | tRPC ✓ | Prisma ✓ | NextAuth ✓ | App Router ✓) — this is Epic 1, Story 1
- Additional packages: `npm install bullmq ioredis stripe @stripe/stripe-js otplib` + `npx shadcn@latest init` — Epic 1, Story 1 continuation
- Railway project setup: 4 services — BitGuild-web (Next.js), BitGuild-worker (BullMQ, separate service), BitGuild-db (PostgreSQL), BitGuild-redis (Redis)
- CI/CD: GitHub Actions (type-check + lint) → Railway GitHub integration auto-deploy on main; PR preview deployments

**Prisma Schema (all models required in one migration)**
- User, Guild, GuildMembership, GuildSlot, LFGApplication, TenureRecord, Quest, QuestUpvote, QuestFlag, Streak, Subscription, GuildMilestone, PlatformConfig, Session, Account, VerificationToken
- PlatformConfig model required for admin-configurable reputation threshold (key/value store, resolves FR33/FR55 gap)
- User.isDeleted flag required for async account deletion (resolves FR60 gap)
- All IDs: cuid2 via `@default(cuid())` — never auto-increment integers

**Authentication Architecture**
- NextAuth.js with GitHub OAuth provider (primary) + credentials provider (email/password fallback) + Prisma adapter + database sessions
- Class selection pre-account-creation: sessionStorage bridge — class stored before OAuth, preserved across redirect, read in NextAuth `signIn` callback; `completeOnboarding` procedure creates user with stored class (critical: User record must NOT be created before class is chosen)
- 2FA: TOTP via `otplib` (Google Authenticator / Authy compatible), encrypted secret in user record

**tRPC Middleware Stack (enforced at API layer)**
- enforceUserIsAuthed, enforceReputation (main board gate, reads PlatformConfig), enforceClass (Wanderer constraints), enforceGuildLead, enforceAdmin, reputationRateLimit (`@upstash/ratelimit` sliding window)

**Background Job Worker (separate Railway service)**
- BullMQ + ioredis worker process: dailyResetJob (per-timezone cron, idempotent), streakUpdateJob (Redis atomic SETNX — no DB transactions), questArchiveJob (7-day auto-archive), contributionPromptJob (day-3 streak break)
- Account deletion: accountDeletionJob (async, PII removal within 7-day SLA)

**Real-Time Layer**
- Server-Sent Events via Next.js Route Handlers — `src/app/api/sse/guild/[id]/route.ts`
- In-memory `Map<guildId, Set<ReadableStreamController>>` on Next.js server
- Every guild roster mutation MUST call `notifyGuild()` — SSE consistency depends on this
- Queue names: kebab-case (`daily-reset`, `quest-archive`); job names: camelCase

**Stripe Integration**
- Raw Next.js Route Handler at `/app/api/webhooks/stripe/route.ts` (outside tRPC — requires raw body for signature verification)
- Stripe Hosted Checkout + Portal — card data never touches BitGuild servers (PCI DSS SAQ A)
- Data model and API surface must support subscription management without retrofitting in V1

**Monitoring & Observability**
- Sentry (free tier): Next.js integration, `beforeSend` hook redacts email/name/profile fields (satisfies NFR-S2)
- PostHog cloud (free tier): tracks Day-7 retention, streak engagement, quest board funnels

**Enforcement Rules (for all dev stories)**
- Use cuid2 IDs — never auto-increment integers
- Use TRPCError in procedures — never generic Error
- Use cursor-based pagination — never offset/page-based
- Import db from `~/server/db`, redis from `~/server/redis` — never instantiate directly
- Use env object from `~/env` — never `process.env` directly
- Co-locate tests with source files — never in a separate `__tests__/` root
- Apply rate limiting in tRPC middleware — never inside procedure body
- Invalidate tRPC cache after mutations — never manually refetch

### UX Design Requirements

**Component Library (custom — not in shadcn/ui)**
- UX-DR1: Build 7 custom components in `src/components/BitGuild/`: AvatarSprite (32/64/128px, pixel-crisp `image-rendering: pixelated`, amber ring on hover, grayscale inactive, shadcn Avatar fallback on error), GuildSlot (filled member sprite + empty gray silhouette + "?" hat, hover tooltip for reputation gate), TenureBar (proportional duration bar capped at 24 months = 100%, role tag, duration text, `role="img"` ARIA), StreakBadge (amber 1–29 days, gold glow 30+, gray/broken — no red ever, "Resume streak" copy), QuestTierBadge (untested gray / rising lane teal / main board amber), ClassBadge (16px sprite icon + class name), ReputationMeter (amber fill, PlatformConfig threshold value from API never hardcoded, `role="meter"` ARIA)

**Design System Implementation**
- UX-DR2: Apply Dark Forge design system in `globals.css` and `tailwind.config.ts` — 9 CSS variable tokens (background `#0d0f14`, surface `#151820`, border `#2a2d3a`, primary `#c8a862`, secondary `#4a9b8e`, danger `#8b3a3a`, success `#4a7c59`, text-primary `#e8e2d9`, text-secondary `#8a8fa3`), dark-native only (no light mode in V1), Geist body + Geist Mono + Press Start 2P pixel font (class identity label ONLY — one use), 4px spatial rhythm base unit, max-width 1280px container

**Onboarding UX**
- UX-DR3: Implement class selector screen as first impression — 8 class cards with 128×128px sprite preview, instant sprite render on selection, class description copy, "Claim [Class Name]" CTA, "Step 1 of 2" progress indicator, fully keyboard-navigable (arrow keys + Enter), `aria-selected` on active card; sessionStorage bridge preserves class across OAuth redirect

**Quest Board Wayfinding**
- UX-DR4: Implement 3-tier quest board wayfinding — persistent QuestTierBadge on all quest cards, threshold tooltip on tier displays, tier badge 300ms pulse animation on tier change, in-app notification on Main Board graduation; quests never move backward (no tier regression)

**Commitment Signal Display**
- UX-DR5: Implement TenureBar commitment signal display — duration-proportional bars (0–3mo ≤12.5%, 3–12mo 12.5–50%, 12–24mo 50–100%, >24mo capped 100%), role tag, duration text, no outcome labels anywhere, first-view tooltip "Duration and role — you decide what it means"; reading two histories must be possible in under 10 seconds

**Streak Mechanics**
- UX-DR6: Implement StreakBadge with forward-looking shame-free mechanics — amber flame (1–29 days), gold glow + pulse (30+ days), gray (broken, "Resume streak" copy), hidden at 0; day 1–2 break: gray badge + inline prompt only; day 3+: one push notification then silence; active copy always forward-looking ("Day N — keep going"), never backward; no red state anywhere in streak UI

**Guild Page & Application Flow**
- UX-DR7: Implement guild detail page with inline application drawer — sticky "Apply to join" CTA on guild page, right-side Sheet drawer with 600-char textarea, tenure histories of all members visible through backdrop while writing application, focus trapped in drawer, "Abandon application?" confirmation before close; silhouette-to-sprite SSE animation on approval (< 500ms); optimistic UI for upvote (immediate count increment, toast on failure); submit confirms in drawer with no page redirect

**Guild Formation Ceremony**
- UX-DR8: Implement guild formation as ceremony — 4-step flow with step indicator (name/problem, role slots, equity agreement, confirm), equity agreement screen is full-page step (not modal) with larger text and 40% extra vertical padding, copy "This is a social contract, not a legal document", "Declare this guild" CTA label (not "I agree"); Back available at every step

**Reputation Gate UX**
- UX-DR9: Implement reputation gate with contextual path — ReputationMeter always shown with current score + threshold + delta + one specific earning action; format: "You have [X] reputation. [Guild/action] requires [Y]. Post a quest to earn more."; never "You don't have enough reputation"; GuildSlot hover tooltip for ineligible users explaining the gate

**Navigation & Keyboard Shortcuts**
- UX-DR10: Implement top navigation bar — `[Logo] [Quest Board] [Guilds] [Profile] [Notifications] [User menu]`, active state amber 2px bottom border, notification badge amber dot; keyboard shortcuts: `G B` Guild Browse, `G Q` Quest Board, `G P` Profile, `/` Quest search (quest board only), `Esc` close drawer/dialog

**Accessibility Implementation**
- UX-DR11: Implement full WCAG 2.1 AA accessibility — skip link (first `<body>` element, visible on focus only), amber focus ring `focus-visible:ring-2 focus-visible:ring-primary` on all interactive elements, 44×44px minimum touch targets, ARIA landmarks (`<header>`, `<main>`, `<nav aria-label>`, `<section aria-label>`) on every page, all interactive custom components as `<button>` elements (never `<div onClick>`), all CSS transitions wrapped in `@media (prefers-reduced-motion: reduce)` with `animation: none` overrides; information never conveyed by color alone (all state changes pair color with icon + text label)

**Responsive Layouts**
- UX-DR12: Implement responsive layouts for 3 surfaces — quest board (3-column lg → 1-column md), guild browse (3-column lg → 2-column md), profile (2-column desktop → 1-column md); no sm breakpoint targeted; all Tailwind styles written mobile-first even for desktop-only surfaces; container clamps at max-w-[1280px]

**Feedback & Toast System**
- UX-DR13: Implement toast notification system via shadcn/ui Toast — top-right position, specific copy per event (application sent: "Application sent. [Lead] will review your tenure history.", accepted: "[Guild] accepted you. Your silhouette is now filled.", declined: "Your application to [Guild] wasn't accepted this time.", streak broken day 1: "Streak paused. Post a quest or upvote to rebuild.", guild created: "Guild live. Open slots are now visible to the community."); no "failed/rejected" language; no red toasts for streak events; auto-dismiss 4s success/neutral, 8s errors; inline validation on blur only (not keystroke), no success checkmarks

**Empty States**
- UX-DR14: Implement empty states with developer-appropriate direct copy — no sad-face illustrations, no "Looks like nothing's here!"; quest board: "No quests posted yet. Be the first — post a real problem." + CTA; guild browse: "No guilds recruiting right now. Form the first one." + CTA; notifications: "Nothing yet. When guild activity happens, it appears here." (no CTA); tenure history new user: "Your tenure history starts with your first guild. Join one."

### FR Coverage Map

| FR | Epic | Description |
|---|---|---|
| FR1 | Epic 1 | Class selection before account creation |
| FR2 | Epic 1 | Pixel-art sprite avatar on profile |
| FR3 | Epic 1 | 5-slot skill tree declaration during onboarding |
| FR4 | Epic 1 | Update skill tree after initial onboarding |
| FR5 | Epic 1 | API-enforced class constraints (Wanderer restrictions) |
| FR6 | V2 — deferred | Cosmetic sprite unlocks |
| FR7 | Epic 2 | Guild creation with role slots and equity agreement |
| FR8 | Epic 2 | Role-targeted LFG slot posting |
| FR9 | Epic 2 | Apply to LFG slot with application message |
| FR10 | Epic 2 | Guild lead approves/rejects applications with tenure history access |
| FR11 | Epic 2 | Re-open LFG slot on member departure |
| FR12 | Epic 2 | Guild roster view with silhouette slots |
| FR13 | Epic 2 | Guild public profile (domain tags, roster, milestones) |
| FR14 | Epic 2 | Spectate/follow a guild's public progress |
| FR15 | Epic 2 | Guild lead posts public milestones |
| FR16 | Epic 2 | Guild lead removes member independently of platform suspension |
| FR17 | Epic 2 | Guild member voluntarily leaves a guild |
| FR18 | V2 — deferred | Guild level progression |
| FR19 | V2 — deferred | First Kill broadcast |
| FR20 | Epic 3 | Established user posts to main quest board |
| FR21 | Epic 3 | New user posts to Rising Lane feed |
| FR22 | Epic 3 | Wanderer structured quest template |
| FR23 | Epic 3 | Guest and authenticated users browse main quest board |
| FR24 | Epic 3 | Established users browse Rising Lane |
| FR25 | Epic 3 | New quests start in Untested Tier |
| FR26 | Epic 3 | Upvote quests to advance toward graduation |
| FR27 | Epic 3 | 7-day auto-archive for unvoted Untested quests |
| FR28 | Epic 3 | Community flagging (spam / content policy) |
| FR29 | Epic 3 | 3-flag auto-quarantine from established users |
| FR30 | V2 — deferred | Living Intelligence Feed |
| FR31 | Epic 3 | Reputation earning through platform actions |
| FR32 | Epic 3 | Reputation score visible on public profile |
| FR33 | Epic 3 | Admin-configurable reputation threshold (no code deploy) |
| FR34 | Epic 3 | Separate Rising Lane and main board feeds |
| FR35 | Epic 3 | API-layer rate limiting on reputation-earning actions |
| FR36 | Epic 4 | Per-timezone daily reset |
| FR37 | Epic 4 | Daily streak counter, increments and displays publicly |
| FR38 | Epic 4 | Day-3 streak-break contribution prompt |
| FR39 | Epic 2 | Profile displays complete guild tenure history (no outcome labels) |
| FR40 | Epic 2 | Real-time tenure history recording on join/leave |
| FR41 | Epic 6 | Account deletion anonymizes tenure to "Former [Class], [Duration]" |
| FR42 | V2 — deferred | Builder Quests proof-of-work catalog |
| FR43 | V2 — deferred | Builder Quest artifacts on profile |
| FR44 | Epic 5 | Free tier baseline access (enforced by default) |
| FR45 | Epic 5 | Heroic Mode advanced LFG matching filters |
| FR46 | Epic 5 | Heroic Mode guild analytics dashboard |
| FR47 | Epic 5 | Heroic Mode priority LFG placement |
| FR48 | Epic 5 | Heroic Mode lead up to 3 guilds simultaneously |
| FR49 | Epic 1 | RBAC enforcement at API level (all 7 roles) |
| FR50 | Epic 6 | Admin flag queue with context |
| FR51 | Epic 6 | Admin quarantine/approve/dismiss flagged quests |
| FR52 | Epic 6 | Admin issue and lift user posting suspensions |
| FR53 | Epic 6 | Admin process user appeals |
| FR54 | Epic 6 | Admin reputation audit (below-threshold post percentage) |
| FR55 | Epic 6 | Admin adjust reputation threshold via config (no code deploy) |
| FR56 | Epic 1 | GitHub OAuth primary sign-in |
| FR57 | Epic 1 | Email/password fallback sign-in |
| FR58 | Epic 6 | Two-factor authentication (TOTP) |
| FR59 | Epic 6 | GDPR/CCPA personal data export |
| FR60 | Epic 6 | Account deletion with tenure anonymization + PII removal |
| FR61 | Epic 6 | Published content policy and DMCA takedown process |

## Epic List

### Epic 1: Foundation, Auth & Developer Identity
Users can sign up to BitGuild as a classed developer with a pixel sprite and 5-slot skill tree — the complete first impression and the aha moment.
**FRs covered:** FR1, FR2, FR3, FR4, FR5, FR49, FR56, FR57
**Architecture:** T3 Stack scaffold, Railway project + CI/CD, Prisma schema (all models), NextAuth (GitHub OAuth + credentials + Prisma adapter), tRPC middleware stack (enforceUserIsAuthed, enforceReputation, enforceClass, enforceGuildLead, enforceAdmin, reputationRateLimit), Sentry + PostHog instrumentation
**UX:** Dark Forge design system (globals.css, tailwind.config.ts), class selector screen, AvatarSprite + ClassBadge components, skill tree editor, top navigation bar, keyboard shortcuts, accessibility foundation (skip link, focus ring, ARIA landmarks), responsive layout setup

### Epic 2: Guild Formation & Team Mechanics
Users can form a guild, declare role slots, recruit members via LFG, review applicant tenure histories, and see a live roster — the core social contract.
**FRs covered:** FR7, FR8, FR9, FR10, FR11, FR12, FR13, FR14, FR15, FR16, FR17, FR39, FR40
**Architecture:** guild.ts tRPC router, SSE Route Handler (`/api/sse/guild/[id]`), `notifyGuild()` function, SSE connection map
**UX:** GuildSlot component, TenureBar component, inline application drawer (Sheet), guild formation ceremony (4-step, equity agreement full-page step), guild browse grid, guild detail page with sticky CTA

### Epic 3: Quest Board & Community Trust
Users can post quests, discover opportunities, and the community maintains signal quality through reputation gating, upvoting, and flagging.
**FRs covered:** FR20, FR21, FR22, FR23, FR24, FR25, FR26, FR27, FR28, FR29, FR31, FR32, FR33, FR34, FR35
**Architecture:** quest.ts + reputation.ts tRPC routers, BullMQ worker setup, questArchiveJob (7-day auto-archive)
**UX:** QuestTierBadge component, ReputationMeter component, QuestBoard, QuestForm (standard + Wanderer template), UpvoteButton, FlagButton, 3-tier wayfinding, reputation gate contextual UX

### Epic 4: Daily Engagement & Accountability Loop
Users have a daily return habit with streak tracking, contribution prompts, and the guild accountability loop fires reliably.
**FRs covered:** FR36, FR37, FR38
**Architecture:** dailyResetJob (per-timezone cron, idempotent), streakUpdateJob (Redis atomic SETNX), contributionPromptJob (day-3 streak break), engagement.ts tRPC router
**UX:** StreakBadge component (all states — amber/gold glow/gray, no red ever), daily dashboard layout (streak + guild activity above fold), shame-free streak recovery UX, toast notification system, empty state copy

### Epic 5: Heroic Mode & Subscriptions
Users can upgrade to Heroic Mode for advanced guild analytics, priority LFG placement, and multi-guild leadership.
**FRs covered:** FR44, FR45, FR46, FR47, FR48
**Architecture:** subscription.ts tRPC router, Stripe Hosted Checkout + Portal, raw Stripe webhook Route Handler (`/api/webhooks/stripe`), Subscription Prisma model, accountDeletionJob for async PII removal
**NFRs:** NFR-S7 (PCI DSS SAQ A), NFR-I2 (Stripe as first-class payment rail)

### Epic 6: Platform Administration & Compliance
The platform is safe, legally compliant, and administrators can moderate content, manage accounts, and enforce community standards.
**FRs covered:** FR41, FR50, FR51, FR52, FR53, FR54, FR55, FR58, FR59, FR60, FR61
**Architecture:** admin.ts tRPC router, accountDeletionJob (async PII removal within 7-day GDPR SLA), GDPR export flow, Sentry `beforeSend` PII redaction, Prisma query logging off in production
**NFRs:** NFR-S2 (no PII in logs/URLs), NFR-S5 (OWASP Top 10), NFR-S6 (GDPR 30-day export / 7-day deletion)

---

## Epic 1: Foundation, Auth & Developer Identity

Users can sign up to BitGuild as a classed developer with a pixel sprite and 5-slot skill tree — the complete first impression and the aha moment.

### Story 1.1: T3 Stack Scaffold & Dark Forge Design System

As a developer building BitGuild,
I want the T3 Stack initialized with the Dark Forge design system, CI/CD, and observability configured,
So that all subsequent features have a production-ready foundation with consistent dark visual identity.

**Acceptance Criteria:**

**Given** a new project directory
**When** the developer runs `npm create t3-app@latest BitGuild` (TypeScript, Tailwind, tRPC, Prisma, NextAuth, App Router) and installs `bullmq ioredis stripe @stripe/stripe-js otplib` + `npx shadcn@latest init`
**Then** the project builds without errors and `next dev` starts on localhost:3000
**And** Railway project has 4 services: BitGuild-web, BitGuild-worker, BitGuild-db (PostgreSQL), BitGuild-redis
**And** GitHub Actions CI workflow runs type-check + lint on every PR and auto-deploys `main` to Railway

**Given** the project is scaffolded
**When** a developer views the running app
**Then** the root page renders using the Dark Forge palette — background `#0d0f14`, surface `#151820`, primary amber `#c8a862`
**And** all 9 CSS variable tokens are defined in `globals.css` and referenced via `tailwind.config.ts` theme extension
**And** Geist, Geist Mono, and Press Start 2P fonts load via Next.js font optimization with zero FOUT

**Given** the app is running
**When** a server error occurs
**Then** Sentry captures it; `beforeSend` hook redacts `email`, `name`, and profile fields before transmission (NFR-S2)
**And** PostHog is initialized in root `layout.tsx`

**Given** the developer runs `prisma migrate dev`
**Then** NextAuth standard tables (Session, Account, VerificationToken) and a minimal User stub exist in PostgreSQL — no other tables created yet
**And** `src/server/db.ts` exports a singleton PrismaClient; `src/server/redis.ts` exports a singleton ioredis instance
**And** `src/env.js` validates all env vars with Zod — `process.env` is never accessed directly elsewhere in the codebase

---

### Story 1.2: Class Selector Screen

As a new visitor to BitGuild,
I want to select my developer class and see my pixel sprite render instantly before creating an account,
So that my identity is established before I commit to the platform.

**Acceptance Criteria:**

**Given** an unauthenticated user visits the home page (`/`)
**When** the page loads
**Then** the class selector screen is the first full-screen view — no auth gate before this screen
**And** all 8 class cards are visible: Backend Warrior, Frontend Mage, DevOps Engineer, Full-Stack Rogue, ML Alchemist, System Architect, Security Sentinel, Wanderer
**And** each card shows the class name, description, and a 128×128px pixel sprite with `image-rendering: pixelated` (never blurred)
**And** a "Step 1 of 2 — Pick your class" progress indicator is visible

**Given** the class selector is displayed
**When** a user clicks a class card
**Then** the card shows an amber ring highlight
**And** the selected class is stored in `sessionStorage` under key `pendingClass`
**And** a "Claim [Class Name]" primary CTA button activates

**Given** a user selects a class and navigates away without completing OAuth
**When** they return to the class selector
**Then** the previously selected class is restored from `sessionStorage` and shown as active

**Given** the class selector is displayed
**When** a user navigates via keyboard (arrow keys, Enter to select)
**Then** all class cards are focusable; `aria-selected="true"` is set on the active card
**And** the amber focus ring `focus-visible:ring-2 focus-visible:ring-primary` is visible on the focused card
**And** the skip link `<a href="#main-content">` is the first `<body>` element, visible on focus only

**Notes:** `ClassSelector.tsx` in `src/components/onboarding/`. `AvatarSprite.tsx` in `src/components/BitGuild/` introduced here. Wanderer card copy: *"You spot the gaps others miss. You can't fill the Backend slot, but you can define the quest that makes it worth filling."*

---

### Story 1.3: GitHub OAuth Authentication & Account Creation

As a new user who has selected a class,
I want to authenticate with GitHub OAuth so my BitGuild account is created with my chosen class assigned,
So that my identity choice is preserved through the sign-up process.

**Acceptance Criteria:**

**Given** a user has selected a class and clicked "Claim [Class Name]"
**When** they are presented with the OAuth step
**Then** GitHub is the primary sign-in option and a "Step 2 of 2 — Create your account" indicator is visible

**Given** the user clicks "Sign in with GitHub" and OAuth completes successfully
**When** the NextAuth `signIn` callback fires
**Then** a new User record is created with the class read from `sessionStorage.pendingClass`
**And** `sessionStorage.pendingClass` is cleared
**And** the user is redirected to `/onboarding/skill-tree`
**And** the User record is NOT created before the class is read — class assignment is atomic with account creation

**Given** the user cancels the GitHub OAuth flow or it fails
**When** they are redirected back
**Then** they return to the class selector with the previously selected class still shown (sessionStorage preserved)

**Given** a returning user signs in with GitHub
**When** they complete OAuth
**Then** they are redirected to the home dashboard — not the class selector (class already assigned)

**Given** a GitHub token is revoked or expires mid-session
**When** the user attempts a protected action
**Then** they are redirected to re-authenticate without data loss or session corruption (NFR-I1)

**Notes:** NextAuth GitHub provider with PKCE + state parameter validation (NFR-S3). Database sessions via Prisma adapter. User model fields added: `id (cuid2)`, `class (UserClass enum)`, `email`, `name`, `githubId`, `reputation Int default 0`, `timezone String`, `isDeleted Boolean default false`, `stripeCustomerId String?`, `createdAt`, `updatedAt`. UserClass enum: `BackendWarrior | FrontendMage | DevOpsEngineer | FullStackRogue | MLAlchemist | SystemArchitect | SecuritySentinel | Wanderer`.

---

### Story 1.4: Email/Password Authentication Fallback

As a new user without a GitHub account,
I want to sign up and sign in with email and password,
So that I can access BitGuild without needing GitHub.

**Acceptance Criteria:**

**Given** a user on the sign-in page
**When** they view the auth options
**Then** email/password appears as a secondary option below the GitHub OAuth button, labeled "Or sign up with email"
**And** all form fields have visible `<label>` elements (no placeholder-only labeling)

**Given** a user submits a valid email + password (≥8 characters) not already registered
**When** the form is submitted
**Then** an account is created and the user enters the class selection → skill tree flow
**And** the class from `sessionStorage.pendingClass` is assigned to the new user record

**Given** a user submits an invalid email or a password under 8 characters
**When** the form field is blurred
**Then** inline validation errors appear below the relevant field (on blur only, not on keystroke)
**And** the form does not submit until errors are resolved

**Given** a registered user signs in with correct email/password
**When** authentication succeeds
**Then** the user is redirected to the home dashboard

**Notes:** NextAuth credentials provider. Password hashed with bcrypt. Zod validation shared between client form (React Hook Form) and tRPC procedure. No email verification in V1.

---

### Story 1.5: Skill Tree Declaration

As a newly authenticated developer,
I want to declare my 5-slot skill tree during onboarding,
So that guilds can find and evaluate me based on my specific technical strengths.

**Acceptance Criteria:**

**Given** a newly authenticated user with no skill tree set arrives at `/onboarding/skill-tree`
**When** the page loads
**Then** a searchable combobox lets them add skills (languages, frameworks, domains)
**And** a counter "X of 5 declared" updates with each addition
**And** the Add button is disabled once 5 slots are filled

**Given** all 5 skills are declared
**When** the 5th is added
**Then** the counter copy changes to: "Your class is declared. You can change this later, but it carries weight."
**And** an "Enter the Guild Hall" primary CTA activates

**Given** the user clicks "Enter the Guild Hall"
**When** the mutation fires
**Then** the `user.ts` `completeSkillTree` tRPC procedure saves skills to the User record
**And** the user is redirected to the guild browse page

**Given** the user navigates away from `/onboarding/skill-tree` without completing it
**When** they attempt to access any other authenticated page
**Then** Next.js middleware redirects them back to `/onboarding/skill-tree` — the step cannot be skipped

**Notes:** `SkillTreeSetup.tsx` in `src/components/onboarding/`. `MAX_SKILL_SLOTS = 5` constant in `src/lib/constants.ts`. Keyboard-navigable combobox. React Hook Form + Zod resolver.

---

### Story 1.6: tRPC RBAC & Class Constraint Middleware

As a platform operator,
I want RBAC and class-based capability constraints enforced at the API layer,
So that no client-side manipulation can grant users permissions their role or class doesn't allow.

**Acceptance Criteria:**

**Given** an unauthenticated request hits a `protectedProcedure`
**When** the tRPC middleware runs
**Then** the request is rejected with `UNAUTHORIZED` — the procedure body never executes

**Given** a Wanderer class user calls a procedure protected by `enforceClass("engineering")`
**When** the middleware evaluates
**Then** the request is rejected with `FORBIDDEN` and message `"Class constraint: Wanderers cannot fill engineering slots"`

**Given** a user below the reputation threshold calls an `enforceReputation`-protected procedure
**When** the middleware evaluates
**Then** the request returns `FORBIDDEN` including their current reputation score and the required threshold (read from `PlatformConfig`, cached in Redis with 5-min TTL)

**Given** a non-admin user calls an `enforceAdmin`-protected procedure
**Then** the request is rejected with `FORBIDDEN`

**Given** a user exceeds the sliding-window rate limit on a reputation-earning action
**When** the `reputationRateLimit` middleware triggers
**Then** the request is rejected with `TOO_MANY_REQUESTS` before the procedure body executes
**And** this rejection is enforced at the API layer, not in the UI

**Notes:** All middlewares in `src/server/api/trpc.ts`: `enforceUserIsAuthed`, `enforceReputation`, `enforceClass`, `enforceGuildLead`, `enforceAdmin`, `reputationRateLimit`. `PlatformConfig` model added to schema. `@upstash/ratelimit` sliding window. All rejections via `TRPCError` — never generic `Error`.

---

### Story 1.7: User Profile Page

As a developer (or any visitor),
I want to view a public profile showing a developer's sprite, class, skill tree, reputation, and streak,
So that I can quickly understand their identity and standing on the platform.

**Acceptance Criteria:**

**Given** any visitor (authenticated or not) visits `/profile/[username]`
**When** the page loads
**Then** the profile displays: AvatarSprite at `size="md"` (64×64px), ClassBadge, username, ReputationBadge (score chip), StreakBadge, and declared skill tree (5 skills)
**And** the page uses a React Server Component with direct Prisma query — not a tRPC call — for initial render
**And** page loads within 2 seconds at 95th percentile (NFR-P1)
**And** ARIA landmarks present: `<header>`, `<main>`, `<section aria-label="Developer Profile">` (NFR-A1)

**Given** the visitor is the profile owner
**When** they view their own profile
**Then** an "Edit profile" link is visible

**Given** the profile belongs to a user with `isDeleted = true`
**When** any visitor accesses the URL
**Then** the page returns 404

**Notes:** `ProfileHeader.tsx` in `src/components/profile/`. `StreakBadge` shows hidden state (count=0, no badge rendered) for new users without a streak yet. Tenure history section is rendered as empty placeholder here — fully populated in Epic 2. `AvatarSprite` alt text: `"[username] — [class]"`.

---

### Story 1.8: Skill Tree Update

As an established developer,
I want to update my skill tree selections after initial onboarding,
So that my declared skills can reflect my current technical focus.

**Acceptance Criteria:**

**Given** an authenticated user visits `/settings`
**When** the page loads
**Then** their current 5 skill selections are displayed in the `SkillTreeEditor` component with the option to remove individual skills and search/add replacements

**Given** the user removes a skill and adds a replacement
**When** they save
**Then** the `user.ts` `updateSkillTree` tRPC mutation saves the change
**And** the profile page reflects updated skills (tRPC cache invalidated via `utils.user.getProfile.invalidate()`)

**Given** all 5 slots are filled and the user tries to add a 6th
**When** the Add button is displayed
**Then** it is disabled and the counter reads "5 of 5 — class declared"
**And** the user must remove a skill first before adding a new one

**Notes:** `SkillTreeEditor.tsx` in `src/components/profile/`. Class is NOT changeable from settings in V1 — class identity is permanent-ish. Same combobox pattern as onboarding but allows removal of individual skills.

---

## Epic 2: Guild Formation & Team Mechanics

Users can form a guild, declare role slots, recruit members via LFG, review applicant tenure histories, and see a live roster — the core social contract.

### Story 2.1: Guild Formation & Equity Agreement Ceremony

As an established developer,
I want to form a guild with declared role slots and a founding equity agreement,
So that I can start recruiting team members under an explicit social contract.

**Acceptance Criteria:**

**Given** an authenticated user (above reputation threshold) navigates to "Form a Guild"
**When** the 4-step guild formation flow loads
**Then** steps are: (1) Name + one-line problem statement, (2) Role slots declaration, (3) Equity agreement, (4) Confirm
**And** a step indicator is visible top-right; Back is available at every step
**And** the Forward button on each step is disabled until that step's required fields are complete

**Given** the user reaches Step 3 (equity agreement)
**When** the screen renders
**Then** it is a full-page step (not a modal) with larger text and ~40% extra vertical padding compared to other steps
**And** copy reads: "This is a social contract, not a legal document. It's how your team agrees to treat each other."
**And** the CTA label is "Declare this guild" — not "I agree" or "Submit"

**Given** the user confirms on Step 4
**When** the `guild.create` tRPC mutation fires
**Then** a Guild record is created with: `id (cuid2)`, `leadId`, `name`, `domainTags`, `equityAgreement (text)`, `isActive true`, `createdAt`
**And** the founding user's GuildMembership record is created (role = lead)
**And** the declared role slots are created as GuildSlot records with `status = Open`
**And** the user is redirected to the new guild's detail page

**Notes:** `GuildForm.tsx`, `EquityAgreement.tsx`, `LFGSlotForm.tsx` in `src/components/guild/`. Guild creation protected by `enforceReputation` middleware. `guild.ts` tRPC router introduced here.

---

### Story 2.2: LFG Slot Declaration & Roster Display with Silhouettes

As a guild lead,
I want to post role-targeted LFG slots and see unfilled positions displayed as gray silhouettes,
So that prospective members can immediately understand what roles the guild needs.

**Acceptance Criteria:**

**Given** a guild lead on their guild's settings page
**When** they post a new LFG slot
**Then** they can specify: required class (UserClass enum), required skills, and a description
**And** the `guild.createSlot` tRPC mutation creates a GuildSlot record with `status = Open`
**And** the guild roster immediately shows the new slot as a gray silhouette with a "?" hat

**Given** a visitor views the guild detail page
**When** the roster section loads
**Then** filled slots show: AvatarSprite (`size="sm"`, 32×32px), member username, ClassBadge
**And** unfilled slots show: GuildSlot empty state — gray humanoid silhouette PNG + "?" hat + open role label
**And** both states are rendered by the `GuildSlot` component in `src/components/BitGuild/GuildSlot.tsx`

**Given** a user eligible to apply hovers over an empty silhouette slot
**When** the hover state triggers
**Then** the slot brightens with a tooltip: "Apply to join as [role name]"

**Given** a user NOT eligible (below reputation threshold) hovers over an empty slot
**Then** a tooltip explains: "You need [X] more reputation to apply"

**Notes:** `GuildSlot` props: `state: 'filled'|'empty'`, `member?`, `openRole?`, `isLead?`, `size?: 'sm'|'md'`. `image-rendering: pixelated` on all sprites. Empty silhouette PNG at `public/sprites/silhouette.png`. ARIA on empty slot: `aria-label="Open slot — [role] role"`.

---

### Story 2.3: Guild Application Submission

As a developer browsing guilds,
I want to apply to an open LFG slot with a brief message directly from the guild page,
So that I can express my interest without losing context of the guild's tenure histories.

**Acceptance Criteria:**

**Given** an authenticated user (meeting reputation threshold) views a guild with open slots
**When** they scroll the guild detail page
**Then** a sticky "Apply to join — [open role name]" primary CTA follows the scroll

**Given** the user clicks the sticky CTA
**When** the application drawer opens
**Then** a right-side Sheet drawer opens with a 600-character textarea labeled "Why you'd contribute" and a "Submit Application" button
**And** the guild member tenure histories remain visible through the backdrop behind the drawer
**And** focus is trapped inside the drawer while open

**Given** the user submits an application message
**When** the `guild.applyToSlot` tRPC mutation fires
**Then** an LFGApplication record is created with `status = Pending`
**And** the drawer confirms in place: "Application sent. [Guild lead name] will review your tenure history."
**And** no page redirect occurs

**Given** the user tries to close the drawer with unsaved content
**When** the close action is triggered
**Then** a confirmation dialog appears: "Abandon application? This will discard your message." with Cancel (outline) + "Abandon" (danger)
**And** "Are you sure?" copy is never used

**Notes:** `ApplicationForm.tsx` in `src/components/guild/`. Submit → confirmation response < 1 second. Toast system (shadcn `Toast`, top-right, auto-dismiss 4s) introduced here. Rate limiting applies.

---

### Story 2.4: Application Review, Approval & Real-Time Roster Update

As a guild lead,
I want to review applicants' tenure histories and approve or decline with real-time roster feedback,
So that my team sees the slot fill instantly when I accept someone.

**Acceptance Criteria:**

**Given** a guild lead opens an LFG application
**When** the review panel loads
**Then** they see: applicant's AvatarSprite, ClassBadge, skill tree, reputation score, and full TenureBar history (one bar per past/current guild)
**And** Approve and Decline buttons are present

**Given** the guild lead clicks Approve
**When** the `guild.approveApplication` mutation fires
**Then** LFGApplication `status = Approved`, GuildMembership record created, GuildSlot `status = Filled`
**And** a TenureRecord is created: `userId`, `guildId`, `class`, `joinedAt = now()`, `leftAt = null`
**And** `notifyGuild(guildId, "guild:slot:filled", payload)` is called
**And** on all connected guild page clients, the silhouette slot animates to the member's sprite within 500ms

**Given** the guild lead clicks Decline
**When** the `guild.declineApplication` mutation fires
**Then** LFGApplication `status = Rejected`
**And** the applicant receives a toast: "Your application to [Guild] wasn't accepted this time."
**And** no record appears on the applicant's public profile

**Given** the SSE Route Handler at `/api/sse/guild/[id]`
**When** a client connects
**Then** the connection is added to the in-memory `Map<guildId, Set<ReadableStreamController>>`
**And** roster events are delivered to all active controllers within 5 seconds (NFR-P5)

**Notes:** SSE: `src/server/sse.ts` exports `notifyGuild()`. Route handler: `src/app/api/sse/guild/[id]/route.ts`. `GuildRoster.tsx` subscribes to SSE and renders the GuildSlot list. `ApplicationReview.tsx` in `src/components/guild/`. SSE event: `"guild:slot:filled"`. Payload shape: `{ event, data, timestamp: ISO string }`.

---

### Story 2.5: Member Departure & Slot Re-opening

As a guild member or guild lead,
I want to leave a guild or remove a member, with the vacated slot automatically re-opening for recruitment,
So that the guild can rebuild without disbanding.

**Acceptance Criteria:**

**Given** a guild member (non-lead) chooses to leave
**When** the confirmation dialog appears
**Then** copy reads: "Leave [Guild name]? This will open your [role] slot for recruitment." with Cancel + "Leave Guild" (danger)
**And** on confirm: GuildMembership `leftAt = now()`, GuildSlot `status = Open`, TenureRecord `leftAt = now()`
**And** `notifyGuild(guildId, "guild:roster:updated", payload)` fires — all viewers see slot revert to silhouette

**Given** a guild lead removes a member
**When** the same confirmation dialog fires
**Then** same data changes and SSE event as voluntary leave
**And** the removed member receives a toast: "You have been removed from [Guild]."
**And** this removal is independent of any platform-level suspension (FR16)

**Given** a slot re-opens via leave or removal
**When** the guild detail page updates via SSE
**Then** the previously filled member sprite reverts to the gray silhouette + "?" hat
**And** the sticky "Apply to join" CTA re-appears for eligible users

**Notes:** `guild.ts` `leaveGuild` (enforceUserIsAuthed) and `removeMember` (enforceGuildLead) procedures. Confirmation dialog pattern: "[Action]. This will [consequence]." — never "Are you sure?".

---

### Story 2.6: Guild Browse & Public Profile

As any user (authenticated or guest),
I want to browse guilds and view their public profiles with domain tags, roster, and milestone history,
So that I can find guilds relevant to my skills and interests.

**Acceptance Criteria:**

**Given** an authenticated user navigates to `/guild`
**When** the browse page loads
**Then** guild cards display in 3-column grid at `lg`, 2-column at `md`
**And** each card shows: guild name, 2–3 member AvatarSprites (`size="sm"`), open silhouette count, domain tags, and a "Recruiting" badge if any slots are open
**And** page renders via React Server Component with direct Prisma query

**Given** any visitor clicks a guild card
**When** the guild detail page at `/guild/[id]` loads
**Then** above the fold: guild name, full roster (sprites + silhouettes), domain tags
**And** below the fold: TenureBar history for each current member (role tag + proportional duration bar + duration text)
**And** public milestone history listed in reverse chronological order

**Given** an authenticated user views a guild
**When** they click "Follow Guild"
**Then** a GuildFollow record is created and the button changes to "Following" (outline variant)

**Notes:** `GuildCard.tsx` in `src/components/guild/`. Empty state: "No guilds recruiting right now. Form the first one." + "Form a Guild" CTA. `TenureBar.tsx` in `src/components/BitGuild/` introduced here. No outcome labels anywhere. Tooltip first-view: "Duration and role — you decide what it means." GuildFollow model added to schema.

---

### Story 2.7: Guild Milestone Posting

As a guild lead,
I want to post public milestones for my guild,
So that the community can see our progress and the social contract is being honored.

**Acceptance Criteria:**

**Given** a guild lead views their guild's detail page
**When** they click "Post Milestone"
**Then** a dialog opens with a required title field and optional body field
**And** the dialog CTA is "Record Milestone"

**Given** the guild lead submits a valid milestone
**When** the `guild.postMilestone` mutation fires
**Then** a GuildMilestone record is created: `id`, `guildId`, `title`, `body`, `postedAt = now()`
**And** the milestone appears at the top of the guild's milestone history (tRPC cache invalidated)
**And** a toast confirms: "Milestone recorded. Your team's progress is now public."

**Given** no milestones exist on a guild
**When** the milestone section renders
**Then** it shows: "No milestones yet. When this guild ships, it'll show here." (no CTA)

**Notes:** `MilestoneForm.tsx` in `src/components/guild/`. Protected by `enforceGuildLead`. GuildMilestone model added to schema.

---

### Story 2.8: Tenure History Display on Profiles

As any user viewing a developer's public profile,
I want to see their complete guild tenure history as visual duration bars without outcome labels,
So that I can make my own judgment about their commitment patterns.

**Acceptance Criteria:**

**Given** any user visits a developer's public profile
**When** the tenure history section loads
**Then** each past and current guild is shown as a TenureBar row: role tag, proportional duration bar, and duration text (e.g., "8 months")
**And** bar widths are proportional: 0–3mo ≤12.5%, 3–12mo 12.5–50%, 12–24mo 50–100%, >24mo capped at 100% with text label
**And** no labels indicate success, failure, or outcome anywhere

**Given** the TenureBar first renders for a user who hasn't seen it before
**When** they hover over any bar
**Then** a tooltip appears once: "Duration and role — you decide what it means."
**And** the tooltip does not repeat in subsequent views (localStorage flag `tenureTooltipSeen`)

**Given** a member's tenure is currently active (leftAt = null)
**When** their profile bar renders
**Then** the bar is amber-colored and labeled "Active" — no end date

**Given** a user with no guild history views their own profile
**When** the tenure history section renders
**Then** it shows: "Your tenure history starts with your first guild. Join one."

**Notes:** `TenureHistory.tsx` in `src/components/shared/`. TenureBar ARIA: `role="img"` + `aria-label="[role], [N] months"`. Render order: active guild first, then past guilds reverse-chronological.

---

## Epic 3: Quest Board & Community Trust

Users can post quests, discover opportunities, and the community maintains signal quality through reputation gating, upvoting, and flagging.

### Story 3.1: Quest Board — Browse & Guest Access

As any visitor (authenticated or guest),
I want to browse the main quest board and see active quests,
So that I can discover problems engineers are trying to solve before deciding to join.

**Acceptance Criteria:**

**Given** an unauthenticated guest visits `/quest-board`
**When** the page loads
**Then** main board quests display in a 3-column grid at `lg`, 2-column at `md`, 1-column at base
**And** each QuestCard shows: title, author ClassBadge + username, QuestTierBadge, upvote count, domain tags, and timestamp
**And** the page renders via React Server Component — no auth required
**And** upvote and flag buttons redirect unauthenticated users to sign in when clicked

**Given** an authenticated user views the quest board
**When** the page loads
**Then** a tab bar shows "Main Board" (default) and "Rising Lane"
**And** switching tabs shows the appropriate feed without a page reload (tab state in URL query param)

**Given** the Main Board tab is active
**When** quests load
**Then** only `status = Main` quests are shown; ordered by upvote count descending
**And** cursor-based infinite scroll with a "Load more" button (not auto-scroll)

**Notes:** `QuestBoard.tsx` in `src/components/quest/`. `QuestCard.tsx` includes `QuestTierBadge`. Quest model fields: `id (cuid2)`, `authorId`, `title`, `body`, `status (QuestStatus enum)`, `upvoteCount Int default 0`, `flagCount Int default 0`, `isWandererTemplate Boolean default false`, `createdAt`. `quest.ts` tRPC router introduced here.

---

### Story 3.2: Quest Posting — Main Board & Rising Lane

As a developer,
I want to post a quest with a structured problem-statement template,
So that I can surface a real problem to the community with enough context to attract the right collaborators.

**Acceptance Criteria:**

**Given** any authenticated user clicks "Post a Quest"
**When** the structured quest form loads
**Then** it shows: Problem statement (required), Who has this problem (required), Current workarounds (required), Domain tags (optional)
**And** the Submit button is hidden until all required fields are complete
**And** inline validation fires on blur only

**Given** an established user (above reputation threshold) submits the form
**When** the `quest.create` mutation fires
**Then** the quest is created with `status = Untested`
**And** a QuestTierBadge labeled "Untested" (muted gray) is visible on the quest card

**Given** a new user (below reputation threshold) submits the form
**When** the mutation fires
**Then** the quest is created with `status = RisingLane` and appears only in the Rising Lane tab

**Notes:** `QuestForm.tsx` in `src/components/quest/`. React Hook Form + Zod resolver. Protected by `enforceUserIsAuthed`.

---

### Story 3.3: Wanderer Structured Quest Template

As a Wanderer class user,
I want to post a quest using a domain-expert template that includes market evidence and role requirements,
So that engineers can evaluate both the problem quality and what they'd be signing up for.

**Acceptance Criteria:**

**Given** a Wanderer class user clicks "Post a Quest"
**When** the form loads
**Then** the Wanderer template is shown with fields: Problem statement, Market evidence, Target users, Specific role needed, Domain tags
**And** the form is labeled "Quest Giver Template" with copy: "You have the problem. Describe it well enough that the right engineer recognizes it."

**Given** the Wanderer submits all required fields
**When** the `quest.create` mutation fires
**Then** the quest is created with `isWandererTemplate = true` and follows the same tier rules

**Given** a non-Wanderer user's session calls `quest.create` with `isWandererTemplate = true`
**When** the mutation runs
**Then** `enforceClass` middleware rejects the request with `FORBIDDEN`

**Notes:** `QuestForm.tsx` renders the Wanderer template conditionally based on `session.user.class`. API-level class constraint enforced in `quest.ts` router.

---

### Story 3.4: Quest Upvoting & Tier Progression

As an authenticated user,
I want to upvote quests to help quality problem statements graduate to higher tiers,
So that the most compelling quests surface to the main board.

**Acceptance Criteria:**

**Given** an authenticated user clicks UpvoteButton on a quest in Untested or Rising Lane
**When** the `quest.upvote` mutation fires
**Then** `upvoteCount` increments atomically; the button shows optimistic UI (instant count increment)
**And** a QuestUpvote record is created (`userId` + `questId` unique pair — no double-upvoting)
**And** if the server errors, the count reverts and a toast fires: "Something went wrong — try again in a moment."

**Given** a quest crosses the Rising Lane upvote threshold
**When** the tier promotion check runs
**Then** quest `status` changes to `RisingLane`; QuestTierBadge pulses once (300ms; no animation under `prefers-reduced-motion`)

**Given** a quest crosses the Main Board upvote threshold
**When** the tier promotion check runs
**Then** quest `status` changes to `Main`; the author receives an in-app notification: "Your quest graduated to the Main Board."

**Notes:** `UpvoteButton.tsx` in `src/components/quest/`. ARIA: `aria-label="Upvote quest: [N] upvotes"` + `aria-pressed`. Rate limiting via `reputationRateLimit` middleware. Tier thresholds in `PlatformConfig`. Quests never move backward.

---

### Story 3.5: Quest Auto-Archive (7-Day BullMQ Job)

As a platform operator,
I want Untested Tier quests with zero upvotes to be automatically archived after 7 days,
So that the quest board stays fresh without requiring manual cleanup.

**Acceptance Criteria:**

**Given** a quest in Untested Tier has `upvoteCount = 0` and `createdAt` more than 7 days ago
**When** the `questArchiveJob` BullMQ worker runs
**Then** the quest `status` is set to `Archived` and removed from all feeds
**And** the quest author is not notified (silent archive)

**Given** the job runs on its daily cron schedule
**When** it processes the same quest twice (retry scenario)
**Then** the operation is idempotent — no double-archive or error

**Given** the `BitGuild-worker` Railway service starts
**When** the worker process initializes
**Then** it connects to Railway Redis and registers the `questArchiveJob` processor
**And** queue name: `quest-archive`; job name: `questArchive`

**Notes:** `questArchiveJob.ts` in `src/workers/jobs/`. `src/workers/index.ts` is the worker entry point — BullMQ worker infrastructure established here. Worker is a separate Railway service from BitGuild-web.

---

### Story 3.6: Community Flagging & Auto-Quarantine

As an established user,
I want to flag policy-violating quests, with the platform auto-quarantining after 3 flags,
So that the community can self-moderate without waiting for admin action.

**Acceptance Criteria:**

**Given** an established user clicks FlagButton on a quest
**When** the flag dialog opens
**Then** they must select a reason: spam / misleading / content policy violation
**And** the `quest.flag` mutation creates a QuestFlag record

**Given** a quest accumulates 3 flags from established users
**When** the flag count check runs
**Then** quest `status` is set to `Quarantined`; quest is removed from all public feeds immediately
**And** the quest is added to the admin moderation queue

**Given** a user tries to flag the same quest twice
**When** the mutation runs
**Then** an error is returned: "You have already flagged this quest." and `flagCount` does not increment

**Notes:** `FlagButton.tsx` in `src/components/quest/`. `QuestFlag` model: `id`, `reporterId`, `questId`, `reason`, `resolvedAt?`. Only flags from established users count toward the 3-flag threshold. `reputation.ts` tRPC router introduced here.

---

### Story 3.7: Reputation System — Earning, Display & Gate

As a new user,
I want to earn reputation through platform actions and see my progress toward the main board threshold,
So that I understand how to build standing and what it unlocks.

**Acceptance Criteria:**

**Given** a user performs a reputation-earning action (quest upvoted by others, guild contribution, completed project)
**When** the reputation event fires
**Then** the user's `reputation` score increments by the configured amount (from `PlatformConfig`)
**And** the updated score is reflected on their public profile ReputationBadge

**Given** a user views a reputation-gated surface when below threshold
**When** the ReputationMeter renders
**Then** it shows: current score, threshold line marker, amber fill to current score
**And** contextual copy: "You have [X] reputation. [Action] requires [Y]. Post a quest to earn more."
**And** never: "You don't have enough reputation."

**Given** an admin updates the reputation threshold in `PlatformConfig`
**When** the change is saved
**Then** `enforceReputation` picks up the new value within 5 minutes (Redis cache TTL) — no code deployment required

**Notes:** `ReputationMeter.tsx` in `src/components/BitGuild/` — threshold read from API, never hardcoded. ARIA: `role="meter"` + `aria-valuenow` + `aria-valuemax`. `ReputationBadge.tsx` in `src/components/shared/`. Rate limiting on all reputation-earning actions (NFR-S4).

---

### Story 3.8: Rising Lane Feed

As an established user,
I want to browse the Rising Lane to discover quests from newer community members,
So that promising ideas get early upvotes before they're eligible for the main board.

**Acceptance Criteria:**

**Given** an authenticated established user clicks the "Rising Lane" tab
**When** the feed loads
**Then** only `status = RisingLane` quests are shown, ordered by upvote count descending
**And** each QuestCard shows the teal QuestTierBadge

**Given** a new user views the quest board
**When** the tabs render
**Then** they can see and post to Rising Lane, but the Main Board tab shows a reputation gate tooltip explaining the threshold

**Given** both feeds coexist
**When** an established user is on the Main Board tab
**Then** Rising Lane quests are fully excluded — the feeds are strictly separated

**Notes:** Same `QuestBoard.tsx` with `tier` filter prop. QuestTierBadge colors: Rising Lane = teal, Main Board = amber, Untested = muted gray. Untested Tier is a holding state only — not a browsable feed tab.

---

## Epic 4: Daily Engagement & Accountability Loop

Users have a daily return habit with streak tracking, contribution prompts, and the guild accountability loop fires reliably.

### Story 4.1: Daily Reset Job (Per-Timezone, Idempotent)

As a platform operator,
I want a daily reset to fire reliably per user timezone,
So that every user's day starts at the right time and contribution prompts are surfaced fresh each day.

**Acceptance Criteria:**

**Given** the `dailyResetJob` BullMQ cron is scheduled
**When** it fires for a timezone batch (e.g., all UTC-5 users at midnight UTC-5)
**Then** it processes all users in that batch and marks the new day as started for each
**And** the job completes within the timezone window — no user's reset delayed more than 15 minutes (NFR-P3)
**And** the job enqueues a `streakUpdateJob` for each user in the batch

**Given** the daily reset job retries due to a transient failure
**When** it re-processes users already reset today
**Then** no user receives a duplicate reset — idempotent via Redis key `reset:{userId}:{date}` as seen-set
**And** streak values do not double-increment or falsely break (NFR-R4)

**Given** multiple worker instances run simultaneously
**When** the cron fires
**Then** only one worker processes each timezone batch — BullMQ job locking prevents duplicate execution (NFR-SC4)

**Notes:** `dailyResetJob.ts` in `src/workers/jobs/`. Queue: `daily-reset`; job: `dailyReset`. `timezone String` on User record. Jobs call Prisma directly — not via tRPC.

---

### Story 4.2: Streak Tracking (Redis Atomic, Race-Condition Safe)

As a developer,
I want my daily streak to increment accurately across multiple concurrent sessions,
So that my commitment history is trustworthy even if I have multiple tabs open.

**Acceptance Criteria:**

**Given** the `streakUpdateJob` processes a user
**When** it runs
**Then** a Redis `SETNX` atomic operation sets the streak increment key for that user + date
**And** if the key already exists, the operation is a no-op (idempotent)
**And** `currentStreak` increments by exactly 1 — no race condition across concurrent sessions (NFR-P4)

**Given** a user has an active streak and misses a day
**When** the daily reset fires
**Then** `currentStreak` resets to 0; if it exceeded `longestStreak`, `longestStreak` is updated first
**And** `lastResetDate` is set to today

**Given** the job retries for the same user+date
**When** it re-runs
**Then** `currentStreak` does not increment again — Redis SETNX key prevents double-increment

**Notes:** `streakUpdateJob.ts` in `src/workers/jobs/`. Streak model: `userId (unique)`, `currentStreak Int default 0`, `longestStreak Int default 0`, `lastResetDate DateTime`. Redis key: `streak:lock:{userId}:{YYYY-MM-DD}` with 25-hour TTL.

---

### Story 4.3: StreakBadge & Dashboard Display

As a developer,
I want to see my active streak prominently on my dashboard and profile,
So that my daily momentum is immediately visible when I open the platform.

**Acceptance Criteria:**

**Given** a user opens the BitGuild dashboard
**When** the page loads
**Then** their StreakBadge and guild activity feed are visible above the fold without scrolling

**Given** a user has an active streak of 1–29 days
**When** the StreakBadge renders
**Then** it shows an amber flame icon with the day count (e.g., "Day 12")

**Given** a user has an active streak of 30+ days
**When** the StreakBadge renders
**Then** it shows a gold glow effect + day count; at 100+ days the flame pulses (no pulse under `prefers-reduced-motion`)

**Given** a user has a broken streak
**When** the StreakBadge renders
**Then** it shows a gray flame with copy "Resume streak" — no day count, no red color — ever

**Given** a user has a streak count of 0
**When** the StreakBadge renders
**Then** no badge is rendered (hidden state)

**Notes:** `StreakBadge.tsx` in `src/components/BitGuild/`. ARIA: active = `aria-label="[N]-day streak, active"`, broken = `aria-label="Streak broken — resume today"`. All animations wrapped in `@media (prefers-reduced-motion: reduce)` with `animation: none`. `engagement.ts` tRPC router introduced here.

---

### Story 4.4: Day-3 Contribution Prompt

As a developer who has broken their streak,
I want to receive a single gentle prompt on day 3 of inactivity,
So that I'm reminded to return without feeling shamed or spammed.

**Acceptance Criteria:**

**Given** a user's streak has been broken for exactly 3 days
**When** the `contributionPromptJob` fires
**Then** one in-app notification is delivered: "Streak paused. Post a quest or upvote to rebuild."
**And** no further prompts are sent for this streak break — exactly one notification, then silence

**Given** the notification is delivered
**When** the user opens the notifications panel
**Then** neutral copy is shown with a direct link to the quest board — no red, no alarm language, no punitive framing

**Given** the user recovers their streak before day 3
**When** the streak is restored
**Then** the pending `contributionPromptJob` is cancelled — no prompt is sent for a recovered streak break

**Notes:** `contributionPromptJob.ts` in `src/workers/jobs/`. Queue: `contribution-prompt`; job: `contributionPrompt`. Enqueued by `dailyResetJob` on streak-break day with 72-hour delay. Notification model added to schema: `id`, `userId`, `type`, `body`, `read Boolean default false`, `createdAt`.

---

### Story 4.5: Toast System & Empty States

As any user,
I want consistent feedback toasts and clear empty states across the platform,
So that I always know what happened and what to do next when content isn't available.

**Acceptance Criteria:**

**Given** any platform action completes
**When** the toast fires
**Then** it appears top-right via shadcn/ui Toast, auto-dismisses after 4s (success/neutral) or 8s (errors)
**And** no "failed" or "rejected" language for streak events; broken streak: "Streak paused. Post a quest or upvote to rebuild."
**And** server error: "Something went wrong — try again in a moment."

**Given** a page section has no content
**When** the empty state renders
**Then** no sad-face illustrations and no "Looks like nothing's here!" copy
**And** quest board: "No quests posted yet. Be the first — post a real problem." + CTA
**And** guild browse: "No guilds recruiting right now. Form the first one." + CTA
**And** notifications: "Nothing yet. When guild activity happens, it appears here." (no CTA)
**And** tenure history (new user): "Your tenure history starts with your first guild. Join one."

**Given** any CSS transition or animation exists
**When** a user has `prefers-reduced-motion: reduce` set
**Then** all transitions use `animation: none` overrides — validated across AvatarSprite, GuildSlot, StreakBadge, QuestTierBadge

**Notes:** Consolidates the full toast spec and empty state copy. `@media (prefers-reduced-motion: reduce)` validated across all animated components.

---

## Epic 5: Heroic Mode & Subscriptions

Users can upgrade to Heroic Mode for advanced guild analytics, priority LFG placement, and multi-guild leadership.

### Story 5.1: Stripe Integration & Subscription Data Model

As a platform operator,
I want Stripe integrated as the payment rail with subscription state persisted in the database,
So that Heroic Mode access is reliably enforced based on active subscription status.

**Acceptance Criteria:**

**Given** the Stripe integration is set up
**When** a user's subscription status changes (new, cancelled, expired)
**Then** the raw Stripe webhook at `/api/webhooks/stripe` receives the event
**And** Stripe signature verification is performed on the raw request body before any processing
**And** the `Subscription` record is upserted: `userId`, `stripeCustomerId`, `stripePriceId`, `status`, `currentPeriodEnd`
**And** `user.isHeroicMode` is updated atomically with the subscription change

**Given** the webhook handler receives an event with invalid signature
**When** signature verification fails
**Then** the request is rejected with 400 — no subscription state is modified

**Given** a user views their subscription page
**When** the `subscription.getStatus` tRPC query runs
**Then** it returns current tier, renewal date, and Heroic Mode status — no raw Stripe data exposed to the client

**Notes:** `subscription.ts` tRPC router. Stripe webhook at `src/app/api/webhooks/stripe/route.ts` — raw Route Handler outside tRPC (requires raw body). `stripe.ts` in `src/lib/`. Subscription model: `userId`, `stripeCustomerId`, `stripePriceId`, `status (SubscriptionStatus enum)`, `currentPeriodEnd`. User model gains `isHeroicMode Boolean default false`.

---

### Story 5.2: Heroic Mode Upgrade Flow

As a free-tier developer,
I want to upgrade to Heroic Mode through Stripe-hosted checkout,
So that my payment is processed securely and my access upgrades immediately after.

**Acceptance Criteria:**

**Given** an authenticated user visits `/settings/subscription`
**When** the page loads
**Then** their current tier (Free or Heroic Mode) is displayed with the Heroic Mode feature list and pricing (~$15–20/month)

**Given** a free-tier user clicks "Upgrade to Heroic Mode"
**When** the `subscription.createCheckoutSession` mutation fires
**Then** the user is redirected to Stripe Hosted Checkout — card data never touches BitGuild servers (NFR-S7, PCI DSS SAQ A)

**Given** the user completes checkout on Stripe
**When** the `checkout.session.completed` webhook event arrives
**Then** the Subscription record is created/updated and `user.isHeroicMode = true`
**And** the user returns to BitGuild with Heroic Mode active — no manual page refresh needed

**Given** the user abandons checkout
**When** they return to BitGuild
**Then** their subscription is unchanged and no partial records are created

**Notes:** Stripe Checkout in subscription mode. Success/cancel URLs configured in `createCheckoutSession()`. `env.STRIPE_WEBHOOK_SECRET` validated via `src/env.js`.

---

### Story 5.3: Heroic Mode — Priority LFG & Advanced Matching Filters

As a Heroic Mode subscriber,
I want my LFG applications surfaced first to guild leads and access to advanced candidate filters,
So that I get better visibility and can make more informed recruitment decisions.

**Acceptance Criteria:**

**Given** a Heroic Mode subscriber submits a guild application
**When** a guild lead opens their application queue
**Then** the Heroic Mode subscriber's application appears at the top with a subtle "Heroic" indicator badge
**And** free-tier applications are sorted below all Heroic Mode applications (FR47)

**Given** a Heroic Mode guild lead accesses the advanced filter panel
**When** they filter applicants
**Then** they can filter by: skill tree tags, class, and minimum tenure months
**And** these filters are enforced via `enforceHeroicMode` check in `guild.listApplications` (FR45)

**Given** a free-tier guild lead accesses the application list
**When** filter controls would appear
**Then** they are replaced with a "Heroic Mode" upgrade prompt

**Notes:** Priority sorting in `guild.listApplications`: `ORDER BY user.isHeroicMode DESC, createdAt ASC`. Filter enforcement at API layer — not just UI.

---

### Story 5.4: Heroic Mode — Guild Analytics Dashboard

As a Heroic Mode guild lead,
I want a guild analytics dashboard showing contribution activity, streak health, and slot fill velocity,
So that I can identify disengaged members and optimize recruitment timing.

**Acceptance Criteria:**

**Given** a Heroic Mode guild lead navigates to their guild's analytics tab
**When** the dashboard loads
**Then** it shows: per-member contribution activity (streak days, last active), slot fill velocity (avg days to fill open slots), and guild streak health (% of members with active streaks)

**Given** a non-Heroic-Mode guild lead navigates to the analytics tab
**When** the tab renders
**Then** analytics content is replaced with an upgrade prompt
**And** `guild.getAnalytics` tRPC procedure returns `FORBIDDEN`

**Given** a member has a broken streak
**When** their analytics row renders
**Then** their streak indicator is gray — no red color, no alarm language

**Notes:** `guild.getAnalytics` enforces `enforceHeroicMode`. Computed from existing Streak + GuildMembership records — no new data collection needed.

---

### Story 5.5: Heroic Mode — Multi-Guild Leadership & Billing Management

As a Heroic Mode subscriber,
I want to lead up to 3 active guilds and manage my subscription from settings,
So that I can run multiple projects in parallel with full billing control.

**Acceptance Criteria:**

**Given** a Heroic Mode subscriber creates a second or third guild
**When** the `guild.create` mutation fires
**Then** it succeeds if they lead fewer than 3 active guilds
**And** if they already lead 3, it returns `FORBIDDEN`: "Heroic Mode allows leading up to 3 active guilds. Retire one to create another."

**Given** a free-tier user attempts to create a second guild
**When** the `guild.create` mutation fires
**Then** it returns `FORBIDDEN`: "Free tier allows leading 1 active guild. Upgrade to Heroic Mode to lead more."
**And** guild lead limits are enforced at the API layer (FR48, FR44)

**Given** a Heroic Mode subscriber clicks "Manage Billing"
**When** the Stripe Customer Portal session is created
**Then** they are redirected to Stripe-hosted portal to manage invoices, payment method, or cancel
**And** cancellation triggers `customer.subscription.deleted` webhook → `user.isHeroicMode = false`
**And** access continues until `currentPeriodEnd` (graceful cancellation)

**Notes:** Guild lead count check in `guild.create`: `db.guild.count({ where: { leadId, isActive: true } })`. Stripe Customer Portal via `stripe.billingPortal.sessions.create()` in `subscription.ts`.

---

## Epic 6: Safety, Administration & Platform Integrity

**Epic Goal:** Equip admins with moderation tools, protect user accounts with 2FA and GDPR controls, and harden the platform against abuse and security vulnerabilities — ensuring BitGuild can operate safely at scale.

**FR Coverage:** FR41, FR50–FR55, FR58–FR61

**Architecture Notes:** Admin routes in `src/server/api/routers/admin.ts` protected by `enforceAdmin` middleware. PlatformConfig Prisma model used for admin-configurable settings. Async jobs in BullMQ worker (`accountDeletionJob`, GDPR export job). TOTP via `otplib`. Sentry `beforeSend` scrubs PII.

**UX Notes:** Admin panel flows outside main user journey; functional clarity over pixel aesthetic. Suspension and appeal flows must communicate status clearly.

---

### Story 6.1: Admin Flag Queue & Quest Moderation

**As an** admin, **I want** to review flagged content and take moderation actions, **so that** the platform remains safe and policy-compliant.

**Acceptance Criteria:**

**Given** a piece of content (quest, message) has been flagged by a user
**When** an admin opens the flag queue at `/admin/flags`
**Then** all open flags are listed with content preview, reporter, timestamp, and flag reason

**Given** an admin reviews a flagged quest
**When** they select "Remove" or "Dismiss"
**Then** the action is recorded in an audit log with `adminId`, `action`, `targetId`, `timestamp`
**And** the quest status is updated accordingly (`isActive = false` for removals)
**And** the flagging user receives a notification of the outcome

**Given** an admin removes content
**When** the action is saved
**Then** an `AuditLog` record is created (model: `AuditLog { id, adminId, action, targetType, targetId, note, createdAt }`)

**Notes:** `admin.ts` router: `listFlags`, `resolveFlag(flagId, action, note)`. `FlagQueue.tsx` component with table, action buttons. Audit log is append-only — no updates or deletes.

---

### Story 6.2: User Suspensions & Appeal Flow

**As an** admin, **I want** to suspend users and allow them to appeal, **so that** enforcement is fair and documented.

**Acceptance Criteria:**

**Given** an admin selects a user for suspension
**When** they set a `suspendedUntil` date and reason
**Then** `user.suspendedUntil` is set and `user.suspensionReason` is stored
**And** the user receives an email notification with reason and appeal instructions

**Given** a suspended user submits an appeal
**When** they POST to `appeal.submit({ reason })`
**Then** an `Appeal` record is created (`{ id, userId, reason, status: "PENDING", createdAt }`)
**And** admins see the appeal in the flag queue with status `PENDING`

**Given** an admin reviews an appeal
**When** they approve it
**Then** `user.suspendedUntil` is cleared and `Appeal.status = "APPROVED"`
**And** the user is notified their appeal was successful

**Given** a suspended user attempts any authenticated action
**When** their session is validated
**Then** `enforceUserIsAuthed` checks `suspendedUntil > now()` and throws `FORBIDDEN` with suspension details

**Notes:** `SuspensionPanel.tsx` admin component. `appeal.ts` tRPC router for user-facing submission. Suspension check added to `enforceUserIsAuthed` middleware.

---

### Story 6.3: Reputation Audit & Admin Config

**As an** admin, **I want** to view reputation audit trails and adjust platform-wide config thresholds, **so that** I can tune the system without code deployments.

**Acceptance Criteria:**

**Given** an admin opens the reputation audit view
**When** they search by userId
**Then** all `ReputationEvent` records for that user are displayed with `delta`, `reason`, `actorId`, and `createdAt`

**Given** an admin wants to change the reputation threshold for guild creation
**When** they update `PlatformConfig { key: "minReputationForGuildCreate", value: "100" }`
**Then** the new value is persisted and takes effect on the next request (no restart needed)

**Given** the `enforceReputation` middleware runs
**When** it reads the threshold
**Then** it reads from `PlatformConfig` via `db.platformConfig.findUnique({ where: { key } })` (cached with 60s TTL)

**Notes:** `ReputationAudit.tsx` admin component. `admin.updateConfig(key, value)` tRPC procedure. Cache invalidation on write via in-memory TTL map. Config keys are an allowlist — unknown keys rejected.

---

### Story 6.4: Two-Factor Authentication (TOTP)

**As a** user, **I want** to enable 2FA on my account, **so that** my account is protected against unauthorized access.

**Acceptance Criteria:**

**Given** a user navigates to Security Settings
**When** they click "Enable 2FA"
**Then** a TOTP QR code is generated via `otplib.authenticator.generateSecret()` and displayed

**Given** the QR code is displayed
**When** the user scans it and enters the 6-digit TOTP code
**Then** the code is verified via `otplib.authenticator.verify({ token, secret })`
**And** on success, `user.twoFactorEnabled = true` and `user.twoFactorSecret` (AES-256 encrypted) is stored

**Given** 2FA is enabled and the user logs in via NextAuth
**When** credentials are verified
**Then** a TOTP challenge is presented before the session is issued
**And** failure increments a rate-limit counter (max 5 attempts / 15 min, then `FORBIDDEN`)

**Given** a user wants to disable 2FA
**When** they confirm with their current TOTP code
**Then** `user.twoFactorEnabled = false` and `user.twoFactorSecret = null`

**Notes:** `user.twoFactorSecret` encrypted at rest with `AES-256-CBC` using `TOTP_ENCRYPTION_KEY` env var. NextAuth callback extended to inject TOTP challenge step. Backup codes: 10 single-use codes generated and displayed once at enrollment.

---

### Story 6.5: GDPR/CCPA Data Export

**As a** user, **I want** to request a full export of my personal data, **so that** I can exercise my data portability rights.

**Acceptance Criteria:**

**Given** a user submits a data export request from Account Settings
**When** `user.requestDataExport()` is called
**Then** an async export job is enqueued in BullMQ (`gdprExportJob`)
**And** the user receives an email confirmation that processing has begun

**Given** the export job runs
**When** it completes (target: within 30 days, typically minutes)
**Then** a JSON file is generated containing: profile, guild memberships, tenure records, quest history, reputation events
**And** a signed download URL (valid 72h) is emailed to the user's verified address

**Given** the download URL is accessed
**When** the user downloads the file
**Then** the file contains only data scoped to their `userId` — no other users' data

**Notes:** `gdprExportJob` in `worker/jobs/`. JSON structure documented in architecture. Signed URL via Railway object storage or S3-compatible. PII fields in the export are plaintext (this is the user's own data).

---

### Story 6.6: Account Deletion with Tenure Anonymization

**As a** user, **I want** to delete my account, **so that** my personal data is removed while guild history remains accurate.

**Acceptance Criteria:**

**Given** a user confirms account deletion (with "DELETE" typed confirmation)
**When** `user.deleteAccount()` is called
**Then** `user.isDeleted = true` is set immediately (soft delete)
**And** the user's session is invalidated and they are logged out
**And** an `accountDeletionJob` is enqueued in BullMQ

**Given** the `accountDeletionJob` runs
**When** it processes the deletion
**Then** PII fields are nulled: `name = null`, `email = null`, `avatar = null`, `bio = null`
**And** all `TenureRecord` rows for this user are updated: `displayName = "Former [Class], [Duration]"`, `anonymized = true`
**And** the user's active guild memberships are ended (`GuildMember.leftAt = now()`)
**And** any active quests they own are archived (`Quest.isActive = false`)

**Given** a deleted user's tenure records are viewed in guild history
**When** another user views the guild roster history
**Then** they see `"Former Backend Warrior, 8 months"` (never the original name or profile link)

**Notes:** Immediate soft delete ensures instant UX feedback; async job handles data scrubbing. `accountDeletionJob` is idempotent (safe to retry). `isDeleted = true` check added to `enforceUserIsAuthed` — deleted accounts cannot authenticate.

---

### Story 6.7: Content Policy, OWASP Mitigations & PII Protection

**As a** platform operator, **I want** automated security mitigations and a published content policy, **so that** the platform is protected against common attacks and users know the rules.

**Acceptance Criteria:**

**Given** the platform is running in production
**When** any tRPC input is processed
**Then** all string inputs are sanitized (HTML-encoded) before persistence via a global tRPC middleware
**And** Prisma parameterized queries prevent SQL injection by default (no raw query strings with user input)

**Given** Sentry error reporting is active
**When** an error is captured
**Then** `beforeSend` hook strips PII fields: `email`, `name`, `ip` from all Sentry payloads

**Given** a user navigates to `/content-policy`
**When** the page loads
**Then** a static Next.js page renders the full content policy (acceptable use, prohibited content, enforcement process)

**Given** authenticated API requests are made
**When** CSRF tokens are validated
**Then** Next.js built-in CSRF protection (SameSite cookies + `Origin` header check) is active for all mutations
**And** `Content-Security-Policy` header is set via `next.config.js` headers config

**Given** Prisma query logging is configured
**When** the app runs in production
**Then** `log: []` (logging disabled) prevents query data from appearing in production logs

**Notes:** Input sanitization middleware added to tRPC `t.middleware()` chain. CSP header configured in `next.config.js`. `/content-policy` is a static page (`app/content-policy/page.tsx`). Prisma `log` config set per environment in `db.ts` singleton.
