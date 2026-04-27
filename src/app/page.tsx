import { MessageCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Cart from "@/components/Cart";
import HomeClient from "@/components/HomeClient";
import { connectDb } from "@/lib/mongoose";
import { Product, Category, Settings } from "@/lib/models";
import { siteConfig } from "@/site.config";

export const dynamic = "force-dynamic";

async function loadData() {
  await connectDb();
  const [products, categories, settingsDoc] = await Promise.all([
    Product.find().populate("category").sort({ createdAt: -1 }).lean(),
    Category.find({ active: true }).sort("name").lean(),
    Settings.findOne().lean(),
  ]);
  const settings: any = settingsDoc || {};
  return {
    products: JSON.parse(JSON.stringify(products)),
    categories: JSON.parse(JSON.stringify(categories)),
    settings: JSON.parse(JSON.stringify(settings)),
  };
}

export default async function HomePage() {
  const { products, categories, settings } = await loadData();
  const newItems = products.filter((p: any) => p.isNew && p.status !== "unavailable").slice(0, 5);
  const displayedNew = newItems.length > 0 ? newItems : products.slice(0, 5);
  const newIds = new Set(displayedNew.map((p: any) => p._id));
  const previewProducts = products
    .filter((p: any) => p.status !== "unavailable" && !newIds.has(p._id))
    .slice(0, 8);
  const brandName = settings.brandName || siteConfig.brand.name;
  const heroImage = settings.heroImageUrl || siteConfig.hero.defaultImageUrl;
  const heroTitle = settings.heroTitle || siteConfig.hero.defaultTitle;
  const heroSubtitle = settings.heroSubtitle || siteConfig.hero.defaultSubtitle;

  return (
    <>
      <Navbar brandName={brandName} />
      <Cart />
      <HomeClient
        categories={categories}
        displayedNew={displayedNew}
        previewProducts={previewProducts}
        heroImage={heroImage}
        heroTitle={heroTitle}
        heroSubtitle={heroSubtitle}
      />
      <Footer brandName={brandName} />

      {siteConfig.features.whatsappButton && (
        <a
          href={settings.phone ? `https://wa.me/${settings.phone.replace(/\D/g, "")}` : "#"}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contact WhatsApp"
          className="fixed bottom-6 right-6 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-[var(--background)] shadow-lg transition-transform hover:scale-110"
        >
          <MessageCircle className="h-6 w-6" />
        </a>
      )}
    </>
  );
}
