import { createAuthClient } from "better-auth/react";
import { passkeyClient } from "better-auth/client/plugins";
import { toast } from "sonner";

// Create auth client with default error handling
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
  plugins: [passkeyClient()],
  onError: (error: Error) => {
    // Default error handling
    toast.error(error.message || "Authentication failed");
    console.error("Auth error:", error);
  },
});

export const { signIn, signOut, signUp, useSession } = authClient;
