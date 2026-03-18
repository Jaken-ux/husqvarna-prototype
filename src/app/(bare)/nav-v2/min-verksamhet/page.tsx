"use client";

import Link from "next/link";
import NavHeader from "../NavHeader";
import Breadcrumb from "../Breadcrumb";

/* ═══════════════════════════════════════════════════════
   MIN VERKSAMHET — LANDING PAGE
   ─────────────────────────────────────────────────────
   Organisationens hemmaplan. Alla verktyg samlat.
   Dealer Workspace = prioriterad CTA som leder till
   den moderna operativa arbetsytan (separat vy).

   Sidans roll:
   • Organisatorisk översikt + verktyg
   • Ekonomi, beställningar, fakturor, leveranser
   • Försäljning, offerter, kampanjer
   • Snabbvägar till produkt- och kundåtgärder
   • Administration och inställningar
   ═══════════════════════════════════════════════════════ */

/* ── B) Ekonomi & Beställningar ── */
const orderIndicators = [
  { label: "Varukorg", count: 3, color: "text-[#e65100]", bg: "bg-[#fff3e0]", dot: "bg-[#e65100]", alert: true },
  { label: "Aktiva", count: 3, color: "text-[#1565c0]", bg: "bg-[#e3f2fd]", dot: "bg-[#1565c0]", alert: false },
  { label: "Levererade", count: 2, color: "text-[#2e7d32]", bg: "bg-[#e8f5e9]", dot: "bg-[#2e7d32]", alert: false },
  { label: "Returer", count: 1, color: "text-[#c62828]", bg: "bg-[#fce8e8]", dot: "bg-[#c62828]", alert: true },
];

const ekonomiItems = [
  {
    title: "Fakturor",
    desc: "Fakturaöversikt och betalningsstatus",
    href: "#invoices",
    badge: "8",
    icon: "M5 2h10a2 2 0 012 2v14l-3-2-3 2-3-2-3 2V4a2 2 0 012-2zM8 7h4M8 10h4M8 13h2",
  },
  {
    title: "Betalningar & saldo",
    desc: "Betalningshistorik och kontosaldo",
    href: "#payments",
    icon: "M2 5h16v11H2zM2 9h16",
  },
  {
    title: "Rapporter",
    desc: "Exportera rapporter och statistik",
    href: "#reports",
    icon: "M3 17l4-8 4 4 6-10",
  },
];

/* ── C) Försäljning ── */
const forsaljningItems = [
  {
    title: "Offerter",
    desc: "Skapa och hantera kundofferter",
    href: "/nav-v2/offerter",
    badge: "NY",
    badgeColor: "orange",
    icon: "M13 2H5a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6l-4-4zM8 10h4M8 13h2",
  },
  {
    title: "Wishlist",
    desc: "Sparade produkter och kundintressen",
    href: "/nav-v2/min-verksamhet/wishlist",
    badge: "NY",
    badgeColor: "orange",
    icon: "M10 17l-6.5-6a4 4 0 010-5.5 3.8 3.8 0 015.5 0L10 6.5l1-1a3.8 3.8 0 015.5 0 4 4 0 010 5.5L10 17z",
  },
  {
    title: "Kampanjer",
    desc: "Aktiva kampanjer och säljmaterial",
    href: "#campaigns",
    badge: "2",
    icon: "M5 9l3-6h4l3 6M3 9h14v3H3zM6 12v4M14 12v4M8 12v4M12 12v4",
  },
  {
    title: "Kundspecifika priser",
    desc: "Avtalade priser och rabatter per kund",
    href: "#customer-pricing",
    icon: "M10 10a7 7 0 100-14 7 7 0 000 14zM10 6v4M10 14h.01",
  },
];

/* ── D) Aktiviteter & Produkthantering ── */
const aktivitetItems = [
  {
    title: "Registrera produkt",
    desc: "Koppla ny produkt till kund",
    href: "#register-product",
    icon: "M3 3h14v14H3zM10 7v6M7 10h6",
  },
  {
    title: "Registrera sellout",
    desc: "Rapportera säljdatum — aktiverar garanti",
    href: "/nav-v2/task-flows#sellout",
    icon: "M10 10a7 7 0 100-14 7 7 0 000 14zM7 10l2.5 2.5L13 7",
  },
  {
    title: "Starta installation",
    desc: "Logga installationsdatum",
    href: "/nav-v2/task-flows#installation",
    icon: "M10 2l6 3v5c0 3.5-2.5 6.5-6 8-3.5-1.5-6-4.5-6-8V5l6-3z",
  },
  {
    title: "Överlämning",
    desc: "Registrera kundöverlämning",
    href: "/nav-v2/task-flows#handover",
    icon: "M4 10l4 4 8-8",
  },
  {
    title: "Aktivera garanti",
    desc: "Starta tillverkargaranti för kund",
    href: "/nav-v2/task-flows#warranty_start",
    icon: "M10 2l6 3v5c0 3.5-2.5 6.5-6 8-3.5-1.5-6-4.5-6-8V5l6-3zM7.5 10l2.5 2 3-4",
  },
  {
    title: "Serviceavtal",
    desc: "Registrera Service Plus-kontrakt",
    href: "/nav-v2/task-flows#service_contract",
    icon: "M5 2h10a2 2 0 012 2v14l-3-2-3 2-3-2-3 2V4a2 2 0 012-2zM8 7h4M8 10h4",
  },
  {
    title: "CEORA HyperCare",
    desc: "Hantera HyperCare-steg och claims",
    href: "/nav-v2/task-flows#hypercare",
    badge: "3",
    icon: "M3 10h2l2-4 3 8 2-4h5",
  },
  {
    title: "Exportera data",
    desc: "Exportera kund- och produktdata (CSV/PDF)",
    href: "#export",
    icon: "M10 3v10M6 9l4 4 4-4M4 15h12",
  },
];

/* ── E) Administration ── */
const adminItems = [
  { title: "Företagsprofil", desc: "Företagsinformation och adresser", href: "#company" },
  { title: "Prislistor", desc: "Ladda ner aktuella prislistor", href: "#pricelists" },
  { title: "Användaradministration", desc: "Hantera användare och roller", href: "#users" },
  { title: "Roller & behörigheter", desc: "Åtkomsträttigheter och rollhantering", href: "#permissions" },
  { title: "Integrationer", desc: "API-nycklar och systemkopplingar", href: "#integrations" },
  { title: "Aviseringsinställningar", desc: "Notifikationer och påminnelser", href: "#notification-settings" },
];

/* ── Workspace preview features ── */
const workspaceFeatures = [
  { label: "Produkter", value: "87", color: "#2a9d5c" },
  { label: "Kunder", value: "142", color: "#1565c0" },
  { label: "Avtal", value: "23", color: "#7b1fa2" },
  { label: "Uppgifter idag", value: "14", color: "#c44" },
];

const workspaceModules = [
  { label: "Dashboard", desc: "KPI:er, trender och nyckeltal" },
  { label: "Produktöversikt", desc: "Alla produkter med status och avtal" },
  { label: "Kundöversikt", desc: "Kunder, profiler och kommunikation" },
  { label: "Avtal & program", desc: "Service Plus, Lease Plus, HyperCare" },
  { label: "Idag-panel", desc: "Uppgifter som kräver åtgärd nu" },
];

/* ═══════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════ */

export default function MinVerksamhetPage() {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <NavHeader />

      <main className="mx-auto max-w-[1320px] px-6 py-6">
        {/* ── Breadcrumb ── */}
        <Breadcrumb items={[{ label: "Min verksamhet", href: "/nav-v2/min-verksamhet" }]} />

        {/* ── Page header ── */}
        <div className="mt-5">
          <h1 className="text-2xl font-bold text-[#111]">Min verksamhet</h1>
          <p className="mt-1 text-[13px] text-[#888]">
            Din organisations verktyg — ekonomi, försäljning, produkthantering och administration
          </p>
        </div>

        {/* ═══════════════════════════════════════════════════
           A) DEALER WORKSPACE — HERO ENTRY
           Visuellt dominerande, full bredd, ren
           ═══════════════════════════════════════════════════ */}
        <section className="mt-8">
          <Link
            href="/nav-v2/min-verksamhet/workspace"
            className="group block overflow-hidden rounded-2xl border-2 border-[#273A60]/15 bg-white transition-all hover:border-[#273A60]/35 hover:shadow-xl"
          >
            {/* Top band */}
            <div className="bg-gradient-to-r from-[#273A60] to-[#3a5280] px-7 py-6 sm:flex sm:items-center sm:justify-between">
              <div className="flex items-center gap-5">
                <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-white backdrop-blur-sm">
                  <svg width="28" height="28" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="7" height="7" rx="1.5" />
                    <rect x="11" y="2" width="7" height="4" rx="1.5" />
                    <rect x="2" y="11" width="7" height="4" rx="1.5" />
                    <rect x="11" y="8" width="7" height="7" rx="1.5" />
                  </svg>
                </span>
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="text-[20px] font-bold text-white">Dealer Workspace</span>
                    <span className="rounded bg-[#ff6b00] px-2 py-0.5 text-[10px] font-bold uppercase leading-none text-white shadow-sm">
                      Ny
                    </span>
                  </div>
                  <p className="mt-1 text-[14px] text-white/75">
                    Din översikt över produkter, kunder, kontrakt och dagliga uppgifter.
                  </p>
                </div>
              </div>
              <span className="mt-4 inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-6 py-3 text-[14px] font-semibold text-[#273A60] shadow-sm transition-all group-hover:shadow-md sm:mt-0">
                Öppna Dealer Workspace
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M6 4l4 4-4 4" />
                </svg>
              </span>
            </div>

            {/* Bottom preview band */}
            <div className="grid grid-cols-2 gap-px bg-[#e5e5e5] sm:grid-cols-4 lg:grid-cols-9">
              {/* KPI stats */}
              {workspaceFeatures.map((f) => (
                <div key={f.label} className="flex items-center gap-3 bg-white px-5 py-4">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: f.color }} />
                  <div>
                    <span className="text-[18px] font-extrabold text-[#111]">{f.value}</span>
                    <span className="ml-1.5 text-[12px] text-[#888]">{f.label}</span>
                  </div>
                </div>
              ))}
              {/* Module previews */}
              {workspaceModules.map((m) => (
                <div key={m.label} className="bg-[#f8f9fb] px-4 py-4">
                  <span className="text-[12px] font-semibold text-[#273A60]">{m.label}</span>
                  <span className="mt-0.5 block text-[10px] text-[#999]">{m.desc}</span>
                </div>
              ))}
            </div>
          </Link>
        </section>

        {/* ═══════════════════════════════════════════════════
           B) EKONOMI & BESTÄLLNINGAR
           ═══════════════════════════════════════════════════ */}
        <section aria-labelledby="ekonomi-heading" className="mt-14">
          <SectionHeader
            id="ekonomi-heading"
            title="Ekonomi & beställningar"
            subtitle="Order, leveranser, fakturor och returer"
            icon="M3 4h14v13H3zM3 8h14M7 4V2M13 4V2"
          />
          <div className="mt-5 grid grid-cols-1 items-stretch gap-4 lg:grid-cols-2">
            {/* Left: Orderhantering */}
            <a
              href="/nav-v2/min-verksamhet/orders"
              className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-[#d0d0d0] bg-gradient-to-br from-[#273A60] to-[#1a2d4d] p-6 transition-all hover:shadow-lg"
            >
              {/* NY badge */}
              <span className="absolute right-4 top-4 rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-bold text-white backdrop-blur-sm">
                NY
              </span>

              {/* Title area */}
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                  <svg width="22" height="22" viewBox="0 0 20 20" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 4h14v13H3zM3 8h14" />
                  </svg>
                </div>
                <h3 className="mt-3 text-[16px] font-bold text-white">Orderhantering</h3>
                <p className="mt-1 text-[12px] leading-relaxed text-white/60">
                  Beställningar, leveranser, returer och utkast — samlat i en vy.
                </p>
              </div>

              {/* Metrics grid */}
              <div className="mt-5 grid grid-cols-4 gap-2">
                {orderIndicators.map((ind) => (
                  <div
                    key={ind.label}
                    className="relative rounded-lg bg-white/10 px-2 py-3 text-center backdrop-blur-sm"
                  >
                    {ind.alert && ind.count > 0 && (
                      <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-[#ff6b00] ring-2 ring-[#273A60]" />
                    )}
                    <span className="block text-[20px] font-bold text-white">{ind.count}</span>
                    <span className="mt-0.5 block text-[10px] font-medium text-white/50">
                      {ind.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Hover CTA */}
              <span className="mt-4 inline-flex items-center gap-1 text-[12px] font-semibold text-white/40 transition-colors group-hover:text-white/80">
                Öppna orderhantering
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5">
                  <path d="M5 3l4 4-4 4" />
                </svg>
              </span>
            </a>

            {/* Right: Fakturor, Betalningar, Rapporter stacked */}
            <div className="flex flex-col gap-3">
              {ekonomiItems.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  className="group flex flex-1 items-center gap-4 rounded-xl border border-[#d0d0d0] bg-white px-5 py-4 transition-all hover:border-[#273A60]/30 hover:shadow-md"
                >
                  <span className="shrink-0 rounded-lg bg-[#f0f3f8] p-2.5 text-[#273A60] transition-colors group-hover:bg-[#273A60] group-hover:text-white">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d={item.icon} />
                    </svg>
                  </span>
                  <div className="flex-1">
                    <h3 className="text-[13px] font-semibold text-[#111]">{item.title}</h3>
                    <p className="mt-0.5 text-[11px] text-[#888]">{item.desc}</p>
                  </div>
                  {item.badge && (
                    <span className="rounded-full bg-[#273A60] px-2 py-0.5 text-[10px] font-bold text-white">
                      {item.badge}
                    </span>
                  )}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
           C) FÖRSÄLJNING
           ═══════════════════════════════════════════════════ */}
        <section aria-labelledby="forsaljning-heading" className="mt-14">
          <SectionHeader
            id="forsaljning-heading"
            title="Försäljning"
            subtitle="Offerter, kampanjer, wishlist och kundpriser"
            icon="M3 17l4-8 4 4 6-10"
          />
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {forsaljningItems.map((item) => (
              <ModuleCard key={item.title} {...item} />
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
           D) AKTIVITETER & PRODUKTHANTERING
           Snabbvägar till task flows — EJ Workspace
           ═══════════════════════════════════════════════════ */}
        <section aria-labelledby="aktiviteter-heading" className="mt-14">
          <SectionHeader
            id="aktiviteter-heading"
            title="Aktiviteter & produkthantering"
            subtitle="Registrera, installera, överlämna och aktivera"
            icon="M10 10a7 7 0 100-14 7 7 0 000 14zM7 10l2.5 2.5L13 7"
          />
          <p className="mt-2 text-[12px] text-[#aaa]">
            Snabbvägar till enskilda åtgärder. Samlad översikt finns i{" "}
            <Link href="/nav-v2/min-verksamhet/workspace" className="font-medium text-[#273A60] hover:underline">
              Dealer Workspace
            </Link>.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {aktivitetItems.map((item) => (
              <ModuleCard key={item.title} {...item} />
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
           E) ADMINISTRATION
           ═══════════════════════════════════════════════════ */}
        <section aria-labelledby="admin-heading" className="mt-14 mb-10">
          <SectionHeader
            id="admin-heading"
            title="Administration"
            subtitle="Företagsprofil, användare, prislistor och behörigheter"
            icon="M10 10a3 3 0 100-6 3 3 0 000 6zM10 2v2M10 16v2M2 10h2M16 10h2M4.93 4.93l1.41 1.41M13.66 13.66l1.41 1.41M4.93 15.07l1.41-1.41M13.66 6.34l1.41-1.41"
          />
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {adminItems.map((item) => (
              <a
                key={item.title}
                href={item.href}
                className="group rounded-xl border border-[#d0d0d0] bg-white px-4 py-4 transition-all hover:border-[#273A60]/30 hover:shadow-md"
              >
                <span className="text-[13px] font-semibold text-[#333] group-hover:text-[#111]">{item.title}</span>
                <span className="mt-1 block text-[11px] text-[#888]">{item.desc}</span>
              </a>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   SUBCOMPONENTS
   ═══════════════════════════════════════════════════════ */

function SectionHeader({
  id,
  title,
  subtitle,
  icon,
}: {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="rounded-lg bg-[#f0f3f8] p-2 text-[#273A60]">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d={icon} />
        </svg>
      </span>
      <div>
        <h2 id={id} className="text-lg font-semibold text-[#111]">{title}</h2>
        <p className="text-[13px] text-[#888]">{subtitle}</p>
      </div>
    </div>
  );
}

function ModuleCard({
  title,
  desc,
  href,
  badge,
  badgeColor,
  icon,
}: {
  title: string;
  desc: string;
  href: string;
  badge?: string;
  badgeColor?: string;
  icon: string;
}) {
  return (
    <a
      href={href}
      className="group flex flex-col rounded-xl border border-[#d0d0d0] bg-white p-5 transition-all hover:border-[#273A60]/30 hover:shadow-md"
    >
      <div className="flex items-start justify-between">
        <span className="shrink-0 rounded-lg bg-[#f0f3f8] p-2.5 text-[#273A60] transition-colors group-hover:bg-[#273A60] group-hover:text-white">
          <svg width="22" height="22" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d={icon} />
          </svg>
        </span>
        {badge && (
          <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold text-white ${
            badgeColor === "orange" ? "bg-[#ff6b00]" : "bg-[#273A60]"
          }`}>
            {badge}
          </span>
        )}
      </div>
      <h3 className="mt-3 text-[14px] font-semibold text-[#111]">{title}</h3>
      <p className="mt-0.5 text-[12px] text-[#888]">{desc}</p>
      <span className="mt-auto pt-3 text-[12px] font-semibold text-[#273A60] opacity-0 transition-opacity group-hover:opacity-100">
        Öppna →
      </span>
    </a>
  );
}
