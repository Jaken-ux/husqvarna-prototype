"use client";

import { useEffect, useRef, useState } from "react";
import type { NavSection } from "./navData";
import { accountNav } from "./navData";

type MobileDrawerProps = {
  sections: NavSection[];
  onClose: () => void;
};

export default function MobileDrawer({ sections, onClose }: MobileDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<string>(
    sections[1]?.id ?? sections[0].id
  );
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  const activeSection = sections.find((s) => s.id === activeTab) ?? sections[0];

  function toggleGroup(key: string) {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  // Lock body scroll & ESC to close
  useEffect(() => {
    document.body.style.overflow = "hidden";

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  const contextLabels: Record<string, string> = {
    husqvarna: "Produkter, reservdelar & tjänster",
    "min-verksamhet": "Dealer Workspace",
  };

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 animate-fade-in motion-reduce:animate-none"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-label="Navigation"
        className="absolute inset-y-0 left-0 w-full max-w-sm overflow-y-auto bg-white shadow-xl animate-slide-in motion-reduce:animate-none"
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between border-b border-[#e5e5e5] px-5 py-4">
          <span className="text-sm font-semibold text-[#222]">Meny</span>
          <button
            onClick={onClose}
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

        {/* Search bar (mobile) */}
        <div className="border-b border-[#e5e5e5] px-5 py-3">
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#bbb]"
              width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
            >
              <circle cx="7" cy="7" r="4.5" />
              <path d="M10.5 10.5L14 14" />
            </svg>
            <input
              type="text"
              placeholder="Sök produkter, kunder, order..."
              aria-label="Sök"
              className="h-9 w-full rounded-lg border border-[#e0e0e0] bg-[#f8f8f8] pl-9 pr-3 text-sm text-[#333] placeholder-[#aaa] transition-colors focus:border-[#999] focus:bg-white focus:outline-none"
            />
          </div>
        </div>

        {/* Segmented tabs */}
        <div className="border-b border-[#e5e5e5] px-5 pt-4 pb-0">
          <div className="flex rounded-lg bg-[#f3f3f3] p-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => {
                  setActiveTab(section.id);
                  setExpandedGroups(new Set());
                }}
                className={`flex-1 rounded-md px-3 py-2 text-xs font-semibold transition-all duration-150 motion-reduce:transition-none ${
                  activeTab === section.id
                    ? "bg-white text-[#111] shadow-sm"
                    : "text-[#888] hover:text-[#555]"
                }`}
                aria-pressed={activeTab === section.id}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>

        {/* Active section content */}
        <div className="p-5">
          {/* Section context label */}
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-[#bbb]">
            {contextLabels[activeSection.id] ?? activeSection.label}
          </p>

          {activeSection.groups.map((group) => {
            const key = `${activeSection.id}-${group.label}`;
            const isExpanded = expandedGroups.has(key);

            return (
              <div key={key} className="mb-1">
                <button
                  onClick={() => toggleGroup(key)}
                  aria-expanded={isExpanded}
                  className="flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-sm font-medium text-[#333] transition-colors hover:bg-[#f5f5f5]"
                >
                  {group.label}
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className={`transition-transform duration-200 motion-reduce:transition-none ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  >
                    <path d="M3 4.5l3 3 3-3" />
                  </svg>
                </button>

                {/* Expandable sub-items */}
                <div
                  className={`grid transition-[grid-template-rows] duration-200 motion-reduce:transition-none ${
                    isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <ul className="mb-2 ml-3 border-l border-[#e5e5e5] pl-3 pt-1">
                      {group.items.map((item) => (
                        <li key={item.label}>
                          <a
                            href={item.href}
                            className="flex items-center gap-2 rounded-md px-2 py-2 text-sm text-[#555] transition-colors hover:bg-[#f5f5f5] hover:text-[#111]"
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
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mitt konto section */}
        <div className="border-t border-[#e5e5e5] px-5 py-4">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-[#bbb]">
            {accountNav.label}
          </p>
          <ul className="space-y-0.5">
            {accountNav.items.map((item, i) => {
              const isLast = i === accountNav.items.length - 1;
              return (
                <li key={item.label}>
                  {isLast && <div className="my-1.5 border-t border-[#e5e5e5]" />}
                  <a
                    href={item.href}
                    className={`block rounded-md px-3 py-2 text-sm transition-colors hover:bg-[#f5f5f5] ${
                      isLast
                        ? "font-medium text-[#c00]"
                        : "text-[#555] hover:text-[#111]"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
