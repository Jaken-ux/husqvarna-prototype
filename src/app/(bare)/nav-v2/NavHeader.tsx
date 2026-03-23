"use client";

import { useState, useRef, useEffect, Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { accountNav } from "./navData";
import ProfileSwitcher from "./ProfileSwitcher";
import { useShowroom } from "./ShowroomContext";

export default function NavHeader() {
  const [accountOpen, setAccountOpen] = useState(false);
  const [visionOpen, setVisionOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const { showroom, setShowroom } = useShowroom();
  const pathname = usePathname();
  const isHusqvarna = pathname.startsWith("/nav-v2/husqvarna") || pathname.startsWith("/nav-v2/kampanj");
  const isVerksamhet = pathname.startsWith("/nav-v2/min-verksamhet") || pathname.startsWith("/nav-v2/offerter") || pathname.startsWith("/nav-v2/varukorg") || pathname.startsWith("/nav-v2/task-flows");

  const accountTriggerRef = useRef<HTMLButtonElement>(null);
  const accountPanelRef = useRef<HTMLDivElement>(null);

  return (
    <header className="relative bg-white">
      {/* ═══ Row 1: Utility bar — compact, subdued ═══ */}
      <div className="border-b border-[#1a2d4d] bg-[#273A60]">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-3.5 md:px-6">
          {/* Left: Brand — logo + text */}
          <div className="flex items-center gap-4">
            {/* Mobile brand */}
            <Link href="/nav-v2" className="flex items-center gap-2 md:hidden">
              <Image
                src="/images/Husqvarna-logo.png"
                alt="Husqvarna"
                width={36}
                height={36}
                className="brightness-0 invert"
              />
              <span className="text-[15px] font-semibold tracking-tight text-white/90">
                Dealer Portal
              </span>
            </Link>

            {/* Desktop brand */}
            <Link href="/nav-v2" className="hidden items-center gap-2.5 md:flex">
              <Image
                src="/images/Husqvarna-logo.png"
                alt="Husqvarna"
                width={56}
                height={56}
                className="brightness-0 invert"
              />
              <span className="flex items-baseline gap-2.5">
                <span className="text-[20px] font-semibold tracking-tight text-white/90">
                  Dealer Portal
                </span>
                <span className="rounded bg-white/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-white/40">
                  Husqvarna Vision Prototype
                </span>
              </span>
            </Link>
          </div>

          {/* Right: Profile + icons — small */}
          <div className="flex items-center gap-3">
            {/* Profile switcher (desktop) */}
            <div className="hidden md:block">
              <ProfileSwitcher />
            </div>

            {/* Divider */}
            <div className="hidden h-5 w-px bg-white/20 md:block" />

            {/* Icons — smaller */}
            <div className="flex items-center gap-0.5">
              {/* Mobile search icon */}
              <button
                onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
                aria-label="Sök"
                className={`flex h-8 w-8 items-center justify-center rounded-md transition-colors md:hidden ${
                  mobileSearchOpen ? "bg-white/20 text-white" : "text-white/70 hover:bg-white/10"
                }`}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <circle cx="7" cy="7" r="4.5" />
                  <path d="M10.5 10.5L14 14" />
                </svg>
              </button>

              {/* Showroom toggle */}
              <button
                onClick={() => setShowroom(!showroom)}
                title={showroom ? "Showroom-läge aktivt — visar kundpriser" : "Showroom av — visar återförsäljarpriser"}
                className="hidden items-center gap-2 rounded-md px-2 py-1 text-[12px] font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white md:flex"
              >
                {/* Toggle track */}
                <span
                  className={`relative inline-flex h-[18px] w-[32px] shrink-0 items-center rounded-full transition-colors ${
                    showroom ? "bg-[#2a9d5c]" : "bg-white/25"
                  }`}
                >
                  <span
                    className={`inline-block h-[14px] w-[14px] rounded-full bg-white shadow transition-transform ${
                      showroom ? "translate-x-[16px]" : "translate-x-[2px]"
                    }`}
                  />
                </span>
                Showroom
              </button>

              {/* Divider */}
              <span className="hidden h-4 w-px bg-white/20 md:block" />

              {/* Notifications bell */}
              <button
                aria-label="Notifieringar"
                title="Notifieringar (5)"
                className="relative flex h-8 w-8 items-center justify-center rounded-md text-white/70 transition-colors hover:bg-white/10"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 18 18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 14a2 2 0 004 0" />
                  <path d="M13.73 11c.17-.26.27-.55.27-.86V7a5 5 0 00-10 0v3.14c0 .31.1.6.27.86L5 12h8l.73-1z" />
                </svg>
                <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#c44] text-[8px] font-bold text-white">
                  5
                </span>
              </button>

              {/* Account dropdown */}
              <div className="relative">
                <button
                  ref={accountTriggerRef}
                  onClick={() => setAccountOpen((prev) => !prev)}
                  aria-label="Mitt konto"
                  title="Mitt konto"
                  aria-expanded={accountOpen}
                  aria-haspopup="true"
                  className={`flex h-8 w-8 items-center justify-center rounded-md transition-colors ${
                    accountOpen
                      ? "bg-white/20 text-white"
                      : "text-white/70 hover:bg-white/10"
                  }`}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 18 18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  >
                    <circle cx="9" cy="6" r="3" />
                    <path d="M3 16c0-3.3 2.7-6 6-6s6 2.7 6 6" />
                  </svg>
                </button>

                {accountOpen && (
                  <AccountDropdown
                    panelRef={accountPanelRef}
                    triggerRef={accountTriggerRef}
                    onClose={() => {
                      setAccountOpen(false);
                      requestAnimationFrame(() =>
                        accountTriggerRef.current?.focus()
                      );
                    }}
                  />
                )}
              </div>

              {/* Cart */}
              <Link
                href="/nav-v2/varukorg"
                aria-label="Varukorg"
                title="Varukorg (3)"
                className="relative flex h-8 w-8 items-center justify-center rounded-md text-white/70 transition-colors hover:bg-white/10"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 18 18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 1h2.5l1.2 9.5a1.5 1.5 0 001.5 1.3h7.6a1.5 1.5 0 001.5-1.1L17 5H4.5" />
                  <circle cx="7" cy="15.5" r="1" />
                  <circle cx="13.5" cy="15.5" r="1" />
                </svg>
                <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#ff6b00] text-[8px] font-bold text-white">
                  3
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ Row 2: Primary navigation — links ═══ */}
      <div className="hidden border-b border-[#e0e0e0] bg-white shadow-sm md:block">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 md:px-6">
          {/* Left: Home + Husqvarna link */}
          <div className="flex items-center">
            <Link
              href="/nav-v2"
              className={`relative flex items-center justify-center px-4 py-5 transition-colors focus:outline-none ${
                pathname === "/nav-v2" ? "text-[#273A60]" : "text-[#bbb] hover:text-[#888]"
              }`}
              title="Startsidan"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 10.5L12 3l9 7.5" />
                <path d="M5 9.5V19a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1V9.5" />
              </svg>
              {pathname === "/nav-v2" && <span className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-[#273A60]" />}
            </Link>
            <span className="h-5 w-px bg-[#e0e0e0]" />
            <Link
              href="/nav-v2/husqvarna"
              className={`relative flex items-center gap-2.5 px-5 py-5 text-base transition-colors focus:outline-none ${
                isHusqvarna ? "text-[#111]" : "text-[#444] hover:text-[#111]"
              }`}
            >
              <span className="font-bold">Husqvarna</span>
              <span className={`text-sm font-medium ${isHusqvarna ? "text-[#666]" : "text-[#999]"}`}>Produkter, reservdelar &amp; tjänster</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={`transition-transform ${isHusqvarna ? "rotate-90" : ""}`}>
                <path d="M4.5 3l3 3-3 3" />
              </svg>
              {isHusqvarna && <span className="absolute bottom-0 left-5 right-5 h-[2px] rounded-full bg-[#273A60]" />}
            </Link>
          </div>

          {/* Center: Search — large & prominent */}
          <div className="flex flex-1 justify-center px-12">
            <SearchDropdown />
          </div>

          {/* Right: Min verksamhet link */}
          <div className="flex items-center">
            <Link
              href="/nav-v2/min-verksamhet"
              className={`relative flex items-center gap-2.5 px-5 py-5 text-base transition-colors focus:outline-none ${
                isVerksamhet ? "text-[#111]" : "text-[#444] hover:text-[#111]"
              }`}
            >
              <span className="font-bold">Min verksamhet</span>
              <span className={`text-sm font-medium ${isVerksamhet ? "text-[#666]" : "text-[#999]"}`}>Dealer Workspace</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={`transition-transform ${isVerksamhet ? "rotate-90" : ""}`}>
                <path d="M4.5 3l3 3-3 3" />
              </svg>
              {isVerksamhet && <span className="absolute bottom-0 left-5 right-5 h-[2px] rounded-full bg-[#273A60]" />}
            </Link>
          </div>
        </div>
      </div>

      {/* ═══ Mobile search panel — replaces nav row when open ═══ */}
      {mobileSearchOpen ? (
        <MobileSearchPanel key={String(mobileSearchOpen)} onClose={() => setMobileSearchOpen(false)} />
      ) : (
        /* ═══ Mobile Row 2: Triple navigation ═══ */
        <div className="flex border-b border-[#e0e0e0] bg-white md:hidden">
          <Link
            href="/nav-v2"
            className={`relative flex flex-1 items-center justify-center gap-1.5 py-3 text-[13px] font-bold transition-colors ${
              pathname === "/nav-v2" ? "text-[#273A60]" : "text-[#999]"
            }`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 10.5L12 3l9 7.5" />
              <path d="M5 9.5V19a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1V9.5" />
            </svg>
            Hem
            {pathname === "/nav-v2" && <span className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full bg-[#273A60]" />}
          </Link>
          <Link
            href="/nav-v2/husqvarna"
            className={`relative flex flex-1 items-center justify-center gap-1.5 py-3 text-[13px] font-bold transition-colors ${
              isHusqvarna ? "text-[#273A60]" : "text-[#999]"
            }`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="3" />
              <path d="M9 8h6M9 12h6M9 16h3" />
            </svg>
            Husqvarna
            {isHusqvarna && <span className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full bg-[#273A60]" />}
          </Link>
          <Link
            href="/nav-v2/min-verksamhet"
            className={`relative flex flex-1 items-center justify-center gap-1.5 py-3 text-[13px] font-bold transition-colors ${
              isVerksamhet ? "text-[#273A60]" : "text-[#999]"
            }`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="16" rx="2" />
              <path d="M3 9h18" />
              <path d="M9 9v11" />
            </svg>
            Min verksamhet
            {isVerksamhet && <span className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full bg-[#273A60]" />}
          </Link>
        </div>
      )}

      {/* Floating vision scope button */}
      <button
        onClick={() => setVisionOpen(true)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9998] flex items-center gap-2 sm:gap-2.5 rounded-full bg-gradient-to-r from-[#ff6b00] to-[#e55a00] px-4 sm:px-5 py-2.5 sm:py-3 text-[12px] sm:text-[13px] font-bold text-white shadow-lg shadow-orange-500/25 transition-all hover:scale-105 hover:shadow-xl hover:shadow-orange-500/30 active:scale-[0.98]"
      >
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="10" cy="10" r="8" />
          <path d="M10 6v4l2.5 2.5" />
        </svg>
        Utforska prototypen
        <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-white/20 px-1.5 text-[10px] font-bold">
          12
        </span>
      </button>

      {/* Vision Scope overlay */}
      {visionOpen && <VisionScopeOverlay onClose={() => setVisionOpen(false)} />}
    </header>
  );
}

/* ═══ SEARCH DROPDOWN ═══ */
const recentSearches = ["585 57 28-01", "svärdkedja H37", "garanti Lindström"];

const searchProducts = [
  { name: "Husqvarna Automower 430X NERA", article: "585 57 28-01", status: "active" as const },
  { name: "Husqvarna Automower 430X", article: "967 62 33-17", status: "discontinued" as const },
  { name: "Husqvarna Automower 435X AWD", article: "970 52 76-12", status: "active" as const },
];

const searchDocuments = [
  { name: "Servicemanual — Automower 430X NERA", type: "PDF", category: "Manual" },
  { name: "Servicebulletin SB-2026-003 — Hjulmotor 430X/435X", type: "PDF", category: "Bulletin" },
  { name: "Installationsguide — Automower 430X NERA", type: "PDF", category: "Guide" },
];

function SearchDropdown() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div ref={containerRef} className="relative w-full max-w-xl">
      <svg
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-[#888]"
        width="20"
        height="20"
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
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => { setOpen(true); setQuery("Automower 430X"); }}
        placeholder="Sök produkter, artiklar, sprängskisser..."
        aria-label="Sök"
        className={`h-11 w-full rounded-xl border bg-[#f8f8f8] pl-11 pr-4 text-[15px] text-[#333] placeholder-[#aaa] transition-colors focus:border-[#999] focus:bg-white focus:shadow-sm focus:outline-none ${
          open ? "border-[#999] bg-white shadow-sm" : "border-[#d0d0d0]"
        }`}
      />

      {open && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-[#e0e0e0] bg-white shadow-xl">
          {/* Recent searches */}
          <div className="border-b border-[#f0f0f0] px-4 py-3">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#bbb]">Senaste sökningar</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {recentSearches.map((s) => (
                <button
                  key={s}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#e5e5e5] bg-[#fafafa] px-3 py-1 text-[12px] text-[#555] transition-colors hover:border-[#ccc] hover:bg-[#f0f0f0]"
                  onClick={() => setQuery(s)}
                >
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                    <path d="M1 8a7 7 0 1114 0A7 7 0 011 8z" />
                    <path d="M8 4v4l2.5 1.5" />
                  </svg>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Products */}
          <div className="border-b border-[#f0f0f0] px-4 py-3">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[#bbb]">Produkter</p>
              <span className="text-[11px] text-[#999]">{searchProducts.length} träffar</span>
            </div>
            <div className="mt-2 space-y-0.5">
              {searchProducts.map((p) => (
                <a
                  key={p.article}
                  href="#"
                  className="flex items-center gap-3 rounded-lg px-2 py-2.5 transition-colors hover:bg-[#f5f5f5]"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f0f0f0]">
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="#888" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="14" height="14" rx="2" />
                      <path d="M7 7h6M7 10h6M7 13h3" />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="truncate text-[13px] font-medium text-[#111]">{p.name}</span>
                      <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                        p.status === "active"
                          ? "bg-[#e8f5e9] text-[#2e7d32]"
                          : "bg-[#f5f5f5] text-[#999]"
                      }`}>
                        {p.status === "active" ? "Aktiv" : "Utgången"}
                      </span>
                    </div>
                    <span className="text-[12px] text-[#888]">{p.article}</span>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#ccc" strokeWidth="1.6" strokeLinecap="round">
                    <path d="M6 4l4 4-4 4" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Documents */}
          <div className="px-4 py-3">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[#bbb]">Dokument</p>
              <span className="text-[11px] text-[#999]">{searchDocuments.length} träffar</span>
            </div>
            <div className="mt-2 space-y-0.5">
              {searchDocuments.map((d) => (
                <a
                  key={d.name}
                  href="#"
                  className="flex items-center gap-3 rounded-lg px-2 py-2.5 transition-colors hover:bg-[#f5f5f5]"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#fef3e8]">
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="#c87c2a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M13 2H5a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6l-4-4z" />
                      <path d="M13 2v4h4" />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="block truncate text-[13px] font-medium text-[#111]">{d.name}</span>
                    <span className="text-[12px] text-[#888]">{d.category} · {d.type}</span>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#ccc" strokeWidth="1.6" strokeLinecap="round">
                    <path d="M6 4l4 4-4 4" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-[#f0f0f0] bg-[#fafafa] px-4 py-3">
            <a href="#" className="flex items-center justify-center gap-1.5 text-[13px] font-medium text-[#273A60] transition-colors hover:text-[#1a2d4d]">
              Visa alla resultat för &quot;{query}&quot;
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M5 8h6M8 5l3 3-3 3" />
              </svg>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══ MOBILE SEARCH PANEL ═══ */

function MobileSearchPanel({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [resultsOpen, setResultsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="border-b border-[#e0e0e0] bg-white md:hidden">
      {/* Search input — always visible */}
      <div className="px-4 pt-3 pb-3">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#aaa]" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <circle cx="7" cy="7" r="4.5" />
              <path d="M10.5 10.5L14 14" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setResultsOpen(true)}
              placeholder="Sök produkter, artiklar, dokument..."
              className="h-10 w-full rounded-lg border border-[#d0d0d0] bg-[#f8f8f8] pl-10 pr-3 text-[14px] text-[#333] placeholder-[#aaa] focus:border-[#273A60] focus:bg-white focus:outline-none"
            />
          </div>
          <button
            onClick={() => setResultsOpen(true)}
            className="flex h-10 shrink-0 items-center justify-center rounded-lg bg-[#273A60] px-4 text-[13px] font-semibold text-white transition-colors active:bg-[#1a2d4d]"
          >
            Sök
          </button>
          <button
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#d0d0d0] text-[#999] transition-colors active:bg-[#f0f0f0]"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 4l8 8M12 4l-8 8" />
            </svg>
          </button>
        </div>
      </div>

      {/* Results — only after interaction */}
      {resultsOpen && (
      <div>

      {/* Recent searches */}
      <div className="border-t border-[#f0f0f0] px-4 py-3">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-[#bbb]">Senaste sökningar</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {recentSearches.map((s) => (
            <button
              key={s}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#e5e5e5] bg-[#fafafa] px-3 py-1.5 text-[12px] text-[#555]"
              onClick={() => setQuery(s)}
            >
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                <path d="M1 8a7 7 0 1114 0A7 7 0 011 8z" />
                <path d="M8 4v4l2.5 1.5" />
              </svg>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Products */}
      <div className="border-t border-[#f0f0f0] px-4 py-3">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#bbb]">Produkter</p>
          <span className="text-[11px] text-[#999]">{searchProducts.length} träffar</span>
        </div>
        <div className="mt-2 space-y-0.5">
          {searchProducts.map((p) => (
            <a
              key={p.article}
              href="#"
              className="flex items-center gap-3 rounded-lg px-1 py-2.5 transition-colors active:bg-[#f5f5f5]"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f0f0f0]">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="#888" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="14" height="14" rx="2" />
                  <path d="M7 7h6M7 10h6M7 13h3" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="truncate text-[13px] font-medium text-[#111]">{p.name}</span>
                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                    p.status === "active"
                      ? "bg-[#e8f5e9] text-[#2e7d32]"
                      : "bg-[#f5f5f5] text-[#999]"
                  }`}>
                    {p.status === "active" ? "Aktiv" : "Utgången"}
                  </span>
                </div>
                <span className="text-[12px] text-[#888]">{p.article}</span>
              </div>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#ccc" strokeWidth="1.6" strokeLinecap="round">
                <path d="M6 4l4 4-4 4" />
              </svg>
            </a>
          ))}
        </div>
      </div>

      {/* Documents */}
      <div className="border-t border-[#f0f0f0] px-4 py-3">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#bbb]">Dokument</p>
          <span className="text-[11px] text-[#999]">{searchDocuments.length} träffar</span>
        </div>
        <div className="mt-2 space-y-0.5">
          {searchDocuments.map((d) => (
            <a
              key={d.name}
              href="#"
              className="flex items-center gap-3 rounded-lg px-1 py-2.5 transition-colors active:bg-[#f5f5f5]"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#fef3e8]">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="#c87c2a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2H5a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6l-4-4z" />
                  <path d="M13 2v4h4" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <span className="block truncate text-[13px] font-medium text-[#111]">{d.name}</span>
                <span className="text-[12px] text-[#888]">{d.category} · {d.type}</span>
              </div>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#ccc" strokeWidth="1.6" strokeLinecap="round">
                <path d="M6 4l4 4-4 4" />
              </svg>
            </a>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-[#f0f0f0] bg-[#fafafa] px-4 py-3">
        <a href="#" className="flex items-center justify-center gap-1.5 text-[13px] font-medium text-[#273A60]">
          Visa alla resultat för &quot;{query}&quot;
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M5 8h6M8 5l3 3-3 3" />
          </svg>
        </a>
      </div>

      </div>
      )}
    </div>
  );
}

function AccountDropdown({
  panelRef,
  triggerRef,
  onClose,
}: {
  panelRef: React.RefObject<HTMLDivElement | null>;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  onClose: () => void;
}) {
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => firstLinkRef.current?.focus(), 50);

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    function onClick(e: MouseEvent) {
      const target = e.target as Node;
      if (triggerRef.current?.contains(target)) return;
      if (panelRef.current && !panelRef.current.contains(target)) {
        onClose();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onClick);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onClick);
    };
  }, [onClose, panelRef, triggerRef]);

  const lastIndex = accountNav.items.length - 1;

  return (
    <div
      ref={panelRef}
      role="menu"
      aria-label="Mitt konto"
      className="animate-panel-in motion-reduce:animate-none absolute right-0 top-full z-50 mt-2 w-52 rounded-lg border border-[#d0d0d0] bg-white py-2 shadow-lg"
    >
      <p className="px-4 pb-2 pt-1 text-[11px] font-semibold uppercase tracking-widest text-[#bbb]">
        Mitt konto
      </p>
      {accountNav.items.map((item, i) => (
        <Fragment key={item.label}>
          {i === lastIndex && (
            <div className="my-1 border-t border-[#e5e5e5]" />
          )}
          <a
            ref={i === 0 ? firstLinkRef : undefined}
            href={item.href}
            role="menuitem"
            className={`block px-4 py-2 text-sm transition-colors hover:bg-[#f5f5f5] focus-visible:bg-[#f5f5f5] focus-visible:outline-none ${
              i === lastIndex ? "text-[#c00]" : "text-[#555] hover:text-[#111]"
            }`}
          >
            {item.label}
          </a>
        </Fragment>
      ))}
    </div>
  );
}

/* ═══ VISION SCOPE OVERLAY ═══ */

type ScopeItem = {
  title: string;
  status: string;
  priority: "Tier 1" | "Tier 2" | "Tier 3";
  tags_user: string[];
  tags_business: string[];
  tags_strategic: string[];
  problem_today: string;
  ux_rationale: string;
  user_impact: string;
  business_impact: string;
  strategic_value: string;
  dependencies: string;
  scope_note: string;
  href?: string;
};

type ScopeArea = {
  category: string;
  color: string;
  items: ScopeItem[];
};

const visionAreas: ScopeArea[] = [
  {
    category: "Navigation & Struktur",
    color: "#273A60",
    items: [
      {
        title: "Dual Navigation",
        status: "Ny arkitektur",
        priority: "Tier 1",
        tags_user: ["Reduces cognitive load", "Improves findability", "Improves mental model alignment"],
        tags_business: ["Increased portal adoption", "Reduced training cost", "Reduced support dependency"],
        tags_strategic: ["Foundation capability", "Platform scalability"],
        problem_today: "⚠ Needs investigation — Current navigation structure and its impact on dealer workflows has not been validated.",
        ux_rationale: "The navigation structure reflects the two primary content domains.\n\nHusqvarna represents information coming from the manufacturer: products, spare parts, campaigns, documentation.\n\nMin verksamhet represents tools used to operate the dealership: orders, invoices, contracts, customers, reports.\n\nSeparating these domains reduces interpretation effort and improves predictability.",
        user_impact: "Navigation structure becomes self-descriptive. The learning curve for new portal access is reduced. Switching between information and operational tasks introduces less friction.",
        business_impact: "Reduced onboarding time for new dealer accounts. Reduced need for training material. Increased discoverability of dealer workspace features. Higher adoption of portal functionality.",
        strategic_value: "Creates a scalable structure where new services can be placed in the correct domain. Supports future personalization of navigation. Supports modular product architecture.",
        dependencies: "Affects global navigation. Affects IA structure. Affects breadcrumb logic.",
        scope_note: "Foundation for future portal structure.",
      },
      {
        title: "Kontextuell sökning",
        status: "Ny design",
        priority: "Tier 1",
        tags_user: ["Snabbare åtkomst", "Färre klick"],
        tags_business: ["Ökad produktupptäckt", "Minskad söktid"],
        tags_strategic: ["AI-readiness"],
        problem_today: "⚠ Needs investigation — Current search experience and its limitations have not been validated.",
        ux_rationale: "Kontextuell sökning direkt i headern möjliggör åtkomst utan sidnavigering. Grupperade resultat (produkter, dokument, senaste sökningar) introducerar tydlig informationshierarki.",
        user_impact: "Produktinfo, dokument och ordrar blir tillgängliga med 1-2 tangenttryckningar istället för 3-5 klick genom menyer.",
        business_impact: "Ökad exponering av produktdokumentation och sprängskisser. Kortare identifieringsprocess för reservdelar → kortare serviceärenden.",
        strategic_value: "Sökinfrastrukturen förbereder för AI-driven sökning med naturligt språk, rekommendationer och prediktiva förslag.",
        dependencies: "Kräver sökindex över produkter, dokument, order och kunder. Backend API för realtidsresultat.",
        scope_note: "Prototypen visar desktop-dropdown med sektioner samt mobil sökning med tvåstegsinteraktion (tom input → fokus visar resultat). Mock-data demonstrerar gruppering.",
      },
    ],
  },
  {
    category: "Husqvarna (OEM-sida)",
    color: "#ff6b00",
    items: [
      {
        title: "Produktarbetsyta",
        status: "Omdesign",
        priority: "Tier 1",
        tags_user: ["Snabbare identifiering", "Samlad vy"],
        tags_business: ["Fler reservdelsorder", "Kortare serviceärenden"],
        tags_strategic: ["AI-integration"],
        problem_today: "⚠ Needs investigation — Current product page capabilities and spare parts identification workflow have not been validated.",
        ux_rationale: "En arbetsyta istället för en katalog — med identifieringshub, AI-reservdelshjälp och snabb kategoriåtkomst — omvandlar produktsidan från informationsvisning till operativt verktyg.",
        user_impact: "Reservdelsidentifiering kan ske direkt i portalen istället för via separata PDF-sprängskisser. QR-skanning eliminerar manuell sökning.",
        business_impact: "Ökad reservdelsomsättning genom förenklad beställning. Kortare serviceärenden → fler jobb per dag.",
        strategic_value: "AI-reservdelshjälpen är en första implementation av conversational commerce som kan expanderas till hela sortimentet.",
        dependencies: "AI-modell för reservdelsidentifiering. QR-kodinfrastruktur på produkter. Produktdatabas med relationer.",
        scope_note: "Prototypen visar identifieringshub, AI-chat mock, snabbåtkomst och kategoribläddrare med expanderbara underkategorier.",
        href: "/nav-v2/husqvarna",
      },
      {
        title: "Kampanjsidor",
        status: "Ny design",
        priority: "Tier 2",
        tags_user: ["Bättre kampanjöversikt", "Tydligare incitament"],
        tags_business: ["Högre kampanjdeltagande", "Ökad sell-through"],
        tags_strategic: ["Dealer engagement"],
        problem_today: "⚠ Needs investigation — Current campaign communication channels and dealer visibility into campaign status have not been validated.",
        ux_rationale: "Visuella progressindikatorer och tydliga bonusnivåer gör kampanjstatus synlig i realtid. Strukturen visar exakt position i bonusstegen och vad som krävs för nästa nivå.",
        user_impact: "Kampanjstatus och produktprioritering blir direkt synlig. Bonusprogressionen synliggör incitamentstrukturen.",
        business_impact: "Ökad synlighet av kampanjvillkor kan bidra till högre sell-through. Kampanjinformation når dealers som idag inte nås via e-post.",
        strategic_value: "Digital kampanjplattform ersätter manuell PDF-distribution. Möjliggör realtidsuppföljning av kampanjeffekt per dealer.",
        dependencies: "Kampanjdata-API med bonusnivåer och progression. Integration med säljdata för realtidsuppdatering.",
        scope_note: "Prototypen visar kampanjlistning med två aktiva kampanjer, progressbar, kategori-pills och tidigare kampanjresultat. Detaljsida med villkor.",
        href: "/nav-v2/husqvarna/kampanjer",
      },
      {
        title: "Nyheter & Lanseringar",
        status: "Ny sida",
        priority: "Tier 3",
        tags_user: ["Samlad informationskanal", "Proaktiv uppdatering"],
        tags_business: ["Snabbare produktadoption", "Bättre informerad dealer"],
        tags_strategic: ["Content hub"],
        problem_today: "⚠ Needs investigation — Current news distribution channels and dealer access to product updates have not been validated.",
        ux_rationale: "En samlad nyhetssida i portalen konsoliderar informationsflödet till en kanal. Kategorifilter möjliggör filtrering efter relevans.",
        user_impact: "Kritiska servicebulletiner och produktlanseringar samlas på en plats. Informationstillgänglighet ökar.",
        business_impact: "Snabbare adoption av nya produkter. Högre compliance med servicebulletiner → färre garantiärenden.",
        strategic_value: "Nyhetskanalen kan expanderas med personalisering baserad på dealerns sortiment och kundtyper.",
        dependencies: "CMS-integration för att publicera nyheter. Kategoritaxonomi för innehållsfiltrering.",
        scope_note: "Prototypen visar featured article, kategorifilter (5 kategorier), nyhetskort med bilder och taggar. 8 mock-artiklar.",
        href: "/nav-v2/husqvarna/nyheter",
      },
    ],
  },
  {
    category: "Min verksamhet (Dealer Workspace)",
    color: "#2a9d5c",
    items: [
      {
        title: "Min verksamhet — Landningssida",
        status: "Ny design",
        priority: "Tier 1",
        tags_user: ["Helhetsbild", "Färre klick till action"],
        tags_business: ["Ökad feature-adoption", "Minskad bounce"],
        tags_strategic: ["Dealer engagement hub"],
        problem_today: "⚠ Needs investigation — Current landing page structure and its effectiveness for dealer orientation have not been validated.",
        ux_rationale: "Puffar med live-metriker introducerar en omedelbar statusbild. Konsoliderad orderhanteringspuff med alert-prickar ersätter fyra separata länkar och reducerar antalet navigeringssteg.",
        user_impact: "Statusen för restorder, förfallna fakturor och andra åtgärdspunkter blir synlig utan att varje avsnitt behöver öppnas separat.",
        business_impact: "Högre användning av underutnyttjade funktioner (rapporter, betalningsöversikt) genom synlighet. Snabbare ärendehantering.",
        strategic_value: "Landningssidan som engagement hub möjliggör framtida personalisering, notifikationer och AI-sammanfattningar.",
        dependencies: "Realtidsdata för metriker (orderantal, fakturastatus). Badge-system för notifikationer.",
        scope_note: "Prototypen visar 50/50 grid med orderhanteringspuff (mörk gradient, glassmorphism-metriker) och staplade ekonomipuffar. NY-badges på alla nya sidor.",
        href: "/nav-v2/min-verksamhet",
      },
      {
        title: "Dealer Workspace",
        status: "Ny sida",
        priority: "Tier 1",
        tags_user: ["Daglig arbetsyta", "Prioriterad uppgiftslista"],
        tags_business: ["Ökad produktivitet", "Bättre dataunderlag"],
        tags_strategic: ["Centralt arbetsverktyg"],
        problem_today: "⚠ Needs investigation — Whether a consolidated workspace exists and how daily dealer tasks are currently structured has not been validated.",
        ux_rationale: "En central arbetsyta med tabbar (Dashboard, Produkter, Kunder, Avtal & program, Idag) samlar dagliga uppgifter på en plats. Prioriterad task-lista strukturerar åtgärder efter angelägenhet.",
        user_impact: "Dagligt arbete konsolideras till en sida. Prioritetssortering synliggör kritiska ärenden (HyperCare, utgående avtal) överst.",
        business_impact: "Fler ärenden kan hanteras per session. Bättre datakvalitet genom att sellout-registrering och installationsrapportering presenteras som tydliga uppgifter.",
        strategic_value: "Workspace blir den naturliga platsen för AI-assistans, automatiserade uppgifter och proaktiva rekommendationer.",
        dependencies: "Integration med order, garanti, avtal och kunddata. Task-engine för att generera dagliga uppgifter.",
        scope_note: "Prototypen visar 5 tabbar med fullständig mock-data: 7 KPI:er, prioritetslistor, programöversikt, produkttabell med livscykelstatus, kundöversikt med expanderbara detaljer, avtalsvyer med view-switcher, och daglig åtgärdslista.",
        href: "/nav-v2/min-verksamhet/workspace",
      },
      {
        title: "Unified Order Management",
        status: "Ny sida",
        priority: "Tier 1",
        tags_user: ["Improves overview", "Reduces navigation steps"],
        tags_business: ["Reduced support cost", "Increased order accuracy"],
        tags_strategic: ["Foundation capability"],
        problem_today: "⚠ Needs investigation — Current order management structure and number of entry points have not been validated.",
        ux_rationale: "A unified entry point presents orders as a lifecycle rather than separate destinations. This consolidates navigation and reduces the number of entry points.",
        user_impact: "Order progress becomes trackable in one place. The number of navigation decisions required to reach order information is reduced.",
        business_impact: "Reduced order mistakes. Reduced support inquiries. Improved efficiency of order handling.",
        strategic_value: "Foundation for order automation and predictive logistics.",
        dependencies: "Requires consolidated data model.",
        scope_note: "Core workflow improvement.",
        href: "/nav-v2/min-verksamhet/orders",
      },
      {
        title: "Fakturor",
        status: "Ny design",
        priority: "Tier 2",
        tags_user: ["Bättre filtrerbarhet", "Snabbare export"],
        tags_business: ["Snabbare betalningar", "Minskad administration"],
        tags_strategic: ["Ekonomimodul"],
        problem_today: "⚠ Needs investigation — Current invoice page capabilities and filtering options have not been validated.",
        ux_rationale: "Statusflaggor (betald/förfallen/kreditnota) ger omedelbar överblick. Datumfilter + sök + export i ett gränssnitt eliminerar behovet av excel-workarounds.",
        user_impact: "Specifika fakturor kan lokaliseras via sök och statusfilter istället för manuell genomgång av listor. Export-funktionen eliminerar manuellt arbete.",
        business_impact: "Snabbare identifiering av förfallna fakturor → bättre betalningsflöde för Husqvarna.",
        strategic_value: "Designmönstret (filter + statusflaggor + export) återanvänds som standard för alla listbaserade vyer.",
        dependencies: "Faktura-API med statusflaggor. Exportfunktion (PDF/CSV).",
        scope_note: "Prototypen visar datumfilter, statuspills, sökbar tabell med 8 mockfakturor, checkbox-markering och exportknapp.",
        href: "/nav-v2/min-verksamhet/fakturor",
      },
      {
        title: "Betalningar & Saldo",
        status: "Ny design",
        priority: "Tier 2",
        tags_user: ["Ekonomisk överblick", "Proaktiv planering"],
        tags_business: ["Bättre cashflow", "Ökad kreditanvändning"],
        tags_strategic: ["Ekonomimodul"],
        problem_today: "⚠ Needs investigation — Current payment and balance visibility across systems has not been validated.",
        ux_rationale: "Visuell kreditgräns-progress och bonustracker gör abstrakt finansiell data konkret. Kommande betalningar presenteras för proaktiv planering.",
        user_impact: "Tillgänglig kredit och bonusstatus blir synlig på en plats. Finansiell information kräver inte åtkomst till separata system.",
        business_impact: "Ökad kreditanvändning → högre ordervolym. Bättre betalningsdisciplin genom transparens.",
        strategic_value: "Ekonomivyn kan expanderas med prognos, automatisk betalningsavisering och integration med dealers bokföringssystem.",
        dependencies: "Saldo-API, kreditgräns-data, bonusprogramdata, betalningshistorik.",
        scope_note: "Prototypen visar saldokort med kreditgräns-bar, bonustracker, kommande betalningar och transaktionshistorik.",
        href: "/nav-v2/min-verksamhet/betalningar",
      },
      {
        title: "Rapporter",
        status: "Ny design",
        priority: "Tier 3",
        tags_user: ["Enkel åtkomst", "Format-flexibilitet"],
        tags_business: ["Bättre beslutsunderlag", "Ökad datadrivenhet"],
        tags_strategic: ["Business intelligence"],
        problem_today: "⚠ Needs investigation — Current report access workflow and catalog structure have not been validated.",
        ux_rationale: "Rapportkatalog med kategorifilter och populära rapporter minskar tröskeln. Formatbadges (PDF/Excel/CSV) sätter förväntningar direkt.",
        user_impact: "Rapporter kan hittas via kategori och popularitetssortering utan att det exakta namnet behöver vara känt. Senaste exporter ger snabb åtkomst till återkommande rapporter.",
        business_impact: "Bättre tillgång till beslutsunderlag. Ökad exponering av underutnyttjade rapporter.",
        strategic_value: "Rapportplattformen förbereder för dynamiska dashboards och AI-genererade insikter.",
        dependencies: "Rapportgenerering-API med formatstöd. Användningsstatistik för populärsortering.",
        scope_note: "Prototypen visar populära rapporter, senaste exporter och fullständig katalog med kategorifilter och formatbadges.",
        href: "/nav-v2/min-verksamhet/rapporter",
      },
      {
        title: "Wishlist",
        status: "Ny design",
        priority: "Tier 2",
        tags_user: ["Better decision support"],
        tags_business: ["Increased program sales"],
        tags_strategic: ["Cross-sell enabler"],
        problem_today: "⚠ Needs investigation — Whether customer interest tracking exists and how it is currently handled has not been validated.",
        ux_rationale: "Wishlist introduces a structured way to capture and track potential customer interest signals.",
        user_impact: "Better overview of sales opportunities.",
        business_impact: "Improves conversion rate. Supports proactive sales.",
        strategic_value: "Foundation for CRM-lite functionality.",
        dependencies: "Requires customer linkage.",
        scope_note: "Sales enablement feature.",
        href: "/nav-v2/min-verksamhet/wishlist",
      },
    ],
  },
  {
    category: "Avtal & program (Workspace-vy)",
    color: "#b8860b",
    items: [
      {
        title: "Contract View Switcher",
        status: "Ny arkitektur",
        priority: "Tier 1",
        tags_user: ["Reduces cognitive load", "Improves overview", "Reduces errors"],
        tags_business: ["Increased program adoption", "Improved data quality"],
        tags_strategic: ["Revenue enabler", "Platform capability"],
        problem_today: "⚠ Needs investigation — Current contract management interface and how different contract types are presented have not been validated.",
        ux_rationale: "Each contract type has its own logic and required actions.\n\nSwitching schema per program allows the interface to reflect real workflows.",
        user_impact: "Clearer overview of contract lifecycle. Available actions are contextually relevant per contract type. Contract status is presented with program-specific indicators.",
        business_impact: "Improves adoption of service programs. Supports upselling of extended services. Improves contract data accuracy.",
        strategic_value: "Enables program-specific features. Supports lifecycle-based services.",
        dependencies: "Requires shared filter architecture. Requires dynamic table schema.",
        scope_note: "Critical for scaling service programs.",
        href: "/nav-v2/min-verksamhet/workspace",
      },
    ],
  },
  {
    category: "Offerter & Prissättning",
    color: "#7b61ff",
    items: [
      {
        title: "Offerthantering",
        status: "Omdesign",
        priority: "Tier 2",
        tags_user: ["Bättre offertöversikt", "Snabbare hantering"],
        tags_business: ["Högre offert-till-order-konvertering"],
        tags_strategic: ["Säljverktyg"],
        problem_today: "⚠ Needs investigation — Current quote management interface and status visibility have not been validated.",
        ux_rationale: "Status-tabbar, kundinfo och utgångsdatum direkt i listan introducerar omedelbar överblick. Snabbåtgärder reducerar antalet klick per åtgärd.",
        user_impact: "Offerter som kräver uppföljning identifieras direkt i listan utan att varje offert behöver öppnas.",
        business_impact: "Snabbare offerthantering → fler konverterade offerter.",
        strategic_value: "Offertverktyget kan expanderas med automatiska påminnelser, mallar och integration med prissättningsmotor.",
        dependencies: "Offert-API med statushantering. Kundkoppling.",
        scope_note: "Prototypen visar offertlista med status-tabs, kundinfo, utgångsdatum och snabbåtgärder.",
        href: "/nav-v2/offerter",
      },
    ],
  },
  {
    category: "Responsiv design & Mobilanpassning",
    color: "#c44",
    items: [
      {
        title: "Mobile UX Strategy",
        status: "Ny design",
        priority: "Tier 1",
        tags_user: ["Mobile usability", "Faster task completion"],
        tags_business: ["Increased portal usage frequency"],
        tags_strategic: ["Future AI readiness", "Platform scalability"],
        problem_today: "⚠ Needs investigation — Current mobile experience and field usage patterns have not been validated.",
        ux_rationale: "Responsive adaptation ensures core workflows remain usable on smaller screens.",
        user_impact: "Tasks can be completed directly on mobile devices. Reduced need to switch to desktop.",
        business_impact: "Higher daily usage frequency. More consistent data updates.",
        strategic_value: "Enables field service scenarios. Enables future mobile-first features.",
        dependencies: "Requires responsive layout strategy.",
        scope_note: "Necessary for long-term adoption.",
      },
      {
        title: "Sticky table headers & scrolloptimering",
        status: "Ny design",
        priority: "Tier 2",
        tags_user: ["Bättre tabellnavigering", "Kontextbehållning"],
        tags_business: ["Ökad dataanvändning"],
        tags_strategic: ["UX-standard"],
        problem_today: "⚠ Needs investigation — Current table scrolling behaviour and header visibility have not been validated.",
        ux_rationale: "Sticky headers håller kolumnrubriker synliga vid vertikal scrollning. Horisontell scroll inom tabellcontainer förhindrar att hela sidan påverkas.",
        user_impact: "Kolumnrubriker förblir synliga vid scrollning genom 20+ rader. Behovet att scrolla tillbaka elimineras.",
        business_impact: "Snabbare arbete med stora datamängder → fler ärenden hanterade per session.",
        strategic_value: "Etablerar en UX-standard för alla tabellytor i portalen.",
        dependencies: "CSS sticky positioning med overflow-containers.",
        scope_note: "Implementerat på alla 7 tabeller i Dealer Workspace. max-h-[70vh] scrollcontainer.",
      },
    ],
  },
];

const statusColors: Record<string, { bg: string; text: string }> = {
  "Ny arkitektur": { bg: "bg-[#e8eaf6]", text: "text-[#273A60]" },
  "Ny design": { bg: "bg-[#fff3e0]", text: "text-[#e65100]" },
  "Ny funktion": { bg: "bg-[#e0f2f1]", text: "text-[#00695c]" },
  "Ny sida": { bg: "bg-[#fce4ec]", text: "text-[#c62828]" },
  "Omdesign": { bg: "bg-[#f3e5f5]", text: "text-[#6a1b9a]" },
};

const priorityColors: Record<string, string> = {
  "Tier 1": "bg-[#ff6b00] text-white",
  "Tier 2": "bg-[#2a9d5c] text-white",
  "Tier 3": "bg-[#6c757d] text-white",
};

function ScopeItemCard({ item, router }: { item: ScopeItem; router: ReturnType<typeof useRouter> }) {
  const [expanded, setExpanded] = useState(false);
  const sc = statusColors[item.status] ?? { bg: "bg-[#f5f5f5]", text: "text-[#666]" };
  const pc = priorityColors[item.priority] ?? "bg-[#6c757d] text-white";

  const ContentBlock = ({ label, text }: { label: string; text: string }) => (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-wider text-[#999]">{label}</p>
      <p className="mt-1 text-[13px] leading-relaxed text-[#555]">{text}</p>
    </div>
  );

  return (
    <div className={`rounded-xl border border-l-4 bg-white transition-all ${
      item.priority === "Tier 1" ? "border-l-[#ff6b00]" : item.priority === "Tier 2" ? "border-l-[#2a9d5c]" : "border-l-[#c0c0c0]"
    } ${expanded ? "border-[#d0d0d0] shadow-sm" : "border-[#f0f0f0] hover:border-[#e0e0e0]"}`}>
      {/* Collapsed header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-start gap-3 p-5 text-left"
      >
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[14px] font-semibold text-[#111]">{item.title}</span>
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${sc.bg} ${sc.text}`}>{item.status}</span>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${pc}`}
              title={
                item.priority === "Tier 1"
                  ? "Tier 1 — Core capability. Required for the vision to function. High impact on both user experience and business value."
                  : item.priority === "Tier 2"
                  ? "Tier 2 — Important enhancement. Adds significant value but not a blocker for the core experience."
                  : "Tier 3 — Nice to have. Improves completeness but can be deferred without impacting core workflows."
              }
            >{item.priority}</span>
          </div>
          {/* Impact tags — grouped by category */}
          <div className="mt-2 space-y-1">
            {item.tags_user.length > 0 && (
              <div className="flex flex-wrap items-center gap-1">
                <span className="text-[9px] font-bold uppercase tracking-wider text-[#bbb] w-14 shrink-0">User</span>
                {item.tags_user.map((t) => (
                  <span key={t} className="rounded-full bg-[#eef2ff] px-2 py-0.5 text-[11px] font-medium text-[#3b5bdb]">{t}</span>
                ))}
              </div>
            )}
            {item.tags_business.length > 0 && (
              <div className="flex flex-wrap items-center gap-1">
                <span className="text-[9px] font-bold uppercase tracking-wider text-[#bbb] w-14 shrink-0">Business</span>
                {item.tags_business.map((t) => (
                  <span key={t} className="rounded-full bg-[#e6f6ec] px-2 py-0.5 text-[11px] font-medium text-[#2a9d5c]">{t}</span>
                ))}
              </div>
            )}
            {item.tags_strategic.length > 0 && (
              <div className="flex flex-wrap items-center gap-1">
                <span className="text-[9px] font-bold uppercase tracking-wider text-[#bbb] w-14 shrink-0">Strategic</span>
                {item.tags_strategic.map((t) => (
                  <span key={t} className="rounded-full bg-[#fff3e8] px-2 py-0.5 text-[11px] font-medium text-[#e65100]">{t}</span>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {item.href && (
            <span
              onClick={(e) => { e.stopPropagation(); router.push(item.href!); }}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-[#ccc] transition-all hover:bg-[#273A60]/10 hover:text-[#273A60]"
              title={`Visa ${item.title}`}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 8c0-2.8 2.2-5.5 7-7 4.8 1.5 7 4.2 7 7s-2.2 5.5-7 7C3.2 13.5 1 10.8 1 8z" />
                <circle cx="8" cy="8" r="2.5" />
              </svg>
            </span>
          )}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#bbb" strokeWidth="2" strokeLinecap="round" className={`transition-transform ${expanded ? "rotate-180" : ""}`}>
            <path d="M4 6l4 4 4-4" />
          </svg>
        </div>
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="border-t border-[#f0f0f0] px-5 pb-5 pt-4 space-y-4">
          <ContentBlock label="UX-rationale" text={item.ux_rationale} />
          <ContentBlock label="Användarnytta" text={item.user_impact} />
          <ContentBlock label="Affärsnytta" text={item.business_impact} />
          <ContentBlock label="Strategiskt värde" text={item.strategic_value} />
          <ContentBlock label="Beroenden" text={item.dependencies} />
          <div className="rounded-lg bg-[#f8f9fb] px-4 py-3">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#999]">Scope i prototypen</p>
            <p className="mt-1 text-[12px] leading-relaxed text-[#888]">{item.scope_note}</p>
          </div>
        </div>
      )}
    </div>
  );
}

type ScopeFilter = "all" | "strategic" | "revenue" | "experience";

const scopeFilters: { id: ScopeFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "strategic", label: "Strategic" },
  { id: "revenue", label: "Revenue impact" },
  { id: "experience", label: "Experience improvements" },
];

function filterScopeItem(item: ScopeItem, filter: ScopeFilter): boolean {
  if (filter === "all") return true;
  if (filter === "strategic") return item.tags_strategic.length > 0;
  if (filter === "revenue") {
    const all = [...item.tags_business, ...item.tags_strategic].map((t) => t.toLowerCase());
    return all.some((t) => t.includes("revenue") || t.includes("sales") || t.includes("adoption") || t.includes("conversion") || t.includes("cross-sell") || t.includes("upsell") || t.includes("program"));
  }
  if (filter === "experience") return item.tags_user.length > 0;
  return true;
}

function VisionScopeOverlay({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<ScopeFilter>("all");

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const totalItems = visionAreas.reduce((s, a) => s + a.items.length, 0);
  const tier1Count = visionAreas.reduce((s, a) => s + a.items.filter((i) => i.priority === "Tier 1").length, 0);

  const filteredAreas = visionAreas.map((area) => ({
    ...area,
    items: area.items.filter((item) => filterScopeItem(item, activeFilter)),
  })).filter((area) => area.items.length > 0);

  const filteredCount = filteredAreas.reduce((s, a) => s + a.items.length, 0);

  return (
    <div className="fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="relative mx-4 my-8 w-full max-w-3xl animate-panel-in rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative overflow-hidden rounded-t-2xl bg-[#273A60] px-6 py-8 sm:px-8">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
          <div className="relative">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[.2em] text-white/40">Husqvarna Dealer Portal</p>
                <h2 className="mt-2 text-2xl font-bold text-white">Vision Prototype — Scope</h2>
                <p className="mt-2 max-w-lg text-[14px] leading-relaxed text-white/60">
                  Klicka på varje funktion för att se problem, rationale, affärsnytta och strategiskt värde.
                </p>
              </div>
              <button
                onClick={onClose}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white/60 transition-colors hover:bg-white/20 hover:text-white"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M4 4l8 8M12 4l-8 8" />
                </svg>
              </button>
            </div>

            {/* Stats row */}
            <div className="mt-6 flex flex-wrap gap-3 sm:gap-6">
              <div className="rounded-lg bg-white/10 px-4 py-2">
                <span className="text-xl font-bold text-white">{visionAreas.length}</span>
                <span className="ml-1.5 text-[12px] text-white/50">områden</span>
              </div>
              <div className="rounded-lg bg-white/10 px-4 py-2">
                <span className="text-xl font-bold text-white">{totalItems}</span>
                <span className="ml-1.5 text-[12px] text-white/50">funktioner</span>
              </div>
              <div className="rounded-lg bg-white/10 px-4 py-2">
                <span className="text-xl font-bold text-[#ff6b00]">{tier1Count}</span>
                <span className="ml-1.5 text-[12px] text-white/50">Tier 1</span>
              </div>
              <div className="rounded-lg bg-white/10 px-4 py-2">
                <span className="text-xl font-bold text-white">8+</span>
                <span className="ml-1.5 text-[12px] text-white/50">nya sidor</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter bar */}
        <div className="sticky top-0 z-10 border-b border-[#e5e5e5] bg-white px-6 py-3 sm:px-8">
          <div className="flex flex-wrap items-center gap-2">
            {scopeFilters.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`rounded-full px-3 py-1.5 text-[12px] font-semibold transition-all ${
                  activeFilter === f.id
                    ? "bg-[#273A60] text-white"
                    : "bg-[#f5f5f5] text-[#666] hover:bg-[#eee]"
                }`}
              >
                {f.label}
              </button>
            ))}
            {activeFilter !== "all" && (
              <span className="text-[12px] text-[#999]">{filteredCount} of {totalItems}</span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6 px-6 py-8 sm:px-8">
          {filteredAreas.map((area) => (
            <div key={area.category}>
              <div className="mb-3 flex items-center gap-3">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: area.color }} />
                <h3 className="text-[15px] font-bold text-[#111]">{area.category}</h3>
                <span className="text-[12px] text-[#bbb]">{area.items.length} delar</span>
              </div>
              <div className="grid gap-2">
                {area.items.map((item) => (
                  <ScopeItemCard key={item.title} item={item} router={router} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="rounded-b-2xl border-t border-[#f0f0f0] bg-[#fafafa] px-6 py-5 sm:px-8">
          <p className="text-center text-[12px] text-[#bbb]">
            Husqvarna Vision Prototype — Alla funktioner är mockups för konceptvalidering
          </p>
        </div>
      </div>
    </div>
  );
}
