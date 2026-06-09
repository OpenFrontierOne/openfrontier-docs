# FreeDesignStore + FreeMarketingStore (Planned)

## Status: PLANNING

## The Decision

**Two stores, not three and not one.**

- **FreeDesignStore** = visual creation (brand + images + templates). You MAKE things.
- **FreeMarketingStore** = distribution & growth (content + campaigns + analytics). You SPREAD things.

Design + images + branding are the same activity (visual creation). Marketing is different (strategy + distribution). Combining ALL of them made the store unfocused. Separating into three was fragmented. Two is the right split.

### Why one store beats three

| Factor | 3 separate stores | 1 combined store |
|--------|-------------------|------------------|
| User journey | Fragmented — discover 3x | One bookmark, keep coming back |
| Community | 3 dead Discords (5 ppl each) | 1 active community (founders + designers + marketers) |
| Cross-sell | None | "Made a logo? Here's matching templates" |
| SEO | 3 domains to grow | 1 domain with deep page authority |
| Maintenance | 3x deploy, 3x secrets, 3x CI | 1 codebase |
| Brand | Confusing (which store for what?) | Clear: "FreeCreatorStore = everything to launch" |

### The person we serve

One person, one journey:

```
"I have an idea/business/project and I need to look professional and get noticed"
```

- Startup founder
- Freelancer launching services
- Small business owner
- Side project builder
- Content creator / influencer
- Indie hacker

They need: brand identity → visual assets → content → distribution. In that order. Every time.

## Product Structure

### Sections (not separate stores)

```
FreeCreatorStore
├── /brand/          Logo, palette, typography, brand kit, business cards
├── /images/         Stock photos, AI generation, icons, backgrounds, textures
├── /templates/      Social posts, presentations, emails, banners, flyers
├── /content/        Blog posts, social captions, email sequences, SEO copy
└── /campaigns/      Content calendar, campaign planner, A/B test, analytics
```

### Feature Inventory

#### Brand (`/brand/`)

| Tool | Description | Complexity |
|------|-------------|------------|
| Logo Maker | Text prompt → AI logo → customize colors/fonts → SVG download | Medium (needs AI model or API) |
| Color Palette Generator | Random, from image, from keyword, harmony rules, a11y contrast check | Easy (browser JS) |
| Typography Pairing | AI suggests 2-3 font combos, live preview with real content | Easy |
| Brand Kit Builder | Combine logo + colors + fonts into downloadable brand guidelines PDF | Medium |
| Business Card Designer | Templates + brand kit auto-applied, print-ready PDF | Easy |
| Letterhead / Invoice | Professional document templates with brand | Easy |

#### Images (`/images/`)

| Tool | Description | Complexity |
|------|-------------|------------|
| Stock Photo Browse | Categories, search, color filter, similar images | Easy (static collection + search) |
| AI Image Generation | Text prompt → generated image (needs model) | Hard (needs API or local model) |
| Background Remover | Upload photo → transparent background | Medium (needs ML model) |
| Image Resizer | Resize/crop for specific platforms (IG, X, LinkedIn, etc) | Easy |
| Icon Library | SVG icons, searchable, customizable color | Easy |
| Texture/Pattern Generator | Procedural backgrounds, gradients, mesh | Easy |

#### Templates (`/templates/`)

| Tool | Description | Complexity |
|------|-------------|------------|
| Social Post Templates | Instagram, X, LinkedIn, Facebook sized canvases with brand | Easy |
| Presentation Builder | Slide deck with brand kit, export as HTML/PDF | Medium |
| Email Header Designer | Branded email headers/banners | Easy |
| Banner/Hero Generator | Website hero sections, OG images | Easy |
| Flyer / Poster | Print-ready A4/Letter designs | Easy |
| Mockup Generator | Put your logo on t-shirts, mugs, screens | Medium |

#### Content (`/content/`)

| Tool | Description | Complexity |
|------|-------------|------------|
| Blog Post Generator | Topic → outline → full post (AI) | Medium (needs LLM) |
| Social Caption Writer | Platform-specific captions with hashtags | Easy (templates + AI) |
| Email Sequence Builder | Visual drip campaign designer | Medium |
| SEO Title/Meta Generator | Page → suggested titles, descriptions, keywords | Easy |
| Product Description Writer | Features → compelling copy | Easy (AI) |
| Headline A/B Tester | Two headlines → predict CTR | Easy |

#### Campaigns (`/campaigns/`)

| Tool | Description | Complexity |
|------|-------------|------------|
| Content Calendar | Visual drag-and-drop editorial calendar | Medium |
| Campaign Planner | Goal → audience → channels → timeline → tactics | Medium |
| Competitor Analyzer | URL → social presence audit | Hard (needs scraping) |
| Hashtag Research | Topic → trending hashtags by platform | Medium |
| Analytics Dashboard | Connect accounts, see performance | Hard (needs OAuth + APIs) |
| Launch Checklist | Pre-launch → launch → post-launch automated checklist | Easy |

### Complexity Assessment

| Complexity | Count | Can build now? |
|------------|-------|----------------|
| Easy (browser-only JS) | 14 tools | YES — same as simulation stores |
| Medium (needs AI or PDF) | 9 tools | Partially — client-side AI possible for some |
| Hard (needs APIs/OAuth) | 4 tools | Pro tier only |

**14 tools can ship immediately** as self-contained browser tools. Same pattern as FRS/FQS/FCRS. That's enough for a full launch.

## Free vs Pro Split

### Free (browser-only, no signup)

- All "Easy" complexity tools
- AI features limited (use browser-based models where possible)
- Download SVG/PNG at standard resolution
- No watermarks ever
- Community templates (user-submitted)

### Pro ($9/mo)

- AI image generation (server-side, high quality)
- Background remover (server-side ML)
- Campaign execution (actual posting to X/LinkedIn/Instagram)
- Analytics (OAuth connections to social platforms)
- Commercial license guarantee on all assets
- Bulk API access
- Priority AI generation
- Custom brand asset hosting (your-brand.freecreatorstore.online)
- Designer marketplace (hire/be-hired)

## Naming

**FreeCreatorStore** / **ProCreatorStore**

- Abbreviation: FCRS... wait, that's taken (FreeCryptoStore). Use **FCrS / PCrS** or just **creator**
- Domain: `freecreatorstore.online` / `procreatorstore.online`
- GitHub org: `freecreatorstore-online`
- Accent color: TBD — warm, creative (coral? magenta? multicolor gradient?)
- Theme: LIGHT (creative audience, not dark hacker vibe)

## Community

One Discord server: **Creator Community**

| Channel | Purpose |
|---------|---------|
| #brand | Logo feedback, brand kit reviews |
| #images | Share photos, request specific images |
| #templates | Share/request social templates |
| #content | Copy feedback, content strategy |
| #campaigns | Campaign reviews, growth tactics |
| #showcase | Show what you launched |
| #feedback | Product feedback for the store itself |

## Branding Decision

| Element | Simulation stores | Creator store |
|---------|-------------------|---------------|
| Background | Dark (#0a0a0a) | **Light** (#fafafa or #f8f9fa) |
| Text | Light (#fafafa) | **Dark** (#1a1a1a) |
| Accent | Per-store single color | **Gradient or warm multicolor** |
| Vibe | Technical, focused, minimal | **Creative, warm, expressive** |
| Fonts | Manrope + Fraunces | Same (brand consistency across OF) |
| Layout | Card grid, same nav | Same structure, different surface |

The creative audience expects:
- Light backgrounds (design tools are always light: Figma, Canva, Adobe Express)
- Color (not monochrome)
- Whitespace and breathing room
- Playful but professional

## Comparison to Competitors

| Feature | Canva | Adobe Express | FreeCreatorStore |
|---------|-------|---------------|------------------|
| Signup required | Yes | Yes | **No** |
| Logo maker | Yes (limited free) | Yes | Yes |
| Brand kit | Pro only ($15/mo) | Pro only | **Free** |
| AI generation | Limited free | Limited free | Browser-based free |
| Stock photos | Yes (with watermarks free) | Yes (limited) | **No watermark, no limit** |
| Export SVG | Yes | Yes | Yes |
| Open source | No | No | **Yes (MIT)** |
| Content calendar | No | No | **Yes** |
| Social posting | No | No | Pro tier |
| Price | $0-15/mo | $0-10/mo | **$0 free / $9 Pro** |

**Our positioning: "Canva + Unsplash + Buffer in one place, no signup, open source."**

## Build Plan

### Phase 1: Launch (Week 1)
Ship 14 "Easy" browser tools:
- Logo text generator (fonts + layouts, not AI)
- Color palette generator
- Typography pairing
- Brand kit assembler
- Business card template
- Social media template resizer
- Icon library browser
- Image resizer/cropper
- Texture/pattern generator
- Social caption templates
- Email subject line generator
- Headline A/B predictor
- Content calendar (drag-and-drop)
- Launch checklist

### Phase 2: AI Enhancement (Week 2-3)
Add browser-based AI where possible:
- Logo generation (via model or template-based)
- Image generation (Stable Diffusion via WebGPU if feasible, or API with free tier)
- Blog post generator (SmolLM or API key proxy)
- SEO suggestions

### Phase 3: Pro Tier (Week 4+)
- Server-side AI generation
- Social media API integrations
- Analytics dashboard
- Designer marketplace

## Open Questions

1. **Domain:** `freecreatorstore.online` — available? Register?
2. **Logo AI:** Use template-based (free, instant) or actual AI model (needs API)?
3. **Images:** Seed with AI-generated stock, or start empty + community upload?
4. **Accent color:** Coral (#f97316 is taken)? Pink (#ec4899)? Gradient?
5. **Abbreviation:** FCRS conflicts with FreeCryptoStore. Use FCtS? FCreS?
