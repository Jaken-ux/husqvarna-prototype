"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

/* ═══════════════════════════════════════════════════════
   PORTAL CONCEPT — WORKSPACE
   Standalone visual concept — not functional.
   ═══════════════════════════════════════════════════════ */

type Section =
  | "home"
  | "inbox"
  | "catalog"
  | "sales"
  | "operations"
  | "insights"
  | "resources";

type NavItem = {
  id: Section;
  label: string;
  icon: React.ReactNode;
  badge?: number;
  summary: string;
};

const navItems: NavItem[] = [
  {
    id: "home",
    label: "Home",
    summary: "Prioritized dashboard — what needs your attention today.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 10.5L12 3l9 7.5" />
        <path d="M5 9.5V19a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1V9.5" />
      </svg>
    ),
  },
  {
    id: "inbox",
    label: "Inbox",
    badge: 12,
    summary: "Unified notifications, tasks and alerts — triaged.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-6l-2 3h-4l-2-3H2" />
        <path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z" />
      </svg>
    ),
  },
  {
    id: "catalog",
    label: "Catalog",
    summary: "Products, parts and technical documentation.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
        <path d="M3.27 6.96L12 12.01l8.73-5.05" />
        <path d="M12 22.08V12" />
      </svg>
    ),
  },
  {
    id: "sales",
    label: "Sales",
    summary: "Quotes, customers, wishlist and sell-out.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20" />
        <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
      </svg>
    ),
  },
  {
    id: "operations",
    label: "Operations",
    badge: 4,
    summary: "Orders, invoices, contracts and service cases.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33h0a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82v0a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
      </svg>
    ),
  },
  {
    id: "insights",
    label: "Insights",
    summary: "Reports, analytics and benchmarking.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
  {
    id: "resources",
    label: "Resources",
    summary: "Campaigns, news, training and marketing materials.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
        <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
      </svg>
    ),
  },
];

/* Mock cross-domain search results shown on focus */
const mockSearchResults: { group: string; items: { label: string; meta: string; tag?: string }[] }[] = [
  {
    group: "Products",
    items: [
      { label: "Husqvarna Automower 430X NERA", meta: "PNC 585 57 28-01", tag: "In stock · 8" },
      { label: "Husqvarna 572 XP Mark II", meta: "PNC 966 73 30-14", tag: "In stock · 3" },
    ],
  },
  {
    group: "Orders",
    items: [
      { label: "Order #38291", meta: "Swedish Motors AB · SEK 42 890", tag: "In transit" },
      { label: "Order #38288", meta: "Landskapet Trädgård AB · SEK 18 450", tag: "Processing" },
    ],
  },
  {
    group: "Customers",
    items: [
      { label: "Lindström Fastigheter", meta: "4 products · 2 contracts" },
    ],
  },
  {
    group: "Documents",
    items: [
      { label: "IPL — Automower 430X NERA", meta: "PDF · 2.4 MB" },
    ],
  },
];

/* ═══════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════ */

export default function PortalConceptPage() {
  const [active, setActive] = useState<Section>("home");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showRationale, setShowRationale] = useState(true);
  const [whyOpen, setWhyOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const activeItem = navItems.find((n) => n.id === active)!;

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* ═══ INTRO RIBBON ═══ */}
      <div className="border-b border-[#e5e5e5] bg-white">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-6 py-3">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#7b61ff]">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="6" height="6" rx="1" />
                <rect x="12" y="2" width="6" height="6" rx="1" />
                <rect x="2" y="12" width="6" height="6" rx="1" />
                <rect x="12" y="12" width="6" height="6" rx="1" />
              </svg>
            </span>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#7b61ff]">Portal Concept</p>
              <p className="text-[14px] font-semibold text-[#111]">Workspace — an alternative dealer portal layout</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setWhyOpen((v) => !v)}
              className="rounded-lg border border-[#d0d0d0] bg-white px-3 py-2 text-[12px] font-semibold text-[#333] transition-colors hover:bg-[#fafafa]"
            >
              {whyOpen ? "Hide" : "Why this design?"}
            </button>
            <button
              onClick={() => setShowRationale((v) => !v)}
              className={`rounded-lg px-3 py-2 text-[12px] font-semibold transition-colors ${
                showRationale
                  ? "bg-[#7b61ff] text-white"
                  : "border border-[#d0d0d0] bg-white text-[#333] hover:bg-[#fafafa]"
              }`}
            >
              {showRationale ? "Annotations: on" : "Annotations: off"}
            </button>
            <Link
              href="/nav-v2"
              className="flex items-center gap-1.5 rounded-lg bg-[#273A60] px-3 py-2 text-[12px] font-semibold text-white transition-colors hover:bg-[#1a2d4d]"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 12L6 8l4-4" />
              </svg>
              Back to prototype
            </Link>
          </div>
        </div>

        {whyOpen && (
          <div className="border-t border-[#e5e5e5] bg-[#fafafa] px-6 py-5">
            <div className="mx-auto grid max-w-[1440px] gap-6 lg:grid-cols-3">
              <div>
                <h3 className="text-[13px] font-bold text-[#111]">The premise</h3>
                <p className="mt-1.5 text-[12px] leading-relaxed text-[#555]">
                  Built from scratch, without the OEM-vs-dealer split of the current prototype. A dealer doesn't think
                  &ldquo;is this Husqvarna&apos;s content or mine&rdquo; — they think &ldquo;I need to order a part&rdquo; or &ldquo;I need to invoice a customer.&rdquo;
                </p>
              </div>
              <div>
                <h3 className="text-[13px] font-bold text-[#111]">Why this structure</h3>
                <p className="mt-1.5 text-[12px] leading-relaxed text-[#555]">
                  Seven purpose-based sections: Home, Inbox, Catalog, Sales, Operations, Insights, Resources. Sales and
                  Operations are separated — one is creating future revenue, the other is fulfilling past commitments.
                </p>
              </div>
              <div>
                <h3 className="text-[13px] font-bold text-[#111]">Search is the hero</h3>
                <p className="mt-1.5 text-[12px] leading-relaxed text-[#555]">
                  Global cross-domain search spans products, parts, orders, customers, documents — everything. ⌘K from
                  anywhere. Sidebar navigation is for orientation; search is for speed.
                </p>
              </div>
            </div>
            <p className="mx-auto mt-4 max-w-[1440px] text-[11px] text-[#999]">
              All content below is illustrative. Numbers and data are fabricated. The existing prototype remains the functional reference.
            </p>
          </div>
        )}
      </div>

      {/* ═══ CONCEPT MOCK ═══ */}
      <div className="mx-auto max-w-[1440px] px-6 py-6">
        <div className="overflow-hidden rounded-2xl border border-[#d0d0d0] bg-white shadow-sm">
          {/* Top bar of the concept */}
          <TopBar
            searchRef={searchRef}
            searchOpen={searchOpen}
            setSearchOpen={setSearchOpen}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />

          {/* Sidebar + Main area */}
          <div className="flex min-h-[720px]">
            <Sidebar
              active={active}
              setActive={setActive}
              collapsed={sidebarCollapsed}
              setCollapsed={setSidebarCollapsed}
            />

            <main className="flex-1 bg-[#fafafa] p-8">
              <SectionHeader
                label={activeItem.label}
                summary={activeItem.summary}
                showRationale={showRationale}
              />
              <div className="mt-6">
                <SectionContent section={active} showRationale={showRationale} />
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   TOP BAR
   ═══════════════════════════════════════════════════════ */

function TopBar({
  searchRef,
  searchOpen,
  setSearchOpen,
  searchValue,
  setSearchValue,
}: {
  searchRef: React.RefObject<HTMLDivElement | null>;
  searchOpen: boolean;
  setSearchOpen: (v: boolean) => void;
  searchValue: string;
  setSearchValue: (v: string) => void;
}) {
  return (
    <div className="relative flex items-center justify-between border-b border-[#e5e5e5] bg-white px-6 py-3">
      {/* Brand */}
      <div className="flex items-center gap-3">
        <Image
          src="/images/Husqvarna-logo.png"
          alt="Husqvarna"
          width={28}
          height={28}
        />
        <span className="text-[14px] font-bold tracking-tight text-[#111]">Dealer Portal</span>
      </div>

      {/* Global search */}
      <div ref={searchRef} className="relative w-full max-w-[560px]">
        <svg
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#999]"
          width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
        >
          <circle cx="7" cy="7" r="4.5" />
          <path d="M10.5 10.5L14 14" />
        </svg>
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={() => setSearchOpen(true)}
          placeholder="Search products, parts, orders, customers, documents…"
          className={`h-10 w-full rounded-lg border bg-[#fafafa] pl-10 pr-20 text-[13px] text-[#333] placeholder-[#999] transition-colors focus:border-[#7b61ff] focus:bg-white focus:outline-none ${
            searchOpen ? "border-[#7b61ff] bg-white" : "border-[#d0d0d0]"
          }`}
        />
        <span className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-1 rounded border border-[#d0d0d0] bg-white px-1.5 py-0.5 text-[10px] font-semibold text-[#888]">
          ⌘ K
        </span>

        {searchOpen && (
          <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-[420px] overflow-y-auto rounded-xl border border-[#e0e0e0] bg-white shadow-xl">
            <p className="border-b border-[#f0f0f0] px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider text-[#999]">
              Search everywhere — products · parts · orders · customers · documents
            </p>
            {mockSearchResults.map((group) => (
              <div key={group.group} className="border-b border-[#f0f0f0] last:border-b-0">
                <p className="px-4 pt-3 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-[#bbb]">
                  {group.group}
                </p>
                {group.items.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between gap-3 px-4 py-2.5 transition-colors hover:bg-[#fafafa]"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-[13px] font-medium text-[#111]">{item.label}</p>
                      <p className="truncate text-[11px] text-[#888]">{item.meta}</p>
                    </div>
                    {item.tag && (
                      <span className="shrink-0 rounded-full bg-[#f0f3f8] px-2 py-0.5 text-[10px] font-semibold text-[#273A60]">
                        {item.tag}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right-side actions */}
      <div className="flex items-center gap-1.5">
        <button className="relative flex h-9 w-9 items-center justify-center rounded-lg text-[#555] transition-colors hover:bg-[#fafafa]" title="Notifications">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 01-3.46 0" />
          </svg>
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[#ff6b00]" />
        </button>
        <button className="relative flex h-9 w-9 items-center justify-center rounded-lg text-[#555] transition-colors hover:bg-[#fafafa]" title="Cart">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
          </svg>
          <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#ff6b00] px-1 text-[9px] font-bold text-white">3</span>
        </button>
        <div className="mx-1 h-5 w-px bg-[#e5e5e5]" />
        <button className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 transition-colors hover:bg-[#fafafa]" title="Profile">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#e8edf5] text-[11px] font-bold text-[#273A60]">JL</span>
          <div className="text-left">
            <p className="text-[12px] font-semibold leading-tight text-[#111]">Jansson Motor AB</p>
            <p className="text-[10px] leading-tight text-[#888]">EMT-249268</p>
          </div>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#999" strokeWidth="1.8" strokeLinecap="round"><path d="M3 4.5l3 3 3-3" /></svg>
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   SIDEBAR
   ═══════════════════════════════════════════════════════ */

function Sidebar({
  active,
  setActive,
  collapsed,
  setCollapsed,
}: {
  active: Section;
  setActive: (s: Section) => void;
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
}) {
  return (
    <aside
      className={`flex flex-col border-r border-[#e5e5e5] bg-white transition-all ${
        collapsed ? "w-[72px]" : "w-[240px]"
      }`}
    >
      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="mx-3 mt-3 flex h-8 items-center justify-center gap-2 rounded-lg border border-[#e5e5e5] text-[11px] font-semibold text-[#888] transition-colors hover:bg-[#fafafa]"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={collapsed ? "" : "rotate-180"}>
          <path d="M4.5 3l3 3-3 3" />
        </svg>
        {!collapsed && <span>Collapse</span>}
      </button>

      {/* Nav items */}
      <nav className="flex flex-col gap-0.5 p-3 pt-4">
        {navItems.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              title={collapsed ? item.label : undefined}
              className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-all ${
                isActive
                  ? "bg-[#273A60] text-white"
                  : "text-[#555] hover:bg-[#fafafa] hover:text-[#111]"
              }`}
            >
              <span className={`shrink-0 ${isActive ? "text-white" : "text-[#888] group-hover:text-[#111]"}`}>
                {item.icon}
              </span>
              {!collapsed && (
                <>
                  <span className="flex-1 text-[13px] font-semibold">{item.label}</span>
                  {item.badge && (
                    <span
                      className={`shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-bold leading-none ${
                        isActive ? "bg-white/20 text-white" : "bg-[#fce8e8] text-[#c44]"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom — Help / Settings */}
      <div className="mt-auto border-t border-[#e5e5e5] p-3">
        <div className="flex flex-col gap-0.5">
          {[
            { label: "Help & feedback", icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12" y2="17" />
              </svg>
            ) },
            { label: "Settings", icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 1v6m0 10v6M4.22 4.22l4.24 4.24m7.07 7.07l4.24 4.24M1 12h6m10 0h6M4.22 19.78l4.24-4.24m7.07-7.07l4.24-4.24" />
              </svg>
            ) },
          ].map((item) => (
            <button
              key={item.label}
              title={collapsed ? item.label : undefined}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-left text-[#888] transition-colors hover:bg-[#fafafa] hover:text-[#111]"
            >
              <span className="shrink-0">{item.icon}</span>
              {!collapsed && <span className="text-[12px] font-medium">{item.label}</span>}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}

/* ═══════════════════════════════════════════════════════
   SECTION HEADER
   ═══════════════════════════════════════════════════════ */

function SectionHeader({
  label,
  summary,
  showRationale,
}: {
  label: string;
  summary: string;
  showRationale: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h2 className="text-[22px] font-bold text-[#111]">{label}</h2>
        <p className="mt-1 text-[13px] text-[#888]">{summary}</p>
      </div>
      {showRationale && (
        <div className="max-w-[320px] rounded-xl border border-[#7b61ff]/20 bg-[#f3f0ff] px-4 py-3">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#7b61ff]">Design rationale</p>
          <p className="mt-1 text-[11px] leading-relaxed text-[#555]">
            Clicking a sidebar item takes you to that domain&apos;s landing page. Each landing is a focused workspace — not another menu.
          </p>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   SECTION CONTENT — one mock per section
   ═══════════════════════════════════════════════════════ */

function SectionContent({ section, showRationale }: { section: Section; showRationale: boolean }) {
  if (section === "home") return <HomeView showRationale={showRationale} />;
  if (section === "inbox") return <InboxView showRationale={showRationale} />;
  if (section === "catalog") return <CatalogView showRationale={showRationale} />;
  if (section === "sales") return <SalesView showRationale={showRationale} />;
  if (section === "operations") return <OperationsView showRationale={showRationale} />;
  if (section === "insights") return <InsightsView showRationale={showRationale} />;
  return <ResourcesView showRationale={showRationale} />;
}

/* ── Rationale tag ── */
function RationaleTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-[#7b61ff]/10 px-2 py-0.5 text-[10px] font-semibold text-[#7b61ff]">
      <span className="h-1.5 w-1.5 rounded-full bg-[#7b61ff]" />
      {children}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════
   HOME VIEW
   ═══════════════════════════════════════════════════════ */

function HomeView({ showRationale }: { showRationale: boolean }) {
  return (
    <div className="space-y-6">
      {/* KPI row */}
      <div>
        {showRationale && (
          <div className="mb-2 flex items-center gap-2">
            <RationaleTag>Mission control — surface what needs action first</RationaleTag>
          </div>
        )}
        <div className="grid grid-cols-5 gap-3">
          {[
            { label: "Orders in transit", value: "14", delta: "+3 today", color: "text-[#1565c0]", dot: "bg-[#1565c0]" },
            { label: "Invoices overdue", value: "3", delta: "SEK 67 200", color: "text-[#c44]", dot: "bg-[#c44]" },
            { label: "Missing sell-outs", value: "12", delta: "req. action", color: "text-[#b8860b]", dot: "bg-[#b8860b]" },
            { label: "Expiring contracts", value: "5", delta: "next 60d", color: "text-[#b8860b]", dot: "bg-[#b8860b]" },
            { label: "Bonus pending", value: "8 640", delta: "SEK est.", color: "text-[#2e7d32]", dot: "bg-[#2e7d32]" },
          ].map((k) => (
            <div key={k.label} className="rounded-xl border border-[#e5e5e5] bg-white p-4">
              <div className="flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${k.dot}`} />
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#888]">{k.label}</span>
              </div>
              <p className={`mt-2 text-[24px] font-extrabold ${k.color}`}>{k.value}</p>
              <p className="text-[11px] text-[#999]">{k.delta}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Needs attention + Quick actions */}
      <div className="grid grid-cols-[2fr_1fr] gap-6">
        <div className="rounded-xl border border-[#e5e5e5] bg-white">
          <div className="flex items-center justify-between border-b border-[#f0f0f0] px-5 py-4">
            <div>
              <h3 className="text-[14px] font-bold text-[#111]">Needs your attention today</h3>
              {showRationale && (
                <p className="mt-0.5 text-[11px] text-[#7b61ff]">
                  • Priority-sorted — no need to hunt through separate pages
                </p>
              )}
            </div>
            <button className="text-[12px] font-semibold text-[#273A60] hover:underline">Show all 24</button>
          </div>
          <div className="divide-y divide-[#f0f0f0]">
            {[
              { priority: "high", icon: "⚠", title: "Invoice 90361100 overdue — SEK 67 200", meta: "Landskapet Trädgård AB · 4 days late", action: "Review" },
              { priority: "high", icon: "🔴", title: "HyperCare escalation — CEORA 546 EPOS", meta: "AB Grönytor · Priority P1 · 2h open", action: "Open case" },
              { priority: "medium", icon: "📋", title: "Sell-out missing for 12 products", meta: "Warranty at risk · bonus ineligible", action: "Register" },
              { priority: "medium", icon: "📅", title: "Service Plus contract expiring in 7 days", meta: "BRF Solsidan · Automower 450X", action: "Renew" },
              { priority: "low", icon: "✨", title: "3 new quotes awaiting customer response", meta: "Follow up recommended", action: "Follow up" },
            ].map((a) => (
              <div key={a.title} className="flex items-center gap-4 px-5 py-3.5">
                <span className="text-[16px]">{a.icon}</span>
                <div className="flex-1">
                  <p className="text-[13px] font-semibold text-[#111]">{a.title}</p>
                  <p className="mt-0.5 text-[11px] text-[#888]">{a.meta}</p>
                </div>
                <button className="rounded-lg border border-[#d0d0d0] px-3 py-1.5 text-[11px] font-semibold text-[#555] hover:bg-[#fafafa]">
                  {a.action}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="space-y-3">
          <div className="rounded-xl border border-[#e5e5e5] bg-white p-5">
            <h3 className="text-[13px] font-bold text-[#111]">Quick actions</h3>
            {showRationale && (
              <p className="mt-0.5 text-[11px] text-[#7b61ff]">Shortcuts to the most-used flows</p>
            )}
            <div className="mt-3 space-y-1.5">
              {[
                "+ New quote",
                "+ Register sell-out",
                "+ Search part by PNC",
                "+ Create order",
                "+ Add customer",
              ].map((a) => (
                <button key={a} className="flex w-full items-center justify-between rounded-lg border border-[#e5e5e5] px-3 py-2 text-left text-[12px] font-medium text-[#333] transition-colors hover:border-[#273A60]/30 hover:bg-[#fafafa]">
                  <span>{a}</span>
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="#bbb" strokeWidth="1.8" strokeLinecap="round"><path d="M6 4l4 4-4 4" /></svg>
                </button>
              ))}
            </div>
          </div>

          {/* Active campaign teaser */}
          <div className="overflow-hidden rounded-xl border border-[#e5e5e5] bg-gradient-to-br from-[#273A60] to-[#1a2d4d] p-5 text-white">
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">Active campaign</span>
            <h3 className="mt-1 text-[15px] font-bold">Vårkampanj 2026</h3>
            <p className="mt-2 text-[11px] text-white/70">
              Current level: <span className="font-bold text-[#ff9b4d]">Guld · 4% bonus</span>
            </p>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/15">
              <div className="h-full w-[65%] rounded-full bg-[#ff9b4d]" />
            </div>
            <p className="mt-1.5 text-[10px] text-white/60">3 more units to Platina (6%)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   INBOX VIEW
   ═══════════════════════════════════════════════════════ */

function InboxView({ showRationale }: { showRationale: boolean }) {
  return (
    <div className="grid grid-cols-[220px_1fr] gap-6">
      {/* Filters */}
      <div className="space-y-5">
        {showRationale && (
          <RationaleTag>Inbox unifies notifications, tasks and alerts</RationaleTag>
        )}
        <div className="rounded-xl border border-[#e5e5e5] bg-white p-4">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#999]">Filter</p>
          <div className="mt-2 space-y-1">
            {[
              { label: "All", count: 24, active: true },
              { label: "Mentions", count: 3 },
              { label: "Assigned to me", count: 8 },
              { label: "Overdue", count: 2 },
              { label: "Snoozed", count: 4 },
              { label: "Archived", count: 127 },
            ].map((f) => (
              <button
                key={f.label}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-1.5 text-left transition-colors ${
                  f.active ? "bg-[#273A60] text-white" : "text-[#555] hover:bg-[#fafafa]"
                }`}
              >
                <span className="text-[12px] font-semibold">{f.label}</span>
                <span className={`text-[11px] ${f.active ? "text-white/70" : "text-[#999]"}`}>{f.count}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-[#e5e5e5] bg-white p-4">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#999]">Source</p>
          <div className="mt-2 space-y-1.5">
            {["System alerts", "Customer replies", "Campaign updates", "Service cases"].map((s) => (
              <label key={s} className="flex items-center gap-2 text-[12px] text-[#555]">
                <input type="checkbox" defaultChecked className="rounded border-[#ccc]" />
                {s}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Stream */}
      <div className="rounded-xl border border-[#e5e5e5] bg-white">
        <div className="flex items-center justify-between border-b border-[#f0f0f0] px-5 py-3">
          <h3 className="text-[13px] font-bold text-[#111]">24 items</h3>
          <div className="flex gap-2">
            <button className="rounded-lg border border-[#d0d0d0] px-3 py-1.5 text-[11px] font-semibold text-[#555] hover:bg-[#fafafa]">Mark read</button>
            <button className="rounded-lg border border-[#d0d0d0] px-3 py-1.5 text-[11px] font-semibold text-[#555] hover:bg-[#fafafa]">Archive</button>
          </div>
        </div>
        <div className="divide-y divide-[#f0f0f0]">
          {[
            { type: "alert", tag: "High", tagColor: "bg-[#fce8e8] text-[#c44]", title: "Invoice 90361100 is 4 days overdue", meta: "Landskapet Trädgård AB · SEK 67 200", time: "2h" },
            { type: "service", tag: "HyperCare", tagColor: "bg-[#fff3e0] text-[#e65100]", title: "CEORA 546 EPOS — customer reports connectivity issues", meta: "AB Grönytor · Case #W-1104", time: "5h" },
            { type: "campaign", tag: "Campaign", tagColor: "bg-[#e3f2fd] text-[#1565c0]", title: "Vårkampanj 2026 — 3 units to Platina tier", meta: "Bonus impact: +SEK 6 400", time: "1d" },
            { type: "task", tag: "Task", tagColor: "bg-[#e8eaf6] text-[#273A60]", title: "Register sell-out for Automower 310 Mark II", meta: "Required for warranty activation", time: "1d" },
            { type: "customer", tag: "Reply", tagColor: "bg-[#e8f5e9] text-[#2e7d32]", title: "Eriksson Trädgård AB responded to quote #Q-2026-0087", meta: "Accepted · ready for order", time: "2d" },
            { type: "system", tag: "System", tagColor: "bg-[#f5f5f5] text-[#666]", title: "New IPL available — Automower 430X NERA", meta: "Revision 3 · service bulletin included", time: "3d" },
          ].map((n) => (
            <div key={n.title} className="flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-[#fafafa]">
              <span className="h-2 w-2 shrink-0 rounded-full bg-[#7b61ff]" />
              <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${n.tagColor}`}>{n.tag}</span>
              <div className="flex-1">
                <p className="text-[13px] font-semibold text-[#111]">{n.title}</p>
                <p className="mt-0.5 text-[11px] text-[#888]">{n.meta}</p>
              </div>
              <span className="shrink-0 text-[11px] text-[#bbb]">{n.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   CATALOG VIEW
   ═══════════════════════════════════════════════════════ */

function CatalogView({ showRationale }: { showRationale: boolean }) {
  return (
    <div className="space-y-6">
      {/* Search hero */}
      <div className="rounded-2xl border border-[#273A60]/10 bg-gradient-to-br from-[#f5f7fb] to-white p-8">
        {showRationale && (
          <div className="mb-3">
            <RationaleTag>Search-first — most dealers know what they&apos;re looking for</RationaleTag>
          </div>
        )}
        <h3 className="text-[18px] font-bold text-[#111]">Find a product, part or document</h3>
        <p className="mt-1 text-[12px] text-[#888]">Search by name, PNC, serial number or scan a QR code.</p>
        <div className="mt-5 flex items-center gap-2">
          <div className="relative flex-1">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-[#888]" width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <circle cx="7" cy="7" r="4.5" />
              <path d="M10.5 10.5L14 14" />
            </svg>
            <input
              type="text"
              placeholder="e.g. Automower 430X, 585 57 28-01…"
              className="h-12 w-full rounded-xl border border-[#d0d0d0] bg-white pl-12 pr-4 text-[14px] text-[#333] placeholder-[#999] focus:border-[#273A60] focus:outline-none"
            />
          </div>
          <button className="flex h-12 items-center gap-2 rounded-xl border border-[#d0d0d0] bg-white px-4 text-[13px] font-semibold text-[#555] hover:bg-[#fafafa]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="5" height="5" />
              <rect x="16" y="3" width="5" height="5" />
              <rect x="3" y="16" width="5" height="5" />
              <path d="M16 16h2v2h-2zM19 19h2v2h-2zM16 19h1M19 16h2" />
            </svg>
            Scan QR
          </button>
          <button className="h-12 rounded-xl bg-[#273A60] px-5 text-[13px] font-semibold text-white hover:bg-[#1a2d4d]">
            Search
          </button>
        </div>
      </div>

      {/* Categories + Recent */}
      <div className="grid grid-cols-[2fr_1fr] gap-6">
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-[14px] font-bold text-[#111]">Browse by category</h3>
            <span className="text-[11px] text-[#888]">7 categories</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: "🏗️", label: "Construction", count: 48 },
              { icon: "🌿", label: "Grass mowing", count: 112 },
              { icon: "🪚", label: "Sawing & cutting", count: 87 },
              { icon: "🌾", label: "Trimming & clearing", count: 34 },
              { icon: "🌍", label: "Soil & ground care", count: 22 },
              { icon: "🌳", label: "Garden care", count: 56 },
            ].map((c) => (
              <button key={c.label} className="flex items-start gap-3 rounded-xl border border-[#e5e5e5] bg-white p-4 text-left transition-all hover:border-[#273A60]/30 hover:shadow-sm">
                <span className="text-[22px]">{c.icon}</span>
                <div>
                  <p className="text-[13px] font-bold text-[#111]">{c.label}</p>
                  <p className="mt-0.5 text-[11px] text-[#888]">{c.count} products</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-[14px] font-bold text-[#111]">Recently viewed</h3>
          <div className="space-y-2">
            {[
              "Husqvarna Automower 430X NERA",
              "Husqvarna 572 XP Mark II",
              "CEORA 546 EPOS",
              "Husqvarna K 770",
            ].map((p) => (
              <div key={p} className="flex items-center gap-3 rounded-lg border border-[#e5e5e5] bg-white px-3 py-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded bg-[#f0f0f0] text-[#888]">
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="14" height="14" rx="2" />
                    <path d="M7 7h6M7 10h6M7 13h3" />
                  </svg>
                </span>
                <span className="text-[12px] font-medium text-[#333]">{p}</span>
              </div>
            ))}
          </div>

          {showRationale && (
            <p className="mt-4 rounded-lg bg-[#7b61ff]/10 px-3 py-2 text-[11px] text-[#7b61ff]">
              Recent/pinned items = fast re-access. Dealers look up the same few products many times per day.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   SALES VIEW
   ═══════════════════════════════════════════════════════ */

function SalesView({ showRationale }: { showRationale: boolean }) {
  return (
    <div className="space-y-6">
      {showRationale && (
        <RationaleTag>Sales = creating future revenue (quotes, leads, customer growth)</RationaleTag>
      )}
      {/* Pipeline */}
      <div className="rounded-xl border border-[#e5e5e5] bg-white p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-[14px] font-bold text-[#111]">Quote pipeline</h3>
          <button className="rounded-lg bg-[#273A60] px-3 py-1.5 text-[11px] font-semibold text-white">+ New quote</button>
        </div>
        <div className="mt-4 grid grid-cols-5 gap-3">
          {[
            { label: "Draft", count: 4, value: "SEK 128k", color: "bg-[#f5f5f5] text-[#555]" },
            { label: "Sent", count: 7, value: "SEK 342k", color: "bg-[#e3f2fd] text-[#1565c0]" },
            { label: "Reviewing", count: 3, value: "SEK 187k", color: "bg-[#fff3e0] text-[#e65100]" },
            { label: "Accepted", count: 5, value: "SEK 298k", color: "bg-[#e8f5e9] text-[#2e7d32]" },
            { label: "Rejected", count: 2, value: "SEK 42k", color: "bg-[#fce8e8] text-[#c44]" },
          ].map((s) => (
            <div key={s.label} className="rounded-lg border border-[#e5e5e5] p-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-[#888]">{s.label}</span>
                <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${s.color}`}>{s.count}</span>
              </div>
              <p className="mt-2 text-[13px] font-bold text-[#111]">{s.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Top customers + Sell-out status */}
      <div className="grid grid-cols-2 gap-6">
        <div className="rounded-xl border border-[#e5e5e5] bg-white">
          <div className="flex items-center justify-between border-b border-[#f0f0f0] px-5 py-4">
            <h3 className="text-[13px] font-bold text-[#111]">Top customers — 90d</h3>
            <button className="text-[11px] font-semibold text-[#273A60] hover:underline">See all</button>
          </div>
          <div className="divide-y divide-[#f0f0f0]">
            {[
              { name: "Skogsservice Norr AB", value: "SEK 248 900", trend: "+18%", positive: true },
              { name: "Lindström Fastigheter", value: "SEK 187 400", trend: "+7%", positive: true },
              { name: "AB Grönytor", value: "SEK 142 200", trend: "-4%", positive: false },
              { name: "Karlsson Park & Trädgård", value: "SEK 98 700", trend: "+22%", positive: true },
              { name: "Eriksson Trädgård AB", value: "SEK 76 300", trend: "+3%", positive: true },
            ].map((c) => (
              <div key={c.name} className="flex items-center justify-between px-5 py-3">
                <div>
                  <p className="text-[13px] font-semibold text-[#111]">{c.name}</p>
                  <p className="text-[11px] text-[#888]">{c.value}</p>
                </div>
                <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${c.positive ? "bg-[#e8f5e9] text-[#2e7d32]" : "bg-[#fce8e8] text-[#c44]"}`}>
                  {c.trend}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <div className="rounded-xl border-l-4 border-l-[#b8860b] border-y border-r border-[#e5e5e5] bg-white p-5">
            <div className="flex items-center gap-2">
              <span className="text-[18px]">⚠️</span>
              <h3 className="text-[13px] font-bold text-[#111]">12 products missing sell-out</h3>
            </div>
            <p className="mt-1 text-[11px] text-[#888]">
              Warranty is not active and bonus eligibility is paused until registered.
            </p>
            <button className="mt-3 rounded-lg bg-[#e65100] px-3 py-1.5 text-[11px] font-semibold text-white">Register now</button>
          </div>

          <div className="rounded-xl border border-[#e5e5e5] bg-white p-5">
            <h3 className="text-[13px] font-bold text-[#111]">Customer wishlists</h3>
            <p className="mt-1 text-[11px] text-[#888]">4 customers have items waiting on stock or price</p>
            <div className="mt-3 flex -space-x-2">
              {["AB", "LF", "KP", "EN"].map((i) => (
                <span key={i} className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-[#e8edf5] text-[10px] font-bold text-[#273A60]">{i}</span>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-[#e5e5e5] bg-white p-5">
            <h3 className="text-[13px] font-bold text-[#111]">This month&apos;s sell-out</h3>
            <p className="mt-1 text-[11px] text-[#888]">Registered sales to end customers</p>
            <p className="mt-3 text-[24px] font-extrabold text-[#273A60]">14 <span className="text-[12px] font-normal text-[#888]">units</span></p>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#f0f0f0]">
              <div className="h-full w-[56%] rounded-full bg-[#2a9d5c]" />
            </div>
            <p className="mt-1 text-[10px] text-[#999]">56% of monthly target (25)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   OPERATIONS VIEW
   ═══════════════════════════════════════════════════════ */

function OperationsView({ showRationale }: { showRationale: boolean }) {
  return (
    <div className="space-y-6">
      {showRationale && (
        <RationaleTag>Operations = fulfilling past commitments (orders already placed, invoices to collect)</RationaleTag>
      )}
      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-[#e5e5e5]">
        {[
          { label: "Orders", count: 16, active: true },
          { label: "Invoices", count: 8 },
          { label: "Payments" },
          { label: "Contracts", count: 23 },
          { label: "Warranties" },
          { label: "Service cases", count: 3 },
        ].map((t) => (
          <button
            key={t.label}
            className={`flex items-center gap-1.5 border-b-2 px-4 py-2.5 text-[12px] font-semibold transition-colors ${
              t.active ? "border-[#273A60] text-[#273A60]" : "border-transparent text-[#888] hover:text-[#555]"
            }`}
          >
            {t.label}
            {t.count !== undefined && (
              <span className={`rounded-full px-1.5 py-0.5 text-[10px] ${t.active ? "bg-[#273A60] text-white" : "bg-[#f0f0f0] text-[#888]"}`}>{t.count}</span>
            )}
          </button>
        ))}
      </div>

      {/* Order status overview */}
      <div>
        <h3 className="mb-3 text-[13px] font-bold text-[#111]">Orders by status</h3>
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: "In cart", count: 3, value: "SEK 47 200", color: "#888" },
            { label: "Processing", count: 5, value: "SEK 132 400", color: "#1565c0" },
            { label: "In transit", count: 6, value: "SEK 198 700", color: "#e65100" },
            { label: "Delivered", count: 32, value: "30d · SEK 842k", color: "#2e7d32" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-[#e5e5e5] bg-white p-4">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
                <span className="text-[11px] font-semibold text-[#888]">{s.label}</span>
              </div>
              <p className="mt-2 text-[22px] font-extrabold" style={{ color: s.color }}>{s.count}</p>
              <p className="text-[11px] text-[#999]">{s.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Attention + Contract radar */}
      <div className="grid grid-cols-[1.2fr_1fr] gap-6">
        <div className="rounded-xl border border-[#e5e5e5] bg-white">
          <div className="flex items-center justify-between border-b border-[#f0f0f0] px-5 py-4">
            <h3 className="text-[13px] font-bold text-[#111]">Invoices needing attention</h3>
            <button className="text-[11px] font-semibold text-[#273A60] hover:underline">See all 8</button>
          </div>
          <div className="divide-y divide-[#f0f0f0]">
            {[
              { inv: "90361100", status: "Overdue", statusColor: "bg-[#fce8e8] text-[#c44]", amount: "SEK 67 200", customer: "Landskapet Trädgård AB", days: "4 days late" },
              { inv: "90366751", status: "Due soon", statusColor: "bg-[#fff3e0] text-[#e65100]", amount: "SEK 42 890", customer: "Lindström Fastigheter", days: "in 3 days" },
              { inv: "90366296", status: "Open", statusColor: "bg-[#e3f2fd] text-[#1565c0]", amount: "SEK 18 450", customer: "Swedish Motors AB", days: "in 12 days" },
            ].map((i) => (
              <div key={i.inv} className="flex items-center gap-4 px-5 py-3">
                <div className="flex-1">
                  <p className="text-[13px] font-semibold text-[#111]">{i.inv} · {i.customer}</p>
                  <p className="text-[11px] text-[#888]">{i.amount} · {i.days}</p>
                </div>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${i.statusColor}`}>{i.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-[#e5e5e5] bg-white">
          <div className="border-b border-[#f0f0f0] px-5 py-4">
            <h3 className="text-[13px] font-bold text-[#111]">Contract expiration radar</h3>
            <p className="mt-0.5 text-[11px] text-[#888]">Renewals within 60 days</p>
          </div>
          <div className="divide-y divide-[#f0f0f0]">
            {[
              { customer: "BRF Solsidan", program: "Service Plus · Automower 450X", days: 7 },
              { customer: "Nilsson Villaservice", program: "Service Plus · 310 Mark II", days: 18 },
              { customer: "AB Grönytor", program: "Lease Plus · CEORA 546", days: 34 },
              { customer: "Eriksson Trädgård AB", program: "Warranty Plus · 550X", days: 52 },
            ].map((c) => (
              <div key={c.customer} className="flex items-center justify-between px-5 py-3">
                <div>
                  <p className="text-[13px] font-semibold text-[#111]">{c.customer}</p>
                  <p className="text-[11px] text-[#888]">{c.program}</p>
                </div>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                  c.days <= 14 ? "bg-[#fce8e8] text-[#c44]" : c.days <= 30 ? "bg-[#fff3e0] text-[#e65100]" : "bg-[#f5f5f5] text-[#888]"
                }`}>{c.days} days</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   INSIGHTS VIEW
   ═══════════════════════════════════════════════════════ */

function InsightsView({ showRationale }: { showRationale: boolean }) {
  return (
    <div className="space-y-6">
      {showRationale && (
        <RationaleTag>Insights = curated analytics, not a reports dump</RationaleTag>
      )}

      {/* Headline metrics */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Revenue · 90d", value: "SEK 1.84M", delta: "+12% vs prior", positive: true },
          { label: "Sell-through rate", value: "78%", delta: "+4pp vs prior", positive: true },
          { label: "Avg. cart size", value: "SEK 24 840", delta: "-3% vs prior", positive: false },
        ].map((m) => (
          <div key={m.label} className="rounded-xl border border-[#e5e5e5] bg-white p-5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#888]">{m.label}</p>
            <p className="mt-1.5 text-[26px] font-extrabold text-[#111]">{m.value}</p>
            <p className={`mt-0.5 text-[11px] font-semibold ${m.positive ? "text-[#2e7d32]" : "text-[#c44]"}`}>{m.delta}</p>
          </div>
        ))}
      </div>

      {/* Featured reports */}
      <div>
        <h3 className="mb-3 text-[13px] font-bold text-[#111]">Featured reports</h3>
        <div className="grid grid-cols-3 gap-3">
          {[
            { title: "Sell-through by category", desc: "30d / 90d / YTD splits", format: "PDF · Excel" },
            { title: "Bonus forecast — active campaigns", desc: "Projected bonus based on current pace", format: "PDF" },
            { title: "Customer churn indicators", desc: "Customers with decreasing order frequency", format: "Excel" },
            { title: "Stock velocity", desc: "Fast-movers vs slow-movers", format: "Excel · CSV" },
            { title: "Warranty claim rate", desc: "By model and product family", format: "PDF" },
            { title: "Benchmarking — my dealer vs region", desc: "Anonymized peer comparison", format: "PDF", new: true },
          ].map((r) => (
            <div key={r.title} className="rounded-xl border border-[#e5e5e5] bg-white p-4">
              <div className="flex items-start justify-between gap-2">
                <h4 className="text-[13px] font-bold text-[#111]">{r.title}</h4>
                {r.new && <span className="shrink-0 rounded-full bg-[#7b61ff] px-1.5 py-0.5 text-[9px] font-bold text-white">NEW</span>}
              </div>
              <p className="mt-1 text-[11px] text-[#888]">{r.desc}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-[10px] text-[#bbb]">{r.format}</span>
                <button className="text-[11px] font-semibold text-[#273A60] hover:underline">Generate →</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent exports */}
      <div className="rounded-xl border border-[#e5e5e5] bg-white">
        <div className="border-b border-[#f0f0f0] px-5 py-4">
          <h3 className="text-[13px] font-bold text-[#111]">Recent exports</h3>
        </div>
        <div className="divide-y divide-[#f0f0f0]">
          {[
            { name: "Sell-through Q1 2026.pdf", date: "2026-04-02", size: "2.4 MB" },
            { name: "Stock velocity March.xlsx", date: "2026-03-31", size: "1.8 MB" },
            { name: "Customer analysis — top 20.csv", date: "2026-03-28", size: "340 KB" },
          ].map((e) => (
            <div key={e.name} className="flex items-center justify-between px-5 py-3">
              <div>
                <p className="text-[13px] font-semibold text-[#111]">{e.name}</p>
                <p className="text-[11px] text-[#888]">{e.date} · {e.size}</p>
              </div>
              <button className="rounded-lg border border-[#d0d0d0] px-3 py-1.5 text-[11px] font-semibold text-[#555] hover:bg-[#fafafa]">Download</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   RESOURCES VIEW
   ═══════════════════════════════════════════════════════ */

function ResourcesView({ showRationale }: { showRationale: boolean }) {
  return (
    <div className="space-y-6">
      {showRationale && (
        <RationaleTag>Resources = everything Husqvarna gives you to grow your business</RationaleTag>
      )}

      {/* Active campaigns */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-[14px] font-bold text-[#111]">Active campaigns</h3>
          <span className="text-[11px] text-[#888]">2 running · 1 starting soon</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { name: "Vårkampanj 2026", period: "1 March – 31 May", progress: 65, tier: "Guld (4%)", color: "from-[#273A60] to-[#1a2d4d]" },
            { name: "Construction Pro Q2", period: "1 April – 30 June", progress: 28, tier: "Silver (2%)", color: "from-[#e65100] to-[#c44]" },
          ].map((c) => (
            <div key={c.name} className={`overflow-hidden rounded-xl bg-gradient-to-br ${c.color} p-5 text-white`}>
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">Campaign</span>
              <h4 className="mt-1 text-[16px] font-bold">{c.name}</h4>
              <p className="mt-0.5 text-[11px] text-white/70">{c.period}</p>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/15">
                <div className="h-full rounded-full bg-white" style={{ width: `${c.progress}%` }} />
              </div>
              <p className="mt-1 text-[11px] text-white/80">Current: <span className="font-bold text-white">{c.tier}</span></p>
            </div>
          ))}
        </div>
      </div>

      {/* News + Training */}
      <div className="grid grid-cols-2 gap-6">
        <div className="rounded-xl border border-[#e5e5e5] bg-white">
          <div className="flex items-center justify-between border-b border-[#f0f0f0] px-5 py-4">
            <h3 className="text-[13px] font-bold text-[#111]">News & launches</h3>
            <button className="text-[11px] font-semibold text-[#273A60] hover:underline">All news</button>
          </div>
          <div className="divide-y divide-[#f0f0f0]">
            {[
              { tag: "Launch", tagColor: "bg-[#e3f2fd] text-[#1565c0]", title: "CEORA 546 EPOS — official launch Q2 2026", date: "2026-03-15" },
              { tag: "Firmware", tagColor: "bg-[#e8eaf6] text-[#273A60]", title: "Automower NERA series — firmware 8.2", date: "2026-03-10" },
              { tag: "Bulletin", tagColor: "bg-[#fff3e0] text-[#e65100]", title: "SB-2026-014 — 572 XP Mark II startproblem", date: "2026-03-08" },
            ].map((n) => (
              <div key={n.title} className="flex items-start gap-3 px-5 py-3">
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${n.tagColor}`}>{n.tag}</span>
                <div className="flex-1">
                  <p className="text-[13px] font-semibold text-[#111]">{n.title}</p>
                  <p className="text-[11px] text-[#888]">{n.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-[#e5e5e5] bg-white">
          <div className="flex items-center justify-between border-b border-[#f0f0f0] px-5 py-4">
            <h3 className="text-[13px] font-bold text-[#111]">Recommended training</h3>
            <button className="text-[11px] font-semibold text-[#273A60] hover:underline">All courses</button>
          </div>
          <div className="divide-y divide-[#f0f0f0]">
            {[
              { level: "Core", title: "Automower series — product knowledge", duration: "45 min", status: "In progress", progress: 60 },
              { level: "Technical", title: "CEORA installation certification", duration: "2h", status: "Required", progress: 0 },
              { level: "Sales", title: "Battery Series — customer objections", duration: "30 min", status: "New", progress: 0 },
            ].map((c) => (
              <div key={c.title} className="px-5 py-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#888]">{c.level}</span>
                  <span className="text-[10px] text-[#bbb]">{c.duration}</span>
                </div>
                <p className="mt-1 text-[13px] font-semibold text-[#111]">{c.title}</p>
                {c.progress > 0 && (
                  <div className="mt-2 h-1 overflow-hidden rounded-full bg-[#f0f0f0]">
                    <div className="h-full rounded-full bg-[#2a9d5c]" style={{ width: `${c.progress}%` }} />
                  </div>
                )}
                <p className="mt-1 text-[10px] text-[#888]">{c.status}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Marketing materials */}
      <div className="rounded-xl border border-[#e5e5e5] bg-white p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-[13px] font-bold text-[#111]">Marketing materials</h3>
          <button className="text-[11px] font-semibold text-[#273A60] hover:underline">All assets</button>
        </div>
        <div className="mt-3 grid grid-cols-4 gap-3">
          {[
            { icon: "🖼️", label: "Product imagery", count: "480 assets" },
            { icon: "📄", label: "Brochures & flyers", count: "38 assets" },
            { icon: "🎬", label: "Video library", count: "22 assets" },
            { icon: "📱", label: "Social media kits", count: "14 kits" },
          ].map((a) => (
            <div key={a.label} className="flex items-center gap-3 rounded-lg border border-[#e5e5e5] p-3">
              <span className="text-[22px]">{a.icon}</span>
              <div>
                <p className="text-[12px] font-semibold text-[#111]">{a.label}</p>
                <p className="text-[10px] text-[#888]">{a.count}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
