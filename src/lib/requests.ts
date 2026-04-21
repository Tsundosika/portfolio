import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

export type CommissionRequest = {
  id: string;
  status: "pending" | "accepted" | "declined" | "done";
  submittedAt: string;
  name?: string;
  description: string;
  budget: string;
  platform: string;
  handle: string;
  ip?: string;
};

const isVercel = !!process.env.KV_REST_API_URL;
const DATA_DIR = join(process.cwd(), "src/data");
const FILE = join(DATA_DIR, "requests.json");

function fsRead(): CommissionRequest[] {
  try { return JSON.parse(readFileSync(FILE, "utf-8")); } catch { return []; }
}
function fsWrite(r: CommissionRequest[]): void {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
  writeFileSync(FILE, JSON.stringify(r.slice(0, 200), null, 2), "utf-8");
}
async function kvRead(): Promise<CommissionRequest[]> {
  const { kv } = await import("@vercel/kv");
  return (await kv.get<CommissionRequest[]>("commission_requests")) ?? [];
}
async function kvWrite(r: CommissionRequest[]): Promise<void> {
  const { kv } = await import("@vercel/kv");
  await kv.set("commission_requests", r.slice(0, 200));
}

async function read(): Promise<CommissionRequest[]> {
  return isVercel ? kvRead() : fsRead();
}
async function write(r: CommissionRequest[]): Promise<void> {
  return isVercel ? kvWrite(r) : fsWrite(r);
}

export async function createRequest(
  id: string,
  data: Omit<CommissionRequest, "id" | "status" | "submittedAt">
): Promise<void> {
  const all = await read();
  all.unshift({ id, status: "pending", submittedAt: new Date().toISOString(), ...data });
  await write(all);
}


export async function updateRequestStatus(
  id: string,
  status: "accepted" | "declined" | "done"
): Promise<boolean> {
  const all = await read();
  const idx = all.findIndex((r) => r.id === id);
  if (idx === -1) return false;
  all[idx].status = status;
  await write(all);
  return true;
}

export async function getRequest(id: string): Promise<CommissionRequest | null> {
  const all = await read();
  return all.find((r) => r.id === id) ?? null;
}

export async function readRequests(): Promise<CommissionRequest[]> {
  return read();
}
