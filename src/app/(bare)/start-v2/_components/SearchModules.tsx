"use client";

import { useState } from "react";

const spareSuggestions = ["346XP", "Automower 315X", "K970", "535RXT", "T540XP"];

export default function SearchModules() {
  const [spareQuery, setSpareQuery] = useState("");
  const [priceQuery, setPriceQuery] = useState("");

  return (
    <section aria-labelledby="search-heading">
      <h2 id="search-heading" className="text-lg font-semibold text-[#111]">
        Search
      </h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {/* Spare parts search */}
        <div className="rounded-xl border border-[#d0d0d0] bg-white p-6">
          <h3 className="text-sm font-semibold text-[#111]">
            Spare Parts Search
          </h3>
          <div className="mt-3">
            <div className="relative">
              <svg
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#aaa]"
                width="16"
                height="16"
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
                value={spareQuery}
                onChange={(e) => setSpareQuery(e.target.value)}
                placeholder="Search spare parts by model, SKU, or description..."
                aria-label="Spare parts search"
                className="h-10 w-full rounded-lg border border-[#d5d5d5] bg-[#fafafa] pl-10 pr-4 text-sm text-[#333] placeholder-[#aaa] transition-colors focus:border-[#999] focus:bg-white focus:outline-none"
              />
            </div>
            {/* Suggestion chips */}
            <div className="mt-3 flex flex-wrap gap-2">
              {spareSuggestions.map((chip) => (
                <button
                  key={chip}
                  onClick={() => setSpareQuery(chip)}
                  className="rounded-full border border-[#e0e0e0] bg-[#f5f5f5] px-3 py-1 text-[12px] font-medium text-[#555] transition-colors hover:bg-[#eee] hover:text-[#111]"
                >
                  {chip}
                </button>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button className="rounded-lg bg-[#111] px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-80">
                Search spare parts
              </button>
              <button className="text-[13px] font-medium text-[#273A60] underline decoration-[#273A60]/30 underline-offset-2 transition-colors hover:text-[#1a2d4d]">
                AI-assisted parts finder (Preview)
              </button>
            </div>
          </div>
        </div>

        {/* Price & availability */}
        <div className="rounded-xl border border-[#d0d0d0] bg-white p-6">
          <h3 className="text-sm font-semibold text-[#111]">
            Price &amp; Availability
          </h3>
          <div className="mt-3">
            <div className="relative">
              <svg
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#aaa]"
                width="16"
                height="16"
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
                value={priceQuery}
                onChange={(e) => setPriceQuery(e.target.value)}
                placeholder="Check price & availability (SKU or model)..."
                aria-label="Price and availability search"
                className="h-10 w-full rounded-lg border border-[#d5d5d5] bg-[#fafafa] pl-10 pr-4 text-sm text-[#333] placeholder-[#aaa] transition-colors focus:border-[#999] focus:bg-white focus:outline-none"
              />
            </div>
            <div className="mt-4">
              <button className="rounded-lg bg-[#111] px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-80">
                Check
              </button>
            </div>

            {/* Mock result (shown when query has content) */}
            {priceQuery.length > 2 && (
              <div className="mt-4 rounded-lg border border-[#e8e8e8] bg-[#fafafa] p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold text-[#111]">
                      {priceQuery}
                    </p>
                    <p className="mt-0.5 text-[12px] text-[#888]">
                      SKU: 587-04-48-01
                    </p>
                  </div>
                  <span className="rounded-full bg-[#e6f4ea] px-2.5 py-0.5 text-[11px] font-semibold text-[#2a9d5c]">
                    In stock
                  </span>
                </div>
                <div className="mt-3 flex gap-6 text-sm">
                  <div>
                    <span className="text-[12px] text-[#999]">Dealer price</span>
                    <p className="font-semibold text-[#111]">SEK 1,249.00</p>
                  </div>
                  <div>
                    <span className="text-[12px] text-[#999]">RRP</span>
                    <p className="font-semibold text-[#555]">SEK 1,899.00</p>
                  </div>
                  <div>
                    <span className="text-[12px] text-[#999]">Stock</span>
                    <p className="font-semibold text-[#111]">34 units</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
