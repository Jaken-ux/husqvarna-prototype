"use client";

import { useState } from "react";

const recentSearches = ["346XP", "Automower 435X AWD", "587-04-48-01", "535RXT"];

type QuickShortcut = { label: string; href: string };

const quickShortcuts: QuickShortcut[] = [
  { label: "Open Product Page", href: "#pdp" },
  { label: "IPL", href: "#ipl" },
  { label: "Operator Manual", href: "#manual" },
  { label: "Service Bulletins", href: "#bulletins" },
  { label: "Exploded View", href: "#exploded" },
];

export default function GlobalSearch() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  /* Simulate a confident match when query matches a known model */
  const hasConfidentMatch =
    query.length > 2 &&
    recentSearches.some((s) => s.toLowerCase().startsWith(query.toLowerCase()));

  const matchedModel = hasConfidentMatch
    ? recentSearches.find((s) =>
        s.toLowerCase().startsWith(query.toLowerCase()),
      )
    : null;

  const showDropdown = focused && query.length > 2 && hasConfidentMatch;

  return (
    <section aria-labelledby="search-heading">
      <h2 id="search-heading" className="text-lg font-semibold text-[#111]">
        Product Search
      </h2>

      <div className="mt-4 rounded-xl border border-[#d0d0d0] bg-white p-6">
        <p className="mb-3 text-[13px] leading-relaxed text-[#777]">
          Search by model, SKU, or serial number. You&apos;ll jump to the
          product page with documents and exploded view.
        </p>

        {/* Search field */}
        <div className="relative">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#aaa]"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <circle cx="8" cy="8" r="5" />
            <path d="M12 12L16 16" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 200)}
            placeholder="Model name, SKU, or serial number..."
            aria-label="Global product search"
            className="h-12 w-full rounded-lg border border-[#d5d5d5] bg-[#fafafa] pl-11 pr-4 text-sm text-[#333] placeholder-[#aaa] transition-colors focus:border-[#999] focus:bg-white focus:outline-none"
          />

          {/* Quick shortcuts dropdown — shown when a single model is confidently matched */}
          {showDropdown && matchedModel && (
            <div className="absolute left-0 right-0 top-[calc(100%+4px)] z-10 rounded-lg border border-[#d0d0d0] bg-white p-4 shadow-lg">
              <div className="mb-3 flex items-center gap-2">
                <span className="rounded bg-[#f0f0f0] px-2 py-0.5 text-[11px] font-semibold text-[#555]">
                  Match
                </span>
                <span className="text-sm font-semibold text-[#111]">
                  {matchedModel}
                </span>
                <span className="text-[11px] text-[#aaa]">
                  — Full PDP available
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {quickShortcuts.map((shortcut) => (
                  <a
                    key={shortcut.label}
                    href={shortcut.href}
                    className="rounded-lg border border-[#e0e0e0] bg-[#fafafa] px-3 py-1.5 text-[12px] font-medium text-[#444] transition-colors hover:bg-[#eee] hover:text-[#111]"
                  >
                    {shortcut.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Recent searches as chips */}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-medium text-[#bbb]">Recent:</span>
          {recentSearches.map((term) => (
            <button
              key={term}
              onClick={() => {
                setQuery(term);
                setFocused(true);
              }}
              className="rounded-full border border-[#e0e0e0] bg-[#f5f5f5] px-3 py-1 text-[12px] font-medium text-[#555] transition-colors hover:bg-[#eee] hover:text-[#111]"
            >
              {term}
            </button>
          ))}
        </div>

        <div className="mt-4">
          <button className="rounded-lg bg-[#111] px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-80">
            Search
          </button>
          {/* Route logic: navigates to Full PDP if exists, else PDP Shell */}
        </div>
      </div>
    </section>
  );
}
