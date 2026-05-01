---
stepsCompleted: ['step-01-init', 'step-02-discovery', 'step-02b-vision', 'step-02c-executive-summary', 'step-03-success', 'step-04-journeys', 'step-05-domain', 'step-06-innovation', 'step-07-project-type', 'step-08-scoping', 'step-09-functional', 'step-10-nonfunctional', 'step-11-polish']
classification:
  projectType: saas_b2b
  domain: general
  complexity: medium-high
  projectContext: greenfield
inputDocuments: ['_bmad-output/brainstorming/brainstorming-session-2026-04-28-1801.md', '_bmad-output/planning-artifacts/research/market-developer-social-platform-research-2026-04-29.md']
workflowType: 'prd'
briefCount: 0
researchCount: 1
brainstormingCount: 1
projectDocsCount: 0
releaseMode: phased
---

# Product Requirements Document — BitGuild

**Author:** Luis
**Date:** 2026-04-29

## Executive Summary

**BitGuild** is a guild-based social platform for software engineers that solves the execution problem, not the ideation problem. It targets developers who have technical skills and real ideas but lack co-founders with complementary strengths, access to market validation intelligence, and an accountability structure that survives past week two. The platform delivers these through MMO-inspired guild mechanics: engineers form squads, declare roles, post quests, and commit to shipping together — with social contracts and transparent commitment histories that make ghosting costly and progress visible.

**Target users:** Software engineers aged 22–45 entering a structurally challenged entry-level market (CS graduates, bootcamp alumni) or senior engineers with execution capacity but no co-founder network. United by skill and ambition; divided by network access. The platform explicitly serves those without Stanford connections, YC networks, or startup-city geography.

**The problem:** 47.2M developers worldwide; entry-level roles down 50%+ from pre-pandemic highs; 44% of profitable SaaS is now solo-founded. The isolation problem intensifies as AI removes the technical barrier to building while providing no accountability or social contract. Side projects die at 80% completion — not from lack of skill, but from lack of a team that expects you to show up tomorrow. LinkedIn, GitHub, Discord, and YC Matching each solve a slice of this in ways that systematically exclude the non-networked developer.

### What Makes This Special

**1. Commitment-signal-aware team matching** — Guild tenure history displays transparently on every profile: projects joined, roles played, duration. No "failed" or "abandoned" labels — just the shape of the data. This is the rarest signal in any co-founder matching platform, and the one that directly solves the ghost-collaborator problem. YC Matching, CoFoundersLab, Foundersbase, and LinkedIn all lack it.

**2. Engineering-native identity** — At signup, users choose a class (Backend Warrior, Frontend Mage, DevOps Engineer, etc.) represented by a gritty RotMG-style pixel sprite. Identity is declared in 30 seconds and feels owned — not performed. A 35-year-old senior engineer with 2,000 hours in WoW immediately understands the platform's social contract in a way no professional headshot + job history can communicate.

**3. Guild accountability infrastructure** — The guild structure encodes a social contract: declared roles, equity agreements at formation, daily contribution prompts, streak visibility to recruiters, and a "First Kill" broadcast when a guild ships. The platform converts passive community into active execution engine. Polywork had no forcing function — it shut down January 2025 after raising $44.5M. BitGuild has this designed in from day one.

**4. Living Intelligence Feed** *(V2)* — Automated market signal surfacing from App Store reviews, Reddit threads, Hacker News "Ask HN: why is there no X?", and GitHub issue trackers. Pre-populated quests with attached evidence. A 22-year-old bootcamp grad in Kansas City gets the same quality of market intelligence as someone with YC connections.

**Core insight:** The platform's defensible value is not discovery or networking — it is *execution infrastructure*. The guild social contract is the commitment device that keeps projects alive. Everything else (identity, quests, market intelligence) serves that core mechanic.

**Why now:** The developer-native professional identity space went uncontested when Polywork shut down (Jan 2025). Foundersbase launched September 2025 but lacks engineering identity, gamification, and daily return mechanics. The window to establish the category is 6–12 months.

## Project Classification

- **Project Type:** SaaS platform — subscription tiers (free tier + Heroic Mode), multi-user guild structures, future B2B investor/accelerator access layer
- **Domain:** Developer community / social platform — no regulated industry requirements; standard web platform concerns (security, UX, trust/reputation systems, network effects)
- **Complexity:** Medium-High — reputation and commitment-signal systems, matching algorithms, real-time guild mechanics, content moderation, Living Intelligence Feed data pipeline, cold-start network effects dynamics
- **Project Context:** Greenfield — no existing codebase; building from scratch

## Success Criteria

### User Success

Three moments that prove BitGuild is working — any one is a "the product did its job" signal:

1. **First unsolicited guild invitation** — a user receives a guild invite from someone they had no prior relationship with. The matching and trust mechanics worked.
2. **Guild ships something meaningful** — a user's guild reaches a public milestone: deployed product, Product Hunt listing, first users, first revenue. The accountability infrastructure converted commitment into output.
3. **Cross-guild reach-out** — a user gets contacted by another guild to collaborate, merge, or recruit. Network effects have started.

**Anti-success signals** (product failed the user even if aggregate metrics look fine):
- User joined a guild, was ghosted within two weeks, and never came back
- User's quest was buried by spam or low-signal posts
- User completed onboarding but couldn't find a guild relevant to their skills or interests

### Business Success

**North star metric:** Number of guilds that have shipped something meaningful (deployed product, public milestone, first revenue). This is the one number that proves the tool actually helps people.

**Supporting metrics by phase:**

| Metric | Month 1 | Month 3 | Month 12 |
|---|---|---|---|
| Active guild members | 500 | 2,000 | 15,000 |
| Guilds with weekly activity | 10 | 80 | 500 |
| **Guilds that have shipped** | — | 5 | 50 |
| Quest board posts (30-day) | 100 | 500 | 3,000 |
| Spam incident rate (main board) | < 1% | < 0.5% | < 0.2% |
| Heroic Mode subscribers | — | 50 | 500 |

Revenue is a consequence of the platform working, not the goal itself. Heroic Mode pricing ($15–20/month) is validated by willingness-to-pay. If guilds are shipping and users are staying, Heroic Mode conversion follows.

### Technical Success

**Priority 1 — Spam and trust integrity:**
- Zero spam reaching the main quest board (reputation gate fully functional at launch)
- Rising Lane properly segregating new accounts from established users
- Three-flag quarantine triggering correctly; no known spam bypass in V1

**Priority 2 — Onboarding speed:**
- Sprite class selection delivered within 60 seconds of landing — no gates before the aha moment
- Guild browsing functional within the first session (user sees active guilds before completing profile)

**Priority 3 — Daily engagement mechanics:**
- Daily reset fires reliably at the configured time; streak tracking accurate across sessions and devices
- Guild contribution prompts delivered and trackable

**Priority 4 — Core reliability:**
- Platform available during the daily reset window
- Guild formation and LFG slot management error-free under normal load
- No data loss on quest posts, guild applications, or streak records

### Measurable Outcomes

**The "product is working" test at 90 days post-launch:**
- At least 5 guilds have publicly shipped something
- At least one user has posted publicly (Twitter/X, HN, Reddit) about finding their co-founder through BitGuild
- Spam incident rate on the main quest board below 0.5%
- Day-7 retention of new users who completed guild onboarding above 40%

## Product Scope

### MVP — V1

Everything required to prove the core loop: identity → guild formation → accountability → shipping.

1. **Sprite avatar + class selection** — gritty RotMG-style pixel art, class determines sprite palette and hat, delivered at signup before any other action
2. **Skill tree (5-slot constraint)** — languages, frameworks, domains; constraint forces self-aware identity declaration; powers LFG matching
3. **Guild formation with role-targeted LFG slots** — declare roles, equity agreement at formation, unfilled slots displayed as gray silhouettes
4. **Quest board** — Untested Tier (new posts start unverified), Reputation Gate (minimum rep to post), Rising Lane (new account feed), 7-day auto-archive for unvoted quests
5. **Daily reset + contribution prompt + streak** — fires reliably per user timezone, streak visible on profile
6. **Guild tenure history** — transparent project history on every profile (no failure labels, just data); anonymized on account deletion
7. **Heroic Mode subscription** — free tier fully functional; Heroic Mode adds advanced matching filters, guild analytics, priority LFG placement
8. **Wanderer/Quest Giver class** — non-technical class for PMs and domain experts; distinct sprite (scroll/compass hat); can post quests and join guilds as domain expert; cannot lead technical guilds or fill engineering slots

### Growth — V2

Features that make BitGuild competitive and defensible once the core loop is proven. Built after V1 hits trigger criteria: 50+ active guilds, 5+ guilds shipped, Day-7 retention above 40%.

1. **Living Intelligence Feed** — automated market signal surfacing (App Store reviews, Reddit, HN, GitHub issues); pre-populated quests with evidence
2. **Guild level progression + First Kill broadcast** — guilds level up through milestones; server-wide celebration when a guild ships; sprite crown effect on guild members
3. **GitHub integration** — commits surface as quest progress updates within guild view
4. **Discord integration** — guild Discord channel auto-created on guild formation
5. **Commitment signal dataset maturation** — matching recommendations begin improving as dataset matures (~6 months post-launch)
6. **Cosmetic achievement unlocks** — hat variants and accessories earned through guild milestones and shipping achievements; completed guilds display subtle stars on member hats; veteran accounts earn crown variants; cosmetic only, zero pay-to-win
7. **Builder Quest / proof-of-work catalog** — optional micro-challenges users complete and publish on their profiles — real tiny shipped artifacts, not algorithmic puzzles; distinct from tenure history: proves ability to ship independently; visible to guild leads in the LFG review flow

### Vision — V3+

The moat layer. Valuable only after V1 and V2 have built community density (5,000+ active users, 500+ guilds).

1. **Proprietary matching algorithm** — predictive team compatibility and quest success probability from compounding guild outcome data
2. **B2B investor/accelerator layer** — guilds at Level 5+ surfaced to curated investor/accelerator network; investors pay for access, builders pay nothing
3. **Geographic and language expansion** — non-English markets with strong indie dev communities (Brazil, Germany, India)
4. **Linear integration** — quest milestones map to Linear board issues

## User Journeys

### Journey 1 — The Frustrated Builder (Primary User, Happy Path)

**Maya, 24.** Mid-tier state school CS graduate, strong backend portfolio, 47 job rejections. Two unfinished side projects on GitHub: one abandoned at 70% for lack of frontend skills, one at 80% from solo burnout. She can ship. She needs a team and a reason to show up tomorrow.

She finds BitGuild through a HN comment. She opens it skeptically.

**First 60 seconds:** Class selection before account creation. She picks Backend Engineer. Her sprite appears — a gritty pixel warrior with a server rack on her back. She picks her skill tree: Go, PostgreSQL, distributed systems, API design, Docker. Five slots. The constraint feels intentional.

**First session:** The Rising Lane shows newcomer projects — real problem statements, not vague pitches. She upvotes two quests. She finds a guild forming around a developer analytics tool — a Backend Warrior slot displayed as a gray silhouette with a question mark hat. She applies with three sentences about what she'd bring.

**48 hours later:** Guild lead accepts her. Four members: a frontend mage in Berlin, a DevOps engineer in Austin, a Wanderer PM in Chicago with validated market research. Equity agreement declared at formation. Streak starts. Day 1.

**Three months later:** The guild has a deployed beta with 200 users. Maya got the invite she needed — not from a recruiter, but from a stranger who saw her profile and wanted her specifically.

*Requirements: class selection onboarding, skill tree (5-slot), quest board + Rising Lane, guild formation + LFG slot display, application flow, guild tenure tracking, streak system, equity agreement at formation.*

---

### Journey 2 — The Senior Engineer Seeking Escape Velocity (Secondary User)

**Daniel, 41.** Principal backend engineer at a Series B fintech, six years in. Deeply bored. Three ideas better than half of Product Hunt. No designers, no PMs, no engineers in his network willing to take risk.

He finds BitGuild through a Twitter thread about "the Polywork replacement that's actually good." He logged 3,000 hours in EverQuest in his twenties. He understands guilds immediately.

**His onboarding:** System Architect class. Weathered, experienced sprite. Skill tree: distributed systems, Rust, Kafka, infrastructure design, technical leadership. He scans the main quest board — established users, real projects, visible commitment histories. He can see who ships versus who joins and ghosts. This signal doesn't exist anywhere else.

**First month:** He posts a developer tool quest for debugging distributed traces — detailed problem statement, evidence from his own pain. Earns 12 upvotes in 48 hours, graduates to main board. Two LFG applications arrive. He reviews their guild tenure histories. He picks the frontend engineer whose last two guilds each lasted over a year and shipped.

**Six months in:** Guild at Level 3. Waitlist forming. He's considering Heroic Mode for matching analytics — wants compatibility scoring before accepting new members. Thinking about leaving his job.

*Requirements: main quest board (established users), profile commitment signal display, quest posting + Untested Tier graduation, LFG application + history review, guild levels, Heroic Mode matching analytics.*

---

### Journey 3 — Edge Case: The Ghost Member Problem

**Carlos, 27.** Joins a guild enthusiastically. Active week one. Silent week two. Gone week three. His three guild-mates — including Maya — have invested real time.

**What the platform does:** His streak breaks publicly on his profile. The guild social contract gives the remaining members tools to act: mark his slot open, post a new LFG for his role, keep building. His tenure history records the accurate shape of the data — 3-week guild, Backend Engineer slot, partial contributor. No failure label. Just data.

**Recovery path:** Carlos receives a contribution prompt on day 3 of his streak break. If he returns and explains, the guild can choose to keep him. If he doesn't, the guild absorbs the hit and recruits without disbanding.

*Requirements: streak break visibility, contribution prompts, slot re-opening flow, guild tenure recording without failure labels, LFG re-posting on open slot, guild dissolution vs. rebuild decision flow.*

---

### Journey 4 — Platform Moderator / Admin (Operations User)

**The moderation queue.** Demo1's trust system minimizes human moderation, but the admin dashboard handles edge cases.

**A typical session:** Three flagged quests in queue. Admin sees: quest text, flag reasons, flagger reputation scores, poster reputation score, time in Untested Tier. Two are clear spam — promotional links, no problem statement, quarantined immediately. One is borderline: real idea, 2-day-old account, zero prior activity — set to 72-hour review window.

**Weekly reputation audit:** What percentage of quest board posts came from accounts below the reputation threshold? Zero this week. Gate is working.

**Escalation:** A guild reports a member for harassment. Admin reviews the report, applies a 7-day posting suspension. Member can appeal. Guild can remove them immediately regardless of the appeal outcome.

*Requirements: admin dashboard (flag queue, reputation audit, suspension tools), community flagging system, quarantine queue, appeal flow, guild-level member removal independent of platform-level suspension.*

---

### Journey 5 — The Domain Expert / Wanderer (V1, Primary Path)

**Priya, 32.** Product manager at a mid-size SaaS. Three years watching the same compliance workflow gap her enterprise customers complain about. She's run 12 customer interviews, written a two-pager, mapped the market. What she doesn't have: a single engineer willing to build it with her.

She finds BitGuild through a tweet from a developer she follows.

**Her onboarding:** Class selection includes Wanderer — scroll-and-compass hat, distinct from engineering sprites. Description: *"You spot the gaps others miss. You can't fill the Backend slot, but you can define the quest that makes it worth filling."* She picks it. She immediately understands her role.

**Her constraints:** Wanderer class means she can post quests and join guilds as domain expert but cannot lead a technical guild or fill an engineering slot. This is a role definition, not a restriction.

**Her first quest:** Structured problem statement — the compliance gap, 12 customer interviews, market size estimate, specific role needed. Hits Untested Tier. Three engineers upvote it within 48 hours. It graduates to main board.

**Two weeks later:** A Backend Warrior with banking-domain tags reaches out. He's checked her guild tenure history — two prior guilds, both over a year, both shipped. She's checked his — he ships. They form a guild. Equity agreement declared at formation.

*Requirements: Wanderer class + distinct sprite (scroll/compass hat), role constraint system (class-gated actions), structured quest template for domain experts, PM-class guild membership display, cross-class guild formation.*

---

### Journey Requirements Summary

| Capability Area | Driven By |
|---|---|
| Class selection + sprite identity onboarding (including Wanderer) | Journeys 1, 2, 5 |
| Skill tree (5-slot constraint) | Journeys 1, 2 |
| Role constraint system (class-gated actions) | Journey 5 |
| Quest board — Untested Tier, Rising Lane, main board | Journeys 1, 2, 4 |
| Structured quest template (domain expert variant) | Journey 5 |
| Guild formation + LFG slot display + application flow | Journeys 1, 2 |
| Cross-class guild formation | Journey 5 |
| Commitment signal / tenure history on profiles | Journeys 2, 3, 5 |
| Streak system + daily contribution prompt | Journeys 1, 3 |
| Equity agreement at formation | Journeys 1, 5 |
| Guild levels | Journey 2 |
| Heroic Mode (matching analytics, priority LFG) | Journey 2 |
| Slot re-opening + LFG re-posting on ghost | Journey 3 |
| Guild dissolution vs. rebuild decision flow | Journey 3 |
| Admin dashboard (flag queue, reputation audit, suspensions) | Journey 4 |
| Community flagging + quarantine queue | Journey 4 |
| Appeal flow + guild-level member removal | Journey 4 |

## Domain-Specific Requirements

### Privacy & Data Protection

- **GDPR compliance (V1):** Platform will serve EU users. Required at launch: user data export, account deletion with anonymization (see tenure history policy below), consent for data processing, privacy policy.
- **CCPA compliance (V1):** California users have right to know, delete, and opt out of data sale. No data sale model planned; standard deletion flow covers this.
- **Equity agreements:** Stored on-platform as a record of guild formation intent — not legally binding contracts, framed as commitment declarations. Full legal enforceability is a V3+ consideration requiring jurisdictional legal review.

**Tenure history under GDPR — design decision (Option A):** When a user deletes their account, tenure records are **anonymized but not erased**. Guild history entries display as "Former [Class], [Duration]" — the guild's commitment-signal integrity is preserved; the deleted user's identity is not. Users must be informed of this policy at account creation.

### Content Moderation & Platform Liability

- **Section 230 (US) baseline protections apply.** Platform must maintain a published content policy and DMCA takedown process at launch.
- **Harmful content policy:** Harassment, hate speech, and doxxing require defined community standards and admin tooling. The policy document is a V1 launch requirement.
- **Quest board liability:** User-generated content referencing third-party IP or making false market claims is a platform liability risk. Untested Tier + community flagging provides a first-pass filter; legal review of content policy before launch is recommended.

### Authentication & Account Security

- **2FA option (V1):** High-reputation accounts are high-value targets for takeover. Two-factor authentication must be available (not mandatory) at launch.
- **Rate limiting:** Upvotes, quest posts, and guild actions must be rate-limited at the API layer to prevent reputation farming bots.
- **Standard OWASP Top 10 mitigations** apply: XSS, CSRF, injection, broken authentication.

### Technical Constraints

- **Real-time requirements:** Daily reset must fire reliably per timezone window. Streak tracking must be consistent across sessions — no race conditions on increment/break.
- **Data retention:** User-generated content retained for platform integrity even after account deletion (anonymized). Guild tenure records retained indefinitely (anonymized on deletion per Option A).
- **No PII in URLs or logs:** Profile data, guild membership, and application history must not appear in server logs or shareable URLs in plaintext.

## Innovation & Novel Patterns

### Innovation Areas

**Innovation 1 — Commitment-signal layer as a first-class professional data type**

No co-founder matching or professional network platform treats *demonstrated follow-through* as a structured, queryable signal. LinkedIn shows job titles. GitHub shows contribution graphs. YC Matching shows a bio. Demo1 shows the shape of a person's commitment history — duration, role, outcome visibility — without judgment labels.

This creates a signal that didn't exist in professional contexts before, from behavioral data the platform naturally accumulates. The closest analogue is a credit score — structured behavior over time — but for collaboration reliability rather than financial reliability.

_Assumption challenged:_ "Professional identity is what you claim about yourself." Demo1 replaces self-reported credentials with observed behavioral patterns.

_Validation:_ Correlation between guild member tenure history patterns and guild ship rate at 6 months. If high-tenure-history guilds ship at 2x+ the rate of mixed-history guilds, the signal is real.

_Fallback:_ If gameable (users cycle through short guilds to look active), introduce outcome weighting — only shipped guilds contribute positive signal weight.

---

**Innovation 2 — Role-constrained class system as professional identity architecture**

The 5-slot skill tree constraint forces self-aware identity declaration. The Wanderer class has hard platform constraints (cannot fill engineering slots) that shape community norms from day one.

_Assumption challenged:_ "More information about a person's skills is always better." A forced 5-slot declaration is a more honest signal than 50 self-reported endorsements.

_Validation:_ LFG acceptance rate by skill tree completion at 90 days — do fully-utilized profiles get accepted at higher rates?

---

**Innovation 3 — Accountability infrastructure as the core product value**

Every social platform defines itself as a communication or discovery tool. Demo1 defines itself as accountability infrastructure — the guild social contract is the product, not the feed.

_Assumption challenged:_ "A social platform's job is to connect people and let them take it from there." Demo1's job is to make the "from there" part actually happen.

_Validation:_ North star is guilds that ship. Target: >25% guild ship rate at 12 months (vs. ~10–15% for solo side projects).

---

**Innovation 4 — Living Intelligence Feed: democratized market intelligence *(V2)***

Automated surfacing of validated market pain points from App Store reviews, Reddit, HN, and GitHub issues as pre-populated quests. Converts passive market research (expensive, network-gated) into a pull service available to every user.

_Assumption challenged:_ "Market validation requires either a network or expensive research."

_Validation (V2):_ Do Feed-sourced quests get picked up by guilds at higher rates than user-posted quests?

---

### Market Context

No direct competitor replicates any of these innovations:
- Commitment signal → nothing comparable exists in any professional platform
- Constrained identity → present in gaming; absent everywhere in professional tools
- Accountability infrastructure → build-in-public is the closest but relies on broadcast mechanics, not team contracts
- Living Intelligence Feed → paid tools (SimilarWeb, Sensor Tower) inaccessible to the target user

### Validation Approach Summary

| Innovation | V1 Validation Signal | Timeline |
|---|---|---|
| Commitment signal predicts guild success | Correlation: tenure history vs. ship rate | 6 months post-launch |
| Constrained identity produces higher-signal data | LFG acceptance rate by skill tree completion | 90 days post-launch |
| Accountability infrastructure drives shipping | Guild ship rate vs. 25% target | 12 months post-launch |
| Living Intelligence Feed (V2) | Feed quest pickup rate vs. organic quest rate | 3 months post-V2 |

## SaaS Platform Requirements

### Platform Model

Demo1 is a shared-instance SaaS platform — all users on a single deployment with no org-level tenant isolation. Users own individual profiles; guilds are shared multi-member spaces. No enterprise multi-tenancy in V1 or V2.

- **Shared platform, user-scoped data ownership.** Each user account is the atomic unit of identity.
- **Guild as shared namespace.** Guild lead has elevated permissions within guild scope; all members have read/write to guild-internal content.
- **No white-labeling or org-level configuration** in V1 or V2.

### Permission Matrix (RBAC)

| Role | Scope | Capabilities |
|---|---|---|
| Guest (unauthenticated) | Public | Browse quest board (read-only), view public profiles |
| New user (below reputation threshold) | Rising Lane | Post to Rising Lane, join guilds, apply to LFG slots, upvote quests |
| Established user (≥ reputation threshold) | Main board | All above + post to main quest board, lead guilds |
| Wanderer class (any rep level) | Platform-wide | Post quests, join guilds as domain expert — cannot fill engineering slots or lead technical guilds |
| Heroic Mode subscriber | Platform-wide | All established-user capabilities + advanced matching filters, analytics dashboard, priority LFG placement |
| Guild Lead | Guild scope | Manage guild roster, approve/reject LFG applications, post guild milestones, re-open slots |
| Platform Admin | Platform-wide | Flag queue management, reputation audits, suspensions, appeals processing, quarantine management |

Class-based capability constraints layer on top of role-based permissions. A Wanderer with Heroic Mode cannot fill an engineering slot regardless of subscription status. Class constraints are enforced at the API level, not just the UI.

### Subscription Tiers

**Free Tier (default):**
- Full platform access: browse, join guilds, apply to LFG slots, post quests via Rising Lane
- Daily reset, streak tracking, contribution prompts
- Guild tenure history (full)
- Guild formation (lead up to 1 active guild)
- Quest board upvoting and community flagging

**Heroic Mode (~$15–20/month):**
- Priority LFG placement — applications surfaced first to guild leads
- Advanced matching filters — filter candidates by skill tree, class, tenure patterns
- Guild analytics dashboard — contribution activity, streak health, slot fill velocity
- Lead up to 3 active guilds simultaneously (vs. 1 on free tier)

Pricing validated with willingness-to-pay research before V1 launch.

### Integration Requirements

**V1:** GitHub OAuth as primary sign-in (email/password fallback). No other external integrations. Stripe payment infrastructure architected in V1 even if billing UI ships shortly after launch — payment is painful to retrofit.

**V2:** GitHub (commits surface as quest progress updates), Discord (guild channel auto-created on guild formation via bot).

**V3+:** Linear (quest milestones map to board issues).

### Implementation Considerations

- Reputation threshold for main board access stored as admin-configurable value, not a hardcoded constant.
- Stripe integration architected in V1 data model and API surface, supporting subscription management without retrofitting.
- Rate limiting on reputation-earning actions enforced at the API layer.
- Streak calculation is timezone-aware — "daily" is relative to the user's declared timezone, not UTC. Streak break logic accounts for timezone edge cases.
- Mobile-first not required — primary audience is desktop developers. Responsive layout for key flows (profile, quest browse) is sufficient for V1. Native mobile app is not on the roadmap.

## Project Scoping & Phased Development

### MVP Strategy & Philosophy

**MVP Approach:** Experience MVP — V1 delivers the complete core loop (identity → guild formation → accountability → quest board) with the right tone, mechanics, and polish. The sprite class identity and gritty RotMG aesthetic are not optional — they are the first impression and the aha moment. A half-finished identity system is worse than no identity system.

**Delivery model:** Phased. Three discrete stages — MVP (V1), Growth (V2), Moat (V3+). Each stage is independently valuable. V2 built only if V1 proves the core loop; V3 built only if V2 proves defensibility.

**V1 minimum viable team:** 1 senior full-stack engineer (or 2 mid-level), 1 designer (pixel art + UI/UX), 1 PM/founder (Luis).

### V1 MVP — Scope Definition

**In scope for V1:**

1. **Sprite avatar + class selection** — gritty RotMG pixel art, class determines sprite palette and hat, delivered before account creation. Classes: Backend Warrior, Frontend Mage, DevOps Engineer, Full-Stack Rogue, ML Alchemist, System Architect, Security Sentinel, Wanderer. Subclass expansion V2+.
2. **Skill tree (5-slot constraint)** — languages, frameworks, domains. Hard limit of 5 selections. Powers LFG matching input. Cannot be skipped during onboarding.
3. **Guild formation + role-targeted LFG slots** — guild creation with declared role slots; unfilled slots displayed as gray silhouettes. Equity agreement at formation. Guild lead can post, approve, and re-open slots.
4. **Quest board — Untested Tier + Rising Lane + Reputation Gate** — new posts start in Untested Tier (marked unverified); Rising Lane for new accounts; main board for established users. 7-day auto-archive for unvoted quests. Reputation threshold admin-configurable without code deploy.
5. **Daily reset + contribution prompt + streak** — fires reliably per user timezone. Streak visible on profile. Contribution prompt delivered on streak-break day 3.
6. **Guild tenure history on profiles** — every profile displays full guild history: project name, class played, duration. No failure/success labels. Anonymized on account deletion (Option A).
7. **Heroic Mode subscription** — free tier fully functional. Heroic Mode: advanced matching filters, guild analytics dashboard, priority LFG placement, lead up to 3 guilds simultaneously. Stripe architected in V1.
8. **Wanderer/Quest Giver class** — distinct sprite (scroll/compass hat). Can post quests with structured problem-statement template, join guilds as domain expert. Cannot fill engineering slots or lead technical guilds. Class constraints enforced at API level.

**Also in V1 (supporting infrastructure):**
- GitHub OAuth as primary auth (email/password fallback)
- Admin dashboard: flag queue, reputation audit, suspension, quarantine management, appeal flow
- Community flagging: 3-flag quarantine for established users
- Platform content policy + DMCA takedown process (launch requirement)
- GDPR/CCPA data export and account deletion with tenure anonymization

**Out of scope for V1:**
- Living Intelligence Feed (V2)
- Guild level progression + First Kill broadcast (V2)
- GitHub commits integration (V2)
- Discord channel auto-creation (V2)
- Commitment signal matching recommendations (V2, matures at ~6 months)
- Cosmetic achievement unlocks (V2)
- Builder Quest / proof-of-work catalog (V2)
- Proprietary matching algorithm (V3+)
- B2B investor/accelerator layer (V3+)
- Native mobile app (not on roadmap)
- White-labeling / enterprise multi-tenancy (not on roadmap)

### V2 Growth — Post-MVP Features

Trigger criteria before starting V2: 50+ active guilds, 5+ guilds shipped, Day-7 retention above 40%.

1. **Living Intelligence Feed** — automated market signal surfacing from App Store reviews, Reddit, HN, GitHub issue trackers. Pre-populated quests with evidence. Human upvote required to graduate to main board.
2. **Guild level progression + First Kill broadcast** — guilds level from 1 (forming) to 7 (revenue/live product). Server-wide celebration when a guild ships. Sprites get temporary crown effect.
3. **GitHub integration** — commits surface as quest progress updates in guild view.
4. **Discord integration** — guild Discord channel auto-created on guild formation via Discord bot.
5. **Commitment signal dataset maturation** — matching recommendations begin at ~6 months of behavioral data. LFG compatibility scoring surfaces in Heroic Mode dashboard.
6. **Cosmetic achievement unlocks** — hat variants and accessories earned through guild milestones and shipping achievements. Completed guilds display subtle stars on member hats; veteran accounts earn crown variants. Cosmetic only, zero pay-to-win. Reinforces the RotMG identity system with progression that can be worn.
7. **Builder Quest / proof-of-work catalog** — optional personal micro-challenge catalog. Users complete scoped real-world build tasks (not LeetCode) and publish artifacts to their profile. Signal: ability to ship independently, complementing guild tenure history. Visible to guild leads in LFG review flow.

### V3+ Vision — Moat Layer

Requires community density (5,000+ active users, 500+ guilds).

1. **Proprietary matching algorithm** — predictive team compatibility and quest success probability from compounding guild outcome data. The algorithm no competitor can replicate.
2. **B2B investor/accelerator layer** — guilds at Level 5+ surfaced to curated investor/accelerator network. Investors pay for pipeline access; no cost to builders.
3. **Geographic and language expansion** — non-English markets with strong indie dev communities (Brazil, Germany, India).
4. **Linear integration** — quest milestones map to Linear board issues.

### Risk Mitigation Strategy

| Risk | Category | Mitigation |
|---|---|---|
| Cold start — no users on day one | Market | Credibility seed: recruit 50 high-signal indie devs pre-launch (open source maintainers, indie hackers, dev content creators). Their active guilds are the platform's opening cinematic; their audiences follow. |
| Ghost collaborators undermine trust early | Product | Guild tenure history + streak break visibility are V1 features. Social cost of ghosting is visible from day one — not retrofitted. |
| Commitment signal gets gamed (join-and-ghost cycling) | Product | Weight signal by guild outcome, not just duration. Ghost detection via streak breaks. |
| Sprite identity feels "cute" and alienates senior engineers | Design | RotMG aesthetic, not Animal Crossing. Senior engineer test: would a 35-year-old with 3,000 WoW hours think this is cool? That is the design constraint. |
| Reputation gate too aggressive, kills new user retention | Product | Rising Lane solves this — newcomers have their own active feed and aren't competing with established users for visibility. |
| Constrained identity (5-slot tree) alienates users wanting full profiles | Product | Skill tree is additive within the constraint; bio field available for nuance. |
| Accountability framing feels high-pressure, drives away casual users | Product | Free tier is low-commitment. Heroic Mode self-selects for serious builders. |
| Living Intelligence Feed (V2) produces noise, not signal | Technical | Curated sources first (App Store + HN). Human upvote required to graduate. AI pre-screen added once training data exists. |
| Heroic Mode fails to convert | Business | Free tier is genuinely useful — not a demo or crippled version. If free tier isn't useful, the whole platform fails, not just monetization. |
| Foundersbase or new entrant copies mechanics before BitGuild launches | Market | Speed and community density are the moat. First to accumulate commitment-signal behavioral data wins. Credibility seed strategy is the fastest path to density. |

## Functional Requirements

### Identity & Onboarding

- **FR1:** A new user can select a class (Backend Warrior, Frontend Mage, DevOps Engineer, Full-Stack Rogue, ML Alchemist, System Architect, Security Sentinel, or Wanderer) before completing account creation
- **FR2:** A user can view a gritty pixel-art sprite avatar on their profile reflecting their selected class
- **FR3:** A user can declare up to 5 skill tree selections (languages, frameworks, domains) during onboarding
- **FR4:** A user can update their skill tree selections after initial onboarding
- **FR5:** The system enforces class-based capability constraints at the API level — Wanderer class users cannot fill engineering slots or lead technical guilds
- **FR6:** *(V2)* A user's sprite avatar displays cosmetic unlocks (hat variants, accessories, milestone stars, veteran crown variants) earned through guild shipping achievements — cosmetic only, zero pay-to-win

### Guild Operations

- **FR7:** A user can create a guild with declared role slots and a founding equity agreement
- **FR8:** A guild lead can post role-targeted LFG slots with specific class and skill requirements
- **FR9:** A user can apply to an open LFG slot with a brief application message
- **FR10:** A guild lead can approve or reject LFG applications, with access to each applicant's full profile and guild tenure history
- **FR11:** A guild lead can re-open an LFG slot when a member leaves or becomes inactive
- **FR12:** A guild member can view the current guild roster including unfilled slots displayed as gray silhouettes
- **FR13:** Any user can view a guild's public profile including domain tags, active roster, and milestone history
- **FR14:** Any authenticated user can follow (spectate) a guild's public progress
- **FR15:** A guild lead can post public guild milestones
- **FR16:** A guild lead can remove a member from the guild independently of any platform-level suspension
- **FR17:** A guild member can voluntarily leave a guild
- **FR18:** *(V2)* The platform tracks guild level progression through defined milestone stages (idea → forming → active → shipped → revenue)
- **FR19:** *(V2)* The platform broadcasts a "First Kill" celebration server-wide when a guild crosses a defined shipping milestone

### Quest Board & Content Discovery

- **FR20:** An established user (above reputation threshold) can post a quest to the main quest board
- **FR21:** A new user (below reputation threshold) can post a quest to the Rising Lane feed
- **FR22:** A Wanderer class user can post a quest using a structured problem-statement template (problem statement, market evidence, role needed)
- **FR23:** Any guest or authenticated user can browse the main quest board (read-only for unauthenticated guests)
- **FR24:** An established user can browse the Rising Lane feed
- **FR25:** A new quest automatically starts in the Untested Tier (marked unverified) before graduating to the main board
- **FR26:** A user can upvote a quest in the Untested Tier or Rising Lane to advance it toward graduation
- **FR27:** The system automatically archives Untested Tier quests that receive no upvotes within 7 days
- **FR28:** A user can flag a quest as spam or a content policy violation
- **FR29:** The platform automatically quarantines a quest that receives 3 flags from established users
- **FR30:** *(V2)* The platform automatically surfaces validated market pain points from external sources (App Store reviews, Reddit, HN, GitHub issues) as pre-populated quests with attached evidence

### Reputation, Trust & Moderation

- **FR31:** A user earns reputation through upvoted quest posts, guild contributions, completed projects, and community engagement
- **FR32:** A user's reputation score is visible on their public profile
- **FR33:** The platform enforces a configurable reputation threshold gating main board posting; adjustable by a platform admin without a code deployment
- **FR34:** The platform maintains separate Rising Lane and main board feeds, ensuring new accounts are visible to established users who browse Rising Lane
- **FR35:** The platform rate-limits reputation-earning actions (upvotes, quest posts, guild applications) to prevent automated farming

### Daily Engagement & Commitment Signals

- **FR36:** The platform executes a daily reset per user timezone, surfacing new quests and guild contribution prompts
- **FR37:** A user's active streak counter increments daily and is displayed publicly on their profile
- **FR38:** The system delivers a contribution prompt to a user on day 3 of a streak break
- **FR39:** A user's profile displays a complete guild tenure history (project name, class played, duration) without failure or success labels
- **FR40:** The system records and updates guild tenure history in real time as users join and leave guilds
- **FR41:** When a user deletes their account, their tenure history entries are anonymized to "Former [Class], [Duration]" — not erased — preserving guild commitment-signal integrity

### Profile & Proof-of-Work

- **FR42:** *(V2)* A user can optionally browse and complete Builder Quests — scoped micro-challenges that produce a small shipped artifact, not an algorithmic puzzle
- **FR43:** *(V2)* Completed Builder Quests display on a user's public profile as proof-of-work artifacts, visible to guild leads reviewing LFG applications alongside guild tenure history

### Subscription Tiers & Access Control

- **FR44:** A free-tier user can access all core platform capabilities: browse, join guilds, apply to LFG slots, post quests via Rising Lane, track streaks, and lead 1 active guild
- **FR45:** A Heroic Mode subscriber can access advanced LFG matching filters (by skill tree, class, tenure patterns)
- **FR46:** A Heroic Mode subscriber can view a guild analytics dashboard showing contribution activity, streak health, and slot fill velocity
- **FR47:** A Heroic Mode subscriber's LFG applications are surfaced with priority to guild leads
- **FR48:** A Heroic Mode subscriber can lead up to 3 active guilds simultaneously
- **FR49:** The platform enforces role-based access control (Guest, New User, Established User, Wanderer, Heroic Mode, Guild Lead, Platform Admin) at the API level

### Platform Administration

- **FR50:** A platform admin can view a moderation flag queue showing flagged content with context (post text, flag reasons, flagger and poster reputation scores)
- **FR51:** A platform admin can quarantine, approve, or dismiss flagged quests
- **FR52:** A platform admin can issue and lift user posting suspensions
- **FR53:** A platform admin can process and resolve user appeals against suspensions
- **FR54:** A platform admin can run reputation audits showing the percentage of board posts from below-threshold accounts
- **FR55:** A platform admin can adjust the reputation threshold via platform configuration without a code deployment

### Account Management & Compliance

- **FR56:** A user can authenticate using GitHub OAuth as the primary sign-in method
- **FR57:** A user can authenticate using email and password as a fallback sign-in method
- **FR58:** A user can enable two-factor authentication on their account
- **FR59:** A user can export all their personal data on request (GDPR/CCPA compliance)
- **FR60:** A user can delete their account, triggering the tenure anonymization flow (Option A) and full PII removal
- **FR61:** The platform maintains a published content policy and DMCA takedown process accessible to all users

## Non-Functional Requirements

### Performance

- **NFR-P1:** Quest board feed and user profile pages load within 2 seconds at the 95th percentile under normal load
- **NFR-P2:** LFG application submission and quest upvote actions return a confirmation response within 500ms at the 95th percentile
- **NFR-P3:** The daily reset completes for all users within their scheduled timezone window — no user experiences a reset delayed by more than 15 minutes
- **NFR-P4:** Streak state is consistent across concurrent sessions — no race conditions on streak increment or break; a user opening two tabs simultaneously cannot produce an inconsistent streak value
- **NFR-P5:** Guild roster updates (member join, leave, slot re-open) reflect on all active viewers within 5 seconds without a manual page refresh

### Security

- **NFR-S1:** All data encrypted in transit using TLS 1.2 or higher; all PII and guild data encrypted at rest
- **NFR-S2:** No PII (name, email, profile data, guild membership) appears in server logs, error traces, or shareable URLs in plaintext
- **NFR-S3:** GitHub OAuth implementation follows OAuth 2.0 best practices including state parameter validation and PKCE; tokens stored securely, refresh/revocation handled gracefully
- **NFR-S4:** Rate limiting on all reputation-earning actions enforced at the API layer — not solely the UI — with limits sufficient to make automated farming economically unviable
- **NFR-S5:** The platform mitigates OWASP Top 10 vulnerabilities — XSS, CSRF, SQL injection, broken authentication — before launch
- **NFR-S6:** GDPR data export requests fulfilled within 30 days; account deletion and tenure anonymization complete within 7 days of request
- **NFR-S7:** Stripe payment integration meets PCI DSS SAQ A compliance — card data never touches BitGuild servers; all payment processing delegated to Stripe's hosted elements

### Scalability

- **NFR-SC1:** V1 architecture supports 500 concurrent users without measurable performance degradation
- **NFR-SC2:** System designed to support 10,000 concurrent users (V2 horizon) without re-architecture — horizontal scaling of stateless services possible without schema changes
- **NFR-SC3:** Guild tenure history records accumulate indefinitely with no hard storage limits per user or per guild
- **NFR-SC4:** Daily reset job scales horizontally — adding more users requires increasing execution capacity, not re-engineering the scheduling system

### Reliability

- **NFR-R1:** Platform availability target is 99.5% uptime, excluding scheduled maintenance windows communicated at least 24 hours in advance
- **NFR-R2:** The daily reset fires successfully for 99.9% of users on the scheduled day — a failed reset is a P1 incident requiring same-day resolution
- **NFR-R3:** Zero data loss on quest submissions, guild formation records, LFG applications, and streak records
- **NFR-R4:** Streak calculation is idempotent — if a reset job retries due to failure, a user's streak must not double-increment or falsely break

### Accessibility

- **NFR-A1:** All primary user flows (onboarding, quest board browsing, guild application, profile viewing) conform to WCAG 2.1 Level AA
- **NFR-A2:** Pixel art sprite avatars include descriptive alt text for screen readers (e.g., "Backend Warrior sprite, [username]")
- **NFR-A3:** Color contrast ratios for all text and interactive elements meet WCAG 2.1 AA minimums — the gritty RotMG aesthetic must not sacrifice readability
- **NFR-A4:** All core platform actions are operable via keyboard navigation without requiring a mouse

### Integration

- **NFR-I1:** *(V1)* GitHub OAuth token handling is resilient — revoked or expired tokens redirect users to re-authenticate without data loss or session corruption
- **NFR-I2:** *(V1)* Stripe integration is architected as a first-class payment rail in V1 — the data model and API surface support subscription management without retrofitting
- **NFR-I3:** *(V2)* GitHub webhook events that fail to process do not block guild functionality — webhook processing is async and failure-tolerant with retry logic
- **NFR-I4:** *(V2)* Discord bot guild channel creation is non-blocking — if Discord API is unavailable at guild formation, the guild is created successfully and Discord provisioning retries asynchronously
