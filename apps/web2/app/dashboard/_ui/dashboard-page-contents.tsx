"use client";
import { useRouter } from "next/navigation";

import { createAuthClient } from "@workspace/auth/client";

interface DashboardPageContentsProps {
  user: {
    email?: string | null;
    name?: string | null;
  };
};

export function DashboardPageContents({ user }: DashboardPageContentsProps) {
  const authClient = createAuthClient();
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="space-y-6 text-center">
        <h1 className="font-bold text-3xl">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome, {user.name || user.email}!
        </p>
        <button
          className="bg-background border border-input disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring font-medium h-10 hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center px-4 py-2 ring-offset-background rounded-md text-sm transition-colors whitespace-nowrap"
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};