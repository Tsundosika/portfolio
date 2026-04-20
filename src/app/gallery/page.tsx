import { Nav } from "@/components/layout/nav/nav";
import { ArtworkCard } from "@/components/gallery/artwork-card";
import { GalleryBackButton } from "@/components/gallery/gallery-back-button";
import { readArtworks } from "@/lib/gallery";

export const metadata = {
  title: "Gallery -Ren (Tsundosika)",
  description: "Full gallery of artworks by Ren, aka Tsundosika",
};

export default function GalleryPage() {
  const artworks = readArtworks();

  return (
    <>
      <Nav />
      <main className="px-6 md:px-12 py-16 max-w-6xl mx-auto w-full">
        <div className="flex items-baseline justify-between mb-14">
          <div>
            <h1 className="text-6xl md:text-7xl font-bold text-ink">
              Gallery
            </h1>
            <p className="text-ink/50 text-xl mt-2">
              {artworks.length} {artworks.length === 1 ? "piece" : "pieces"}
            </p>
          </div>
          <GalleryBackButton />
        </div>

        {artworks.length === 0 ? (
          <div className="text-center py-24 text-ink/40 text-2xl">
            New art coming soon -check back!
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {artworks.map((artwork) => (
              <ArtworkCard key={artwork.id} artwork={artwork} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
