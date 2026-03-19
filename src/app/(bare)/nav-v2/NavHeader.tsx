"use client";

import { useState, useRef, useEffect, Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { accountNav } from "./navData";
import MobileDrawer from "./MobileDrawer";
import ProfileSwitcher from "./ProfileSwitcher";
import { husqvarnaNav, minVerksamhetNav } from "./navData";
import { useShowroom } from "./ShowroomContext";

export default function NavHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [visionOpen, setVisionOpen] = useState(false);
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
            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Öppna meny"
              className="flex h-8 w-8 items-center justify-center rounded-md text-white/70 transition-colors hover:bg-white/10 md:hidden"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                <path d="M3 5h14M3 10h14M3 15h14" />
              </svg>
            </button>

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
              {/* Search icon mobile */}
              <button
                aria-label="Sök"
                title="Sök"
                className="flex h-8 w-8 items-center justify-center rounded-md text-white/70 transition-colors hover:bg-white/10 md:hidden"
              >
                <svg
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
          {/* Left: Husqvarna link */}
          <div className="flex items-center">
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

      {/* Mobile drawer */}
      {mobileOpen && (
        <MobileDrawer
          sections={[husqvarnaNav, minVerksamhetNav]}
          onClose={() => setMobileOpen(false)}
        />
      )}
      {/* Floating vision scope button */}
      <button
        onClick={() => setVisionOpen(true)}
        className="fixed bottom-6 right-6 z-[9998] flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#ff6b00] to-[#e55a00] px-5 py-3 text-[13px] font-bold text-white shadow-lg shadow-orange-500/25 transition-all hover:scale-105 hover:shadow-xl hover:shadow-orange-500/30 active:scale-[0.98]"
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

const visionAreas = [
  {
    category: "Navigation & Struktur",
    color: "#273A60",
    items: [
      {
        title: "Dual Navigation",
        desc: "Tvådelad primärnavigation — Husqvarna (OEM-innehåll) och Min verksamhet (dealer workspace) — med kontextuell breadcrumb och mega-paneler.",
        status: "Ny arkitektur" as const,
      },
      {
        title: "Kontextuell sökning",
        desc: "Enhetlig sökfunktion med realtidsresultat över produkter, dokument och senaste sökningar direkt i headern.",
        status: "Ny design" as const,
      },
      {
        title: "Showroom-läge",
        desc: "Toggle i headern som växlar mellan återförsäljarpriser och kundpriser — för användning i butik/demo.",
        status: "Ny funktion" as const,
      },
    ],
  },
  {
    category: "Husqvarna (OEM-sida)",
    color: "#ff6b00",
    items: [
      {
        title: "Produktarbetsyta",
        desc: "Omdesignad landningssida med identifieringshub (artikelnr, QR-skanning), AI-reservdelshjälp, snabbåtkomst och kategorinavigation.",
        status: "Omdesign" as const,
        href: "/nav-v2/husqvarna",
      },
      {
        title: "Kampanjsidor",
        desc: "Ny kampanjlistning med progressindikatorer, bonusnivåer och kategori-pills. Detaljsida med hero-bild, villkor och quick-actions.",
        status: "Ny design" as const,
        href: "/nav-v2/husqvarna/kampanjer",
      },
      {
        title: "Nyheter & Lanseringar",
        desc: "Nyhetssida med featured article, kategorifilter, bildkort och taggning. Samlar produktlanseringar, servicebulletiner och branschnyheter.",
        status: "Ny sida" as const,
        href: "/nav-v2/husqvarna/nyheter",
      },
    ],
  },
  {
    category: "Min verksamhet (Dealer Workspace)",
    color: "#2a9d5c",
    items: [
      {
        title: "Orderhantering",
        desc: "Konsoliderad ordervy med flikar för varukorg, aktiva order, levererade och returer. Mörk gradient-puff med live-metriker och alertprickar på Min verksamhet.",
        status: "Ny sida" as const,
        href: "/nav-v2/min-verksamhet/orders",
      },
      {
        title: "Fakturor",
        desc: "Fakturaöversikt med datumfilter, statusflaggor (betald/förfallen/kreditnota), sökfunktion och exportfunktion.",
        status: "Ny design" as const,
        href: "/nav-v2/min-verksamhet/fakturor",
      },
      {
        title: "Betalningar & Saldo",
        desc: "Saldokort med kreditgräns-progress, bonustracker, kommande betalningar och transaktionshistorik.",
        status: "Ny design" as const,
        href: "/nav-v2/min-verksamhet/betalningar",
      },
      {
        title: "Rapporter",
        desc: "Rapportkatalog med populära rapporter, senaste exporter, kategorifilter och formatbadges (PDF/Excel/CSV).",
        status: "Ny design" as const,
        href: "/nav-v2/min-verksamhet/rapporter",
      },
      {
        title: "Wishlist",
        desc: "Kundgrupperade önskelistor med prioritetssystem, lagerstatus-badges, kundavsiktsnoteringar och konvertering till offert.",
        status: "Ny design" as const,
        href: "/nav-v2/min-verksamhet/wishlist",
      },
    ],
  },
  {
    category: "Offerter & Prissättning",
    color: "#7b61ff",
    items: [
      {
        title: "Offerthantering",
        desc: "Offertlista med status-tabs, kundinfo, utgångsdatum och snabbåtgärder. Badges för ny offert-status.",
        status: "Omdesign" as const,
        href: "/nav-v2/offerter",
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

function VisionScopeOverlay({ onClose }: { onClose: () => void }) {
  const router = useRouter();

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

  return (
    <div className="fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="relative mx-4 my-8 w-full max-w-3xl animate-panel-in rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative overflow-hidden rounded-t-2xl bg-[#273A60] px-8 py-8">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
          <div className="relative">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[.2em] text-white/40">Husqvarna Dealer Portal</p>
                <h2 className="mt-2 text-2xl font-bold text-white">Vision Prototype — Scope</h2>
                <p className="mt-2 max-w-lg text-[14px] leading-relaxed text-white/60">
                  Översikt av alla ny- och omdesignade delar i visionsprototypen. Varje område representerar ett fokusområde med förbättrad UX, smartare interaktioner och modern design.
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
            <div className="mt-6 flex gap-6">
              <div className="rounded-lg bg-white/10 px-4 py-2">
                <span className="text-xl font-bold text-white">{visionAreas.length}</span>
                <span className="ml-1.5 text-[12px] text-white/50">områden</span>
              </div>
              <div className="rounded-lg bg-white/10 px-4 py-2">
                <span className="text-xl font-bold text-white">{totalItems}</span>
                <span className="ml-1.5 text-[12px] text-white/50">funktioner</span>
              </div>
              <div className="rounded-lg bg-white/10 px-4 py-2">
                <span className="text-xl font-bold text-white">8+</span>
                <span className="ml-1.5 text-[12px] text-white/50">nya sidor</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6 px-8 py-8">
          {visionAreas.map((area) => (
            <div key={area.category}>
              <div className="mb-3 flex items-center gap-3">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: area.color }} />
                <h3 className="text-[15px] font-bold text-[#111]">{area.category}</h3>
                <span className="text-[12px] text-[#bbb]">{area.items.length} delar</span>
              </div>
              <div className="grid gap-2">
                {area.items.map((item) => {
                  const sc = statusColors[item.status] ?? { bg: "bg-[#f5f5f5]", text: "text-[#666]" };
                  const hasLink = "href" in item && item.href;
                  return (
                    <div
                      key={item.title}
                      className={`relative flex items-start gap-4 rounded-xl border border-[#f0f0f0] bg-[#fafafa] px-5 py-4 transition-colors hover:border-[#e0e0e0] hover:bg-white ${hasLink ? "group/card" : ""}`}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2.5">
                          <span className="text-[14px] font-semibold text-[#111]">{item.title}</span>
                          <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${sc.bg} ${sc.text}`}>
                            {item.status}
                          </span>
                        </div>
                        <p className="mt-1 text-[13px] leading-relaxed text-[#888]">{item.desc}</p>
                      </div>
                      {hasLink && (
                        <button
                          onClick={() => router.push(item.href!)}
                          title={`Gå till ${item.title}`}
                          className="absolute right-3 top-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[#ccc] transition-all hover:bg-[#273A60]/10 hover:text-[#273A60] group-hover/card:text-[#aaa]"
                        >
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 3h7v7" />
                            <path d="M13 3L6 10" />
                            <path d="M3 7v6h6" />
                          </svg>
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="rounded-b-2xl border-t border-[#f0f0f0] bg-[#fafafa] px-8 py-5">
          <p className="text-center text-[12px] text-[#bbb]">
            Husqvarna Vision Prototype — Alla funktioner är mockups för konceptvalidering
          </p>
        </div>
      </div>
    </div>
  );
}
