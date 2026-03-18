"use client";

import { useState, Fragment } from "react";
import NavHeader from "../NavHeader";
import { tokens, iconSizes, statusTokens, priorityTokens, actionTagTokens, eventSchema } from "../designTokens";

/* ═══════════════════════════════════════════════════════
   DESIGN SYSTEM — HUSQVARNA DEALER PORTAL
   Komplett specifikation: foundation, komponenter, states,
   tokens och event-instrumentering.
   ═══════════════════════════════════════════════════════ */

type Section = "foundation" | "components" | "states" | "events";

const sectionTabs: { id: Section; label: string }[] = [
  { id: "foundation", label: "Foundation" },
  { id: "components", label: "Komponenter" },
  { id: "states", label: "States" },
  { id: "events", label: "Events" },
];

export default function DesignSystemPage() {
  const [active, setActive] = useState<Section>("foundation");

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <NavHeader />

      <main className="mx-auto max-w-[1320px] px-6 py-6">
        {/* Header */}
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#111]">Designsystem</h1>
            <p className="mt-1 text-[13px] text-[#888]">Husqvarna Dealer Portal · v1.0 · WCAG 2.1 AA</p>
          </div>
          <span className="rounded-full bg-[#e8f5e9] px-3 py-1 text-[11px] font-semibold text-[#2e7d32]">
            Production-ready
          </span>
        </div>

        {/* Tab bar */}
        <div className="mt-6 border-b border-[#d0d0d0]">
          <nav className="-mb-px flex gap-0" aria-label="Design system sections">
            {sectionTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className={`border-b-2 px-5 py-3 text-[13px] font-semibold transition-colors ${
                  active === tab.id
                    ? "border-[#273A60] text-[#273A60]"
                    : "border-transparent text-[#888] hover:text-[#555]"
                }`}
                aria-selected={active === tab.id}
                role="tab"
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-8">
          {active === "foundation" && <FoundationSection />}
          {active === "components" && <ComponentsSection />}
          {active === "states" && <StatesSection />}
          {active === "events" && <EventsSection />}
        </div>
      </main>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   A) FOUNDATION
   ═══════════════════════════════════════════════════════ */

function FoundationSection() {
  return (
    <div className="space-y-12">
      {/* ── A1. COLOR PALETTE ── */}
      <section>
        <SectionHeading title="A1. Färgpalett" desc="Primär, sekundär, neutraler, semantiska" />

        {/* Primary */}
        <h4 className="mt-5 text-[13px] font-semibold text-[#111]">Primär — Brand navy</h4>
        <p className="mt-1 text-[12px] text-[#888]">Används för navigation, aktiva tabs, primära CTA, ikoner och länkar.</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {(["primary-900","primary-800","primary","primary-400","primary-200","primary-100","primary-50"] as const).map((k) => (
            <ColorSwatch key={k} name={k} hex={tokens.color[k]} />
          ))}
        </div>

        {/* Secondary */}
        <h4 className="mt-6 text-[13px] font-semibold text-[#111]">Sekundär — Husqvarna orange</h4>
        <p className="mt-1 text-[12px] text-[#888]">Badges (NY, BETA), varukorgsikonen, kampanj-accenter. Aldrig som body-text-färg.</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {(["secondary-900","secondary","secondary-400","secondary-100"] as const).map((k) => (
            <ColorSwatch key={k} name={k} hex={tokens.color[k]} />
          ))}
        </div>

        {/* Semantic */}
        <h4 className="mt-6 text-[13px] font-semibold text-[#111]">Semantiska färger</h4>
        <p className="mt-1 text-[12px] text-[#888]">Konsekventa färger för status, prioritet och feedback. Alla par klarar WCAG AA-kontrast.</p>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <SemanticPair label="Success" bg={tokens.color["success-100"]} fg={tokens.color.success} hex100="#e8f5e9" hex="#2a9d5c" />
          <SemanticPair label="Warning" bg={tokens.color["warning-100"]} fg={tokens.color.warning} hex100="#fff8e1" hex="#b8860b" />
          <SemanticPair label="Danger" bg={tokens.color["danger-100"]} fg={tokens.color.danger} hex100="#fce8e8" hex="#cc4444" />
          <SemanticPair label="Info" bg={tokens.color["info-100"]} fg={tokens.color.info} hex100="#e3f2fd" hex="#1565c0" />
        </div>

        {/* Neutrals */}
        <h4 className="mt-6 text-[13px] font-semibold text-[#111]">Neutraler — 11-stegs gråskala</h4>
        <p className="mt-1 text-[12px] text-[#888]">Textfärger, bakgrunder, ramar. neutral-900 = rubriker, neutral-700 = body, neutral-500 = helpers.</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {(["neutral-0","neutral-50","neutral-100","neutral-150","neutral-200","neutral-300","neutral-400","neutral-500","neutral-600","neutral-700","neutral-800","neutral-900"] as const).map((k) => (
            <div key={k} className="flex flex-col items-center gap-1">
              <div className="h-10 w-14 rounded border border-[#e5e5e5]" style={{ backgroundColor: tokens.color[k] }} />
              <span className="text-[9px] font-mono text-[#888]">{k.replace("neutral-", "")}</span>
              <span className="text-[9px] font-mono text-[#aaa]">{tokens.color[k]}</span>
            </div>
          ))}
        </div>

        {/* Usage rules */}
        <div className="mt-6 rounded-xl border border-[#d0d0d0] bg-white p-5">
          <h4 className="text-[13px] font-semibold text-[#111]">Användningsregler</h4>
          <ul className="mt-2 space-y-1 text-[12px] text-[#555]">
            <li>• <strong>Kontrastpar text/bg:</strong> neutral-900 på neutral-0 (21:1), neutral-700 på neutral-0 (7.5:1), neutral-500 på neutral-0 (4.6:1 — AA large text only)</li>
            <li>• <strong>Kort:</strong> bg neutral-0, border neutral-300, hover shadow-cardHover</li>
            <li>• <strong>Tabellrader:</strong> udda neutral-0, jämna neutral-50, hover neutral-50</li>
            <li>• <strong>KPI-accenter:</strong> border-left 3px med danger/warning/success beroende på urgency</li>
            <li>• <strong>Aldrig:</strong> sekundär orange som textfärg i body — enbart badges & ikoner</li>
          </ul>
        </div>
      </section>

      {/* ── A2. TYPOGRAPHY ── */}
      <section>
        <SectionHeading title="A2. Typografi" desc="Inter sans-serif, optimerat för datatäta vyer" />

        <div className="mt-4 overflow-x-auto rounded-xl border border-[#d0d0d0] bg-white">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#e5e5e5] bg-[#fafafa]">
                <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#999]">Token</th>
                <th className="px-3 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#999]">Storlek</th>
                <th className="px-3 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#999]">Radhöjd</th>
                <th className="px-3 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#999]">Vikt</th>
                <th className="px-3 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#999]">Användning</th>
                <th className="px-3 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#999]">Exempel</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f0f0]">
              <TypoRow token="H1" size={24} line={32} weight={700} usage="Sidtitel" example="Dealer Workspace" />
              <TypoRow token="H2" size={18} line={26} weight={600} usage="Sektionsrubrik" example="Kräver uppmärksamhet idag" />
              <TypoRow token="H3" size={16} line={22} weight={600} usage="Kortrubrik, modal-titel" example="Automower 435X AWD" />
              <TypoRow token="H4" size={14} line={20} weight={600} usage="Underrubrik, gruppnamn" example="Produktkatalog" />
              <TypoRow token="H5" size={13} line={18} weight={600} usage="Kortbeskrivning, tab-etikett" example="Avtal & program" />
              <TypoRow token="H6" size={12} line={16} weight={600} usage="Meta-etikett, footer-rubrik" example="Senaste aktivitet" />
              <TypoRow token="Body" size={14} line={20} weight={400} usage="Standardtext" example="Registrera sålddatum för produkt" />
              <TypoRow token="Body sm" size={13} line={18} weight={400} usage="Hjälptext, tabell-celler" example="Levererad men ej registrerad" />
              <TypoRow token="Label" size={11} line={14} weight={600} usage="KPI-rubrik, kolumnhuvud (VERSALER)" example="BESTÄLLNINGAR" />
              <TypoRow token="Helper" size={11} line={14} weight={400} usage="Hjälptext under labels" example="3 nya sedan igår" />
              <TypoRow token="Badge" size={10} line={12} weight={700} usage="Status/priority-badges" example="HÖG" />
              <TypoRow token="Table head" size={11} line={14} weight={600} usage="Tabellhuvud (VERSALER)" example="SERIE / PNC" />
              <TypoRow token="Table cell" size={12} line={16} weight={400} usage="Tabellcell" example="2024-435X-00891" />
            </tbody>
          </table>
        </div>

        <div className="mt-4 rounded-xl border border-[#d0d0d0] bg-white p-5">
          <h4 className="text-[13px] font-semibold text-[#111]">Riktlinjer för datatäta tabeller</h4>
          <ul className="mt-2 space-y-1 text-[12px] text-[#555]">
            <li>• Kolumnhuvud alltid VERSALER, 11px, weight 600, tracking 1.0px — ger visuell separation</li>
            <li>• Celler 12px — tillräckligt läsbart utan att ta onödig plats</li>
            <li>• Primärt fält (modell/ID) 13px semibold i primary-färg — klickbar</li>
            <li>• Maximal tabellbredd = 100% av container, horizontal scroll vid overflow</li>
            <li>• Sticky header vid scroll (position: sticky, z-index: 40)</li>
          </ul>
        </div>
      </section>

      {/* ── A3. SPACING & GRID ── */}
      <section>
        <SectionHeading title="A3. Spacing & Grid" desc="4/8-pt skala, 12-kolumns grid" />

        <div className="mt-4 flex flex-wrap gap-2">
          {tokens.spacing.scale.map((v) => (
            <div key={v} className="flex flex-col items-center gap-1 rounded-lg border border-[#e5e5e5] bg-white p-3">
              <div className="bg-[#273A60] rounded-sm" style={{ width: v || 2, height: 24, minWidth: 2 }} />
              <span className="text-[10px] font-mono font-bold text-[#333]">{v}px</span>
            </div>
          ))}
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-[#d0d0d0] bg-white p-5">
            <h4 className="text-[13px] font-semibold text-[#111]">Semantiska spacing-tokens</h4>
            <ul className="mt-2 space-y-1 text-[12px] text-[#555]">
              <li>• <code className="text-[11px] bg-[#f0f3f8] px-1 py-0.5 rounded">sectionGap: 48px</code> — mellan sektioner</li>
              <li>• <code className="text-[11px] bg-[#f0f3f8] px-1 py-0.5 rounded">cardPadding: 20px</code> — inne i kort</li>
              <li>• <code className="text-[11px] bg-[#f0f3f8] px-1 py-0.5 rounded">cardGap: 12px</code> — mellan kort i grid</li>
              <li>• <code className="text-[11px] bg-[#f0f3f8] px-1 py-0.5 rounded">inputHeight: 36px</code> — standard input</li>
              <li>• <code className="text-[11px] bg-[#f0f3f8] px-1 py-0.5 rounded">inputHeightLg: 44px</code> — stor sökinput</li>
            </ul>
          </div>
          <div className="rounded-xl border border-[#d0d0d0] bg-white p-5">
            <h4 className="text-[13px] font-semibold text-[#111]">Breakpoints</h4>
            <ul className="mt-2 space-y-1 text-[12px] text-[#555]">
              <li>• <strong>sm</strong> 640px — mobil landscape</li>
              <li>• <strong>md</strong> 768px — tablet (hamburger → desktop nav)</li>
              <li>• <strong>lg</strong> 1024px — desktop (full grid)</li>
              <li>• <strong>xl</strong> 1280px — wide desktop</li>
              <li>• <strong>2xl</strong> 1440px — ultrawide, maxWidth cap</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── A4. ICONOGRAPHY ── */}
      <section>
        <SectionHeading title="A4. Ikonografi" desc="Stroke-baserade SVG-ikoner, 4 storlekar" />

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {[
            { name: "Dashboard", path: "M2 2h7v7H2zM11 2h7v4H11zM2 11h7v4H2zM11 8h7v7H11z" },
            { name: "Kunder", path: "M10 7a3 3 0 100-6 3 3 0 000 6zM4 17c0-3.3 2.7-6 6-6s6 2.7 6 6" },
            { name: "Produkter", path: "M3 3h14v14H3zM3 8h14M8 3v14" },
            { name: "Avtal", path: "M5 2h10a2 2 0 012 2v14l-3-2-3 2-3-2-3 2V4a2 2 0 012-2zM8 7h4M8 10h4" },
            { name: "Sellout", path: "M10 10a7 7 0 100-14 7 7 0 000 14zM7 10l2.5 2.5L13 7" },
            { name: "Installation", path: "M10 2l6 3v5c0 3.5-2.5 6.5-6 8-3.5-1.5-6-4.5-6-8V5l6-3z" },
            { name: "Garanti", path: "M10 2l6 3v5c0 3.5-2.5 6.5-6 8-3.5-1.5-6-4.5-6-8V5l6-3zM7.5 10l2.5 2 3-4" },
            { name: "HyperCare", path: "M3 10h2l2-4 3 8 2-4h5" },
            { name: "Aviseringar", path: "M7 14a2 2 0 004 0M13.73 11c.17-.26.27-.55.27-.86V7a5 5 0 00-10 0v3.14c0 .31.1.6.27.86L5 12h8z" },
            { name: "Sök", path: "M7 7a4.5 4.5 0 100-9 4.5 4.5 0 000 9zM10.5 10.5L14 14" },
            { name: "Ladda ner", path: "M10 3v10M6 9l4 4 4-4M4 15h12" },
            { name: "Filter", path: "M3 4h14M5 9h10M7 14h6" },
          ].map((icon) => (
            <div key={icon.name} className="flex flex-col items-center gap-2 rounded-xl border border-[#e5e5e5] bg-white p-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f0f3f8] text-[#273A60]">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d={icon.path} />
                </svg>
              </span>
              <span className="text-[11px] font-semibold text-[#333]">{icon.name}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-xl border border-[#d0d0d0] bg-white p-5">
          <h4 className="text-[13px] font-semibold text-[#111]">Ikonstorlekar & klickyta</h4>
          <div className="mt-3 flex flex-wrap gap-6">
            {(Object.entries(iconSizes) as [string, { size: number; clickArea: number }][]).map(([name, val]) => (
              <div key={name} className="flex items-center gap-3">
                <div className="relative flex items-center justify-center rounded border border-dashed border-[#bbb]" style={{ width: val.clickArea, height: val.clickArea }}>
                  <svg width={val.size} height={val.size} viewBox="0 0 20 20" fill="none" stroke="#273A60" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M10 4v12M4 10h12" />
                  </svg>
                </div>
                <div>
                  <span className="text-[12px] font-semibold text-[#333]">{name}</span>
                  <span className="block text-[10px] text-[#888]">{val.size}px ikon / {val.clickArea}px klickyta</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   B) COMPONENTS
   ═══════════════════════════════════════════════════════ */

function ComponentsSection() {
  return (
    <div className="space-y-12">
      {/* ── B1. PAGE HEADER ── */}
      <section>
        <SectionHeading title="B1. Page Header" desc="Titel, undertitel, breadcrumbs, actions" />
        <ComponentSpec
          name="PageHeader"
          props={[
            { name: "title", type: "string", required: true, desc: "Sidtitel, H1" },
            { name: "subtitle", type: "string", desc: "Underrubrik, body-sm text-neutral-600" },
            { name: "breadcrumbs", type: "Breadcrumb[]", desc: "Array av {label, href}" },
            { name: "primaryAction", type: "Action", desc: "{label, onClick, icon?}" },
            { name: "secondaryActions", type: "Action[]", desc: "Sekundära knappar" },
            { name: "meta", type: "string", desc: "T.ex. 'Senast uppdaterad: idag 09:15'" },
          ]}
          states={["default", "withActions", "withBreadcrumbs"]}
        />
        {/* Live example */}
        <div className="mt-4 rounded-xl border border-[#d0d0d0] bg-white p-5">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-[#999]">Live-exempel</p>
          <a href="#" className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#888] hover:text-[#273A60]">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M10 12L6 8l4-4" /></svg>
            Startsidan
          </a>
          <div className="mt-3 flex items-end justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#111]">Dealer Workspace</h1>
              <p className="mt-1 text-[13px] text-[#888]">Unified arbetsyta — produkter, kunder, avtal</p>
            </div>
            <div className="flex gap-2">
              <button className="rounded-lg border border-[#d0d0d0] bg-white px-3 py-2 text-[12px] font-semibold text-[#555]">Exportera</button>
              <button className="rounded-lg bg-[#273A60] px-4 py-2 text-[12px] font-semibold text-white">+ Ny åtgärd</button>
            </div>
          </div>
        </div>
      </section>

      {/* ── B2. NAV TABS ── */}
      <section>
        <SectionHeading title="B2. Nav Tabs / Domain Switch" desc="Flikar med badge, keyboard-stöd" />
        <ComponentSpec
          name="NavTabs"
          props={[
            { name: "tabs", type: "Tab[]", required: true, desc: "{id, label, badge?, icon?}" },
            { name: "activeTab", type: "string", required: true, desc: "Aktiv tab-id" },
            { name: "onTabChange", type: "(id: string) => void", required: true, desc: "Callback" },
            { name: "variant", type: "'underline' | 'pill' | 'segmented'", desc: "Visuell variant" },
          ]}
          states={["default", "hover", "active", "focus-visible", "disabled"]}
        />
        <div className="mt-4 rounded-xl border border-[#d0d0d0] bg-white p-5">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-[#999]">Varianter</p>
          {/* Underline */}
          <p className="text-[11px] font-semibold text-[#555]">Underline (standard i Workspace)</p>
          <div className="mt-2 border-b border-[#d0d0d0]">
            <div className="-mb-px flex gap-0">
              <span className="border-b-2 border-[#273A60] px-5 py-3 text-[13px] font-semibold text-[#273A60]">Dashboard</span>
              <span className="border-b-2 border-transparent px-5 py-3 text-[13px] font-semibold text-[#888]">Produkter <span className="ml-1 rounded-full bg-[#e5e5e5] px-1.5 py-0.5 text-[10px] font-bold text-[#888]">87</span></span>
              <span className="border-b-2 border-transparent px-5 py-3 text-[13px] font-semibold text-[#888]">Kunder</span>
            </div>
          </div>
          {/* Segmented */}
          <p className="mt-5 text-[11px] font-semibold text-[#555]">Segmented (mobil drawer)</p>
          <div className="mt-2 flex rounded-lg bg-[#f3f3f3] p-1 max-w-xs">
            <span className="flex-1 rounded-md bg-white px-3 py-2 text-center text-[12px] font-semibold text-[#111] shadow-sm">Husqvarna</span>
            <span className="flex-1 rounded-md px-3 py-2 text-center text-[12px] font-semibold text-[#888]">Min verksamhet</span>
          </div>

          <div className="mt-4 rounded-lg border border-[#e5e5e5] bg-[#f8f9fb] p-4">
            <h4 className="text-[12px] font-semibold text-[#111]">Keyboard navigation</h4>
            <ul className="mt-1 space-y-0.5 text-[11px] text-[#555]">
              <li>• <kbd className="rounded border border-[#d0d0d0] bg-white px-1 py-0.5 text-[10px]">←</kbd> <kbd className="rounded border border-[#d0d0d0] bg-white px-1 py-0.5 text-[10px]">→</kbd> Byt flik</li>
              <li>• <kbd className="rounded border border-[#d0d0d0] bg-white px-1 py-0.5 text-[10px]">Home</kbd> Första fliken</li>
              <li>• <kbd className="rounded border border-[#d0d0d0] bg-white px-1 py-0.5 text-[10px]">End</kbd> Sista fliken</li>
              <li>• <code className="text-[10px]">role=&quot;tablist&quot;</code>, <code className="text-[10px]">aria-selected</code>, <code className="text-[10px]">tabindex=&quot;-1&quot;</code> på inaktiva</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── B3. CARDS ── */}
      <section>
        <SectionHeading title="B3. Cards" desc="KPI, Action, Entry, Status" />

        {/* KPI Card */}
        <h4 className="mt-4 text-[13px] font-semibold text-[#111]">KPI Card</h4>
        <ComponentSpec
          name="KpiCard"
          props={[
            { name: "label", type: "string", required: true, desc: "VERSALER-label (11px)" },
            { name: "value", type: "string | number", required: true, desc: "Huvudvärde (2xl bold)" },
            { name: "helper", type: "string", desc: "Hjälptext under värde" },
            { name: "delta", type: "{value: string, trend: 'up'|'down'|'flat'}", desc: "Förändring" },
            { name: "accentColor", type: "string", desc: "Border-left accent (danger/warning/success)" },
            { name: "href", type: "string", desc: "Klick navigerar hit" },
            { name: "icon", type: "ReactNode", desc: "Valfri ikon" },
          ]}
          states={["default", "hover (shadow-cardHover)", "accent (border-left 3px)", "loading (skeleton)"]}
        />
        <div className="mt-3 flex flex-wrap gap-3">
          <a href="#" className="group rounded-xl border border-[#d0d0d0] bg-white p-4 transition-all hover:shadow-md w-40">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#999]">Produkter</p>
            <p className="mt-1 text-2xl font-extrabold text-[#111]">87</p>
            <p className="mt-1 text-[11px] text-[#aaa]">42 med avtal</p>
          </a>
          <a href="#" className="group rounded-xl border border-[#d0d0d0] border-l-[3px] border-l-[#c44] bg-white p-4 transition-all hover:shadow-md w-40">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#999]">HyperCare</p>
            <p className="mt-1 text-2xl font-extrabold text-[#111]">8</p>
            <p className="mt-1 text-[11px] text-[#aaa]">3 kräver åtgärd</p>
          </a>
          <a href="#" className="group rounded-xl border border-[#d0d0d0] border-l-[3px] border-l-[#b8860b] bg-white p-4 transition-all hover:shadow-md w-40">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#999]">Förnyelser</p>
            <p className="mt-1 text-2xl font-extrabold text-[#111]">5</p>
            <p className="mt-1 text-[11px] text-[#aaa]">Inom 30 dagar</p>
          </a>
        </div>

        {/* Action Card */}
        <h4 className="mt-6 text-[13px] font-semibold text-[#111]">Action Card</h4>
        <ComponentSpec
          name="ActionCard"
          props={[
            { name: "title", type: "string", required: true, desc: "Rubrik" },
            { name: "description", type: "string", desc: "Beskrivning" },
            { name: "cta", type: "string", required: true, desc: "CTA-text" },
            { name: "href", type: "string", required: true, desc: "Länk" },
            { name: "icon", type: "ReactNode", desc: "Vänster-ikon" },
          ]}
          states={["default", "hover"]}
        />

        {/* Entry Card */}
        <h4 className="mt-6 text-[13px] font-semibold text-[#111]">Entry Card (prominent)</h4>
        <ComponentSpec
          name="EntryCard"
          props={[
            { name: "title", type: "string", required: true, desc: "Rubrik" },
            { name: "subtitle", type: "string", desc: "Beskrivning" },
            { name: "cta", type: "string", required: true, desc: "CTA-knapptext" },
            { name: "href", type: "string", required: true, desc: "Länk" },
            { name: "badge", type: "'NY' | 'BETA'", desc: "Badge" },
            { name: "icon", type: "ReactNode", desc: "Ikon i cirkel" },
          ]}
          states={["default", "hover (shadow-lg, border-accent)"]}
        />
        <div className="mt-3">
          <div className="flex items-center justify-between rounded-2xl border border-[#273A60]/20 bg-gradient-to-r from-[#f5f7fb] to-white px-6 py-5">
            <div className="flex items-center gap-4">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#273A60] text-white shadow-sm">
                <svg width="24" height="24" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="7" height="7" rx="1.5" /><rect x="11" y="2" width="7" height="4" rx="1.5" /><rect x="2" y="11" width="7" height="4" rx="1.5" /><rect x="11" y="8" width="7" height="7" rx="1.5" />
                </svg>
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[16px] font-bold text-[#111]">Dealer Dashboard</span>
                  <span className="rounded bg-[#ff6b00] px-1.5 py-0.5 text-[10px] font-bold uppercase leading-none text-white">NY</span>
                </div>
                <span className="mt-0.5 block text-[13px] text-[#888]">Samlad översikt — kunder, produkter, avtal</span>
              </div>
            </div>
            <span className="rounded-lg border border-[#d0d0d0] bg-white px-5 py-2.5 text-[13px] font-semibold text-[#273A60] shadow-sm">
              Öppna Dashboard →
            </span>
          </div>
        </div>
      </section>

      {/* ── B4. TABLES ── */}
      <section>
        <SectionHeading title="B4. Tables" desc="Kolumn-API, sortering, filtrering, bulk actions" />
        <ComponentSpec
          name="DataTable"
          props={[
            { name: "columns", type: "Column[]", required: true, desc: "{key, label, sortable?, width?, align?}" },
            { name: "rows", type: "T[]", required: true, desc: "Data-array" },
            { name: "onSort", type: "(key, dir) => void", desc: "Sorteringshandler" },
            { name: "selectable", type: "boolean", desc: "Checkbox-kolumn" },
            { name: "onSelectionChange", type: "(ids: string[]) => void", desc: "Bulk-val callback" },
            { name: "bulkActions", type: "Action[]", desc: "Knappar vid markering" },
            { name: "stickyHeader", type: "boolean", desc: "Sticky thead, default true" },
            { name: "emptyState", type: "ReactNode", desc: "Visas om rows.length === 0" },
            { name: "loading", type: "boolean", desc: "Skeleton-rader" },
            { name: "pagination", type: "{page, pageSize, total}", desc: "Paginering" },
          ]}
          states={["default", "loading (skeleton rows)", "empty", "sorted (▲/▼ ikon)", "row-hover", "row-selected", "bulk-active"]}
        />

        <div className="mt-4 rounded-xl border border-[#d0d0d0] bg-white p-5">
          <h4 className="text-[12px] font-semibold text-[#111]">Row status-färg</h4>
          <div className="mt-2 flex flex-wrap gap-2">
            {(Object.entries(statusTokens) as [string, { bg: string; text: string; label: string }][]).map(([key, val]) => (
              <span key={key} className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold" style={{ backgroundColor: val.bg, color: val.text }}>
                {val.label}
              </span>
            ))}
          </div>

          <h4 className="mt-4 text-[12px] font-semibold text-[#111]">Responsive collapse (mobil)</h4>
          <ul className="mt-1 space-y-0.5 text-[11px] text-[#555]">
            <li>• Under <code className="text-[10px]">md</code>: kolumner 4+ döljs, raden blir expanderbar (accordion)</li>
            <li>• Primärt fält + status alltid synliga</li>
            <li>• Bulk actions → sticky bottom bar med &quot;{"{n}"} markerade&quot;</li>
          </ul>
        </div>
      </section>

      {/* ── B5. FILTERS ── */}
      <section>
        <SectionHeading title="B5. Filters & Facets" desc="Program, status, multi-select, reset" />
        <ComponentSpec
          name="FilterBar"
          props={[
            { name: "filters", type: "Filter[]", required: true, desc: "{id, label, count?, options?}" },
            { name: "applied", type: "Record<string, string[]>", required: true, desc: "Aktiva filter" },
            { name: "onApply", type: "(filters) => void", required: true, desc: "Callback vid ändring" },
            { name: "onReset", type: "() => void", desc: "Rensa alla filter" },
            { name: "variant", type: "'pills' | 'dropdown' | 'sidebar'", desc: "Visuell variant" },
          ]}
          states={["default", "applied (pill med ×)", "open dropdown", "multi-selected"]}
        />
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="rounded-full bg-[#273A60] px-3 py-1.5 text-[12px] font-semibold text-white">Alla <span className="ml-1 text-white/70">87</span></span>
          <span className="rounded-full border border-[#d0d0d0] bg-white px-3 py-1.5 text-[12px] font-semibold text-[#555]">HyperCare <span className="ml-1 text-[#aaa]">8</span></span>
          <span className="rounded-full border border-[#d0d0d0] bg-white px-3 py-1.5 text-[12px] font-semibold text-[#555]">Service Plus <span className="ml-1 text-[#aaa]">23</span></span>
          <span className="rounded-full border border-[#d0d0d0] bg-white px-3 py-1.5 text-[12px] font-semibold text-[#555]">Saknar data <span className="ml-1 text-[#aaa]">5</span></span>
          <span className="text-[12px] font-medium text-[#888] self-center cursor-pointer hover:text-[#555]">Rensa filter ×</span>
        </div>
      </section>

      {/* ── B6. SEARCH ── */}
      <section>
        <SectionHeading title="B6. Search" desc="Global, identifiering, inre sök" />
        <ComponentSpec
          name="SearchInput"
          props={[
            { name: "placeholder", type: "string", desc: "Placeholder-text" },
            { name: "scope", type: "'global' | 'products' | 'customers' | 'documents'", desc: "Sökscope" },
            { name: "method", type: "'text' | 'pnc' | 'serial' | 'qr' | 'ean'", desc: "Identifieringsmetod" },
            { name: "onSearch", type: "(query: string) => void", required: true, desc: "Sök-callback" },
            { name: "onClear", type: "() => void", desc: "Rensa input" },
            { name: "recentSearches", type: "string[]", desc: "Senaste sökningar" },
            { name: "size", type: "'sm' | 'md' | 'lg'", desc: "36px / 36px / 44px höjd" },
          ]}
          states={["empty", "typing", "has-value (× clear)", "loading (spinner)", "results-dropdown"]}
        />
        <div className="mt-3 space-y-3">
          <div className="relative max-w-xl">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-[#888]" width="20" height="20" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="7" cy="7" r="4.5" /><path d="M10.5 10.5L14 14" /></svg>
            <input type="text" placeholder="Sök produkter, artiklar, sprängskisser..." className="h-11 w-full rounded-xl border border-[#d0d0d0] bg-[#f8f8f8] pl-11 pr-4 text-[15px] text-[#333] placeholder-[#aaa] focus:border-[#999] focus:bg-white focus:outline-none" readOnly />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-[#bbb]">Global</span>
          </div>
          <div className="relative max-w-sm">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#bbb]" width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="7" cy="7" r="4.5" /><path d="M10.5 10.5L14 14" /></svg>
            <input type="text" placeholder="Sök kund..." className="h-9 w-full rounded-lg border border-[#d0d0d0] bg-white pl-8 pr-3 text-[12px] text-[#333] placeholder-[#aaa] focus:border-[#999] focus:outline-none" readOnly />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-[#bbb]">Inre</span>
          </div>
        </div>
      </section>

      {/* ── B7. ALERTS & TO-DOS ── */}
      <section>
        <SectionHeading title="B7. Alerts & To-dos" desc="Prioritetslista med tags och CTA" />
        <ComponentSpec
          name="AlertList"
          props={[
            { name: "items", type: "AlertItem[]", required: true, desc: "{label, priority, tag, href, detail?}" },
            { name: "title", type: "string", desc: "Listrubrik" },
            { name: "showViewAll", type: "boolean", desc: "Visa 'Visa alla →'" },
            { name: "onViewAll", type: "() => void", desc: "Callback" },
            { name: "maxVisible", type: "number", desc: "Max synliga rader, default 6" },
          ]}
          states={["default", "empty ('Inga åtgärder just nu')", "overflow (+ N fler)"]}
        />
        <div className="mt-3 rounded-xl border border-[#d0d0d0] bg-white">
          <div className="flex items-center justify-between border-b border-[#f0f0f0] px-5 py-3">
            <h3 className="text-[13px] font-semibold text-[#111]">Kräver uppmärksamhet idag</h3>
            <a href="#" className="text-[12px] font-semibold text-[#273A60]">Visa alla →</a>
          </div>
          <ul className="divide-y divide-[#f0f0f0]">
            <li className="flex items-center gap-3 px-5 py-3">
              <span className="rounded bg-[#e3f2fd] px-2 py-0.5 text-[10px] font-bold text-[#1565c0]">Installation</span>
              <span className="flex-1 text-[13px] font-medium text-[#333]">Automower 435X → Kund Lindström</span>
              <span className="rounded-full bg-[#fce8e8] px-2 py-0.5 text-[10px] font-semibold text-[#c44]">Hög</span>
            </li>
            <li className="flex items-center gap-3 px-5 py-3">
              <span className="rounded bg-[#f3e5f5] px-2 py-0.5 text-[10px] font-bold text-[#7b1fa2]">Avtal</span>
              <span className="flex-1 text-[13px] font-medium text-[#333]">SP-2024-089 löper ut om 7 dagar</span>
              <span className="rounded-full bg-[#fff8e1] px-2 py-0.5 text-[10px] font-semibold text-[#b8860b]">Medel</span>
            </li>
          </ul>
        </div>
      </section>

      {/* ── B8. FORMS & WIZARDS ── */}
      <section>
        <SectionHeading title="B8. Forms & Wizards" desc="Sellout, install, warranty, contract" />

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {[
            { name: "SelloutForm", desc: "Registrera sålddatum", fields: ["Produkt (auto-complete)", "Kund (auto-complete)", "Sålddatum (datepicker)", "Kommentar (textarea, valfri)"], cta: "Registrera sellout" },
            { name: "InstallHandoverWizard", desc: "3-stegs wizard", fields: ["Steg 1: Välj produkt & kund", "Steg 2: Installationsdatum + checklista", "Steg 3: Överlämning & signatur"], cta: "Slutför installation" },
            { name: "WarrantyStartForm", desc: "Aktivera garantiperiod", fields: ["Produkt (förfyllt)", "Kund (förfyllt)", "Garantistart (datum)", "Kontaktuppgifter (validering)"], cta: "Aktivera garanti" },
            { name: "ContractRegistration", desc: "Nytt serviceavtal", fields: ["Välj kund → Välj produkt", "Programtyp (Service Plus / Lease Plus)", "Startdatum & period", "Bonusberättigad (toggle)"], cta: "Registrera avtal" },
          ].map((form) => (
            <div key={form.name} className="rounded-xl border border-[#d0d0d0] bg-white p-5">
              <h4 className="text-[13px] font-semibold text-[#111]">{form.name}</h4>
              <p className="mt-0.5 text-[12px] text-[#888]">{form.desc}</p>
              <ul className="mt-3 space-y-1">
                {form.fields.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-[12px] text-[#555]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#273A60]" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-3 border-t border-[#f0f0f0] pt-3">
                <span className="rounded-lg bg-[#273A60] px-4 py-2 text-[12px] font-semibold text-white">{form.cta}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── B9. EMPTY, LOADING, ERROR ── */}
      {/* Moved to States tab */}

      {/* ── B10. NOTIFICATIONS ── */}
      <section>
        <SectionHeading title="B10. Notifications" desc="In-app toast, e-post, SMS" />
        <ComponentSpec
          name="Toast"
          props={[
            { name: "type", type: "'success' | 'warning' | 'error' | 'info'", required: true, desc: "Semantisk typ" },
            { name: "title", type: "string", required: true, desc: "Rubrik" },
            { name: "description", type: "string", desc: "Detaljtext" },
            { name: "action", type: "{label, onClick}", desc: "Valfri åtgärdsknapp" },
            { name: "duration", type: "number", desc: "Auto-dismiss i ms, default 5000" },
            { name: "dismissible", type: "boolean", desc: "Visa ×, default true" },
          ]}
          states={["enter (slide-in)", "visible", "exit (fade-out)", "action-click"]}
        />
        <div className="mt-3 space-y-2 max-w-md">
          {[
            { type: "success", bg: "#e8f5e9", border: "#2a9d5c", title: "Sellout registrerat", desc: "CEORA 546 EPOS → AB Grönytor" },
            { type: "warning", bg: "#fff8e1", border: "#b8860b", title: "Avtal löper ut", desc: "SP-2024-089 — 7 dagar kvar" },
            { type: "error", bg: "#fce8e8", border: "#c44", title: "Kunde inte spara", desc: "Kontrollera fälten och försök igen" },
          ].map((t) => (
            <div key={t.type} className="flex items-start gap-3 rounded-lg border-l-[3px] p-4" style={{ backgroundColor: t.bg, borderLeftColor: t.border }}>
              <div className="flex-1">
                <p className="text-[13px] font-semibold text-[#111]">{t.title}</p>
                <p className="text-[12px] text-[#555]">{t.desc}</p>
              </div>
              <button className="text-[#999] hover:text-[#555]">×</button>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-xl border border-[#d0d0d0] bg-white p-5">
          <h4 className="text-[12px] font-semibold text-[#111]">E-post / SMS-triggers</h4>
          <ul className="mt-2 space-y-1 text-[12px] text-[#555]">
            <li>• <strong>Avtal löper ut</strong> — e-post 30 dagar + 7 dagar före</li>
            <li>• <strong>HyperCare-steg krävs</strong> — e-post + in-app direkt</li>
            <li>• <strong>Sellout saknas &gt;14 dagar</strong> — e-post påminnelse</li>
            <li>• <strong>Installation slutförd</strong> — SMS till kund med bekräftelse</li>
            <li>• <strong>CX Bonus utbetald</strong> — e-post med kvitto</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   C) STATES
   ═══════════════════════════════════════════════════════ */

function StatesSection() {
  return (
    <div className="space-y-10">
      {/* Empty */}
      <section>
        <SectionHeading title="Empty state" desc="Visas när data saknas — alltid med hjälptips" />
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <EmptyStateCard
            title="Inga produkter"
            desc="Du har inte registrerat några produkter ännu."
            tip="Börja med att identifiera en produkt via PNC eller serienummer."
            cta="Identifiera produkt"
          />
          <EmptyStateCard
            title="Inga avtal"
            desc="Inga serviceavtal registrerade."
            tip="Registrera ett Service Plus-avtal för att aktivera bonusprogram."
            cta="Nytt avtal"
          />
          <EmptyStateCard
            title="Inga uppgifter"
            desc="Inget kräver din uppmärksamhet just nu."
            tip="Bra jobbat! Kolla tillbaka senare."
            cta={undefined}
          />
        </div>
      </section>

      {/* Loading */}
      <section>
        <SectionHeading title="Loading / Skeleton" desc="Pulse-animation på kort och tabellrader" />
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {/* Skeleton KPI */}
          <div className="rounded-xl border border-[#d0d0d0] bg-white p-5">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-[#999]">KPI-kort (skeleton)</p>
            <div className="flex gap-3">
              {[1,2,3].map((i) => (
                <div key={i} className="flex-1 rounded-xl border border-[#e5e5e5] p-4 animate-pulse">
                  <div className="h-3 w-16 rounded bg-[#e5e5e5]" />
                  <div className="mt-3 h-6 w-10 rounded bg-[#e5e5e5]" />
                  <div className="mt-2 h-2.5 w-20 rounded bg-[#f0f0f0]" />
                </div>
              ))}
            </div>
          </div>

          {/* Skeleton table */}
          <div className="rounded-xl border border-[#d0d0d0] bg-white p-5">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-[#999]">Tabellrader (skeleton)</p>
            <div className="space-y-2">
              {[1,2,3,4].map((i) => (
                <div key={i} className="flex gap-4 animate-pulse">
                  <div className="h-4 w-4 rounded bg-[#e5e5e5]" />
                  <div className="h-4 w-28 rounded bg-[#e5e5e5]" />
                  <div className="h-4 w-20 rounded bg-[#f0f0f0]" />
                  <div className="h-4 w-16 rounded bg-[#f0f0f0]" />
                  <div className="h-4 w-12 rounded bg-[#e5e5e5]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Error */}
      <section>
        <SectionHeading title="Error state" desc="Inline-fel med retry-knapp" />
        <div className="mt-4 max-w-lg space-y-3">
          {/* Inline error */}
          <div className="flex items-center gap-3 rounded-xl border border-[#e57373] bg-[#fce8e8] p-4">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#c44" strokeWidth="1.6" strokeLinecap="round"><circle cx="10" cy="10" r="7" /><path d="M10 7v3M10 13h.01" /></svg>
            <div className="flex-1">
              <p className="text-[13px] font-semibold text-[#c44]">Kunde inte ladda produkter</p>
              <p className="text-[12px] text-[#555]">Kontrollera din anslutning och försök igen.</p>
            </div>
            <button className="rounded-lg border border-[#c44] px-3 py-1.5 text-[12px] font-semibold text-[#c44] transition-colors hover:bg-[#c44] hover:text-white">
              Försök igen
            </button>
          </div>

          {/* Field error */}
          <div>
            <label className="text-[12px] font-semibold text-[#333]">Sålddatum</label>
            <input type="text" value="2025-13-45" readOnly className="mt-1 h-9 w-full rounded-lg border-2 border-[#c44] bg-white px-3 text-[13px] text-[#333]" />
            <p className="mt-1 text-[11px] text-[#c44]">Ogiltigt datum — ange i formatet ÅÅÅÅ-MM-DD</p>
          </div>
        </div>
      </section>

      {/* Success */}
      <section>
        <SectionHeading title="Success state" desc="Bekräftelse efter lyckad åtgärd" />
        <div className="mt-4 max-w-lg">
          <div className="flex items-center gap-3 rounded-xl border border-[#2a9d5c] bg-[#e8f5e9] p-4">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#2a9d5c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="10" cy="10" r="7" /><polyline points="7.5 10 9.5 12.5 13 8" /></svg>
            <div className="flex-1">
              <p className="text-[13px] font-semibold text-[#2e7d32]">Sellout registrerat</p>
              <p className="text-[12px] text-[#555]">CEORA 546 EPOS → AB Grönytor · Sålddatum: 2026-03-13</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   D) EVENTS
   ═══════════════════════════════════════════════════════ */

function EventsSection() {
  const events = Object.entries(eventSchema);

  return (
    <div className="space-y-6">
      <SectionHeading title="Event-instrumentering" desc="Alla spårbara händelser med payloads" />

      {events.map(([key, spec]) => (
        <div key={key} className="rounded-xl border border-[#d0d0d0] bg-white">
          <div className="flex items-center gap-3 border-b border-[#f0f0f0] px-5 py-3.5">
            <code className="rounded bg-[#f0f3f8] px-2 py-0.5 text-[12px] font-mono font-semibold text-[#273A60]">{key}</code>
            <span className="text-[12px] text-[#888]">{spec.description}</span>
          </div>
          <div className="grid gap-4 p-5 sm:grid-cols-2">
            {/* Payload schema */}
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#999]">Payload</p>
              <ul className="mt-2 space-y-1">
                {Object.entries(spec.payload).map(([field, type]) => (
                  <li key={field} className="flex items-center gap-2 text-[12px]">
                    <code className="text-[11px] font-mono text-[#273A60]">{field}</code>
                    <span className="text-[#aaa]">:</span>
                    <code className="text-[11px] font-mono text-[#888]">{type as string}</code>
                  </li>
                ))}
              </ul>
            </div>
            {/* Example */}
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#999]">Exempel</p>
              <pre className="mt-2 overflow-x-auto rounded-lg bg-[#f8f9fb] p-3 text-[11px] font-mono text-[#555] leading-relaxed">
                {JSON.stringify(spec.example, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   SHARED SUBCOMPONENTS
   ═══════════════════════════════════════════════════════ */

function SectionHeading({ title, desc }: { title: string; desc: string }) {
  return (
    <div>
      <h3 className="text-base font-semibold text-[#111]">{title}</h3>
      <p className="mt-0.5 text-[12px] text-[#888]">{desc}</p>
    </div>
  );
}

function ColorSwatch({ name, hex }: { name: string; hex: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="h-12 w-16 rounded-lg border border-[#e5e5e5] shadow-sm" style={{ backgroundColor: hex }} />
      <span className="text-[10px] font-semibold text-[#555]">{name}</span>
      <span className="text-[9px] font-mono text-[#aaa]">{hex}</span>
    </div>
  );
}

function SemanticPair({ label, bg, fg, hex100, hex }: { label: string; bg: string; fg: string; hex100: string; hex: string }) {
  return (
    <div className="flex flex-col gap-1.5 rounded-xl border border-[#e5e5e5] p-3">
      <span className="text-[11px] font-semibold text-[#555]">{label}</span>
      <div className="flex gap-2">
        <div className="h-8 flex-1 rounded border border-[#e5e5e5]" style={{ backgroundColor: bg }} />
        <div className="h-8 flex-1 rounded border border-[#e5e5e5]" style={{ backgroundColor: fg }} />
      </div>
      <div className="flex justify-between text-[9px] font-mono text-[#aaa]">
        <span>{hex100}</span>
        <span>{hex}</span>
      </div>
    </div>
  );
}

type PropDef = { name: string; type: string; required?: boolean; desc: string };

function ComponentSpec({ name, props, states }: { name: string; props: PropDef[]; states: string[] }) {
  return (
    <div className="mt-3 rounded-xl border border-[#d0d0d0] bg-white overflow-hidden">
      {/* Props */}
      <div className="border-b border-[#f0f0f0] px-5 py-3">
        <code className="text-[13px] font-mono font-semibold text-[#273A60]">&lt;{name} /&gt;</code>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[#f0f0f0] bg-[#fafafa]">
              <th className="px-5 py-2 text-[10px] font-semibold uppercase tracking-wider text-[#999]">Prop</th>
              <th className="px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-[#999]">Typ</th>
              <th className="px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-[#999]">Krävs</th>
              <th className="px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-[#999]">Beskrivning</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f0f0f0]">
            {props.map((p) => (
              <tr key={p.name}>
                <td className="px-5 py-2"><code className="text-[11px] font-mono text-[#273A60]">{p.name}</code></td>
                <td className="px-3 py-2"><code className="text-[11px] font-mono text-[#888]">{p.type}</code></td>
                <td className="px-3 py-2 text-[11px]">{p.required ? <span className="text-[#c44]">✓</span> : "—"}</td>
                <td className="px-3 py-2 text-[11px] text-[#555]">{p.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* States */}
      <div className="border-t border-[#f0f0f0] px-5 py-2.5 bg-[#f8f9fb]">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#999]">States: </span>
        {states.map((s, i) => (
          <Fragment key={s}>
            <code className="text-[10px] font-mono text-[#555]">{s}</code>
            {i < states.length - 1 && <span className="text-[#ccc]"> · </span>}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

function EmptyStateCard({ title, desc, tip, cta }: { title: string; desc: string; tip: string; cta: string | undefined }) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-dashed border-[#d0d0d0] bg-white p-6 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f0f3f8] text-[#273A60]">
        <svg width="24" height="24" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
          <circle cx="10" cy="10" r="7" /><path d="M10 7v3M10 13h.01" />
        </svg>
      </div>
      <h4 className="mt-3 text-[14px] font-semibold text-[#111]">{title}</h4>
      <p className="mt-1 text-[12px] text-[#888]">{desc}</p>
      <p className="mt-2 text-[11px] text-[#aaa]">{tip}</p>
      {cta && (
        <button className="mt-4 rounded-lg bg-[#273A60] px-4 py-2 text-[12px] font-semibold text-white">
          {cta}
        </button>
      )}
    </div>
  );
}

function TypoRow({ token, size, line, weight, usage, example }: { token: string; size: number; line: number; weight: number; usage: string; example: string }) {
  return (
    <tr className="hover:bg-[#fafafa]">
      <td className="px-5 py-2">
        <code className="text-[11px] font-mono font-semibold text-[#273A60]">{token}</code>
      </td>
      <td className="px-3 py-2 text-[12px] text-[#555]">{size}px</td>
      <td className="px-3 py-2 text-[12px] text-[#555]">{line}px</td>
      <td className="px-3 py-2 text-[12px] text-[#555]">{weight}</td>
      <td className="px-3 py-2 text-[12px] text-[#888]">{usage}</td>
      <td className="px-3 py-2">
        <span style={{ fontSize: Math.min(size, 16), fontWeight: weight, lineHeight: `${Math.min(line, 22)}px` }} className="text-[#111]">
          {example}
        </span>
      </td>
    </tr>
  );
}
