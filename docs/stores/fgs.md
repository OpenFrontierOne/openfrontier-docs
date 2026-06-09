# FGS — FreeGameStore

**URL:** https://freegamestore.online
**Org:** https://github.com/freegamestore-online (~80 repos)
**Stage:** Post-beta
**Doppler:** `fgs`

## Vision

Free browser games store. Games run in a brand-consistent shell (GameShell + GameTopbar), share leaderboards, and use platform auth. 8 templates cover every major game framework. Quality enforced by 38 compliance checks + automated viewport auditor.

## Architecture

```
fgs/
├── platform/          Monorepo (pnpm): games-sdk, fgs-cli, compliance
├── freegamestore/     Static storefront
├── admin/             Monitoring + provisioning worker
├── agent/             VibeCode AI game builder
├── auditor/           Automated quality testing (Playwright, 12 viewports)
├── auth/              Google OAuth + JWT worker
├── console/           Creator portal
├── host/              R2 host worker (*.freegamestore.online)
├── leaderboard/       D1 scores REST API
├── mcp/               MCP server (11 tools incl create_game, update_files)
├── publisher/         Self-service publish worker
├── freegamestore-brand/ Brand guidelines (BRAND.md)
├── games/             ~50+ individual game repos
└── templates/         8 templates (canvas, grid, 3d, cards, phaser, kaplay, pixi, babylon)
```

## SDK (v0.14.0)

Components: GameShell, GameTopbar, GameAuth, GameButton, GameModal, GameOverScreen, GameConfirm, GameThemeToggle, GameTextSizeToggle, Leaderboard.
Hooks: useAuth, useLeaderboard, useGameSounds, useSound.

## Templates

| Template | Framework | Best for |
|----------|-----------|----------|
| canvas | HTML5 Canvas | 2D pixel art |
| grid | React Grid | Turn-based (chess, sudoku) |
| 3d | Three.js + R3F | 3D scenes |
| cards | React Deck | Card games |
| phaser | Phaser 4 | Full-featured 2D |
| kaplay | KaPlay | Quick arcade |
| pixi | Pixi.js | WebGL 2D |
| babylon | Babylon.js | Advanced 3D |

## Compliance (38 checks)

Brand, dark mode, audio mute respect, no scroll, viewport fit (12 device viewports), PWA, bundle size, no tracking, no cookies, no console.log, TypeScript strict, MIT, GameSDK usage, correct naming.

## Gaps

- SDK components have ZERO unit tests (critical — cascades to 50+ games)
- No API types published for leaderboard/registry
- Light CLI test coverage (7/27 files)

## Future direction

- Component tests (Vitest + React Testing Library)
- Published leaderboard API types
- More game genres (puzzle template, word game template)
- Multiplayer lobby system (currently rooms only)
