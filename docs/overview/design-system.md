# Design System

Standard visual language across OFO stores. Only **accent color** and **brand mark** vary.

Full spec: `~/dev/stores/DESIGN-SYSTEM.md`

## Accent colors per store

| Store | Accent (light) | Accent (dark) | Accent soft |
|-------|---------------|---------------|-------------|
| FAS | `#2563eb` (blue) | `#60a5fa` | `#eff6ff` |
| FGS | `#10b981` (emerald) | `#34d399` | `#ecfdf5` |
| FWS | `#0891b2` (cyan) | `#22d3ee` | `#ecfeff` |
| PAS | `#7c3aed` (violet) | `#a78bfa` | `#f5f3ff` |
| PGS | `#9333ea` (purple) | `#c084fc` | `#faf5ff` |
| PWS | `#334155` (slate) | `#94a3b8` | `#f8fafc` |
| FAGS | (TBD) | | |
| PAGS | (TBD) | | |
| FIS | `#f97316` (orange) | `#fb923c` | `#fff7ed` |
| PIS | `#0f766e` (teal) | `#2dd4bf` | `#f0fdfa` |

## Typography

- **Body:** Manrope (400–700)
- **Display:** Fraunces (700–800)
- **Monospace:** JetBrains Mono (code blocks)

## Layout tokens

| Token | Value |
|-------|-------|
| `--radius-sm` | 0.5rem |
| `--radius-md` | 0.75rem |
| `--radius-lg` | 1rem |
| `--space-xs` | 0.25rem |
| `--space-sm` | 0.5rem |
| `--space-md` | 1rem |
| `--space-lg` | 1.5rem |
| `--space-xl` | 2rem |

## Dark mode

Automatic via `prefers-color-scheme: dark`. No manual toggle (except in games where GameThemeToggle is exposed). All CSS variables have light + dark pairs.

## Components (FAS/PAS SDK)

Shell, Avatar, SignInButton, ThemeToggle, ProfileMenu, Modal, Tabs, Card, Badge, Spinner, etc. — 18 total in `@freeappstore/sdk/ui`.

## Games (FGS/PGS SDK)

GameShell (100svh, no scroll), GameTopbar, GameOverScreen, GameModal, GameConfirm — all brand-locked.

## Enforcement

- CI lint script checks CSS variable usage
- Compliance checks: `brand-fonts`, `brand-tokens`, `no-brand-overrides`, `dark-mode`
- PR review checklist
