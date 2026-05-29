/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_JOSTAVAN_APP_ID?: string;
  readonly VITE_JOSTAVAN_PLATFORM_URL?: string;
  readonly VITE_JOSTAVAN_EDGE_RUNTIME_SCANNER?: string;
  readonly VITE_NEON_AUTH_URL?: string;
  readonly VITE_NEON_AUTH_JWKS_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
