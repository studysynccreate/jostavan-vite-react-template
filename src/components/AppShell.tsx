import { Sparkles } from "lucide-react";
import type { ReactNode } from "react";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand">
          <span className="brand-mark"><Sparkles size={19} /></span>
          <span>Jostavan App</span>
        </div>
      </header>
      <main className="app-main">{children}</main>
    </div>
  );
}
