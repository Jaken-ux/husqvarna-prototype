"use client";

import { useState } from "react";
import NavHeader from "../../NavHeader";
import Breadcrumb from "../../Breadcrumb";
import { browseCategories } from "../_components/browseData";
import AddToCartPanel from "../_components/AddToCartPanel";

/* ═══════════════════════════════════════════════════════
   PRODUCT LISTING DATA
   ═══════════════════════════════════════════════════════ */

type ListProduct = {
  name: string;
  articleNr: string;
  status: "active" | "discontinued";
  category: string;
  subcategory: string;
  price?: string;
  inStock?: boolean;
};

// Flatten browse categories into a product list with prices
const allProducts: ListProduct[] = browseCategories.flatMap((cat) =>
  cat.subcategories.flatMap((sub) =>
    sub.products.map((p) => ({
      name: p.name,
      articleNr: p.articleNr,
      status: (p.status ?? "active") as "active" | "discontinued",
      category: cat.label,
      subcategory: sub.label,
      price: p.status === "discontinued" ? undefined : `${(Math.floor(Math.random() * 40) + 2) * 500} kr`,
      inStock: p.status === "discontinued" ? false : Math.random() > 0.2,
    }))
  )
);

/* ═══════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════ */

export default function KategoriPage() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("Alla");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "discontinued">("all");
  const [stockFilter, setStockFilter] = useState<"all" | "in-stock" | "out-of-stock">("all");
  const [cartProduct, setCartProduct] = useState<ListProduct | null>(null);

  const categoryOptions = ["Alla", ...new Set(allProducts.map((p) => p.category))];

  const filtered = allProducts.filter((p) => {
    if (categoryFilter !== "Alla" && p.category !== categoryFilter) return false;
    if (statusFilter === "active" && p.status !== "active") return false;
    if (statusFilter === "discontinued" && p.status !== "discontinued") return false;
    if (stockFilter === "in-stock" && !p.inStock) return false;
    if (stockFilter === "out-of-stock" && p.inStock) return false;
    if (search) {
      const q = search.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.articleNr.toLowerCase().includes(q) || p.subcategory.toLowerCase().includes(q);
    }
    return true;
  });

  const activeCount = filtered.filter((p) => p.status === "active").length;
  const discontinuedCount = filtered.filter((p) => p.status === "discontinued").length;

  return (
    <div className="min-h-screen bg-white">
      <NavHeader />

      <main className="mx-auto max-w-[1280px] px-4 sm:px-6 py-6 sm:py-8">
        <Breadcrumb items={[
          { label: "Husqvarna", href: "/nav-v2/husqvarna" },
          { label: "Produkter", href: "/nav-v2/husqvarna/kategori" },
        ]} />

        <div className="mt-5">
          <h1 className="text-[22px] sm:text-[26px] font-bold text-[#111]">Produkter</h1>
          <p className="mt-1 text-[13px] text-[#888]">
            {allProducts.length} produkter i {browseCategories.length} kategorier
          </p>
        </div>

        {/* Filter bar */}
        <div className="mt-6 flex flex-col gap-4 rounded-xl border border-[#e5e5e5] bg-[#fafafa] p-4 sm:flex-row sm:items-center">
          {/* Search */}
          <div className="relative flex-1">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#bbb]" width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <circle cx="7" cy="7" r="4.5" />
              <path d="M10.5 10.5L14 14" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Sök produkt, artikelnr, underkategori..."
              className="h-9 w-full rounded-lg border border-[#d0d0d0] bg-white pl-9 pr-3 text-[12px] text-[#333] placeholder-[#aaa] focus:border-[#273A60] focus:outline-none"
            />
          </div>

          <span className="hidden h-5 w-px bg-[#d0d0d0] sm:block" />

          {/* Category */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="h-9 rounded-lg border border-[#d0d0d0] bg-white px-3 text-[12px] font-semibold text-[#555] outline-none focus:border-[#273A60]"
          >
            {categoryOptions.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <span className="hidden h-5 w-px bg-[#d0d0d0] sm:block" />

          {/* Status pills */}
          <div className="flex gap-1">
            {[
              { id: "all" as const, label: "Alla" },
              { id: "active" as const, label: `Aktiva (${activeCount})` },
              { id: "discontinued" as const, label: `Utgångna (${discontinuedCount})` },
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => setStatusFilter(s.id)}
                className={`rounded-full px-2.5 py-1 text-[11px] font-semibold transition-all ${
                  statusFilter === s.id ? "bg-[#273A60] text-white" : "bg-white text-[#666] border border-[#d0d0d0]"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          <span className="hidden h-5 w-px bg-[#d0d0d0] sm:block" />

          {/* Stock filter */}
          <div className="flex gap-1">
            {[
              { id: "all" as const, label: "Alla" },
              { id: "in-stock" as const, label: "I lager" },
              { id: "out-of-stock" as const, label: "Ej i lager" },
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => setStockFilter(s.id)}
                className={`rounded-full px-2.5 py-1 text-[11px] font-semibold transition-all ${
                  stockFilter === s.id ? "bg-[#273A60] text-white" : "bg-white text-[#666] border border-[#d0d0d0]"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          <span className="text-[11px] text-[#999]">{filtered.length} produkter</span>
        </div>

        {/* Product table */}
        <div className="mt-4 overflow-auto max-h-[70vh] rounded-xl border border-[#d0d0d0] bg-white">
          <table className="w-full min-w-[800px] text-left">
            <thead className="sticky top-0 z-10">
              <tr className="border-b border-[#e5e5e5] bg-[#fafafa]">
                <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#999]">Produkt</th>
                <th className="px-3 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#999]">Art.nr</th>
                <th className="px-3 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#999]">Kategori</th>
                <th className="px-3 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#999]">Status</th>
                <th className="px-3 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#999]">Lager</th>
                <th className="px-3 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#999] text-right">Nettopris</th>
                <th className="px-3 py-3 w-12"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f0f0]">
              {filtered.map((p) => (
                <tr key={p.articleNr} className="transition-colors hover:bg-[#fafafa]">
                  <td className="px-5 py-3">
                    <span className="text-[13px] font-semibold text-[#111]">{p.name}</span>
                    <span className="mt-0.5 block text-[11px] text-[#999]">{p.subcategory}</span>
                  </td>
                  <td className="px-3 py-3">
                    <span className="text-[12px] font-mono text-[#555]">{p.articleNr}</span>
                  </td>
                  <td className="px-3 py-3">
                    <span className="text-[12px] text-[#888]">{p.category}</span>
                  </td>
                  <td className="px-3 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                      p.status === "active" ? "bg-[#e8f5e9] text-[#2e7d32]" : "bg-[#f5f5f5] text-[#999]"
                    }`}>
                      {p.status === "active" ? "Aktiv" : "Utgången"}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    {p.inStock ? (
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
                    {p.price ? (
                      <span className="text-[13px] font-semibold text-[#111]">{p.price}</span>
                    ) : (
                      <span className="text-[12px] text-[#ccc]">—</span>
                    )}
                  </td>
                  <td className="px-3 py-3">
                    {p.status === "active" && (
                      <button
                        onClick={() => setCartProduct(p)}
                        title="Lägg till i varukorg"
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#d0d0d0] text-[#888] transition-all hover:border-[#273A60] hover:bg-[#273A60] hover:text-white"
                      >
                        <svg width="16" height="16" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 1h2.5l1.2 9.5a1.5 1.5 0 001.5 1.3h7.6a1.5 1.5 0 001.5-1.1L17 5H4.5" />
                          <circle cx="7" cy="15.5" r="1" />
                          <circle cx="13.5" cy="15.5" r="1" />
                        </svg>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Add to cart side panel */}
      {cartProduct && (
        <AddToCartPanel product={cartProduct} onClose={() => setCartProduct(null)} />
      )}
    </div>
  );
}
