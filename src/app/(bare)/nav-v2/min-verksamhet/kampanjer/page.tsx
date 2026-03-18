"use client";

import Image from "next/image";
import NavHeader from "../../NavHeader";
import Breadcrumb from "../../Breadcrumb";

/* ═══════════════════════════════════════════════════════
   TYPES & DATA
   ═══════════════════════════════════════════════════════ */

type CampaignStatus = "active" | "upcoming" | "ended";

type Campaign = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  status: CampaignStatus;
  period: string;
  daysLeft?: number;
  maxBonus: string;
  categories: string[];
  image?: string;
  href: string;
  highlight?: string;
};

const campaigns: Campaign[] = [
  {
    id: "varkampanj-2026",
    title: "Vårkampanj 2026",
    subtitle: "Återförsäljarprogram",
    description:
      "Tjäna upp till 6 % bonusmarginal på utvalda Automower®, Forest & Garden och Batteriprodukter. Retroaktiv bonus — ju fler sell-outs, desto högre nivå.",
    status: "active",
    period: "1 mars – 31 maj 2026",
    daysLeft: 75,
    maxBonus: "6 %",
    categories: ["Automower®", "Forest & Garden", "Batteriserien POWER+", "Åkgräsklippare"],
    image: "/images/husqvarna.jpg",
    href: "/nav-v2/kampanj",
    highlight: "Din nuvarande nivå: Guld (4 %) — 3 enheter till Platina",
  },
  {
    id: "construction-q2",
    title: "Construction Pro-kampanj Q2",
    subtitle: "Volymrabatt på kapmaskiner",
    description:
      "Köp 5 eller fler kapmaskiner i K-serien under Q2 och få 8 % extra rabatt retroaktivt på hela ordern. Gäller K 770, K 770 VAC och K 1270.",
    status: "active",
    period: "1 april – 30 juni 2026",
    daysLeft: 105,
    maxBonus: "8 %",
    categories: ["Kapmaskiner", "Diamantverktyg", "Borrmaskiner"],
    href: "#",
  },
];

const pastCampaigns = [
  {
    title: "Höstspurt 2025",
    period: "1 sep – 30 nov 2025",
    result: "Du nådde Guld-nivå — 12 400 SEK utbetald bonus",
    status: "ended" as CampaignStatus,
  },
  {
    title: "Batterikampanj Sommar 2025",
    period: "1 jun – 31 aug 2025",
    result: "Silver-nivå — 4 200 SEK utbetald bonus",
    status: "ended" as CampaignStatus,
  },
];

const statusConfig: Record<CampaignStatus, { label: string; bg: string; text: string; dot: string }> = {
  active: { label: "Pågående", bg: "bg-[#e8f5e9]", text: "text-[#2e7d32]", dot: "bg-[#2e7d32]" },
  upcoming: { label: "Kommande", bg: "bg-[#e3f2fd]", text: "text-[#1565c0]", dot: "bg-[#1565c0]" },
  ended: { label: "Avslutad", bg: "bg-[#f5f5f5]", text: "text-[#888]", dot: "bg-[#888]" },
};

/* ═══════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════ */

export default function KampanjerPage() {
  return (
    <div className="min-h-screen bg-white">
      <NavHeader />

      <main className="mx-auto max-w-[1320px] px-6 py-6">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: "Min verksamhet", href: "/nav-v2/min-verksamhet" },
            { label: "Kampanjer", href: "/nav-v2/min-verksamhet/kampanjer" },
          ]}
        />

        {/* Page header */}
        <div className="mt-5 flex items-end justify-between">
          <div>
            <h1 className="text-[26px] font-bold text-[#111]">Kampanjer</h1>
            <p className="mt-1 max-w-xl text-[13px] leading-relaxed text-[#888]">
              Aktiva och tidigare kampanjer. Delta, följ din progress och se utbetalad bonus.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-[#e8f5e9] px-4 py-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#2e7d32]" />
            <span className="text-[13px] font-semibold text-[#2e7d32]">
              2 aktiva kampanjer
            </span>
          </div>
        </div>

        {/* ── Active campaigns ── */}
        <div className="mt-8 space-y-5">
          {campaigns.map((c) => {
            const st = statusConfig[c.status];
            return (
              <a
                key={c.id}
                href={c.href}
                className="group block overflow-hidden rounded-2xl border border-[#e0e0e0] bg-white transition-all hover:border-[#273A60]/30 hover:shadow-lg"
              >
                <div className="grid lg:grid-cols-[1fr_340px]">
                  {/* Left: Content */}
                  <div className="flex flex-col p-6 lg:p-8">
                    {/* Top badges */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${st.bg} ${st.text}`}>
                        <span className={`h-1.5 w-1.5 animate-pulse rounded-full ${st.dot}`} />
                        {st.label}
                      </span>
                      <span className="text-[12px] text-[#999]">{c.period}</span>
                      {c.daysLeft && (
                        <span className="rounded bg-[#273A60]/5 px-2 py-0.5 text-[11px] font-medium text-[#273A60]">
                          {c.daysLeft} dagar kvar
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h2 className="mt-3 text-[20px] font-bold text-[#111] group-hover:text-[#273A60]">
                      {c.title}
                    </h2>
                    <p className="text-[14px] font-medium text-[#888]">{c.subtitle}</p>
                    <p className="mt-2 max-w-lg text-[13px] leading-relaxed text-[#666]">
                      {c.description}
                    </p>

                    {/* Categories */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {c.categories.map((cat) => (
                        <span
                          key={cat}
                          className="rounded-full border border-[#e5e5e5] px-2.5 py-0.5 text-[11px] font-medium text-[#666]"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>

                    {/* Highlight / progress */}
                    {c.highlight && (
                      <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#fff3e0] px-4 py-2.5">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#e65100" strokeWidth="1.8" strokeLinecap="round">
                          <path d="M8 2l2 4 4.5.7-3.3 3.1.8 4.5L8 12l-4 2.3.8-4.5L1.5 6.7 6 6l2-4z" />
                        </svg>
                        <span className="text-[12px] font-semibold text-[#e65100]">
                          {c.highlight}
                        </span>
                      </div>
                    )}

                    {/* CTA */}
                    <span className="mt-auto inline-flex items-center gap-1 pt-5 text-[13px] font-semibold text-[#273A60] opacity-0 transition-opacity group-hover:opacity-100">
                      Visa kampanjdetaljer
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 3l4 4-4 4" />
                      </svg>
                    </span>
                  </div>

                  {/* Right: Visual / bonus card */}
                  <div className="relative hidden lg:block">
                    {c.image ? (
                      <>
                        <Image
                          src={c.image}
                          alt={c.title}
                          fill
                          className="object-cover"
                          sizes="340px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-white" />
                        {/* Bonus overlay */}
                        <div className="absolute bottom-6 right-6 rounded-xl bg-white/90 px-5 py-4 shadow-lg backdrop-blur-sm">
                          <span className="block text-[11px] font-semibold uppercase tracking-wide text-[#888]">
                            Max bonus
                          </span>
                          <span className="block text-[28px] font-extrabold text-[#273A60]">
                            {c.maxBonus}
                          </span>
                        </div>
                      </>
                    ) : (
                      <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#273A60] to-[#1a2d4d] p-8">
                        <div className="text-center">
                          <span className="block text-[11px] font-semibold uppercase tracking-wide text-white/50">
                            Max bonus
                          </span>
                          <span className="block text-[48px] font-extrabold text-white">
                            {c.maxBonus}
                          </span>
                          <span className="mt-2 block text-[12px] text-white/40">
                            volymrabatt
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        {/* ── Past campaigns ── */}
        <section className="mt-14">
          <h2 className="text-[15px] font-bold text-[#111]">Tidigare kampanjer</h2>
          <p className="mt-1 text-[12px] text-[#999]">Avslutade kampanjer och dina resultat</p>

          <div className="mt-4 space-y-3">
            {pastCampaigns.map((c) => (
              <div
                key={c.title}
                className="flex items-center justify-between rounded-xl border border-[#e5e5e5] px-6 py-4"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f5f5f5] text-[#999]">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="10" cy="10" r="7" />
                      <path d="M7 10l2 2 4-4" />
                    </svg>
                  </span>
                  <div>
                    <span className="text-[14px] font-semibold text-[#333]">{c.title}</span>
                    <span className="ml-2 text-[12px] text-[#bbb]">{c.period}</span>
                  </div>
                </div>
                <span className="text-[13px] font-medium text-[#2e7d32]">{c.result}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
