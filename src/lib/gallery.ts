import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

import type { Artwork } from "@/types/artwork";

const SETTINGS_FILE = join(process.cwd(), "src/data/settings.json");

export type SiteSettings = { commissionsOpen: boolean };

export function readSettings(): SiteSettings {
  try {
    return JSON.parse(readFileSync(SETTINGS_FILE, "utf-8"));
  } catch {
    return { commissionsOpen: true };
  }
}

export function writeSettings(settings: SiteSettings): void {
  writeFileSync(SETTINGS_FILE, JSON.stringify(settings, null, 2), "utf-8");
}

const DATA_FILE = join(process.cwd(), "src/data/gallery.json");
const UPLOADS_DIR = join(process.cwd(), "public/uploads");

export function ensureUploadsDir(): void {
  if (!existsSync(UPLOADS_DIR)) mkdirSync(UPLOADS_DIR, { recursive: true });
}

export function readArtworks(): Artwork[] {
  try {
    return JSON.parse(readFileSync(DATA_FILE, "utf-8"));
  } catch {
    return [];
  }
}

export function writeArtworks(artworks: Artwork[]): void {
  const dir = join(process.cwd(), "src/data");
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(DATA_FILE, JSON.stringify(artworks, null, 2), "utf-8");
}
