"use client";

import { useState } from "react";
import type { Category, Product, Subcategory } from "./browseData";
import AddToCartPanel from "./AddToCartPanel";

type Props = {
  category: Category;
};

export default function BrowsePanel({ category }: Props) {
  const [activeSub, setActiveSub] = useState<Subcategory>(category.subcategories[0]);
  const [cartProduct, setCartProduct] = useState<Product | null>(null);

  return (
    <div className="mt-4 overflow-hidden rounded-xl border border-[#d0d0d0] bg-white shadow-sm animate-in fade-in">
      {/* Breadcrumb context */}
      <div className="border-b border-[#f0f0f0] bg-[#fafafa] px-5 py-3">
        <span className="text-[12px] font-medium text-[#888]">
          Produkter{" "}
          <span className="mx-1 text-[#ccc]">/</span>{" "}
          {category.label}{" "}
          <span className="mx-1 text-[#ccc]">/</span>{" "}
          <span className="text-[#273A60]">{activeSub.label}</span>
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[200px_200px_1fr]">
        {/* Col 1: Subcategories */}
        <div className="border-b border-[#f0f0f0] md:border-b-0 md:border-r">
          <div className="px-3 py-3">
            <span className="px-2 text-[11px] font-semibold uppercase tracking-wide text-[#aaa]">
              Underkategorier
            </span>
          </div>
          <ul className="pb-3">
            {category.subcategories.map((sub) => (
              <li key={sub.label}>
                <button
                  onClick={() => setActiveSub(sub)}
                  className={`w-full px-5 py-2 text-left text-[13px] transition-colors ${
                    activeSub.label === sub.label
                      ? "bg-[#f0f3f8] font-semibold text-[#273A60]"
                      : "text-[#444] hover:bg-[#fafafa] hover:text-[#111]"
                  }`}
                >
                  {sub.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 2+3: Product preview */}
        <div className="col-span-1 md:col-span-2 p-5">
          <div className="flex items-center justify-between">
            <h4 className="text-[14px] font-semibold text-[#111]">{activeSub.label}</h4>
            <span className="text-[12px] text-[#aaa]">
              {activeSub.products.length} produkter
            </span>
          </div>

          <ul className="mt-3 divide-y divide-[#f0f0f0]">
            {activeSub.products.map((product) => (
              <li key={product.articleNr} className="group flex items-center gap-4 py-3">
                {/* Thumbnail placeholder */}
                <a href="#" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f4f4f4] text-[#ccc]">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="14" height="14" rx="2" />
                    <circle cx="7" cy="7" r="1.5" />
                    <path d="M16 12l-4-4-8 8" />
                  </svg>
                </a>

                <div className="min-w-0 flex-1">
                  <a href="#" className="block truncate text-[13px] font-medium text-[#222] hover:text-[#273A60]">
                    {product.name}
                  </a>
                  <span className="text-[11px] text-[#aaa]">{product.articleNr}</span>
                </div>

                {product.status === "discontinued" && (
                  <span className="shrink-0 rounded bg-[#fee2e2] px-2 py-0.5 text-[10px] font-semibold text-[#b91c1c]">
                    Utgått
                  </span>
                )}
                {product.status === "active" && (
                  <>
                    <span className="shrink-0 rounded bg-[#dcfce7] px-2 py-0.5 text-[10px] font-semibold text-[#15803d]">
                      Aktiv
                    </span>
                    <button
                      onClick={() => setCartProduct(product)}
                      title="Lägg till i varukorg"
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#d0d0d0] text-[#888] transition-all hover:border-[#273A60] hover:bg-[#273A60] hover:text-white"
                    >
                      <svg width="14" height="14" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 1h2.5l1.2 9.5a1.5 1.5 0 001.5 1.3h7.6a1.5 1.5 0 001.5-1.1L17 5H4.5" />
                        <circle cx="7" cy="15.5" r="1" />
                        <circle cx="13.5" cy="15.5" r="1" />
                      </svg>
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>

          <a href="/nav-v2/husqvarna/kategori" className="mt-4 inline-block rounded-lg border border-[#d0d0d0] px-4 py-2 text-[13px] font-medium text-[#333] transition-colors hover:border-[#273A60]/30 hover:text-[#273A60]">
            Visa alla produkter →
          </a>
        </div>
      </div>

      {/* Add to cart panel */}
      {cartProduct && (
        <AddToCartPanel
          product={{ name: cartProduct.name, articleNr: cartProduct.articleNr, inStock: true }}
          onClose={() => setCartProduct(null)}
        />
      )}
    </div>
  );
}
