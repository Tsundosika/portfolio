import { NextResponse } from "next/server";

import { updateRequestStatus } from "@/lib/requests";

const USER_ID = "787306646417571860";

async function verifySignature(
  publicKey: string,
  signature: string,
  timestamp: string,
  body: string
): Promise<boolean> {
  try {
    const key = await crypto.subtle.importKey(
      "raw",
      Buffer.from(publicKey, "hex"),
      { name: "Ed25519" },
      false,
      ["verify"]
    );
    return await crypto.subtle.verify(
      "Ed25519",
      key,
      Buffer.from(signature, "hex"),
      new TextEncoder().encode(timestamp + body)
    );
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  const publicKey = process.env.DISCORD_PUBLIC_KEY;
  if (!publicKey) return new NextResponse("Missing public key", { status: 500 });

  const signature = req.headers.get("x-signature-ed25519") ?? "";
  const timestamp = req.headers.get("x-signature-timestamp") ?? "";
  const body = await req.text();

  if (!(await verifySignature(publicKey, signature, timestamp, body))) {
    return new NextResponse("Invalid signature", { status: 401 });
  }

  const interaction = JSON.parse(body);

  // Discord PING
  if (interaction.type === 1) return NextResponse.json({ type: 1 });

  // Button click
  if (interaction.type === 3) {
    const customId: string = interaction.data?.custom_id ?? "";
    const sep = customId.lastIndexOf("_");
    const action = customId.slice(0, sep);
    const requestId = customId.slice(sep + 1);

    if ((action === "accept" || action === "decline") && requestId) {
      const newStatus = action === "accept" ? "accepted" : "declined";
      await updateRequestStatus(requestId, newStatus);

      const isAccepted = newStatus === "accepted";

      return NextResponse.json({
        type: 7, // UPDATE_MESSAGE
        data: {
          flags: 32768,
          components: [
            {
              type: 17,
              accent_color: isAccepted ? 0x27ae60 : 0xe74c3c,
              spoiler: false,
              components: [
                {
                  type: 10,
                  content: isAccepted
                    ? `## ✅ Commission Accepted\n<@${USER_ID}> you accepted this request.`
                    : `## ❌ Commission Declined\n<@${USER_ID}> you declined this request.`,
                },
                { type: 14, divider: false, spacing: 1 },
                {
                  type: 10,
                  content: `-# Request ID: ${requestId}`,
                },
              ],
            },
          ],
        },
      });
    }
  }

  return NextResponse.json({ type: 1 });
}
