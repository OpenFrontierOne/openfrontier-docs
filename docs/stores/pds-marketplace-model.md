# ProDesignStore — Marketplace & Pricing Model

## The "Prompt Design" Service Model

Designers on ProDesignStore don't just sell finished designs. They sell **prompt-based design services** — clients describe what they want, the designer uses AI to generate options, then polishes the best one. This is 10x faster than traditional design, so designers can serve more clients at lower prices while making MORE per hour.

### How it works for a DESIGNER (seller):

```
1. Designer creates a "service" listing:
   - "Logo Design — AI-assisted, delivered in 2 hours"
   - Sets price: $29 per prompt session (or $99 for full brand kit)
   - Defines scope: "3 logo concepts, 2 revision rounds"

2. Client buys the service:
   - Pays upfront ($29)
   - Gets access to a shared design session

3. The session:
   - Client describes what they want (text brief)
   - Designer runs AI prompts to generate options
   - Client sees options in real-time (shared workspace)
   - Client picks favorites, requests changes
   - Designer refines using AI + manual polish
   - Final files delivered (SVG, PNG, brand kit)

4. Delivery:
   - Client downloads final assets
   - Client leaves review
   - Designer gets paid (minus 10% platform fee)
```

### Pricing tiers designers can offer:

| Service | What client gets | Typical price | Designer time | AI does |
|---------|-----------------|---------------|---------------|---------|
| **Quick Logo** | 3 AI concepts + 1 round of edits | $19-39 | 30 min | 80% |
| **Logo + Brand Kit** | Logo + colors + fonts + guidelines | $79-149 | 1-2 hrs | 70% |
| **Social Media Pack** | 20 branded templates (IG, X, LinkedIn) | $49-99 | 1 hr | 85% |
| **Full Brand Identity** | Logo + kit + social + business cards + letterhead | $199-499 | 3-5 hrs | 60% |
| **UI/UX Mockup** | 3-5 screens, responsive | $149-399 | 2-4 hrs | 50% |
| **Prompt-Only** | Client watches AI generate, picks favorites, no human polish | $9-19 | 5 min | 100% |

### The math for designers:

**Traditional freelance logo design:**
- 8-20 hours per project
- $300-500 per logo
- = $25-60/hr

**AI-assisted on ProDesignStore:**
- 30 min per project (AI generates, designer polishes)
- $29-79 per logo
- = $58-158/hr (2-3x more per hour)
- Can handle 8-16 clients per day vs 1-2

### Revenue split:

```
Client pays: $79 for Logo + Brand Kit
  → Designer gets: $71.10 (90%)
  → Platform gets: $7.90 (10%)
```

### Session types:

**1. Async (most common)**
- Client submits brief → designer works → delivers in 24-48hrs
- Client doesn't need to be online
- Designer batches work efficiently

**2. Live Session**
- Real-time shared workspace
- Client watches AI generate
- Client picks and directs in real-time
- Premium price (1.5-2x async)
- Like a "design consultation call" but with AI doing the heavy lifting

**3. Prompt-Only (fully automated)**
- No human designer involved
- Client prompts the AI directly
- Gets raw AI output (no human polish)
- Cheapest option ($9-19)
- Included in $9/mo subscription

### How the platform makes money:

| Revenue stream | Amount | Who pays |
|---------------|--------|----------|
| Subscription | $9/mo | Client (access to AI agent + marketplace) |
| Marketplace fee | 10% per transaction | Deducted from designer payout |
| Premium AI credits | $0.01 per generation (after free tier) | Client |
| Featured listing | $29/mo | Designer (optional, ranks higher) |

### Platform economics at scale:

| Metric | At 100 designers | At 1000 designers |
|--------|-----------------|-------------------|
| Avg transactions/designer/mo | 20 | 15 |
| Avg transaction value | $59 | $49 |
| GMV (monthly) | $118,000 | $735,000 |
| Platform revenue (10%) | $11,800 | $73,500 |
| Subscription revenue | ~$500 (50 subscribers) | ~$10,000 (1000 subscribers) |
| **Total monthly revenue** | **~$12,300** | **~$83,500** |

---

## For the CLIENT (buyer):

### What they pay:

**Option A: Subscription ($9/mo)**
- Unlimited AI prompt designs (self-service, no human)
- Access to marketplace (browse designers)
- 100 AI generation credits/mo
- Download SVG/PNG
- Basic brand kit generation

**Option B: Hire a Designer (marketplace)**
- Pay per project (designer sets price)
- Human-polished output
- Revision rounds included
- Source files
- Commercial license

**Option C: Both**
- Use AI for quick stuff (social posts, color ideas)
- Hire designer for important stuff (logo, brand identity)

### Client journey:

```
1. Signs up ($9/mo or free trial)
2. Creates a project: "I need a logo for my coffee shop"
3. AI generates 6 concepts immediately (free with subscription)
4. Client likes 2 but wants them polished
5. Clicks "Hire a Designer" → browses marketplace
6. Picks a logo designer ($39 for 3 concepts + polish)
7. Designer refines the 2 AI concepts + creates 1 original
8. Client picks final → gets all files
9. Next: "Now I need social media templates" → AI generates → done
```

---

## Implementation in the Console

### Designer Dashboard (new view in console):

```
┌─── Sidebar ────┬──────── Designer Dashboard ─────────┐
│ PDS Pro         │                                      │
│                 │ Revenue: $1,247 this month           │
│ ► My Services   │ Active orders: 3                     │
│ ► Orders        │ Avg rating: 4.8 ★                   │
│ ► Client Chat   │                                      │
│ ► Portfolio     │ Recent Orders:                       │
│ ► Payouts       │ ┌─ Logo for "Acme" — $79 — Active  │
│ ► Analytics     │ ├─ Brand Kit — $149 — Delivered     │
│                 │ └─ Social Pack — $49 — In Review    │
│                 │                                      │
│                 │ [Create New Service]                  │
└─────────────────┴──────────────────────────────────────┘
```

### Shared Design Session (the core product):

```
┌──── Client sees ─────┬──── Designer sees ────────────┐
│                       │                               │
│ Your brief:           │ Client brief:                 │
│ "Modern coffee shop   │ "Modern coffee shop logo,     │
│  logo, warm colors"   │  warm colors"                 │
│                       │                               │
│ ┌──────┐ ┌──────┐    │ [AI: Generate 6 concepts]     │
│ │ ♥ A  │ │  B   │    │ [Manual: Upload revision]     │
│ └──────┘ └──────┘    │ [Deliver final files]         │
│ ┌──────┐ ┌──────┐    │                               │
│ │  C   │ │  D   │    │ Chat:                         │
│ └──────┘ └──────┘    │ "I've generated 6 options     │
│                       │  based on your brief. A and   │
│ Chat:                 │  C use warmer tones. Which    │
│ "I like A! Can you    │  direction appeals to you?"   │
│  make it bolder?"     │                               │
└───────────────────────┴───────────────────────────────┘
```
