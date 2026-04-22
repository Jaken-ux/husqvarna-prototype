"use client";

import { useState } from "react";
import Link from "next/link";
import NavHeader from "../../NavHeader";
import Breadcrumb from "../../Breadcrumb";

/* ═══════════════════════════════════════════════════════
   TYPES & DATA
   ═══════════════════════════════════════════════════════ */

type Category = "all" | "prislistor" | "marknadsmaterial" | "utbildning" | "saljverktyg" | "varumarke";

type Resource = {
  title: string;
  desc: string;
  category: Category;
  format?: string;
  date?: string;
  featured?: boolean;
  tag?: string;
};

const categories: { id: Category; label: string; icon: string }[] = [
  { id: "all", label: "Alla", icon: "" },
  { id: "prislistor", label: "Prislistor & villkor", icon: "M5 2h10a2 2 0 012 2v14l-3-2-3 2-3-2-3 2V4a2 2 0 012-2zM8 7h4M8 10h4M8 13h2" },
  { id: "marknadsmaterial", label: "Marknadsföring", icon: "M4 15s1-1 4-1 4 1 7 1 7-1V3s-3 1-7 1-7-1-7 1zM4 15v4M20 15v4" },
  { id: "utbildning", label: "Utbildning", icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" },
  { id: "saljverktyg", label: "Säljverktyg", icon: "M12 20V10M6 20V4M18 20v-6" },
  { id: "varumarke", label: "Varumärke", icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" },
];

const resources: Resource[] = [
  // Prislistor & villkor
  {
    title: "Återförsäljarprislistor 2026",
    desc: "Aktuella prislistor för samtliga produktkategorier. Uppdateras kvartalsvis.",
    category: "prislistor",
    format: "PDF",
    date: "2026-01-15",
    featured: true,
  },
  {
    title: "Husqvarna Trade Terms 2026",
    desc: "Handelsvillkor, leveransvillkor och betalningsvillkor för återförsäljare.",
    category: "prislistor",
    format: "PDF",
    date: "2026-01-27",
  },
  {
    title: "Leasingvillkor & kalkylatorer",
    desc: "Lease Plus-villkor och verktyg för att räkna på leasingalternativ.",
    category: "prislistor",
    format: "Verktyg",
  },
  {
    title: "Kampanjvillkor & bonusprogram",
    desc: "Aktuella kampanjvillkor, bonusnivåer och kvalificeringskriterier.",
    category: "prislistor",
    format: "PDF",
    date: "2026-03-01",
    tag: "Uppdaterad",
  },

  // Marknadsföringsmaterial
  {
    title: "Digital skyltning för Husqvarna-butiker",
    desc: "Digitala skyltmallar, skärmformat och riktlinjer för butiksdisplayer.",
    category: "marknadsmaterial",
    format: "Paket",
    featured: true,
  },
  {
    title: "Kampanjmaterial — Vårkampanj 2026",
    desc: "Banners, sociala medier-kit, butiksmaterial och e-postmallar för vårkampanjen.",
    category: "marknadsmaterial",
    format: "Paket",
    date: "2026-02-15",
    tag: "Nytt",
  },
  {
    title: "Produktfotografi & bildbank",
    desc: "Högupplösta produktbilder, lifestyle-foton och video för marknadsföring.",
    category: "marknadsmaterial",
    format: "Bildbank",
  },
  {
    title: "Planera en Husqvarna 2.0-butik",
    desc: "Guider och koncept för butiksdesign, kundflöde och produktexponering.",
    category: "marknadsmaterial",
    format: "Guide",
  },
  {
    title: "Marketing Management Portal",
    desc: "Verktyg för att skapa och hantera lokalt anpassat kampanjmaterial.",
    category: "marknadsmaterial",
    format: "Verktyg",
  },

  // Utbildning
  {
    title: "Husqvarna University — E-learning",
    desc: "Online-certifieringar inom produktkunskap, service och försäljningstekniker.",
    category: "utbildning",
    format: "E-learning",
    featured: true,
  },
  {
    title: "Säljutbildning: Automower-serien",
    desc: "Produktkunskap, säljargument och vanliga invändningar för Automower-sortimentet.",
    category: "utbildning",
    format: "Kurs",
    tag: "Populär",
  },
  {
    title: "Teknisk certifiering: CEORA & Fleet",
    desc: "Teknisk utbildning för installation och service av CEORA-plattformen.",
    category: "utbildning",
    format: "Certifiering",
  },
  {
    title: "Boka utbildningstillfälle",
    desc: "Fysiska och digitala utbildningar med Husqvarna-instruktörer.",
    category: "utbildning",
    format: "Bokning",
  },
  {
    title: "Säljutbildning: Battery Series",
    desc: "POWER+ batteriplattform — teknik, fördelar och kundpresentation.",
    category: "utbildning",
    format: "Kurs",
  },

  // Säljverktyg
  {
    title: "Professional Lead Hub",
    desc: "Verktyg för att hantera leads, uppföljning och konvertering av prospekt.",
    category: "saljverktyg",
    format: "Verktyg",
    featured: true,
  },
  {
    title: "Beställningsinformation",
    desc: "Guider för beställningsprocessen, leveranstider och minimumorder.",
    category: "saljverktyg",
    format: "Guide",
  },
  {
    title: "Samarbete med Work System",
    desc: "Integration och arbetsflöden med Husqvarnas Work System-plattform.",
    category: "saljverktyg",
    format: "Guide",
  },
  {
    title: "ROI-kalkylator för kunder",
    desc: "Hjälp kunder beräkna besparingar vid byte till robotklippare eller batteriverktyg.",
    category: "saljverktyg",
    format: "Verktyg",
    tag: "Nytt",
  },

  // Varumärke
  {
    title: "Logotyp och typsnitt",
    desc: "Husqvarnas visuella identitet — logotypvarianter, typsnitt och användningsregler.",
    category: "varumarke",
    format: "Riktlinjer",
  },
  {
    title: "Policy för produkter på marknadsplatser",
    desc: "Regler för hur Husqvarna-produkter får presenteras på externa marknadsplatser.",
    category: "varumarke",
    format: "Policy",
    date: "2026-02-17",
  },
  {
    title: "Fördelarna med Husqvarna 2.0",
    desc: "Konceptpresentation av Husqvarna 2.0 butiksformat — pitch-material.",
    category: "varumarke",
    format: "Presentation",
  },
];

const formatColors: Record<string, { bg: string; text: string }> = {
  PDF: { bg: "bg-[#fce8e8]", text: "text-[#c44]" },
  Verktyg: { bg: "bg-[#e3f2fd]", text: "text-[#1565c0]" },
  Paket: { bg: "bg-[#f3e5f5]", text: "text-[#7b1fa2]" },
  Bildbank: { bg: "bg-[#fff3e0]", text: "text-[#e65100]" },
  Guide: { bg: "bg-[#e8f5e9]", text: "text-[#2e7d32]" },
  "E-learning": { bg: "bg-[#e3f2fd]", text: "text-[#1565c0]" },
  Kurs: { bg: "bg-[#fff8e1]", text: "text-[#b8860b]" },
  Certifiering: { bg: "bg-[#e8eaf6]", text: "text-[#273A60]" },
  Bokning: { bg: "bg-[#e0f2f1]", text: "text-[#00695c]" },
  Riktlinjer: { bg: "bg-[#f5f5f5]", text: "text-[#555]" },
  Policy: { bg: "bg-[#fce8e8]", text: "text-[#c44]" },
  Presentation: { bg: "bg-[#fff3e0]", text: "text-[#e65100]" },
};

/* ═══════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════ */

export default function ForsaljningPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [search, setSearch] = useState("");

  const filtered = resources.filter((r) => {
    if (activeCategory !== "all" && r.category !== activeCategory) return false;
    if (search) {
      const q = search.toLowerCase();
      return r.title.toLowerCase().includes(q) || r.desc.toLowerCase().includes(q);
    }
    return true;
  });

  const featured = resources.filter((r) => r.featured);

  return (
    <div className="min-h-screen bg-white">
      <NavHeader />

      <main className="mx-auto max-w-[1280px] px-4 sm:px-6 py-6 sm:py-8">
        <Breadcrumb items={[
          { label: "Husqvarna", href: "/nav-v2/husqvarna" },
          { label: "Försäljning & Resurser", href: "/nav-v2/husqvarna/forsaljning" },
        ]} />

        <div className="mt-5">
          <h1 className="text-[22px] sm:text-[26px] font-bold text-[#111]">Försäljning & Resurser</h1>
          <p className="mt-1 text-[13px] text-[#888]">
            Prislistor, marknadsföringsmaterial, utbildning, säljverktyg och varumärkesriktlinjer
          </p>
        </div>

        {/* Featured resources */}
        <section className="mt-8">
          <h2 className="text-[15px] font-bold text-[#111]">Rekommenderat</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((r) => {
              const fmt = formatColors[r.format ?? ""] ?? { bg: "bg-[#f5f5f5]", text: "text-[#888]" };
              return (
                <a
                  key={r.title}
                  href="#"
                  className="group rounded-xl border border-[#d0d0d0] bg-white p-5 transition-all hover:border-[#273A60]/30 hover:shadow-md"
                >
                  <div className="flex items-center gap-2">
                    {r.format && (
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${fmt.bg} ${fmt.text}`}>{r.format}</span>
                    )}
                    {r.tag && (
                      <span className="rounded-full bg-[#ff6b00] px-2 py-0.5 text-[10px] font-bold text-white">{r.tag}</span>
                    )}
                  </div>
                  <h3 className="mt-2.5 text-[14px] font-semibold text-[#111] group-hover:text-[#273A60]">{r.title}</h3>
                  <p className="mt-1 text-[12px] leading-relaxed text-[#888]">{r.desc}</p>
                </a>
              );
            })}
          </div>
        </section>

        {/* Filter + Search */}
        <section className="mt-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-[15px] font-bold text-[#111]">Alla resurser</h2>
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#bbb]" width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <circle cx="7" cy="7" r="4.5" />
                <path d="M10.5 10.5L14 14" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Sök resurser..."
                className="h-9 w-full sm:w-64 rounded-lg border border-[#d0d0d0] bg-[#fafafa] pl-9 pr-3 text-[12px] text-[#333] placeholder-[#aaa] focus:border-[#273A60] focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          {/* Category tabs */}
          <div className="mt-4 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[12px] font-semibold transition-all ${
                  activeCategory === cat.id
                    ? "bg-[#273A60] text-white"
                    : "bg-white text-[#555] border border-[#d0d0d0] hover:bg-[#f5f5f5]"
                }`}
              >
                {cat.icon && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d={cat.icon} />
                  </svg>
                )}
                {cat.label}
              </button>
            ))}
          </div>

          {/* Results count */}
          <p className="mt-3 text-[12px] text-[#999]">{filtered.length} resurser</p>

          {/* Resource list */}
          <div className="mt-3 rounded-xl border border-[#d0d0d0] bg-white">
            <div className="divide-y divide-[#f0f0f0]">
              {filtered.map((r) => {
                const fmt = formatColors[r.format ?? ""] ?? { bg: "bg-[#f5f5f5]", text: "text-[#888]" };
                return (
                  <a
                    key={r.title}
                    href="#"
                    className="flex items-start gap-4 px-5 py-4 transition-colors hover:bg-[#fafafa]"
                  >
                    {/* Icon */}
                    <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f0f3f8]">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#273A60" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <path d={categories.find((c) => c.id === r.category)?.icon ?? "M12 2v20M2 12h20"} />
                      </svg>
                    </div>

                    {/* Content */}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[14px] font-semibold text-[#111]">{r.title}</span>
                        {r.format && (
                          <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${fmt.bg} ${fmt.text}`}>{r.format}</span>
                        )}
                        {r.tag && (
                          <span className="shrink-0 rounded-full bg-[#ff6b00] px-2 py-0.5 text-[10px] font-bold text-white">{r.tag}</span>
                        )}
                      </div>
                      <p className="mt-0.5 text-[12px] text-[#888]">{r.desc}</p>
                      {r.date && <p className="mt-1 text-[11px] text-[#bbb]">{r.date}</p>}
                    </div>

                    {/* Arrow */}
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#ccc" strokeWidth="1.8" strokeLinecap="round" className="mt-3 shrink-0">
                      <path d="M6 4l4 4-4 4" />
                    </svg>
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
