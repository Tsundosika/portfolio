"use server";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
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

  const body = {
    embeds: [
      {
        title: "🎨 New Commission Request",
        color: 0xc8943a,
        fields: [
          ...(name ? [{ name: "👤 Name", value: name, inline: true }] : []),
          { name: "💬 What they want", value: description, inline: false },
          { name: "💰 Budget", value: budget, inline: true },
          { name: `📬 Contact (${platform})`, value: handle, inline: true },
        ],
        footer: { text: "Tsundosika Portfolio · Commission Form" },
        timestamp: new Date().toISOString(),
      },
    ],
  };

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) throw new Error(`Discord returned ${res.status}`);
    return { status: "success" };
  } catch {
    return { status: "error", message: "Failed to send — please try again." };
  }
}
