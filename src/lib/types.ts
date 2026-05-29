export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string; status?: number };

export type AppUser = {
  id: string;
  email?: string;
  name?: string;
};

export type AuthSession = {
  user: AppUser | null;
  token: string | null;
};

export type PlatformConfig = {
  appId: string;
  platformUrl: string;
  runtimeScannerUrl: string;
  neonAuthUrl: string;
  neonAuthJwksUrl: string;
};
