import { type DefaultSession } from "next-auth"
import { type UserClass } from "~/types/user"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      class?: UserClass | null
    } & DefaultSession["user"]
  }

  // Augments the AdapterUser / DB User so session callback can read .class
  interface User {
    class?: string | null
  }
}
