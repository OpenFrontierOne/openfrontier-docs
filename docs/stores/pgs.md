# PGS — ProGameStore

**URL:** https://progamestore.online
**Org:** https://github.com/progamestore-online (~14 repos)
**Stage:** Scaffold (broken)
**Doppler:** `pgs`

## Vision

Paid multiplayer games marketplace. Pro pair of FGS. Server-authoritative state, persistent worlds, AI-driven NPCs, uncapped WebSocket rooms, cron for daily challenges. Private source allowed.

## Architecture

```
pgs/
├── platform/          Monorepo (pnpm): games-sdk, pgs-cli, compliance
├── auth/              Google OAuth + JWT worker (deployed)
├── progamestore/      Static storefront (3 games: chess, checkers, pong)
├── marketing/         Coming-soon placeholder (CF Pages)
├── chess/             Flagship game (Stockfish)
├── games/             Individual games (checkers, pong)
└── templates/         3 templates (realtime, turn-based, 3d-persistent)
```

## SDK (v0.2.1)

Vendored from FGS on 2026-05-20. Published to npm via OIDC. Same components as FGS (GameShell, GameTopbar) but scoped to `@progamestore/games`.

## CLI (v0.1.3)

`gas login|init|check|publish|list|logs|doctor|whoami|logout`

## Critical issues

1. **CLI templates don't exist on GitHub** — `gas init` fails with clone error
2. **No host worker** — games deploy to individual CF Pages (not Path B)
3. **No admin, console, publisher, leaderboard, or auditor**
4. **No compliance checks** in platform

## What works

- Auth worker deployed (auth.progamestore.online)
- Storefront live (3 games in registry)
- Chess game live (chess.progamestore.online)
- Platform packages published to npm
- 4 CI workflows operational

## Future direction (to match FGS)

1. Push template repos to GitHub (unblocks `gas init`)
2. Build host worker (Path B alignment)
3. Build admin worker (provisioning)
4. Build leaderboard worker
5. Add compliance checks (vendored from FGS)
6. Build console (creator portal)
7. Build auditor (viewport quality testing)
