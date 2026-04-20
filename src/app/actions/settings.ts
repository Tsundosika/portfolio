"use server";

import { revalidatePath } from "next/cache";

import { cookies } from "next/headers";

import { readSettings, writeSettings } from "@/lib/gallery";
import { validateSessionToken } from "@/lib/session";

async function assertAdmin(): Promise<void> {
  const cookieStore = await cookies();
  if (!validateSessionToken(cookieStore.get("admin_session")?.value ?? "")) {
    throw new Error("Unauthorized");
  }
}

export async function setCommissionsOpen(open: boolean): Promise<void> {
  await assertAdmin();
  const settings = await readSettings();
  settings.commissionsOpen = open;
  await writeSettings(settings);
  revalidatePath("/");
  revalidatePath("/admin");
}
