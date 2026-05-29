import { platformConfig } from "./platform";
import type { ApiResult } from "./types";

export async function apiFetch<T>(path: string, init: RequestInit = {}): Promise<ApiResult<T>> {
  try {
    const response = await fetch(path, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        "X-Jostavan-App-Id": platformConfig.appId,
        ...(init.headers ?? {}),
      },
    });

    const text = await response.text();
    const data = text ? JSON.parse(text) as T : undefined as T;

    if (!response.ok) {
      const message = data && typeof data === "object" && "error" in data
        ? String((data as { error: unknown }).error)
        : response.statusText;
      return { ok: false, error: message, status: response.status };
    }

    return { ok: true, data };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Network request failed",
    };
  }
}
