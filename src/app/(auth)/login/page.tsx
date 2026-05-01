"use client"

import { useEffect, useState } from "react"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { UserClass } from "~/types/user"
import { setPendingClass } from "./actions"
import { Button } from "~/components/ui/button"

export default function LoginPage() {
  const [hasPendingClass, setHasPendingClass] = useState<boolean | null>(null)

  useEffect(() => {
    const run = async () => {
      try {
        const raw = sessionStorage.getItem("pendingClass")
        if (raw && (Object.values(UserClass) as string[]).includes(raw)) {
          await setPendingClass(raw)
          sessionStorage.removeItem("pendingClass")
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

      <Button
        className="w-full"
        disabled={hasPendingClass !== true}
        onClick={() => void signIn("github", { callbackUrl: "/onboarding/skill-tree" })}
      >
        Sign in with GitHub
      </Button>
    </main>
  )
}
