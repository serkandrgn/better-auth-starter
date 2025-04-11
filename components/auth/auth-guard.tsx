import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

interface AuthGuardProps {
  children: ReactNode;
  redirectTo?: string;
  requireAdmin?: boolean;
}

/**
 * Server component that verifies authentication at the page level
 * Provides an additional security layer beyond layout-level checks
 * This helps mitigate security vulnerabilities with middleware
 */
export default async function AuthGuard({
  children,
  redirectTo = "/sign-in",
  requireAdmin = false,
}: AuthGuardProps) {
  const headersList = await headers();
  const session = await auth.api.getSession({
    headers: headersList,
  });

  // Check if user is authenticated
  if (!session || !session.user) {
    console.log(
      `[AuthGuard] Unauthorized access attempt, redirecting to ${redirectTo}`
    );

    // Add a small delay to prevent timing attacks (helps against brute force attempts)
    await new Promise((resolve) =>
      setTimeout(resolve, 200 + Math.random() * 300)
    );

    return redirect(redirectTo);
  }

  // Optional admin check (for future use)
  // Note: Add a 'role' field to your user type when implementing admin features
  if (requireAdmin && (session.user as any).role !== "admin") {
    console.log(
      `[AuthGuard] Unauthorized admin access attempt by user ${session.user.id}`
    );
    return redirect("/dashboard");
  }

  // User is authenticated and has required permissions
  return <>{children}</>;
}
