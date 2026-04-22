"use client";

import { useState } from "react";
import Breadcrumb from "../../Breadcrumb";

/* ═══════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════ */

type AgreementStatus = "active" | "expiring" | "expired" | "draft";
type CustomerType = "kommun" | "brf" | "foretag" | "forening";

type PriceAgreement = {
  id: string;
  customer: string;
  customerType: CustomerType;
  scope: string;
  discount: string;
  start: string;
  end: string;
  status: AgreementStatus;
};

const agreements: PriceAgreement[] = [
  { id: "PA-2024-034", customer: "Stockholms Stad Parkförvaltning", customerType: "kommun", scope: "Automower Professional + robotklippare", discount: "-18%", start: "2024-01-15", end: "2026-12-31", status: "active" },
  { id: "PA-2024-041", customer: "BRF Solsidan", customerType: "brf", scope: "Robotklippare + tillbehör", discount: "-12%", start: "2024-03-01", end: "2025-05-31", status: "expiring" },
  { id: "PA-2024-052", customer: "Skogsservice Norr AB", customerType: "foretag", scope: "Motorsågar + skyddsutrustning", discount: "-22%", start: "2024-04-10", end: "2026-04-09", status: "active" },
  { id: "PA-2025-007", customer: "Landskapet Trädgård AB", customerType: "foretag", scope: "Hela sortimentet", discount: "-15%", start: "2025-01-01", end: "2026-12-31", status: "active" },
  { id: "PA-2024-019", customer: "Nacka Kommun", customerType: "kommun", scope: "Park & markvård", discount: "-20%", start: "2024-06-01", end: "2025-05-30", status: "expired" },
  { id: "PA-2025-012", customer: "Golfklubben Ullna", customerType: "forening", scope: "CEORA + greenkeeper-tillbehör", discount: "-16%", start: "2025-02-15", end: "2027-02-14", status: "active" },
  { id: "PA-2024-061", customer: "AB Grönytor", customerType: "foretag", scope: "Robotklippare (installerat värde 400k+)", discount: "-14%", start: "2024-07-20", end: "2026-07-19", status: "active" },
  { id: "PA-2025-003", customer: "Huddinge Kommun", customerType: "kommun", scope: "Forest & Garden komplett", discount: "-19%", start: "2025-01-10", end: "2025-05-10", status: "expiring" },
  { id: "PA-2025-018", customer: "Lindström Fastigheter", customerType: "foretag", scope: "Gräsklippare + trimmers", discount: "-10%", start: "2025-03-01", end: "2026-02-28", status: "active" },
  { id: "PA-2026-002", customer: "Eriksson Trädgård AB", customerType: "foretag", scope: "Motorsågar", discount: "-13%", start: "—", end: "—", status: "draft" },
  { id: "PA-2024-077", customer: "BRF Lindhagen", customerType: "brf", scope: "Robotklippare", discount: "-11%", start: "2024-09-01", end: "2025-08-31", status: "active" },
  { id: "PA-2023-115", customer: "Karlsson Park & Trädgård", customerType: "foretag", scope: "Hela sortimentet", discount: "-16%", start: "2023-11-01", end: "2025-10-31", status: "active" },
];

const statusConfig: Record<AgreementStatus, { label: string; bg: string; text: string }> = {
  active: { label: "Aktivt", bg: "bg-[#e8f5e9]", text: "text-[#2e7d32]" },
  expiring: { label: "Utgående snart", bg: "bg-[#fff3e0]", text: "text-[#e65100]" },
  expired: { label: "Utgånget", bg: "bg-[#f5f5f5]", text: "text-[#888]" },
  draft: { label: "Utkast", bg: "bg-[#f5f5f5]", text: "text-[#aaa]" },
};

const typeConfig: Record<CustomerType, { label: string; bg: string; text: string }> = {
  kommun: { label: "Kommun", bg: "bg-[#e3f2fd]", text: "text-[#1565c0]" },
  brf: { label: "BRF", bg: "bg-[#f3e5f5]", text: "text-[#7b1fa2]" },
  foretag: { label: "Företag", bg: "bg-[#e8f5e9]", text: "text-[#2e7d32]" },
  forening: { label: "Förening", bg: "bg-[#fff8e1]", text: "text-[#b8860b]" },
};

const expiringAgreements = agreements.filter((a) => a.status === "expiring");

const recentActivity = [
  { text: "Prisavtal PA-2025-003 (Huddinge Kommun) skickat till kund för signering", time: "Igår 14:20" },
  { text: "Nytt prisavtal skapat: PA-2026-002 (Eriksson Trädgård AB)", time: "Igår 11:05" },
  { text: "Prisavtal PA-2024-019 (Nacka Kommun) har löpt ut", time: "2 dagar sedan" },
  { text: "Rabatt uppdaterad på PA-2024-034 (Stockholms Stad) från -16% till -18%", time: "5 dagar sedan" },
];

type StatusFilter = "all" | AgreementStatus;
type TypeFilter = "all" | CustomerType;

/* ═══════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════ */

export default function PrisavtalPage() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [search, setSearch] = useState("");

  const filtered = agreements.filter((a) => {
    if (statusFilter !== "all" && a.status !== statusFilter) return false;
    if (typeFilter !== "all" && a.customerType !== typeFilter) return false;
    if (search) {
      const s = search.toLowerCase();
      return a.id.toLowerCase().includes(s) || a.customer.toLowerCase().includes(s) || a.scope.toLowerCase().includes(s);
    }
    return true;
  });

  const activeCount = agreements.filter((a) => a.status === "active").length;
  const expiringCount = agreements.filter((a) => a.status === "expiring").length;
  const uniqueCustomers = new Set(agreements.filter((a) => a.status !== "expired" && a.status !== "draft").map((a) => a.customer)).size;

  return (
    <div className="min-h-screen bg-white">
      {/* NavHeader rendered by layout */}
      <main className="py-6">
        <Breadcrumb items={[
          { label: "Min verksamhet", href: "/nav-v2/min-verksamhet/workspace" },
          { label: "Prisavtal", href: "/nav-v2/min-verksamhet/kundpriser" },
        ]} />

        <div className="mt-5 flex items-end justify-between">
          <div>
            <h1 className="text-[22px] font-bold text-[#111]">Prisavtal</h1>
            <p className="mt-1 text-[13px] text-[#888]">Förhandlade priser och rabatter per kund</p>
          </div>
          <span className="text-[12px] text-[#bbb]">Senast uppdaterad: idag 09:15</span>
        </div>

        {/* KPI cards */}
        <div className="mt-6 grid grid-cols-4 gap-3">
          <div className="rounded-xl border border-[#e5e5e5] bg-white p-4">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#999]">Aktiva avtal</p>
            <p className="mt-1 text-[24px] font-extrabold text-[#111]">{activeCount}</p>
            {expiringCount > 0 && <p className="mt-0.5 text-[11px] font-medium text-[#e65100]">{expiringCount} löper ut inom 90 dagar</p>}
          </div>
          <div className="rounded-xl border border-[#e5e5e5] bg-white p-4">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#999]">Kunder med avtal</p>
            <p className="mt-1 text-[24px] font-extrabold text-[#111]">{uniqueCustomers}</p>
            <p className="mt-0.5 text-[11px] text-[#bbb]">av 142 totalt</p>
          </div>
          <div className="rounded-xl border border-[#e5e5e5] bg-white p-4">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#999]">Genomsnittlig rabatt</p>
            <p className="mt-1 text-[24px] font-extrabold text-[#111]">14%</p>
            <p className="mt-0.5 text-[11px] text-[#bbb]">Forest & Garden-sortiment</p>
          </div>
          <div className="rounded-xl border border-[#e5e5e5] bg-white p-4">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#999]">Avtalat värde i år</p>
            <p className="mt-1 text-[24px] font-extrabold text-[#111]">SEK 2,4 M</p>
            <p className="mt-0.5 text-[11px] font-medium text-[#2e7d32]">↑ 18% mot förra året</p>
          </div>
        </div>

        {/* Actions + filters */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#bbb]" width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="7" cy="7" r="4.5" /><path d="M10.5 10.5L14 14" /></svg>
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Sök avtal, kund..." className="h-9 w-52 rounded-lg border border-[#d0d0d0] bg-[#fafafa] pl-9 pr-3 text-[12px] text-[#333] placeholder-[#aaa] focus:border-[#273A60] focus:bg-white focus:outline-none" />
            </div>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as StatusFilter)} className="h-9 rounded-lg border border-[#d0d0d0] bg-white px-3 text-[12px] text-[#333] focus:border-[#273A60] focus:outline-none">
              <option value="all">Alla statusar</option>
              <option value="active">Aktiva</option>
              <option value="expiring">Utgående</option>
              <option value="expired">Utgångna</option>
              <option value="draft">Utkast</option>
            </select>
            <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value as TypeFilter)} className="h-9 rounded-lg border border-[#d0d0d0] bg-white px-3 text-[12px] text-[#333] focus:border-[#273A60] focus:outline-none">
              <option value="all">Alla kundtyper</option>
              <option value="kommun">Kommun</option>
              <option value="brf">BRF</option>
              <option value="foretag">Företag</option>
              <option value="forening">Förening</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button className="rounded-lg border border-[#d0d0d0] bg-white px-3 py-2 text-[12px] font-semibold text-[#555] transition-colors hover:bg-[#f5f5f5]">Exportera prislista</button>
            <button className="rounded-lg bg-[#273A60] px-4 py-2 text-[12px] font-semibold text-white transition-colors hover:bg-[#1a2d4d]">+ Nytt prisavtal</button>
          </div>
        </div>

        <p className="mt-3 text-[12px] text-[#999]">{filtered.length} avtal</p>

        {/* Table + sidebar */}
        <div className="mt-2 grid gap-6 lg:grid-cols-[1fr_280px]">
          <div className="overflow-auto max-h-[65vh] rounded-xl border border-[#d0d0d0] bg-white">
            <table className="w-full min-w-[850px] text-left">
              <thead className="sticky top-0 z-10">
                <tr className="border-b border-[#e5e5e5] bg-[#fafafa]">
                  {["Avtal nr", "Kund", "Kundtyp", "Omfattning", "Rabatt", "Start", "Utgår", "Status"].map((h) => (
                    <th key={h} className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#999]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0f0f0]">
                {filtered.map((a) => {
                  const st = statusConfig[a.status];
                  const ct = typeConfig[a.customerType];
                  return (
                    <tr key={a.id} className={`transition-colors hover:bg-[#fafafa] ${a.status === "expired" ? "opacity-60" : ""}`}>
                      <td className="px-4 py-3 text-[13px] font-semibold text-[#273A60]">{a.id}</td>
                      <td className="px-4 py-3 text-[12px] font-medium text-[#333]">{a.customer}</td>
                      <td className="px-4 py-3"><span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${ct.bg} ${ct.text}`}>{ct.label}</span></td>
                      <td className="px-4 py-3 text-[12px] text-[#555] max-w-[180px] truncate">{a.scope}</td>
                      <td className="px-4 py-3 text-[14px] font-bold text-[#111]">{a.discount}</td>
                      <td className="px-4 py-3 text-[12px] text-[#666]">{a.start}</td>
                      <td className="px-4 py-3"><span className={`text-[12px] ${a.status === "expiring" ? "font-semibold text-[#e65100]" : "text-[#666]"}`}>{a.end}</span></td>
                      <td className="px-4 py-3"><span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${st.bg} ${st.text}`}>{st.label}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="space-y-4">
            <div className="rounded-xl border border-[#e5e5e5] bg-white">
              <div className="border-b border-[#f0f0f0] px-4 py-3">
                <h3 className="text-[13px] font-bold text-[#111]">Utgår snart</h3>
              </div>
              <div className="divide-y divide-[#f0f0f0]">
                {expiringAgreements.map((a) => (
                  <div key={a.id} className="px-4 py-3">
                    <p className="text-[12px] font-semibold text-[#111]">{a.customer}</p>
                    <p className="mt-0.5 text-[11px] text-[#888]">{a.id} · {a.discount} · Utgår {a.end}</p>
                    <button className="mt-1.5 text-[11px] font-semibold text-[#273A60] hover:underline">Förnya →</button>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-[#e5e5e5] bg-white">
              <div className="border-b border-[#f0f0f0] px-4 py-3">
                <h3 className="text-[13px] font-bold text-[#111]">Senaste aktivitet</h3>
              </div>
              <div className="divide-y divide-[#f0f0f0]">
                {recentActivity.map((a, idx) => (
                  <div key={idx} className="px-4 py-3">
                    <p className="text-[12px] text-[#555]">{a.text}</p>
                    <p className="mt-0.5 text-[10px] text-[#bbb]">{a.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
