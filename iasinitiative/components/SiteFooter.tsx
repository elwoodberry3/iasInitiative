import Link from "next/link";
import { funnel } from "@/lib/funnel.config";

export function SiteFooter() {
  return (
    <footer className="border-t border-hair bg-primary text-white">
      <div className="mx-auto flex max-w-page flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-sm font-semibold tracking-tight">
            {funnel.brand.name}
          </p>
          <p className="mt-1 font-mono text-xs text-secondary-200">
            Practical AI &amp; automation. Just builds.
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-secondary-200">
          <Link href={funnel.legal.privacyHref} className="hover:text-accent">
            Privacy Policy
          </Link>
          <Link href={funnel.legal.termsHref} className="hover:text-accent">
            Terms &amp; Conditions
          </Link>
          <Link href={funnel.legal.disclaimerHref} className="hover:text-accent">
            Earnings Disclaimer
          </Link>
        </nav>
      </div>
    </footer>
  );
}
