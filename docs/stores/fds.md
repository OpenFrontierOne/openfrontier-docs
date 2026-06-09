# FreeDesignStore (FDS)

## Status: LIVE

| Field | Value |
|-------|-------|
| URL | [freedesignstore.pages.dev](https://freedesignstore.pages.dev) |
| GitHub | [freedesignstore-online/platform](https://github.com/freedesignstore-online/platform) |
| Tools | 43 |
| Theme | Light |
| Accent | `#ec4899` (pink/magenta) |
| Deploy | CF Pages (GitHub Actions) |
| AI | Chrome AI via `ai-queue.js` |

## Overview

Browser-based design tools. No signup, no watermarks, no accounts. Every tool is a single HTML file. Part of [Open Frontier](https://openfrontier.one).

## Categories (4)

| Category | Count | Path | Description |
|----------|-------|------|-------------|
| Brand | 16 | `/brand/` | Logos, palettes, typography, brand kits, tokens |
| Images | 12 | `/images/` | Editing, conversion, icons, textures, vectors |
| Templates | 6 | `/templates/` | Social media, presentations, mockups, OG images |
| UI/UX | 9 | `/components/` | Dashboards, forms, landing pages, wireframes, user flows |

## Brand Tools (16)

| Tool | Description | Lines |
|------|-------------|-------|
| Logo Maker | Type brand name, pick font/style/layout, 42+ SVG icons, download SVG/PNG brand pack | 1115 |
| Color Palette | HSL wheel, complementary/analogous/triadic, extract from image, k-means clustering | 692 |
| Typography Pairing | Google Fonts combos, live preview, export CSS with @import | - |
| Brand Kit Builder | Combine logo + colors + fonts + usage rules, export HTML | - |
| Business Card Designer | Templates with brand auto-applied, print-ready SVG | 705 |
| Favicon Generator | Letters/emoji to multi-size favicons (16-512px), SVG/PNG/ICO | 756 |
| Tailwind Theme Builder | Generate Tailwind config from brand colors, preview components | - |
| CSS Animation Studio | Keyframe editor, easing curves, export CSS | - |
| CSS Effects | Shadows, gradients, transforms, borders — copy CSS | 699 |
| Design Tokens | Generate design token JSON from brand kit | - |
| Color Blindness Simulator | Preview designs through different color vision deficiencies | - |
| Contrast Checker | WCAG 2.1 AA/AAA compliance for text/background pairs | - |
| QR Code Designer | Branded QR codes with logo overlay, color customization | - |
| Micro-Animations | Hover, loading, transitions — preview and copy CSS | - |
| AI Color from Text | Chrome AI generates palette from text description | 699 |
| AI Logo Concepts | Chrome AI generates logo concept descriptions | - |

## Image Tools (12)

| Tool | Description | Lines |
|------|-------------|-------|
| Image Resizer & Cropper | Platform presets (IG, X, LinkedIn, YouTube), custom crop, quality control | 950 |
| Format Converter | PNG/JPG/WebP/AVIF conversion, batch processing, quality slider | 933 |
| Icon Library | 200+ SVG icons, searchable, one-click color change | - |
| Gradient Maker | Linear/radial/conic/mesh gradients, copy CSS | 693 |
| Pattern Maker | Repeating SVG patterns, customizable | - |
| Noise Texture | Perlin/simplex noise generator for backgrounds | - |
| SVG Optimizer | Compress SVG files, remove metadata | - |
| Avatar Generator | Geometric/abstract avatars from initials | - |
| Vector Editor | Basic vector drawing (paths, shapes, text) | - |
| Pixel Editor | Pixel art tool with palette, layers, export | - |
| AI Background Remover | Remove backgrounds using browser ML | - |
| Asset Manager | Organize design assets, tag, search | - |
| Free Logos | Pre-made logo templates, customize and download | - |
| Stock Photos | Browse CC0/CC-BY images by category | - |
| Photo Editor | Filters, adjustments, crop, text overlay | - |

## Template Tools (6)

| Tool | Description |
|------|-------------|
| Social Templates | Instagram, X, LinkedIn sized templates with brand colors |
| OG Image Maker | Blog/product/event open graph images (1200x630) |
| Presentation Maker | Slide decks with brand, export HTML |
| Mockup Generator | Device/product mockups |
| Pitch Deck | Investor pitch templates |
| Wireframe Kit | Low-fidelity wireframe components |

## UI/UX Tools (9)

| Tool | Description |
|------|-------------|
| UI Component Library | Buttons, cards, modals, navbars — copy HTML/CSS |
| Form Builder | Drag-and-drop form designer, export HTML |
| Landing Page Builder | Section-based builder, responsive preview |
| Dashboard Builder | Widget-based dashboard layouts |
| Layout Builder | CSS Grid/Flexbox layout generator |
| Moodboard | Drag images, colors, fonts into a visual board |
| Sitemap Builder | Visual sitemap tree, export XML |
| User Flow | Flowchart-style user journey diagrams |
| Design Handoff | Specs, spacing, colors for developer handoff |

## Technical Architecture

- **Single HTML files** — each tool is self-contained, no build step
- **Chrome AI integration** — `ai-queue.js` (296 lines) provides a shared queue for Chrome's built-in AI (Gemini Nano). Tools like "AI Color from Text" and "AI Logo Concepts" use this for on-device inference
- **Light theme** — designers work in light mode. Same structural system (Manrope + Fraunces) but inverted palette
- **Canvas API** — image tools use canvas for resize, palette extraction, format conversion
- **SVG manipulation** — logo/icon tools generate and manipulate SVG programmatically
- **No dependencies** — zero npm packages, zero build tools. Browser APIs only

## Key Technical Highlights

- Logo Maker: 1115 lines, 42+ inline SVG icons, font selection, layout presets, brand pack export (logo + colors + fonts in one ZIP)
- Image Resizer: 950 lines, drag-and-drop, platform presets for every social network
- Format Converter: 933 lines, batch conversion between PNG/JPG/WebP/AVIF
- `ai-queue.js`: Shared Chrome AI queue system — rate limits requests, handles model loading, provides fallback for browsers without Chrome AI

## Pro Tier: ProDesignStore (PDS)

| Field | Value |
|-------|-------|
| URL | prodesignstore.pages.dev (scaffolded) |
| Architecture | Console + Agent + Marketplace + Backend |
| Packages | `agent-teams`, `backend` (D1 + Workers), `sdk` |

### What Pro adds:

- **AI Design Agent** — chat-based, generates logos/kits/templates via Workers AI
- **Designer Marketplace** — hire humans for polished work ($15-500/project)
- **Prompt Design** — instant AI generation included in subscription
- **10% platform fee** on marketplace transactions
- **Agent team:** Creative Director (PO) + Designer + Brand Auditor (QA)

### Current state:

- Console page (HTML): project management dashboard
- Agent page: chat interface for AI design requests
- Marketplace page: browse/hire designers
- Backend: `schema.sql` (D1), `wrangler.toml`, src scaffolded
- `agent-teams/`: PO/Designer/QA pipeline (src scaffolded)

## Contributing

One HTML file per tool. Follow the existing pattern. See `CONTRIBUTING.md` in the platform repo.
