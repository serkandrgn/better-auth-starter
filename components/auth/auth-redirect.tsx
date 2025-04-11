import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

interface AuthRedirectProps {
  children: ReactNode;
  redirectTo?: string;
}

/**
 * Server component that redirects authenticated users away from auth pages
 * Provides a consistent way to handle authenticated users trying to access login/register pages
 */
export default async function AuthRedirect({
  children,
  redirectTo = "/dashboard",
}: AuthRedirectProps) {
  const headersList = await headers();
  const session = await auth.api.getSession({
    headers: headersList,
  });

  // If user is already authenticated, redirect to specified page
  if (session && session.user) {
    console.log(
      `[AuthRedirect] Authenticated user ${session.user.id} redirected from auth page to ${redirectTo}`
    );
    return redirect(redirectTo);
  }

  // User is not authenticated, show the children (auth page)
  return <>{children}</>;
}
