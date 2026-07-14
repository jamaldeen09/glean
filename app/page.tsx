import { auth, signIn } from "@/auth"
import { Button } from "@/components/ui/button"
import Image from "next/image";

export default async function Page() {
  const session = await auth();
  return (
    <div className="flex min-h-svh p-6">
      <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
        <div>
          <h1 className="font-medium">Project ready!</h1>
          <p>You may now add components and start building.</p>
          <p>We&apos;ve already added the button component for you.</p>
          {!session && (
            <form className="mt-2" action={async () => {
              "use server"
              await signIn("github", { redirectTo: "/dashboard" })
            }}>
              <Button type="submit">Sign In With Github</Button>
            </form>
          )}
        </div>

        {session && (
          <div>
            <Image
              src={session.user?.image ?? ""}
              alt="User Image"
              width={40}
              height={40}
              unoptimized
            />

            <p>ID: {session.user?.id ?? "unknown"}</p>
            <p>Name: {session.user?.name ?? "unknown"}</p>
            <p>Email Address: {session.user?.email ?? "unknown"}</p>
          </div>
        )}
        <div className="font-mono text-xs text-muted-foreground">
          (Press <kbd>d</kbd> to toggle dark mode)
        </div>
      </div>
    </div>
  )
}
