import { NextResponse } from "next/server";

import { getRequest } from "@/lib/requests";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!/^[0-9a-f-]{36}$/.test(id)) {
    return new NextResponse(null, { status: 400 });
  }

  const request = await getRequest(id);
  if (!request) return new NextResponse(null, { status: 404 });

  return NextResponse.json({ status: request.status });
}
