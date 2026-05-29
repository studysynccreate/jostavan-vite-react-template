import { createContext } from "react";
import type { AuthSession } from "./types";

export type AuthContextValue = AuthSession & {
  setSession: (session: AuthSession) => void;
  signOut: () => void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);
