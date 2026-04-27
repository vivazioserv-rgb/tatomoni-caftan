"use client";
import Link from "next/link";
import { Truck, Sparkles, Scissors } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { useLocale } from "@/context/LocaleProvider";
import { siteConfig } from "@/site.config";

export default function HomeClient({
  categories,
  displayedNew,
  previewProducts,
  heroImage,
  heroTitle,
  heroSubtitle,
}: {
  categories: any[];
  displayedNew: any[];
  previewProducts: any[];
  heroImage: string;
  heroTitle: string;
  heroSubtitle: string;
}) {
  const { t } = useLocale();

  // If user didn't customize hero via admin, show translated default
  const displayedTitle = heroTitle && heroTitle !== siteConfig.hero.defaultTitle ? heroTitle : t("heroTitle");
  const displayedSubtitle =
    heroSubtitle && heroSubtitle !== siteConfig.hero.defaultSubtitle ? heroSubtitle : t("heroSubtitle");

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--muted)]">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:gap-16 lg:py-28">
          <div className="flex flex-col">
            <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.4em] text-[var(--primary)]">
              {t("heroTag")}
            </p>
            <h1 className="font-serif text-4xl leading-[1.05] text-[var(--foreground)] sm:text-5xl lg:text-6xl">
              {displayedTitle}
            </h1>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-[var(--foreground)]/70">
              {displayedSubtitle}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/catalogue"
                className="rounded-sm bg-[var(--primary)] px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--background)] hover:bg-[var(--primary-dark)]"
              >
                {t("discoverCollection")}
              </Link>
              {siteConfig.features.customOrders && (
                <Link
                  href="/sur-mesure"
                  className="rounded-sm border border-[var(--primary)] px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--background)]"
                >
                  {t("customOrderCTA")}
                </Link>
              )}
            </div>
          </div>

          <div className="relative">
            <div className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden rounded-sm shadow-2xl ring-1 ring-[var(--accent)]/40">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={heroImage} alt="Caftan" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="border-y border-[var(--accent)]/30 bg-[var(--background)]">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 py-8 md:grid-cols-3">
          <FeatureItem
            icon={<Sparkles className="h-5 w-5 text-[var(--primary)]" />}
            title={t("pillarHandEmbroidered")}
            text={t("pillarHandEmbroideredText")}
          />
          <FeatureItem
            icon={<Scissors className="h-5 w-5 text-[var(--primary)]" />}
            title={t("pillarBespoke")}
            text={t("pillarBespokeText")}
            divider
          />
          <FeatureItem
            icon={<Truck className="h-5 w-5 text-[var(--primary)]" />}
            title={t("pillarShipping")}
            text={t("pillarShippingText")}
          />
        </div>
      </section>

      {/* Categories */}
      {categories.length > 0 && (
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6">
            <SectionHeader title={t("ourCollections")} subtitle={t("ourCollectionsSub")} />
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-5">
              {categories.map((cat: any) => (
                <Link key={cat._id} href={`/catalogue?cat=${cat._id}`} className="group flex flex-col items-center">
                  <div className="relative h-36 w-36 overflow-hidden rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--muted)] shadow-md transition-transform group-hover:scale-105">
                    {cat.imageUrl ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={cat.imageUrl} alt={cat.name} className="h-full w-full object-cover" />
                    ) : cat.emoji ? (
                      <div className="flex h-full w-full items-center justify-center text-6xl">{cat.emoji}</div>
                    ) : (
                      <div className="flex h-full w-full items-center justify-center font-serif text-5xl text-[var(--primary)]/50">
                        {cat.name?.[0]?.toUpperCase() || "?"}
                      </div>
                    )}
                  </div>
                  <h3 className="mt-4 font-serif text-sm font-medium uppercase tracking-wider">{cat.name}</h3>
                  <p className="mt-1 text-xs text-[var(--primary)] group-hover:underline">{t("viewSelection")}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* New arrivals */}
      {displayedNew.length > 0 && (
        <section className="bg-[var(--muted)] py-20">
          <div className="mx-auto max-w-7xl px-6">
            <SectionHeader title={t("newArrivals")} />
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-5">
              {displayedNew.map((p: any) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Preview */}
      {previewProducts.length > 0 && (
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6">
            <SectionHeader title={t("ourPieces")} subtitle={t("ourPiecesSub")} />
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
              {previewProducts.map((p: any) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
            <div className="mt-10 flex justify-center">
              <Link
                href="/catalogue"
                className="rounded-sm border border-[var(--primary)] px-8 py-3 text-xs font-semibold uppercase tracking-widest text-[var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--background)]"
              >
                {t("seeAll")}
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Custom order CTA */}
      {siteConfig.features.customOrders && (
        <section className="bg-[var(--muted)] py-20">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-2">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-xl md:aspect-auto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1400&auto=format&fit=crop&q=90"
                alt="Bespoke caftan"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--primary)]">
                {t("customTag")}
              </p>
              <h2 className="font-serif text-4xl leading-tight">
                {t("customBlockTitle1")}
                <br />
                <span className="text-[var(--primary)]">{t("customBlockTitle2")}</span>
              </h2>
              <p className="mt-6 max-w-md text-base text-[var(--foreground)]/70">{t("customBlockText")}</p>
              <div className="mt-8">
                <Link
                  href="/sur-mesure"
                  className="inline-block rounded-sm bg-[var(--primary)] px-6 py-3 text-xs font-semibold uppercase tracking-widest text-[var(--background)] hover:bg-[var(--primary-dark)]"
                >
                  {t("makeRequest")}
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-12 flex flex-col items-center">
      <h2 className="font-serif text-3xl tracking-wider">{title}</h2>
      <div className="mt-3 h-px w-16 bg-[var(--primary)]" />
      {subtitle && <p className="mt-4 text-center text-sm text-[var(--foreground)]/60">{subtitle}</p>}
    </div>
  );
}

function FeatureItem({
  icon,
  title,
  text,
  divider,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  divider?: boolean;
}) {
  return (
    <div className={`flex items-center gap-3 ${divider ? "md:border-x md:border-[var(--accent)] md:px-6" : ""}`}>
      {icon}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--foreground)]">{title}</p>
        <p className="text-xs text-[var(--foreground)]/60">{text}</p>
      </div>
    </div>
  );
}
