"use client";

import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

interface ErrorContext {
  error: {
    message: string;
  };
}

interface SignOutButtonProps
  extends Omit<ComponentProps<typeof Button>, "onClick"> {
  showIcon?: boolean;
  customIcon?: React.ReactNode;
  text?: string;
}

export default function SignOutButton({
  variant = "destructive",
  size = "default",
  className,
  showIcon = true,
  customIcon,
  text = "Sign Out",
  ...props
}: SignOutButtonProps) {
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
      variant={variant}
      size={size}
      className={cn("gap-2", className)}
      disabled={loading}
      onClick={handleSignOut}
      {...props}
    >
      {showIcon && (customIcon || <LogOut size={16} />)}
      {text}
    </Button>
  );
}
