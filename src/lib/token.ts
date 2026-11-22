import { createHmac, timingSafeEqual } from "node:crypto";
import type { Complexity, Currency, ServiceId } from "./project";

type Claims = {
  v: 1;
  description: string;
  service: ServiceId;
  durationSeconds: number;
  complexity: Complexity;
  issuedAt: number;
  expiresAt: number;
};

function secret() {
  const value = process.env.COMPLEXITY_TOKEN_SECRET;
  if (!value || Buffer.byteLength(value) < 32) {
    throw new Error("COMPLEXITY_TOKEN_SECRET must be configured with at least 32 bytes.");
  }
  return value;
}
function sign(payload: string) {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}
export function issueComplexityToken(claims: Omit<Claims, "v" | "issuedAt" | "expiresAt">, ttlSeconds = 600) {
  const now = Math.floor(Date.now() / 1000);
  const body: Claims = { ...claims, v: 1, issuedAt: now, expiresAt: now + ttlSeconds };
  const encoded = Buffer.from(JSON.stringify(body)).toString("base64url");
  return `${encoded}.${sign(encoded)}`;
}
export function verifyComplexityToken(token: string): Claims {
  if (typeof token !== "string" || token.length > 5000) throw new Error("Invalid token");
  const parts = token.split(".");
  if (parts.length !== 2) throw new Error("Invalid token");
  const [encoded, suppliedSignature] = parts;
  const expected = sign(encoded);
  const a = Buffer.from(suppliedSignature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) throw new Error("Invalid signature");
  const claims = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8")) as Claims;
  const now = Math.floor(Date.now() / 1000);
  if (claims.v !== 1 || claims.expiresAt <= now || claims.issuedAt > now + 30) throw new Error("Expired or invalid token");
  return claims;
}
