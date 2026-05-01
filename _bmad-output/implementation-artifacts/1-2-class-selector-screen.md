# Story 1.2: Class Selector Screen

Status: done

## Story

As a new visitor to BitGuild,
I want to select my developer class and see my pixel sprite render instantly before creating an account,
so that my identity is established before I commit to the platform.

## Acceptance Criteria

1. **Given** an unauthenticated user visits the home page (`/`)
   **When** the page loads
   **Then** the class selector screen is the first full-screen view — no auth gate before this screen
   **And** all 8 class cards are visible: Backend Warrior, Frontend Mage, DevOps Engineer, Full-Stack Rogue, ML Alchemist, System Architect, Security Sentinel, Wanderer
   **And** each card shows the class name, description, and a 128×128px pixel sprite with `image-rendering: pixelated` (never blurred)
   **And** a "Step 1 of 2 — Pick your class" progress indicator is visible

2. **Given** the class selector is displayed
   **When** a user clicks a class card
   **Then** the card shows an amber ring highlight
   **And** the selected class is stored in `sessionStorage` under key `pendingClass`
   **And** a "Claim [Class Name]" primary CTA button activates

3. **Given** a user selects a class and navigates away without completing OAuth
   **When** they return to the class selector
   **Then** the previously selected class is restored from `sessionStorage` and shown as active

4. **Given** the class selector is displayed
   **When** a user navigates via keyboard (arrow keys, Enter to select)
   **Then** all class cards are focusable; `aria-selected="true"` is set on the active card
   **And** the amber focus ring `focus-visible:ring-2 focus-visible:ring-primary` is visible on the focused card
   **And** the skip link `<a href="#main-content">` is the first `<body>` element, visible on focus only (already in root layout — do not duplicate)

## Tasks / Subtasks

- [x] Task 1: Define UserClass enum and class metadata (AC: #1, #2)
  - [x] Create `src/types/user.ts` with `UserClass` enum (8 values, all-caps underscore)
  - [x] Export `CLASS_META` lookup constant: key = UserClass value, value = `{ label, description, sprite }` for all 8 classes
  - [x] Run `tsc --noEmit` to confirm no type errors

- [x] Task 2: Add placeholder sprite assets (AC: #1)
  - [x] Create `/public/sprites/` directory
  - [x] Add 8 placeholder PNG files using minimal base64-decoded 128×128 colored square per class (see Dev Notes for exact approach)
  - [x] Filenames must match: `backend-warrior.png`, `frontend-mage.png`, `devops-engineer.png`, `fullstack-rogue.png`, `ml-alchemist.png`, `system-architect.png`, `security-sentinel.png`, `wanderer.png`

- [x] Task 3: Build `AvatarSprite` component (AC: #1)
  - [x] Create `src/components/BitGuild/AvatarSprite.tsx`
  - [x] Props: `src: string`, `alt: string`, `size: 'sm' | 'md' | 'lg'`, `ring?: boolean`, `inactive?: boolean`, `className?: string`
  - [x] Size map: `sm` = 32px, `md` = 64px, `lg` = 128px
  - [x] CSS: `image-rendering: pixelated` always, never omit
  - [x] States: Default → Ring (amber border 2px) → Inactive (grayscale + opacity-50) → Loading (skeleton) → Error (shadcn `<Avatar>` fallback initials)
  - [x] Write unit tests: renders at each size, ring state, inactive state, error fallback (7 tests)

- [x] Task 4: Build `ClassSelector` component (AC: #1, #2, #3, #4)
  - [x] Create `src/components/onboarding/ClassSelector.tsx`
  - [x] Render 8 class cards in a responsive grid (2 cols mobile, 4 cols desktop)
  - [x] Each card: `AvatarSprite` at `lg` size + class name + description
  - [x] Selection state: amber ring on selected card (`ring-2 ring-primary`)
  - [x] On card click: set selected class in component state, write `sessionStorage.setItem('pendingClass', classValue)`
  - [x] On mount: read `sessionStorage.getItem('pendingClass')` and restore pre-selected class
  - [x] CTA button: `disabled` when no class selected; label = "Claim [Class Name]"; links to `/login` (Story 1.3 creates that page)
  - [x] Keyboard nav: `role="listbox"` on grid, `role="option"` + `aria-selected` on each card; roving tabindex, arrow keys move focus, Enter selects focused card
  - [x] Write unit tests: initial render, click selection + sessionStorage write, sessionStorage restore on mount, keyboard Enter selection, CTA disabled/enabled, aria-selected attribute (9 tests)

- [x] Task 5: Create `(auth)` route group layout (AC: #1)
  - [x] Create `src/app/(auth)/layout.tsx` — minimal layout, no sidebar, full-screen children
  - [x] No auth check here — this group is unauthenticated by design

- [x] Task 6: Create onboarding page (AC: #1)
  - [x] Create `src/app/(auth)/onboarding/page.tsx`
  - [x] Full-screen centered layout, dark background
  - [x] Progress indicator at top: "Step 1 of 2 — Pick your class"
  - [x] ClassSelector placeholder comment — wired in Task 4
  - [x] Page is a Server Component; `ClassSelector` is the Client Component boundary

- [x] Task 7: Update root page to redirect to `/onboarding` (AC: #1)
  - [x] Modified `src/app/page.tsx` to `redirect('/onboarding')` using `next/navigation`
  - [x] Note: Story 1.3 will update this to redirect authenticated users to `/dashboard` and unauthenticated to `/onboarding`

- [x] Task 8: Run full validation (all ACs)
  - [x] `tsc --noEmit` clean
  - [x] `eslint . --ext .ts,.tsx --max-warnings 0` clean
  - [x] All new tests pass (16/16 — 7 AvatarSprite + 9 ClassSelector)
  - [ ] `next build` passes ← deferred (requires live DB for env validation)

## Dev Notes

### Critical Architectural Rules (inherit from Story 1.1)

- **`process.env` is FORBIDDEN outside `src/env.js`** — exception: `process.env.NODE_ENV` is a build-time constant, allowed in client components.
- **Singleton imports only** — `db` from `~/server/db`, `redis` from `~/server/redis`.
- **This story makes zero tRPC calls and zero database writes.** Class selection is stored in `sessionStorage` only and carried across the OAuth redirect in Story 1.3.
- **No new env vars** — this story adds no new environment variables.

### Component File Locations

Per UX spec (UX-DR1) and epics Notes: all 7 custom components live in **`src/components/BitGuild/`** (not `shared/`):
- `src/components/BitGuild/AvatarSprite.tsx` ← introduced this story
- `src/components/BitGuild/ClassBadge.tsx` ← future stories

Per epics Notes: the onboarding-specific page-level component goes in **`src/components/onboarding/`**:
- `src/components/onboarding/ClassSelector.tsx` ← introduced this story

### UserClass Enum

```typescript
// src/types/user.ts
export enum UserClass {
  BACKEND_WARRIOR    = "BACKEND_WARRIOR",
  FRONTEND_MAGE      = "FRONTEND_MAGE",
  DEVOPS_ENGINEER    = "DEVOPS_ENGINEER",
  FULLSTACK_ROGUE    = "FULLSTACK_ROGUE",
  ML_ALCHEMIST       = "ML_ALCHEMIST",
  SYSTEM_ARCHITECT   = "SYSTEM_ARCHITECT",
  SECURITY_SENTINEL  = "SECURITY_SENTINEL",
  WANDERER           = "WANDERER",
}
```

`UserClass` will be added to the Prisma schema in Story 1.3 as a Prisma enum. Do NOT add it to Prisma schema in this story.

### Class Metadata — Exact Copy

```typescript
// src/types/user.ts
export const CLASS_META: Record<UserClass, { label: string; description: string; sprite: string }> = {
  [UserClass.BACKEND_WARRIOR]: {
    label: "Backend Warrior",
    description: "Wields databases and APIs with precision. The backbone of every high-performing guild.",
    sprite: "/sprites/backend-warrior.png",
  },
  [UserClass.FRONTEND_MAGE]: {
    label: "Frontend Mage",
    description: "Conjures interfaces that feel like magic. Turns complex logic into elegant experiences.",
    sprite: "/sprites/frontend-mage.png",
  },
  [UserClass.DEVOPS_ENGINEER]: {
    label: "DevOps Engineer",
    description: "Keeps the castle running. Infrastructure, deployments, and reliability are your domain.",
    sprite: "/sprites/devops-engineer.png",
  },
  [UserClass.FULLSTACK_ROGUE]: {
    label: "Full-Stack Rogue",
    description: "Nimble across the entire stack. You move fast and build where others hesitate.",
    sprite: "/sprites/fullstack-rogue.png",
  },
  [UserClass.ML_ALCHEMIST]: {
    label: "ML Alchemist",
    description: "Transmutes raw data into insight. Training models and finding patterns is your craft.",
    sprite: "/sprites/ml-alchemist.png",
  },
  [UserClass.SYSTEM_ARCHITECT]: {
    label: "System Architect",
    description: "Designs the foundations others build on. Scalability, reliability, and clarity are your standards.",
    sprite: "/sprites/system-architect.png",
  },
  [UserClass.SECURITY_SENTINEL]: {
    label: "Security Sentinel",
    description: "Guards the walls. Vulnerabilities are puzzles you solve before attackers find them.",
    sprite: "/sprites/security-sentinel.png",
  },
  [UserClass.WANDERER]: {
    label: "Wanderer",
    description: "You spot the gaps others miss. You can't fill the Backend slot, but you can define the quest that makes it worth filling.",
    sprite: "/sprites/wanderer.png",
  },
};
```

The Wanderer description is specified verbatim in the epics — do not change it.

### Sprite Placeholder Strategy

Sprite PNGs are production design assets created by a designer in a later sprint. For this story, create 1×1 pixel PNG placeholders — the AvatarSprite error fallback handles missing/broken images gracefully. The simplest approach:

```typescript
// scripts/create-placeholders.mjs (run once, then delete)
import { writeFileSync, mkdirSync } from "fs";

// Minimal valid 1×1 PNG (red pixel) — base64
const PLACEHOLDER_PNG = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwADhQGAWjR9awAAAABJRU5ErkJggg==",
  "base64"
);

const sprites = [
  "backend-warrior", "frontend-mage", "devops-engineer", "fullstack-rogue",
  "ml-alchemist", "system-architect", "security-sentinel", "wanderer",
];

mkdirSync("public/sprites", { recursive: true });
for (const name of sprites) {
  writeFileSync(`public/sprites/${name}.png`, PLACEHOLDER_PNG);
}
console.log("Sprites created.");
```

Run: `node scripts/create-placeholders.mjs` then delete the script. The `AvatarSprite` error state (shadcn Avatar fallback) will display class initials if any PNG is broken.

### AvatarSprite — Exact Implementation Guide

```tsx
// src/components/BitGuild/AvatarSprite.tsx
"use client";

import Image from "next/image";
import { useState } from "react";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { cn } from "~/lib/utils";

type AvatarSpriteProps = {
  src: string;
  alt: string;
  size?: "sm" | "md" | "lg";
  ring?: boolean;
  inactive?: boolean;
  className?: string;
};

const SIZE_MAP = { sm: 32, md: 64, lg: 128 } as const;

export function AvatarSprite({
  src, alt, size = "md", ring = false, inactive = false, className,
}: AvatarSpriteProps) {
  const [error, setError] = useState(false);
  const px = SIZE_MAP[size];

  if (error) {
    return (
      <Avatar style={{ width: px, height: px }} className={className}>
        <AvatarFallback className="bg-surface text-text-secondary text-xs">
          {alt.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
    );
  }

  return (
    <div
      className={cn(
        "overflow-hidden rounded",
        ring && "ring-2 ring-primary ring-offset-2 ring-offset-background",
        inactive && "opacity-50 grayscale",
        className,
      )}
      style={{ width: px, height: px }}
    >
      <Image
        src={src}
        alt={alt}
        width={px}
        height={px}
        style={{ imageRendering: "pixelated" }}
        onError={() => setError(true)}
      />
    </div>
  );
}
```

**Non-negotiable rule:** `imageRendering: "pixelated"` must be set inline on every `<Image>`. Tailwind does not have a built-in `image-rendering` utility in the installed version.

### ClassSelector — Key Implementation Patterns

```tsx
// src/components/onboarding/ClassSelector.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { UserClass, CLASS_META } from "~/types/user";
import { AvatarSprite } from "~/components/BitGuild/AvatarSprite";
import { Button } from "~/components/ui/button";

const CLASSES = Object.values(UserClass);
const SESSION_KEY = "pendingClass";

export function ClassSelector() {
  const [selected, setSelected] = useState<UserClass | null>(null);
  const router = useRouter();

  // AC3: restore from sessionStorage on mount
  useEffect(() => {
    const saved = sessionStorage.getItem(SESSION_KEY) as UserClass | null;
    if (saved && Object.values(UserClass).includes(saved)) {
      setSelected(saved);
    }
  }, []);

  function handleSelect(cls: UserClass) {
    setSelected(cls);
    sessionStorage.setItem(SESSION_KEY, cls); // AC2
  }

  const meta = selected ? CLASS_META[selected] : null;

  return (
    <div className="w-full max-w-4xl">
      {/* 8-card grid */}
      <ul
        role="listbox"
        aria-label="Select your developer class"
        className="grid grid-cols-2 gap-4 md:grid-cols-4"
      >
        {CLASSES.map((cls) => {
          const { label, description, sprite } = CLASS_META[cls];
          const isSelected = selected === cls;
          return (
            <li
              key={cls}
              role="option"
              aria-selected={isSelected}
              tabIndex={0}
              onClick={() => handleSelect(cls)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleSelect(cls);
                }
              }}
              className={[
                "cursor-pointer rounded border p-4 flex flex-col items-center gap-3",
                "bg-surface border-border",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                isSelected ? "ring-2 ring-primary border-primary" : "hover:border-primary/50",
              ].join(" ")}
            >
              <AvatarSprite
                src={sprite}
                alt={label}
                size="lg"
                ring={isSelected}
                inactive={!isSelected && selected !== null}
              />
              <span className="font-pixel text-[10px] text-primary leading-tight text-center">
                {label}
              </span>
              <p className="text-xs text-text-secondary text-center leading-snug">{description}</p>
            </li>
          );
        })}
      </ul>

      {/* CTA — AC2 */}
      <div className="mt-8 flex justify-center">
        <Button
          disabled={!selected}
          onClick={() => router.push("/login")}
          className="px-8"
        >
          {meta ? `Claim ${meta.label}` : "Pick your class"}
        </Button>
      </div>
    </div>
  );
}
```

**Arrow key navigation:** The above uses `tabIndex={0}` on each card for direct tab navigation. For full arrow-key navigation (AC4 says "arrow keys"), enhance with a `useRef`-based roving tabindex pattern — only the currently focused card has `tabIndex={0}`, others are `tabIndex={-1}`, and `onKeyDown` on the container handles `ArrowLeft/ArrowRight/ArrowUp/ArrowDown` to move focus. This is the ARIA grid/listbox pattern. Implementation guidance:

```tsx
// Container: onKeyDown handles arrow keys, move focus to adjacent card
// Card: tabIndex={isFocused ? 0 : -1}, ref to programmatically focus
```

### Routing — (auth) Group

```
src/app/
├── page.tsx                      ← redirect('/onboarding')  [MODIFY]
└── (auth)/
    ├── layout.tsx                ← minimal, no sidebar     [CREATE]
    └── onboarding/
        └── page.tsx              ← ClassSelector page       [CREATE]
```

`(auth)/layout.tsx` is a Next.js route group layout — parentheses in directory name mean no URL segment. Visiting `/onboarding` renders through this layout without `/auth/` in the URL.

**Root page.tsx modification:**
```tsx
import { redirect } from "next/navigation";
export default function HomePage() {
  redirect("/onboarding");
}
```

Story 1.3 will update this to redirect authenticated users to `/(platform)/` and unauthenticated to `/onboarding`.

**`(auth)/layout.tsx`:**
```tsx
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center">
      {children}
    </div>
  );
}
```

**`(auth)/onboarding/page.tsx`:**
```tsx
import { ClassSelector } from "~/components/onboarding/ClassSelector";

export const metadata = { title: "Choose your class — BitGuild" };

export default function OnboardingPage() {
  return (
    <main id="main-content" className="w-full px-4 py-12">
      <div className="mb-8 text-center">
        <p className="text-xs text-text-secondary uppercase tracking-widest mb-2">
          Step 1 of 2 — Pick your class
        </p>
        <h1 className="text-2xl font-bold text-text-primary">Who are you?</h1>
      </div>
      <ClassSelector />
    </main>
  );
}
```

### sessionStorage Contract

- **Key:** `"pendingClass"`
- **Value:** One of the `UserClass` enum string values (e.g., `"BACKEND_WARRIOR"`)
- **Written:** On class card click/Enter in `ClassSelector`
- **Read:** On `ClassSelector` mount to restore selection (AC3)
- **Consumed + cleared:** Story 1.3 OAuth callback reads and clears this key when creating the user account
- **Validation on read:** Always check `Object.values(UserClass).includes(savedValue)` before trusting the value — protects against stale or tampered storage

### Dark Forge Token Usage for Class Cards

Use CSS variables via Tailwind theme extensions from Story 1.1:

| Element | Token |
|---------|-------|
| Card background | `bg-surface` (`#151820`) |
| Card border (idle) | `border-border` (`#2a2d3a`) |
| Card border (selected/hover) | `border-primary` / `border-primary/50` |
| Selection ring | `ring-primary` (`#c8a862`) |
| Class name label | `text-primary` with `font-pixel` |
| Description text | `text-text-secondary` |
| CTA button | shadcn `<Button>` default — amber primary |
| Page background | `bg-background` (`#0d0f14`) |

**Font rule:** `font-pixel` (Press Start 2P) is used ONLY for the class name label beneath the sprite. Not for descriptions, progress indicator, or CTA text. This is the single-use constraint from Story 1.1 Dev Notes.

### Testing Infrastructure

Story 1.1 did not set up a test runner. This story introduces the first component unit tests. Add Vitest + React Testing Library:

```bash
npm install -D vitest @vitejs/plugin-react @testing-library/react @testing-library/user-event @testing-library/jest-dom jsdom
```

Create `vitest.config.ts`:
```typescript
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    globals: true,
  },
  resolve: {
    alias: { "~": path.resolve(__dirname, "./src") },
  },
});
```

Create `src/test/setup.ts`:
```typescript
import "@testing-library/jest-dom";
```

Add to `package.json` scripts:
```json
"test": "vitest run",
"test:watch": "vitest"
```

### AvatarSprite Tests

```typescript
// src/components/BitGuild/AvatarSprite.test.tsx
import { render, screen } from "@testing-library/react";
import { AvatarSprite } from "./AvatarSprite";

describe("AvatarSprite", () => {
  it("renders image at lg size (128px)", () => {
    render(<AvatarSprite src="/sprites/backend-warrior.png" alt="Backend Warrior" size="lg" />);
    const img = screen.getByRole("img", { name: /backend warrior/i });
    expect(img).toHaveStyle({ imageRendering: "pixelated" });
  });

  it("applies ring class when ring=true", () => {
    const { container } = render(
      <AvatarSprite src="/sprites/backend-warrior.png" alt="Backend Warrior" ring />
    );
    expect(container.firstChild).toHaveClass("ring-primary");
  });

  it("applies grayscale when inactive=true", () => {
    const { container } = render(
      <AvatarSprite src="/sprites/backend-warrior.png" alt="Backend Warrior" inactive />
    );
    expect(container.firstChild).toHaveClass("grayscale");
  });

  it("shows fallback Avatar on image error", async () => {
    render(<AvatarSprite src="/nonexistent.png" alt="Backend Warrior" />);
    // Trigger error state — simulate via fireEvent.error or test the error state directly
  });
});
```

### ClassSelector Tests

```typescript
// src/components/onboarding/ClassSelector.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ClassSelector } from "./ClassSelector";
import { UserClass } from "~/types/user";

// Mock next/navigation
jest.mock("next/navigation", () => ({ useRouter: () => ({ push: jest.fn() }) }));

beforeEach(() => sessionStorage.clear());

describe("ClassSelector", () => {
  it("renders all 8 class cards", () => {
    render(<ClassSelector />);
    expect(screen.getAllByRole("option")).toHaveLength(8);
  });

  it("marks selected card with aria-selected=true and writes sessionStorage", async () => {
    render(<ClassSelector />);
    const backendCard = screen.getByRole("option", { name: /backend warrior/i });
    await userEvent.click(backendCard);
    expect(backendCard).toHaveAttribute("aria-selected", "true");
    expect(sessionStorage.getItem("pendingClass")).toBe(UserClass.BACKEND_WARRIOR);
  });

  it("restores class from sessionStorage on mount", () => {
    sessionStorage.setItem("pendingClass", UserClass.FRONTEND_MAGE);
    render(<ClassSelector />);
    const frontendCard = screen.getByRole("option", { name: /frontend mage/i });
    expect(frontendCard).toHaveAttribute("aria-selected", "true");
  });

  it("CTA button is disabled with no selection", () => {
    render(<ClassSelector />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("CTA button is enabled and shows class name after selection", async () => {
    render(<ClassSelector />);
    await userEvent.click(screen.getByRole("option", { name: /wanderer/i }));
    const btn = screen.getByRole("button", { name: /claim wanderer/i });
    expect(btn).not.toBeDisabled();
  });

  it("selects class on Enter key", async () => {
    render(<ClassSelector />);
    const card = screen.getByRole("option", { name: /ml alchemist/i });
    card.focus();
    await userEvent.keyboard("{Enter}");
    expect(card).toHaveAttribute("aria-selected", "true");
  });
});
```

**Important for mocking:** `next/navigation` uses ES module exports. Use `vi.mock` (Vitest) not `jest.mock`. Adjust mock import style to Vitest:
```typescript
import { vi } from "vitest";
vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn() }) }));
```

### Next.js Image component in tests

`next/image` uses browser APIs not available in jsdom. Mock it in `src/test/setup.ts`:
```typescript
import { vi } from "vitest";
vi.mock("next/image", () => ({
  default: ({ src, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src as string} alt={alt} {...props} />
  ),
}));
```

### What NOT to Build Here

- **No tRPC mutations** — class is stored in sessionStorage only; Prisma write happens in Story 1.3 OAuth callback
- **No Prisma schema changes** — UserClass enum is added to schema in Story 1.3 when the full User model is extended
- **No `/login` page** — linked from CTA but created in Story 1.3
- **No `middleware.ts`** — auth-gating redirects are Story 1.3 work
- **No ClassBadge, GuildSlot, TenureBar, StreakBadge, or ReputationMeter** — those are later story components
- **No Wanderer class constraint enforcement** — the "cannot fill Backend slot" rule is tRPC middleware in Story 1.6

### Files to Read Before Modifying

- `src/app/page.tsx` — current root page (simple placeholder; safe to replace with redirect)
- `src/app/layout.tsx` — root layout (skip link, PHProvider, TRPCReactProvider — do not touch)
- `src/app/globals.css` — confirm all 9 Dark Forge tokens present
- `tailwind.config.ts` — confirm `font-pixel`, `bg-surface`, `text-primary`, etc. are available

### Previous Story Intelligence (from Story 1.1)

- `font-pixel` CSS variable is loaded in root layout as `--font-pixel` and extended in Tailwind as `fontFamily.pixel`
- All Dark Forge tokens are in `globals.css` and Tailwind theme — use `bg-surface`, `text-primary`, etc. throughout
- shadcn/ui is initialized with New York style — use `Button`, `Avatar`, `Card` primitives where appropriate
- `cn()` utility is in `~/lib/utils` for conditional className merging
- `src/components/ui/` contains shadcn primitives — import `Avatar`, `AvatarFallback` from there
- Skip link (`<a href="#main-content">`) is already in root `layout.tsx` — do NOT add another one in the onboarding page; just ensure the page's `<main>` has `id="main-content"`

### References

- Epics: Story 1.2 acceptance criteria and Notes [epics.md — Story 1.2]
- UX Spec: UX-DR1 (AvatarSprite component spec) [ux-design-specification.md]
- UX Spec: UX-DR3 (class selector screen requirements) [ux-design-specification.md]
- UX Spec: Journey 1 (New User Onboarding flowchart) [ux-design-specification.md]
- Architecture: Frontend Architecture (sprite rendering pattern) [architecture.md]
- Architecture: Project structure — `(auth)/onboarding/page.tsx`, `components/BitGuild/`, `components/onboarding/` [architecture.md]
- Architecture: Server vs Client components boundary [architecture.md]
- Story 1.1: Dark Forge tokens, font loading, component patterns [1-1-t3-stack-scaffold-and-dark-forge-design-system.md]

## Dev Agent Record

### Agent Model Used

claude-sonnet-4-6 (2026-05-01)

### Debug Log References

- `tsc --noEmit` clean after Tasks 1, 5, 6, 7.
- Placeholder sprites created via `scripts/create-placeholders.mjs` (node script, not checked in).
- `src/app/(auth)/onboarding/page.tsx` has ClassSelector placeholder comment — wired when Task 4 completes.

### Completion Notes List

- Task 1 complete: `src/types/user.ts` — `UserClass` enum (8 values) + `CLASS_META` record. `tsc` clean.
- Task 2 complete: 8 placeholder PNGs in `public/sprites/` via base64 decode; AvatarSprite error fallback covers broken images.
- Task 3 complete: `src/components/BitGuild/AvatarSprite.tsx` — `imageRendering: pixelated` inline, ring + inactive states, shadcn Avatar fallback on error. Lint + tsc clean.
- Task 4 complete: `src/components/onboarding/ClassSelector.tsx` — 8-card grid, click/Enter selection, sessionStorage write/restore on mount, roving tabindex arrow-key nav, aria-selected, disabled CTA until selection. Lint + tsc clean. shadcn Button + Avatar added via CLI.
- Task 5 complete: `src/app/(auth)/layout.tsx` — minimal full-screen layout, no auth gate.
- Task 6 complete: `src/app/(auth)/onboarding/page.tsx` — ClassSelector wired, "Step 1 of 2" progress indicator.
- Task 7 complete: `src/app/page.tsx` — `redirect('/onboarding')`.
- Task 8 complete: Vitest 2 + RTL setup (jsdom@24, setup.tsx with next/image + next/navigation mocks). 16 tests passing — 7 AvatarSprite (size/ring/inactive/error fallback) + 9 ClassSelector (render, click, sessionStorage, keyboard, CTA, aria-selected). Resolved: rolldown native binding, jsdom ESM conflict, @testing-library/dom missing peer dep.

### File List

**New files (this session):**
- `src/types/user.ts`
- `src/components/BitGuild/AvatarSprite.tsx`
- `src/components/onboarding/ClassSelector.tsx`
- `src/components/ui/button.tsx` (shadcn — added via CLI)
- `src/components/ui/avatar.tsx` (shadcn — added via CLI)
- `src/app/(auth)/layout.tsx`
- `src/app/(auth)/onboarding/page.tsx`
- `public/sprites/backend-warrior.png`
- `public/sprites/frontend-mage.png`
- `public/sprites/devops-engineer.png`
- `public/sprites/fullstack-rogue.png`
- `public/sprites/ml-alchemist.png`
- `public/sprites/system-architect.png`
- `public/sprites/security-sentinel.png`
- `public/sprites/wanderer.png`

**Modified files (this session):**
- `src/app/page.tsx`

**New files (session 2):**
- `src/components/BitGuild/AvatarSprite.tsx`
- `src/components/BitGuild/AvatarSprite.test.tsx`
- `src/components/onboarding/ClassSelector.tsx`
- `src/components/onboarding/ClassSelector.test.tsx`
- `src/test/setup.tsx`
- `vitest.config.ts`

**Modified files (session 2):**
- `package.json` (vitest@2 + RTL + jsdom + @testing-library/dom deps; test/test:watch scripts)

## Review Findings

- [x] [Review][Decision] Double amber ring on selected card — resolved: removed `ring={isSelected}` from `<AvatarSprite>` in ClassSelector; card-level ring is the selection indicator [ClassSelector.tsx]
- [x] [Review][Patch] `sessionStorage` calls unguarded — fixed: wrapped read (useEffect) and write (handleSelect) in try/catch [ClassSelector.tsx]
- [x] [Review][Patch] AvatarSprite error fallback discards `ring`/`inactive` visual state — fixed: fallback Avatar now applies same ring/inactive classes [AvatarSprite.tsx]
- [x] [Review][Patch] No test asserts `router.push("/login")` is called when CTA is clicked — fixed: added test with vi.hoisted mock [ClassSelector.test.tsx]
- [x] [Review][Defer] `(auth)` route group name implies an auth guard — spec defines this structure; revisit naming in Story 1.3 when guard is added — deferred, pre-existing
- [x] [Review][Defer] `focused` init=0 causes a tabindex flash before `useEffect` restores sessionStorage — low impact for V1 [ClassSelector.tsx:17] — deferred, pre-existing
- [x] [Review][Defer] `window.innerWidth` in `handleKeyDown` goes stale on resize — low impact with 8 items [ClassSelector.tsx:38] — deferred, pre-existing
- [x] [Review][Defer] `onError` mock types `() => void` — future handlers reading `event.target` get undefined [src/test/setup.tsx] — deferred, pre-existing
- [x] [Review][Defer] Sprite paths hardcoded; error fallback handles gracefully for V1 [src/types/user.ts] — deferred, pre-existing
- [x] [Review][Defer] Empty `alt` prop produces blank fallback — out of scope for current AvatarSprite callers — deferred, pre-existing
- [x] [Review][Defer] AvatarSprite error state permanent, no retry path [AvatarSprite.tsx] — deferred, pre-existing
- [x] [Review][Defer] `aria-multiselectable={false}` not declared; ARIA default covers single-select [ClassSelector.tsx] — deferred, pre-existing
- [x] [Review][Defer] `/` unconditional redirect ignores auth state — explicitly Story 1.3 work [src/app/page.tsx] — deferred, pre-existing
- [x] [Review][Defer] Pre-existing infra issues: `auth.ts` providers:[], `redis.ts` missing error handler, PostHog double-init in Strict Mode — deferred, pre-existing

## Change Log

| Date | Change |
|------|--------|
| 2026-05-01 | Story created — ready for dev |
| 2026-05-01 | Tasks 1, 2, 5, 6, 7 complete — types, sprites, routing scaffold. Tasks 3, 4, 8 pending. |
| 2026-05-01 | Tasks 3 + 4 complete — AvatarSprite + ClassSelector built and wired. Only Task 8 (tests) pending. |
| 2026-05-01 | Task 8 complete — Vitest 2 + RTL, 16/16 tests green. Story marked review. |
