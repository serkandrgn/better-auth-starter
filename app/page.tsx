import SignOut from "@/components/auth/sign-out";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import Link from "next/link";
import Image from "next/image";
import { IconLogout } from "@tabler/icons-react";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <main className="flex flex-col gap-3 items-center justify-center p-10">
      <div className="flex gap-3">
        <button className="bg-neutral-700 text-white p-2 rounded-sm">
          <Link href={"/sign-in"}>Sign In</Link>
        </button>
        <button className="bg-neutral-700 text-white p-2 rounded-md">
          <Link href={"/sign-up"}>Sign Up</Link>
        </button>
        <button className="bg-emerald-500 text-white p-2 rounded-md">
          <Link href={"/dashboard"}>Dashboard</Link>
        </button>
        {session ? (
          <SignOut
            variant="destructive"
            size="default"
            className="flex items-center cursor-pointer"
            showIcon={true}
            text="Sign Out"
            customIcon={<IconLogout className="mr-2 size-5" />}
          />
        ) : null}
      </div>
      {session?.user && (
        <div className="flex flex-col items-center gap-2">
          <p>{session.user.name}</p>
          <p>{session.user.email}</p>
          <p>User ID: {session.user.id}</p>

          {session.user.image ? (
            <Image
              src={session.user.image}
              alt={`${session.user.name}'s avatar`}
              className="rounded-full"
              width={96}
              height={96}
              unoptimized // Important for external images
            />
          ) : (
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
              No Avatar
            </div>
          )}
        </div>
      )}
    </main>
  );
}
