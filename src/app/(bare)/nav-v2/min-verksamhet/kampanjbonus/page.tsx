"use client";

import { useState } from "react";
import Breadcrumb from "../../Breadcrumb";

/* ═══════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════ */

const tiers = [
  { name: "Silver", target: "5–14 enheter", bonus: "2 %", color: "from-[#bbb] to-[#999]", ring: "ring-[#ccc]" },
  { name: "Guld", target: "15–29 enheter", bonus: "4 %", color: "from-[#d4a843] to-[#b8860b]", ring: "ring-[#d4a843]", current: true },
  { name: "Platina", target: "30+ enheter", bonus: "6 %", color: "from-[#273A60] to-[#1a2d4d]", ring: "ring-[#273A60]" },
];

const qualifyingProducts = [
  { product: "Automower 430X NERA", qty: 6, bonus: "SEK 2 400" },
  { product: "Automower 435X AWD", qty: 4, bonus: "SEK 1 920" },
  { product: "Automower 320 NERA", qty: 5, bonus: "SEK 1 200" },
  { product: "535i XP", qty: 3, bonus: "SEK 840" },
  { product: "572 XP Mark II", qty: 2, bonus: "SEK 1 120" },
  { product: "LC 353iVX", qty: 2, bonus: "SEK 1 160" },
];

const bonusHistory = [
  { period: "Mars 2026", units: 8, amount: "SEK 3 200", status: "pending" },
  { period: "Februari 2026", units: 6, amount: "SEK 2 400", status: "paid" },
  { period: "Januari 2026", units: 8, amount: "SEK 3 040", status: "paid" },
];

const timeline = [
  { date: "1 mar", label: "Kampanjstart", active: true, done: true },
  { date: "15 apr", label: "Halvtidsrapport", active: true, done: false },
  { date: "31 maj", label: "Kampanjslut", active: false, done: false },
  { date: "15 jun", label: "Bonusutbetalning", active: false, done: false },
];

/* ═══════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════ */

export default function KampanjbonusPage() {
  const [showHistory, setShowHistory] = useState(false);
  const totalUnits = qualifyingProducts.reduce((s, p) => s + p.qty, 0);
  const totalBonus = 8640;
  const daysLeft = 45;

  return (
    <div className="min-h-screen bg-white">
      {/* NavHeader rendered by layout */}
      <main className="py-6">
        <Breadcrumb items={[
          { label: "Min verksamhet", href: "/nav-v2/min-verksamhet/workspace" },
          { label: "Kampanjbonus", href: "/nav-v2/min-verksamhet/kampanjbonus" },
        ]} />

        <div className="mt-5 flex items-end justify-between">
          <div>
            <h1 className="text-[22px] font-bold text-[#111]">Kampanjbonus</h1>
            <p className="mt-1 text-[13px] text-[#888]">Spåra din bonusprogression och se intjänad bonus</p>
          </div>
          <a
            href="/nav-v2/husqvarna/kampanjer"
            className="flex items-center gap-1.5 rounded-lg border border-[#d0d0d0] px-3 py-2 text-[12px] font-medium text-[#555] transition-colors hover:bg-[#fafafa]"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 3h7v7" />
              <path d="M13 3L6 10" />
              <path d="M3 7v6h6" />
            </svg>
            Kampanjmaterial & info
          </a>
        </div>

        {/* ── Hero card ── */}
        <div className="mt-6 overflow-hidden rounded-2xl bg-gradient-to-br from-[#273A60] to-[#1a2d4d] p-6 text-white">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#2a9d5c]" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">Aktiv kampanj</span>
              </div>
              <h2 className="mt-2 text-[22px] font-bold">Vårkampanj 2026</h2>
              <p className="mt-0.5 text-[13px] text-white/60">Återförsäljarprogram · 1 mars – 31 maj 2026</p>
            </div>
            <div className="text-right">
              <p className="text-[28px] font-extrabold">{daysLeft}</p>
              <p className="text-[11px] text-white/50">dagar kvar</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-4 gap-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40">Nuvarande nivå</p>
              <p className="mt-1 text-[22px] font-extrabold text-[#ff9b4d]">Guld</p>
              <p className="text-[12px] text-white/60">4 % bonusmarginal</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40">Sålda enheter</p>
              <p className="mt-1 text-[22px] font-extrabold">{totalUnits}</p>
              <p className="text-[12px] text-white/60">kvalificerande</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40">Intjänad bonus</p>
              <p className="mt-1 text-[22px] font-extrabold text-[#2a9d5c]">SEK {totalBonus.toLocaleString("sv-SE")}</p>
              <p className="text-[12px] text-white/60">YTD 2026</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40">Nästa nivå</p>
              <p className="mt-1 text-[22px] font-extrabold">Platina</p>
              <p className="text-[12px] text-white/60">3 enheter kvar</p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-5">
            <div className="flex items-center justify-between text-[11px] text-white/50">
              <span>Silver (2%)</span>
              <span className="font-bold text-[#ff9b4d]">Guld (4%)</span>
              <span>Platina (6%)</span>
            </div>
            <div className="relative mt-1.5 h-3 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-[73%] rounded-full bg-gradient-to-r from-[#ff9b4d] to-[#ff6b00]" />
              {/* Tier markers */}
              <div className="absolute top-0 left-[33%] h-full w-px bg-white/20" />
              <div className="absolute top-0 left-[66%] h-full w-px bg-white/20" />
            </div>
            <div className="mt-1 flex items-center justify-between text-[10px] text-white/40">
              <span>5 enheter</span>
              <span>15 enheter</span>
              <span>30 enheter</span>
            </div>
          </div>
        </div>

        {/* ── Tier cards ── */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`relative overflow-hidden rounded-xl border bg-white transition-shadow ${
                t.current ? `ring-2 ${t.ring} border-transparent shadow-md` : "border-[#e5e5e5]"
              }`}
            >
              {t.current && (
                <div className="absolute right-3 top-3 rounded-full bg-[#b8860b] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
                  Du är här
                </div>
              )}
              <div className={`bg-gradient-to-br ${t.color} px-5 py-5 text-center text-white`}>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-white/70">{t.name}</p>
                <p className="mt-1 text-[32px] font-extrabold">{t.bonus}</p>
                <p className="text-[12px] text-white/70">bonusmarginal</p>
              </div>
              <div className="px-5 py-4">
                <p className="text-[13px] font-medium text-[#333]">{t.target}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Qualifying products ── */}
        <div className="mt-8">
          <h3 className="text-[15px] font-bold text-[#111]">Kvalificerande produkter</h3>
          <p className="mt-1 text-[12px] text-[#888]">Registrerade sell-outs under kampanjperioden</p>
          <div className="mt-3 overflow-hidden rounded-xl border border-[#e5e5e5] bg-white">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[#e5e5e5] bg-[#fafafa]">
                  <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#999]">Produkt</th>
                  <th className="px-4 py-3 text-center text-[11px] font-semibold uppercase tracking-wider text-[#999]">Sålda</th>
                  <th className="px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-wider text-[#999]">Bonus</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0f0f0]">
                {qualifyingProducts.map((p) => (
                  <tr key={p.product} className="transition-colors hover:bg-[#fafafa]">
                    <td className="px-5 py-3 text-[13px] font-semibold text-[#111]">{p.product}</td>
                    <td className="px-4 py-3 text-center text-[13px] font-bold text-[#273A60]">{p.qty}</td>
                    <td className="px-4 py-3 text-right text-[13px] font-semibold text-[#2e7d32]">{p.bonus}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t border-[#e5e5e5] bg-[#fafafa]">
                  <td className="px-5 py-3 text-[12px] font-bold text-[#111]">Totalt</td>
                  <td className="px-4 py-3 text-center text-[13px] font-extrabold text-[#273A60]">{totalUnits}</td>
                  <td className="px-4 py-3 text-right text-[13px] font-extrabold text-[#2e7d32]">SEK {totalBonus.toLocaleString("sv-SE")}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* ── Timeline ── */}
        <div className="mt-8">
          <h3 className="text-[15px] font-bold text-[#111]">Tidslinje</h3>
          <div className="mt-3 flex gap-0">
            {timeline.map((t, idx) => (
              <div key={t.date} className="flex flex-1 items-start gap-3">
                <div className="flex flex-col items-center">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                    t.done ? "border-[#2a9d5c] bg-[#2a9d5c]" : t.active ? "border-[#273A60] bg-white" : "border-[#d0d0d0] bg-white"
                  }`}>
                    {t.done && (
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M4 8l3 3 5-5" /></svg>
                    )}
                    {t.active && !t.done && (
                      <span className="h-2.5 w-2.5 rounded-full bg-[#273A60]" />
                    )}
                  </div>
                  {idx < timeline.length - 1 && (
                    <div className={`h-px w-full ${t.done ? "bg-[#2a9d5c]" : "bg-[#e5e5e5]"}`} style={{ width: "100%" }} />
                  )}
                </div>
                <div className="pb-4">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#999]">{t.date} 2026</p>
                  <p className="mt-0.5 text-[13px] font-semibold text-[#111]">{t.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bonus history ── */}
        <div className="mt-8">
          <div className="flex items-center justify-between">
            <h3 className="text-[15px] font-bold text-[#111]">Bonushistorik</h3>
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="text-[12px] font-semibold text-[#273A60] hover:underline"
            >
              {showHistory ? "Dölj" : "Visa historik"}
            </button>
          </div>
          {showHistory && (
            <div className="mt-3 overflow-hidden rounded-xl border border-[#e5e5e5] bg-white">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-[#e5e5e5] bg-[#fafafa]">
                    <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#999]">Period</th>
                    <th className="px-4 py-3 text-center text-[11px] font-semibold uppercase tracking-wider text-[#999]">Enheter</th>
                    <th className="px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-wider text-[#999]">Belopp</th>
                    <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#999]">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f0f0f0]">
                  {bonusHistory.map((b) => (
                    <tr key={b.period}>
                      <td className="px-5 py-3 text-[13px] font-medium text-[#333]">{b.period}</td>
                      <td className="px-4 py-3 text-center text-[13px] font-bold text-[#111]">{b.units}</td>
                      <td className="px-4 py-3 text-right text-[13px] font-semibold text-[#2e7d32]">{b.amount}</td>
                      <td className="px-4 py-3">
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          b.status === "paid" ? "bg-[#e8f5e9] text-[#2e7d32]" : "bg-[#fff3e0] text-[#e65100]"
                        }`}>
                          {b.status === "paid" ? "Utbetald" : "Väntande"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
