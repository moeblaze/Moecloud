import jwt from "jsonwebtoken";

export interface Claims { sub?: string; roles?: string[]; [k: string]: any; }

export function requireAuth(req: any): Claims {
  const h = req.headers?.authorization || req.headers?.Authorization;
  if (!h || !h.startsWith("Bearer ")) throw new Error("Unauthorized");
  const token = h.slice(7);
  // NOTE: For local dev we only decode without verify.
  // In production, VERIFY signature (kid/jwks), iss, aud, exp.
  const decoded: any = jwt.decode(token) || {};
  return decoded as Claims;
}
