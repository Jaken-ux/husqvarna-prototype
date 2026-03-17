"use client";

import { useState, useRef, useEffect } from "react";
import NavHeader from "../NavHeader";
import Breadcrumb from "../Breadcrumb";
import { useShowroom } from "../ShowroomContext";

/* ═══ TYPES ═══ */
type QuoteItem = {
  id: string;
  article: string;
  name: string;
  dealerExcl: number;  // dealer purchase price excl. VAT (confidential)
  rrpExcl: number;     // recommended retail price excl. VAT (customer-facing)
  rrpIncl: number;     // recommended retail price incl. VAT (customer-facing)
  qty: number;
  comment: string;
  custom?: false;
};

type CustomRow = {
  id: string;
  custom: true;
  description: string;
  hasPrice: boolean;
  priceExcl: number;   // customer-facing price excl. VAT
  qty: number;
};

type QuoteRow = QuoteItem | CustomRow;

type Quote = {
  id: string;
  client: string;
  items: QuoteRow[];
};

/* ═══ SEED DATA ═══ */
const initialQuotes: Quote[] = [
  {
    id: "q1",
    client: "Grönyta AB",
    items: [
      { id: "967-29-61-01", article: "967 29 61-01", name: "Husqvarna 550i XP® G", dealerExcl: 584900, rrpExcl: 899900, rrpIncl: 1124900, qty: 10, comment: "" },
    ],
  },
  {
    id: "q2",
    client: "Lindströms Trädgård",
    items: [
      { id: "587-85-81-01", article: "587 85 81-01", name: "Husqvarna svärdkedja H37", dealerExcl: 15900, rrpExcl: 24900, rrpIncl: 31100, qty: 10, comment: "" },
    ],
  },
  {
    id: "q3",
    client: "Park & Skog HB",
    items: [
      { id: "576-08-55-01", article: "576 08 55-01", name: "Husqvarna luftfilter 545 Mark II", dealerExcl: 8900, rrpExcl: 14900, rrpIncl: 18600, qty: 10, comment: "" },
    ],
  },
];

/* ═══ HELPERS ═══ */
const VAT_RATE = 1.25; // Swedish 25% VAT
function fmt(cents: number) {
  return (cents / 100).toLocaleString("sv-SE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/* ═══ ADD ARTICLE MODAL ═══ */
function AddArticleModal({ onAdd, onClose }: { onAdd: (item: QuoteItem) => void; onClose: () => void }) {
  const [articleNr, setArticleNr] = useState("585 57 28-01");
  const [name, setName] = useState("Husqvarna Automower 430X NERA");
  const [rrpExcl, setRrpExcl] = useState("29990.00");
  const [qty, setQty] = useState("1");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!articleNr.trim() || !name.trim() || !rrpExcl.trim()) return;
    const excl = Math.round(parseFloat(rrpExcl) * 100);
    onAdd({
      id: articleNr.replace(/\s/g, "-"),
      article: articleNr,
      name,
      dealerExcl: Math.round(excl * 0.65),
      rrpExcl: excl,
      rrpIncl: Math.round(excl * VAT_RATE),
      qty: parseInt(qty) || 1,
      comment: "",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30" onClick={onClose}>
      <div className="w-full max-w-md rounded-xl border border-[#e5e5e5] bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-[16px] font-semibold text-[#111]">Lägg till artikel</h3>
        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <div>
            <label className="text-[11px] font-semibold uppercase tracking-wide text-[#999]">Artikelnummer</label>
            <input
              ref={inputRef}
              value={articleNr}
              onChange={(e) => setArticleNr(e.target.value)}
              placeholder="t.ex. 967 29 61-01"
              className="mt-1 h-10 w-full rounded-lg border border-[#d0d0d0] bg-[#fafafa] px-3 text-[14px] text-[#333] placeholder:text-[#bbb] focus:border-[#999] focus:bg-white focus:outline-none"
            />
          </div>
          <div>
            <label className="text-[11px] font-semibold uppercase tracking-wide text-[#999]">Produktnamn</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="t.ex. Husqvarna 550i XP"
              className="mt-1 h-10 w-full rounded-lg border border-[#d0d0d0] bg-[#fafafa] px-3 text-[14px] text-[#333] placeholder:text-[#bbb] focus:border-[#999] focus:bg-white focus:outline-none"
            />
          </div>
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-[11px] font-semibold uppercase tracking-wide text-[#999]">RRP exkl. moms (SEK)</label>
              <input
                value={rrpExcl}
                onChange={(e) => setRrpExcl(e.target.value)}
                placeholder="745.00"
                type="number"
                step="0.01"
                className="mt-1 h-10 w-full rounded-lg border border-[#d0d0d0] bg-[#fafafa] px-3 text-[14px] text-[#333] placeholder:text-[#bbb] focus:border-[#999] focus:bg-white focus:outline-none"
              />
            </div>
            <div className="w-24">
              <label className="text-[11px] font-semibold uppercase tracking-wide text-[#999]">Antal</label>
              <input
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                type="number"
                min="1"
                className="mt-1 h-10 w-full rounded-lg border border-[#d0d0d0] bg-[#fafafa] px-3 text-[14px] text-[#333] focus:border-[#999] focus:bg-white focus:outline-none"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="rounded-lg border border-[#d0d0d0] px-4 py-2 text-[13px] font-medium text-[#555] hover:bg-[#f5f5f5]">
              Avbryt
            </button>
            <button type="submit" className="rounded-lg bg-[#273A60] px-4 py-2 text-[13px] font-semibold text-white hover:bg-[#1a2d4d]">
              Lägg till
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ═══ CREATE QUOTE MODAL ═══ */
function CreateQuoteModal({ onCreate, onClose }: { onCreate: (name: string) => void; onClose: () => void }) {
  const [name, setName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30" onClick={onClose}>
      <div className="w-full max-w-sm rounded-xl border border-[#e5e5e5] bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-[16px] font-semibold text-[#111]">Skapa ny offert</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (name.trim()) { onCreate(name.trim()); onClose(); }
          }}
          className="mt-4 space-y-3"
        >
          <div>
            <label className="text-[11px] font-semibold uppercase tracking-wide text-[#999]">Kundnamn</label>
            <input
              ref={inputRef}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="t.ex. Grönyta AB"
              className="mt-1 h-10 w-full rounded-lg border border-[#d0d0d0] bg-[#fafafa] px-3 text-[14px] text-[#333] placeholder:text-[#bbb] focus:border-[#999] focus:bg-white focus:outline-none"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="rounded-lg border border-[#d0d0d0] px-4 py-2 text-[13px] font-medium text-[#555] hover:bg-[#f5f5f5]">
              Avbryt
            </button>
            <button type="submit" className="rounded-lg bg-[#273A60] px-4 py-2 text-[13px] font-semibold text-white hover:bg-[#1a2d4d]">
              Skapa
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ═══ SHOWROOM VIEW (single quote, full-screen for customer) ═══ */
function ShowroomView({ quote, discounts, onClose }: { quote: Quote; discounts: Record<string, number>; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-white">
      {/* Minimal top bar */}
      <div className="flex items-center justify-between border-b border-[#e5e5e5] px-8 py-4">
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-[#2a9d5c]">Showroom</span>
          <span className="text-[18px] font-bold text-[#111]">Offert: {quote.client}</span>
        </div>
        <button
          onClick={onClose}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#e5e5e5] text-[#999] hover:bg-[#f5f5f5] hover:text-[#555]"
          title="Stäng showroom"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="mx-auto max-w-[1100px] px-8 py-10">
        <div className="rounded-lg border border-[#e5e5e5]">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[#e5e5e5] bg-[#fafafa]">
                  <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wide text-[#999]">Artikel</th>
                  <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wide text-[#999]">Rabatt</th>
                  <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wide text-[#999]">Pris exkl. moms</th>
                  <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wide text-[#999]">Pris inkl. moms</th>
                  <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wide text-[#999]">Antal</th>
                  <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wide text-[#999]">Totalpris exkl. moms</th>
                  <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wide text-[#999]">Totalpris inkl. moms</th>
                </tr>
              </thead>
              <tbody>
                {quote.items.map((row) => {
                  if (row.custom) {
                    if (!row.description && !row.hasPrice) return null;
                    const priceIncl = Math.round(row.priceExcl * VAT_RATE);
                    return (
                      <tr key={row.id} className="border-b border-[#f0f0f0]">
                        <td className="px-5 py-4">
                          <p className="text-[13px] font-medium text-[#555]">{row.description || "Tilläggstjänst"}</p>
                        </td>
                        <td className="px-5 py-4 text-[13px] text-[#999]">—</td>
                        <td className="px-5 py-4 text-[13px] text-[#999]">{row.hasPrice ? `SEK ${fmt(row.priceExcl)}` : "—"}</td>
                        <td className="px-5 py-4 text-[13px] text-[#999]">{row.hasPrice ? `SEK ${fmt(priceIncl)}` : "—"}</td>
                        <td className="px-5 py-4 text-[13px] text-[#333]">{row.hasPrice ? row.qty : "—"}</td>
                        <td className="px-5 py-4 text-[13px] font-medium text-[#999]">{row.hasPrice ? `SEK ${fmt(row.priceExcl * row.qty)}` : "—"}</td>
                        <td className="px-5 py-4 text-[13px] font-medium text-[#999]">{row.hasPrice ? `SEK ${fmt(priceIncl * row.qty)}` : "—"}</td>
                      </tr>
                    );
                  }
                  const disc = discounts[`${quote.id}-${row.id}`] ?? 0;
                  const custExcl = Math.round(row.rrpExcl * (1 - disc / 100));
                  const custIncl = Math.round(custExcl * VAT_RATE);
                  return (
                    <tr key={row.id} className="border-b border-[#f0f0f0]">
                      <td className="px-5 py-4">
                        <p className="text-[13px] font-semibold text-[#111]">{row.name}</p>
                        <p className="text-[12px] text-[#999]">{row.article}</p>
                      </td>
                      <td className="px-5 py-4">
                        {disc > 0 ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e8f5e9] px-2.5 py-0.5 text-[12px] font-semibold text-[#2a7d4c]">
                            −{disc}%
                          </span>
                        ) : (
                          <span className="text-[13px] text-[#999]">—</span>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        {disc > 0 && (
                          <span className="mr-1.5 text-[12px] text-[#999] line-through">SEK {fmt(row.rrpExcl)}</span>
                        )}
                        <span className="text-[13px] text-[#333]">SEK {fmt(custExcl)}</span>
                      </td>
                      <td className="px-5 py-4">
                        {disc > 0 && (
                          <span className="mr-1.5 text-[12px] text-[#999] line-through">SEK {fmt(row.rrpIncl)}</span>
                        )}
                        <span className="text-[13px] text-[#333]">SEK {fmt(custIncl)}</span>
                      </td>
                      <td className="px-5 py-4 text-[13px] text-[#333]">{row.qty}</td>
                      <td className="px-5 py-4 text-[13px] font-medium text-[#111]">SEK {fmt(custExcl * row.qty)}</td>
                      <td className="px-5 py-4 text-[13px] font-medium text-[#111]">SEK {fmt(custIncl * row.qty)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {/* Total row */}
          <div className="flex items-center justify-end gap-8 border-t border-[#e5e5e5] bg-[#fafafa] px-5 py-3">
            <span className="text-[12px] font-semibold uppercase tracking-wide text-[#999]">Total</span>
            <span className="text-[13px] font-medium text-[#111]">
              SEK {fmt(quote.items.reduce((s, i) => {
                if (i.custom) return s + (i.hasPrice ? i.priceExcl * i.qty : 0);
                const disc = discounts[`${quote.id}-${i.id}`] ?? 0;
                return s + Math.round(i.rrpExcl * (1 - disc / 100)) * i.qty;
              }, 0))} exkl. moms
            </span>
            <span className="text-[13px] font-medium text-[#111]">
              SEK {fmt(quote.items.reduce((s, i) => {
                if (i.custom) return s + (i.hasPrice ? Math.round(i.priceExcl * VAT_RATE) * i.qty : 0);
                const disc = discounts[`${quote.id}-${i.id}`] ?? 0;
                const custExcl = Math.round(i.rrpExcl * (1 - disc / 100));
                return s + Math.round(custExcl * VAT_RATE) * i.qty;
              }, 0))} inkl. moms
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══ ICON BUTTONS ═══ */
const iconBtn = "flex h-8 w-8 items-center justify-center rounded text-[#bbb] transition-colors hover:bg-[#f5f5f5] hover:text-[#555]";

/* ═══ MAIN PAGE ═══ */
export default function OfferterPage() {
  const [quotes, setQuotes] = useState<Quote[]>(initialQuotes);
  const [quantities, setQuantities] = useState<Record<string, number>>(() => {
    const map: Record<string, number> = {};
    initialQuotes.forEach((q) => q.items.forEach((i) => { map[`${q.id}-${i.id}`] = i.qty; }));
    return map;
  });
  // Discount per item as percentage (0–maxMargin). Key: "quoteId-itemId"
  const [discounts, setDiscounts] = useState<Record<string, number>>({});
  const [addingTo, setAddingTo] = useState<string | null>(null);
  const [addMenuOpen, setAddMenuOpen] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [showroomQuote, setShowroomQuote] = useState<Quote | null>(null);
  const { showroom } = useShowroom();

  const updateQty = (quoteId: string, itemId: string, delta: number) => {
    const key = `${quoteId}-${itemId}`;
    setQuantities((prev) => ({ ...prev, [key]: Math.max(1, (prev[key] || 1) + delta) }));
  };

  const addItem = (quoteId: string, item: QuoteItem) => {
    setQuotes((prev) => prev.map((q) =>
      q.id === quoteId ? { ...q, items: [...q.items, item] } : q
    ));
    setQuantities((prev) => ({ ...prev, [`${quoteId}-${item.id}`]: item.qty }));
  };

  const addCustomRow = (quoteId: string) => {
    const row: CustomRow = {
      id: `custom-${Date.now()}`,
      custom: true,
      description: "",
      hasPrice: false,
      priceExcl: 0,
      qty: 1,
    };
    setQuotes((prev) => prev.map((q) =>
      q.id === quoteId ? { ...q, items: [...q.items, row] } : q
    ));
    setQuantities((prev) => ({ ...prev, [`${quoteId}-${row.id}`]: 1 }));
  };

  const updateCustomRow = (quoteId: string, rowId: string, updates: Partial<CustomRow>) => {
    setQuotes((prev) => prev.map((q) =>
      q.id === quoteId
        ? { ...q, items: q.items.map((i) => i.id === rowId && i.custom ? { ...i, ...updates } : i) }
        : q
    ));
  };

  const removeItem = (quoteId: string, itemId: string) => {
    setQuotes((prev) => prev.map((q) =>
      q.id === quoteId ? { ...q, items: q.items.filter((i) => i.id !== itemId) } : q
    ));
  };

  const deleteQuote = (quoteId: string) => {
    setQuotes((prev) => prev.filter((q) => q.id !== quoteId));
  };

  const createQuote = (clientName: string) => {
    const newQuote: Quote = { id: `q-${Date.now()}`, client: clientName, items: [] };
    setQuotes((prev) => [newQuote, ...prev]);
  };

  return (
    <div className="min-h-screen bg-white">
      <NavHeader />

      <main className="mx-auto max-w-[1280px] px-6 py-10">
        {/* ── Breadcrumb ── */}
        <Breadcrumb items={[
          { label: "Min verksamhet", href: "/nav-v2/min-verksamhet" },
          { label: "Offerter", href: "/nav-v2/offerter" },
        ]} />

        {/* Header */}
        <h1 className="mt-5 text-[26px] font-bold text-[#111]">Offerter</h1>
        <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-[#555]">
          Här hittar du alla dina skapade offerter. Skapa nya offerter, lägg till artiklar och
          öppna i showroom-läge för att visa kunden direkt i butiken.
        </p>

        {/* Create button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => setCreating(true)}
            className="inline-flex items-center gap-2 rounded-md border border-[#d0d0d0] bg-white px-5 py-2.5 text-[13px] font-semibold uppercase tracking-wide text-[#333] transition-colors hover:bg-[#f5f5f5]"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Skapa ny offert
          </button>
        </div>

        {/* Quotes list */}
        <div className="mt-8 space-y-10">
          {quotes.map((quote) => {
            const totalDealerExcl = quote.items.reduce((s, i) => {
              const qty = quantities[`${quote.id}-${i.id}`] || i.qty;
              return s + (i.custom ? (i.hasPrice ? i.priceExcl * qty : 0) : i.dealerExcl * qty);
            }, 0);
            const totalExcl = quote.items.reduce((s, i) => {
              const qty = quantities[`${quote.id}-${i.id}`] || i.qty;
              if (i.custom) return s + (i.hasPrice ? i.priceExcl * qty : 0);
              const disc = discounts[`${quote.id}-${i.id}`] ?? 0;
              return s + Math.round(i.rrpExcl * (1 - disc / 100)) * qty;
            }, 0);
            const totalIncl = quote.items.reduce((s, i) => {
              const qty = quantities[`${quote.id}-${i.id}`] || i.qty;
              if (i.custom) return s + (i.hasPrice ? Math.round(i.priceExcl * VAT_RATE) * qty : 0);
              const disc = discounts[`${quote.id}-${i.id}`] ?? 0;
              const custExcl = Math.round(i.rrpExcl * (1 - disc / 100));
              return s + Math.round(custExcl * VAT_RATE) * qty;
            }, 0);

            return (
              <div key={quote.id}>
                {/* Quote header */}
                <div className="flex items-center justify-between">
                  <h2 className="text-[18px] font-bold text-[#111]">Offert: {quote.client}</h2>
                  <div className="flex items-center gap-1">
                    {/* Edit */}
                    <button className={iconBtn} title="Redigera offertnamn">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </button>
                    {/* Showroom (eye) */}
                    <button
                      className={iconBtn}
                      title="Öppna i showroom"
                      onClick={() => setShowroomQuote(quote)}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </button>
                    {/* Download */}
                    <button className={iconBtn} title="Ladda ned PDF">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                      </svg>
                    </button>
                    {/* Add — single button with dropdown */}
                    <div className="relative">
                      <button
                        className={iconBtn}
                        title="Lägg till"
                        onClick={() => setAddMenuOpen(addMenuOpen === quote.id ? null : quote.id)}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                      </button>
                      {addMenuOpen === quote.id && (
                        <div className="absolute right-0 top-full z-30 mt-1 w-56 rounded-lg border border-[#e5e5e5] bg-white py-1 shadow-lg">
                          <button
                            className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-[13px] text-[#333] transition-colors hover:bg-[#f5f5f5]"
                            onClick={() => { setAddingTo(quote.id); setAddMenuOpen(null); }}
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="2" y="3" width="20" height="18" rx="2" />
                              <path d="M8 7v10M12 7v10M16 7v4" />
                            </svg>
                            Artikel från katalog
                          </button>
                          <button
                            className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-[13px] text-[#333] transition-colors hover:bg-[#f5f5f5]"
                            onClick={() => { addCustomRow(quote.id); setAddMenuOpen(null); }}
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
                            </svg>
                            Fri rad (tjänst / text)
                          </button>
                        </div>
                      )}
                    </div>
                    {/* Delete */}
                    <button
                      className="flex h-8 w-8 items-center justify-center rounded text-[#bbb] transition-colors hover:bg-[#fce8e8] hover:text-[#c44]"
                      title="Ta bort offert"
                      onClick={() => deleteQuote(quote.id)}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Table */}
                <div className="mt-3 rounded-lg border border-[#e5e5e5]">
                  {quote.items.length === 0 ? (
                    <div className="px-6 py-10 text-center">
                      <p className="text-[14px] text-[#999]">Inga artiklar ännu.</p>
                      <button
                        onClick={() => setAddingTo(quote.id)}
                        className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-medium text-[#1565c0] hover:underline"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                        Lägg till första artikeln
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left">
                          <thead>
                            <tr className="border-b border-[#e5e5e5] bg-[#fafafa]">
                              <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wide text-[#999]">Artikel</th>
                              {!showroom && (
                                <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wide text-[#999]">Nettopris</th>
                              )}
                              <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wide text-[#999]">
                                {showroom ? "Pris exkl. moms" : "RRP exkl. moms"}
                              </th>
                              <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wide text-[#999]">
                                {showroom ? "Pris inkl. moms" : "RRP inkl. moms"}
                              </th>
                              {!showroom && (
                                <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wide text-[#999]">Rabatt</th>
                              )}
                              <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wide text-[#999]">Antal</th>
                              {!showroom && (
                                <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wide text-[#999]">Totalt netto</th>
                              )}
                              <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wide text-[#999]">Totalpris exkl. moms</th>
                              <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wide text-[#999]">Totalpris inkl. moms</th>
                              <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wide text-[#999]">Kommentar</th>
                              <th className="w-10 py-3" />
                            </tr>
                          </thead>
                          <tbody>
                            {quote.items.map((row) => {
                              const qty = quantities[`${quote.id}-${row.id}`] || row.qty;

                              /* ── Custom / free-text row ── */
                              if (row.custom) {
                                const colCount = showroom ? 7 : 10;
                                const priceIncl = Math.round(row.priceExcl * VAT_RATE);
                                return (
                                  <tr key={row.id} className="border-b border-[#f0f0f0] bg-[#fffef5] transition-colors hover:bg-[#fefcec]">
                                    {/* Description — spans the article + price columns */}
                                    <td colSpan={showroom ? 3 : 5} className="px-5 py-4">
                                      <div className="flex items-center gap-3">
                                        <span className="shrink-0 rounded bg-[#fff3e0] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#b8860b]">Fri rad</span>
                                        <input
                                          type="text"
                                          value={row.description}
                                          onChange={(e) => updateCustomRow(quote.id, row.id, { description: e.target.value })}
                                          placeholder="T.ex. Installation, utkörning, rådgivning..."
                                          className="flex-1 rounded border border-[#e5e5e5] bg-white px-3 py-1.5 text-[13px] text-[#333] placeholder:text-[#bbb] focus:border-[#999] focus:outline-none"
                                        />
                                      </div>
                                      {/* Price toggle */}
                                      <label className="mt-2 inline-flex items-center gap-2 cursor-pointer">
                                        <input
                                          type="checkbox"
                                          checked={row.hasPrice}
                                          onChange={(e) => updateCustomRow(quote.id, row.id, { hasPrice: e.target.checked })}
                                          className="h-3.5 w-3.5 rounded border-[#d0d0d0] accent-[#273A60]"
                                        />
                                        <span className="text-[11px] text-[#888]">Lägg till pris</span>
                                        {row.hasPrice && (
                                          <input
                                            type="number"
                                            value={row.priceExcl ? row.priceExcl / 100 : ""}
                                            onChange={(e) => updateCustomRow(quote.id, row.id, { priceExcl: Math.round(parseFloat(e.target.value || "0") * 100) })}
                                            placeholder="SEK exkl. moms"
                                            className="ml-1 w-32 rounded border border-[#e5e5e5] bg-white px-2 py-1 text-[12px] text-[#333] focus:border-[#999] focus:outline-none"
                                          />
                                        )}
                                      </label>
                                    </td>
                                    {/* Qty */}
                                    <td className="px-5 py-4">
                                      {row.hasPrice && (
                                        <div className="inline-flex items-center rounded border border-[#d0d0d0]">
                                          <button onClick={() => updateQty(quote.id, row.id, -1)} className="flex h-8 w-7 items-center justify-center text-[#999] hover:bg-[#f5f5f5] hover:text-[#333]">−</button>
                                          <span className="flex h-8 w-8 items-center justify-center border-x border-[#d0d0d0] text-[13px] font-medium text-[#111]">{qty}</span>
                                          <button onClick={() => updateQty(quote.id, row.id, 1)} className="flex h-8 w-7 items-center justify-center text-[#999] hover:bg-[#f5f5f5] hover:text-[#333]">+</button>
                                        </div>
                                      )}
                                    </td>
                                    {/* Totals — dealer netto hidden in showroom */}
                                    {!showroom && (
                                      <td className="px-5 py-4 text-[13px] text-[#999]">
                                        {row.hasPrice ? `SEK ${fmt(row.priceExcl * qty)}` : "—"}
                                      </td>
                                    )}
                                    <td className="px-5 py-4 text-[13px] text-[#999]">
                                      {row.hasPrice ? `SEK ${fmt(row.priceExcl * qty)}` : "—"}
                                    </td>
                                    <td className="px-5 py-4 text-[13px] text-[#999]">
                                      {row.hasPrice ? `SEK ${fmt(priceIncl * qty)}` : "—"}
                                    </td>
                                    {/* Comment — empty for custom rows */}
                                    <td className="px-5 py-4" />
                                    {/* Delete */}
                                    <td className="py-4 pr-4">
                                      <button
                                        onClick={() => removeItem(quote.id, row.id)}
                                        className="flex h-7 w-7 items-center justify-center rounded text-[#ccc] transition-colors hover:bg-[#fce8e8] hover:text-[#c44]"
                                        title="Ta bort"
                                      >
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                          <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                                        </svg>
                                      </button>
                                    </td>
                                  </tr>
                                );
                              }

                              /* ── Regular product row ── */
                              const item = row;
                              const discKey = `${quote.id}-${item.id}`;
                              const maxDiscount = Math.round((1 - item.dealerExcl / item.rrpExcl) * 100);
                              const discount = discounts[discKey] ?? 0;
                              // Customer price = RRP minus discount
                              const custExcl = Math.round(item.rrpExcl * (1 - discount / 100));
                              const custIncl = Math.round(custExcl * VAT_RATE);
                              return (
                                <tr key={item.id} className="border-b border-[#f0f0f0] transition-colors hover:bg-[#fafafa]">
                                  <td className="px-5 py-4">
                                    <p className="text-[13px] font-semibold text-[#111]">{item.name}</p>
                                    <p className="text-[12px] text-[#999]">{item.article}</p>
                                  </td>
                                  {!showroom && (
                                    <td className="px-5 py-4 text-[13px] text-[#333]">SEK {fmt(item.dealerExcl)}</td>
                                  )}
                                  <td className="px-5 py-4 text-[13px] text-[#333]">
                                    SEK {fmt(showroom ? custExcl : item.rrpExcl)}
                                  </td>
                                  <td className="px-5 py-4 text-[13px] text-[#333]">
                                    SEK {fmt(showroom ? custIncl : item.rrpIncl)}
                                  </td>
                                  {!showroom && (
                                    <td className="px-5 py-4">
                                      <div className="flex items-center gap-1">
                                        <input
                                          type="number"
                                          min={0}
                                          max={maxDiscount}
                                          value={discount}
                                          onChange={(e) => {
                                            const v = Math.min(maxDiscount, Math.max(0, parseInt(e.target.value) || 0));
                                            setDiscounts((prev) => ({ ...prev, [discKey]: v }));
                                          }}
                                          className="w-14 rounded border border-[#e5e5e5] bg-white px-2 py-1 text-center text-[13px] text-[#333] focus:border-[#999] focus:outline-none"
                                        />
                                        <span className="text-[12px] text-[#999]">%</span>
                                        <span className="text-[10px] text-[#bbb]">(max {maxDiscount}%)</span>
                                      </div>
                                    </td>
                                  )}
                                  <td className="px-5 py-4">
                                    <div className="inline-flex items-center rounded border border-[#d0d0d0]">
                                      <button
                                        onClick={() => updateQty(quote.id, item.id, -1)}
                                        className="flex h-8 w-7 items-center justify-center text-[#999] hover:bg-[#f5f5f5] hover:text-[#333]"
                                      >
                                        −
                                      </button>
                                      <span className="flex h-8 w-8 items-center justify-center border-x border-[#d0d0d0] text-[13px] font-medium text-[#111]">
                                        {qty}
                                      </span>
                                      <button
                                        onClick={() => updateQty(quote.id, item.id, 1)}
                                        className="flex h-8 w-7 items-center justify-center text-[#999] hover:bg-[#f5f5f5] hover:text-[#333]"
                                      >
                                        +
                                      </button>
                                    </div>
                                  </td>
                                  {!showroom && (
                                    <td className="px-5 py-4 text-[13px] font-medium text-[#111]">
                                      SEK {fmt(item.dealerExcl * qty)}
                                    </td>
                                  )}
                                  <td className="px-5 py-4 text-[13px] font-medium text-[#111]">
                                    SEK {fmt(custExcl * qty)}
                                  </td>
                                  <td className="px-5 py-4 text-[13px] font-medium text-[#111]">
                                    SEK {fmt(custIncl * qty)}
                                  </td>
                                  <td className="px-5 py-4">
                                    <input
                                      type="text"
                                      defaultValue={item.comment}
                                      placeholder=""
                                      className="w-full min-w-[120px] rounded border border-[#e5e5e5] bg-white px-3 py-1.5 text-[12px] text-[#333] focus:border-[#999] focus:outline-none"
                                    />
                                  </td>
                                  <td className="py-4 pr-4">
                                    <button
                                      onClick={() => removeItem(quote.id, item.id)}
                                      className="flex h-7 w-7 items-center justify-center rounded text-[#ccc] transition-colors hover:bg-[#fce8e8] hover:text-[#c44]"
                                      title="Ta bort"
                                    >
                                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                        <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                                      </svg>
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>

                      {/* Total row */}
                      <div className="flex items-center justify-end gap-8 border-t border-[#e5e5e5] bg-[#fafafa] px-5 py-3">
                        <span className="text-[12px] font-semibold uppercase tracking-wide text-[#999]">Total</span>
                        {!showroom && (
                          <span className="text-[13px] font-medium text-[#111]">
                            SEK {fmt(totalDealerExcl)} netto
                          </span>
                        )}
                        <span className="text-[13px] font-medium text-[#111]">
                          SEK {fmt(totalExcl)} exkl. moms
                        </span>
                        <span className="text-[13px] font-medium text-[#111]">
                          SEK {fmt(totalIncl)} inkl. moms
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Modals */}
      {addingTo && (
        <AddArticleModal
          onAdd={(item) => addItem(addingTo, item)}
          onClose={() => setAddingTo(null)}
        />
      )}
      {creating && (
        <CreateQuoteModal
          onCreate={createQuote}
          onClose={() => setCreating(false)}
        />
      )}
      {showroomQuote && (
        <ShowroomView
          quote={{
            ...showroomQuote,
            items: showroomQuote.items.map((i) => ({
              ...i,
              qty: quantities[`${showroomQuote.id}-${i.id}`] || i.qty,
            })),
          }}
          discounts={discounts}
          onClose={() => setShowroomQuote(null)}
        />
      )}
    </div>
  );
}
