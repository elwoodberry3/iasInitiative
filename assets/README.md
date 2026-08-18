# Assets

## Repository Structure
See below:

```js
iasinitiative/
└── app/                     # Next.js App Router root — routes, API handlers, layout, global styles
    ├── api/                 # Server-side route handlers that proxy to cloud-hosted n8n
        └── lead/            # Lead capture endpoint group
            ├── route.ts     # Validates email, stamps funnel_variant server-side, forwards lead to n8n → HubSpot + Resend
        └── track/           # Event tracking endpoint group
            ├── route.ts     # Forwards VSL milestone + conversion events to n8n for timeline / retargeting / pixels
    ├── legal/               # Static legal pages rendered through the shared LegalShell wrapper
        ├── disclaimer/      # Earnings / results disclaimer route
            ├── page.tsx     # Earnings & results disclaimer content
        ├── privacy/         # Privacy policy route
            ├── page.tsx     # Privacy policy content
        ├── terms/           # Terms & conditions route
            ├── page.tsx     # Terms & conditions content
    ├── class-full/          # Waitlist / smoke-test confirmation route (only reachable in waitlist mode)
            ├── page.tsx     # "You're on the waitlist" page; guards to /thank-you if not in waitlist mode; fires waitlist_confirmed
    ├── thank-you/           # Live-funnel conversion confirmation route
            ├── page.tsx     # Confirmation page; fires conversion pixel + surfaces the inline welcome video (Shock & Awe)
    ├── watch/               # Gated training-video route the delivery email links to
            ├── page.tsx     # Hosts the gated training video + downloadable workflow asset (asset link still TODO)
    ├── layout.tsx           # Root layout: fonts (Space Grotesk/Mono, Inter), metadata, global chrome
    ├── page.tsx             # VSL landing page; hero YouTube VSL, mode-aware scarcity banner + CTA, lead capture
    ├── globals.css          # Tailwind base + brand utility classes (eyebrow, etc.)
└── components/              # Reusable client components
    ├── LeadForm.tsx         # Multi-step capture; stamps funnel_variant, mode-aware copy, redirects via getSubmitRedirect()
    ├── LegalShell.tsx       # Shared layout wrapper for the legal pages
    ├── SignalRail.tsx       # "What's actually live" proof rail; pulse reserved for genuinely live items
    ├── SiteFooter.tsx       # Global footer with legal links + brand line
    ├── TodoChip.tsx         # Renders honest TODO markers for unresolved values instead of fabricating detail
    ├── VideoFrame.tsx       # Video wrapper: delegates to YouTubeEmbed for YT sources, native <video> otherwise, honest placeholder if neither
    ├── YouTubeEmbed.tsx     # Enterprise lite-embed (facade): loads the YouTube iframe only on click; IFrame API milestone tracking
└── lib/                     # Framework-agnostic config + helpers
    ├── funnel.config.ts     # Single source of truth for funnel copy, funnel-mode helpers, and class-full/waitlist copy
    ├── track.ts             # Client event helper + TrackEvent union (vsl_*, thankyou_*, waitlist_*, conversion)
├── next-env.d.ts            # Next.js TypeScript ambient types (generated)
├── next.config.mjs          # Next config; no static export (server API routes proxy to n8n)
├── package.json             # Dependencies + scripts (dev / build / start / lint)
├── postcss.config.mjs       # PostCSS pipeline for Tailwind + autoprefixer
├── preview.html             # Standalone static preview of the funnel layout
├── tailwind.config.ts       # Brand design tokens: Deep Slate Teal, Kinetic Emerald (live only), type scale
├── tsconfig.json            # TypeScript compiler config + path aliases (@/*)
├── .env.example             # Documents FUNNEL_MODE + n8n webhook envs; copy to .env.local to run
├── .gitignore               # Ignored paths (node_modules, .next, .env*, build artifacts)
└── README.md                # Project documentation
```