/**
 * funnel.config.ts — single source of truth for the VSL funnel.
 *
 * Governance notes (Article VI / IX):
 * - "Demonstrate, never claim." No fabricated metrics, no fake testimonials.
 * - Any number that isn't real is a TODO chip, not a made-up figure.
 * - Kinetic Emerald / "live" status reserved for things that are genuinely live.
 *
 * Voice: written for the target audience (Black men, 22–32, who know AI matters
 * but haven't found a way in that isn't "learn to code"). Direct, grounded,
 * no guru cadence. The authority is Steve building in public — not borrowed.
 */

export type Todo = { __todo: true; label: string };
export const todo = (label: string): Todo => ({ __todo: true, label });
export const isTodo = (v: unknown): v is Todo =>
  typeof v === "object" && v !== null && (v as Todo).__todo === true;

export const funnel = {
  brand: {
    name: "I Automate Shit",
    short: "IAS",
    product: "The IAS Bootcamp",
    founder: "Elwood “Steve” Berry",
    // Positioning north star — NOT shown on-page. Internal only.
    _northStar: "The Nate Herk for African American men.",
    youtube: "https://www.youtube.com/@iautomatesht",
  },

  // ── VSL HUB ────────────────────────────────────────────────────────────
  hero: {
    eyebrow: "Free training",
    // The promise. Speaks to the outcome (be the one who's valuable),
    // not the tech. AI is the vehicle, not the headline.
    headline: "You already know AI matters. Nobody showed you how to actually use it.",
    sub:
      "A free, no-fluff walkthrough of how I automate real work — and how you can become the man in your building nobody can replace. No coding degree. No hype. Just builds.",
    // The video is the VSL. Real, deployed YouTube VSL — rendered via the
    // enterprise lite-embed (facade, no third-party JS until click).
    videoYouTubeId: "SYa-fsWpftQ",
    videoTitle: "You already know AI matters — here's how to actually use it",
    ctaPrimary: "Watch the training",
    ctaNote: "Takes ~14 minutes. Then I hand you the workflow.",
  },

  // The audience's actual objection, named plainly.
  problem: {
    label: "The trap",
    lines: [
      "Everybody's talking about AI. Half of them are selling a course, the other half are telling you to learn Python.",
      "You don't want to become a software engineer. You want to be the one at work who ships faster, looks sharper, and gets moved up.",
      "That's a different skill. It's called building automations — and it's the most undervalued move in the room right now.",
    ],
  },

  // What they'll be able to do. Concrete, controllable, real.
  outcomes: {
    label: "What you'll be able to do",
    items: [
      {
        k: "Automate the boring part of your job",
        v: "Inbox, reports, follow-ups, data entry — the stuff that eats your day and makes you look slow.",
      },
      {
        k: "Build an “AI employee” that works while you sleep",
        v: "A workflow that reads, decides, and acts — using tools like n8n and Claude, no code required.",
      },
      {
        k: "Have proof, not just talk",
        v: "You walk away with a working build you made yourself. That's the résumé line and the raise conversation.",
      },
    ],
  },

  // The founder — this is where authority comes from. First person, earned.
  founder: {
    label: "Who's teaching this",
    name: "Steve Berry",
    role: "Automation engineer. Builds in public.",
    body:
      "I'm not a guru and I'm not going to sell you a dream. I build automation systems for a living and I put the work on camera — the wins and the parts that break. I'm doing this because when I was figuring it out, there wasn't anybody who looked like me showing the actual screen. So I'm the one.",
    proofLabel: "Watch the builds",
  },

  // What's inside the free training. Specific > clever.
  agenda: {
    label: "Inside the training",
    steps: [
      "The one automation every office worker should build first (and why it changes how people see you)",
      "The exact free/cheap stack I use — no enterprise budget required",
      "How to turn a boring task into a working “AI employee” in one sitting",
      "The path from your first build to getting paid for them",
    ],
  },

  // Live proof rail — the signature element. Only real things get the pulse.
  signals: {
    label: "What's actually live",
    items: [
      { on: true, text: "Weekly build session, every Saturday — no slides, just building" },
      { on: true, text: "Every training ends with a downloadable workflow you keep" },
      { on: false, text: todo("Community launch — opens after first cohort") },
    ],
  },

  // ── LEAD CAPTURE (multi-step) ──────────────────────────────────────────
  capture: {
    label: "Get the training",
    heading: "Where should I send it?",
    sub: "The video plus the workflow file from it. No spam — you can leave anytime.",
    steps: [
      {
        id: "identity",
        title: "Start here",
        fields: [
          { name: "firstName", label: "First name", type: "text", required: true, placeholder: "First name" },
          { name: "email", label: "Email", type: "email", required: true, placeholder: "you@email.com" },
        ],
      },
      {
        id: "context",
        title: "So I can tailor it",
        fields: [
          {
            name: "role",
            label: "What best describes you right now?",
            type: "select",
            required: true,
            options: [
              "Working a 9–5 (sales, ops, admin, marketing…)",
              "In school / just graduated",
              "Switching careers",
              "Running my own small business",
              "Something else",
            ],
          },
          {
            name: "goal",
            label: "What are you really after?",
            type: "select",
            required: false,
            options: [
              "A raise or a promotion",
              "A better job entirely",
              "Extra income on the side",
              "Just want to stop feeling behind on AI",
            ],
          },
        ],
      },
    ],
    submit: "Send me the training",
    submitting: "Sending…",
    consent:
      "By continuing you agree to get emails from IAS about the training and future builds. Unsubscribe anytime.",
  },

  // ── CONFIRMATION / SHOCK & AWE ─────────────────────────────────────────
  thankYou: {
    heading: "You're in. Check your email.",
    sub: "The training link is on its way to your inbox. While you wait — here's the room where I actually build.",
    // Shock & Awe: a real welcome/build video surfaced inline on confirmation,
    // rendered via the enterprise lite-embed. Real, deployed — not a placeholder.
    videoYouTubeId: "4W2LQrxhmMI",
    videoTitle: "Welcome to IAS — watch a build right now",
    watchCta: "Watch a build right now",
    watchHref: "https://www.youtube.com/@iautomatesht",
    inlineNote: "Didn't get the email in a couple minutes? Check spam, or the promotions tab.",
  },

  // ── WAITLIST CONFIRMATION (linkless — no training access yet) ──────────
  waitlistConfirmed: {
    heading: "You're on the list.",
    sub: "The bootcamp isn't open yet. When a seat opens up, you'll be the first to know — I'll email you the moment it's live.",
    // Deliberately NO training link/CTA here. Waitlisters get access when the
    // cohort opens, not before. This mirrors the linkless waitlist email so the
    // page and the inbox tell the same honest story.
    watchCta: "See what I build in the meantime",
    watchHref: "https://www.youtube.com/@iautomatesht",
    inlineNote: "Didn't get the confirmation email? Check spam or the promotions tab.",
  },

  // ── VIDEO PAGE (gated content the email links to) ──────────────────────
  watch: {
    heading: "Your training",
    sub: "Watch it start to finish, then grab the workflow underneath. Build along with me.",
    videoTodo: todo("Embed gated training video (Mux signed URL / YouTube unlisted)"),
    assetLabel: "Today's workflow",
    assetNote: "The n8n workflow from this training. Import it and make it yours.",
    assetTodo: todo("Link the downloadable n8n workflow JSON"),
  },

  legal: {
    privacyHref: "/legal/privacy",
    termsHref: "/legal/terms",
    disclaimerHref: "/legal/disclaimer",
  },
} as const;

export type Funnel = typeof funnel;

/**
 * Funnel mode — smoke-test switch.
 *
 *   FUNNEL_MODE=live      → real VSL funnel, submit routes to /thank-you.
 *   FUNNEL_MODE=waitlist  → fake-door / smoke test. Submit routes to /class-full,
 *                           stamps funnel_variant=waitlist so n8n branches to the
 *                           "notify me when spots open" Resend email + drip.
 *
 * This is a build-time public flag so both server (redirect-safety) and client
 * (form redirect) read the same value. Flip it in Vercel env and redeploy — no
 * code change. Default is "live" so a missing env never fakes a full class.
 *
 * Governance (Article IX): the waitlist is honest — the cohort genuinely isn't
 * open yet because the content is still being built. Real capture, real list,
 * real "we'll notify you." Not a dead end.
 */
export type FunnelMode = "live" | "waitlist";

/**
 * Resolve the funnel mode from env, defaulting to "live".
 *
 * Each helper reads process.env.NEXT_PUBLIC_FUNNEL_MODE *directly* so Next can
 * statically inline it into the client bundle. Do NOT build a chain of consts
 * that reference each other (funnelMode → isWaitlist → submitRedirect): in the
 * production bundle those intermediate consts can evaluate before their
 * dependency is initialized and resolve to `undefined`, which is what made
 * router.push(submitRedirect) throw "Cannot read properties of undefined
 * (reading 'startsWith')". A function that always returns a string can't.
 */
export function getFunnelMode(): FunnelMode {
  return process.env.NEXT_PUBLIC_FUNNEL_MODE === "waitlist" ? "waitlist" : "live";
}

export const funnelMode: FunnelMode = getFunnelMode();

export const isWaitlist = getFunnelMode() === "waitlist";

/**
 * Where a successful submit lands, by mode. Function, not a bare const — it
 * always returns a valid path string, so router.push() can never receive
 * undefined regardless of bundle evaluation order.
 */
export function getSubmitRedirect(): "/class-full" | "/thank-you" {
  return getFunnelMode() === "waitlist" ? "/class-full" : "/thank-you";
}

/** Back-compat const — safe now because getSubmitRedirect() always returns a string. */
export const submitRedirect: "/class-full" | "/thank-you" = getSubmitRedirect();

/**
 * Mode-aware hero overrides. In waitlist mode the CTA and a scarcity banner
 * change so the "door" reads as real demand — enterprise smoke tests surface
 * the constraint on the landing page, not only after submit.
 */
export function getHeroMode() {
  return getFunnelMode() === "waitlist"
    ? {
        banner: "The current cohort is full — join the waitlist for the next one.",
        ctaPrimary: "Join the waitlist",
        formLabel: "Join the waitlist",
        formHeading: "Get first access to the next cohort",
        formSub:
          "Spots open to this list first, before it goes public. Drop your email and I'll notify you.",
        formSubmit: "Join the waitlist",
      }
    : null;
}

export const heroMode = getHeroMode();

/**
 * Waitlist / "class full" confirmation copy. Headline leads with the offer
 * (you're on the list), scarcity is the reason — the 2026 waitlist-smoke-test
 * pattern, not a dead-end "Class is Full" wall.
 */
export const classFull = {
  eyebrow: "Enrollment closed",
  heading: "This cohort filled up — you're on the waitlist.",
  sub: "The current group is full. You're locked in for the next one — I'll email you the moment spots open, before it goes public.",
  points: [
    "You're on the list. No further action needed.",
    "Next cohort opens first to this waitlist — you'll get the heads-up early.",
    "While you wait, watch how I actually build. Same work, on camera.",
  ],
  watchCta: "Watch a build while you wait",
  watchHref: "https://www.youtube.com/@iautomatesht",
  inlineNote: "Wrong email? Just re-submit — I'll use the most recent one.",
} as const;
