"use server"

import { cookies } from "next/headers"
import { env } from "~/env"
import { UserClass } from "~/types/user"

export async function setPendingClass(cls: string): Promise<void> {
  if (!(Object.values(UserClass) as string[]).includes(cls)) return
  const cookieStore = await cookies()
  cookieStore.set("pendingClass", cls, {
    httpOnly: true,
    maxAge: 600,
    secure: env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  })
}
