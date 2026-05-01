import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { vi, describe, it, expect, beforeEach } from "vitest"
import LoginPage from "./page"
import { UserClass } from "~/types/user"

vi.mock("next-auth/react", () => ({
  signIn: vi.fn(),
}))

vi.mock("~/app/(auth)/login/actions", () => ({
  setPendingClass: vi.fn(),
}))

vi.mock("next/link", () => ({
  default: ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}))

const { signIn } = await import("next-auth/react")
const { setPendingClass } = await import("~/app/(auth)/login/actions")

beforeEach(() => {
  sessionStorage.clear()
  vi.clearAllMocks()
})

describe("LoginPage", () => {
  it('renders "Step 2 of 2" progress indicator', () => {
    render(<LoginPage />)
    expect(screen.getByText(/step 2 of 2/i)).toBeInTheDocument()
  })

  it("renders GitHub sign-in button", () => {
    render(<LoginPage />)
    expect(screen.getByRole("button", { name: /sign in with github/i })).toBeInTheDocument()
  })

  it("button is disabled when no pendingClass in sessionStorage", async () => {
    render(<LoginPage />)
    await waitFor(() => {
      expect(screen.getByRole("button", { name: /sign in with github/i })).toBeDisabled()
    })
  })

  it("shows 'pick your class first' link when no pendingClass", async () => {
    render(<LoginPage />)
    await waitFor(() => {
      expect(screen.getByText(/pick your class first/i)).toBeInTheDocument()
    })
  })

  it("button is enabled when valid pendingClass in sessionStorage", async () => {
    sessionStorage.setItem("pendingClass", UserClass.BACKEND_WARRIOR)
    render(<LoginPage />)
    await waitFor(() => {
      expect(screen.getByRole("button", { name: /sign in with github/i })).not.toBeDisabled()
    })
  })

  it("calls setPendingClass with value from sessionStorage on mount", async () => {
    sessionStorage.setItem("pendingClass", UserClass.WANDERER)
    render(<LoginPage />)
    await waitFor(() => {
      expect(setPendingClass).toHaveBeenCalledWith(UserClass.WANDERER)
    })
  })

  it("does not call setPendingClass when sessionStorage has invalid value", async () => {
    sessionStorage.setItem("pendingClass", "INVALID_CLASS")
    render(<LoginPage />)
    await waitFor(() => {
      expect(screen.getByRole("button", { name: /sign in with github/i })).toBeDisabled()
    })
    expect(setPendingClass).not.toHaveBeenCalled()
  })

  it("calls signIn with github provider on button click", async () => {
    sessionStorage.setItem("pendingClass", UserClass.FRONTEND_MAGE)
    render(<LoginPage />)

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /sign in with github/i })).not.toBeDisabled()
    })

    await userEvent.click(screen.getByRole("button", { name: /sign in with github/i }))
    expect(signIn).toHaveBeenCalledWith("github", { callbackUrl: "/onboarding/skill-tree" })
  })
})
