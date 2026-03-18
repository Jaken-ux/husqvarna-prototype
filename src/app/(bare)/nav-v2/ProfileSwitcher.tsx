"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useOnClickOutside } from "./useOnClickOutside";

/* ── Types & mock data ── */

type Sortiment = "Gardena" | "Construction" | "Forest & Garden";

type Profile = {
  id: string;
  label: string;
  sortiment: Sortiment;
};

const profiles: Profile[] = [
  { id: "EMT-249268", label: "EMT-249268", sortiment: "Forest & Garden" },
  { id: "EMT-883102", label: "EMT-883102", sortiment: "Gardena" },
  { id: "EMT-551044", label: "EMT-551044", sortiment: "Construction" },
];

/* ── Component ── */

export default function ProfileSwitcher() {
  const [activeId, setActiveId] = useState(profiles[0].id);
  const [open, setOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [toast, setToast] = useState<string | null>(null);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const active = profiles.find((p) => p.id === activeId)!;

  /* Close helper */
  const close = useCallback(() => {
    setOpen(false);
    setHighlightIndex(-1);
    requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

  /* Click outside */
  useOnClickOutside(panelRef, () => {
    if (open) close();
  });

  /* Keyboard on trigger */
  function handleTriggerKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen(true);
      setHighlightIndex(0);
    }
  }

  /* Keyboard inside dropdown */
  function handleListKeyDown(e: React.KeyboardEvent) {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightIndex((prev) =>
          prev < profiles.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightIndex((prev) =>
          prev > 0 ? prev - 1 : profiles.length - 1
        );
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (highlightIndex >= 0) selectProfile(profiles[highlightIndex]);
        break;
      case "Escape":
        e.preventDefault();
        close();
        break;
    }
  }

  /* Focus highlighted option */
  useEffect(() => {
    if (open && highlightIndex >= 0) {
      optionRefs.current[highlightIndex]?.focus();
    }
  }, [open, highlightIndex]);

  /* ESC listener (global, for safety) */
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  /* Select profile */
  function selectProfile(profile: Profile) {
    if (profile.id === activeId) {
      close();
      return;
    }
    setActiveId(profile.id);
    close();
    setToast(`Profil bytt till ${profile.id} (${profile.sortiment})`);
  }

  /* Auto-dismiss toast */
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  return (
    <div className="relative">
      {/* ── Trigger pill ── */}
      <button
        ref={triggerRef}
        onClick={() => {
          if (open) close();
          else {
            setOpen(true);
            setHighlightIndex(0);
          }
        }}
        onKeyDown={handleTriggerKeyDown}
        aria-expanded={open}
        aria-haspopup="listbox"
        className={`flex items-center gap-2.5 rounded-full border px-3.5 py-2 text-left transition-colors ${
          open
            ? "border-[#ccc] bg-[#f5f5f5]"
            : "border-[#e0e0e0] bg-white hover:border-[#ccc] hover:bg-[#fafafa]"
        }`}
      >
        <span className="flex items-center gap-1.5 text-[13px]">
          <span className="text-[#999]">Profil:</span>
          <span className="font-semibold text-[#111]">{active.label}</span>
        </span>
        <SortimentChip sortiment={active.sortiment} />
        <ChevronDown open={open} />
      </button>

      {/* ── Dropdown ── */}
      {open && (
        <div
          ref={panelRef}
          role="listbox"
          aria-label="Välj företagsprofil"
          aria-activedescendant={
            highlightIndex >= 0
              ? `profile-option-${highlightIndex}`
              : undefined
          }
          onKeyDown={handleListKeyDown}
          className="animate-panel-in motion-reduce:animate-none absolute right-0 top-full z-50 mt-2 w-72 rounded-xl border border-[#e5e5e5] bg-white py-2 shadow-lg"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 pb-2 pt-1">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#bbb]">
              Välj profil
            </p>
            <button
              onClick={close}
              aria-label="Stäng"
              className="flex h-6 w-6 items-center justify-center rounded-md text-[#bbb] transition-colors hover:bg-[#f5f5f5] hover:text-[#666]"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <path d="M4 4l8 8M12 4l-8 8" />
              </svg>
            </button>
          </div>

          <div className="border-t border-[#f0f0f0]" />

          {/* Options */}
          {profiles.map((profile, i) => {
            const isActive = profile.id === activeId;
            const isHighlighted = i === highlightIndex;
            return (
              <button
                key={profile.id}
                id={`profile-option-${i}`}
                ref={(el) => {
                  optionRefs.current[i] = el;
                }}
                role="option"
                aria-selected={isActive}
                onClick={() => selectProfile(profile)}
                className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors focus-visible:outline-none ${
                  isHighlighted
                    ? "bg-[#f5f5f5]"
                    : "hover:bg-[#fafafa]"
                }`}
              >
                {/* Check / spacer */}
                <span className="flex h-4 w-4 shrink-0 items-center justify-center">
                  {isActive && (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="#111"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3.5 8.5l3 3 6-7" />
                    </svg>
                  )}
                </span>

                {/* Content */}
                <div className="flex flex-1 items-center justify-between gap-2">
                  <div>
                    <span
                      className={`block text-[13px] ${
                        isActive
                          ? "font-semibold text-[#111]"
                          : "font-medium text-[#444]"
                      }`}
                    >
                      {profile.label}
                    </span>
                    <span className="block text-[11px] text-[#aaa]">
                      Sortiment
                    </span>
                  </div>
                  <SortimentChip sortiment={profile.sortiment} />
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* ── Toast ── */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="animate-panel-in motion-reduce:animate-none absolute right-0 top-full z-50 mt-2 whitespace-nowrap rounded-lg border border-[#e5e5e5] bg-white px-4 py-2.5 text-[13px] text-[#333] shadow-md"
        >
          {toast}
        </div>
      )}
    </div>
  );
}

/* ── Sortiment chip ── */

const chipStyles: Record<Sortiment, string> = {
  "Forest & Garden":
    "border-[#d4e4d4] bg-[#f2f7f2] text-[#4a7a4a]",
  Gardena:
    "border-[#d4dce8] bg-[#f0f4fa] text-[#4a6a9a]",
  Construction:
    "border-[#e4dad4] bg-[#faf5f0] text-[#9a7a4a]",
};

function SortimentChip({ sortiment }: { sortiment: Sortiment }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium leading-none ${chipStyles[sortiment]}`}
    >
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-current opacity-60" />
      {sortiment}
    </span>
  );
}

/* ── Chevron ── */

function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className={`text-[#999] transition-transform duration-200 motion-reduce:transition-none ${
        open ? "rotate-180" : ""
      }`}
    >
      <path d="M3 4.5l3 3 3-3" />
    </svg>
  );
}
