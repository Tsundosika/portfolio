import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

import type { Artwork } from "@/types/artwork";

export type SiteSettings = { commissionsOpen: boolean };

const isVercel = !!process.env.KV_REST_API_URL;

// ─── Local filesystem helpers (dev only) ────────────────────────────────────

const DATA_DIR   = join(process.cwd(), "src/data");
const GALLERY_FILE  = join(DATA_DIR, "gallery.json");
const SETTINGS_FILE = join(DATA_DIR, "settings.json");
export const UPLOADS_DIR = join(process.cwd(), "public/uploads");

export function ensureUploadsDir(): void {
  if (!existsSync(UPLOADS_DIR)) mkdirSync(UPLOADS_DIR, { recursive: true });
}

function fsReadArtworks(): Artwork[] {
  try { return JSON.parse(readFileSync(GALLERY_FILE, "utf-8")); } catch { return []; }
}
function fsWriteArtworks(a: Artwork[]): void {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
  writeFileSync(GALLERY_FILE, JSON.stringify(a, null, 2), "utf-8");
}
function fsReadSettings(): SiteSettings {
  try { return JSON.parse(readFileSync(SETTINGS_FILE, "utf-8")); } catch { return { commissionsOpen: true }; }
}
function fsWriteSettings(s: SiteSettings): void {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
  writeFileSync(SETTINGS_FILE, JSON.stringify(s, null, 2), "utf-8");
}

// ─── KV helpers (Vercel) ─────────────────────────────────────────────────────

async function kvReadArtworks(): Promise<Artwork[]> {
  const { kv } = await import("@vercel/kv");
  return (await kv.get<Artwork[]>("gallery")) ?? [];
}
async function kvWriteArtworks(a: Artwork[]): Promise<void> {
  const { kv } = await import("@vercel/kv");
  await kv.set("gallery", a);
}
async function kvReadSettings(): Promise<SiteSettings> {
  const { kv } = await import("@vercel/kv");
  return (await kv.get<SiteSettings>("settings")) ?? { commissionsOpen: true };
}
async function kvWriteSettings(s: SiteSettings): Promise<void> {
  const { kv } = await import("@vercel/kv");
  await kv.set("settings", s);
}

// ─── Public API ──────────────────────────────────────────────────────────────

export async function readArtworks(): Promise<Artwork[]> {
  return isVercel ? kvReadArtworks() : fsReadArtworks();
}
export async function writeArtworks(a: Artwork[]): Promise<void> {
  return isVercel ? kvWriteArtworks(a) : fsWriteArtworks(a);
}
export async function readSettings(): Promise<SiteSettings> {
  return isVercel ? kvReadSettings() : fsReadSettings();
}
export async function writeSettings(s: SiteSettings): Promise<void> {
  return isVercel ? kvWriteSettings(s) : fsWriteSettings(s);
}
