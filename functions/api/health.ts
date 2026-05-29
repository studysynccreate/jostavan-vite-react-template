import { jsonResponse } from "../_db";

export function onRequest() {
  return jsonResponse({
    ok: true,
    service: "jostavan-app",
    timestamp: new Date().toISOString(),
  });
}
