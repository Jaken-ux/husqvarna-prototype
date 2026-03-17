"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import NavHeader from "../NavHeader";
import AiPartsFinderModal from "../AiPartsFinderModal";

/* ═══════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════ */

const quickLinks = [
  { label: "Manualer & SB", href: "#docs" },
  { label: "Pris & tillgänglighet", href: "#pricing" },
  { label: "Kampanjer", href: "#campaigns" },
  { label: "Lagerstatus", href: "#stock" },
  { label: "Digitala verktyg", href: "#tools" },
];

const identifyMethods = [
  {
    label: "PNC / Artikelnummer",
    desc: "Sök med produktnummer",
    href: "#pnc",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="14" height="12" rx="2" />
        <path d="M7 8h6M7 11h4" />
      </svg>
    ),
  },
  {
    label: "Serienummer",
    desc: "Identifiera specifik enhet",
    href: "#serial",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="16" height="10" rx="2" />
        <path d="M6 8v4M9 8v4M12 8v4M15 8v4" />
      </svg>
    ),
  },
  {
    label: "QR-skanning",
    desc: "Skanna produktens QR-kod",
    href: "#qr",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="5" height="5" />
        <rect x="12" y="3" width="5" height="5" />
        <rect x="3" y="12" width="5" height="5" />
        <path d="M12 12h2v2h-2zM15 15h2v2h-2zM12 15h1M15 12h2" />
      </svg>
    ),
  },
];

const categories = [
  {
    title: "Robotgräsklippare",
    desc: "CEORA & Automower-serien",
    links: [
      { label: "Automower", href: "#cat/automower" },
      { label: "CEORA", href: "#cat/ceora" },
      { label: "Tillbehör robot", href: "#cat/robot-accessories" },
    ],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="10" width="18" height="8" rx="3" />
        <circle cx="7" cy="18" r="2" />
        <circle cx="17" cy="18" r="2" />
        <path d="M8 10V7a4 4 0 018 0v3" />
      </svg>
    ),
  },
  {
    title: "Handhållna produkter",
    desc: "Motorsågar, trimmers & röjsågar",
    links: [
      { label: "Motorsågar", href: "#cat/saws" },
      { label: "Trimmers & röjsågar", href: "#cat/trimmers" },
      { label: "Lövblåsar", href: "#cat/blowers" },
    ],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 15l8-8 4 4-8 8H4v-4z" />
        <path d="M14 9l3-3M18 6l2-2" />
      </svg>
    ),
  },
  {
    title: "Pro-kapning & borr",
    desc: "Kapmaskiner, borr & diamantverktyg",
    links: [
      { label: "Kapsågar", href: "#cat/cutters" },
      { label: "Borrmaskiner", href: "#cat/drills" },
      { label: "Diamantverktyg", href: "#cat/diamond" },
    ],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="3" />
        <path d="M12 4v2M12 18v2M4 12h2M18 12h2" />
      </svg>
    ),
  },
  {
    title: "Rider & traktor",
    desc: "Åkgräsklippare & trädgårdstraktorer",
    links: [
      { label: "Rider", href: "#cat/riders" },
      { label: "Trädgårdstraktorer", href: "#cat/tractors" },
      { label: "Tillbehör åk", href: "#cat/rider-acc" },
    ],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="10" width="16" height="6" rx="2" />
        <circle cx="6" cy="16" r="2.5" />
        <circle cx="14" cy="16" r="2.5" />
        <path d="M18 10l2-4h2" />
      </svg>
    ),
  },
  {
    title: "Batteri & laddning",
    desc: "Batterisystem, laddare & kompatibilitet",
    links: [
      { label: "Batterier", href: "#cat/batteries" },
      { label: "Laddare", href: "#cat/chargers" },
      { label: "Kompatibilitet", href: "#cat/compat" },
    ],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="4" width="12" height="18" rx="2" />
        <path d="M9 2h6" />
        <path d="M12 10v6M9 13h6" />
      </svg>
    ),
  },
  {
    title: "Reservdelar & slitagedelar",
    desc: "Filter, knivar, kedjor & slitagedelar",
    links: [
      { label: "Slitagedelar", href: "#cat/wear-parts" },
      { label: "Tillbehör", href: "#cat/accessories" },
    ],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
        <path d="M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
  },
];

const docResources = [
  { label: "Produktmanualer", desc: "Bruksanvisningar & instruktionsböcker", href: "#manuals" },
  { label: "Servicebulletiner (SB)", desc: "Tekniska uppdateringar & säkerhetsmeddelanden", href: "#bulletins" },
  { label: "Tekniska specifikationer", desc: "Datablad & produktdata", href: "#specs" },
  { label: "Installationsguider", desc: "Steg-för-steg installationsinstruktioner", href: "#install-guides" },
];

const toolResources = [
  {
    label: "Fleet Services",
    desc: "Flotthantering & uppkopplade produkter",
    href: "#fleet",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="6" width="16" height="10" rx="2" />
        <circle cx="6" cy="16" r="2" />
        <circle cx="14" cy="16" r="2" />
        <path d="M6 6V4h8v2" />
      </svg>
    ),
  },
  {
    label: "Automower Connect Pro",
    desc: "Fjärrstyrning & övervakning av robotgräsklippare",
    href: "#connect",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="10" cy="10" r="2" />
        <path d="M6 14A5.66 5.66 0 014 10a6 6 0 0112 0 5.66 5.66 0 01-2 4" />
        <path d="M4 16a9 9 0 010-12M16 16a9 9 0 000-12" />
      </svg>
    ),
  },
  {
    label: "CEORA-planering",
    desc: "Planerings- och kartverktyg för CEORA",
    href: "#ceora",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="14" height="14" rx="2" />
        <path d="M3 8h14M8 3v14" />
        <circle cx="13" cy="13" r="1.5" />
      </svg>
    ),
  },
];

const supportItems = [
  { label: "Husqvarna University", desc: "Certifieringar & e-learning", href: "#university" },
  { label: "Supportcenter", desc: "Hjälp, guider & felsökning", href: "#support" },
  { label: "Kontakt & eskalering", desc: "Direktkontakt med Husqvarna", href: "#contact" },
];

const newsItems = [
  { label: "Automower 435X AWD — ny firmware v3.2 tillgänglig", date: "12 mar 2026", href: "#news/1" },
  { label: "Vårkampanj 2026 — förlängd till 15 juni", date: "10 mar 2026", href: "#news/2" },
  { label: "CEORA 546 EPOS — lansering Q2 2026", date: "5 mar 2026", href: "#news/3" },
];

/* ═══════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════ */

export default function HusqvarnaPage() {
  const [aiModalOpen, setAiModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <NavHeader />

      <main className="mx-auto max-w-[1280px] px-6 py-8">
        {/* ── Breadcrumb ── */}
        <Link
          href="/start-v2"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#888] transition-colors hover:text-[#273A60]"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 12L6 8l4-4" />
          </svg>
          Startsidan
        </Link>

        {/* ── Page header ── */}
        <div className="mt-6 flex items-center gap-3">
          <Image src="/images/Husqvarna-logo.png" alt="Husqvarna" width={36} height={36} />
          <div>
            <h1 className="text-xl font-bold text-[#111]">Husqvarna</h1>
            <p className="text-[13px] text-[#888]">Produkter, reservdelar & tjänster</p>
          </div>
        </div>

        {/* ── Quick-links pill bar ── */}
        <nav aria-label="Snabbnavigation" className="mt-6 flex flex-wrap gap-2">
          {quickLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="rounded-full border border-[#d0d0d0] bg-white px-3.5 py-1.5 text-[13px] font-medium text-[#444] transition-colors hover:border-[#273A60]/40 hover:bg-[#f0f3f8] hover:text-[#273A60]"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* ═══ HERO: Identifiera produkt & reservdelssök ═══ */}
        <section className="mt-8 rounded-2xl border border-[#d0d0d0] bg-gradient-to-br from-[#f8f9fc] to-white p-6 sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_260px]">
            {/* Left: search + identify */}
            <div>
              <h2 className="text-lg font-bold text-[#111]">Identifiera produkt</h2>
              <p className="mt-1 text-[13px] text-[#666]">
                Sök med artikelnummer, modellnamn eller produktbeskrivning
              </p>

              {/* Search bar */}
              <div className="relative mt-4">
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#999]"
                  width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
                >
                  <circle cx="7" cy="7" r="4.5" />
                  <path d="M10.5 10.5L14 14" />
                </svg>
                <input
                  type="text"
                  placeholder="PNC, serienummer, modellnamn..."
                  aria-label="Sök produkt"
                  className="h-12 w-full rounded-xl border border-[#d0d0d0] bg-white pl-12 pr-4 text-[15px] text-[#333] placeholder-[#aaa] shadow-sm transition-colors focus:border-[#273A60] focus:shadow-md focus:outline-none"
                />
              </div>

              {/* Identify methods */}
              <div className="mt-4 flex flex-wrap gap-3">
                {identifyMethods.map((m) => (
                  <a
                    key={m.label}
                    href={m.href}
                    className="group flex items-center gap-2.5 rounded-lg border border-[#e5e5e5] bg-white px-4 py-2.5 transition-all hover:border-[#273A60]/30 hover:shadow-sm"
                  >
                    <span className="text-[#999] transition-colors group-hover:text-[#273A60]">
                      {m.icon}
                    </span>
                    <div>
                      <span className="text-[13px] font-semibold text-[#222]">{m.label}</span>
                      <span className="block text-[11px] text-[#999]">{m.desc}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Right: AI-sök prominent card */}
            <button
              onClick={() => setAiModalOpen(true)}
              className="group flex flex-col rounded-xl border border-[#273A60]/20 bg-[#273A60]/[0.03] p-5 text-left transition-all hover:border-[#273A60]/40 hover:shadow-md"
            >
              <div className="flex items-center gap-2">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#273A60] text-white">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                    <circle cx="8" cy="8" r="6" />
                    <path d="M6 6.5c0-1.1.9-2 2-2s2 .9 2 2c0 .8-.5 1.4-1.2 1.7-.3.1-.8.4-.8.8" />
                    <circle cx="8" cy="12" r=".5" fill="currentColor" />
                  </svg>
                </span>
                <span className="text-[14px] font-semibold text-[#111]">AI-assisterad reservdelssök</span>
                <span className="rounded bg-[#273A60]/10 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#273A60]">
                  Beta
                </span>
              </div>
              <span className="mt-1.5 text-[12px] leading-relaxed text-[#888]">
                Beskriv maskin och fel — få rätt del utan artikelnummer
              </span>
              <span className="mt-auto pt-3 text-[13px] font-semibold text-[#273A60]">
                Starta AI-sök →
              </span>
            </button>
          </div>
        </section>

        {/* ═══ SECTION 2: Pris & tillgänglighet ═══ */}
        <section className="mt-10">
          <a
            href="#pricing"
            className="group flex items-center justify-between rounded-xl border border-[#d0d0d0] bg-white px-6 py-5 transition-all hover:border-[#273A60]/30 hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-[#f0f3f8] text-[#273A60] transition-colors group-hover:bg-[#273A60] group-hover:text-white">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="18" height="14" rx="2" />
                  <path d="M2 9h18" />
                  <path d="M6 14h4" />
                </svg>
              </span>
              <div>
                <span className="text-[15px] font-semibold text-[#111]">Pris & tillgänglighet</span>
                <span className="mt-0.5 block text-[13px] text-[#888]">Lagerstatus, leveranstider och återförsäljarpriser</span>
              </div>
            </div>
            <span className="shrink-0 text-lg text-[#bbb] transition-colors group-hover:text-[#273A60]">→</span>
          </a>
        </section>

        {/* ═══ SECTION 3: Produktkategorier ═══ */}
        <section aria-labelledby="cat-heading" className="mt-12">
          <div className="flex items-center justify-between">
            <div>
              <h2 id="cat-heading" className="text-lg font-semibold text-[#111]">
                Produktkategorier
              </h2>
              <p className="mt-0.5 text-[13px] text-[#888]">Utforska produktsortimentet per kategori</p>
            </div>
            <a href="#catalog" className="text-[13px] font-semibold text-[#273A60] transition-colors hover:text-[#1a2d4d]">
              Komplett katalog →
            </a>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => (
              <div key={cat.title} className="group rounded-xl border border-[#d0d0d0] bg-white p-5 transition-all hover:shadow-sm">
                <div className="flex items-start gap-3">
                  <span className="shrink-0 rounded-lg bg-[#f0f3f8] p-2.5 text-[#273A60]">
                    {cat.icon}
                  </span>
                  <div>
                    <h3 className="text-[14px] font-semibold text-[#111]">{cat.title}</h3>
                    <p className="mt-0.5 text-[12px] text-[#888]">{cat.desc}</p>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 border-t border-[#f0f0f0] pt-3">
                  {cat.links.map((l) => (
                    <a
                      key={l.label}
                      href={l.href}
                      className="text-[13px] font-medium text-[#273A60] transition-colors hover:text-[#1a2d4d] hover:underline"
                    >
                      {l.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ SECTION 4: Utrustning & tillbehör ═══ */}
        <section className="mt-10">
          <a
            href="#equipment"
            className="group flex items-center justify-between rounded-xl border border-[#d0d0d0] bg-[#fafafa] px-6 py-5 transition-all hover:border-[#273A60]/30 hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-white text-[#273A60] shadow-sm">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h4v4H4zM14 4h4v4h-4zM4 14h4v4H4z" />
                  <path d="M14 14h4M16 12v4" />
                </svg>
              </span>
              <div>
                <span className="text-[15px] font-semibold text-[#111]">Utrustning & tillbehör</span>
                <span className="mt-0.5 block text-[13px] text-[#888]">Kompletterande produkter, personlig skyddsutrustning och arbetsredskap</span>
              </div>
            </div>
            <span className="shrink-0 rounded-lg border border-[#d0d0d0] bg-white px-4 py-2 text-[13px] font-medium text-[#333] transition-colors group-hover:border-[#273A60]/30 group-hover:text-[#273A60]">
              Se sortimentet →
            </span>
          </a>
        </section>

        {/* ═══ SECTION 5: Dokument & manualer ═══ */}
        <section aria-labelledby="docs-heading" className="mt-12">
          <div className="rounded-2xl border border-[#d0d0d0] bg-[#fafafa] p-6 sm:p-8">
            <div className="flex items-start justify-between">
              <div>
                <h2 id="docs-heading" className="text-lg font-semibold text-[#111]">
                  Dokument & manualer
                </h2>
                <p className="mt-1 text-[13px] text-[#888]">
                  Sök bland produktmanualer, servicebulletiner och teknisk dokumentation
                </p>
              </div>
            </div>

            {/* Doc search */}
            <div className="relative mt-4">
              <svg
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#bbb]"
                width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
              >
                <circle cx="7" cy="7" r="4.5" />
                <path d="M10.5 10.5L14 14" />
              </svg>
              <input
                type="text"
                placeholder="Sök dokument, modell eller SB-nummer..."
                aria-label="Sök dokument"
                className="h-10 w-full rounded-lg border border-[#d0d0d0] bg-white pl-10 pr-4 text-sm text-[#333] placeholder-[#aaa] transition-colors focus:border-[#273A60] focus:outline-none"
              />
            </div>

            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {docResources.map((d) => (
                <a
                  key={d.label}
                  href={d.href}
                  className="group flex items-center justify-between rounded-lg border border-[#e5e5e5] bg-white px-4 py-3 transition-all hover:border-[#273A60]/30 hover:shadow-sm"
                >
                  <div>
                    <span className="text-[13px] font-semibold text-[#333]">{d.label}</span>
                    <span className="mt-0.5 block text-[11px] text-[#999]">{d.desc}</span>
                  </div>
                  <span className="text-sm text-[#bbb] transition-colors group-hover:text-[#273A60]">→</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ SECTION 6: Digitala verktyg ═══ */}
        <section aria-labelledby="tools-heading" className="mt-12">
          <h2 id="tools-heading" className="text-lg font-semibold text-[#111]">
            Digitala verktyg
          </h2>
          <p className="mt-0.5 text-[13px] text-[#888]">Uppkopplade tjänster och planeringsverktyg</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {toolResources.map((r) => (
              <a
                key={r.label}
                href={r.href}
                className="group flex items-start gap-3.5 rounded-xl border border-[#d0d0d0] bg-white p-5 transition-all hover:border-[#273A60]/30 hover:shadow-md"
              >
                <span className="shrink-0 rounded-lg bg-[#f0f3f8] p-2.5 text-[#273A60] transition-colors group-hover:bg-[#273A60] group-hover:text-white">
                  {r.icon}
                </span>
                <div>
                  <span className="text-[14px] font-semibold text-[#111]">{r.label}</span>
                  <span className="mt-0.5 block text-[12px] leading-relaxed text-[#888]">{r.desc}</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ═══ SECTION 7: Utbildning & support ═══ */}
        <section aria-labelledby="support-heading" className="mt-10">
          <h2 id="support-heading" className="text-lg font-semibold text-[#111]">
            Utbildning & support
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {supportItems.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="group flex items-center justify-between rounded-xl border border-[#d0d0d0] bg-white px-5 py-4 transition-all hover:border-[#273A60]/30 hover:shadow-md"
              >
                <div>
                  <span className="text-sm font-semibold text-[#111]">{s.label}</span>
                  <span className="mt-0.5 block text-[12px] text-[#888]">{s.desc}</span>
                </div>
                <span className="shrink-0 text-sm text-[#999] transition-colors group-hover:text-[#273A60]">→</span>
              </a>
            ))}
          </div>
        </section>

        {/* ═══ SECTION 8: Kampanjer & nyheter ═══ */}
        <section aria-labelledby="news-heading" className="mt-12 mb-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Kampanjer */}
            <div className="rounded-xl border border-[#d0d0d0] bg-white p-6">
              <h2 id="campaign-sub" className="text-[15px] font-semibold text-[#111]">Aktiva kampanjer</h2>
              <p className="mt-0.5 text-[12px] text-[#888]">Se aktuella erbjudanden och kampanjvillkor</p>
              <a
                href="#campaigns"
                className="mt-4 inline-flex items-center rounded-lg border border-[#d0d0d0] px-4 py-2 text-[13px] font-medium text-[#333] transition-colors hover:border-[#273A60]/30 hover:text-[#273A60]"
              >
                Visa kampanjer →
              </a>
            </div>

            {/* Nyheter */}
            <div className="rounded-xl border border-[#d0d0d0] bg-white p-6">
              <div className="flex items-center justify-between">
                <h2 id="news-heading" className="text-[15px] font-semibold text-[#111]">Senaste nyheterna</h2>
                <a href="#news" className="text-[12px] font-semibold text-[#273A60] transition-colors hover:text-[#1a2d4d]">
                  Visa alla →
                </a>
              </div>
              <ul className="mt-3 divide-y divide-[#f0f0f0]">
                {newsItems.map((n) => (
                  <li key={n.label}>
                    <a href={n.href} className="flex items-start justify-between gap-4 py-2.5 text-sm text-[#333] transition-colors hover:text-[#111]">
                      <span className="font-medium">{n.label}</span>
                      <span className="shrink-0 text-[11px] text-[#bbb]">{n.date}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>

      {aiModalOpen && <AiPartsFinderModal onClose={() => setAiModalOpen(false)} />}
    </div>
  );
}
