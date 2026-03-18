"use client";

import { useState, Fragment } from "react";
import NavHeader from "../../NavHeader";
import Breadcrumb from "../../Breadcrumb";

/* ═══════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════ */

type Priority = "high" | "medium" | "low";
type ItemStatus = "in-stock" | "low-stock" | "out-of-stock" | "discontinued";

type WishlistItem = {
  id: string;
  articleNr: string;
  name: string;
  category: string;
  rrpExcl: number;
  status: ItemStatus;
  qty: number;
  addedDate: string;
  addedBy: string;
  priority: Priority;
  note?: string;
  customerIntent?: string;
};

type WishlistGroup = {
  id: string;
  name: string;
  customer?: string;
  created: string;
  items: WishlistItem[];
};

/* ═══════════════════════════════════════════════════════
   MOCK DATA
   ═══════════════════════════════════════════════════════ */

const wishlistGroups: WishlistGroup[] = [
  {
    id: "wl-1",
    name: "Vårbeställning 2026",
    customer: "Landskapet Trädgård AB",
    created: "2026-02-15",
    items: [
      {
        id: "w1",
        articleNr: "585 57 28-01",
        name: "Husqvarna Automower 430X NERA",
        category: "Robotgräsklippare",
        rrpExcl: 29990,
        status: "in-stock",
        qty: 3,
        addedDate: "2026-02-15",
        addedBy: "Erik N.",
        priority: "high",
        customerIntent: "Kund har visat starkt intresse, vill ha demo i april",
      },
      {
        id: "w2",
        articleNr: "585 69 82-01",
        name: "Husqvarna Automower 435X AWD",
        category: "Robotgräsklippare",
        rrpExcl: 39990,
        status: "low-stock",
        qty: 1,
        addedDate: "2026-02-18",
        addedBy: "Erik N.",
        priority: "high",
        note: "Kolla kampanjpris Q2",
      },
      {
        id: "w3",
        articleNr: "585 40 46-84",
        name: "Husqvarna X-CUT SP33G sågkedja",
        category: "Svärd & kedjor",
        rrpExcl: 349,
        status: "in-stock",
        qty: 10,
        addedDate: "2026-03-01",
        addedBy: "Anna L.",
        priority: "low",
      },
    ],
  },
  {
    id: "wl-2",
    name: "Kommunupphandling — parkskötsel",
    customer: "Stenungsunds kommun",
    created: "2026-03-05",
    items: [
      {
        id: "w4",
        articleNr: "967 32 57-01",
        name: "Husqvarna P 525DX",
        category: "Frontrotorklippare",
        rrpExcl: 189000,
        status: "in-stock",
        qty: 2,
        addedDate: "2026-03-05",
        addedBy: "Erik N.",
        priority: "high",
        customerIntent: "Upphandling stänger 31 mars — offert måste ut denna vecka",
      },
      {
        id: "w5",
        articleNr: "966 60 43-02",
        name: "Husqvarna 535RXT röjsåg",
        category: "Röjsågar",
        rrpExcl: 7490,
        status: "in-stock",
        qty: 5,
        addedDate: "2026-03-05",
        addedBy: "Erik N.",
        priority: "medium",
      },
      {
        id: "w6",
        articleNr: "967 91 57-12",
        name: "Husqvarna 525iB Mark II lövblåsare",
        category: "Lövblåsar",
        rrpExcl: 4990,
        status: "out-of-stock",
        qty: 3,
        addedDate: "2026-03-06",
        addedBy: "Anna L.",
        priority: "medium",
        note: "Leverans beräknad v.15 — kan ev. ersättas med 580BTS",
      },
    ],
  },
  {
    id: "wl-3",
    name: "Reservdelslager — påfyllning",
    created: "2026-03-10",
    items: [
      {
        id: "w7",
        articleNr: "585 95 07-72",
        name: "Husqvarna X-FORCE svärd 18\"",
        category: "Svärd & kedjor",
        rrpExcl: 899,
        status: "in-stock",
        qty: 8,
        addedDate: "2026-03-10",
        addedBy: "Anna L.",
        priority: "low",
      },
      {
        id: "w8",
        articleNr: "579 82 08-20",
        name: "Husqvarna VARI-CUT S65 kapskiva",
        category: "Diamantverktyg",
        rrpExcl: 2490,
        status: "low-stock",
        qty: 4,
        addedDate: "2026-03-10",
        addedBy: "Erik N.",
        priority: "medium",
        note: "Begränsat lager hos HQ — beställ snart",
      },
    ],
  },
];

/* ═══════════════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════════════ */

const fmt = (n: number) =>
  n.toLocaleString("sv-SE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const statusConfig: Record<ItemStatus, { label: string; bg: string; text: string }> = {
  "in-stock": { label: "I lager", bg: "bg-[#e8f5e9]", text: "text-[#2e7d32]" },
  "low-stock": { label: "Lågt lager", bg: "bg-[#fff3e0]", text: "text-[#e65100]" },
  "out-of-stock": { label: "Ej i lager", bg: "bg-[#fce8e8]", text: "text-[#c44]" },
  discontinued: { label: "Utgått", bg: "bg-[#f5f5f5]", text: "text-[#999]" },
};

const priorityConfig: Record<Priority, { label: string; dot: string }> = {
  high: { label: "Hög", dot: "bg-[#e53935]" },
  medium: { label: "Medel", dot: "bg-[#f9a825]" },
  low: { label: "Låg", dot: "bg-[#66bb6a]" },
};

type Filter = "Alla" | "Hög prioritet" | "Lågt lager" | "Ej i lager";
const filters: Filter[] = ["Alla", "Hög prioritet", "Lågt lager", "Ej i lager"];

/* ═══════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════ */

export default function WishlistPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>("Alla");
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    new Set(wishlistGroups.map((g) => g.id)),
  );
  const [convertModal, setConvertModal] = useState<WishlistGroup | null>(null);

  const toggleGroup = (id: string) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filterItems = (items: WishlistItem[]) => {
    if (activeFilter === "Hög prioritet") return items.filter((i) => i.priority === "high");
    if (activeFilter === "Lågt lager") return items.filter((i) => i.status === "low-stock");
    if (activeFilter === "Ej i lager")
      return items.filter((i) => i.status === "out-of-stock" || i.status === "discontinued");
    return items;
  };

  const totalItems = wishlistGroups.reduce((sum, g) => sum + g.items.length, 0);
  const highPrioCount = wishlistGroups.reduce(
    (sum, g) => sum + g.items.filter((i) => i.priority === "high").length,
    0,
  );
  const stockAlertCount = wishlistGroups.reduce(
    (sum, g) =>
      sum + g.items.filter((i) => i.status === "low-stock" || i.status === "out-of-stock").length,
    0,
  );

  return (
    <div className="min-h-screen bg-white">
      <NavHeader />

      <main className="mx-auto max-w-[1320px] px-6 py-6">
        {/* ── Breadcrumb ── */}
        <Breadcrumb
          items={[
            { label: "Min verksamhet", href: "/nav-v2/min-verksamhet" },
            { label: "Wishlist", href: "/nav-v2/min-verksamhet/wishlist" },
          ]}
        />

        {/* ── Page header ── */}
        <div className="mt-5 flex items-end justify-between">
          <div>
            <h1 className="text-[26px] font-bold text-[#111]">Wishlist</h1>
            <p className="mt-1 max-w-xl text-[13px] leading-relaxed text-[#888]">
              Sparade produkter och kundintressen. Organisera, prioritera och konvertera till
              offerter eller beställningar.
            </p>
          </div>
          <button className="rounded-lg bg-[#273A60] px-5 py-2.5 text-[12px] font-semibold text-white transition-colors hover:bg-[#1a2d4d]">
            + Ny lista
          </button>
        </div>

        {/* ── Summary cards ── */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-[#e0e0e0] bg-white px-5 py-4">
            <span className="text-[12px] font-medium text-[#999]">Sparade produkter</span>
            <span className="mt-1 block text-[22px] font-bold text-[#111]">{totalItems}</span>
          </div>
          <div className="rounded-xl border border-[#e0e0e0] bg-white px-5 py-4">
            <span className="text-[12px] font-medium text-[#999]">Hög prioritet</span>
            <span className="mt-1 block text-[22px] font-bold text-[#e53935]">{highPrioCount}</span>
          </div>
          <div className="rounded-xl border border-[#e0e0e0] bg-white px-5 py-4">
            <span className="text-[12px] font-medium text-[#999]">Lagervarnningar</span>
            <span className="mt-1 block text-[22px] font-bold text-[#e65100]">
              {stockAlertCount}
            </span>
          </div>
        </div>

        {/* ── Filter tabs ── */}
        <div className="mt-6 border-b border-[#d0d0d0]">
          <nav className="-mb-px flex gap-0 overflow-x-auto">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`relative shrink-0 border-b-2 px-5 py-3 text-[13px] font-semibold transition-colors ${
                  activeFilter === f
                    ? "border-[#273A60] text-[#273A60]"
                    : "border-transparent text-[#888] hover:text-[#555]"
                }`}
              >
                {f}
              </button>
            ))}
          </nav>
        </div>

        {/* ── Wishlist groups ── */}
        <div className="mt-6 space-y-5">
          {wishlistGroups.map((group) => {
            const filtered = filterItems(group.items);
            if (filtered.length === 0) return null;
            const isExpanded = expandedGroups.has(group.id);
            const groupTotal = filtered.reduce((s, i) => s + i.rrpExcl * i.qty, 0);

            return (
              <div
                key={group.id}
                className="overflow-hidden rounded-xl border border-[#e0e0e0] bg-white"
              >
                {/* Group header */}
                <button
                  onClick={() => toggleGroup(group.id)}
                  className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors hover:bg-[#fafafa]"
                >
                  <div className="flex items-center gap-3">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      className={`shrink-0 text-[#999] transition-transform ${
                        isExpanded ? "rotate-90" : ""
                      }`}
                    >
                      <path d="M6 4l4 4-4 4" />
                    </svg>
                    <div>
                      <span className="text-[14px] font-semibold text-[#111]">{group.name}</span>
                      {group.customer && (
                        <span className="ml-2 text-[12px] text-[#999]">— {group.customer}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-[12px] text-[#999]">
                      {filtered.length} {filtered.length === 1 ? "produkt" : "produkter"}
                    </span>
                    <span className="text-[13px] font-semibold text-[#111]">
                      {fmt(groupTotal)} SEK
                    </span>
                  </div>
                </button>

                {isExpanded && (
                  <>
                    {/* Table */}
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="border-t border-b border-[#f0f0f0] bg-[#fafafa]">
                            <th className="px-6 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-[#999]">
                              Produkt
                            </th>
                            <th className="px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-[#999]">
                              Prio
                            </th>
                            <th className="px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-[#999]">
                              Lagerstatus
                            </th>
                            <th className="px-4 py-2.5 text-right text-[11px] font-semibold uppercase tracking-wide text-[#999]">
                              RRP exkl.
                            </th>
                            <th className="px-4 py-2.5 text-center text-[11px] font-semibold uppercase tracking-wide text-[#999]">
                              Antal
                            </th>
                            <th className="px-4 py-2.5 text-right text-[11px] font-semibold uppercase tracking-wide text-[#999]">
                              Totalt
                            </th>
                            <th className="px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-[#999]">
                              Tillagd
                            </th>
                            <th className="w-10 px-2 py-2.5" />
                          </tr>
                        </thead>
                        <tbody>
                          {filtered.map((item) => {
                            const st = statusConfig[item.status];
                            const pr = priorityConfig[item.priority];
                            return (
                              <Fragment key={item.id}>
                                <tr className="border-b border-[#f0f0f0] transition-colors hover:bg-[#fafafa]">
                                  {/* Product */}
                                  <td className="px-6 py-3.5">
                                    <span className="block text-[13px] font-medium text-[#222]">
                                      {item.name}
                                    </span>
                                    <span className="text-[11px] text-[#aaa]">
                                      {item.articleNr} · {item.category}
                                    </span>
                                  </td>
                                  {/* Priority */}
                                  <td className="px-4 py-3.5">
                                    <span className="flex items-center gap-1.5 text-[12px] text-[#555]">
                                      <span
                                        className={`inline-block h-2 w-2 rounded-full ${pr.dot}`}
                                      />
                                      {pr.label}
                                    </span>
                                  </td>
                                  {/* Stock status */}
                                  <td className="px-4 py-3.5">
                                    <span
                                      className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${st.bg} ${st.text}`}
                                    >
                                      {st.label}
                                    </span>
                                  </td>
                                  {/* RRP */}
                                  <td className="px-4 py-3.5 text-right text-[13px] text-[#333]">
                                    {fmt(item.rrpExcl)}
                                  </td>
                                  {/* Qty */}
                                  <td className="px-4 py-3.5 text-center text-[13px] font-medium text-[#333]">
                                    {item.qty}
                                  </td>
                                  {/* Total */}
                                  <td className="px-4 py-3.5 text-right text-[13px] font-semibold text-[#111]">
                                    {fmt(item.rrpExcl * item.qty)}
                                  </td>
                                  {/* Added */}
                                  <td className="px-4 py-3.5 text-[12px] text-[#999]">
                                    {item.addedDate}
                                    <span className="block text-[11px] text-[#ccc]">
                                      {item.addedBy}
                                    </span>
                                  </td>
                                  {/* Actions */}
                                  <td className="px-2 py-3.5">
                                    <button
                                      className="flex h-7 w-7 items-center justify-center rounded text-[#bbb] transition-colors hover:bg-[#f0f0f0] hover:text-[#555]"
                                      title="Ta bort"
                                    >
                                      <svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                      >
                                        <path d="M18 6L6 18M6 6l12 12" />
                                      </svg>
                                    </button>
                                  </td>
                                </tr>
                                {/* Note / customer intent row */}
                                {(item.note || item.customerIntent) && (
                                  <tr className="border-b border-[#f0f0f0] bg-[#fafafa]/60">
                                    <td colSpan={8} className="px-6 py-2.5">
                                      {item.customerIntent && (
                                        <p className="flex items-center gap-2 text-[12px] text-[#273A60]">
                                          <svg
                                            width="14"
                                            height="14"
                                            viewBox="0 0 14 14"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                          >
                                            <circle cx="7" cy="7" r="5.5" />
                                            <path d="M7 4.5v3M7 9.5v0" />
                                          </svg>
                                          {item.customerIntent}
                                        </p>
                                      )}
                                      {item.note && (
                                        <p className="mt-0.5 flex items-center gap-2 text-[12px] text-[#999]">
                                          <svg
                                            width="14"
                                            height="14"
                                            viewBox="0 0 14 14"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          >
                                            <path d="M3 3h8v8H3z" />
                                            <path d="M5 6h4M5 8h2" />
                                          </svg>
                                          {item.note}
                                        </p>
                                      )}
                                    </td>
                                  </tr>
                                )}
                              </Fragment>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    {/* Group actions */}
                    <div className="flex items-center justify-between border-t border-[#f0f0f0] px-6 py-3">
                      <div className="flex gap-2">
                        <button className="rounded-lg border border-[#d0d0d0] px-4 py-2 text-[12px] font-medium text-[#555] transition-colors hover:border-[#273A60]/30 hover:text-[#273A60]">
                          + Lägg till produkt
                        </button>
                      </div>
                      <div className="flex gap-2">
                        <button className="rounded-lg border border-[#d0d0d0] px-4 py-2 text-[12px] font-medium text-[#555] transition-colors hover:border-[#273A60]/30 hover:text-[#273A60]">
                          Skapa beställning
                        </button>
                        <button
                          onClick={() => setConvertModal(group)}
                          className="rounded-lg bg-[#273A60] px-4 py-2 text-[12px] font-semibold text-white transition-colors hover:bg-[#1a2d4d]"
                        >
                          Konvertera till offert
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </main>

      {/* ── Convert to quote modal ── */}
      {convertModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
          onClick={() => setConvertModal(null)}
        >
          <div
            className="w-full max-w-md rounded-xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#e5e5e5] px-6 py-4">
              <h3 className="text-[16px] font-semibold text-[#111]">Konvertera till offert</h3>
              <button
                onClick={() => setConvertModal(null)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-[#999] transition-colors hover:bg-[#f5f5f5]"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="px-6 py-5">
              <p className="text-[13px] text-[#666]">
                Alla {convertModal.items.length} produkter i{" "}
                <span className="font-semibold text-[#111]">&quot;{convertModal.name}&quot;</span>{" "}
                kommer att läggas till i en ny offert.
              </p>
              {convertModal.customer && (
                <p className="mt-2 text-[13px] text-[#666]">
                  Kund:{" "}
                  <span className="font-semibold text-[#111]">{convertModal.customer}</span>
                </p>
              )}

              <div className="mt-4 rounded-lg bg-[#f8f9fc] px-4 py-3">
                <div className="flex justify-between text-[13px]">
                  <span className="text-[#888]">Produkter</span>
                  <span className="font-medium text-[#111]">{convertModal.items.length} st</span>
                </div>
                <div className="mt-1 flex justify-between text-[13px]">
                  <span className="text-[#888]">Totalt RRP exkl. moms</span>
                  <span className="font-semibold text-[#111]">
                    {fmt(convertModal.items.reduce((s, i) => s + i.rrpExcl * i.qty, 0))} SEK
                  </span>
                </div>
              </div>

              {convertModal.items.some(
                (i) => i.status === "out-of-stock" || i.status === "discontinued",
              ) && (
                <p className="mt-3 flex items-center gap-2 text-[12px] text-[#e65100]">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  >
                    <circle cx="7" cy="7" r="5.5" />
                    <path d="M7 4.5v3M7 9.5v0" />
                  </svg>
                  Vissa produkter i denna lista har begränsad tillgänglighet.
                </p>
              )}
            </div>

            <div className="flex justify-end gap-2 border-t border-[#e5e5e5] px-6 py-4">
              <button
                onClick={() => setConvertModal(null)}
                className="rounded-lg border border-[#d0d0d0] px-5 py-2.5 text-[12px] font-semibold text-[#555] transition-colors hover:border-[#273A60]/30"
              >
                Avbryt
              </button>
              <button
                onClick={() => setConvertModal(null)}
                className="rounded-lg bg-[#273A60] px-5 py-2.5 text-[12px] font-semibold text-white transition-colors hover:bg-[#1a2d4d]"
              >
                Skapa offert →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
