import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";

// Use in Server Components to require authentication — throws redirect if unauthenticated.
// Never call getServerSession directly in page files; import from here.
export async function requireAuth() {
  const session = await getServerAuthSession();
  if (!session?.user) {
    redirect("/login");
  }
  return session;
}
