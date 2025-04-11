import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { Separator } from "@/components/ui/separator";
import SignOut from "@/components/auth/sign-out";
import Image from "next/image";
import AuthGuard from "@/components/auth/auth-guard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default async function AccountPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return (
      <AuthGuard redirectTo="/sign-in">
        <p>Redirecting...</p>
      </AuthGuard>
    );
  }

  return (
    <main className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Account Settings</h1>
        <div className="flex gap-4">
          <Button variant="outline" asChild>
            <a href="/dashboard">Back to Dashboard</a>
          </Button>
          <SignOut />
        </div>
      </div>

      <Separator className="my-6" />

      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            {session.user.image ? (
              <Image
                src={session.user.image}
                alt={`${session.user.name}'s avatar`}
                className="rounded-full border-4 border-primary/10"
                width={150}
                height={150}
                unoptimized
              />
            ) : (
              <div className="w-32 h-32 bg-secondary flex items-center justify-center rounded-full border-4 border-primary/10">
                <span className="text-3xl font-bold text-secondary-foreground">
                  {session.user.name?.charAt(0).toUpperCase() || "U"}
                </span>
              </div>
            )}
          </div>
          <Button variant="outline" size="sm" className="w-full" disabled>
            Change Avatar
          </Button>
        </div>

        <div className="bg-card rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6">Profile Information</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  defaultValue={session.user.name || ""}
                  disabled
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue={session.user.email}
                  disabled
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input id="confirm-password" type="password" disabled />
              </div>
            </div>
            <Button className="w-full" disabled>
              Update Profile
            </Button>
            <p className="text-xs text-muted-foreground text-center mt-2">
              Profile editing is disabled in this demo. Implement your own
              functionality.
            </p>
          </form>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Security</h2>
        <Separator className="mb-6" />
        <div className="bg-card rounded-lg shadow-sm p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Two-Factor Authentication</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Add an extra layer of security to your account
                </p>
              </div>
              <Button variant="outline" disabled>
                Enable
              </Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Sessions</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Manage your active sessions across devices
                </p>
              </div>
              <Button variant="outline" disabled>
                Manage
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
