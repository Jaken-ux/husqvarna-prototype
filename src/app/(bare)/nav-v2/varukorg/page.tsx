"use client";

import { useState } from "react";
import NavHeader from "../NavHeader";

/* ═══ CART DATA ═══ */
const carts = [
  {
    id: "cart-1",
    name: "Vårorder 2026",
    items: [
      {
        id: "967 86 19-03",
        name: "Husqvarna 120 Mark II",
        variant: '120 Mark II (14" - 3/8" mini - S93G)',
        line: "Golden",
        netPrice: 164938,
        rrp: 199200,
        discount: 17.2,
        qty: 1,
        availability: { date: "26-06-02", status: "info" as const },
        comment: "Test QA 1 line",
      },
      {
        id: "967 29 61-01",
        name: "Automower 430X NERA",
        variant: "430X NERA",
        line: "Platinum",
        netPrice: 2199900,
        rrp: 2999000,
        discount: 26.7,
        qty: 2,
        availability: { date: "I lager", status: "ok" as const },
        comment: "",
      },
      {
        id: "970 51 68-01",
        name: "Husqvarna 535i XP",
        variant: "535i XP (utan batteri/laddare)",
        line: "Professional",
        netPrice: 549900,
        rrp: 699000,
        discount: 21.3,
        qty: 1,
        availability: { date: "26-04-15", status: "warning" as const },
        comment: "",
      },
    ],
  },
];

function formatPrice(cents: number) {
  return (cents / 100).toLocaleString("sv-SE", { minimumFractionDigits: 2 }) + " kr";
}

export default function VarukorgPage() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [quantities, setQuantities] = useState<Record<string, number>>(
    Object.fromEntries(carts[0].items.map((item) => [item.id, item.qty]))
  );
  const [showTip, setShowTip] = useState(true);

  const cart = carts[0];

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (selected.size === cart.items.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(cart.items.map((i) => i.id)));
    }
  };

  const updateQty = (id: string, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta),
    }));
  };

  const totalNet = cart.items.reduce(
    (sum, item) => sum + item.netPrice * (quantities[item.id] || item.qty),
    0
  );

  const totalRows = cart.items.length;

  return (
    <div className="min-h-screen bg-white">
      <NavHeader />

      <main className="mx-auto max-w-[1280px] px-6 py-10">
        {/* ═══ HEADER ═══ */}
        <div className="flex flex-wrap items-start gap-3">
          <h1 className="text-[26px] font-bold text-[#111]">Din varukorg</h1>
          <span className="mt-1.5 inline-flex items-center gap-1.5 rounded-full bg-[#e3f2fd] px-3 py-1 text-[12px] font-medium text-[#1565c0]">
            <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Flera varukorgar
          </span>
        </div>

        <p className="mt-3 max-w-3xl text-[14px] leading-relaxed text-[#555]">
          Här hittar du alla dina varor som du har lagt till i olika varukorgar. Du kan lägga till kommentarer,
          ändra kvantitet, välja rader och ta dem till kassan. Eller ta bort enskilda rader från varukorgen.
        </p>

        {/* ═══ TIP BOX ═══ */}
        {showTip && (
          <div className="relative mt-5 rounded-lg border-l-4 border-[#90caf9] bg-[#e8f4fd] px-5 py-4">
            <button
              onClick={() => setShowTip(false)}
              className="absolute right-4 top-4 text-[#999] transition-colors hover:text-[#555]"
              aria-label="Stäng tips"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            <p className="text-[13px] font-bold uppercase tracking-wide text-[#333]">Visste du?</p>
            <p className="mt-1 text-[13px] leading-relaxed text-[#555]">
              När du markerar en eller flera artiklar i din varukorg aktiveras sidfoten och låter dig:
            </p>
            <ul className="mt-1 list-inside text-[13px] leading-relaxed text-[#555]">
              <li>• Flytta utvalda artiklar till en annan varukorg;</li>
              <li>• Ta bort flera artiklar på en gång;</li>
              <li>• Gå direkt till kassan med endast utvalda artiklar.</li>
            </ul>
            <p className="mt-1 text-[13px] leading-relaxed text-[#555]">
              Markera helt enkelt rutorna bredvid produkterna du vill hantera och använd sedan alternativen
              i sidfoten för att spara tid och organisera din varukorg mer effektivt.
            </p>
          </div>
        )}

        {/* ═══ ACTION BUTTONS ═══ */}
        <div className="mt-6 flex flex-wrap gap-3">
          <button className="inline-flex items-center gap-2 rounded-md border border-[#d0d0d0] bg-white px-5 py-2.5 text-[13px] font-semibold uppercase tracking-wide text-[#333] transition-colors hover:bg-[#f5f5f5]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
            </svg>
            Ladda upp order
          </button>
          <button className="inline-flex items-center gap-2 rounded-md border border-[#d0d0d0] bg-white px-5 py-2.5 text-[13px] font-semibold uppercase tracking-wide text-[#333] transition-colors hover:bg-[#f5f5f5]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Skapa ny varukorg
          </button>
        </div>

        {/* ═══ CART SECTION ═══ */}
        <div className="mt-8 rounded-lg border border-[#e5e5e5] bg-white">
          {/* Cart name + actions */}
          <div className="flex items-center justify-between border-b border-[#e5e5e5] px-6 pb-4 pt-5">
            <h2 className="text-[18px] font-semibold text-[#111]">{cart.name}</h2>
            <div className="flex items-center gap-2">
              {/* Edit */}
              <button className="flex h-8 w-8 items-center justify-center rounded text-[#999] transition-colors hover:bg-[#f5f5f5] hover:text-[#555]" title="Redigera namn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </button>
              {/* Add */}
              <button className="flex h-8 w-8 items-center justify-center rounded text-[#999] transition-colors hover:bg-[#f5f5f5] hover:text-[#555]" title="Lägg till artikel">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </button>
              {/* Delete */}
              <button className="flex h-8 w-8 items-center justify-center rounded text-[#999] transition-colors hover:bg-[#f5f5f5] hover:text-[#c44]" title="Ta bort varukorg">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                </svg>
              </button>
            </div>
          </div>

          {/* ═══ TABLE ═══ */}
          <div className="overflow-x-auto px-6 pt-4">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[#e5e5e5]">
                  <th className="w-10 pb-3 pr-2">
                    <input
                      type="checkbox"
                      checked={selected.size === cart.items.length}
                      onChange={toggleAll}
                      className="h-4 w-4 rounded border-[#d0d0d0] accent-[#273A60]"
                    />
                  </th>
                  <th className="pb-3 pr-4 text-[11px] font-semibold uppercase tracking-wide text-[#999]">Art. nr</th>
                  <th className="pb-3 pr-4 text-[11px] font-semibold uppercase tracking-wide text-[#999]">Nettopris</th>
                  <th className="pb-3 pr-4 text-[11px] font-semibold uppercase tracking-wide text-[#999]">
                    <span className="hidden sm:inline">Rekommenderat</span> cirkapris
                  </th>
                  <th className="pb-3 pr-4 text-[11px] font-semibold uppercase tracking-wide text-[#999]">Rabatt</th>
                  <th className="pb-3 pr-4 text-[11px] font-semibold uppercase tracking-wide text-[#999]">Antal</th>
                  <th className="pb-3 pr-4 text-[11px] font-semibold uppercase tracking-wide text-[#999]">Totalt nettopris</th>
                  <th className="pb-3 pr-4 text-[11px] font-semibold uppercase tracking-wide text-[#999]">Tillgänglighet</th>
                  <th className="pb-3 pr-4 text-[11px] font-semibold uppercase tracking-wide text-[#999]">Kommentar</th>
                  <th className="w-10 pb-3" />
                </tr>
              </thead>
              <tbody>
                {cart.items.map((item) => {
                  const qty = quantities[item.id] || item.qty;
                  return (
                    <tr key={item.id} className="border-b border-[#f0f0f0] transition-colors hover:bg-[#fafafa]">
                      {/* Checkbox */}
                      <td className="py-4 pr-2">
                        <input
                          type="checkbox"
                          checked={selected.has(item.id)}
                          onChange={() => toggleSelect(item.id)}
                          className="h-4 w-4 rounded border-[#d0d0d0] accent-[#273A60]"
                        />
                      </td>

                      {/* Art. nr + product info */}
                      <td className="py-4 pr-4">
                        <div className="flex items-center gap-1.5">
                          <a href="#" className="text-[13px] font-medium text-[#1565c0] underline decoration-[#1565c0]/30 hover:decoration-[#1565c0]">
                            {item.id}
                          </a>
                          <button className="text-[#bbb] hover:text-[#888]" title="Kopiera">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                              <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                            </svg>
                          </button>
                        </div>
                        <div className="mt-2">
                          <p className="text-[12px] text-[#999]">{item.line}</p>
                          <p className="text-[13px] font-semibold text-[#111]">{item.name}</p>
                          <p className="text-[12px] text-[#888]">{item.variant}</p>
                        </div>
                      </td>

                      {/* Nettopris */}
                      <td className="py-4 pr-4 text-[13px] text-[#333]">
                        {formatPrice(item.netPrice)}
                      </td>

                      {/* Cirkapris */}
                      <td className="py-4 pr-4 text-[13px] text-[#333]">
                        {formatPrice(item.rrp)}
                      </td>

                      {/* Rabatt */}
                      <td className="py-4 pr-4 text-[13px] text-[#333]">
                        {item.discount}%
                      </td>

                      {/* Antal */}
                      <td className="py-4 pr-4">
                        <div className="inline-flex items-center rounded border border-[#d0d0d0]">
                          <button
                            onClick={() => updateQty(item.id, -1)}
                            className="flex h-8 w-8 items-center justify-center text-[#999] transition-colors hover:bg-[#f5f5f5] hover:text-[#333]"
                          >
                            −
                          </button>
                          <span className="flex h-8 w-8 items-center justify-center border-x border-[#d0d0d0] text-[13px] font-medium text-[#111]">
                            {qty}
                          </span>
                          <button
                            onClick={() => updateQty(item.id, 1)}
                            className="flex h-8 w-8 items-center justify-center text-[#999] transition-colors hover:bg-[#f5f5f5] hover:text-[#333]"
                          >
                            +
                          </button>
                        </div>
                      </td>

                      {/* Totalt nettopris */}
                      <td className="py-4 pr-4 text-[13px] font-medium text-[#111]">
                        {formatPrice(item.netPrice * qty)}
                      </td>

                      {/* Tillgänglighet */}
                      <td className="py-4 pr-4">
                        <div className="inline-flex items-center gap-1.5">
                          <span
                            className={`flex h-4 w-4 items-center justify-center rounded-full text-white ${
                              item.availability.status === "ok"
                                ? "bg-[#2a9d5c]"
                                : item.availability.status === "warning"
                                ? "bg-[#e6a817]"
                                : "bg-[#ff6b00]"
                            }`}
                          >
                            {item.availability.status === "ok" ? (
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                                <path d="M20 6L9 17l-5-5" />
                              </svg>
                            ) : (
                              <span className="text-[9px] font-bold">i</span>
                            )}
                          </span>
                          <span className="text-[12px] text-[#555]">{item.availability.date}</span>
                          <button className="text-[#bbb] hover:text-[#888]" title="Mer info">
                            <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      </td>

                      {/* Kommentar */}
                      <td className="py-4 pr-4">
                        <input
                          type="text"
                          defaultValue={item.comment}
                          placeholder="Lägg till kommentar..."
                          className="w-full min-w-[140px] rounded border border-[#e5e5e5] bg-[#fafafa] px-3 py-1.5 text-[12px] text-[#333] placeholder:text-[#ccc] focus:border-[#999] focus:outline-none"
                        />
                      </td>

                      {/* Delete */}
                      <td className="py-4">
                        <button className="flex h-7 w-7 items-center justify-center rounded text-[#ccc] transition-colors hover:bg-[#fce8e8] hover:text-[#c44]" title="Ta bort">
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

          {/* ═══ TABLE FOOTER ═══ */}
          <div className="mx-6 flex items-center justify-between border-t border-[#e5e5e5] pb-5 pt-4">
            <p className="text-[13px] font-medium text-[#1565c0]">
              {totalRows} rader totalt
            </p>
            <p className="text-[15px] font-semibold text-[#111]">
              {formatPrice(totalNet)}
            </p>
          </div>
        </div>

        {/* ═══ BULK ACTION BAR (shown when items selected) ═══ */}
        {selected.size > 0 && (
          <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#e5e5e5] bg-white shadow-[0_-4px_16px_rgba(0,0,0,.08)]">
            <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-3">
              <p className="text-[13px] text-[#555]">
                <strong className="text-[#111]">{selected.size}</strong> artikel{selected.size > 1 ? "ar" : ""} markerade
              </p>
              <div className="flex items-center gap-3">
                <button className="rounded-md border border-[#d0d0d0] px-4 py-2 text-[12px] font-medium text-[#333] transition-colors hover:bg-[#f5f5f5]">
                  Flytta till annan varukorg
                </button>
                <button className="rounded-md border border-[#c44] px-4 py-2 text-[12px] font-medium text-[#c44] transition-colors hover:bg-[#fce8e8]">
                  Ta bort markerade
                </button>
                <button className="rounded-md bg-[#273A60] px-5 py-2 text-[12px] font-semibold text-white transition-colors hover:bg-[#1a2d4d]">
                  Till kassan →
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
