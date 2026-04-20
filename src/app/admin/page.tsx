import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { validateSessionToken } from "@/lib/session";
import { readArtworks, readSettings } from "@/lib/gallery";
import { UploadForm } from "@/components/admin/upload-form";
import { ArtworkAdminList } from "@/components/admin/artwork-admin-list";
import { CommissionsToggle } from "@/components/admin/commissions-toggle";

export const dynamic = "force-dynamic";
export const metadata = { title: "Studio Admin -Ren" };

async function handleLogout(_formData: FormData): Promise<void> {
  "use server";
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  redirect("/");
}

export default async function AdminPage() {
  const cookieStore = await cookies();
  if (!validateSessionToken(cookieStore.get("admin_session")?.value ?? "")) {
    redirect("/admin/login");
  }

  const [artworks, { commissionsOpen }] = await Promise.all([readArtworks(), readSettings()]);

  return (
    <main className="min-h-screen px-6 md:px-12 py-12 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-12">
        <div>
          <p className="text-ochre text-xl font-semibold">Welcome back,</p>
          <h1 className="text-5xl font-bold text-ink">Ren&apos;s Studio</h1>
        </div>
        <form action={handleLogout}>
          <button
            type="submit"
            className="px-5 py-2 text-lg font-semibold border-2 border-ink/35 text-ink/65 hover:border-terracotta hover:text-terracotta rounded-tl-sm rounded-tr-lg rounded-br-sm rounded-bl-lg transition-colors duration-200"
          >
            Log out
          </button>
        </form>
      </div>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-ink mb-6 pb-3 border-b-2 border-ink/10">
          Commissions
        </h2>
        <CommissionsToggle open={commissionsOpen} />
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-ink mb-6 pb-3 border-b-2 border-ink/10">
          Upload New Artwork
        </h2>
        <UploadForm />
      </section>

      <section>
        <h2 className="text-3xl font-bold text-ink mb-6 pb-3 border-b-2 border-ink/10">
          Gallery{" "}
          <span className="text-ink/40 font-normal text-2xl">
            ({artworks.length})
          </span>
        </h2>
        <ArtworkAdminList artworks={artworks} />
      </section>
    </main>
  );
}
