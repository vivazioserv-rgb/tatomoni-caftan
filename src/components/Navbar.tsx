"use client";
import Link from "next/link";
import { useCart } from "@/context/CartProvider";
import { useLocale } from "@/context/LocaleProvider";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { TKey } from "@/lib/i18n";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";
import { siteConfig } from "@/site.config";

const LINK_KEYS: Record<string, TKey> = {
  "/": "home",
  "/catalogue": "collection",
  "/sur-mesure": "customOrder",
  "/a-propos": "about",
  "/contact": "contact",
};

export default function Navbar({ brandName = siteConfig.brand.name }: { brandName?: string }) {
  const { cartCount, setCartOpen } = useCart();
  const { t } = useLocale();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = siteConfig.navbar.links.filter((l) => {
    if (l.href === "/sur-mesure" && !siteConfig.features.customOrders) return false;
    return true;
  });

  return (
    <>
      <div
        className="py-2.5 text-center text-[10px] font-semibold tracking-[0.35em]"
        style={{ backgroundColor: "#8b1e3f", color: "#faf6ef" }}
      >
        {siteConfig.brand.banner} <span className="ml-1">{siteConfig.brand.bannerSymbol}</span>
      </div>
      <header
        className="sticky top-0 z-40 border-b backdrop-blur"
        style={{ backgroundColor: "rgba(250, 246, 239, 0.95)", borderColor: "#d4a84b33" }}
      >
        <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-6 md:h-28">
          <Link href="/" className="flex items-center" aria-label={brandName}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={siteConfig.brand.logoUrl}
              alt={brandName}
              className="h-20 w-auto object-contain md:h-24"
              style={{ mixBlendMode: "multiply" }}
            />
          </Link>
          <nav
            className="hidden items-center gap-8 text-sm font-medium md:flex"
            style={{ color: "#1a0e09" }}
          >
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-[var(--primary)] transition-colors">
                {LINK_KEYS[l.href] ? t(LINK_KEYS[l.href]) : l.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4" style={{ color: "#1a0e09" }}>
            <LocaleSwitcher />
            <button
              onClick={() => setCartOpen(true)}
              aria-label={t("cart")}
              className="relative hover:text-[var(--primary)]"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span
                  className="absolute -right-2 -top-2 flex h-4 min-w-[16px] items-center justify-center rounded-full px-1 text-[10px] font-bold"
                  style={{ backgroundColor: "#8b1e3f", color: "#faf6ef" }}
                >
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileOpen(true)}
              aria-label={t("menu")}
              className="md:hidden hover:text-[var(--primary)]"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden">
            <div className="flex-1 bg-black/50" onClick={() => setMobileOpen(false)} />
            <aside
              className="w-72 border-l p-6 shadow-2xl"
              style={{ backgroundColor: "#faf6ef", color: "#1a0e09", borderColor: "#d4a84b" }}
            >
              <button onClick={() => setMobileOpen(false)} className="mb-6 ml-auto block">
                <X className="h-5 w-5" />
              </button>
              <nav className="space-y-4">
                {links.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setMobileOpen(false)}
                    className="block text-lg font-medium hover:text-[var(--primary)]"
                    style={{ color: "#1a0e09" }}
                  >
                    {LINK_KEYS[l.href] ? t(LINK_KEYS[l.href]) : l.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-8 border-t pt-4" style={{ borderColor: "#d4a84b" }}>
                <LocaleSwitcher />
              </div>
            </aside>
          </div>
        )}
      </header>
    </>
  );
}
