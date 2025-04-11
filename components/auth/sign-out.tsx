"use client";

import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { LogOut, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

interface SignOutButtonProps
  extends Omit<ComponentProps<typeof Button>, "onClick"> {
  showIcon?: boolean;
  customIcon?: React.ReactNode;
  text?: string;
  unwrap?: boolean; // Whether to render just the handler without a button (for menus)
}

export default function SignOutButton({
  variant = "destructive",
  size = "default",
  className,
  showIcon = true,
  customIcon,
  text = "Sign Out",
  unwrap = false,
  ...props
}: SignOutButtonProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    setLoading(true);
    const loadingToast = toast.loading("Signing out...");

    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.dismiss(loadingToast);
            toast.success("Signed out successfully");
            router.push("/");
          },
          onError: (context) => {
            toast.dismiss(loadingToast);
            toast.error(context.error?.message || "Failed to sign out");
          },
        },
      });
    } catch (error) {
      console.error("Sign out error:", error);
      toast.dismiss(loadingToast);
      toast.error("Failed to sign out");
    } finally {
      setLoading(false);
    }
  };

  // When used inside menu items, just provide the click handler
  if (unwrap) {
    return (
      <div
        onClick={handleSignOut}
        className={cn(
          "flex items-center w-full relative cursor-pointer",
          className
        )}
        role="button"
        tabIndex={0}
        aria-disabled={loading}
      >
        {loading ? (
          <Loader2 size={16} className="mr-2 animate-spin inline-flex" />
        ) : (
          showIcon && (customIcon || <LogOut size={16} className="mr-2" />)
        )}
        <span>{loading ? "Signing out..." : text}</span>
      </div>
    );
  }

  return (
    <Button
      variant={variant}
      size={size}
      className={cn("gap-2 relative cursor-pointer", className)}
      disabled={loading}
      onClick={handleSignOut}
      {...props}
    >
      {loading ? (
        <Loader2 size={16} className="animate-spin mr-2 inline-flex" />
      ) : (
        showIcon && (customIcon || <LogOut size={16} />)
      )}
      <span>{loading ? "Signing out..." : text}</span>
    </Button>
  );
}
