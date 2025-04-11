import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import SignOut from "@/components/auth/sign-out";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Account() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return null; // Layout will handle redirect
  }

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Account</h1>
        <div className="flex gap-3">
          <Button variant="outline" asChild>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
          <SignOut size="sm" variant="outline" />
        </div>
      </div>

      <Separator className="my-2" />

      <div className="bg-card rounded-lg shadow-sm p-6">
        <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center">
          <div className="relative">
            {session.user.image ? (
              <Image
                src={session.user.image}
                alt={`${session.user.name}'s avatar`}
                className="rounded-full border-4 border-primary/10"
                width={120}
                height={120}
                unoptimized
              />
            ) : (
              <div className="w-28 h-28 bg-secondary flex items-center justify-center rounded-full border-4 border-primary/10">
                <span className="text-2xl font-bold text-secondary-foreground">
                  {session.user.name?.charAt(0).toUpperCase() || "U"}
                </span>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-semibold">{session.user.name}</h2>
            <p className="text-muted-foreground">{session.user.email}</p>
            <p className="text-xs text-muted-foreground">
              User ID: {session.user.id}
            </p>
            <div className="flex gap-2">
              <Button variant="outline" asChild size="sm">
                <Link href="/dashboard/account/edit">Edit Profile</Link>
              </Button>
              <Button variant="outline" asChild size="sm">
                <Link href="/passkey">Manage Passkeys</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        {[1, 2, 3].map((item) => (
          <div key={item} className="bg-card p-6 rounded-lg shadow-sm">
            <h3 className="font-medium mb-2">Account Info {item}</h3>
            <p className="text-muted-foreground text-sm">
              This is a sample card. You can replace this with actual account
              information.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
