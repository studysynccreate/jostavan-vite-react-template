import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import { AuthProvider } from "./lib/auth";
import { platformConfig } from "./lib/platform";
import { installRuntimeScanner } from "./lib/runtimeScanner";
import "./index.css";

installRuntimeScanner({
  appId: platformConfig.appId,
  endpoint: platformConfig.runtimeScannerUrl,
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
