import type { PlatformConfig } from "./types";

function envValue(value: string | undefined, fallback = "") {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

export const platformConfig: PlatformConfig = {
  appId: envValue(import.meta.env.VITE_JOSTAVAN_APP_ID, "local-app"),
  platformUrl: envValue(import.meta.env.VITE_JOSTAVAN_PLATFORM_URL),
  runtimeScannerUrl: envValue(import.meta.env.VITE_JOSTAVAN_EDGE_RUNTIME_SCANNER),
  neonAuthUrl: envValue(import.meta.env.VITE_NEON_AUTH_URL),
  neonAuthJwksUrl: envValue(import.meta.env.VITE_NEON_AUTH_JWKS_URL),
};
