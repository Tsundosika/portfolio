import { createHmac } from "crypto";

function secret(): string {
  return process.env.ADMIN_SECRET ?? "dev-secret-changeme";
}

export function createSessionToken(): string {
  return createHmac("sha256", secret()).update("admin-session").digest("hex");
}

export function validateSessionToken(token: string): boolean {
  return token.length > 0 && token === createSessionToken();
}
