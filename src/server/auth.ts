import { PrismaAdapter } from "@auth/prisma-adapter"
import { type NextAuthOptions, getServerSession } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import type { AdapterUser } from "next-auth/adapters"
import { cookies } from "next/headers"
import { env } from "~/env"
import { db } from "~/server/db"
import { UserClass, TS_TO_PRISMA_CLASS, PRISMA_TO_TS_CLASS } from "~/types/user"
import type { UserClass as PrismaUserClass } from "@prisma/client"

function createBitGuildAdapter() {
  const base = PrismaAdapter(db)

  return {
    ...base,
    async createUser(data: Omit<AdapterUser, "id">): Promise<AdapterUser> {
      // Next.js 15: cookies() is async
      const cookieStore = await cookies()
      const rawClass = cookieStore.get("pendingClass")?.value

      const prismaClass: PrismaUserClass | undefined =
        rawClass && (Object.values(UserClass) as string[]).includes(rawClass)
          ? (TS_TO_PRISMA_CLASS[rawClass as UserClass] as PrismaUserClass)
          : undefined

      const created = await db.user.create({
        data: {
          email: data.email,
          emailVerified: data.emailVerified,
          name: data.name,
          image: data.image,
          ...(prismaClass !== undefined ? { class: prismaClass } : {}),
        },
      })

      cookieStore.set("pendingClass", "", { maxAge: 0, httpOnly: true, secure: env.NODE_ENV === "production", sameSite: "lax", path: "/" })

      if (!created.email) throw new Error("createUser: email is required")

      return {
        id: created.id,
        email: created.email,
        emailVerified: created.emailVerified,
        name: created.name,
        image: created.image,
      }
    },
  }
}

export const authOptions: NextAuthOptions = {
  adapter: createBitGuildAdapter(),
  session: { strategy: "database" },
  providers: [
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
        class: user.class ? (PRISMA_TO_TS_CLASS[user.class] ?? null) : null,
      },
    }),
    async signIn({ user, account }) {
      if (account?.provider === "github") {
        const dbUser = await db.user.findUnique({
          where: { id: user.id },
          select: { class: true, createdAt: true },
        })
        if (!dbUser?.class) return "/onboarding"
        // New account (created within 30s) → honour callbackUrl (/onboarding/skill-tree)
        // Returning user → send to dashboard
        const isNew = Date.now() - dbUser.createdAt.getTime() < 30_000
        return isNew ? true : "/dashboard"
      }
      return true
    },
  },
  pages: {
    signIn: "/login",
  },
}

export const getServerAuthSession = () => getServerSession(authOptions)
