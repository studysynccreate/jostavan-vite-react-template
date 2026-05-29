import { neon } from "@neondatabase/serverless";

export type PagesFunctionEnv = {
  DATABASE_URL?: string;
  NEON_AUTH_JWKS_URL?: string;
};

export function getDatabase(env: PagesFunctionEnv) {
  const databaseUrl = env.DATABASE_URL || "";
  if (!databaseUrl) throw new Error("DATABASE_URL is not configured");
  return neon(databaseUrl);
}

export function jsonResponse(body: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(body), {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });
}
