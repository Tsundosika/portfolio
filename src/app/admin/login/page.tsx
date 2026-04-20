import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { validateSessionToken } from "@/lib/session";
import { LoginForm } from "@/components/admin/login-form";

export const metadata = { title: "Admin Login -Ren's Studio" };

export default async function LoginPage() {
  const cookieStore = await cookies();
  if (validateSessionToken(cookieStore.get("admin_session")?.value ?? "")) {
    redirect("/admin");
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <p className="text-ochre text-xl mb-1 font-semibold">welcome back,</p>
          <h1 className="text-5xl font-bold text-ink">Ren</h1>
          <p className="text-ink/45 text-lg mt-2">Studio admin</p>
        </div>

        <div className="border-2 border-ink/40 rounded-tl rounded-tr-lg rounded-br rounded-bl-lg shadow-[4px_4px_0_0_rgba(30,19,10,0.12)] p-8 bg-parchment-light/60">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
