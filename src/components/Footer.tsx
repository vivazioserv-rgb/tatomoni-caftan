"use client";
import Link from "next/link";
import { Scissors, Sparkles, Truck } from "lucide-react";
import { siteConfig } from "@/site.config";
import { useLocale } from "@/context/LocaleProvider";

export default function Footer({ brandName = siteConfig.brand.name }: { brandName?: string }) {
  const { t } = useLocale();
  return (
    <footer className="mt-10 border-t border-[var(--accent)] bg-[var(--muted)]">
      <div className="mx-auto grid max-w-7xl gap-6 px-6 py-10 md:grid-cols-3">
        <div className="flex items-center gap-3">
          <Sparkles className="h-6 w-6 text-[var(--primary)]" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider">{t("footerHandEmbroidered")}</p>
            <p className="text-xs text-[var(--foreground)]/60">{t("footerHandEmbroideredText")}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Scissors className="h-6 w-6 text-[var(--primary)]" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider">{t("footerBespoke")}</p>
            <p className="text-xs text-[var(--foreground)]/60">{t("footerBespokeText")}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Truck className="h-6 w-6 text-[var(--primary)]" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider">{t("footerShipping")}</p>
            <p className="text-xs text-[var(--foreground)]/60">{t("footerShippingText")}</p>
          </div>
        </div>
      </div>
      <div className="border-t border-[var(--accent)] py-5 text-center text-xs text-[var(--foreground)]/50">
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/a-propos" className="hover:text-[var(--primary)]">{t("aboutLink")}</Link>
          <span aria-hidden="true">·</span>
          <Link href="/contact" className="hover:text-[var(--primary)]">{t("contactLink")}</Link>
          <span aria-hidden="true">·</span>
          <Link href="/rgpd" className="hover:text-[var(--primary)]">{t("privacyLink")}</Link>
        </div>
        <p className="mt-3">© {new Date().getFullYear()} {brandName} — {siteConfig.brand.tagline} — {t("rights")}</p>
      </div>
    </footer>
  );
}
