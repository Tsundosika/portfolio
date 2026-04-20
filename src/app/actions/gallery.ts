"use server";

import { writeFile, unlink } from "fs/promises";
import { join } from "path";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { readArtworks, writeArtworks, ensureUploadsDir, UPLOADS_DIR } from "@/lib/gallery";
import { validateSessionToken } from "@/lib/session";
import type { Artwork } from "@/types/artwork";

type UploadState = { success?: boolean; error?: string } | null;

const isVercel = !!process.env.BLOB_READ_WRITE_TOKEN;

async function assertAdmin(): Promise<void> {
  const cookieStore = await cookies();
  if (!validateSessionToken(cookieStore.get("admin_session")?.value ?? "")) {
    throw new Error("Unauthorized");
  }
}

async function storeImage(file: File, filename: string): Promise<string> {
  if (isVercel) {
    const { put } = await import("@vercel/blob");
    const blob = await put(filename, file, { access: "public" });
    return blob.url;
  }
  ensureUploadsDir();
  await writeFile(join(UPLOADS_DIR, filename), Buffer.from(await file.arrayBuffer()));
  return `/uploads/${filename}`;
}

async function removeImage(url: string): Promise<void> {
  if (isVercel) {
    const { del } = await import("@vercel/blob");
    await del(url);
    return;
  }
  const filename = url.replace(/^\/uploads\//, "");
  try { await unlink(join(UPLOADS_DIR, filename)); } catch { /* already gone */ }
}

export async function uploadArtwork(
  _prevState: UploadState,
  formData: FormData
): Promise<UploadState> {
  await assertAdmin();

  const file        = formData.get("file") as File;
  const title       = (formData.get("title") as string)?.trim();
  const medium      = (formData.get("medium") as string)?.trim();
  const description = (formData.get("description") as string)?.trim();

  if (!file || file.size === 0) return { error: "Please select an image file" };
  if (!title)                   return { error: "Title is required" };
  if (!medium)                  return { error: "Medium is required" };
  if (!file.type.startsWith("image/")) return { error: "File must be an image" };

  const ext      = file.name.split(".").pop() ?? "jpg";
  const filename = `${randomUUID()}.${ext}`;
  const url      = await storeImage(file, filename);

  const artwork: Artwork = {
    id: randomUUID(),
    title,
    medium,
    url,
    uploadedAt: new Date().toISOString(),
    description: description || undefined,
  };

  const artworks = await readArtworks();
  artworks.unshift(artwork);
  await writeArtworks(artworks);

  revalidatePath("/");
  revalidatePath("/gallery");
  revalidatePath("/admin");

  return { success: true };
}

export async function deleteArtwork(id: string): Promise<{ success?: boolean; error?: string }> {
  await assertAdmin();

  const artworks = await readArtworks();
  const artwork  = artworks.find((a) => a.id === id);
  if (!artwork) return { error: "Artwork not found" };

  await removeImage(artwork.url);
  await writeArtworks(artworks.filter((a) => a.id !== id));

  revalidatePath("/");
  revalidatePath("/gallery");
  revalidatePath("/admin");

  return { success: true };
}
