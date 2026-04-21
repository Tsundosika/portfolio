"use server";

import { randomUUID } from "crypto";
import { cookies, headers } from "next/headers";

import { createRequest, readRequests } from "@/lib/requests";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  requestId?: string;
};

export async function submitContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) {
    return { status: "error", message: "Webhook not configured." };
  }

  const name        = (formData.get("name")        as string).trim();
  const description = (formData.get("description") as string).trim();
  const budget      = (formData.get("budget")       as string).trim();
  const platform    = (formData.get("platform")     as string).trim();
  const handle      = (formData.get("handle")       as string).trim();

  if (!description || !budget || !platform || !handle) {
    return { status: "error", message: "Please fill in all required fields." };
  }

  const headerStore = await headers();
  const ip = (headerStore.get("x-forwarded-for") ?? headerStore.get("x-real-ip") ?? "unknown")
    .split(",")[0].trim();

  const cookieStore = await cookies();
  const existingCookieId = cookieStore.get("commission_id")?.value;

  const allRequests = await readRequests();
  const active = allRequests.filter((r) => r.status === "pending" || r.status === "accepted");

  const blocked =
    (existingCookieId && active.some((r) => r.id === existingCookieId)) ||
    (ip !== "unknown" && active.some((r) => r.ip === ip));

  if (blocked) {
    return {
      status: "error",
      message: "You already have an active commission request. Please wait for a response before submitting another.",
    };
  }

  const requestId = randomUUID();
  const nameLine  = name ? `**👤 Name:** ${name}\n` : "";

  const body = {
    flags: 32768,
    components: [
      {
        type: 17,
        accent_color: 0x9b59b6,
        spoiler: false,
        components: [
          {
            type: 10,
            content: `## 🎨 New Commission Request\n<@286765460140326913> new request just came in!`,
          },
          { type: 14, divider: true, spacing: 1 },
          {
            type: 10,
            content: [
              nameLine,
              `**💬 What they want:**\n${description}`,
              `**💰 Budget:** ${budget}`,
              `**📬 Contact (${platform}):** ${handle}`,
            ].filter(Boolean).join("\n\n"),
          },
          { type: 14, divider: false, spacing: 1 },
          {
            type: 10,
            content: `-# ID: ${requestId}`,
          },
        ],
      },
      {
        type: 1,
        components: [
          {
            type: 2,
            style: 5,
            label: "Manage in Admin",
            url: `${process.env.SITE_URL ?? "http://localhost:3000"}/admin/commissions`,
          },
        ],
      },
    ],
  };

  try {
    const url = webhookUrl.includes("?")
      ? `${webhookUrl}&with_components=true`
      : `${webhookUrl}?with_components=true`;

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) throw new Error(`Discord returned ${res.status}`);

    await createRequest(requestId, { name: name || undefined, description, budget, platform, handle, ip });

    cookieStore.set("commission_id", requestId, {
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
      sameSite: "lax",
      httpOnly: false,
    });

    return { status: "success", requestId };
  } catch {
    return { status: "error", message: "Failed to send — please try again." };
  }
}
