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
  const [mobileMenu, setMobileMenu] = useState<"husqvarna" | "verksamhet" | null>(null);
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
        <div className="md:hidden">
          <div className="flex border-b border-[#e0e0e0] bg-white">
            {/* Husqvarna — left */}
            <button
              onClick={() => setMobileMenu(mobileMenu === "husqvarna" ? null : "husqvarna")}
              className={`relative flex flex-1 items-center justify-center gap-1.5 py-3 text-[13px] font-bold transition-colors ${
                mobileMenu === "husqvarna" || (isHusqvarna && !mobileMenu) ? "text-[#273A60]" : "text-[#999]"
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="3" />
                <path d="M9 8h6M9 12h6M9 16h3" />
              </svg>
              Husqvarna
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={`transition-transform ${mobileMenu === "husqvarna" ? "rotate-180" : ""}`}>
                <path d="M3 4.5l3 3 3-3" />
              </svg>
              {(mobileMenu === "husqvarna" || (isHusqvarna && !mobileMenu)) && <span className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full bg-[#273A60]" />}
            </button>

            {/* Hem — center */}
            <Link
              href="/nav-v2"
              onClick={() => setMobileMenu(null)}
              className={`relative flex flex-1 items-center justify-center gap-1.5 py-3 text-[13px] font-bold transition-colors ${
                pathname === "/nav-v2" && !mobileMenu ? "text-[#273A60]" : "text-[#999]"
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 10.5L12 3l9 7.5" />
                <path d="M5 9.5V19a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1V9.5" />
              </svg>
              Hem
              {pathname === "/nav-v2" && !mobileMenu && <span className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full bg-[#273A60]" />}
            </Link>

            {/* Min verksamhet — right */}
            <button
              onClick={() => setMobileMenu(mobileMenu === "verksamhet" ? null : "verksamhet")}
              className={`relative flex flex-1 items-center justify-center gap-1.5 py-3 text-[13px] font-bold transition-colors ${
                mobileMenu === "verksamhet" || (isVerksamhet && !mobileMenu) ? "text-[#273A60]" : "text-[#999]"
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="16" rx="2" />
                <path d="M3 9h18" />
                <path d="M9 9v11" />
              </svg>
              Min verksamhet
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={`transition-transform ${mobileMenu === "verksamhet" ? "rotate-180" : ""}`}>
                <path d="M3 4.5l3 3 3-3" />
              </svg>
              {(mobileMenu === "verksamhet" || (isVerksamhet && !mobileMenu)) && <span className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full bg-[#273A60]" />}
            </button>
          </div>

          {/* ═══ Fullscreen mobile menu: Husqvarna ═══ */}
          <div
            className={`fixed inset-0 top-[104px] z-[9990] overflow-y-auto bg-white transition-transform duration-250 ease-out ${
              mobileMenu === "husqvarna" ? "translate-x-0" : "-translate-x-full"
            }`}
            aria-hidden={mobileMenu !== "husqvarna"}
          >
            <nav className="divide-y divide-[#f0f0f0]">
              <MobileMenuItem href="/nav-v2/husqvarna" label="Sök & Kategorier" desc="Hitta produkter och reservdelar" onClick={() => setMobileMenu(null)} />
              <MobileMenuItem href="/nav-v2/husqvarna/kampanjer" label="Kampanjer" badge="2" onClick={() => setMobileMenu(null)} />
              <MobileMenuItem href="/nav-v2/husqvarna/nyheter" label="Nyheter & Lanseringar" badgeNew onClick={() => setMobileMenu(null)} />
              <MobileMenuItem href="#" label="Manualer & Servicebulletiner" onClick={() => setMobileMenu(null)} />
              <MobileMenuItem href="#" label="Pris & Tillgänglighet" onClick={() => setMobileMenu(null)} />
              <MobileMenuItem href="#" label="Lagerstatus" onClick={() => setMobileMenu(null)} />
            </nav>
            <div className="absolute bottom-0 left-0 right-0 border-t border-[#f0f0f0] bg-[#fafafa] p-4">
              <button onClick={() => setMobileMenu(null)} className="w-full rounded-lg border border-[#d0d0d0] py-2.5 text-[13px] font-semibold text-[#555]">
                Stäng
              </button>
            </div>
          </div>

          {/* ═══ Fullscreen mobile menu: Min verksamhet ═══ */}
          <div
            className={`fixed inset-0 top-[104px] z-[9990] overflow-y-auto bg-white transition-transform duration-250 ease-out ${
              mobileMenu === "verksamhet" ? "translate-x-0" : "translate-x-full"
            }`}
            aria-hidden={mobileMenu !== "verksamhet"}
          >
            <nav className="divide-y divide-[#f0f0f0]">
              <MobileMenuItem href="/nav-v2/min-verksamhet/workspace" label="Dealer Workspace" badgeNew onClick={() => setMobileMenu(null)} />
              <MobileMenuItem href="/nav-v2/min-verksamhet/orders" label="Orderhantering" badgeNew onClick={() => setMobileMenu(null)} />
              <MobileMenuItem href="/nav-v2/min-verksamhet/fakturor" label="Fakturor" badge="8" badgeNew onClick={() => setMobileMenu(null)} />
              <MobileMenuItem href="/nav-v2/min-verksamhet/betalningar" label="Betalningar & Saldo" badgeNew onClick={() => setMobileMenu(null)} />
              <MobileMenuItem href="/nav-v2/min-verksamhet/rapporter" label="Rapporter" badgeNew onClick={() => setMobileMenu(null)} />
              <MobileMenuItem href="/nav-v2/offerter" label="Offerter" badgeNew onClick={() => setMobileMenu(null)} />
              <MobileMenuItem href="/nav-v2/min-verksamhet/wishlist" label="Wishlist" badgeNew onClick={() => setMobileMenu(null)} />
              <MobileMenuItem href="/nav-v2/husqvarna/kampanjer" label="Kampanjer" badge="2" onClick={() => setMobileMenu(null)} />
            </nav>
            <div className="absolute bottom-0 left-0 right-0 border-t border-[#f0f0f0] bg-[#fafafa] p-4">
              <button onClick={() => setMobileMenu(null)} className="w-full rounded-lg border border-[#d0d0d0] py-2.5 text-[13px] font-semibold text-[#555]">
                Stäng
              </button>
            </div>
          </div>
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

/* ═══ MOBILE MENU ITEM ═══ */

function MobileMenuItem({ href, label, desc, badge, badgeNew, onClick }: {
  href: string;
  label: string;
  desc?: string;
  badge?: string;
  badgeNew?: boolean;
  onClick: () => void;
}) {
  const pathname = usePathname();
  const isActive = href !== "#" && pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center gap-3 px-5 py-3 active:bg-[#fafafa] ${isActive ? "bg-[#f0f3f8] border-l-[3px] border-l-[#273A60]" : ""}`}
    >
      <div className="min-w-0 flex-1">
        <span className={`text-[13px] font-semibold ${isActive ? "text-[#273A60]" : "text-[#333]"}`}>{label}</span>
        {desc && <span className="mt-0.5 block text-[11px] text-[#999]">{desc}</span>}
      </div>
      <div className="flex shrink-0 items-center gap-1.5">
        {badgeNew && (
          <span className="rounded-full bg-[#ff6b00] px-1.5 py-0.5 text-[9px] font-bold text-white">NY</span>
        )}
        {badge && (
          <span className="rounded-full bg-[#273A60] px-1.5 py-0.5 text-[9px] font-bold text-white">{badge}</span>
        )}
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#ccc" strokeWidth="1.8" strokeLinecap="round">
          <path d="M6 4l4 4-4 4" />
        </svg>
      </div>
    </Link>
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
    category: "Navigation & Structure",
    color: "#273A60",
    items: [
      {
        title: "Start Page — Dealer-Centric Dashboard",
        status: "New design",
        priority: "Tier 1",
        tags_user: ["Immediate status overview", "Faster task access"],
        tags_business: ["Increased portal engagement", "Shift from sales portal to work portal"],
        tags_strategic: ["Foundation capability", "Dealer engagement"],
        problem_today: "",
        ux_rationale: "The start page is redesigned as a dealer work dashboard rather than a promotional landing page.\n\nThe design prioritizes operational metrics (active orders, back orders, invoices, deliveries, action items) over campaign imagery and marketing content.\n\nQuick action links provide direct access to high-frequency tasks. Alerts and notifications surface items requiring attention.\n\nThe shift reflects a fundamental change in portal philosophy: from a sales channel directed at the dealer, to a work tool owned by the dealer.",
        user_impact: "The portal entry point immediately communicates what requires attention. Operational status is visible without navigation. High-frequency actions are accessible within one click.",
        business_impact: "Higher portal return frequency when the start page provides daily operational value. Shift from passive information consumption to active tool usage increases overall portal engagement.",
        strategic_value: "Positions the portal as an indispensable daily work tool rather than an occasional information source. Creates the foundation for personalized dashboards, AI-driven daily summaries and proactive notifications.",
        dependencies: "Real-time data feeds for KPI widgets. Alert/notification system. Integration with order, invoice and delivery status.",
        scope_note: "Prototype shows 5 KPI widgets with trend indicators, collapsible alerts panel, quick actions grid, campaign banner (reduced prominence), recent activity feed and quick links. Mobile version uses compact list layout for KPIs.",
        href: "/nav-v2",
      },
      {
        title: "Dual Navigation",
        status: "New architecture",
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
        title: "EMT Number Switcher",
        status: "Redesign",
        priority: "Tier 2",
        tags_user: ["Faster context switching", "Clearer account separation"],
        tags_business: ["Reduced support inquiries"],
        tags_strategic: ["Multi-account support"],
        problem_today: "",
        ux_rationale: "The EMT number switcher is separated from the account menu into its own dedicated control in the header utility bar.\n\nThis separates two distinct actions: switching dealer location (EMT) and managing personal account settings. Combining them in one menu introduces ambiguity about the scope of each action.",
        user_impact: "Switching between dealer locations becomes a visible, persistent control rather than a nested menu item. Account settings remain independently accessible.",
        business_impact: "Reduced support inquiries related to account context. Clearer separation between dealer identity and personal account.",
        strategic_value: "Supports multi-location dealer scenarios and future role-based access where EMT context determines available features.",
        dependencies: "EMT data API. Session context management.",
        scope_note: "Prototype shows EMT switcher as a dropdown in the header utility bar, separate from the account menu.",
      },
    ],
  },
  {
    category: "Husqvarna (OEM)",
    color: "#ff6b00",
    items: [
      {
        title: "Product Workspace",
        status: "Redesign",
        priority: "Tier 1",
        tags_user: ["Faster identification", "Consolidated view"],
        tags_business: ["Increased spare parts orders", "Shorter service cases"],
        tags_strategic: ["AI integration"],
        problem_today: "",
        ux_rationale: "A workspace instead of a catalog — with identification hub, AI spare parts assistant and quick category access — transforms the product page from information display to operational tool.",
        user_impact: "Spare parts identification can happen directly in the portal instead of via separate PDF exploded views. QR scanning eliminates manual search.",
        business_impact: "Increased spare parts turnover through simplified ordering. Shorter service cases → more jobs per day.",
        strategic_value: "The AI spare parts assistant is a first implementation of conversational commerce that can be expanded to the full product range.",
        dependencies: "AI model for spare parts identification. QR code infrastructure on products. Product database with relational data.",
        scope_note: "Prototype shows identification hub, AI chat mock, quick access and category browser with expandable subcategories.",
        href: "/nav-v2/husqvarna",
      },
      {
        title: "Campaign Pages",
        status: "New design",
        priority: "Tier 2",
        tags_user: ["Better campaign overview", "Clearer incentives"],
        tags_business: ["Higher campaign participation", "Increased sell-through"],
        tags_strategic: ["Dealer engagement"],
        problem_today: "",
        ux_rationale: "Visual progress indicators and clear bonus levels make campaign status visible in real time. The structure shows exact position in the bonus ladder and what is required for the next level.",
        user_impact: "Campaign status and product prioritization become directly visible. Bonus progression makes the incentive structure transparent.",
        business_impact: "Increased visibility of campaign terms may contribute to higher sell-through. Campaign information reaches dealers not currently reached via other channels.",
        strategic_value: "Digital campaign platform enables real-time tracking of campaign effectiveness per dealer.",
        dependencies: "Campaign data API with bonus levels and progression. Integration with sales data for real-time updates.",
        scope_note: "Prototype shows campaign listing with two active campaigns, progress bar, category pills and past campaign results. Detail page with terms.",
        href: "/nav-v2/husqvarna/kampanjer",
      },
      {
        title: "News & Launches",
        status: "New page",
        priority: "Tier 3",
        tags_user: ["Consolidated information channel", "Proactive updates"],
        tags_business: ["Faster product adoption", "Better informed dealers"],
        tags_strategic: ["Content hub"],
        problem_today: "",
        ux_rationale: "A consolidated news page in the portal consolidates the information flow into one channel. Category filters enable filtering by relevance.",
        user_impact: "Critical service bulletins and product launches are collected in one place. Information accessibility increases.",
        business_impact: "Faster adoption of new products. Higher compliance with service bulletins → fewer warranty cases.",
        strategic_value: "The news channel can be expanded with personalization based on dealer product range and customer types.",
        dependencies: "CMS integration for publishing news. Category taxonomy for content filtering.",
        scope_note: "Prototype shows featured article, category filter (5 categories), news cards with images and tags. 8 mock articles.",
        href: "/nav-v2/husqvarna/nyheter",
      },
    ],
  },
  {
    category: "Min verksamhet (Dealer Workspace)",
    color: "#2a9d5c",
    items: [
      {
        title: "My Business — Landing Page",
        status: "New design",
        priority: "Tier 1",
        tags_user: ["Full overview", "Fewer clicks to action"],
        tags_business: ["Increased feature adoption", "Reduced bounce"],
        tags_strategic: ["Dealer engagement hub"],
        problem_today: "",
        ux_rationale: "Cards with live metrics introduce an immediate status overview. Consolidated order management card with alert dots replaces four separate links and reduces navigation steps.",
        user_impact: "Status of back orders, overdue invoices and other action items becomes visible without opening each section separately.",
        business_impact: "Higher usage of underutilized features (reports, payment overview) through visibility. Faster case handling.",
        strategic_value: "The landing page as an engagement hub enables future personalization, notifications and AI summaries.",
        dependencies: "Real-time data for metrics (order count, invoice status). Badge system for notifications.",
        scope_note: "Prototype shows 50/50 grid with order management card (dark gradient, glassmorphism metrics) and stacked economy cards. NY badges on all new pages.",
        href: "/nav-v2/min-verksamhet",
      },
      {
        title: "Dealer Workspace",
        status: "New page",
        priority: "Tier 1",
        tags_user: ["Daily workspace", "Prioritized task list"],
        tags_business: ["Increased productivity", "Better data quality"],
        tags_strategic: ["Central work tool"],
        problem_today: "",
        ux_rationale: "A central workspace with tabs (Dashboard, Products, Customers, Contracts & programs, Today) consolidates daily tasks in one place. A prioritized task list structures actions by urgency.",
        user_impact: "Daily work is consolidated to one page. Priority sorting surfaces critical items (HyperCare, expiring contracts) at the top.",
        business_impact: "More cases can be handled per session. Better data quality by presenting sellout registration and installation reporting as clear tasks.",
        strategic_value: "The workspace becomes the natural place for AI assistance, automated tasks and proactive recommendations.",
        dependencies: "Integration with order, warranty, contract and customer data. Task engine to generate daily tasks.",
        scope_note: "Prototype shows 5 tabs with full mock data: 7 KPIs, priority lists, program overview, product table with lifecycle status, customer overview with expandable details, contract views with view switcher, and daily action list.",
        href: "/nav-v2/min-verksamhet/workspace",
      },
      {
        title: "Unified Order Management",
        status: "New page",
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
        title: "Invoices",
        status: "New design",
        priority: "Tier 2",
        tags_user: ["Better filterability", "Faster export"],
        tags_business: ["Faster payments", "Reduced administration"],
        tags_strategic: ["Finance module"],
        problem_today: "",
        ux_rationale: "Status flags (paid/overdue/credit note) provide immediate overview. Date filter + search + export in one interface eliminates the need for spreadsheet workarounds.",
        user_impact: "Specific invoices can be located via search and status filters instead of manual list review. The export function eliminates manual work.",
        business_impact: "Faster identification of overdue invoices → improved payment flow for Husqvarna.",
        strategic_value: "The design pattern (filter + status flags + export) is reusable as a standard for all list-based views.",
        dependencies: "Invoice API with status flags. Export function (PDF/CSV).",
        scope_note: "Prototype shows date filter, status pills, searchable table with 8 mock invoices, checkbox selection and export button.",
        href: "/nav-v2/min-verksamhet/fakturor",
      },
      {
        title: "Payments & Balance",
        status: "New design",
        priority: "Tier 2",
        tags_user: ["Financial overview", "Proactive planning"],
        tags_business: ["Better cashflow", "Increased credit utilization"],
        tags_strategic: ["Finance module"],
        problem_today: "",
        ux_rationale: "Visual credit limit progress and bonus tracker make abstract financial data concrete. Upcoming payments are presented for proactive planning.",
        user_impact: "Available credit and bonus status become visible in one place. Financial information does not require access to separate systems.",
        business_impact: "Increased credit utilization → higher order volume. Better payment discipline through transparency.",
        strategic_value: "The finance view can be expanded with forecasting, automatic payment notifications and integration with dealer accounting systems.",
        dependencies: "Balance API, credit limit data, bonus program data, payment history.",
        scope_note: "Prototype shows balance card with credit limit bar, bonus tracker, upcoming payments and transaction history.",
        href: "/nav-v2/min-verksamhet/betalningar",
      },
      {
        title: "Reports",
        status: "New design",
        priority: "Tier 3",
        tags_user: ["Easy access", "Format flexibility"],
        tags_business: ["Better decision-making data", "Increased data-drivenness"],
        tags_strategic: ["Business intelligence"],
        problem_today: "",
        ux_rationale: "A report catalog with category filters and popular reports lowers the access threshold. Format badges (PDF/Excel/CSV) set expectations immediately.",
        user_impact: "Reports can be found via category and popularity sorting without knowing the exact name. Recent exports provide quick access to recurring reports.",
        business_impact: "Better access to decision-making data. Increased exposure of underutilized reports.",
        strategic_value: "The report platform prepares for dynamic dashboards and AI-generated insights.",
        dependencies: "Report generation API with format support. Usage statistics for popularity sorting.",
        scope_note: "Prototype shows popular reports, recent exports and full catalog with category filters and format badges.",
        href: "/nav-v2/min-verksamhet/rapporter",
      },
      {
        title: "Wishlist",
        status: "New design",
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
    category: "Contracts & Programs (Workspace view)",
    color: "#b8860b",
    items: [
      {
        title: "Contract View Switcher",
        status: "New architecture",
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
    category: "Quotes & Pricing",
    color: "#7b61ff",
    items: [
      {
        title: "Quote Management",
        status: "Redesign",
        priority: "Tier 2",
        tags_user: ["Better quote overview", "Faster handling"],
        tags_business: ["Higher quote-to-order conversion"],
        tags_strategic: ["Sales tool"],
        problem_today: "",
        ux_rationale: "Status tabs, customer info and expiry date directly in the list introduce immediate overview. Quick actions reduce the number of clicks per action.",
        user_impact: "Quotes requiring follow-up are identified directly in the list without opening each quote individually.",
        business_impact: "Faster quote handling → more converted quotes.",
        strategic_value: "The quote tool can be expanded with automatic reminders, templates and integration with pricing engine.",
        dependencies: "Quote API with status management. Customer linkage.",
        scope_note: "Prototype shows quote list with status tabs, customer info, expiry dates and quick actions.",
        href: "/nav-v2/offerter",
      },
    ],
  },
  {
    category: "Responsive Design & Mobile",
    color: "#c44",
    items: [
      {
        title: "Mobile UX Strategy",
        status: "New design",
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
        title: "Sticky Table Headers & Scroll Optimization",
        status: "New design",
        priority: "Tier 2",
        tags_user: ["Better table navigation", "Context retention"],
        tags_business: ["Increased data usage"],
        tags_strategic: ["UX standard"],
        problem_today: "",
        ux_rationale: "Sticky headers keep column labels visible during vertical scrolling. Horizontal scroll within table containers prevents the entire page from being affected.",
        user_impact: "Column headers remain visible when scrolling through 20+ rows. The need to scroll back is eliminated.",
        business_impact: "Faster work with large data sets → more cases handled per session.",
        strategic_value: "Establishes a UX standard for all table surfaces in the portal.",
        dependencies: "CSS sticky positioning with overflow containers.",
        scope_note: "Implemented on all 7 tables in Dealer Workspace. max-h-[70vh] scroll container.",
      },
    ],
  },
];

const statusColors: Record<string, { bg: string; text: string }> = {
  "New architecture": { bg: "bg-[#e8eaf6]", text: "text-[#273A60]" },
  "New design": { bg: "bg-[#fff3e0]", text: "text-[#e65100]" },
  "New feature": { bg: "bg-[#e0f2f1]", text: "text-[#00695c]" },
  "New page": { bg: "bg-[#fce4ec]", text: "text-[#c62828]" },
  "Redesign": { bg: "bg-[#f3e5f5]", text: "text-[#6a1b9a]" },
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
            <a
              href={item.href}
              onClick={(e) => { e.stopPropagation(); }}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-[#ccc] transition-all hover:bg-[#273A60]/10 hover:text-[#273A60]"
              title={`View ${item.title}`}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 8c0-2.8 2.2-5.5 7-7 4.8 1.5 7 4.2 7 7s-2.2 5.5-7 7C3.2 13.5 1 10.8 1 8z" />
                <circle cx="8" cy="8" r="2.5" />
              </svg>
            </a>
          )}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#bbb" strokeWidth="2" strokeLinecap="round" className={`transition-transform ${expanded ? "rotate-180" : ""}`}>
            <path d="M4 6l4 4 4-4" />
          </svg>
        </div>
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="border-t border-[#f0f0f0] px-5 pb-5 pt-4 space-y-4">
          <ContentBlock label="UX Rationale" text={item.ux_rationale} />
          <ContentBlock label="User Impact" text={item.user_impact} />
          <ContentBlock label="Business Impact" text={item.business_impact} />
          <ContentBlock label="Strategic Value" text={item.strategic_value} />
          <ContentBlock label="Dependencies" text={item.dependencies} />
          <div className="rounded-lg bg-[#f8f9fb] px-4 py-3">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#999]">Prototype Scope</p>
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
                  Click each feature to see rationale, user impact, business impact and strategic value.
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
                <span className="ml-1.5 text-[12px] text-white/50">areas</span>
              </div>
              <div className="rounded-lg bg-white/10 px-4 py-2">
                <span className="text-xl font-bold text-white">{totalItems}</span>
                <span className="ml-1.5 text-[12px] text-white/50">features</span>
              </div>
              <div className="rounded-lg bg-white/10 px-4 py-2">
                <span className="text-xl font-bold text-[#ff6b00]">{tier1Count}</span>
                <span className="ml-1.5 text-[12px] text-white/50">Tier 1</span>
              </div>
              <div className="rounded-lg bg-white/10 px-4 py-2">
                <span className="text-xl font-bold text-white">8+</span>
                <span className="ml-1.5 text-[12px] text-white/50">new pages</span>
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
                <span className="text-[12px] text-[#bbb]">{area.items.length} items</span>
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
            Husqvarna Vision Prototype — All features are mockups for concept validation
          </p>
        </div>
      </div>
    </div>
  );
}
