"use client";

import { useState } from "react";
import Image from "next/image";
import NavHeader from "../../NavHeader";
import Breadcrumb from "../../Breadcrumb";

/* ═══════════════════════════════════════════════════════
   TYPES & DATA
   ═══════════════════════════════════════════════════════ */

type NewsCategory = "launch" | "firmware" | "campaign" | "service" | "sustainability";
type NewsItem = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: NewsCategory;
  image?: string;
  featured?: boolean;
  tag?: string;
};

const categoryConfig: Record<NewsCategory, { label: string; bg: string; text: string }> = {
  launch: { label: "Lansering", bg: "bg-[#273A60]", text: "text-white" },
  firmware: { label: "Firmware / SW", bg: "bg-[#e3f2fd]", text: "text-[#1565c0]" },
  campaign: { label: "Kampanj", bg: "bg-[#fff3e0]", text: "text-[#e65100]" },
  service: { label: "Service & SB", bg: "bg-[#fce8e8]", text: "text-[#c62828]" },
  sustainability: { label: "Hållbarhet", bg: "bg-[#e8f5e9]", text: "text-[#2e7d32]" },
};

const news: NewsItem[] = [
  {
    id: "n1",
    title: "CEORA 546 EPOS — officiell lansering Q2 2026",
    excerpt: "Husqvarnas senaste professionella robotklippare för stora ytor lanseras till återförsäljare i april. EPOS-teknologi, nya knivsystem och förbättrad Fleet Services-integration. Förbeställning öppnar 1 april.",
    date: "2026-03-15",
    category: "launch",
    image: "/images/husqvarna.jpg",
    featured: true,
    tag: "Exklusivt",
  },
  {
    id: "n2",
    title: "Automower 435X AWD — ny firmware v3.2 tillgänglig",
    excerpt: "Firmware v3.2 förbättrar navigeringsprecision i sluttningar, minskar energiförbrukningen med 12 % och lägger till stöd för nya virtuella zoner i Automower Connect Pro.",
    date: "2026-03-12",
    category: "firmware",
    tag: "Viktig uppdatering",
  },
  {
    id: "n3",
    title: "Vårkampanj 2026 — förlängd till 15 juni",
    excerpt: "På grund av stark efterfrågan förlängs vårkampanjen med två veckor. Alla nuvarande bonusnivåer och villkor gäller. Ny deadline för sell-out-registrering: 15 juni 2026.",
    date: "2026-03-10",
    category: "campaign",
  },
  {
    id: "n4",
    title: "Servicebulletin SB-2026-014: 572 XP Mark II startproblem",
    excerpt: "Identifierat problem med startmodul i ett begränsat antal 572 XP Mark II tillverkade vecka 48–51 2025. Berörd serienummerserier och åtgärdsinstruktioner bifogas.",
    date: "2026-03-08",
    category: "service",
    tag: "Åtgärd krävs",
  },
  {
    id: "n5",
    title: "Husqvarna Sustainability Report 2025 — publicerad",
    excerpt: "Årlig hållbarhetsrapport med fokus på cirkulära affärsmodeller, Second Life-programmet och elektrifering av produktportföljen. 34 % minskning av koldioxidavtryck sedan 2020.",
    date: "2026-03-05",
    category: "sustainability",
  },
  {
    id: "n6",
    title: "Ny batteriplattform POWER+ 700 — förhandsvisning",
    excerpt: "Nästa generations batteriplattform avslöjad på World of Concrete. 40 % mer kapacitet, bakåtkompatibel med alla 500-serien-verktyg. Tillgänglig Q3 2026.",
    date: "2026-03-01",
    category: "launch",
  },
  {
    id: "n7",
    title: "Fleet Services 4.0 — stöd för tredjepartsenheter",
    excerpt: "Ny version av Fleet Services introducerar öppet API och stöd för tredjepartsenheter. Utökat dashboard med prediktivt underhåll och automatiserade servicelarm.",
    date: "2026-02-25",
    category: "firmware",
  },
  {
    id: "n8",
    title: "Construction Pro-kampanj Q2 — nu öppen för anmälan",
    excerpt: "8 % volymrabatt på K-serien vid köp av 5+ kapmaskiner. Gäller K 770, K 770 VAC och K 1270. Kampanjperiod: 1 april – 30 juni 2026.",
    date: "2026-02-20",
    category: "campaign",
  },
];

type CategoryFilter = "all" | NewsCategory;

/* ═══════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════ */

export default function NyheterPage() {
  const [filter, setFilter] = useState<CategoryFilter>("all");

  const featured = news.find((n) => n.featured);
  const rest = news.filter((n) => !n.featured);

  const filtered = filter === "all" ? rest : rest.filter((n) => n.category === filter);

  return (
    <div className="min-h-screen bg-white">
      <NavHeader />

      <main className="mx-auto max-w-[1320px] px-6 py-6">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: "Husqvarna", href: "/nav-v2/husqvarna" },
            { label: "Nyheter & lanseringar", href: "/nav-v2/husqvarna/nyheter" },
          ]}
        />

        {/* Page header */}
        <div className="mt-5">
          <h1 className="text-[26px] font-bold text-[#111]">Nyheter & lanseringar</h1>
          <p className="mt-1 max-w-xl text-[13px] leading-relaxed text-[#888]">
            Senaste nytt om produkter, firmware, kampanjer och servicebulletiner från Husqvarna.
          </p>
        </div>

        {/* ── Featured article ── */}
        {featured && (
          <a
            href="#"
            className="group mt-8 block overflow-hidden rounded-2xl border border-[#e0e0e0] transition-all hover:shadow-lg"
          >
            <div className="grid lg:grid-cols-[1fr_1fr]">
              {/* Image */}
              <div className="relative h-64 lg:h-auto">
                {featured.image && (
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    sizes="660px"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-white" />
                {featured.tag && (
                  <span className="absolute left-4 top-4 rounded-full bg-[#ff6b00] px-3 py-1 text-[11px] font-bold text-white">
                    {featured.tag}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="flex flex-col justify-center p-8">
                <div className="flex items-center gap-2">
                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${categoryConfig[featured.category].bg} ${categoryConfig[featured.category].text}`}>
                    {categoryConfig[featured.category].label}
                  </span>
                  <span className="text-[12px] text-[#999]">{featured.date}</span>
                </div>
                <h2 className="mt-3 text-[22px] font-bold leading-tight text-[#111] group-hover:text-[#273A60]">
                  {featured.title}
                </h2>
                <p className="mt-3 text-[14px] leading-relaxed text-[#666]">
                  {featured.excerpt}
                </p>
                <span className="mt-5 inline-flex items-center gap-1 text-[13px] font-semibold text-[#273A60] opacity-0 transition-opacity group-hover:opacity-100">
                  Läs mer
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 3l4 4-4 4" />
                  </svg>
                </span>
              </div>
            </div>
          </a>
        )}

        {/* ── Category filter ── */}
        <div className="mt-10 flex flex-wrap items-center gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`rounded-full px-3.5 py-1.5 text-[12px] font-medium transition-all ${
              filter === "all" ? "bg-[#273A60] text-white" : "bg-[#f5f5f5] text-[#666] hover:bg-[#e8e8e8]"
            }`}
          >
            Alla
          </button>
          {(Object.entries(categoryConfig) as [NewsCategory, typeof categoryConfig.launch][]).map(
            ([id, c]) => (
              <button
                key={id}
                onClick={() => setFilter(id)}
                className={`rounded-full px-3.5 py-1.5 text-[12px] font-medium transition-all ${
                  filter === id ? "bg-[#273A60] text-white" : "bg-[#f5f5f5] text-[#666] hover:bg-[#e8e8e8]"
                }`}
              >
                {c.label}
              </button>
            ),
          )}
        </div>

        {/* ── News grid ── */}
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => {
            const cat = categoryConfig[item.category];
            return (
              <a
                key={item.id}
                href="#"
                className="group flex flex-col rounded-xl border border-[#e0e0e0] bg-white transition-all hover:border-[#273A60]/30 hover:shadow-md"
              >
                {/* Card top */}
                <div className="p-5 pb-0">
                  <div className="flex items-center justify-between">
                    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${cat.bg} ${cat.text}`}>
                      {cat.label}
                    </span>
                    <span className="text-[11px] text-[#bbb]">{item.date}</span>
                  </div>

                  {item.tag && (
                    <span className="mt-2 inline-block rounded bg-[#fff3e0] px-2 py-0.5 text-[10px] font-bold text-[#e65100]">
                      {item.tag}
                    </span>
                  )}

                  <h3 className="mt-3 text-[14px] font-bold leading-snug text-[#111] group-hover:text-[#273A60]">
                    {item.title}
                  </h3>
                </div>

                {/* Card body */}
                <div className="flex-1 px-5 pt-2 pb-5">
                  <p className="text-[12px] leading-relaxed text-[#888]">
                    {item.excerpt.length > 160 ? item.excerpt.slice(0, 160) + "…" : item.excerpt}
                  </p>
                </div>

                {/* Card footer */}
                <div className="border-t border-[#f0f0f0] px-5 py-3">
                  <span className="text-[12px] font-semibold text-[#273A60] opacity-0 transition-opacity group-hover:opacity-100">
                    Läs mer →
                  </span>
                </div>
              </a>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="mt-12 text-center text-[13px] text-[#999]">
            Inga nyheter i denna kategori just nu.
          </div>
        )}
      </main>
    </div>
  );
}
