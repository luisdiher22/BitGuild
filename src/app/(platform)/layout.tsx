import { requireAuth } from "~/lib/auth"

export default async function PlatformLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await requireAuth()
  return <>{children}</>
}
