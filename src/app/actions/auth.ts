"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { createSessionToken } from "@/lib/session";

type LoginState = { error?: string } | null;

export async function login(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const password = formData.get("password") as string;
  const adminPassword = process.env.ADMIN_PASSWORD ?? "admin";

  if (!password || password !== adminPassword) {
    return { error: "Invalid password" };
  }

  const cookieStore = await cookies();
  cookieStore.set("admin_session", createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  redirect("/admin");
}

export async function logout(_formData: FormData): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  redirect("/admin/login");
}
