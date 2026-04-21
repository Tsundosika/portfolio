import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { validateSessionToken } from "@/lib/session";
import { Sidebar } from "@/components/admin/sidebar";

export default async function StudioLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  if (!validateSessionToken(cookieStore.get("admin_session")?.value ?? "")) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 min-w-0 px-8 md:px-12 py-10">
        {children}
      </div>
    </div>
  );
}
