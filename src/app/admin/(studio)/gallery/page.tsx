import { readArtworks } from "@/lib/gallery";
import { UploadForm } from "@/components/admin/upload-form";
import { ArtworkAdminList } from "@/components/admin/artwork-admin-list";

export const dynamic = "force-dynamic";
export const metadata = { title: "Gallery — Ren's Studio" };

export default async function GalleryAdminPage() {
  const artworks = await readArtworks();

  return (
    <>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-ink">Gallery</h1>
        <p className="text-ink/45 mt-1">{artworks.length} {artworks.length === 1 ? "piece" : "pieces"}</p>
      </div>

      <section className="mb-12">
        <h2 className="text-lg font-semibold text-ink mb-4">Upload new artwork</h2>
        <UploadForm />
      </section>

      <section>
        <h2 className="text-lg font-semibold text-ink mb-4">Manage</h2>
        <ArtworkAdminList artworks={artworks} />
      </section>
    </>
  );
}
