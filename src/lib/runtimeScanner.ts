type RuntimeScannerOptions = {
  appId: string;
  endpoint: string;
};

type RuntimeIssue = {
  type: string;
  message: string;
  stack?: string;
  source?: string;
  line?: number;
  column?: number;
  method?: string;
  status?: number;
  request_url?: string;
};

let installed = false;

function safeString(value: unknown) {
  return typeof value === "string" ? value.slice(0, 4000) : "";
}

function sendIssue(options: RuntimeScannerOptions, issue: RuntimeIssue) {
  if (!options.endpoint || !options.appId) return;

  const payload = {
    app_id: options.appId,
    url: window.location.href,
    user_agent: navigator.userAgent,
    timestamp: new Date().toISOString(),
    errors: [issue],
  };

  queueMicrotask(() => {
    fetch(options.endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => undefined);
  });
}

function getRequestUrl(input: RequestInfo | URL) {
  if (typeof input === "string") return input;
  if (input instanceof URL) return input.href;
  return input.url;
}

export function installRuntimeScanner(options: RuntimeScannerOptions) {
  if (installed || typeof window === "undefined") return;
  installed = true;

  window.addEventListener("error", (event) => {
    sendIssue(options, {
      type: "error",
      message: safeString(event.message),
      stack: safeString(event.error?.stack),
      source: safeString(event.filename),
      line: event.lineno,
      column: event.colno,
    });
  });

  window.addEventListener("unhandledrejection", (event) => {
    const reason = event.reason;
    sendIssue(options, {
      type: "unhandledrejection",
      message: safeString(reason?.message || reason),
      stack: safeString(reason?.stack),
    });
  });

  const originalFetch = window.fetch.bind(window);
  window.fetch = async (input, init) => {
    try {
      const response = await originalFetch(input, init);
      if (!response.ok) {
        sendIssue(options, {
          type: "fetch",
          message: `HTTP ${response.status}`,
          method: init?.method || "GET",
          status: response.status,
          request_url: getRequestUrl(input),
        });
      }
      return response;
    } catch (error) {
      sendIssue(options, {
        type: "fetch",
        message: error instanceof Error ? error.message : "Network failure",
        stack: error instanceof Error ? safeString(error.stack) : "",
        method: init?.method || "GET",
        request_url: getRequestUrl(input),
      });
      throw error;
    }
  };
}
