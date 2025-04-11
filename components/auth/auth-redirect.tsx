import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

interface AuthRedirectProps {
  children: ReactNode;
  redirectTo?: string;
}

export default async function AuthRedirect({
  children,
  redirectTo = "/dashboard",
}: AuthRedirectProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect(redirectTo);
  }

  return <>{children}</>;
}
