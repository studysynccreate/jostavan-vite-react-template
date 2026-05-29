import { useMemo, useState, type ReactNode } from "react";
import { AuthContext, type AuthContextValue } from "./auth-context";
import type { AuthSession } from "./types";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSessionState] = useState<AuthSession>({
    user: null,
    token: null,
  });

  const value = useMemo<AuthContextValue>(() => ({
    ...session,
    setSession: setSessionState,
    signOut: () => setSessionState({ user: null, token: null }),
  }), [session]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
