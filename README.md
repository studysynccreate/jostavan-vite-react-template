# Jostavan Vite React Template

Deterministic base for generated Jostavan apps.

This template is intentionally small. The build agent customizes feature pages,
data models, and app-owned `functions/` endpoints after scaffold, while these
platform-owned foundations stay stable.

## Included

- Vite React TypeScript app shell
- Runtime scanner wiring
- Browser-safe platform/API helper
- Neon Auth placeholder context
- Error boundary, loading, empty states
- Cloudflare Pages Functions database/auth helpers

## Commands

```bash
npm install --no-audit --no-fund
npm run typecheck
npm run lint
npm run build
```

Never commit package lock files from generated app code.
