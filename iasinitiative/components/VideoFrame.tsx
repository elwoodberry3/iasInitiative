"use client";

import { useEffect, useRef, useState } from "react";
import { track } from "@/lib/track";
import { TodoChip } from "./TodoChip";

/**
 * VSL video frame with milestone tracking (25/50/75/complete + play).
 *
 * Pass `src` when the real video exists (Mux/YouTube/hosted mp4). Until then it
 * renders an honest placeholder with a TODO chip — no fake player, no fake
 * thumbnail. Milestone events fire to /api/track → n8n for retargeting audiences.
 */
export function VideoFrame({
  src,
  todoLabel,
  onCtaReady,
}: {
  src?: string;
  todoLabel?: string;
  onCtaReady?: () => void;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const fired = useRef<Set<string>>(new Set());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    const fireOnce = (key: string, fn: () => void) => {
      if (fired.current.has(key)) return;
      fired.current.add(key);
      fn();
    };

    const onPlay = () => fireOnce("play", () => track("vsl_play"));
    const onTime = () => {
      if (!v.duration) return;
      const pct = v.currentTime / v.duration;
      if (pct >= 0.25) fireOnce("25", () => track("vsl_25"));
      if (pct >= 0.5) fireOnce("50", () => track("vsl_50"));
      if (pct >= 0.75)
        fireOnce("75", () => {
          track("vsl_75");
          onCtaReady?.();
        });
    };
    const onEnd = () => fireOnce("complete", () => track("vsl_complete"));

    v.addEventListener("play", onPlay);
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("ended", onEnd);
    return () => {
      v.removeEventListener("play", onPlay);
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("ended", onEnd);
    };
  }, [onCtaReady]);

  if (!src) {
    return (
      <div className="flex aspect-video w-full flex-col items-center justify-center gap-4 rounded-xl border border-hair bg-ash">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-hair bg-white">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M8 5v14l11-7z" fill="#0A2E36" />
          </svg>
        </div>
        <p className="font-mono text-xs text-muted">Video slot</p>
        {todoLabel ? <TodoChip label={todoLabel} /> : null}
      </div>
    );
  }

  return (
    <video
      ref={ref}
      src={src}
      controls
      playsInline
      onLoadedData={() => setReady(true)}
      className={`aspect-video w-full rounded-xl border border-hair bg-black transition-opacity ${
        ready ? "opacity-100" : "opacity-80"
      }`}
    />
  );
}
