// ═══════════════════════════════════════════════════════════════════
// SITE CONFIG — Tatomoni Caftan (caftans marocains d'exception)
// ═══════════════════════════════════════════════════════════════════

export type Vertical = "patisserie" | "bijouterie" | "fleuriste" | "chocolaterie" | "caftan" | "generic";

export interface VariantConfig {
  key: "flavors" | "sizes";
  label: string;
  labelSingular: string;
  placeholder: string;
  hasImage: boolean;
  enabled: boolean;
}

export interface NavLink {
  href: string;
  label: string;
}

export interface SiteConfig {
  vertical: Vertical;
  brand: {
    name: string;
    tagline: string;
    banner: string;
    bannerSymbol: string;
    logoUrl: string;
    storagePrefix: string;
  };
  theme: {
    background: string;
    foreground: string;
    primary: string;
    primaryDark: string;
    accent: string;
    muted: string;
  };
  meta: { title: string; description: string };
  hero: { defaultTitle: string; defaultSubtitle: string; defaultImageUrl: string };
  contact: { email: string; phone: string; zone: string };
  navbar: { links: NavLink[] };
  product: {
    variant1: VariantConfig;
    variant2: VariantConfig;
    hasAllergens: boolean;
    allergensLabel: string;
    delayLabel: string;
    delayUnit: "days" | "hours";
  };
  features: {
    customOrders: boolean;
    pickupCalendar: boolean;
    postalDelivery: boolean;
    whatsappButton: boolean;
  };
  customOrderEvents?: string[];
  defaults: {
    slots: string[];
    openWeekdays: number[];
    minDelay: number;
  };
  legalPreset: "patisserie" | "bijouterie" | "generic";
}

// ═══════════════════════════════════════════════════════════════════
// TATOMONI CAFTAN — caftans marocains d'exception, fait main
// Palette : ivoire chaud / bordeaux profond / doré royal
// ═══════════════════════════════════════════════════════════════════

export const siteConfig: SiteConfig = {
  vertical: "caftan",

  brand: {
    name: "Tatomoni Caftan",
    tagline: "L'art du caftan marocain",
    banner: "CAFTANS FAITS MAIN · LIVRAISON INTERNATIONALE · PIÈCES UNIQUES",
    bannerSymbol: "✦",
    logoUrl: "/logo.png",
    storagePrefix: "tatomoni",
  },

  theme: {
    background: "#faf6ef",     // ivoire chaud (fond général clair et noble)
    foreground: "#1a0e09",     // brun noir profond (texte)
    primary: "#8b1e3f",        // bordeaux royal (boutons, CTAs)
    primaryDark: "#6b1730",    // bordeaux foncé (hover)
    accent: "#d4a84b",          // doré royal (accents, séparateurs)
    muted: "#f0e8d6",           // crème doré (sections, cards)
  },

  meta: {
    title: "Tatomoni Caftan — Caftans marocains d'exception, fait main",
    description:
      "Caftans marocains haut de gamme, brodés à la main dans la tradition artisanale. Pièces uniques pour mariages, soirées et cérémonies. Livraison internationale.",
  },

  hero: {
    defaultTitle: "L'élégance marocaine, intemporelle",
    defaultSubtitle:
      "Caftans brodés main, takchitas et djellabas d'exception — pièces uniques façonnées dans la tradition des maîtres artisans de Fès et Rabat.",
    defaultImageUrl: "/caftan-hero.jpg",
  },

  contact: {
    email: "contact@tatomoni-caftan.com",
    phone: "+212 6 61 45 23 87",
    zone: "Livraison Maroc, Europe & Monde",
  },

  navbar: {
    links: [
      { href: "/", label: "Accueil" },
      { href: "/catalogue", label: "Collection" },
      { href: "/sur-mesure", label: "Sur-mesure" },
      { href: "/a-propos", label: "Maison" },
      { href: "/contact", label: "Contact" },
    ],
  },

  product: {
    variant1: {
      key: "flavors",
      label: "Couleur",
      labelSingular: "couleur",
      placeholder: "Nom de la couleur (Bordeaux, Doré, Émeraude…)",
      hasImage: true,
      enabled: true,
    },
    variant2: {
      key: "sizes",
      label: "Taille",
      labelSingular: "taille",
      placeholder: "Taille (36, 38, 40, 42, 44, sur-mesure…)",
      hasImage: false,
      enabled: true,
    },
    hasAllergens: true,
    allergensLabel: "Composition & entretien",
    delayLabel: "Délai de confection",
    delayUnit: "days",
  },

  features: {
    customOrders: true,
    pickupCalendar: false,
    postalDelivery: true,
    whatsappButton: true,
  },

  customOrderEvents: [
    "Mariage / cérémonie",
    "Fiançailles",
    "Henné",
    "Soirée orientale",
    "Aïd / fête religieuse",
    "Demoiselle d'honneur",
    "Caftan de maman",
    "Pièce unique sur-mesure",
    "Autre",
  ],

  defaults: {
    slots: [],
    openWeekdays: [1, 2, 3, 4, 5, 6],
    minDelay: 7,
  },

  legalPreset: "generic",
};
