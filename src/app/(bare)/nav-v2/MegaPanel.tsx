"use client";

import { useEffect, useRef, useCallback } from "react";
import type { NavSection } from "./navData";
import { useOnClickOutside } from "./useOnClickOutside";

type MegaPanelProps = {
  section: NavSection;
  onClose: () => void;
  onAction?: (action: string) => void;
};

export default function MegaPanel({ section, onClose, onAction }: MegaPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  const stableOnClose = useCallback(onClose, [onClose]);

  useOnClickOutside(panelRef, stableOnClose);

  // ESC to close, focus trap
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        stableOnClose();
        return;
      }

      if (e.key === "Tab" && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [stableOnClose]);

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-label={`${section.label} navigation`}
      className="absolute left-0 right-0 top-full z-50 border-b border-[#e5e5e5] bg-white shadow-lg"
    >
      <div className="mx-auto max-w-[1280px] px-6 py-8">
        {/* Panel header: breadcrumb + close */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold text-[#111]">
              {section.label}
            </span>
            <span className="text-[#ccc]">/</span>
            <span className="text-[#999]">Alla kategorier</span>
          </div>
          <button
            onClick={stableOnClose}
            aria-label="Stäng meny"
            className="flex h-8 w-8 items-center justify-center rounded-md text-[#999] transition-colors hover:bg-[#f5f5f5] hover:text-[#333]"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M4 4l8 8M12 4l-8 8" />
            </svg>
          </button>
        </div>

        {/* Groups — zoned layout when primary groups exist, flat otherwise */}
        {(() => {
          const primaryGroups = section.groups.filter((g) => g.primary);
          const secondaryGroups = section.groups.filter((g) => !g.primary);
          const hasZones = primaryGroups.length > 0;

          if (!hasZones) {
            // Flat column layout (e.g. Min verksamhet)
            return (
              <>
                <div className="mb-5 border-b border-[#f0f0f0] pb-4">
                  <h2 className="text-xs font-semibold uppercase tracking-widest text-[#bbb]">
                    Din verksamhet
                  </h2>
                </div>
                <div className="columns-2 gap-x-10 sm:columns-3 lg:columns-4">
                  {section.groups.map((group, groupIndex) => (
                    <GroupBlock
                      key={group.label}
                      group={group}
                      groupIndex={groupIndex}
                      firstLinkRef={groupIndex === 0 ? firstLinkRef : undefined}
                      variant="primary"
                      onAction={onAction}
                    />
                  ))}
                </div>
              </>
            );
          }

          // Zoned layout: operational (left 2/3) + informational (right 1/3)
          return (
            <div className="grid grid-cols-1 gap-0 lg:grid-cols-3">
              {/* Operational zone */}
              <div className="rounded-l-xl bg-[#fafafa] p-6 lg:col-span-2">
                <h2 className="mb-5 text-xs font-semibold uppercase tracking-widest text-[#999]">
                  Produkter &amp; tjänster
                </h2>
                <div className="grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2">
                  {primaryGroups.map((group, i) => (
                    <GroupBlock
                      key={group.label}
                      group={group}
                      groupIndex={i}
                      firstLinkRef={i === 0 ? firstLinkRef : undefined}
                      variant="primary"
                      onAction={onAction}
                    />
                  ))}
                </div>
              </div>

              {/* Informational zone */}
              <div className="border-t border-[#f0f0f0] p-6 lg:border-l lg:border-t-0">
                <h2 className="mb-5 text-xs font-semibold uppercase tracking-widest text-[#ccc]">
                  Information &amp; resurser
                </h2>
                <div className="grid grid-cols-2 gap-x-8 gap-y-5 lg:grid-cols-1">
                  {secondaryGroups.map((group, i) => (
                    <GroupBlock
                      key={group.label}
                      group={group}
                      groupIndex={primaryGroups.length + i}
                      variant="secondary"
                      onAction={onAction}
                    />
                  ))}
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
}

/* ── Reusable group block ── */

import type { NavGroup } from "./navData";

function GroupBlock({
  group,
  groupIndex,
  firstLinkRef,
  variant,
  onAction,
}: {
  group: NavGroup;
  groupIndex: number;
  firstLinkRef?: React.RefObject<HTMLAnchorElement | null>;
  variant: "primary" | "secondary";
  onAction?: (action: string) => void;
}) {
  const isPrimary = variant === "primary";

  return (
    <div className={isPrimary ? "mb-6 break-inside-avoid" : "mb-4"}>
      <h3
        className={
          isPrimary
            ? "mb-3 text-sm font-semibold text-[#111]"
            : "mb-2 text-[13px] font-medium text-[#555]"
        }
      >
        {group.label}
      </h3>
      <ul className={isPrimary ? "space-y-1" : "space-y-0.5"}>
        {group.items.map((item, itemIndex) => (
          <li key={item.label}>
            <a
              ref={
                firstLinkRef && itemIndex === 0 ? firstLinkRef : undefined
              }
              href={item.href}
              className={`group flex items-center gap-2 rounded-md px-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#ccc] ${
                isPrimary
                  ? "py-1.5 text-[#555] hover:bg-[#eee] hover:text-[#111] focus-visible:bg-[#eee] focus-visible:text-[#111]"
                  : "py-1 text-[#777] hover:bg-[#f5f5f5] hover:text-[#333] focus-visible:bg-[#f5f5f5] focus-visible:text-[#333]"
              }`}
            >
              {item.label}
              {item.badge && (
                <span className="rounded bg-[#ff6b00] px-1.5 py-0.5 text-[10px] font-bold uppercase leading-none text-white">
                  {item.badge}
                </span>
              )}
            </a>
          </li>
        ))}
      </ul>

      {/* Showcase card (only in primary zone) */}
      {group.showcase && (
        <div className="mt-4 rounded-xl border border-[#e8e8f4] bg-gradient-to-br from-white to-[#f5f5ff] p-4">
          <div className="mb-2 flex items-center gap-2">
            <span className="text-[13px] font-semibold text-[#222]">
              {group.showcase.title}
            </span>
            <span className="rounded bg-[#e8ecf4] px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#273A60]">
              {group.showcase.badge}
            </span>
          </div>
          <p className="mb-3 text-[12px] leading-relaxed text-[#777]">
            {group.showcase.description}
          </p>
          <button
            onClick={() => onAction?.(group.showcase!.action)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#111] px-3.5 py-2 text-[12px] font-medium text-white transition-opacity hover:opacity-80"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              <circle cx="8" cy="8" r="6" />
              <path d="M6 6.5c0-1.1.9-2 2-2s2 .9 2 2c0 .8-.5 1.4-1.2 1.7-.3.1-.8.4-.8.8" />
              <circle cx="8" cy="12" r=".5" fill="currentColor" />
            </svg>
            {group.showcase.cta}
          </button>
        </div>
      )}
    </div>
  );
}
