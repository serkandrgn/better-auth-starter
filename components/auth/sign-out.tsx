"use client";

import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface ErrorContext {
  error: {
    message: string;
  };
}

export default function SignOutButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Signed out successfully");
            router.push("/");
          },
          onError: (context: ErrorContext) => {
            toast.error(context.error.message || "Failed to sign out");
          },
        },
      });
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="destructive"
      size="lg"
      className="gap-2"
      disabled={loading}
      onClick={handleSignOut}
    >
      <LogOut size={16} />
      Sign Out
    </Button>
  );
}
