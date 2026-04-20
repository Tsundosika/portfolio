"use server";

import { writeFile, unlink } from "fs/promises";
import { join } from "path";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { readArtworks, writeArtworks, ensureUploadsDir } from "@/lib/gallery";
import { validateSessionToken } from "@/lib/session";
import type { Artwork } from "@/types/artwork";

type UploadState = { success?: boolean; error?: string } | null;

async function assertAdmin(): Promise<void> {
  const cookieStore = await cookies();
  if (!validateSessionToken(cookieStore.get("admin_session")?.value ?? "")) {
    throw new Error("Unauthorized");
  }
}

export async function uploadArtwork(
  _prevState: UploadState,
  formData: FormData
): Promise<UploadState> {
  await assertAdmin();

  const file = formData.get("file") as File;
  const title = (formData.get("title") as string)?.trim();
  const medium = (formData.get("medium") as string)?.trim();
  const description = (formData.get("description") as string)?.trim();

  if (!file || file.size === 0) return { error: "Please select an image file" };
  if (!title) return { error: "Title is required" };
  if (!medium) return { error: "Medium is required" };
  if (!file.type.startsWith("image/")) return { error: "File must be an image" };

  const ext = file.name.split(".").pop() ?? "jpg";
  const filename = `${randomUUID()}.${ext}`;

  ensureUploadsDir();
  await writeFile(
    join(process.cwd(), "public/uploads", filename),
    Buffer.from(await file.arrayBuffer())
  );

  const artwork: Artwork = {
    id: randomUUID(),
    title,
    medium,
    filename,
    uploadedAt: new Date().toISOString(),
    description: description || undefined,
  };

  const artworks = readArtworks();
  artworks.unshift(artwork);
  writeArtworks(artworks);

  revalidatePath("/");
  revalidatePath("/gallery");
  revalidatePath("/admin");

  return { success: true };
}

export async function deleteArtwork(id: string): Promise<{ success?: boolean; error?: string }> {
  await assertAdmin();

  const artworks = readArtworks();
  const artwork = artworks.find((a) => a.id === id);
  if (!artwork) return { error: "Artwork not found" };

  try {
    await unlink(join(process.cwd(), "public/uploads", artwork.filename));
  } catch {
    // File may already be gone -continue
  }

  writeArtworks(artworks.filter((a) => a.id !== id));

  revalidatePath("/");
  revalidatePath("/gallery");
  revalidatePath("/admin");

  return { success: true };
}
