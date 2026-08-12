# IAS Universal VSL — Light Mode

A high-velocity top-of-funnel Video Sales Letter build for **The IAS Bootcamp**
(I Automate Shit). Next.js 14 + Tailwind + Vercel + n8n. Light mode.

Targeted, config-driven, and governance-honest: no fabricated metrics, no fake
testimonials, visible `TODO:` chips for anything not yet wired.

## Funnel

```
VSL hub (/)  →  multi-step lead capture (#get)  →  /thank-you (Shock & Awe)
                                                       │
   email (via n8n + Resend)  ──────────────────────────┘
                │
                └─→  /watch  (gated training video + downloadable workflow)
```

Mandatory ad-compliance pages: `/legal/privacy`, `/legal/terms`,
`/legal/disclaimer` (linked in footer, placeholder text with TODO chips).

## What's config-driven

All copy lives in **`lib/funnel.config.ts`** — one edit changes every page.
The audience-specific voice (Black men, 22–32; AI-as-career-vehicle) lives
there; the funnel *structure* is universal and reusable for any offer.

## VSL tracking

`components/VideoFrame.tsx` fires milestone events at **25 / 50 / 75 / complete**
plus play, and reveals the sticky CTA at 75%. Events post to `/api/track`
→ n8n → HubSpot timeline / retargeting audiences / ad pixels.

Conversion events fire on lead submit and on the thank-you page load — that's
where Meta/Google/YouTube pixels attach.

## Local dev

```bash
npm install
cp .env.example .env      # leave n8n URLs blank for a log-only local run
npm run dev               # http://localhost:3000
```

With the n8n URLs blank, leads and events are logged server-side and the funnel
still completes end to end — no fake success is shown.

## Deploy (Vercel)

```bash
npm i -g vercel
vercel            # link + deploy
vercel --prod
```

Then in **Vercel → Settings → Environment Variables** set:

| Var | Purpose |
| --- | --- |
| `N8N_LEAD_WEBHOOK_URL` | n8n webhook that creates the HubSpot contact + sends the Resend email |
| `N8N_TRACK_WEBHOOK_URL` | n8n webhook that logs milestone/conversion events |
| `N8N_WEBHOOK_SECRET` | (optional) shared secret verified inside n8n |

> This build uses server-side API routes to proxy to n8n, so it does **not** use
> `output: 'export'`. Deploy as a standard Vercel serverless app.

## Before running paid traffic — open TODOs

- Embed the real VSL video (hero) and gated training video (`/watch`)
- Link the downloadable n8n workflow on `/watch`
- Replace legal placeholder copy with counsel-reviewed text
- Add ad-network pixels (Meta/Google/YouTube) to `app/layout.tsx` and confirm
  they fire on `conversion`
