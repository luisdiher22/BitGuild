import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { AvatarSprite } from "./AvatarSprite";

describe("AvatarSprite", () => {
  it("renders image with pixelated style at lg size", () => {
    render(<AvatarSprite src="/sprites/backend-warrior.png" alt="Backend Warrior" size="lg" />);
    const img = screen.getByRole("img", { name: "Backend Warrior" });
    expect(img).toHaveStyle({ imageRendering: "pixelated" });
    expect(img).toHaveAttribute("width", "128");
  });

  it("renders at sm size (32px)", () => {
    render(<AvatarSprite src="/sprites/wanderer.png" alt="Wanderer" size="sm" />);
    expect(screen.getByRole("img")).toHaveAttribute("width", "32");
  });

  it("renders at md size (64px)", () => {
    render(<AvatarSprite src="/sprites/wanderer.png" alt="Wanderer" size="md" />);
    expect(screen.getByRole("img")).toHaveAttribute("width", "64");
  });

  it("applies ring class when ring=true", () => {
    const { container } = render(
      <AvatarSprite src="/sprites/backend-warrior.png" alt="Backend Warrior" ring />,
    );
    expect(container.firstChild).toHaveClass("ring-primary");
  });

  it("does not apply ring class when ring=false", () => {
    const { container } = render(
      <AvatarSprite src="/sprites/backend-warrior.png" alt="Backend Warrior" />,
    );
    expect(container.firstChild).not.toHaveClass("ring-primary");
  });

  it("applies grayscale when inactive=true", () => {
    const { container } = render(
      <AvatarSprite src="/sprites/backend-warrior.png" alt="Backend Warrior" inactive />,
    );
    expect(container.firstChild).toHaveClass("grayscale");
    expect(container.firstChild).toHaveClass("opacity-50");
  });

  it("shows initials fallback on image error", () => {
    render(<AvatarSprite src="/broken.png" alt="Backend Warrior" />);
    fireEvent.error(screen.getByRole("img"));
    expect(screen.getByText("BA")).toBeInTheDocument();
    expect(screen.queryByRole("img")).toBeNull();
  });
});
