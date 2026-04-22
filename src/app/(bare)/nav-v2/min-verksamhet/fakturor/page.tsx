"use client";

import { useState, useMemo } from "react";
import NavHeader from "../../NavHeader";
import Breadcrumb from "../../Breadcrumb";

/* ═══════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════ */

type InvoiceStatus = "paid" | "open" | "overdue" | "credited";
type InvoiceType = "Faktura" | "Kreditnota" | "Delfaktura";

type Invoice = {
  id: string;
  issueDate: string;
  dueDate: string;
  total: number;
  status: InvoiceStatus;
  type: InvoiceType;
  orderNr: string;
  customerOrderNr?: string;
  customer?: string;
};

/* ═══════════════════════════════════════════════════════
   MOCK DATA
   ═══════════════════════════════════════════════════════ */

const invoices: Invoice[] = [
  { id: "90366751", issueDate: "2026-02-17", dueDate: "2026-03-20", total: 42890, status: "open", type: "Faktura", orderNr: "2638633", customerOrderNr: "5588361", customer: "Landskapet Trädgård AB" },
  { id: "90366296", issueDate: "2026-02-10", dueDate: "2026-03-13", total: 18450, status: "open", type: "Faktura", orderNr: "2637101", customerOrderNr: "5574611", customer: "Swedish Motors AB" },
  { id: "12006575", issueDate: "2026-01-07", dueDate: "2026-02-06", total: 9500, status: "paid", type: "Faktura", orderNr: "2627861", customerOrderNr: "90362893", customer: "Grönyta Entreprenad AB" },
  { id: "90362893", issueDate: "2026-01-05", dueDate: "2026-01-08", total: -9500, status: "credited", type: "Kreditnota", orderNr: "2627425", customerOrderNr: "5540303", customer: "Grönyta Entreprenad AB" },
  { id: "12005923", issueDate: "2025-12-30", dueDate: "2026-01-29", total: 1444, status: "paid", type: "Delfaktura", orderNr: "2626782", customer: "JL Maskin & Trädgård" },
  { id: "12005326", issueDate: "2025-12-22", dueDate: "2026-01-21", total: 4249, status: "paid", type: "Faktura", orderNr: "2626030", customerOrderNr: "KB1452XR", customer: "Stenungsunds kommun" },
  { id: "12005325", issueDate: "2025-12-22", dueDate: "2026-01-21", total: 4249, status: "paid", type: "Faktura", orderNr: "2626029", customerOrderNr: "OR3288MK", customer: "Automower Service Stockholm" },
  { id: "12005324", issueDate: "2025-12-22", dueDate: "2026-01-21", total: 4249, status: "paid", type: "Faktura", orderNr: "2625983", customerOrderNr: "QO3375IY", customer: "Automower Service Stockholm" },
  { id: "90361100", issueDate: "2025-12-15", dueDate: "2026-01-14", total: 67200, status: "overdue", type: "Faktura", orderNr: "2624550", customerOrderNr: "PO-2025-889", customer: "Landskapet Trädgård AB" },
  { id: "12004998", issueDate: "2025-12-10", dueDate: "2026-01-09", total: 2890, status: "paid", type: "Faktura", orderNr: "2624100", customer: "JL Maskin & Trädgård" },
  { id: "12004887", issueDate: "2025-12-01", dueDate: "2025-12-31", total: 15600, status: "paid", type: "Faktura", orderNr: "2623800", customerOrderNr: "INT-5521", customer: "Swedish Motors AB" },
];

/* ═══════════════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════════════ */

const fmt = (n: number) =>
  n.toLocaleString("sv-SE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const statusConfig: Record<InvoiceStatus, { label: string; bg: string; text: string }> = {
  paid: { label: "Betald", bg: "bg-[#e8f5e9]", text: "text-[#2e7d32]" },
  open: { label: "Öppen", bg: "bg-[#e3f2fd]", text: "text-[#1565c0]" },
  overdue: { label: "Förfallen", bg: "bg-[#fce8e8]", text: "text-[#c62828]" },
  credited: { label: "Krediterad", bg: "bg-[#f5f5f5]", text: "text-[#888]" },
};

const typeConfig: Record<InvoiceType, string> = {
  Faktura: "text-[#333]",
  Kreditnota: "text-[#c62828]",
  Delfaktura: "text-[#1565c0]",
};

type StatusFilter = "all" | InvoiceStatus;
type TypeFilter = "all" | InvoiceType;

/* ═══════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════ */

export default function FakturorPage() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [dateFrom, setDateFrom] = useState("2025-12-18");
  const [dateTo, setDateTo] = useState("2026-03-18");

  const filtered = useMemo(() => {
    return invoices.filter((inv) => {
      if (statusFilter !== "all" && inv.status !== statusFilter) return false;
      if (typeFilter !== "all" && inv.type !== typeFilter) return false;
      if (dateFrom && inv.issueDate < dateFrom) return false;
      if (dateTo && inv.issueDate > dateTo) return false;
      if (search) {
        const s = search.toLowerCase();
        return (
          inv.id.includes(s) ||
          inv.orderNr.includes(s) ||
          (inv.customerOrderNr?.toLowerCase().includes(s) ?? false) ||
          (inv.customer?.toLowerCase().includes(s) ?? false)
        );
      }
      return true;
    });
  }, [statusFilter, typeFilter, search, dateFrom, dateTo]);

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (selected.size === filtered.length) setSelected(new Set());
    else setSelected(new Set(filtered.map((i) => i.id)));
  };

  // Summary metrics
  const openTotal = invoices.filter((i) => i.status === "open").reduce((s, i) => s + i.total, 0);
  const overdueTotal = invoices.filter((i) => i.status === "overdue").reduce((s, i) => s + i.total, 0);
  const openCount = invoices.filter((i) => i.status === "open").length;
  const overdueCount = invoices.filter((i) => i.status === "overdue").length;

  return (
    <div className="min-h-screen bg-white">
      <NavHeader />

      <main className="mx-auto max-w-[1320px] px-6 py-6">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: "Min verksamhet", href: "/nav-v2/min-verksamhet" },
            { label: "Fakturor", href: "/nav-v2/min-verksamhet/fakturor" },
          ]}
        />

        {/* Page header */}
        <div className="mt-5 flex items-end justify-between">
          <div>
            <h1 className="text-[26px] font-bold text-[#111]">Fakturor</h1>
            <p className="mt-1 max-w-xl text-[13px] leading-relaxed text-[#888]">
              Fakturaöversikt, betalningsstatus och export. Visar senaste 3 månaderna som standard.
            </p>
          </div>
          {selected.size > 0 && (
            <button className="rounded-lg bg-[#273A60] px-5 py-2.5 text-[12px] font-semibold text-white transition-colors hover:bg-[#1a2d4d]">
              Exportera {selected.size} faktur{selected.size === 1 ? "a" : "or"}
            </button>
          )}
        </div>

        {/* Summary cards */}
        <div className="mt-6 grid gap-4 sm:grid-cols-4">
          <div className="rounded-xl border border-[#e0e0e0] bg-white px-5 py-4">
            <span className="text-[12px] font-medium text-[#999]">Totalt fakturerat</span>
            <span className="mt-1 block text-[20px] font-bold text-[#111]">
              {fmt(invoices.filter((i) => i.total > 0).reduce((s, i) => s + i.total, 0))} kr
            </span>
          </div>
          <button
            onClick={() => setStatusFilter(statusFilter === "open" ? "all" : "open")}
            className={`rounded-xl border px-5 py-4 text-left transition-all ${
              statusFilter === "open"
                ? "border-[#1565c0] bg-[#e3f2fd]/50 shadow-sm"
                : "border-[#e0e0e0] bg-white hover:border-[#1565c0]/30"
            }`}
          >
            <span className="text-[12px] font-medium text-[#999]">Öppna ({openCount})</span>
            <span className="mt-1 block text-[20px] font-bold text-[#1565c0]">{fmt(openTotal)} kr</span>
          </button>
          <button
            onClick={() => setStatusFilter(statusFilter === "overdue" ? "all" : "overdue")}
            className={`rounded-xl border px-5 py-4 text-left transition-all ${
              statusFilter === "overdue"
                ? "border-[#c62828] bg-[#fce8e8]/50 shadow-sm"
                : "border-[#e0e0e0] bg-white hover:border-[#c62828]/30"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-medium text-[#999]">Förfallna ({overdueCount})</span>
              {overdueCount > 0 && (
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#c62828]" />
              )}
            </div>
            <span className="mt-1 block text-[20px] font-bold text-[#c62828]">{fmt(overdueTotal)} kr</span>
          </button>
          <div className="rounded-xl border border-[#e0e0e0] bg-white px-5 py-4">
            <span className="text-[12px] font-medium text-[#999]">Kreditnotor</span>
            <span className="mt-1 block text-[20px] font-bold text-[#888]">
              {fmt(Math.abs(invoices.filter((i) => i.status === "credited").reduce((s, i) => s + i.total, 0)))} kr
            </span>
          </div>
        </div>

        {/* Date range */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <div>
              <label className="mb-1 block text-[11px] font-semibold text-[#999]">Från</label>
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="h-9 rounded-lg border border-[#d0d0d0] bg-white px-3 text-[13px] text-[#333] focus:border-[#273A60] focus:outline-none"
              />
            </div>
            <span className="mt-5 text-[#ccc]">–</span>
            <div>
              <label className="mb-1 block text-[11px] font-semibold text-[#999]">Till</label>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="h-9 rounded-lg border border-[#d0d0d0] bg-white px-3 text-[13px] text-[#333] focus:border-[#273A60] focus:outline-none"
              />
            </div>
          </div>
          {/* Quick presets */}
          <div className="mt-4 flex gap-1.5">
            {[
              { label: "3 mån", from: "2025-12-18", to: "2026-03-18" },
              { label: "6 mån", from: "2025-09-18", to: "2026-03-18" },
              { label: "12 mån", from: "2025-03-18", to: "2026-03-18" },
            ].map((p) => (
              <button
                key={p.label}
                onClick={() => { setDateFrom(p.from); setDateTo(p.to); }}
                className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition-all ${
                  dateFrom === p.from && dateTo === p.to
                    ? "bg-[#273A60] text-white"
                    : "bg-[#f5f5f5] text-[#666] hover:bg-[#e8e8e8]"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Filters + search */}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          {/* Type filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as TypeFilter)}
            className="h-10 rounded-lg border border-[#d0d0d0] bg-white px-3 text-[13px] text-[#333] focus:border-[#273A60] focus:outline-none"
          >
            <option value="all">Alla fakturatyper</option>
            <option value="Faktura">Faktura</option>
            <option value="Kreditnota">Kreditnota</option>
            <option value="Delfaktura">Delfaktura</option>
          </select>

          {/* Status pills */}
          <div className="flex gap-1.5">
            {(["all", "open", "paid", "overdue", "credited"] as StatusFilter[]).map((s) => {
              const label = s === "all" ? "Alla" : statusConfig[s as InvoiceStatus].label;
              return (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`rounded-full px-3 py-1.5 text-[12px] font-medium transition-all ${
                    statusFilter === s
                      ? "bg-[#273A60] text-white"
                      : "bg-[#f5f5f5] text-[#666] hover:bg-[#e8e8e8]"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Search */}
          <div className="relative ml-auto">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#bbb]"
              width="15"
              height="15"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              <circle cx="7" cy="7" r="4.5" />
              <path d="M10.5 10.5L14 14" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Sök fakturanr, ordernr, kund…"
              className="h-10 w-64 rounded-lg border border-[#d0d0d0] bg-white pl-9 pr-3 text-[13px] text-[#333] placeholder-[#aaa] transition-colors focus:border-[#273A60] focus:outline-none"
            />
          </div>
        </div>

        {/* Table */}
        <div className="mt-5 overflow-hidden rounded-xl border border-[#e0e0e0]">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[#e5e5e5] bg-[#fafafa]">
                  <th className="w-10 px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selected.size === filtered.length && filtered.length > 0}
                      onChange={toggleAll}
                      className="h-4 w-4 rounded border-[#d0d0d0] accent-[#273A60]"
                    />
                  </th>
                  <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-[#999]">
                    Fakturanr
                  </th>
                  <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-[#999]">
                    Kund
                  </th>
                  <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-[#999]">
                    Typ
                  </th>
                  <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-[#999]">
                    Utfärdad
                  </th>
                  <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-[#999]">
                    Förfallodatum
                  </th>
                  <th className="px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-wide text-[#999]">
                    Belopp
                  </th>
                  <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-[#999]">
                    Status
                  </th>
                  <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-[#999]">
                    Order
                  </th>
                  <th className="w-10 px-2 py-3" />
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={10} className="px-6 py-12 text-center text-[13px] text-[#999]">
                      Inga fakturor matchar dina filter.
                    </td>
                  </tr>
                )}
                {filtered.map((inv) => {
                  const st = statusConfig[inv.status];
                  const isOverdue = inv.status === "overdue";
                  return (
                    <tr
                      key={inv.id}
                      className={`border-b border-[#f0f0f0] transition-colors hover:bg-[#fafafa] ${
                        isOverdue ? "bg-[#fce8e8]/20" : ""
                      }`}
                    >
                      {/* Checkbox */}
                      <td className="px-4 py-3.5">
                        <input
                          type="checkbox"
                          checked={selected.has(inv.id)}
                          onChange={() => toggleSelect(inv.id)}
                          className="h-4 w-4 rounded border-[#d0d0d0] accent-[#273A60]"
                        />
                      </td>
                      {/* Fakturanr */}
                      <td className="px-4 py-3.5">
                        <span className="text-[13px] font-semibold text-[#111]">{inv.id}</span>
                      </td>
                      {/* Kund */}
                      <td className="px-4 py-3.5">
                        <span className="text-[13px] text-[#555]">{inv.customer ?? "—"}</span>
                      </td>
                      {/* Typ */}
                      <td className="px-4 py-3.5">
                        <span className={`text-[12px] font-medium ${typeConfig[inv.type]}`}>
                          {inv.type}
                        </span>
                      </td>
                      {/* Utfärdad */}
                      <td className="px-4 py-3.5 text-[13px] text-[#666]">{inv.issueDate}</td>
                      {/* Förfallodatum */}
                      <td className="px-4 py-3.5">
                        <span className={`text-[13px] ${isOverdue ? "font-semibold text-[#c62828]" : "text-[#666]"}`}>
                          {inv.dueDate}
                        </span>
                      </td>
                      {/* Belopp */}
                      <td className="px-4 py-3.5 text-right">
                        <span className={`text-[13px] font-semibold ${inv.total < 0 ? "text-[#c62828]" : "text-[#111]"}`}>
                          {fmt(inv.total)} kr
                        </span>
                      </td>
                      {/* Status */}
                      <td className="px-4 py-3.5">
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${st.bg} ${st.text}`}>
                          {isOverdue && <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#c62828]" />}
                          {st.label}
                        </span>
                      </td>
                      {/* Order */}
                      <td className="px-4 py-3.5">
                        <a href="#" className="text-[12px] font-medium text-[#273A60] hover:underline">
                          {inv.orderNr}
                        </a>
                        {inv.customerOrderNr && (
                          <span className="mt-0.5 block text-[11px] text-[#bbb]">{inv.customerOrderNr}</span>
                        )}
                      </td>
                      {/* Action */}
                      <td className="px-2 py-3.5">
                        <button
                          className="flex h-7 w-7 items-center justify-center rounded text-[#ccc] transition-colors hover:bg-[#f0f0f0] hover:text-[#555]"
                          title="Visa faktura"
                        >
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 3l4 4-4 4" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-[#e5e5e5] bg-[#fafafa] px-6 py-3">
            <span className="text-[12px] text-[#999]">
              {selected.size > 0
                ? `${selected.size} av ${filtered.length} valda`
                : `${filtered.length} fakturor`}
            </span>
            <button
              disabled={selected.size === 0}
              className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-[12px] font-semibold transition-colors ${
                selected.size > 0
                  ? "bg-[#273A60] text-white hover:bg-[#1a2d4d]"
                  : "bg-[#e5e5e5] text-[#999] cursor-not-allowed"
              }`}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 2v8M4 7l3 3 3-3" />
                <path d="M2 11h10" />
              </svg>
              Exportera fakturor
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
