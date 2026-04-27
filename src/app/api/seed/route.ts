import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDb } from "@/lib/mongoose";
import { Settings, Category, Product, Order } from "@/lib/models";
import { siteConfig } from "@/site.config";
import { getLegalPreset } from "@/lib/legalPresets";

export async function POST() {
  await connectDb();

  await Product.deleteMany({});
  await Category.deleteMany({});
  await Order.deleteMany({});

  const existingSettings = await Settings.findOne();
  if (!existingSettings) {
    const legal = getLegalPreset();
    await Settings.create({
      brandName: siteConfig.brand.name,
      brandTagline: siteConfig.brand.tagline,
      heroTitle: siteConfig.hero.defaultTitle,
      heroSubtitle: siteConfig.hero.defaultSubtitle,
      heroImageUrl: siteConfig.hero.defaultImageUrl,
      email: siteConfig.contact.email,
      phone: siteConfig.contact.phone,
      zone: siteConfig.contact.zone,
      adminPassword: await bcrypt.hash("Admin1234!", 10),
      slots: siteConfig.defaults.slots,
      openWeekdays: siteConfig.defaults.openWeekdays,
      closedDates: [],
      minDelay: siteConfig.defaults.minDelay,
      about:
        "Tatomoni Caftan, c'est l'histoire d'une passion : celle des caftans marocains d'exception, façonnés dans la pure tradition des maîtres artisans de Fès et de Rabat.\n\nChaque pièce est brodée à la main par des artisanes qui perpétuent un savoir-faire transmis de génération en génération. Les broderies Sfifa, Aâkad, et Mâalem habillent nos caftans d'une élégance intemporelle, adaptée à chaque cérémonie — mariage, fiançailles, henné, Aïd, soirée orientale.\n\nNous proposons une collection de pièces prêtes à porter et un service sur-mesure complet : nos caftans sont ajustés à vos mensurations, dans les couleurs et les broderies de votre choix. De Casablanca à Paris, de Marrakech à Dubaï, nous livrons l'élégance marocaine dans le monde entier.\n\nParce qu'un caftan n'est pas un simple vêtement : c'est une héritage, une fierté, une célébration.",
      cgv: legal.cgv,
      rgpd: legal.rgpd,
      cookiesPolicy: legal.cookiesPolicy,
    });
  }

  const cats = await Category.insertMany([
    {
      name: "Caftans",
      emoji: "👗",
      imageUrl: "/caftan-hero.jpg",
    },
    {
      name: "Takchitas",
      emoji: "✨",
      imageUrl: "/caftan2.jpg",
    },
    {
      name: "Djellabas",
      emoji: "🌙",
      imageUrl: "/caftan3.jpg",
    },
  ]);

  const catMap = Object.fromEntries(cats.map((c: any) => [c.name, c._id]));

  const couleurs = {
    bordeaux: {
      name: "Bordeaux royal",
      surcharge: 0,
      imageUrl: "/caftan2.jpg",
    },
    dore: {
      name: "Doré royal",
      surcharge: 50,
      imageUrl: "/caftan.jpg",
    },
    emeraude: {
      name: "Vert émeraude",
      surcharge: 0,
      imageUrl: "/logo.png",
    },
    ivoire: {
      name: "Ivoire nacré",
      surcharge: 30,
      imageUrl: "/caftan3.jpg",
    },
    noir: {
      name: "Noir profond",
      surcharge: 0,
      imageUrl: "/caftan2.jpg",
    },
  };

  const tailles = [
    { name: "Taille 36", surcharge: 0 },
    { name: "Taille 38", surcharge: 0 },
    { name: "Taille 40", surcharge: 0 },
    { name: "Taille 42", surcharge: 0 },
    { name: "Taille 44", surcharge: 30 },
    { name: "Taille 46", surcharge: 30 },
    { name: "Sur-mesure", surcharge: 150 },
  ];

  await Product.insertMany([
    // ── CAFTANS ──────────────────────────────────────────────
    {
      name: "Caftan Velours Émeraude",
      shortDesc: "Caftan en velours vert émeraude, broderies dorées Sfifa",
      longDesc:
        "Caftan d'exception en velours de soie vert émeraude, brodé main de motifs Sfifa en fil d'or véritable. Col Mao brodé, manches longues évasées, ceinture Mdama assortie. Confection traditionnelle par nos maîtres artisans de Fès. Idéal pour un mariage ou une cérémonie de henné.",
      basePrice: 1290,
      delay: 15,
      isNew: true,
      status: "available",
      category: catMap["Caftans"],
      allergens: "Velours de soie · Broderie fil d'or · Nettoyage à sec uniquement",
      imageUrl: "/logo.png",
      images: ["/logo.png"],
      flavors: [couleurs.emeraude, couleurs.bordeaux, couleurs.noir],
      sizes: tailles,
    },
    {
      name: "Caftan Doré Royal",
      shortDesc: "Caftan cérémonie en tissu doré, broderies entièrement main",
      longDesc:
        "Le caftan d'exception pour les plus grandes occasions. Tissu lamé or, broderies entièrement main Aâkad sur le plastron, les manches et la ceinture. Pierres semi-précieuses serties. Chaque pièce demande plus de 200h de confection. Pièce collector, tirage limité.",
      basePrice: 2890,
      delay: 30,
      isNew: true,
      status: "available",
      category: catMap["Caftans"],
      allergens: "Tissu lamé or · Broderie main · Pierres serties · Nettoyage à sec spécialisé",
      imageUrl: "/caftan.jpg",
      images: ["/caftan.jpg"],
      flavors: [couleurs.dore, couleurs.ivoire],
      sizes: tailles,
    },
    {
      name: "Caftan Bordeaux Traditionnel",
      shortDesc: "Caftan rouge bordeaux, broderies Mâalem argentées",
      longDesc:
        "Caftan en velours bordeaux profond, classique de l'élégance marocaine. Broderies argentées Mâalem sur le plastron et les poignets, ceinture Mdama brodée assortie. Coupe légèrement cintrée à la taille, manches pagode. Parfait pour un mariage ou une soirée orientale.",
      basePrice: 1150,
      delay: 12,
      isNew: true,
      status: "available",
      category: catMap["Caftans"],
      allergens: "Velours · Broderie fil d'argent · Nettoyage à sec",
      imageUrl: "/caftan2.jpg",
      images: ["/caftan2.jpg"],
      flavors: [couleurs.bordeaux, couleurs.noir, couleurs.emeraude],
      sizes: tailles,
    },
    {
      name: "Caftan Ivoire Henné",
      shortDesc: "Caftan ivoire nacré pour cérémonie de henné",
      longDesc:
        "Caftan de henné en soie ivoire nacrée, broderies délicates en fils de soie colorés — roses anciennes, verts tendres, touches dorées. Coupe fluide, idéale pour danser. La pièce qui accompagne la mariée dans la journée qui précède son mariage.",
      basePrice: 980,
      delay: 15,
      isNew: false,
      status: "available",
      category: catMap["Caftans"],
      allergens: "Soie naturelle · Broderies multicolores · Nettoyage à sec",
      imageUrl: "/caftan3.jpg",
      images: ["/caftan3.jpg"],
      flavors: [couleurs.ivoire, couleurs.dore],
      sizes: tailles,
    },

    // ── TAKCHITAS ───────────────────────────────────────────
    {
      name: "Takchita Deux Pièces Émeraude",
      shortDesc: "Takchita traditionnelle, tahtia + dfina, vert émeraude",
      longDesc:
        "La takchita — deux pièces qui se superposent — dans sa plus belle expression. La tahtia (dessous) en satin émeraude, la dfina (dessus) en velours brodé main avec une ceinture Mdama dorée. Un ensemble majestueux pour les grandes réceptions.",
      basePrice: 1590,
      delay: 20,
      isNew: true,
      status: "available",
      category: catMap["Takchitas"],
      allergens: "Satin + velours · Broderie main · Nettoyage à sec",
      imageUrl: "/caftan.jpg",
      images: ["/caftan.jpg"],
      flavors: [couleurs.emeraude, couleurs.bordeaux],
      sizes: tailles,
    },
    {
      name: "Takchita Mariée Dorée",
      shortDesc: "Takchita de mariée, pièce d'exception entièrement brodée",
      longDesc:
        "La takchita de mariée par excellence. Tahtia en soie ivoire, dfina en tissu lamé or entièrement brodée à la main (broderies Sfifa, Aâkad, pierres serties). Ceinture Mdama en or brodée. Pièce unique, confection 6 semaines. La tenue d'une vie.",
      basePrice: 3990,
      delay: 45,
      isNew: true,
      status: "available",
      category: catMap["Takchitas"],
      allergens: "Soie + lamé or · Broderies main · Pierres serties · Pièce unique",
      imageUrl: "/caftan2.jpg",
      images: ["/caftan2.jpg"],
      flavors: [couleurs.dore, couleurs.ivoire],
      sizes: tailles,
    },
    {
      name: "Takchita Bordeaux Classique",
      shortDesc: "Takchita élégante, velours bordeaux, broderies traditionnelles",
      longDesc:
        "Takchita intemporelle en velours bordeaux. Tahtia assortie en satin, dfina brodée main avec motifs traditionnels sur plastron et poignets. Ceinture large brodée. Une pièce à transmettre.",
      basePrice: 1390,
      delay: 18,
      isNew: false,
      status: "available",
      category: catMap["Takchitas"],
      allergens: "Velours + satin · Broderies traditionnelles",
      imageUrl: "/caftan3.jpg",
      images: ["/caftan3.jpg"],
      flavors: [couleurs.bordeaux, couleurs.noir, couleurs.emeraude],
      sizes: tailles,
    },

    // ── DJELLABAS ───────────────────────────────────────────
    {
      name: "Djellaba Fassia Ivoire",
      shortDesc: "Djellaba en soie ivoire, broderies Fassia fines",
      longDesc:
        "Djellaba traditionnelle de Fès en soie naturelle ivoire, broderies Fassia fines sur la capuche et le plastron. Coupe fluide, manches longues. Se porte en toute occasion — intérieur comme extérieur, du quotidien aux petites cérémonies.",
      basePrice: 590,
      delay: 10,
      isNew: true,
      status: "available",
      category: catMap["Djellabas"],
      allergens: "Soie naturelle · Broderie fine main",
      imageUrl: "/logo.png",
      images: ["/logo.png"],
      flavors: [couleurs.ivoire, couleurs.emeraude, couleurs.bordeaux],
      sizes: tailles,
    },
    {
      name: "Djellaba Noire Brodée",
      shortDesc: "Djellaba sobre en soie noire, broderies argentées discrètes",
      longDesc:
        "Djellaba noire d'une élégance discrète. Soie naturelle, broderies argentées subtiles sur la capuche et les manches. Parfaite pour les cérémonies religieuses, les dîners raffinés ou une arrivée marquante en soirée.",
      basePrice: 690,
      delay: 10,
      isNew: false,
      status: "available",
      category: catMap["Djellabas"],
      allergens: "Soie · Broderie fil d'argent",
      imageUrl: "/caftan2.jpg",
      images: ["/caftan2.jpg"],
      flavors: [couleurs.noir, couleurs.bordeaux],
      sizes: tailles,
    },
    {
      name: "Djellaba Dorée Cérémonie",
      shortDesc: "Djellaba de cérémonie, tissu doré et broderies luxueuses",
      longDesc:
        "Djellaba de grande cérémonie en tissu doré, broderies Aâkad sur le plastron et la capuche. Pour les occasions où l'on veut briller sans tomber dans l'ostentation. Ceinture dorée incluse.",
      basePrice: 890,
      delay: 14,
      isNew: true,
      status: "available",
      category: catMap["Djellabas"],
      allergens: "Tissu lamé or · Broderies main",
      imageUrl: "/caftan3.jpg",
      images: ["/caftan3.jpg"],
      flavors: [couleurs.dore, couleurs.ivoire],
      sizes: tailles,
    },
  ]);

  const products = await Product.find().lean();
  const pMap = Object.fromEntries(products.map((p: any) => [p.name, p]));

  await Order.insertMany([
    {
      client: "Yasmine Alaoui",
      email: "yasmine.alaoui@gmail.com",
      phone: "+212 6 61 34 56 78",
      items: [
        { productId: pMap["Caftan Velours Émeraude"]?._id, name: "Caftan Velours Émeraude", flavor: "Vert émeraude", size: "Taille 38", quantity: 1, price: 1290 },
      ],
      total: 1290,
      mode: "delivery",
      address: "12 rue Tariq Ibn Ziyad, Casablanca, Maroc",
      status: "confirmed",
      paymentStatus: "paid",
      createdAt: new Date("2026-04-23T14:30:00"),
    },
    {
      client: "Sofia Bennani",
      email: "sofia.bennani@outlook.fr",
      phone: "+33 6 45 67 89 12",
      items: [
        { productId: pMap["Takchita Mariée Dorée"]?._id, name: "Takchita Mariée Dorée", flavor: "Doré royal", size: "Sur-mesure", quantity: 1, price: 4140 },
      ],
      total: 4140,
      mode: "delivery",
      address: "8 rue de Rivoli, 75004 Paris, France",
      note: "Mariage prévu le 15 juillet — mensurations à envoyer par WhatsApp",
      status: "pending",
      paymentStatus: "paid",
      createdAt: new Date("2026-04-25T09:15:00"),
    },
    {
      client: "Leila Tahri",
      email: "leila.tahri@proton.me",
      phone: "+212 6 77 12 34 56",
      items: [
        { productId: pMap["Caftan Ivoire Henné"]?._id, name: "Caftan Ivoire Henné", flavor: "Ivoire nacré", size: "Taille 40", quantity: 1, price: 1010 },
        { productId: pMap["Djellaba Fassia Ivoire"]?._id, name: "Djellaba Fassia Ivoire", flavor: "Ivoire nacré", size: "Taille 40", quantity: 1, price: 590 },
      ],
      total: 1600,
      mode: "delivery",
      address: "45 avenue Mohammed V, Rabat, Maroc",
      note: "Cérémonie de henné + mariage — besoin avant le 10 juin",
      status: "ready",
      paymentStatus: "paid",
      createdAt: new Date("2026-04-22T11:40:00"),
    },
    {
      client: "Nadia Chraibi",
      email: "nadia.c@yahoo.fr",
      phone: "+212 6 12 98 76 54",
      items: [
        { productId: pMap["Caftan Bordeaux Traditionnel"]?._id, name: "Caftan Bordeaux Traditionnel", flavor: "Bordeaux royal", size: "Taille 42", quantity: 1, price: 1150 },
      ],
      total: 1150,
      mode: "delivery",
      address: "Marrakech, Maroc",
      status: "delivered",
      paymentStatus: "paid",
      createdAt: new Date("2026-04-18T16:00:00"),
    },
    {
      client: "Amira Kadiri",
      email: "a.kadiri@free.fr",
      phone: "+33 7 12 34 56 78",
      items: [
        { productId: pMap["Djellaba Dorée Cérémonie"]?._id, name: "Djellaba Dorée Cérémonie", flavor: "Doré royal", size: "Taille 38", quantity: 1, price: 940 },
        { productId: pMap["Djellaba Noire Brodée"]?._id, name: "Djellaba Noire Brodée", flavor: "Noir profond", size: "Taille 36", quantity: 1, price: 690 },
      ],
      total: 1630,
      mode: "delivery",
      address: "22 rue Saint-Honoré, 75001 Paris",
      note: "Cadeau Aïd pour maman + belle-mère",
      status: "confirmed",
      paymentStatus: "paid",
      createdAt: new Date("2026-04-24T18:20:00"),
    },
    {
      client: "Salma El Otmani",
      email: "salma.elotmani@gmail.com",
      phone: "+1 514 555 0198",
      items: [
        { productId: pMap["Takchita Deux Pièces Émeraude"]?._id, name: "Takchita Deux Pièces Émeraude", flavor: "Vert émeraude", size: "Taille 40", quantity: 1, price: 1590 },
      ],
      total: 1590,
      mode: "delivery",
      address: "450 Boulevard René-Lévesque, Montréal, Canada",
      status: "pending",
      paymentStatus: "unpaid",
      createdAt: new Date("2026-04-26T13:00:00"),
    },
  ]);

  return NextResponse.json({
    ok: true,
    created: {
      categories: cats.length,
      products: products.length,
      orders: await Order.countDocuments(),
    },
    adminPassword: existingSettings ? "(existait déjà)" : "Admin1234!",
  });
}
