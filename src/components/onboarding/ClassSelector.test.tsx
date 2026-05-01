import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ClassSelector } from "./ClassSelector";
import { UserClass } from "~/types/user";

const { mockPush } = vi.hoisted(() => ({ mockPush: vi.fn() }));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
  redirect: vi.fn(),
}));

beforeEach(() => {
  sessionStorage.clear();
  mockPush.mockClear();
});

describe("ClassSelector", () => {
  it("renders all 8 class cards", () => {
    render(<ClassSelector />);
    expect(screen.getAllByRole("option")).toHaveLength(8);
  });

  it("CTA button is disabled with no selection", () => {
    render(<ClassSelector />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("shows default CTA label when nothing selected", () => {
    render(<ClassSelector />);
    expect(screen.getByRole("button")).toHaveTextContent("Pick your class");
  });

  it("selects card on click, sets aria-selected, writes sessionStorage", async () => {
    render(<ClassSelector />);
    const card = screen.getByRole("option", { name: /backend warrior/i });
    await userEvent.click(card);
    expect(card).toHaveAttribute("aria-selected", "true");
    expect(sessionStorage.getItem("pendingClass")).toBe(UserClass.BACKEND_WARRIOR);
  });

  it("CTA becomes enabled after selection and shows class name", async () => {
    render(<ClassSelector />);
    await userEvent.click(screen.getByRole("option", { name: /wanderer/i }));
    const btn = screen.getByRole("button");
    expect(btn).not.toBeDisabled();
    expect(btn).toHaveTextContent("Claim Wanderer");
  });

  it("restores previously selected class from sessionStorage on mount", () => {
    sessionStorage.setItem("pendingClass", UserClass.FRONTEND_MAGE);
    render(<ClassSelector />);
    expect(screen.getByRole("option", { name: /frontend mage/i })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByRole("button")).not.toBeDisabled();
  });

  it("ignores invalid sessionStorage value", () => {
    sessionStorage.setItem("pendingClass", "INVALID_CLASS");
    render(<ClassSelector />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("selects card on Enter key", async () => {
    render(<ClassSelector />);
    const card = screen.getByRole("option", { name: /ml alchemist/i });
    card.focus();
    await userEvent.keyboard("{Enter}");
    expect(card).toHaveAttribute("aria-selected", "true");
    expect(sessionStorage.getItem("pendingClass")).toBe(UserClass.ML_ALCHEMIST);
  });

  it("CTA navigates to /login when a class is selected and button is clicked", async () => {
    render(<ClassSelector />);
    await userEvent.click(screen.getByRole("option", { name: /wanderer/i }));
    await userEvent.click(screen.getByRole("button", { name: /claim wanderer/i }));
    expect(mockPush).toHaveBeenCalledWith("/login");
  });

  it("only one card has aria-selected=true at a time", async () => {
    render(<ClassSelector />);
    await userEvent.click(screen.getByRole("option", { name: /backend warrior/i }));
    await userEvent.click(screen.getByRole("option", { name: /devops engineer/i }));
    const selected = screen
      .getAllByRole("option")
      .filter((el) => el.getAttribute("aria-selected") === "true");
    expect(selected).toHaveLength(1);
    expect(selected[0]).toHaveAccessibleName(/devops engineer/i);
  });
});
