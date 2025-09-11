import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@workspace/auth/server";

import { DashboardPageContents } from "./_ui/dashboard-page-contents";

export default async function Dashboard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/login");

  return <DashboardPageContents user={session.user}/>;
};