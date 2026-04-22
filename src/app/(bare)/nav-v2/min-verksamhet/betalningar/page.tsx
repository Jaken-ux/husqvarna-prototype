"use client";

import { useState, useMemo } from "react";
import NavHeader from "../../NavHeader";
import Breadcrumb from "../../Breadcrumb";

/* ═══════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════ */

type TxType = "payment" | "credit" | "debit" | "bonus" | "refund";
type TxStatus = "completed" | "pending" | "failed";

type Transaction = {
  id: string;
  date: string;
  description: string;
  reference?: string;
  type: TxType;
  amount: number;
  status: TxStatus;
  invoiceNr?: string;
};

/* ═══════════════════════════════════════════════════════
   MOCK DATA
   ═══════════════════════════════════════════════════════ */

const accountSummary = {
  balance: -18450,
  creditLimit: 500000,
  nextPaymentDue: "2026-03-20",
  nextPaymentAmount: 42890,
  overdueAmount: 67200,
  bonusAccrued: 8640,
};

const transactions: Transaction[] = [
  { id: "TX-9001", date: "2026-03-15", description: "Betalning — faktura 90366296", reference: "OCR 9036629600", type: "payment", amount: 18450, status: "completed", invoiceNr: "90366296" },
  { id: "TX-9002", date: "2026-03-10", description: "Kampanjbonus — Vårkampanj 2026 (feb)", reference: "BONUS-VÅR-FEB", type: "bonus", amount: 3200, status: "completed" },
  { id: "TX-9003", date: "2026-03-05", description: "Faktura 90366751 — Landskapet Trädgård AB", reference: "INV-90366751", type: "debit", amount: -42890, status: "completed", invoiceNr: "90366751" },
  { id: "TX-9004", date: "2026-03-01", description: "Kreditnota 90362893 — retur", reference: "CN-90362893", type: "credit", amount: 9500, status: "completed", invoiceNr: "90362893" },
  { id: "TX-9005", date: "2026-02-25", description: "Betalning — faktura 12006575", reference: "OCR 1200657500", type: "payment", amount: 9500, status: "completed", invoiceNr: "12006575" },
  { id: "TX-9006", date: "2026-02-20", description: "Faktura 90366296 — Swedish Motors AB", reference: "INV-90366296", type: "debit", amount: -18450, status: "completed", invoiceNr: "90366296" },
  { id: "TX-9007", date: "2026-02-15", description: "Kampanjbonus — Vårkampanj 2026 (jan)", reference: "BONUS-VÅR-JAN", type: "bonus", amount: 5440, status: "completed" },
  { id: "TX-9008", date: "2026-02-10", description: "Betalning — faktura 12005326", reference: "OCR 1200532600", type: "payment", amount: 4249, status: "completed", invoiceNr: "12005326" },
  { id: "TX-9009", date: "2026-02-10", description: "Betalning — faktura 12005325", reference: "OCR 1200532500", type: "payment", amount: 4249, status: "completed", invoiceNr: "12005325" },
  { id: "TX-9010", date: "2026-02-05", description: "Faktura 12005923 — JL Maskin & Trädgård", reference: "INV-12005923", type: "debit", amount: -1444, status: "completed", invoiceNr: "12005923" },
  { id: "TX-9011", date: "2026-01-30", description: "Återbetalning — RMA-2026-012", reference: "REFUND-RMA012", type: "refund", amount: 1850, status: "pending" },
  { id: "TX-9012", date: "2026-01-25", description: "Betalning — faktura 12005324", reference: "OCR 1200532400", type: "payment", amount: 4249, status: "completed", invoiceNr: "12005324" },
];

/* ═══════════════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════════════ */

const fmt = (n: number) =>
  n.toLocaleString("sv-SE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const fmtAbs = (n: number) => fmt(Math.abs(n));

const txTypeConfig: Record<TxType, { label: string; icon: string; color: string; bg: string }> = {
  payment: { label: "Betalning", icon: "↑", color: "text-[#2e7d32]", bg: "bg-[#e8f5e9]" },
  credit: { label: "Kreditnota", icon: "↩", color: "text-[#1565c0]", bg: "bg-[#e3f2fd]" },
  debit: { label: "Faktura", icon: "↓", color: "text-[#c62828]", bg: "bg-[#fce8e8]" },
  bonus: { label: "Bonus", icon: "★", color: "text-[#e65100]", bg: "bg-[#fff3e0]" },
  refund: { label: "Återbetalning", icon: "↩", color: "text-[#6a1b9a]", bg: "bg-[#f3e5f5]" },
};

const txStatusConfig: Record<TxStatus, { label: string; bg: string; text: string }> = {
  completed: { label: "Genomförd", bg: "bg-[#e8f5e9]", text: "text-[#2e7d32]" },
  pending: { label: "Väntande", bg: "bg-[#fff3e0]", text: "text-[#e65100]" },
  failed: { label: "Misslyckad", bg: "bg-[#fce8e8]", text: "text-[#c62828]" },
};

type TxFilter = "all" | TxType;

/* ═══════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════ */

export default function BetalningarPage() {
  const [txFilter, setTxFilter] = useState<TxFilter>("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return transactions.filter((tx) => {
      if (txFilter !== "all" && tx.type !== txFilter) return false;
      if (search) {
        const s = search.toLowerCase();
        return (
          tx.description.toLowerCase().includes(s) ||
          tx.id.toLowerCase().includes(s) ||
          (tx.reference?.toLowerCase().includes(s) ?? false) ||
          (tx.invoiceNr?.includes(s) ?? false)
        );
      }
      return true;
    });
  }, [txFilter, search]);

  const creditUsed = accountSummary.creditLimit + accountSummary.balance;
  const creditPct = Math.round((creditUsed / accountSummary.creditLimit) * 100);

  return (
    <div className="min-h-screen bg-white">
      <NavHeader />

      <main className="mx-auto max-w-[1320px] px-6 py-6">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: "Min verksamhet", href: "/nav-v2/min-verksamhet" },
            { label: "Betalningar & saldo", href: "/nav-v2/min-verksamhet/betalningar" },
          ]}
        />

        {/* Page header */}
        <div className="mt-5">
          <h1 className="text-[26px] font-bold text-[#111]">Betalningar & saldo</h1>
          <p className="mt-1 max-w-xl text-[13px] leading-relaxed text-[#888]">
            Kontosaldo, betalningshistorik, bonusöversikt och kreditlimit.
          </p>
        </div>

        {/* ── Top cards ── */}
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {/* Saldo card */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#273A60] to-[#1a2d4d] p-6 text-white">
            <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-white/5" />
            <span className="text-[12px] font-medium text-white/50">Aktuellt saldo</span>
            <span className={`mt-1 block text-[32px] font-bold ${accountSummary.balance < 0 ? "text-[#ff8a80]" : "text-white"}`}>
              {fmt(accountSummary.balance)} kr
            </span>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-[13px]">
                <span className="text-white/60">Nästa betalning</span>
                <span className="font-semibold">{accountSummary.nextPaymentDue}</span>
              </div>
              <div className="flex items-center justify-between text-[13px]">
                <span className="text-white/60">Belopp</span>
                <span className="font-semibold">{fmt(accountSummary.nextPaymentAmount)} kr</span>
              </div>
              {accountSummary.overdueAmount > 0 && (
                <div className="mt-3 flex items-center gap-2 rounded-lg bg-[#c62828]/20 px-3 py-2">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-[#ff8a80]" />
                  <span className="text-[12px] font-semibold text-[#ff8a80]">
                    {fmt(accountSummary.overdueAmount)} kr förfallet
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Credit limit card */}
          <div className="rounded-2xl border border-[#e0e0e0] bg-white p-6">
            <span className="text-[12px] font-medium text-[#999]">Kreditlimit</span>
            <span className="mt-1 block text-[28px] font-bold text-[#111]">
              {fmt(accountSummary.creditLimit)} kr
            </span>

            {/* Progress bar */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-[12px]">
                <span className="text-[#888]">Utnyttjat</span>
                <span className="font-semibold text-[#333]">{creditPct} %</span>
              </div>
              <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-[#f0f0f0]">
                <div
                  className={`h-full rounded-full transition-all ${
                    creditPct > 80 ? "bg-[#c62828]" : creditPct > 50 ? "bg-[#e65100]" : "bg-[#273A60]"
                  }`}
                  style={{ width: `${Math.min(creditPct, 100)}%` }}
                />
              </div>
              <div className="mt-2 flex items-center justify-between text-[11px] text-[#aaa]">
                <span>{fmt(creditUsed)} kr använt</span>
                <span>{fmt(accountSummary.creditLimit - creditUsed)} kr kvar</span>
              </div>
            </div>
          </div>

          {/* Bonus card */}
          <div className="rounded-2xl border border-[#e0e0e0] bg-white p-6">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-medium text-[#999]">Ackumulerad bonus</span>
              <span className="rounded-full bg-[#fff3e0] px-2.5 py-0.5 text-[10px] font-bold text-[#e65100]">
                Vårkampanj 2026
              </span>
            </div>
            <span className="mt-1 block text-[28px] font-bold text-[#e65100]">
              {fmt(accountSummary.bonusAccrued)} kr
            </span>
            <p className="mt-3 text-[12px] leading-relaxed text-[#888]">
              Beräknad utbetalning som kreditnota den 15 juni 2026. Nuvarande nivå:{" "}
              <span className="font-semibold text-[#e65100]">Guld (4 %)</span>
            </p>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#fff3e0]">
              <div className="h-full w-[65%] rounded-full bg-gradient-to-r from-[#e65100] to-[#ff9800]" />
            </div>
            <div className="mt-1 flex items-center justify-between text-[11px] text-[#ccc]">
              <span>Silver</span>
              <span className="font-semibold text-[#e65100]">Guld</span>
              <span>Platina</span>
            </div>
          </div>
        </div>

        {/* ── Upcoming payments ── */}
        <section className="mt-10">
          <h2 className="text-[15px] font-bold text-[#111]">Kommande betalningar</h2>
          <p className="mt-1 text-[12px] text-[#999]">Fakturor som förfaller inom 30 dagar</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              { inv: "90366751", customer: "Landskapet Trädgård AB", due: "2026-03-20", amount: 42890, daysLeft: 3 },
              { inv: "90366296", customer: "Swedish Motors AB", due: "2026-03-13", amount: 18450, daysLeft: -4, overdue: true },
            ].map((p) => (
              <div
                key={p.inv}
                className={`flex items-center justify-between rounded-xl border px-5 py-4 ${
                  p.overdue
                    ? "border-[#c62828]/20 bg-[#fce8e8]/30"
                    : "border-[#e0e0e0] bg-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`flex h-10 w-10 items-center justify-center rounded-lg text-[14px] font-bold ${
                    p.overdue ? "bg-[#fce8e8] text-[#c62828]" : "bg-[#e3f2fd] text-[#1565c0]"
                  }`}>
                    {p.overdue ? "!" : p.daysLeft}
                  </span>
                  <div>
                    <span className="text-[13px] font-semibold text-[#111]">Faktura {p.inv}</span>
                    <span className="mt-0.5 block text-[11px] text-[#999]">
                      {p.customer} · Förfaller {p.due}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-[14px] font-bold ${p.overdue ? "text-[#c62828]" : "text-[#111]"}`}>
                    {fmt(p.amount)} kr
                  </span>
                  {p.overdue && (
                    <span className="mt-0.5 block text-[11px] font-semibold text-[#c62828]">
                      {Math.abs(p.daysLeft)} dagar försenad
                    </span>
                  )}
                  {!p.overdue && (
                    <span className="mt-0.5 block text-[11px] text-[#999]">
                      om {p.daysLeft} dagar
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Transaction history ── */}
        <section className="mt-10">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-[15px] font-bold text-[#111]">Transaktionshistorik</h2>
              <p className="mt-1 text-[12px] text-[#999]">Alla kontorörelser — betalningar, fakturor, bonus och krediter</p>
            </div>
          </div>

          {/* Filters */}
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <div className="flex gap-1.5">
              {(
                [
                  { id: "all", label: "Alla" },
                  { id: "payment", label: "Betalningar" },
                  { id: "debit", label: "Fakturor" },
                  { id: "credit", label: "Krediter" },
                  { id: "bonus", label: "Bonus" },
                  { id: "refund", label: "Återbet." },
                ] as { id: TxFilter; label: string }[]
              ).map((f) => (
                <button
                  key={f.id}
                  onClick={() => setTxFilter(f.id)}
                  className={`rounded-full px-3 py-1.5 text-[12px] font-medium transition-all ${
                    txFilter === f.id
                      ? "bg-[#273A60] text-white"
                      : "bg-[#f5f5f5] text-[#666] hover:bg-[#e8e8e8]"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="relative ml-auto">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#bbb]"
                width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
              >
                <circle cx="7" cy="7" r="4.5" />
                <path d="M10.5 10.5L14 14" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Sök transaktion, referens…"
                className="h-10 w-64 rounded-lg border border-[#d0d0d0] bg-white pl-9 pr-3 text-[13px] text-[#333] placeholder-[#aaa] transition-colors focus:border-[#273A60] focus:outline-none"
              />
            </div>
          </div>

          {/* Table */}
          <div className="mt-4 overflow-hidden rounded-xl border border-[#e0e0e0]">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-[#e5e5e5] bg-[#fafafa]">
                    <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wide text-[#999]">Datum</th>
                    <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-[#999]">Typ</th>
                    <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-[#999]">Beskrivning</th>
                    <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-[#999]">Referens</th>
                    <th className="px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-wide text-[#999]">Belopp</th>
                    <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-[#999]">Status</th>
                    <th className="w-10 px-2 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center text-[13px] text-[#999]">
                        Inga transaktioner matchar dina filter.
                      </td>
                    </tr>
                  )}
                  {filtered.map((tx) => {
                    const tc = txTypeConfig[tx.type];
                    const sc = txStatusConfig[tx.status];
                    return (
                      <tr key={tx.id} className="border-b border-[#f0f0f0] transition-colors hover:bg-[#fafafa]">
                        <td className="px-5 py-3.5 text-[13px] text-[#666]">{tx.date}</td>
                        <td className="px-4 py-3.5">
                          <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${tc.bg} ${tc.color}`}>
                            <span>{tc.icon}</span>
                            {tc.label}
                          </span>
                        </td>
                        <td className="px-4 py-3.5 text-[13px] text-[#333]">{tx.description}</td>
                        <td className="px-4 py-3.5 text-[12px] text-[#aaa]">{tx.reference ?? "—"}</td>
                        <td className="px-4 py-3.5 text-right">
                          <span className={`text-[13px] font-semibold ${tx.amount >= 0 ? "text-[#2e7d32]" : "text-[#c62828]"}`}>
                            {tx.amount >= 0 ? "+" : ""}{fmt(tx.amount)} kr
                          </span>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold ${sc.bg} ${sc.text}`}>
                            {sc.label}
                          </span>
                        </td>
                        <td className="px-2 py-3.5">
                          {tx.invoiceNr && (
                            <a
                              href="#"
                              className="flex h-7 w-7 items-center justify-center rounded text-[#ccc] transition-colors hover:bg-[#f0f0f0] hover:text-[#273A60]"
                              title={`Visa faktura ${tx.invoiceNr}`}
                            >
                              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 3l4 4-4 4" />
                              </svg>
                            </a>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between border-t border-[#e5e5e5] bg-[#fafafa] px-6 py-3">
              <span className="text-[12px] text-[#999]">{filtered.length} transaktioner</span>
              <button className="inline-flex items-center gap-2 rounded-lg border border-[#d0d0d0] px-4 py-2 text-[12px] font-medium text-[#555] transition-colors hover:border-[#273A60]/30 hover:text-[#273A60]">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 2v8M4 7l3 3 3-3" />
                  <path d="M2 11h10" />
                </svg>
                Exportera historik
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
