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
  src,
  alt,
  size = "md",
  ring = false,
  inactive = false,
  className,
}: AvatarSpriteProps) {
  const [error, setError] = useState(false);
  const px = SIZE_MAP[size];

  if (error) {
    return (
      <Avatar
        style={{ width: px, height: px }}
        className={cn(
          "rounded",
          ring && "ring-2 ring-primary ring-offset-2 ring-offset-background",
          inactive && "opacity-50 grayscale",
          className,
        )}
      >
        <AvatarFallback className="bg-surface text-xs text-text-secondary">
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
