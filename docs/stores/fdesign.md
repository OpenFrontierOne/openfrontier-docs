# FreeDesignStore / ProDesignStore (Planned)

## Status: PLANNING

## What It Covers

Visual creation — everything you need to MAKE your brand look professional. Branding + images + templates in one store.

### The scope:

- **Brand Identity:** logos, color palettes, typography, brand guidelines
- **Images:** stock photos (AI-generated + community), icons, illustrations, textures, backgrounds
- **Templates:** social media posts, presentations, emails, banners, business cards, mockups

## Feature Inventory

#### Brand Identity (`/brand/`)

| Tool | Description | Build complexity |
|------|-------------|-----------------|
| Logo Maker | Font-based logo generator (type name, pick style/font/layout, download SVG) | Easy |
| AI Logo Generator | Text prompt → AI-generated logo concepts | Hard (needs model) |
| Color Palette Generator | Random, from image, from keyword, complementary/analogous/triadic | Easy |
| Palette from Image | Upload photo → extract dominant colors | Easy (canvas API) |
| Typography Pairing | Browse font combos, preview with real content | Easy |
| Brand Kit Builder | Combine logo + colors + fonts → download as PDF/ZIP | Medium |
| Business Card Designer | Pick template, apply brand, download print-ready PDF | Easy |
| Letterhead / Invoice | Professional docs with brand applied | Easy |
| Brand Guidelines Page | Auto-generated brand guide (web page + PDF) | Medium |

#### Images (`/images/`)

| Tool | Description | Build complexity |
|------|-------------|-----------------|
| Stock Photo Library | Browse free CC0/CC-BY images by category/color/keyword | Easy (static + search) |
| AI Image Generator | "A photo of..." → generated image | Hard (needs API) |
| Background Remover | Upload → transparent PNG | Medium (ML model in browser possible) |
| Image Resizer | Crop/resize to platform dimensions (IG story, X header, etc) | Easy |
| SVG Icon Library | 1000+ icons, searchable, one-click color change, download | Easy |
| Texture Generator | Procedural patterns, gradients, mesh backgrounds | Easy |
| Illustration Library | Simple line illustrations for websites/apps | Easy (static) |
| Color Filter / Overlay | Apply brand color overlay to any image | Easy |
| Image Compressor | Optimize for web (reduce KB without visible quality loss) | Easy |

#### Templates (`/templates/`)

| Tool | Description | Build complexity |
|------|-------------|-----------------|
| Instagram Post | Square canvas, text + image, multiple layouts | Easy |
| Instagram Story | 9:16 canvas with templates | Easy |
| X/Twitter Post Image | 1200x675 with brand colors | Easy |
| LinkedIn Banner | 1584x396 professional header | Easy |
| YouTube Thumbnail | 1280x720 attention-grabbing templates | Easy |
| Presentation Slides | 10-20 slide templates with brand | Medium |
| Email Header | Banner for newsletters/emails | Easy |
| Website Hero Section | Full-width hero with text + CTA | Easy |
| Mockup Generator | Put your design on devices, products, merch | Medium |
| Open Graph Image | 1200x630 for link previews | Easy |
| Favicon Generator | Upload icon → generate all favicon sizes | Easy |

## What can ship NOW (browser-only HTML)

| Ready to build | Count |
|----------------|-------|
| Brand tools | 7 |
| Image tools | 7 (excluding AI generation) |
| Template tools | 11 |
| **Total** | **25 tools** |

25 tools as self-contained HTML files. Same architecture as simulation stores.

## Free vs Pro

### Free (no signup, instant)

- All brand tools (logo text-based, palettes, typography, brand kit)
- All template tools (social, presentation, email, mockup)
- Image library (community + AI-pre-generated stock)
- Image utilities (resize, compress, favicon generator)
- SVG icon library
- Download in standard resolution (1x/2x)
- No watermark ever

### Pro ($9/mo)

- AI logo generation (server-side, multiple concepts)
- AI image generation (high-quality, any prompt)
- Background remover (server-side ML, perfect edges)
- 4K resolution exports
- Commercial license guarantee
- Bulk download API
- Custom asset hosting (your-brand.freedesignstore.online)
- Designer marketplace (hire professionals)
- Brand asset management (store all your brand files in one place)
- Team brand kit (shared brand across team members)

## Naming

- **FreeDesignStore** / **ProDesignStore**
- Abbreviation: FDS / PDS
- Domain: `freedesignstore.online` / `prodesignstore.online`
- GitHub org: `freedesignstore-online`
- Accent: Coral/Pink gradient or magenta (`#ec4899`?)
- Theme: **LIGHT** (designers work in light mode)
- Favicon: FDS in accent color

## Competitor Analysis

| Feature | Canva | Adobe Express | Figma | FreeDesignStore |
|---------|-------|---------------|-------|-----------------|
| Signup | Required | Required | Required | **None** |
| Logo maker | Yes | Yes | No | Yes |
| Brand kit | Pro ($15/mo) | Pro ($10/mo) | No | **Free** |
| Stock images | Watermarked (free) | Limited | No | **No watermark** |
| Social templates | Yes | Yes | No | Yes |
| Export SVG | Yes | Yes | Yes | Yes |
| Open source | No | No | No | **Yes** |
| Offline capable | No | No | Yes (desktop) | **Yes (all browser)** |
| Price | $0-15/mo | $0-10/mo | $0-15/mo | **$0 / $9 Pro** |

**Key differentiator: NO SIGNUP.** Every competitor requires an account. We don't. Open the page, make a logo, download SVG. Done. This is the Unsplash model applied to design tools.

## Community

Discord channels in the design community:
- #logos — share logo designs, get feedback
- #palettes — share color combos
- #stock-photos — contribute photos, request specific shots
- #templates — share and request templates
- #brand-reviews — post your brand kit, get community critique
- #showcase — show your launched brand in the wild

## Technical Notes

- Light theme CSS (unlike simulation stores)
- Same structural system (Manrope + Fraunces, card layout, nav pattern)
- Canvas API for image tools (resize, palette extraction, favicon gen)
- SVG manipulation for logo/icon tools
- PDF generation via jsPDF for brand kit export
- All tools are single HTML files (community can contribute)
