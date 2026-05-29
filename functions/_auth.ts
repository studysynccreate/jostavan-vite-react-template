import { createRemoteJWKSet, jwtVerify } from "jose";
import type { PagesFunctionEnv } from "./_db";

export type VerifiedAppUser = {
  sub: string;
  email?: string;
};

export async function requireAppUser(request: Request, env: PagesFunctionEnv): Promise<VerifiedAppUser> {
  const token = request.headers.get("Authorization")?.replace(/^Bearer\s+/i, "");
  if (!token) throw new Response("Missing bearer token", { status: 401 });

  const jwksUrl = env.NEON_AUTH_JWKS_URL || "";
  if (!jwksUrl) throw new Response("Auth is not configured", { status: 500 });

  const jwks = createRemoteJWKSet(new URL(jwksUrl));
  const { payload } = await jwtVerify(token, jwks);

  return {
    sub: String(payload.sub || ""),
    email: typeof payload.email === "string" ? payload.email : undefined,
  };
}
