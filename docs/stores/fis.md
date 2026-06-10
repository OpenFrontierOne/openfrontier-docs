# FIS — FreeIdeaStore

**URL:** https://freeideastore.serge-the-dev.workers.dev  
**Local repo:** `~/dev/stores/freeideastore/platform`  
**Stage:** New beta; custom domain pending

## Vision

FreeIdeaStore is the public idea lab in the Open Frontier ecosystem.

It is where raw ideas are submitted, critiqued, researched, supported, pivoted, parked, trashed, and matured into ProIdeaStore candidates.

## Current scope

- Cloudflare Worker in `packages/worker`
- Worker Assets serving the UI from `store/`
- D1-backed collaboration API for ideas, profiles, contributions, and reactions
- Cheap dynamic idea pages at `/ideas/:id/`
- Seed registry with 6 ideas across finance, community, local services, wellbeing, and platform categories

## Product principle

Ideas are not the product. Contributors are the product: their critiques, evidence, pivots, prototypes, and judgment create visible reputation.

## Storage model

FreeIdeaStore is optimized for very large idea volume.

- D1 stores searchable fields: title, summary, stage, category, signal, next step, risk, contributor count, and reaction count
- R2 can store longer idea markdown bodies and rendered HTML cache objects
- The Worker renders `/ideas/:id/` pages and fetches bounded result sets for the homepage
- Promotion marks an idea as a ProIdeaStore candidate and produces a dossier draft payload

This prevents ordinary free ideas from creating repositories or generated file trees.

## API

- `GET /api/health`
- `GET /api/ideas?stage=all&limit=60`
- `POST /api/ideas`
- `GET /api/ideas/:id`
- `POST /api/ideas/:id/promote`
- `GET /api/ideas/:id/contributions`
- `POST /api/ideas/:id/contributions`
- `POST /api/ideas/:id/reactions`
- `GET /api/profiles`
