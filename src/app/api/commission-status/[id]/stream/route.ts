export const dynamic = "force-dynamic";

import { getRequest } from "@/lib/requests";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!/^[0-9a-f-]{36}$/.test(id)) {
    return new Response(null, { status: 400 });
  }

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      function send(data: object) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
      }

      let ticks = 0;
      const MAX_TICKS = 90;

      while (ticks < MAX_TICKS) {
        if (req.signal.aborted) break;

        const request = await getRequest(id);
        if (!request) break;

        send({ status: request.status });

        if (request.status === "accepted" || request.status === "declined") break;

        await new Promise<void>((resolve) => {
          const t = setTimeout(resolve, 2000);
          req.signal.addEventListener("abort", () => { clearTimeout(t); resolve(); }, { once: true });
        });

        ticks++;
      }

      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
