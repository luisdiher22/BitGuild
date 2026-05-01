"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { UserClass, CLASS_META } from "~/types/user";
import { AvatarSprite } from "~/components/bitguild/AvatarSprite";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

const CLASSES = Object.values(UserClass);
const SESSION_KEY = "pendingClass";

export function ClassSelector() {
  const [selected, setSelected] = useState<UserClass | null>(null);
  const [focused, setFocused] = useState<number>(0);
  const cardRefs = useRef<(HTMLLIElement | null)[]>([]);
  const router = useRouter();

  // AC3: restore from sessionStorage on mount
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(SESSION_KEY);
      if (saved && Object.values<string>(UserClass).includes(saved)) {
        setSelected(saved as UserClass);
        const idx = CLASSES.indexOf(saved as UserClass);
        if (idx >= 0) setFocused(idx);
      }
    } catch {
      // sessionStorage unavailable (Safari private mode, quota exhausted)
    }
  }, []);

  function handleSelect(cls: UserClass, idx: number) {
    setSelected(cls);
    setFocused(idx);
    try {
      sessionStorage.setItem(SESSION_KEY, cls); // AC2
    } catch {
      // sessionStorage unavailable
    }
  }

  // AC4: arrow key navigation with roving tabindex
  function handleKeyDown(e: React.KeyboardEvent, idx: number) {
    const cols = window.innerWidth >= 768 ? 4 : 2;
    let next: number | null = null;

    if (e.key === "ArrowRight") next = Math.min(idx + 1, CLASSES.length - 1);
    else if (e.key === "ArrowLeft") next = Math.max(idx - 1, 0);
    else if (e.key === "ArrowDown") next = Math.min(idx + cols, CLASSES.length - 1);
    else if (e.key === "ArrowUp") next = Math.max(idx - cols, 0);
    else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const cls = CLASSES[idx];
      if (cls) handleSelect(cls, idx);
      return;
    }

    if (next !== null) {
      e.preventDefault();
      setFocused(next);
      cardRefs.current[next]?.focus();
    }
  }

  const meta = selected ? CLASS_META[selected] : null;

  return (
    <div className="w-full max-w-4xl">
      <ul
        role="listbox"
        aria-label="Select your developer class"
        className="grid grid-cols-2 gap-4 md:grid-cols-4"
      >
        {CLASSES.map((cls, idx) => {
          const { label, description, sprite } = CLASS_META[cls];
          const isSelected = selected === cls;
          const isFocused = focused === idx;

          return (
            <li
              key={cls}
              ref={(el) => { cardRefs.current[idx] = el; }}
              role="option"
              aria-selected={isSelected}
              tabIndex={isFocused ? 0 : -1}
              onClick={() => handleSelect(cls, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className={cn(
                "flex cursor-pointer flex-col items-center gap-3 rounded border bg-surface p-4",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                isSelected
                  ? "border-primary ring-2 ring-primary"
                  : "border-border hover:border-primary/50",
              )}
            >
              <AvatarSprite
                src={sprite}
                alt={label}
                size="lg"
                inactive={!isSelected && selected !== null}
              />
              <span className="font-pixel text-center text-[9px] leading-tight text-primary">
                {label}
              </span>
              <p className="text-center text-xs leading-snug text-text-secondary">
                {description}
              </p>
            </li>
          );
        })}
      </ul>

      <div className="mt-8 flex justify-center">
        <Button
          disabled={!selected}
          onClick={() => {
            if (selected) router.push("/login");
          }}
          className="px-8"
        >
          {meta ? `Claim ${meta.label}` : "Pick your class"}
        </Button>
      </div>
    </div>
  );
}
