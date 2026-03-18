"use client";

import { useState } from "react";
import NavHeader from "../../NavHeader";
import Breadcrumb from "../../Breadcrumb";

/* ═══════════════════════════════════════════════════════
   TYPES & DATA
   ═══════════════════════════════════════════════════════ */

type ReportCategory = "sales" | "products" | "finance" | "service" | "campaigns";
type ReportFormat = "PDF" | "Excel" | "CSV";
type ReportFrequency = "once" | "weekly" | "monthly";

type Report = {
  id: string;
  title: string;
  description: string;
  category: ReportCategory;
  formats: ReportFormat[];
  popular?: boolean;
  lastGenerated?: string;
  scheduled?: ReportFrequency;
};

type RecentExport = {
  id: string;
  reportTitle: string;
  date: string;
  format: ReportFormat;
  size: string;
  status: "ready" | "generating" | "failed";
};

const categories: { id: ReportCategory; label: string; icon: string; color: string; bg: string }[] = [
  { id: "sales", label: "Försäljning", icon: "M3 17l4-8 4 4 6-10", color: "text-[#2e7d32]", bg: "bg-[#e8f5e9]" },
  { id: "products", label: "Produkter", icon: "M3 3h6v6H3zM11 3h6v6h-6zM3 11h6v6H3zM14 11a3 3 0 110 6 3 3 0 010-6z", color: "text-[#1565c0]", bg: "bg-[#e3f2fd]" },
  { id: "finance", label: "Ekonomi", icon: "M2 5h16v11H2zM2 9h16", color: "text-[#e65100]", bg: "bg-[#fff3e0]" },
  { id: "service", label: "Service & garanti", icon: "M10 10a7 7 0 100-14 7 7 0 000 14zM7 10l2.5 2.5L13 7", color: "text-[#6a1b9a]", bg: "bg-[#f3e5f5]" },
  { id: "campaigns", label: "Kampanjer", icon: "M5 9l3-6h4l3 6M3 9h14v3H3zM6 12v4M14 12v4", color: "text-[#c62828]", bg: "bg-[#fce8e8]" },
];

const reports: Report[] = [
  // Försäljning
  { id: "r1", title: "Försäljningsöversikt", description: "Total försäljning per månad, kategori och kund. Jämförelse med föregående period.", category: "sales", formats: ["PDF", "Excel"], popular: true, lastGenerated: "2026-03-14", scheduled: "monthly" },
  { id: "r2", title: "Sell-out per produkt", description: "Registrerade sell-outs per produktkategori och modell under vald period.", category: "sales", formats: ["Excel", "CSV"], lastGenerated: "2026-03-10" },
  { id: "r3", title: "Topplista produkter", description: "De 50 mest sålda produkterna sorterade efter volym eller intäkt.", category: "sales", formats: ["PDF", "Excel"] },
  { id: "r4", title: "Kundanalys", description: "Försäljning och aktivitet per kund med trender och jämförelser.", category: "sales", formats: ["PDF", "Excel"], popular: true },

  // Produkter
  { id: "r5", title: "Lagerstatus & restorder", description: "Aktuell lagersituation, produkter med lågt lager och aktiva restorder.", category: "products", formats: ["Excel", "CSV"], popular: true, lastGenerated: "2026-03-15", scheduled: "weekly" },
  { id: "r6", title: "Produktregistreringar", description: "Alla registrerade produkter med kund, datum och garantistatus.", category: "products", formats: ["Excel", "CSV"] },
  { id: "r7", title: "Utgångna produkter", description: "Produkter med utgått status och förslag på ersättningsmodeller.", category: "products", formats: ["PDF"] },

  // Ekonomi
  { id: "r8", title: "Faktureringssammanställning", description: "Alla fakturor, kreditnotor och saldon för vald period. Inklusive förfallostatus.", category: "finance", formats: ["PDF", "Excel"], popular: true, lastGenerated: "2026-03-01", scheduled: "monthly" },
  { id: "r9", title: "Betalningshistorik", description: "Kompletta kontotransaktioner med betalningar, debiteringar och bonus.", category: "finance", formats: ["Excel", "CSV"] },
  { id: "r10", title: "Kreditlimit-rapport", description: "Kreditanvändning, historik och prognoser baserat på orderpipeline.", category: "finance", formats: ["PDF"] },

  // Service & garanti
  { id: "r11", title: "Garantistatus", description: "Alla aktiva garantier, kommande utgångar och garantianspråk.", category: "service", formats: ["Excel", "CSV"], lastGenerated: "2026-02-28" },
  { id: "r12", title: "Serviceärenden (HyperCare)", description: "Aktiva, eskalerade och avslutade ärenden med tidsstatistik.", category: "service", formats: ["PDF", "Excel"] },
  { id: "r13", title: "RMA & returer", description: "Alla returer med orsaker, status och kreditbelopp.", category: "service", formats: ["Excel", "CSV"] },

  // Kampanjer
  { id: "r14", title: "Kampanjprogress", description: "Din aktuella progress i pågående kampanjer med projektion till kampanjslut.", category: "campaigns", formats: ["PDF"], popular: true, lastGenerated: "2026-03-12" },
  { id: "r15", title: "Bonushistorik", description: "Alla utbetalda kampanjbonusar med belopp, nivå och kreditnotor.", category: "campaigns", formats: ["Excel", "CSV"] },
];

const recentExports: RecentExport[] = [
  { id: "e1", reportTitle: "Försäljningsöversikt", date: "2026-03-14", format: "PDF", size: "2.4 MB", status: "ready" },
  { id: "e2", reportTitle: "Lagerstatus & restorder", date: "2026-03-15", format: "Excel", size: "890 KB", status: "ready" },
  { id: "e3", reportTitle: "Faktureringssammanställning", date: "2026-03-01", format: "PDF", size: "1.1 MB", status: "ready" },
  { id: "e4", reportTitle: "Kampanjprogress", date: "2026-03-12", format: "PDF", size: "540 KB", status: "ready" },
  { id: "e5", reportTitle: "Sell-out per produkt", date: "2026-03-10", format: "Excel", size: "1.8 MB", status: "generating" },
];

const scheduledReports = reports.filter((r) => r.scheduled);

const formatBadge: Record<ReportFormat, { bg: string; text: string }> = {
  PDF: { bg: "bg-[#fce8e8]", text: "text-[#c62828]" },
  Excel: { bg: "bg-[#e8f5e9]", text: "text-[#2e7d32]" },
  CSV: { bg: "bg-[#f5f5f5]", text: "text-[#666]" },
};

const freqLabel: Record<ReportFrequency, string> = {
  once: "Engångs",
  weekly: "Veckovis",
  monthly: "Månadsvis",
};

const statusExport: Record<string, { label: string; bg: string; text: string }> = {
  ready: { label: "Klar", bg: "bg-[#e8f5e9]", text: "text-[#2e7d32]" },
  generating: { label: "Genererar…", bg: "bg-[#fff3e0]", text: "text-[#e65100]" },
  failed: { label: "Misslyckad", bg: "bg-[#fce8e8]", text: "text-[#c62828]" },
};

/* ═══════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════ */

export default function RapporterPage() {
  const [activeCategory, setActiveCategory] = useState<ReportCategory | "all">("all");
  const [search, setSearch] = useState("");

  const filtered = reports.filter((r) => {
    if (activeCategory !== "all" && r.category !== activeCategory) return false;
    if (search) {
      const s = search.toLowerCase();
      return r.title.toLowerCase().includes(s) || r.description.toLowerCase().includes(s);
    }
    return true;
  });

  const popularReports = reports.filter((r) => r.popular);

  return (
    <div className="min-h-screen bg-white">
      <NavHeader />

      <main className="mx-auto max-w-[1320px] px-6 py-6">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: "Min verksamhet", href: "/nav-v2/min-verksamhet" },
            { label: "Rapporter", href: "/nav-v2/min-verksamhet/rapporter" },
          ]}
        />

        {/* Page header */}
        <div className="mt-5 flex items-end justify-between">
          <div>
            <h1 className="text-[26px] font-bold text-[#111]">Rapporter</h1>
            <p className="mt-1 max-w-xl text-[13px] leading-relaxed text-[#888]">
              Generera, schemalägg och ladda ner rapporter. Alla rapporter baseras på din verksamhetsdata.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[12px] text-[#999]">{scheduledReports.length} schemalagda</span>
            <button className="rounded-lg bg-[#273A60] px-5 py-2.5 text-[12px] font-semibold text-white transition-colors hover:bg-[#1a2d4d]">
              + Schemalägg rapport
            </button>
          </div>
        </div>

        {/* ── Popular reports ── */}
        <section className="mt-8">
          <h2 className="text-[14px] font-bold text-[#111]">Populära rapporter</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {popularReports.map((r) => {
              const cat = categories.find((c) => c.id === r.category)!;
              return (
                <button
                  key={r.id}
                  className="group flex flex-col rounded-xl border border-[#e0e0e0] bg-white p-5 text-left transition-all hover:border-[#273A60]/30 hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${cat.bg} ${cat.color} transition-colors group-hover:bg-[#273A60] group-hover:text-white`}>
                      <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <path d={cat.icon} />
                      </svg>
                    </span>
                    <div className="flex gap-1">
                      {r.formats.slice(0, 2).map((f) => (
                        <span key={f} className={`rounded px-1.5 py-0.5 text-[9px] font-bold ${formatBadge[f].bg} ${formatBadge[f].text}`}>
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                  <h3 className="mt-3 text-[13px] font-semibold text-[#111]">{r.title}</h3>
                  <p className="mt-1 text-[11px] leading-relaxed text-[#888]">{r.description}</p>
                  {r.scheduled && (
                    <span className="mt-auto inline-flex items-center gap-1 pt-3 text-[10px] font-medium text-[#273A60]">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                        <circle cx="6" cy="6" r="4.5" />
                        <path d="M6 3.5v2.5l1.5 1" />
                      </svg>
                      {freqLabel[r.scheduled]}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* ── Recent exports ── */}
        <section className="mt-10">
          <h2 className="text-[14px] font-bold text-[#111]">Senaste exporter</h2>
          <p className="mt-1 text-[12px] text-[#999]">Ladda ner eller generera om tidigare rapporter</p>
          <div className="mt-3 space-y-2">
            {recentExports.map((exp) => {
              const st = statusExport[exp.status];
              const fb = formatBadge[exp.format];
              return (
                <div
                  key={exp.id}
                  className="flex items-center justify-between rounded-xl border border-[#e5e5e5] px-5 py-3.5 transition-colors hover:bg-[#fafafa]"
                >
                  <div className="flex items-center gap-4">
                    <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${fb.bg}`}>
                      <span className={`text-[11px] font-bold ${fb.text}`}>{exp.format}</span>
                    </span>
                    <div>
                      <span className="text-[13px] font-semibold text-[#222]">{exp.reportTitle}</span>
                      <span className="mt-0.5 flex items-center gap-2 text-[11px] text-[#aaa]">
                        {exp.date} · {exp.size}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${st.bg} ${st.text}`}>
                      {st.label}
                    </span>
                    {exp.status === "ready" && (
                      <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#e0e0e0] text-[#999] transition-colors hover:border-[#273A60]/30 hover:text-[#273A60]" title="Ladda ner">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M8 2v8M5 7l3 3 3-3" />
                          <path d="M2 12h12" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── All reports catalog ── */}
        <section className="mt-10">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-[14px] font-bold text-[#111]">Rapportkatalog</h2>
              <p className="mt-1 text-[12px] text-[#999]">Alla tillgängliga rapporter efter kategori</p>
            </div>
          </div>

          {/* Category filter + search */}
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <div className="flex gap-1.5">
              <button
                onClick={() => setActiveCategory("all")}
                className={`rounded-full px-3 py-1.5 text-[12px] font-medium transition-all ${
                  activeCategory === "all" ? "bg-[#273A60] text-white" : "bg-[#f5f5f5] text-[#666] hover:bg-[#e8e8e8]"
                }`}
              >
                Alla
              </button>
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveCategory(c.id)}
                  className={`rounded-full px-3 py-1.5 text-[12px] font-medium transition-all ${
                    activeCategory === c.id ? "bg-[#273A60] text-white" : "bg-[#f5f5f5] text-[#666] hover:bg-[#e8e8e8]"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
            <div className="relative ml-auto">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#bbb]" width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <circle cx="7" cy="7" r="4.5" />
                <path d="M10.5 10.5L14 14" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Sök rapport…"
                className="h-10 w-56 rounded-lg border border-[#d0d0d0] bg-white pl-9 pr-3 text-[13px] text-[#333] placeholder-[#aaa] transition-colors focus:border-[#273A60] focus:outline-none"
              />
            </div>
          </div>

          {/* Report grid */}
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((r) => {
              const cat = categories.find((c) => c.id === r.category)!;
              return (
                <div
                  key={r.id}
                  className="group flex flex-col rounded-xl border border-[#e0e0e0] bg-white p-5 transition-all hover:border-[#273A60]/30 hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${cat.bg} ${cat.color}`}>
                      {cat.label}
                    </span>
                    <div className="flex gap-1">
                      {r.formats.map((f) => (
                        <span key={f} className={`rounded px-1.5 py-0.5 text-[9px] font-bold ${formatBadge[f].bg} ${formatBadge[f].text}`}>
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                  <h3 className="mt-3 text-[14px] font-semibold text-[#111]">{r.title}</h3>
                  <p className="mt-1 text-[12px] leading-relaxed text-[#888]">{r.description}</p>

                  <div className="mt-auto flex items-center justify-between pt-4">
                    <div className="flex items-center gap-3">
                      {r.lastGenerated && (
                        <span className="text-[11px] text-[#bbb]">Senast: {r.lastGenerated}</span>
                      )}
                      {r.scheduled && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#f0f3f8] px-2 py-0.5 text-[10px] font-medium text-[#273A60]">
                          <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                            <circle cx="6" cy="6" r="4.5" />
                            <path d="M6 3.5v2.5l1.5 1" />
                          </svg>
                          {freqLabel[r.scheduled]}
                        </span>
                      )}
                    </div>
                    <button className="rounded-lg border border-[#d0d0d0] px-3 py-1.5 text-[11px] font-semibold text-[#555] opacity-0 transition-all group-hover:opacity-100 hover:border-[#273A60]/30 hover:text-[#273A60]">
                      Generera
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="mt-8 text-center text-[13px] text-[#999]">
              Inga rapporter matchar dina filter.
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
