"use client";

import { useState, useRef, useEffect, Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { accountNav } from "./navData";
import MobileDrawer from "./MobileDrawer";
import ProfileSwitcher from "./ProfileSwitcher";
import { husqvarnaNav, minVerksamhetNav } from "./navData";
import { useShowroom } from "./ShowroomContext";

export default function NavHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
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
              <span className="text-[20px] font-semibold tracking-tight text-white/90">
                Dealer Portal
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
            <div className="relative w-full max-w-xl">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#888]"
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
                placeholder="Sök produkter, artiklar, sprängskisser..."
                aria-label="Sök"
                className="h-11 w-full rounded-xl border border-[#d0d0d0] bg-[#f8f8f8] pl-11 pr-4 text-[15px] text-[#333] placeholder-[#aaa] transition-colors focus:border-[#999] focus:bg-white focus:shadow-sm focus:outline-none"
              />
            </div>
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
    </header>
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
