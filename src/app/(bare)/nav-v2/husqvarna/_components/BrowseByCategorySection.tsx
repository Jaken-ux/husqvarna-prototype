"use client";

import { useState, Fragment } from "react";
import { browseCategories } from "./browseData";
import BrowsePanel from "./BrowsePanel";

export default function BrowseByCategorySection() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeCategory = browseCategories.find((c) => c.id === activeId) ?? null;

  return (
    <section id="browse-section" aria-labelledby="browse-heading" className="mt-10">
      <h2 id="browse-heading" className="text-lg font-bold text-[#111]">
        Bläddra efter kategori
      </h2>
      <p className="mt-1 text-[13px] text-[#666]">
        För dig som vill hitta produkter via sortiment och underkategorier.
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {browseCategories.map((cat) => {
          const isActive = activeId === cat.id;
          return (
            <Fragment key={cat.id}>
              <button
                onClick={() => setActiveId(isActive ? null : cat.id)}
                className={`group flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition-all ${
                  isActive
                    ? "border-[#273A60] bg-[#273A60] text-white shadow-md"
                    : "border-[#d0d0d0] bg-white text-[#333] hover:border-[#273A60]/30 hover:shadow-sm"
                }`}
              >
                <span className="text-lg">{cat.icon}</span>
                <div>
                  <span className="text-[13px] font-semibold">{cat.label}</span>
                  <span className={`block text-[11px] ${isActive ? "text-white/70" : "text-[#999]"}`}>
                    {cat.subcategories.length} underkategorier
                  </span>
                </div>
                <svg
                  width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor"
                  strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
                  className={`ml-auto shrink-0 transition-transform ${isActive ? "rotate-180" : ""}`}
                >
                  <path d="M4 6l4 4 4-4" />
                </svg>
              </button>

              {/* Mobile: panel inline under the clicked category */}
              {isActive && (
                <div className="col-span-full sm:hidden">
                  <BrowsePanel category={cat} />
                </div>
              )}
            </Fragment>
          );
        })}
      </div>

      {/* Desktop: panel after the entire grid (original behavior) */}
      {activeCategory && (
        <div className="hidden sm:block">
          <BrowsePanel key={activeCategory.id} category={activeCategory} />
        </div>
      )}
    </section>
  );
}
