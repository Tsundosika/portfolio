"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { updateRequestStatus } from "@/lib/requests";
import { validateSessionToken } from "@/lib/session";

async function assertAdmin(): Promise<void> {
  const cookieStore = await cookies();
  if (!validateSessionToken(cookieStore.get("admin_session")?.value ?? "")) {
    throw new Error("Unauthorized");
  }
}

export async function respondToCommission(
  id: string,
  response: "accepted" | "declined" | "done"
): Promise<{ ok: boolean }> {
  await assertAdmin();
  const ok = await updateRequestStatus(id, response);
  revalidatePath("/admin/commissions");
  return { ok };
}
