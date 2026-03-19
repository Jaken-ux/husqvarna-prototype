"use client";

import { useState, Fragment } from "react";
import Link from "next/link";
import NavHeader from "../../NavHeader";
import Breadcrumb from "../../Breadcrumb";

/* ═══════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════ */

type Priority = "high" | "medium" | "low";

type Tab = "dashboard" | "products" | "customers" | "contracts" | "today";
type ContractView = "alla" | "service-plus" | "warranty-plus" | "leasing-plus" | "hypercare";

/* ═══════════════════════════════════════════════════════
   SHARED DATA
   ═══════════════════════════════════════════════════════ */

const priorityStyles: Record<Priority, string> = {
  high: "bg-[#fce8e8] text-[#c44]",
  medium: "bg-[#fff8e1] text-[#b8860b]",
  low: "bg-[#eef6ee] text-[#2a7d4c]",
};

const priorityLabels: Record<Priority, string> = {
  high: "Hög",
  medium: "Medel",
  low: "Låg",
};

const statusBadges: Record<string, { bg: string; text: string }> = {
  active: { bg: "bg-[#e8f5e9]", text: "text-[#2e7d32]" },
  expiring: { bg: "bg-[#fff3e0]", text: "text-[#e65100]" },
  expired: { bg: "bg-[#fce8e8]", text: "text-[#c44]" },
  pending: { bg: "bg-[#e3f2fd]", text: "text-[#1565c0]" },
  missing: { bg: "bg-[#fce8e8]", text: "text-[#c44]" },
  completed: { bg: "bg-[#e8f5e9]", text: "text-[#2e7d32]" },
};

const statusLabels: Record<string, string> = {
  active: "Aktiv",
  expiring: "Löper ut",
  expired: "Utgånget",
  pending: "Väntar",
  missing: "Saknas",
  completed: "Klar",
};

/* ═══════════════════════════════════════════════════════
   A) DASHBOARD DATA
   ═══════════════════════════════════════════════════════ */

const dashboardKpis = [
  { label: "Produkter", value: "87", helper: "42 med avtal", icon: "products", href: "#products" },
  { label: "Kunder", value: "142", helper: "18 nya i år", icon: "customers", href: "#customers" },
  { label: "Förnyelser", value: "5", helper: "Inom 30 dagar", icon: "renewal", color: "border-l-[#b8860b]", href: "#renewals" },
  { label: "Saknat sellout", value: "3", helper: "Registrera säljdatum", icon: "sellout", color: "border-l-[#c44]", href: "#sellout" },
  { label: "Installation väntar", value: "2", helper: "Boka & genomför", icon: "install", color: "border-l-[#b8860b]", href: "#installation" },
  { label: "Serviceavtal", value: "23", helper: "3 Service Plus, 20 Lease Plus", icon: "contract", href: "#contracts" },
  { label: "HyperCare", value: "8", helper: "3 kräver åtgärd", icon: "hypercare", color: "border-l-[#c44]", href: "#hypercare" },
];

const todayTasks = [
  { label: "Automower 435X → Kund Lindström: installation ej slutförd", priority: "high" as Priority, tag: "Installation", href: "#installation/1" },
  { label: "Service Plus avtal #SP-2024-089 löper ut om 7 dagar", priority: "medium" as Priority, tag: "Avtal", href: "#service-plus/89" },
  { label: "HyperCare: 346XP kedjesträckare — åtgärd krävs", priority: "high" as Priority, tag: "HyperCare", href: "#hypercare/HC-201" },
  { label: "Överlämning saknas: Order #38291 levererad men ej registrerad", priority: "medium" as Priority, tag: "Överlämning", href: "#handover/38291" },
  { label: "Sellout saknas: CEORA robotklippare → AB Grönytor", priority: "high" as Priority, tag: "Sellout", href: "#sellout/ceora-1" },
  { label: "Garanti ej aktiverad: 550X Mark II → Kund Eriksson", priority: "medium" as Priority, tag: "Garanti", href: "#warranty/550x-1" },
];

const tagStyles: Record<string, string> = {
  Installation: "bg-[#e3f2fd] text-[#1565c0]",
  Avtal: "bg-[#f3e5f5] text-[#7b1fa2]",
  HyperCare: "bg-[#fce8e8] text-[#c44]",
  "Överlämning": "bg-[#fff8e1] text-[#b8860b]",
  Sellout: "bg-[#fff3e0] text-[#e65100]",
  Garanti: "bg-[#e8f5e9] text-[#2e7d32]",
};

const programBands = [
  { label: "HyperCare", count: 8, active: 3, color: "#c44", desc: "Aktiva enheter under övervakning" },
  { label: "Service Plus", count: 12, active: 12, color: "#2a9d5c", desc: "Aktiva serviceavtal" },
  { label: "Warranty Plus", count: 9, active: 7, color: "#b8860b", desc: "Utökade garantiavtal" },
  { label: "Lease Plus → Second Life", count: 11, active: 8, color: "#1565c0", desc: "Leasingavtal & Second Life-steg" },
];

const quickActions = [
  { label: "Identifiera produkt", desc: "Sök via PNC, serienummer eller QR", href: "#identify", icon: "search" },
  { label: "Registrera säljdatum", desc: "Markera produkt som såld till kund", href: "#sellout", icon: "sellout" },
  { label: "Starta installation", desc: "Boka och påbörja installation", href: "#installation", icon: "install" },
  { label: "Överlämning", desc: "Registrera kundöverlämning", href: "#handover", icon: "handover" },
  { label: "Aktivera garanti", desc: "Starta garantiperiod", href: "#warranty-start", icon: "warranty" },
  { label: "Nytt serviceavtal", desc: "Registrera Service Plus-kontrakt", href: "#service-contract", icon: "contract" },
];

const recentActivity = [
  { text: "Order #38291 skickad — Automower 435X AWD", time: "Idag 09:12", type: "order" },
  { text: "Service Plus #SP-2024-091 aktiverat → Kund Nilsson", time: "Idag 08:45", type: "contract" },
  { text: "HyperCare HC-198 stängt — 550X motor OK", time: "Igår 16:30", type: "hypercare" },
  { text: "Ny kund registrerad: Fastighets AB Solbacken", time: "Igår 14:15", type: "customer" },
  { text: "Garanti aktiverad: 346XP → Kund Johansson", time: "Igår 11:20", type: "warranty" },
];

/* ═══════════════════════════════════════════════════════
   B) PRODUCTS DATA
   ═══════════════════════════════════════════════════════ */

const productColumns = [
  "Modell", "Serie / PNC", "Kund", "Sålddatum", "Installation", "Garanti", "Serviceavtal", "Leasing", "HyperCare"
];

const products = [
  {
    model: "Automower 435X AWD",
    serial: "2024-435X-00891",
    pnc: "967 85 32-01",
    customer: "Lindström Fastigheter",
    soldDate: "2024-11-15",
    installed: "pending",
    warranty: "pending",
    serviceContract: "missing",
    leasing: "—",
    hypercare: "—",
  },
  {
    model: "Automower 550X Mark II",
    serial: "2024-550X-01244",
    pnc: "967 85 45-02",
    customer: "Eriksson Trädgård AB",
    soldDate: "2024-10-20",
    installed: "completed",
    warranty: "pending",
    serviceContract: "active",
    leasing: "—",
    hypercare: "—",
  },
  {
    model: "CEORA 546 EPOS",
    serial: "2024-C546-00087",
    pnc: "967 93 12-01",
    customer: "AB Grönytor",
    soldDate: "missing",
    installed: "missing",
    warranty: "missing",
    serviceContract: "missing",
    leasing: "active",
    hypercare: "active",
  },
  {
    model: "Husqvarna 346XP",
    serial: "2024-346X-03211",
    pnc: "966 99 18-35",
    customer: "Skogsservice Norr AB",
    soldDate: "2024-09-05",
    installed: "completed",
    warranty: "active",
    serviceContract: "active",
    leasing: "—",
    hypercare: "active",
  },
  {
    model: "Automower 310 Mark II",
    serial: "2024-310M-02198",
    pnc: "967 85 21-03",
    customer: "Nilsson Villaservice",
    soldDate: "2024-12-01",
    installed: "completed",
    warranty: "active",
    serviceContract: "active",
    leasing: "—",
    hypercare: "—",
  },
  {
    model: "CEORA 526 EPOS",
    serial: "2024-C526-00045",
    pnc: "967 93 10-02",
    customer: "Karlsson Park & Trädgård",
    soldDate: "2024-08-14",
    installed: "completed",
    warranty: "active",
    serviceContract: "active",
    leasing: "active",
    hypercare: "active",
  },
  {
    model: "Automower 450X NERA",
    serial: "2024-450N-01567",
    pnc: "967 85 38-01",
    customer: "BRF Solsidan",
    soldDate: "2024-07-22",
    installed: "completed",
    warranty: "active",
    serviceContract: "expiring",
    leasing: "—",
    hypercare: "—",
  },
  {
    model: "Husqvarna 572XP",
    serial: "2024-572X-00432",
    pnc: "966 73 31-18",
    customer: "Skogsservice Norr AB",
    soldDate: "2024-06-10",
    installed: "completed",
    warranty: "active",
    serviceContract: "missing",
    leasing: "—",
    hypercare: "—",
  },
];

const productFilters = [
  { label: "Alla", count: 87 },
  { label: "HyperCare", count: 8 },
  { label: "Service Plus", count: 23 },
  { label: "Lease Plus", count: 11 },
  { label: "Saknar data", count: 5 },
  { label: "Behöver förnyelse", count: 3 },
];

/* ═══════════════════════════════════════════════════════
   C) CUSTOMERS DATA
   ═══════════════════════════════════════════════════════ */

const customers = [
  { name: "Lindström Fastigheter", contact: "Anna Lindström", products: 4, contracts: 2, hypercare: 0, program: "Service Plus", status: "active" },
  { name: "Eriksson Trädgård AB", contact: "Per Eriksson", products: 3, contracts: 3, hypercare: 0, program: "Service Plus", status: "active" },
  { name: "AB Grönytor", contact: "Maria Svensson", products: 6, contracts: 4, hypercare: 2, program: "Lease Plus", status: "pending" },
  { name: "Skogsservice Norr AB", contact: "Johan Bergström", products: 8, contracts: 5, hypercare: 2, program: "Service Plus", status: "active" },
  { name: "Nilsson Villaservice", contact: "Erik Nilsson", products: 2, contracts: 1, hypercare: 0, program: "Service Plus", status: "active" },
  { name: "Karlsson Park & Trädgård", contact: "Lisa Karlsson", products: 5, contracts: 4, hypercare: 1, program: "Lease Plus", status: "active" },
  { name: "BRF Solsidan", contact: "Karin Holm", products: 3, contracts: 2, hypercare: 0, program: "Service Plus", status: "expiring" },
  { name: "Fastighets AB Solbacken", contact: "Anders Björk", products: 1, contracts: 0, hypercare: 0, program: "—", status: "pending" },
];

/* ═══════════════════════════════════════════════════════
   D) CONTRACTS & PROGRAMS DATA
   ═══════════════════════════════════════════════════════ */

const contracts = [
  { id: "SP-2024-089", program: "Service Plus" as const, customer: "BRF Solsidan", product: "Automower 450X NERA", start: "2024-01-15", end: "2025-01-15", status: "expiring", bonus: "eligible", winterStorage: true },
  { id: "SP-2024-091", program: "Service Plus" as const, customer: "Nilsson Villaservice", product: "Automower 310 Mark II", start: "2024-12-01", end: "2025-12-01", status: "active", bonus: "eligible", winterStorage: false },
  { id: "LP-2024-022", program: "Lease Plus" as const, customer: "AB Grönytor", product: "CEORA 546 EPOS", start: "2024-03-01", end: "2027-03-01", status: "active", bonus: "—", salesContact: "2026-02-15" },
  { id: "LP-2024-031", program: "Lease Plus" as const, customer: "Karlsson Park & Trädgård", product: "CEORA 526 EPOS", start: "2024-08-14", end: "2027-08-14", status: "active", bonus: "—", salesContact: "Ej kontaktad" },
  { id: "SP-2024-078", program: "Service Plus" as const, customer: "Skogsservice Norr AB", product: "Husqvarna 346XP", start: "2024-09-05", end: "2025-09-05", status: "active", bonus: "eligible", winterStorage: false },
  { id: "HC-198", program: "HyperCare" as const, customer: "Skogsservice Norr AB", product: "Husqvarna 346XP", start: "2024-11-01", end: "—", status: "active", bonus: "—", priority: "medium" as Priority, hyperCareStatus: "Uppföljning" },
  { id: "HC-201", program: "HyperCare" as const, customer: "AB Grönytor", product: "CEORA 546 EPOS", start: "2024-12-10", end: "—", status: "active", bonus: "—", priority: "high" as Priority, hyperCareStatus: "Åtgärd krävs" },
  { id: "HC-205", program: "HyperCare" as const, customer: "Nilsson Villaservice", product: "Automower 310 Mark II", start: "2025-01-05", end: "—", status: "active", bonus: "—", priority: "low" as Priority, hyperCareStatus: "Bevakning" },
  { id: "SP-2024-065", program: "Service Plus" as const, customer: "Eriksson Trädgård AB", product: "Automower 550X Mark II", start: "2024-10-20", end: "2025-10-20", status: "active", bonus: "paid", winterStorage: true },
  { id: "WP-2024-112", program: "Warranty Plus" as const, customer: "BRF Solsidan", product: "Automower 450X NERA", start: "2024-02-10", end: "2026-02-10", status: "active", bonus: "—", warrantyStatus: "Giltig", claimStatus: "—" },
  { id: "WP-2024-118", program: "Warranty Plus" as const, customer: "Nilsson Villaservice", product: "Automower 310 Mark II", start: "2024-12-01", end: "2026-12-01", status: "active", bonus: "—", warrantyStatus: "Giltig", claimStatus: "—" },
  { id: "WP-2024-105", program: "Warranty Plus" as const, customer: "Eriksson Trädgård AB", product: "Automower 550X Mark II", start: "2024-10-20", end: "2026-10-20", status: "active", bonus: "—", warrantyStatus: "Giltig", claimStatus: "Pågående" },
  { id: "WP-2024-099", program: "Warranty Plus" as const, customer: "AB Grönytor", product: "CEORA 546 EPOS", start: "2024-03-01", end: "2026-03-01", status: "expiring", bonus: "—", warrantyStatus: "Löper ut", claimStatus: "—" },
  { id: "WP-2024-121", program: "Warranty Plus" as const, customer: "Karlsson Park & Trädgård", product: "CEORA 526 EPOS", start: "2024-08-14", end: "2026-08-14", status: "active", bonus: "—", warrantyStatus: "Giltig", claimStatus: "Avslutad" },
  { id: "WP-2024-130", program: "Warranty Plus" as const, customer: "Skogsservice Norr AB", product: "Husqvarna 346XP", start: "2024-09-05", end: "2026-09-05", status: "active", bonus: "—", warrantyStatus: "Giltig", claimStatus: "—" },
  { id: "WP-2025-003", program: "Warranty Plus" as const, customer: "Fastighets AB Solbacken", product: "Automower 405X NERA", start: "2025-01-15", end: "2027-01-15", status: "active", bonus: "—", warrantyStatus: "Giltig", claimStatus: "—" },
  { id: "WP-2024-088", program: "Warranty Plus" as const, customer: "Lundgren Maskin AB", product: "Husqvarna 562XP", start: "2024-06-20", end: "2025-06-20", status: "expiring", bonus: "—", warrantyStatus: "Löper ut", claimStatus: "Pågående" },
  { id: "WP-2025-011", program: "Warranty Plus" as const, customer: "Malmö Grönska HB", product: "Automower 320 NERA", start: "2025-02-01", end: "2027-02-01", status: "active", bonus: "—", warrantyStatus: "Giltig", claimStatus: "—" },
];

const renewalRadar = [
  { id: "SP-2024-089", customer: "BRF Solsidan", daysLeft: 7, program: "Service Plus" },
  { id: "SP-2024-078", customer: "Skogsservice Norr AB", daysLeft: 24, program: "Service Plus" },
  { id: "SP-2024-065", customer: "Eriksson Trädgård AB", daysLeft: 58, program: "Service Plus" },
];

const contractViews: { id: ContractView; label: string; count: number }[] = [
  { id: "alla", label: "Alla", count: contracts.length },
  { id: "service-plus", label: "Service Plus", count: contracts.filter((c) => c.program === "Service Plus").length },
  { id: "warranty-plus", label: "Warranty Plus", count: contracts.filter((c) => c.program === "Warranty Plus").length },
  { id: "leasing-plus", label: "Lease Plus", count: contracts.filter((c) => c.program === "Lease Plus").length },
  { id: "hypercare", label: "HyperCare", count: contracts.filter((c) => c.program === "HyperCare").length },
];

/* ═══════════════════════════════════════════════════════
   E) TODAY / ACTIONS DATA
   ═══════════════════════════════════════════════════════ */

const actionGroups = [
  {
    category: "Saknat sellout",
    icon: "sellout",
    color: "#e65100",
    items: [
      { label: "CEORA 546 EPOS → AB Grönytor", detail: "Sålddatum saknas", href: "#sellout/ceora-1" },
      { label: "Automower 310 Mark II → Villa Ekbacken", detail: "Levererad 2024-11-28", href: "#sellout/310-1" },
      { label: "Husqvarna 562XP → Skog & Mark HB", detail: "Levererad 2024-12-02", href: "#sellout/562-1" },
    ],
  },
  {
    category: "Installation väntar",
    icon: "install",
    color: "#1565c0",
    items: [
      { label: "Automower 435X AWD → Lindström Fastigheter", detail: "Såld 2024-11-15, ej installerad", href: "#install/435x-1" },
      { label: "CEORA 546 EPOS → AB Grönytor", detail: "Väntar på platsbesök", href: "#install/ceora-1" },
    ],
  },
  {
    category: "Överlämning väntar",
    icon: "handover",
    color: "#7b1fa2",
    items: [
      { label: "Order #38291 → Lindström Fastigheter", detail: "Installerad men ej överlämnad", href: "#handover/38291" },
    ],
  },
  {
    category: "Garanti ej aktiverad",
    icon: "warranty",
    color: "#2e7d32",
    items: [
      { label: "Automower 550X Mark II → Eriksson Trädgård AB", detail: "Installerad, garanti ej startad", href: "#warranty/550x-1" },
      { label: "Automower 435X AWD → Lindström Fastigheter", detail: "Väntar på installation", href: "#warranty/435x-1" },
    ],
  },
  {
    category: "Avtal löper ut",
    icon: "contract",
    color: "#b8860b",
    items: [
      { label: "Service Plus #SP-2024-089 → BRF Solsidan", detail: "Löper ut om 7 dagar", href: "#contract/sp-089" },
      { label: "Service Plus #SP-2024-078 → Skogsservice Norr AB", detail: "Löper ut om 24 dagar", href: "#contract/sp-078" },
    ],
  },
  {
    category: "Kundvalidering behövs",
    icon: "customer",
    color: "#555",
    items: [
      { label: "Fastighets AB Solbacken", detail: "Ny kund — kontaktuppgifter ofullständiga", href: "#customer/solbacken" },
    ],
  },
  {
    category: "HyperCare steg väntar",
    icon: "hypercare",
    color: "#c44",
    items: [
      { label: "HyperCare HC-201: CEORA 546 EPOS", detail: "Kedjesträckare — åtgärd krävs", href: "#hypercare/HC-201" },
      { label: "HyperCare HC-199: CEORA 526 EPOS", detail: "Rutinkontroll — boka tid", href: "#hypercare/HC-199" },
      { label: "HyperCare HC-195: 346XP", detail: "Uppföljning — rapport saknas", href: "#hypercare/HC-195" },
    ],
  },
];

/* ═══════════════════════════════════════════════════════
   TABS CONFIG
   ═══════════════════════════════════════════════════════ */

const tabs: { id: Tab; label: string; badge?: number }[] = [
  { id: "dashboard", label: "Dashboard" },
  { id: "products", label: "Produkter", badge: 87 },
  { id: "customers", label: "Kunder", badge: 142 },
  { id: "contracts", label: "Avtal & program", badge: 23 },
  { id: "today", label: "Idag", badge: 14 },
];

/* ═══════════════════════════════════════════════════════
   STATUS BADGE COMPONENT
   ═══════════════════════════════════════════════════════ */

function StatusBadge({ status }: { status: string }) {
  if (status === "—") return <span className="text-[12px] text-[#ccc]">—</span>;
  const s = statusBadges[status] ?? statusBadges.pending;
  const label = statusLabels[status] ?? status;
  return (
    <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${s.bg} ${s.text}`}>
      {label}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════ */

export default function MinVerksamhetPage() {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [productFilter, setProductFilter] = useState("Alla");
  const [contractView, setContractView] = useState<ContractView>("alla");
  const [expandedCustomer, setExpandedCustomer] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white">
      <NavHeader />

      <main className="mx-auto max-w-[1320px] px-6 py-6">
        {/* ── Breadcrumb ── */}
        <Breadcrumb items={[
          { label: "Min verksamhet", href: "/nav-v2/min-verksamhet" },
          { label: "Dealer Workspace", href: "/nav-v2/min-verksamhet/workspace" },
        ]} />

        {/* ── Page header ── */}
        <div className="mt-5 flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#111]">Dealer Workspace</h1>
            <p className="mt-1 text-[13px] text-[#888]">Unified arbetsyta — produkter, kunder, avtal och dagliga uppgifter</p>
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <span className="text-[12px] text-[#aaa]">Senast uppdaterad: idag 09:15</span>
          </div>
        </div>

        {/* ── Tab bar ── */}
        <div className="mt-6 border-b border-[#d0d0d0]">
          <nav className="-mb-px flex gap-0 overflow-x-auto" aria-label="Workspace-flikar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative shrink-0 border-b-2 px-5 py-3 text-[13px] font-semibold transition-colors ${
                  activeTab === tab.id
                    ? "border-[#273A60] text-[#273A60]"
                    : "border-transparent text-[#888] hover:text-[#555]"
                }`}
                aria-selected={activeTab === tab.id}
                role="tab"
              >
                <span className="flex items-center gap-1.5">
                  {tab.label}
                  {tab.badge !== undefined && (
                    <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold leading-none ${
                      activeTab === tab.id ? "bg-[#273A60] text-white" : "bg-[#e5e5e5] text-[#888]"
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                  {tab.id === "today" && (
                    <span className="absolute -right-0.5 top-1.5 h-2 w-2 rounded-full bg-[#c44]" />
                  )}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* ── Tab content ── */}
        <div className="mt-6">
          {activeTab === "dashboard" && (
            <DashboardView />
          )}
          {activeTab === "products" && (
            <ProductsView
              filter={productFilter}
              onFilterChange={setProductFilter}
            />
          )}
          {activeTab === "customers" && (
            <CustomersView
              expanded={expandedCustomer}
              onToggle={setExpandedCustomer}
            />
          )}
          {activeTab === "contracts" && (
            <ContractsView
              activeView={contractView}
              onViewChange={setContractView}
            />
          )}
          {activeTab === "today" && (
            <TodayView />
          )}
        </div>
      </main>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   A) DASHBOARD VIEW
   ═══════════════════════════════════════════════════════ */

function DashboardView() {
  const [showPrograms, setShowPrograms] = useState(true);

  return (
    <div className="space-y-8">
      {/* KPI row */}
      <section aria-labelledby="kpi-heading">
        <h2 id="kpi-heading" className="sr-only">Nyckeltal</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {dashboardKpis.map((kpi) => (
            <a
              key={kpi.label}
              href={kpi.href}
              className={`group rounded-xl border border-[#d0d0d0] bg-white p-4 transition-all hover:shadow-md ${kpi.color ? `border-l-[3px] ${kpi.color}` : ""}`}
            >
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#999]">{kpi.label}</p>
              <p className="mt-1 text-2xl font-extrabold text-[#111]">{kpi.value}</p>
              <p className="mt-1 text-[11px] text-[#aaa]">{kpi.helper}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Priority list */}
      <section aria-labelledby="priority-heading">
        <div className="flex items-center justify-between">
          <div>
            <h2 id="priority-heading" className="text-base font-semibold text-[#111]">Kräver uppmärksamhet idag</h2>
            <p className="mt-0.5 text-[12px] text-[#888]">Sorterat efter prioritet</p>
          </div>
          <a href="#tasks" className="text-[12px] font-semibold text-[#273A60] transition-colors hover:text-[#1a2d4d]">
            Visa alla →
          </a>
        </div>
        <div className="mt-3 rounded-xl border border-[#d0d0d0] bg-white">
          <ul className="divide-y divide-[#f0f0f0]">
            {todayTasks.map((task) => (
              <li key={task.label}>
                <a href={task.href} className="flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-[#fafafa]">
                  <span className={`shrink-0 rounded px-2 py-0.5 text-[10px] font-bold ${tagStyles[task.tag] ?? "bg-[#f0f0f0] text-[#888]"}`}>
                    {task.tag}
                  </span>
                  <span className="flex-1 text-[13px] font-medium text-[#333]">{task.label}</span>
                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${priorityStyles[task.priority]}`}>
                    {priorityLabels[task.priority]}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Program bands */}
      <section aria-labelledby="programs-heading">
        <div className="flex items-center justify-between">
          <h2 id="programs-heading" className="text-base font-semibold text-[#111]">Programöversikt</h2>
          <button
            onClick={() => setShowPrograms(!showPrograms)}
            className="text-[12px] font-medium text-[#888] transition-colors hover:text-[#555]"
          >
            {showPrograms ? "Dölj" : "Visa"}
          </button>
        </div>
        {showPrograms && (
          <div className="mt-3 grid gap-3 sm:grid-cols-4">
            {programBands.map((band) => (
              <div key={band.label} className="rounded-xl border border-[#d0d0d0] bg-white p-5">
                <div className="flex items-center gap-2.5">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: band.color }} />
                  <h3 className="text-[14px] font-semibold text-[#111]">{band.label}</h3>
                </div>
                <p className="mt-1 text-[12px] text-[#888]">{band.desc}</p>
                <div className="mt-3 flex items-end gap-4">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-[#999]">Totalt</p>
                    <p className="text-xl font-extrabold text-[#111]">{band.count}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-[#999]">Aktiva</p>
                    <p className="text-xl font-extrabold" style={{ color: band.color }}>{band.active}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Quick actions */}
      <section aria-labelledby="quick-heading">
        <h2 id="quick-heading" className="text-base font-semibold text-[#111]">Snabbåtgärder</h2>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {quickActions.map((action) => (
            <a
              key={action.label}
              href={action.href}
              className="group rounded-xl border border-[#d0d0d0] bg-white p-4 text-center transition-all hover:border-[#273A60]/30 hover:shadow-md"
            >
              <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-[#f0f3f8] text-[#273A60] transition-colors group-hover:bg-[#273A60] group-hover:text-white">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 4v12M4 10h12" />
                </svg>
              </span>
              <p className="mt-2.5 text-[12px] font-semibold text-[#111]">{action.label}</p>
              <p className="mt-0.5 text-[10px] text-[#888]">{action.desc}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Recent activity */}
      <section aria-labelledby="activity-heading">
        <h2 id="activity-heading" className="text-base font-semibold text-[#111]">Senaste aktivitet</h2>
        <div className="mt-3 rounded-xl border border-[#d0d0d0] bg-white">
          <ul className="divide-y divide-[#f0f0f0]">
            {recentActivity.map((a, i) => (
              <li key={i} className="flex items-center justify-between px-5 py-3">
                <span className="text-[13px] text-[#333]">{a.text}</span>
                <span className="shrink-0 text-[11px] text-[#aaa]">{a.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   B) PRODUCTS VIEW
   ═══════════════════════════════════════════════════════ */

function ProductsView({
  filter,
  onFilterChange,
}: {
  filter: string;
  onFilterChange: (f: string) => void;
}) {
  return (
    <div className="space-y-5">
      {/* Header + bulk actions */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-[#111]">Alla produkter</h2>
          <p className="text-[12px] text-[#888]">Produkter under din hantering — filtrera efter program och status</p>
        </div>
        <div className="flex gap-2">
          <button className="rounded-lg border border-[#d0d0d0] bg-white px-3 py-2 text-[12px] font-semibold text-[#555] transition-colors hover:bg-[#f5f5f5]">
            Registrera säljdatum
          </button>
          <button className="rounded-lg border border-[#d0d0d0] bg-white px-3 py-2 text-[12px] font-semibold text-[#555] transition-colors hover:bg-[#f5f5f5]">
            Starta installation
          </button>
          <button className="rounded-lg border border-[#d0d0d0] bg-white px-3 py-2 text-[12px] font-semibold text-[#555] transition-colors hover:bg-[#f5f5f5]">
            Nytt serviceavtal
          </button>
          <button className="rounded-lg border border-[#d0d0d0] bg-white px-3 py-2 text-[12px] font-semibold text-[#555] transition-colors hover:bg-[#f5f5f5]">
            Exportera
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {productFilters.map((f) => (
          <button
            key={f.label}
            onClick={() => onFilterChange(f.label)}
            className={`rounded-full px-3 py-1.5 text-[12px] font-semibold transition-all ${
              filter === f.label
                ? "bg-[#273A60] text-white"
                : "bg-white text-[#555] border border-[#d0d0d0] hover:bg-[#f5f5f5]"
            }`}
          >
            {f.label}
            <span className={`ml-1.5 ${filter === f.label ? "text-white/70" : "text-[#aaa]"}`}>
              {f.count}
            </span>
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-[#d0d0d0] bg-white">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[#e5e5e5] bg-[#fafafa]">
              <th className="w-8 px-4 py-3">
                <input type="checkbox" className="rounded border-[#ccc]" aria-label="Välj alla" />
              </th>
              {productColumns.map((col) => (
                <th key={col} className="px-3 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#999]">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f0f0f0]">
            {products.map((p) => (
              <tr key={p.serial} className="transition-colors hover:bg-[#fafafa]">
                <td className="px-4 py-3">
                  <input type="checkbox" className="rounded border-[#ccc]" aria-label={`Välj ${p.model}`} />
                </td>
                <td className="px-3 py-3">
                  <a href="#product-detail" className="text-[13px] font-semibold text-[#273A60] hover:underline">{p.model}</a>
                </td>
                <td className="px-3 py-3">
                  <span className="block text-[12px] font-medium text-[#333]">{p.serial}</span>
                  <span className="text-[10px] text-[#aaa]">{p.pnc}</span>
                </td>
                <td className="px-3 py-3 text-[12px] text-[#555]">{p.customer}</td>
                <td className="px-3 py-3">
                  {p.soldDate === "missing" ? (
                    <StatusBadge status="missing" />
                  ) : (
                    <span className="text-[12px] text-[#555]">{p.soldDate}</span>
                  )}
                </td>
                <td className="px-3 py-3"><StatusBadge status={p.installed} /></td>
                <td className="px-3 py-3"><StatusBadge status={p.warranty} /></td>
                <td className="px-3 py-3"><StatusBadge status={p.serviceContract} /></td>
                <td className="px-3 py-3"><StatusBadge status={p.leasing} /></td>
                <td className="px-3 py-3"><StatusBadge status={p.hypercare} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Table footer */}
      <div className="flex items-center justify-between">
        <span className="text-[12px] text-[#888]">Visar 8 av 87 produkter</span>
        <div className="flex gap-1">
          <button className="rounded border border-[#d0d0d0] px-3 py-1.5 text-[12px] text-[#888]">← Föregående</button>
          <button className="rounded border border-[#273A60] bg-[#273A60] px-3 py-1.5 text-[12px] font-semibold text-white">1</button>
          <button className="rounded border border-[#d0d0d0] px-3 py-1.5 text-[12px] text-[#555]">2</button>
          <button className="rounded border border-[#d0d0d0] px-3 py-1.5 text-[12px] text-[#555]">3</button>
          <button className="rounded border border-[#d0d0d0] px-3 py-1.5 text-[12px] text-[#888]">Nästa →</button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   C) CUSTOMERS VIEW
   ═══════════════════════════════════════════════════════ */

function CustomersView({
  expanded,
  onToggle,
}: {
  expanded: string | null;
  onToggle: (name: string | null) => void;
}) {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-[#111]">Kundöversikt</h2>
          <p className="text-[12px] text-[#888]">Alla kunder du stöttar — klicka för detaljer</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#bbb]" width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <circle cx="7" cy="7" r="4.5" />
              <path d="M10.5 10.5L14 14" />
            </svg>
            <input
              type="text"
              placeholder="Sök kund..."
              className="h-9 w-56 rounded-lg border border-[#d0d0d0] bg-white pl-8 pr-3 text-[12px] text-[#333] placeholder-[#aaa] focus:border-[#999] focus:outline-none"
            />
          </div>
          <button className="rounded-lg bg-[#273A60] px-4 py-2 text-[12px] font-semibold text-white transition-colors hover:bg-[#1a2d4d]">
            + Registrera ny kund
          </button>
        </div>
      </div>

      {/* Customer list */}
      <div className="rounded-xl border border-[#d0d0d0] bg-white">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[#e5e5e5] bg-[#fafafa]">
              <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#999]">Kund</th>
              <th className="px-3 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#999]">Kontaktperson</th>
              <th className="px-3 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#999] text-center">Produkter</th>
              <th className="px-3 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#999] text-center">Avtal</th>
              <th className="px-3 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#999] text-center">HyperCare</th>
              <th className="px-3 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#999]">Program</th>
              <th className="px-3 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#999]">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f0f0f0]">
            {customers.map((c) => (
              <Fragment key={c.name}>
                <tr
                  className="cursor-pointer transition-colors hover:bg-[#fafafa]"
                  onClick={() => onToggle(expanded === c.name ? null : c.name)}
                >
                  <td className="px-5 py-3">
                    <span className="text-[13px] font-semibold text-[#273A60]">{c.name}</span>
                  </td>
                  <td className="px-3 py-3 text-[12px] text-[#555]">{c.contact}</td>
                  <td className="px-3 py-3 text-center text-[13px] font-bold text-[#111]">{c.products}</td>
                  <td className="px-3 py-3 text-center text-[13px] font-bold text-[#111]">{c.contracts}</td>
                  <td className="px-3 py-3 text-center text-[13px] font-bold text-[#111]">{c.hypercare || "—"}</td>
                  <td className="px-3 py-3">
                    {c.program !== "—" ? (
                      <span className="rounded-full bg-[#f0f3f8] px-2 py-0.5 text-[10px] font-semibold text-[#273A60]">{c.program}</span>
                    ) : (
                      <span className="text-[12px] text-[#ccc]">—</span>
                    )}
                  </td>
                  <td className="px-3 py-3"><StatusBadge status={c.status} /></td>
                </tr>
                {/* Expanded detail */}
                {expanded === c.name && (
                  <tr>
                    <td colSpan={7} className="bg-[#f8f9fb] px-5 py-4">
                      <div className="grid gap-4 sm:grid-cols-3">
                        <div>
                          <h4 className="text-[11px] font-semibold uppercase tracking-widest text-[#999]">Kontaktuppgifter</h4>
                          <p className="mt-1 text-[13px] text-[#333]">{c.contact}</p>
                          <p className="text-[12px] text-[#888]">{c.name.toLowerCase().replace(/\s+/g, "")}@example.se</p>
                          <p className="text-[12px] text-[#888]">08-123 456 78</p>
                        </div>
                        <div>
                          <h4 className="text-[11px] font-semibold uppercase tracking-widest text-[#999]">Produkter & avtal</h4>
                          <p className="mt-1 text-[13px] text-[#333]">{c.products} produkter registrerade</p>
                          <p className="text-[12px] text-[#888]">{c.contracts} aktiva avtal</p>
                          {c.hypercare > 0 && (
                            <p className="text-[12px] text-[#c44]">{c.hypercare} HyperCare-enheter</p>
                          )}
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <h4 className="text-[11px] font-semibold uppercase tracking-widest text-[#999]">Åtgärder</h4>
                          <a href="#customer-profile" className="text-[12px] font-medium text-[#273A60] hover:underline">Visa kundprofil →</a>
                          <a href="#customer-products" className="text-[12px] font-medium text-[#273A60] hover:underline">Se alla produkter →</a>
                          <a href="#customer-history" className="text-[12px] font-medium text-[#273A60] hover:underline">Servicehistorik →</a>
                          <a href="#customer-comms" className="text-[12px] font-medium text-[#273A60] hover:underline">Kommunikation →</a>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   D) CONTRACTS VIEW
   ═══════════════════════════════════════════════════════ */

function ContractsView({
  activeView,
  onViewChange,
}: {
  activeView: ContractView;
  onViewChange: (v: ContractView) => void;
}) {
  const [winterStorage, setWinterStorage] = useState<Record<string, boolean>>(
    Object.fromEntries(contracts.filter((c) => c.program === "Service Plus").map((c) => [c.id, c.winterStorage ?? false]))
  );

  const viewDescriptions: Record<ContractView, string> = {
    alla: "Alla avtal samlat — övergripande vy för jämförelse och översikt",
    "service-plus": "Hantera serviceavtal — vinterförvaring, statusar och förnyelseuppföljning",
    "warranty-plus": "Garantiövervakning — status och reklamationsärenden",
    "leasing-plus": "Leasinglivscykel — uppföljning och kundkontakt inför förnyelse",
    hypercare: "Eskaleringar och prioriterade supportärenden",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-base font-semibold text-[#111]">Avtal & program</h2>
        <p className="text-[12px] text-[#888]">{viewDescriptions[activeView]}</p>
      </div>

      {/* Renewal radar — only in "alla" view */}
      {activeView === "alla" && (
        <div className="rounded-xl border border-[#d0d0d0] bg-gradient-to-r from-[#fff8f0] to-white p-5">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#b8860b]" />
            <h3 className="text-[14px] font-semibold text-[#111]">Förnyelseradar</h3>
          </div>
          <p className="mt-1 text-[12px] text-[#888]">Avtal som löper ut inom 60 dagar</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {renewalRadar.map((r) => (
              <a
                key={r.id}
                href={`#contract/${r.id}`}
                className="group flex items-center justify-between rounded-lg border border-[#e5e5e5] bg-white px-4 py-3 transition-all hover:border-[#b8860b]/40 hover:shadow-sm"
              >
                <div>
                  <span className="text-[12px] font-semibold text-[#111]">{r.customer}</span>
                  <span className="mt-0.5 block text-[11px] text-[#888]">{r.program} · {r.id}</span>
                </div>
                <span className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold ${
                  r.daysLeft <= 14 ? "bg-[#fce8e8] text-[#c44]" : "bg-[#fff3e0] text-[#e65100]"
                }`}>
                  {r.daysLeft} dagar
                </span>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Program summary cards — only in "alla" view */}
      {activeView === "alla" && (
        <div className="grid gap-3 sm:grid-cols-4">
          {programBands.map((band) => (
            <div key={band.label} className="rounded-xl border border-[#d0d0d0] bg-white p-5">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: band.color }} />
                <h3 className="text-[13px] font-semibold text-[#111]">{band.label}</h3>
              </div>
              <div className="mt-3 flex gap-6">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-[#999]">Totalt</p>
                  <p className="text-xl font-extrabold text-[#111]">{band.count}</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-[#999]">Aktiva</p>
                  <p className="text-xl font-extrabold" style={{ color: band.color }}>{band.active}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── View Switcher ── */}
      <div className="flex items-center gap-1 rounded-xl border border-[#d0d0d0] bg-[#f5f5f5] p-1">
        {contractViews.map((v) => (
          <button
            key={v.id}
            onClick={() => onViewChange(v.id)}
            className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-[12px] font-semibold transition-all ${
              activeView === v.id
                ? "bg-white text-[#111] shadow-sm"
                : "text-[#888] hover:text-[#555]"
            }`}
          >
            {v.label}
            <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
              activeView === v.id ? "bg-[#273A60] text-white" : "bg-[#e5e5e5] text-[#888]"
            }`}>
              {v.count}
            </span>
          </button>
        ))}
      </div>

      {/* ── View-specific table ── */}
      {activeView === "alla" && <AllaContractsTable />}
      {activeView === "service-plus" && (
        <ServicePlusTable winterStorage={winterStorage} onToggleStorage={(id) => setWinterStorage((prev) => ({ ...prev, [id]: !prev[id] }))} />
      )}
      {activeView === "warranty-plus" && <WarrantyPlusTable />}
      {activeView === "leasing-plus" && <LeasingPlusTable />}
      {activeView === "hypercare" && <HyperCareTable />}
    </div>
  );
}

/* ── Shared table wrapper ── */
const TH = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <th className={`px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#999] ${className}`}>{children}</th>
);
const TD = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <td className={`px-4 py-3 text-[12px] text-[#555] ${className}`}>{children}</td>
);
const IDLink = ({ id }: { id: string }) => (
  <a href={`#contract/${id}`} className="text-[13px] font-semibold text-[#273A60] hover:underline">{id}</a>
);

const programBadgeColors: Record<string, string> = {
  "Service Plus": "bg-[#e8f5e9] text-[#2e7d32]",
  "Warranty Plus": "bg-[#fff3e0] text-[#e65100]",
  "Lease Plus": "bg-[#e3f2fd] text-[#1565c0]",
  "HyperCare": "bg-[#fce8e8] text-[#c44]",
};

/* ── A) ALLA — overview table ── */
function AllaContractsTable() {
  return (
    <div className="overflow-x-auto rounded-xl border border-[#d0d0d0] bg-white">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-[#e5e5e5] bg-[#fafafa]">
            <TH>Avtals-ID</TH>
            <TH>Program</TH>
            <TH>Kund</TH>
            <TH>Produkt</TH>
            <TH>Start</TH>
            <TH>Slut</TH>
            <TH>Status</TH>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#f0f0f0]">
          {contracts.map((c) => (
            <tr key={c.id} className="transition-colors hover:bg-[#fafafa]">
              <TD><IDLink id={c.id} /></TD>
              <TD>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${programBadgeColors[c.program] ?? "bg-[#f0f3f8] text-[#273A60]"}`}>
                  {c.program}
                </span>
              </TD>
              <TD>{c.customer}</TD>
              <TD>{c.product}</TD>
              <TD>{c.start}</TD>
              <TD>{c.end}</TD>
              <TD><StatusBadge status={c.status} /></TD>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ── B) SERVICE PLUS — with winter storage toggle ── */
function ServicePlusTable({
  winterStorage,
  onToggleStorage,
}: {
  winterStorage: Record<string, boolean>;
  onToggleStorage: (id: string) => void;
}) {
  const rows = contracts.filter((c) => c.program === "Service Plus");

  return (
    <div className="overflow-x-auto rounded-xl border border-[#d0d0d0] bg-white">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-[#e5e5e5] bg-[#fafafa]">
            <TH>Avtals-ID</TH>
            <TH>Kund</TH>
            <TH>Produkt</TH>
            <TH>Start</TH>
            <TH>Slut</TH>
            <TH>Status</TH>
            <TH className="text-center">Vinterförvaring</TH>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#f0f0f0]">
          {rows.map((c) => {
            const stored = winterStorage[c.id] ?? false;
            return (
              <tr key={c.id} className="transition-colors hover:bg-[#fafafa]">
                <TD><IDLink id={c.id} /></TD>
                <TD>{c.customer}</TD>
                <TD>{c.product}</TD>
                <TD>{c.start}</TD>
                <TD>{c.end}</TD>
                <TD><StatusBadge status={c.status} /></TD>
                <TD className="text-center">
                  <button
                    onClick={() => onToggleStorage(c.id)}
                    className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold transition-all"
                    title={stored ? "Markerad som invintrad" : "Ej invintrad"}
                  >
                    <span className={`relative inline-flex h-[18px] w-[32px] shrink-0 items-center rounded-full transition-colors ${
                      stored ? "bg-[#2a9d5c]" : "bg-[#d0d0d0]"
                    }`}>
                      <span className={`inline-block h-[14px] w-[14px] rounded-full bg-white shadow transition-transform ${
                        stored ? "translate-x-[16px]" : "translate-x-[2px]"
                      }`} />
                    </span>
                    <span className={stored ? "text-[#2a9d5c]" : "text-[#999]"}>
                      {stored ? "Invintrad" : "Ej invintrad"}
                    </span>
                  </button>
                </TD>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/* ── C) LEASING PLUS — with sales contact CTA ── */
function LeasingPlusTable() {
  const rows = contracts.filter((c) => c.program === "Lease Plus");

  return (
    <div className="overflow-x-auto rounded-xl border border-[#d0d0d0] bg-white">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-[#e5e5e5] bg-[#fafafa]">
            <TH>Avtals-ID</TH>
            <TH>Kund</TH>
            <TH>Produkt</TH>
            <TH>Start</TH>
            <TH>Säljkontakt</TH>
            <TH>Status</TH>
            <TH className="text-center">Åtgärd</TH>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#f0f0f0]">
          {rows.map((c) => {
            const contact = c.salesContact ?? "—";
            const isDate = /^\d{4}/.test(contact);
            return (
              <tr key={c.id} className="transition-colors hover:bg-[#fafafa]">
                <TD><IDLink id={c.id} /></TD>
                <TD>{c.customer}</TD>
                <TD>{c.product}</TD>
                <TD>{c.start}</TD>
                <TD>
                  {isDate ? (
                    <span className="text-[12px] text-[#555]">{contact}</span>
                  ) : (
                    <span className="rounded-full bg-[#fff3e0] px-2 py-0.5 text-[10px] font-semibold text-[#e65100]">{contact}</span>
                  )}
                </TD>
                <TD><StatusBadge status={c.status} /></TD>
                <TD className="text-center">
                  <button className="rounded-lg border border-[#273A60] px-3 py-1.5 text-[11px] font-semibold text-[#273A60] transition-all hover:bg-[#273A60] hover:text-white">
                    Kontakta kund
                  </button>
                </TD>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/* ── D) WARRANTY PLUS — status and claims ── */
function WarrantyPlusTable() {
  const rows = contracts.filter((c) => c.program === "Warranty Plus");

  const claimColors: Record<string, string> = {
    "Pågående": "bg-[#fff3e0] text-[#e65100]",
    "Avslutad": "bg-[#e8f5e9] text-[#2e7d32]",
  };
  const warrantyColors: Record<string, string> = {
    "Giltig": "bg-[#e8f5e9] text-[#2e7d32]",
    "Löper ut": "bg-[#fff3e0] text-[#e65100]",
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-[#d0d0d0] bg-white">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-[#e5e5e5] bg-[#fafafa]">
            <TH>Avtals-ID</TH>
            <TH>Kund</TH>
            <TH>Produkt</TH>
            <TH>Start</TH>
            <TH>Slut</TH>
            <TH>Garantistatus</TH>
            <TH>Reklamation</TH>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#f0f0f0]">
          {rows.map((c) => (
            <tr key={c.id} className="transition-colors hover:bg-[#fafafa]">
              <TD><IDLink id={c.id} /></TD>
              <TD>{c.customer}</TD>
              <TD>{c.product}</TD>
              <TD>{c.start}</TD>
              <TD>{c.end}</TD>
              <TD>
                {c.warrantyStatus ? (
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${warrantyColors[c.warrantyStatus] ?? "bg-[#f0f0f0] text-[#888]"}`}>
                    {c.warrantyStatus}
                  </span>
                ) : <span className="text-[12px] text-[#ccc]">—</span>}
              </TD>
              <TD>
                {c.claimStatus && c.claimStatus !== "—" ? (
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${claimColors[c.claimStatus] ?? "bg-[#f0f0f0] text-[#888]"}`}>
                    {c.claimStatus}
                  </span>
                ) : <span className="text-[12px] text-[#ccc]">—</span>}
              </TD>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ── E) HYPERCARE — priority and escalation ── */
function HyperCareTable() {
  const rows = contracts.filter((c) => c.program === "HyperCare");

  const hcStatusColors: Record<string, string> = {
    "Åtgärd krävs": "bg-[#fce8e8] text-[#c44]",
    "Uppföljning": "bg-[#fff3e0] text-[#e65100]",
    "Bevakning": "bg-[#e3f2fd] text-[#1565c0]",
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-[#d0d0d0] bg-white">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-[#e5e5e5] bg-[#fafafa]">
            <TH>Case-ID</TH>
            <TH>Kund</TH>
            <TH>Produkt</TH>
            <TH>Skapad</TH>
            <TH>Status</TH>
            <TH>Prioritet</TH>
            <TH className="text-center">Åtgärd</TH>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#f0f0f0]">
          {rows.map((c) => {
            const prio = c.priority ?? ("medium" as Priority);
            return (
              <tr key={c.id} className={`transition-colors hover:bg-[#fafafa] ${prio === "high" ? "bg-[#fff8f8]" : ""}`}>
                <TD><IDLink id={c.id} /></TD>
                <TD>{c.customer}</TD>
                <TD>{c.product}</TD>
                <TD>{c.start}</TD>
                <TD>
                  {c.hyperCareStatus ? (
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${hcStatusColors[c.hyperCareStatus] ?? "bg-[#f0f0f0] text-[#888]"}`}>
                      {c.hyperCareStatus}
                    </span>
                  ) : <StatusBadge status={c.status} />}
                </TD>
                <TD>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${priorityStyles[prio]}`}>
                    {priorityLabels[prio]}
                  </span>
                </TD>
                <TD className="text-center">
                  <button className="rounded-lg border border-[#c44] px-3 py-1.5 text-[11px] font-semibold text-[#c44] transition-all hover:bg-[#c44] hover:text-white">
                    Öppna ärende
                  </button>
                </TD>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   E) TODAY / ACTIONS VIEW
   ═══════════════════════════════════════════════════════ */

function TodayView() {
  const totalItems = actionGroups.reduce((sum, g) => sum + g.items.length, 0);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-[#111]">Att göra idag</h2>
          <p className="text-[12px] text-[#888]">{totalItems} åtgärder väntar — sorterat efter kategori</p>
        </div>
        <button className="rounded-lg border border-[#d0d0d0] bg-white px-3 py-2 text-[12px] font-semibold text-[#555] transition-colors hover:bg-[#f5f5f5]">
          Exportera lista
        </button>
      </div>

      {/* Summary strip */}
      <div className="flex flex-wrap gap-2">
        {actionGroups.map((g) => (
          <span
            key={g.category}
            className="flex items-center gap-1.5 rounded-full border border-[#e5e5e5] bg-white px-3 py-1.5"
          >
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: g.color }} />
            <span className="text-[11px] font-semibold text-[#555]">{g.category}</span>
            <span className="rounded-full bg-[#f0f0f0] px-1.5 py-0.5 text-[10px] font-bold text-[#888]">
              {g.items.length}
            </span>
          </span>
        ))}
      </div>

      {/* Action groups */}
      {actionGroups.map((group) => (
        <section key={group.category} className="rounded-xl border border-[#d0d0d0] bg-white">
          <div className="flex items-center gap-2.5 border-b border-[#f0f0f0] px-5 py-3.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: group.color }} />
            <h3 className="text-[13px] font-semibold text-[#111]">{group.category}</h3>
            <span className="rounded-full bg-[#f0f0f0] px-1.5 py-0.5 text-[10px] font-bold text-[#888]">
              {group.items.length}
            </span>
          </div>
          <ul className="divide-y divide-[#f0f0f0]">
            {group.items.map((item) => (
              <li key={item.label}>
                <a href={item.href} className="flex items-center justify-between px-5 py-3 transition-colors hover:bg-[#fafafa]">
                  <div>
                    <span className="text-[13px] font-medium text-[#333]">{item.label}</span>
                    <span className="mt-0.5 block text-[11px] text-[#888]">{item.detail}</span>
                  </div>
                  <span className="shrink-0 rounded-lg border border-[#d0d0d0] px-3 py-1.5 text-[11px] font-semibold text-[#273A60] transition-colors hover:bg-[#273A60] hover:text-white">
                    Åtgärda →
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
