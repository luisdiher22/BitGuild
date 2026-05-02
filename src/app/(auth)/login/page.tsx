"use client"

import { useEffect, useState } from "react"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { UserClass } from "~/types/user"
import { setPendingClass } from "./actions"
import { Button } from "~/components/ui/button"

export default function LoginPage() {
  const [hasPendingClass, setHasPendingClass] = useState<boolean | null>(null)
  const [signInError, setSignInError] = useState<string | null>(null)

  useEffect(() => {
    const run = async () => {
      try {
        const raw = sessionStorage.getItem("pendingClass")
        if (raw && (Object.values(UserClass) as string[]).includes(raw)) {
          await setPendingClass(raw)
          // sessionStorage key intentionally preserved so the class is
          // still available if OAuth fails or is cancelled (AC3)
          setHasPendingClass(true)
        } else {
          setHasPendingClass(false)
        }
      } catch {
        setHasPendingClass(false)
      }
    }
    void run()
  }, [])

  return (
    <main id="main-content" className="w-full max-w-md px-4 py-12">
      <div className="mb-8 text-center">
        <p className="text-xs uppercase tracking-widest text-text-secondary mb-2">
          Step 2 of 2 — Create your account
        </p>
        <h1 className="text-2xl font-bold text-text-primary">Join the Guild Hall</h1>
      </div>

      {hasPendingClass === false && (
        <p className="mb-6 text-center text-sm text-text-secondary">
          Go back and{" "}
          <Link href="/onboarding" className="text-primary underline">
            pick your class first
          </Link>
          .
        </p>
      )}

      {signInError && (
        <p className="mb-4 text-center text-sm text-red-400">{signInError}</p>
      )}

      <Button
        className="w-full"
        disabled={hasPendingClass !== true}
        onClick={async () => {
          setSignInError(null)
          const result = await signIn("github", { callbackUrl: "/onboarding/skill-tree" })
          if (result?.error) {
            setSignInError("Sign-in failed. Please try again.")
          }
        }}
      >
        Sign in with GitHub
      </Button>
    </main>
  )
}
