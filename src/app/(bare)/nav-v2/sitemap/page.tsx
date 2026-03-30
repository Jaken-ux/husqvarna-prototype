"use client";

import Link from "next/link";
import NavHeader from "../NavHeader";

/* ═══════════════════════════════════════════════════════
   SITEMAP DATA — mirrors the actual site structure
   ═══════════════════════════════════════════════════════ */

type SitemapNode = {
  label: string;
  href: string;
  badge?: string;
  children?: SitemapNode[];
};

const sitemap: SitemapNode[] = [
  {
    label: "Startsidan",
    href: "/nav-v2",
    children: [
      {
        label: "Husqvarna",
        href: "/nav-v2/husqvarna",
        badge: "OEM",
        children: [
          { label: "Sök & Kategorier", href: "/nav-v2/husqvarna" },
          { label: "Kampanjer", href: "/nav-v2/husqvarna/kampanjer" },
          {
            label: "Kampanjdetalj",
            href: "/nav-v2/kampanj",
          },
          { label: "Nyheter & Lanseringar", href: "/nav-v2/husqvarna/nyheter" },
        ],
      },
      {
        label: "Min verksamhet",
        href: "/nav-v2/min-verksamhet",
        badge: "Dealer",
        children: [
          {
            label: "Dealer Workspace",
            href: "/nav-v2/min-verksamhet/workspace",
            children: [
              { label: "Dashboard", href: "/nav-v2/min-verksamhet/workspace" },
              { label: "Produkter", href: "/nav-v2/min-verksamhet/workspace" },
              { label: "Kunder", href: "/nav-v2/min-verksamhet/workspace" },
              { label: "Avtal & Program", href: "/nav-v2/min-verksamhet/workspace" },
              { label: "Idag", href: "/nav-v2/min-verksamhet/workspace" },
            ],
          },
          { label: "Orderhantering", href: "/nav-v2/min-verksamhet/orders" },
          { label: "Fakturor", href: "/nav-v2/min-verksamhet/fakturor" },
          { label: "Betalningar & Saldo", href: "/nav-v2/min-verksamhet/betalningar" },
          { label: "Rapporter", href: "/nav-v2/min-verksamhet/rapporter" },
          { label: "Offerter", href: "/nav-v2/offerter" },
          { label: "Wishlist", href: "/nav-v2/min-verksamhet/wishlist" },
          { label: "Varukorg", href: "/nav-v2/varukorg" },
        ],
      },
    ],
  },
];

/* ═══════════════════════════════════════════════════════
   COLORS — left domain = navy, right domain = green
   ═══════════════════════════════════════════════════════ */

const domainColors: Record<string, { line: string; dot: string; bg: string; text: string }> = {
  OEM: { line: "bg-[#ff6b00]", dot: "bg-[#ff6b00]", bg: "bg-[#fff8f2]", text: "text-[#e65100]" },
  Dealer: { line: "bg-[#2a9d5c]", dot: "bg-[#2a9d5c]", bg: "bg-[#f0faf4]", text: "text-[#2e7d32]" },
};

/* ═══════════════════════════════════════════════════════
   RECURSIVE NODE COMPONENT
   ═══════════════════════════════════════════════════════ */

function SitemapBranch({ node, depth = 0, domain }: { node: SitemapNode; depth?: number; domain?: string }) {
  const currentDomain = node.badge ?? domain;
  const colors = currentDomain ? domainColors[currentDomain] : null;
  const hasChildren = node.children && node.children.length > 0;
  const isRoot = depth === 0;

  return (
    <div className={`${depth > 0 ? "ml-6 sm:ml-10" : ""}`}>
      {/* Connector line */}
      {depth > 0 && (
        <div className="relative">
          <div className={`absolute -left-6 sm:-left-10 top-0 h-full w-px ${colors?.line ?? "bg-[#e0e0e0]"}`} />
          <div className={`absolute -left-6 sm:-left-10 top-5 h-px w-4 sm:w-8 ${colors?.line ?? "bg-[#e0e0e0]"}`} />
        </div>
      )}

      {/* Node */}
      <Link
        href={node.href}
        className={`group relative flex items-center gap-3 rounded-xl px-4 py-3 transition-all hover:shadow-sm ${
          isRoot
            ? "bg-[#273A60] text-white"
            : depth === 1
            ? `border border-[#d0d0d0] ${colors?.bg ?? "bg-white"} hover:border-[#aaa]`
            : "bg-white border border-[#f0f0f0] hover:border-[#d0d0d0]"
        }`}
      >
        {/* Dot */}
        {!isRoot && (
          <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${colors?.dot ?? "bg-[#ccc]"}`} />
        )}

        {/* Label */}
        <span className={`font-semibold ${
          isRoot
            ? "text-[16px]"
            : depth === 1
            ? `text-[15px] ${colors?.text ?? "text-[#111]"}`
            : "text-[13px] text-[#333]"
        }`}>
          {node.label}
        </span>

        {/* Badge */}
        {node.badge && (
          <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
            node.badge === "OEM" ? "bg-[#ff6b00]/10 text-[#e65100]" : "bg-[#2a9d5c]/10 text-[#2e7d32]"
          }`}>
            {node.badge}
          </span>
        )}

        {/* Arrow */}
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke={isRoot ? "white" : "#ccc"} strokeWidth="1.8" strokeLinecap="round" className="ml-auto shrink-0 opacity-0 transition-opacity group-hover:opacity-100">
          <path d="M6 4l4 4-4 4" />
        </svg>
      </Link>

      {/* Children */}
      {hasChildren && (
        <div className="relative mt-2 space-y-2">
          {node.children!.map((child) => (
            <SitemapBranch key={child.label + child.href} node={child} depth={depth + 1} domain={currentDomain} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════ */

export default function SitemapPage() {
  return (
    <div className="min-h-screen bg-white">
      <NavHeader />

      <main className="mx-auto max-w-[960px] px-4 sm:px-6 py-8 sm:py-12">
        <h1 className="text-[22px] sm:text-[28px] font-bold text-[#111]">Sitemap</h1>
        <p className="mt-1 text-[13px] text-[#888]">
          Visuell översikt av portalens navigationsstruktur
        </p>

        {/* Two-column layout on desktop */}
        <div className="mt-8">
          {/* Root node */}
          <SitemapBranch node={sitemap[0]} />

          {/* Legend */}
          <div className="mt-10 flex flex-wrap gap-4 rounded-xl border border-[#e5e5e5] bg-[#fafafa] px-5 py-4">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#ff6b00]" />
              <span className="text-[12px] font-medium text-[#666]">Husqvarna (OEM-innehåll)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#2a9d5c]" />
              <span className="text-[12px] font-medium text-[#666]">Min verksamhet (Dealer workspace)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#273A60]" />
              <span className="text-[12px] font-medium text-[#666]">Startpunkt</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
