export type Locale = "fr" | "en" | "ar";

export const LOCALES: Locale[] = ["fr", "en", "ar"];

export const LOCALE_LABELS: Record<Locale, { name: string; flag: string }> = {
  fr: { name: "Français", flag: "🇫🇷" },
  en: { name: "English", flag: "🇬🇧" },
  ar: { name: "العربية", flag: "🇲🇦" },
};

export const RTL_LOCALES: Locale[] = ["ar"];

export const dict = {
  fr: {
    // Navbar
    home: "Accueil",
    collection: "Collection",
    customOrder: "Sur-mesure",
    about: "Maison",
    contact: "Contact",
    cart: "Panier",
    menu: "Menu",

    // Hero
    heroTag: "Caftan marocain · Fait main",
    heroTitle: "L'élégance marocaine, intemporelle",
    heroSubtitle:
      "Caftans brodés main, takchitas et djellabas d'exception — pièces uniques façonnées dans la tradition des maîtres artisans de Fès et Rabat.",
    discoverCollection: "Découvrir la collection",
    customOrderCTA: "Pièce sur-mesure",

    // Pillars
    pillarHandEmbroidered: "Brodé à la main",
    pillarHandEmbroideredText: "Dans la tradition des maîtres artisans",
    pillarBespoke: "Sur-mesure possible",
    pillarBespokeText: "Ajusté à vos mensurations précises",
    pillarShipping: "Livraison mondiale",
    pillarShippingText: "Maroc, Europe & international",

    // Sections
    ourCollections: "NOS COLLECTIONS",
    ourCollectionsSub: "Caftans, takchitas et djellabas",
    newArrivals: "NOUVEAUTÉS",
    ourPieces: "NOS PIÈCES",
    ourPiecesSub: "Une sélection de caftans d'exception",
    seeAll: "Voir toute la collection →",
    viewSelection: "Voir la sélection →",

    // Custom order block
    customTag: "Caftan sur-mesure",
    customBlockTitle1: "UNE PIÈCE UNIQUE",
    customBlockTitle2: "POUR VOTRE GRAND JOUR.",
    customBlockText:
      "Mariage, fiançailles, henné, soirée orientale… Nos maîtres artisans façonnent votre caftan selon vos mensurations, vos couleurs et vos broderies. Devis personnalisé sous 48h.",
    makeRequest: "Faire ma demande",

    // Footer
    footerHandEmbroidered: "Brodé main",
    footerHandEmbroideredText: "Tradition artisanale marocaine",
    footerBespoke: "Sur-mesure",
    footerBespokeText: "Ajusté à vos mensurations",
    footerShipping: "Livraison mondiale",
    footerShippingText: "Maroc, Europe & international",
    aboutLink: "À propos",
    contactLink: "Contact",
    privacyLink: "Confidentialité",
    rights: "Tous droits réservés",
  },

  en: {
    home: "Home",
    collection: "Collection",
    customOrder: "Bespoke",
    about: "House",
    contact: "Contact",
    cart: "Cart",
    menu: "Menu",

    heroTag: "Moroccan caftan · Handmade",
    heroTitle: "Timeless Moroccan Elegance",
    heroSubtitle:
      "Hand-embroidered caftans, takchitas and djellabas — unique pieces crafted in the tradition of master artisans of Fès and Rabat.",
    discoverCollection: "Discover the collection",
    customOrderCTA: "Bespoke piece",

    pillarHandEmbroidered: "Hand embroidered",
    pillarHandEmbroideredText: "In the tradition of master artisans",
    pillarBespoke: "Made-to-measure",
    pillarBespokeText: "Tailored to your exact measurements",
    pillarShipping: "Worldwide shipping",
    pillarShippingText: "Morocco, Europe & international",

    ourCollections: "OUR COLLECTIONS",
    ourCollectionsSub: "Caftans, takchitas & djellabas",
    newArrivals: "NEW ARRIVALS",
    ourPieces: "OUR PIECES",
    ourPiecesSub: "A curated selection of exceptional caftans",
    seeAll: "View the full collection →",
    viewSelection: "View selection →",

    customTag: "Bespoke caftan",
    customBlockTitle1: "A UNIQUE PIECE",
    customBlockTitle2: "FOR YOUR BIG DAY.",
    customBlockText:
      "Wedding, engagement, henna, oriental evening… Our master artisans craft your caftan to your measurements, colors and embroideries. Personalized quote within 48h.",
    makeRequest: "Make a request",

    footerHandEmbroidered: "Hand embroidered",
    footerHandEmbroideredText: "Moroccan artisanal tradition",
    footerBespoke: "Made-to-measure",
    footerBespokeText: "Tailored to your measurements",
    footerShipping: "Worldwide shipping",
    footerShippingText: "Morocco, Europe & international",
    aboutLink: "About",
    contactLink: "Contact",
    privacyLink: "Privacy",
    rights: "All rights reserved",
  },

  ar: {
    home: "الرئيسية",
    collection: "المجموعة",
    customOrder: "حسب الطلب",
    about: "الدار",
    contact: "اتصل بنا",
    cart: "السلة",
    menu: "القائمة",

    heroTag: "قفطان مغربي · صناعة يدوية",
    heroTitle: "الأناقة المغربية الخالدة",
    heroSubtitle:
      "قفطانات وتكاشط وجلابات مطرزة يدويًا — قطع فريدة من صنع أساتذة الصناعة التقليدية في فاس والرباط.",
    discoverCollection: "اكتشفوا المجموعة",
    customOrderCTA: "قطعة حسب الطلب",

    pillarHandEmbroidered: "مطرز يدويًا",
    pillarHandEmbroideredText: "بتقاليد أساتذة الصناعة التقليدية",
    pillarBespoke: "تفصيل حسب المقاس",
    pillarBespokeText: "مفصّل على مقاساتكم بدقة",
    pillarShipping: "شحن عالمي",
    pillarShippingText: "المغرب، أوروبا وباقي العالم",

    ourCollections: "مجموعاتنا",
    ourCollectionsSub: "قفطانات، تكاشط وجلابات",
    newArrivals: "الجديد",
    ourPieces: "قطعنا",
    ourPiecesSub: "مجموعة مختارة من القفطانات الاستثنائية",
    seeAll: "عرض المجموعة الكاملة →",
    viewSelection: "عرض الاختيار →",

    customTag: "قفطان حسب الطلب",
    customBlockTitle1: "قطعة فريدة",
    customBlockTitle2: "ليومكم العظيم.",
    customBlockText:
      "عرس، خطوبة، حفل حنة، سهرة شرقية… يصنع أساتذتنا قفطانكم حسب مقاساتكم وألوانكم وتطريزاتكم. عرض سعر مخصص خلال 48 ساعة.",
    makeRequest: "تقديم طلب",

    footerHandEmbroidered: "مطرز يدويًا",
    footerHandEmbroideredText: "تقاليد الصناعة المغربية",
    footerBespoke: "حسب المقاس",
    footerBespokeText: "مفصّل على مقاساتكم",
    footerShipping: "شحن عالمي",
    footerShippingText: "المغرب، أوروبا وباقي العالم",
    aboutLink: "من نحن",
    contactLink: "اتصل بنا",
    privacyLink: "الخصوصية",
    rights: "جميع الحقوق محفوظة",
  },
} as const;

export type TKey = keyof typeof dict.fr;

export function t(locale: Locale, key: TKey): string {
  return (dict[locale] as Record<string, string>)[key] ?? (dict.fr as Record<string, string>)[key];
}
