import { PrismaAdapter } from "@auth/prisma-adapter";
import { type NextAuthOptions, getServerSession } from "next-auth";
import { db } from "~/server/db";

// GitHub provider and credentials provider added in Story 1.3
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: { strategy: "database" },
  providers: [],
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
  pages: {
    signIn: "/login",
  },
};

export const getServerAuthSession = () => getServerSession(authOptions);
