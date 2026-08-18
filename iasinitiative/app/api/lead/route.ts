import { NextRequest, NextResponse } from "next/server";

/**
 * Lead capture endpoint.
 *
 * Flow: browser → this route → n8n webhook → HubSpot (create/update contact)
 *       + Resend (send training email). n8n owns the orchestration so the
 *       funnel logic lives in one place and can change without a redeploy.
 *
 * Set N8N_LEAD_WEBHOOK_URL in Vercel env. If unset, we log and 200 so the
 * dev/demo funnel still completes (governance: honest fallback, not fake data).
 */
export async function POST(req: NextRequest) {
  let payload: Record<string, unknown>;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const email = String(payload.email ?? "").trim();
  if (!email || !email.includes("@")) {
    return NextResponse.json({ ok: false, error: "A valid email is required" }, { status: 422 });
  }

  // Funnel mode is authoritative on the server — the client can't fake which
  // drip a lead enters. n8n branches on funnel_variant:
  //   "waitlist" → "we'll notify you when spots open" Resend email + waitlist drip
  //   "live"     → training-delivery Resend email + main drip
  const mode = process.env.FUNNEL_MODE === "waitlist" ? "waitlist" : "live";

  const record = {
    ...payload,
    funnel_variant: mode,
    source: mode === "waitlist" ? "ias-vsl-waitlist" : "ias-vsl",
    submitted_at: new Date().toISOString(),
    user_agent: req.headers.get("user-agent") ?? "",
  };

  const webhook = process.env.N8N_LEAD_WEBHOOK_URL;
  if (!webhook) {
    console.warn("[lead] N8N_LEAD_WEBHOOK_URL not set — logging only:", record);
    return NextResponse.json({ ok: true, forwarded: false });
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.N8N_WEBHOOK_SECRET
          ? { "x-ias-secret": process.env.N8N_WEBHOOK_SECRET }
          : {}),
      },
      body: JSON.stringify(record),
    });
    if (!res.ok) {
      console.error("[lead] n8n webhook non-2xx:", res.status);
      // Still 200 to the browser — we captured the lead; retry is n8n's job.
      return NextResponse.json({ ok: true, forwarded: false });
    }
    return NextResponse.json({ ok: true, forwarded: true });
  } catch (err) {
    console.error("[lead] webhook error:", err);
    return NextResponse.json({ ok: true, forwarded: false });
  }
}
