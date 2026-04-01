"use client";

import { useState } from "react";
import NavHeader from "../NavHeader";
import { useCart } from "../CartContext";

function formatPrice(cents: number) {
  return (cents / 100).toLocaleString("sv-SE", { minimumFractionDigits: 2 }) + " kr";
}

export default function VarukorgPage() {
  const { carts, createCart, removeFromCart, updateQuantity } = useCart();
  const [activeCartId, setActiveCartId] = useState(carts[0]?.id ?? "");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [showTip, setShowTip] = useState(true);
  const [newCartName, setNewCartName] = useState("");
  const [showNewCart, setShowNewCart] = useState(false);

  const cart = carts.find((c) => c.id === activeCartId) ?? carts[0];
  const items = cart?.items ?? [];

  const toggleSelect = (articleNr: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(articleNr)) next.delete(articleNr);
      else next.add(articleNr);
      return next;
    });
  };

  const toggleAll = () => {
    if (selected.size === items.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(items.map((i) => i.articleNr)));
    }
  };

  const totalNet = items.reduce((sum, item) => sum + (item.netPrice ?? 0) * item.qty, 0);

  function handleCreateCart() {
    if (newCartName.trim()) {
      const id = createCart(newCartName.trim());
      setActiveCartId(id);
      setNewCartName("");
      setShowNewCart(false);
      setSelected(new Set());
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <NavHeader />

      <main className="mx-auto max-w-[1280px] px-4 sm:px-6 py-6 sm:py-10">
        {/* ═══ HEADER ═══ */}
        <div className="flex flex-wrap items-start gap-3">
          <h1 className="text-[22px] sm:text-[26px] font-bold text-[#111]">Din varukorg</h1>
          <span className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-[#e3f2fd] px-3 py-1 text-[12px] font-medium text-[#1565c0]">
            {carts.length} varukorgar
          </span>
        </div>

        <p className="mt-3 max-w-3xl text-[13px] sm:text-[14px] leading-relaxed text-[#555]">
          Här hittar du alla dina varor som du har lagt till i olika varukorgar. Du kan ändra kvantitet,
          välja rader och ta dem till kassan.
        </p>

        {/* ═══ TIP BOX ═══ */}
        {showTip && (
          <div className="relative mt-5 rounded-lg border-l-4 border-[#90caf9] bg-[#e8f4fd] px-5 py-4">
            <button
              onClick={() => setShowTip(false)}
              className="absolute right-4 top-4 text-[#999] transition-colors hover:text-[#555]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            <p className="text-[13px] font-bold uppercase tracking-wide text-[#333]">Tips</p>
            <p className="mt-1 text-[13px] leading-relaxed text-[#555]">
              Markera artiklar för att flytta, ta bort eller gå till kassan med utvalda rader.
            </p>
          </div>
        )}

        {/* ═══ CART TABS ═══ */}
        <div className="mt-6 flex flex-wrap items-center gap-2">
          {carts.map((c) => (
            <button
              key={c.id}
              onClick={() => { setActiveCartId(c.id); setSelected(new Set()); }}
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-semibold transition-all ${
                activeCartId === c.id
                  ? "bg-[#273A60] text-white"
                  : "bg-white text-[#555] border border-[#d0d0d0] hover:bg-[#f5f5f5]"
              }`}
            >
              {c.name}
              {c.items.length > 0 && (
                <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                  activeCartId === c.id ? "bg-white/20 text-white" : "bg-[#e5e5e5] text-[#888]"
                }`}>
                  {c.items.length}
                </span>
              )}
            </button>
          ))}
          <button
            onClick={() => setShowNewCart(true)}
            className="flex items-center gap-1.5 rounded-full border border-dashed border-[#d0d0d0] px-4 py-2 text-[13px] font-semibold text-[#888] transition-colors hover:border-[#273A60] hover:text-[#273A60]"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M8 3v10M3 8h10" />
            </svg>
            Ny varukorg
          </button>
        </div>

        {/* New cart input */}
        {showNewCart && (
          <div className="mt-3 flex items-center gap-2">
            <input
              type="text"
              value={newCartName}
              onChange={(e) => setNewCartName(e.target.value)}
              placeholder="Namn på ny varukorg..."
              autoFocus
              onKeyDown={(e) => e.key === "Enter" && handleCreateCart()}
              className="h-9 w-64 rounded-lg border border-[#d0d0d0] px-3 text-[13px] text-[#333] placeholder-[#aaa] focus:border-[#273A60] focus:outline-none"
            />
            <button onClick={handleCreateCart} className="rounded-lg bg-[#273A60] px-4 py-2 text-[12px] font-semibold text-white hover:bg-[#1a2d4d]">
              Skapa
            </button>
            <button onClick={() => { setShowNewCart(false); setNewCartName(""); }} className="text-[12px] text-[#999] hover:text-[#555]">
              Avbryt
            </button>
          </div>
        )}

        {/* ═══ CART CONTENT ═══ */}
        {cart && (
          <div className="mt-6 rounded-lg border border-[#e5e5e5] bg-white">
            {/* Cart header */}
            <div className="flex items-center justify-between border-b border-[#e5e5e5] px-5 sm:px-6 py-4">
              <h2 className="text-[16px] sm:text-[18px] font-semibold text-[#111]">{cart.name}</h2>
              <span className="text-[12px] text-[#999]">{items.length} artiklar</span>
            </div>

            {items.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <p className="text-[14px] text-[#999]">Varukorgen är tom</p>
                <p className="mt-1 text-[12px] text-[#ccc]">Lägg till produkter via produktkatalogen</p>
              </div>
            ) : (
              <>
                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[700px] text-left">
                    <thead>
                      <tr className="border-b border-[#e5e5e5] bg-[#fafafa]">
                        <th className="w-10 px-4 py-3">
                          <input
                            type="checkbox"
                            checked={selected.size === items.length && items.length > 0}
                            onChange={toggleAll}
                            className="h-4 w-4 rounded border-[#d0d0d0] accent-[#273A60]"
                          />
                        </th>
                        <th className="px-3 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#999]">Produkt</th>
                        <th className="px-3 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#999]">Art.nr</th>
                        <th className="px-3 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#999] text-center">Antal</th>
                        <th className="px-3 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#999]">Lager</th>
                        <th className="px-3 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#999] text-right">Nettopris</th>
                        <th className="px-3 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#999]">Kommentar</th>
                        <th className="w-10 px-3 py-3" />
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f0f0f0]">
                      {items.map((item) => (
                        <tr key={item.articleNr} className={`transition-colors hover:bg-[#fafafa] ${selected.has(item.articleNr) ? "bg-[#f0f3f8]" : ""}`}>
                          <td className="px-4 py-3">
                            <input
                              type="checkbox"
                              checked={selected.has(item.articleNr)}
                              onChange={() => toggleSelect(item.articleNr)}
                              className="h-4 w-4 rounded border-[#d0d0d0] accent-[#273A60]"
                            />
                          </td>
                          <td className="px-3 py-3">
                            <span className="text-[13px] font-semibold text-[#111]">{item.name}</span>
                            {item.variant && <span className="mt-0.5 block text-[11px] text-[#888]">{item.variant}</span>}
                          </td>
                          <td className="px-3 py-3">
                            <span className="text-[12px] font-mono text-[#555]">{item.articleNr}</span>
                          </td>
                          <td className="px-3 py-3">
                            <div className="flex items-center justify-center gap-0">
                              <button
                                onClick={() => updateQuantity(cart.id, item.articleNr, Math.max(1, item.qty - 1))}
                                className="flex h-8 w-8 items-center justify-center rounded-l-lg border border-[#d0d0d0] text-[#555] hover:bg-[#f5f5f5]"
                              >
                                −
                              </button>
                              <span className="flex h-8 w-10 items-center justify-center border-y border-[#d0d0d0] text-[13px] font-semibold text-[#111]">
                                {item.qty}
                              </span>
                              <button
                                onClick={() => updateQuantity(cart.id, item.articleNr, item.qty + 1)}
                                className="flex h-8 w-8 items-center justify-center rounded-r-lg border border-[#d0d0d0] text-[#555] hover:bg-[#f5f5f5]"
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="px-3 py-3">
                            {item.inStock !== false ? (
                              <span className="flex items-center gap-1.5 text-[11px] font-semibold text-[#2e7d32]">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#2e7d32]" />
                                I lager
                              </span>
                            ) : (
                              <span className="flex items-center gap-1.5 text-[11px] font-semibold text-[#999]">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#ccc]" />
                                Ej i lager
                              </span>
                            )}
                          </td>
                          <td className="px-3 py-3 text-right">
                            {item.netPrice ? (
                              <span className="text-[13px] font-semibold text-[#111]">{formatPrice(item.netPrice * item.qty)}</span>
                            ) : (
                              <span className="text-[12px] text-[#ccc]">—</span>
                            )}
                          </td>
                          <td className="px-3 py-3">
                            <span className="text-[12px] text-[#888]">{item.comment || "—"}</span>
                          </td>
                          <td className="px-3 py-3">
                            <button
                              onClick={() => removeFromCart(cart.id, item.articleNr)}
                              className="flex h-7 w-7 items-center justify-center rounded text-[#ccc] transition-colors hover:bg-[#fce8e8] hover:text-[#c44]"
                              title="Ta bort"
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between border-t border-[#e5e5e5] px-5 sm:px-6 py-4">
                  <p className="text-[13px] font-medium text-[#1565c0]">{items.length} rader totalt</p>
                  {totalNet > 0 && (
                    <p className="text-[15px] font-semibold text-[#111]">{formatPrice(totalNet)}</p>
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {/* ═══ BULK ACTION BAR ═══ */}
        {selected.size > 0 && (
          <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#e5e5e5] bg-white shadow-[0_-4px_16px_rgba(0,0,0,.08)]">
            <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-3">
              <p className="text-[13px] text-[#555]">
                <strong className="text-[#111]">{selected.size}</strong> artikel{selected.size > 1 ? "ar" : ""} markerade
              </p>
              <div className="flex items-center gap-3">
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
