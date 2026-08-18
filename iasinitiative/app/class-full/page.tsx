"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { classFull, getFunnelMode } from "@/lib/funnel.config";
import { track } from "@/lib/track";
import { SiteFooter } from "@/components/SiteFooter";

/**
 * /class-full — waitlist confirmation for the fake-door / smoke test.
 *
 * Honest by design (Article IX): the cohort genuinely isn't open yet (content
 * still being built), so "you're on the waitlist" is true, not scarcity theater.
 * Real capture already happened in LeadForm → /api/lead (funnel_variant=waitlist).
 *
 * Guard: if the site is in "live" mode this page shouldn't be reachable, so we
 * bounce to the real confirmation rather than show a fake-full message.
 */
export default function ClassFullPage() {
  const router = useRouter();
  const isWaitlist = getFunnelMode() === "waitlist";

  useEffect(() => {
    if (!isWaitlist) {
      router.replace("/thank-you");
      return;
    }
    // Waitlist conversion confirmation — distinct audience from the live funnel.
    track("waitlist_confirmed", { page: "class_full" });
  }, [router]);

  if (!isWaitlist) return null;

  const c = classFull;

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <section className="mx-auto flex w-full max-w-page flex-1 items-center px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-5">{c.eyebrow}</p>

          <span className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-accent">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M5 13l4 4L19 7"
                stroke="#0A2E36"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>

          <h1 className="font-display text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            {c.heading}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-body">{c.sub}</p>

          <ul className="mx-auto mt-8 max-w-md space-y-3 text-left">
            {c.points.map((p, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-hair bg-ash">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path
                      d="M5 13l4 4L19 7"
                      stroke="#0A2E36"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="text-sm leading-relaxed text-body">{p}</span>
              </li>
            ))}
          </ul>

          <a
            href={c.watchHref}
            onClick={() => track("cta_click", { page: "class_full" })}
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3.5 text-sm font-semibold text-primary transition hover:bg-accent-600"
          >
            {c.watchCta} <span aria-hidden>↗</span>
          </a>

          <p className="mt-6 font-mono text-xs text-muted">{c.inlineNote}</p>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
