import { readArtworks } from "@/lib/gallery";
import { ArtworkCard } from "./artwork-card";
import { GalleryShowMore } from "./gallery-show-more";

export function Gallery() {
  const artworks = readArtworks();
  const preview = artworks.slice(0, 6);

  return (
    <section id="gallery" className="px-6 md:px-12 py-20 max-w-6xl mx-auto w-full">
      <div className="text-center mb-14">
        <h2 className="text-5xl md:text-6xl font-bold text-ink mb-3">
          My <span className="text-forest">Work</span>
        </h2>
        <p className="text-ink/55 text-xl max-w-sm mx-auto">
          A selection of pieces across different mediums
        </p>
      </div>

      {preview.length === 0 ? (
        <div className="text-center py-16 text-ink/40 text-xl">
          New art coming soon — check back!
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {preview.map((artwork) => (
            <ArtworkCard key={artwork.id} artwork={artwork} />
          ))}
        </div>
      )}

      <GalleryShowMore show={artworks.length > 0} />
    </section>
  );
}
