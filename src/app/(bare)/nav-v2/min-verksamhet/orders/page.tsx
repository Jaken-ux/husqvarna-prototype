"use client";

import { useState, Fragment } from "react";
import NavHeader from "../../NavHeader";
import Breadcrumb from "../../Breadcrumb";

/* ═══════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════ */

type Priority = "high" | "medium" | "low";
type Source = "ServiceHub" | "Webshop" | "Telefon" | "EDI";
type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "returned" | "draft" | "backorder";

type OrderItem = {
  name: string;
  partNr: string;
  system: string;
  qty: number;
  unitPrice: number;
};

type Order = {
  id: string;
  customer: string;
  source: Source;
  priority: Priority;
  status: OrderStatus;
  items: OrderItem[];
  orderDate: string;
  expectedDate?: string;
  deliveredDate?: string;
  technician?: string;
  serviceTicket?: string;
  trackingNr?: string;
  returnReason?: string;
};

/* ═══════════════════════════════════════════════════════
   MOCK DATA
   ═══════════════════════════════════════════════════════ */

const orders: Order[] = [
  // ── Shopping Cart / Pending ──
  {
    id: "SR-2026-0156",
    customer: "Swedish Motors AB",
    source: "ServiceHub",
    priority: "high",
    status: "pending",
    items: [
      { name: "Cutting Disc Assembly", partNr: "967 62 37-01", system: "Cutting System", qty: 2, unitPrice: 890 },
      { name: "Motor Housing", partNr: "967 62 37-02", system: "Drive System", qty: 1, unitPrice: 2450 },
    ],
    orderDate: "2026-03-12",
    expectedDate: "2026-03-15",
    technician: "Erik Tekniker",
    serviceTicket: "TICKET-2026-1199",
  },
  {
    id: "SR-2026-0157",
    customer: "Automower Service Stockholm",
    source: "ServiceHub",
    priority: "medium",
    status: "pending",
    items: [
      { name: "Wheel Motor Assembly", partNr: "585 44 77-01", system: "Drive System", qty: 1, unitPrice: 1850 },
      { name: "Charging Station PCB", partNr: "585 02 99-03", system: "Electrical", qty: 1, unitPrice: 1290 },
      { name: "Boundary Wire 500m", partNr: "585 02 68-01", system: "Installation", qty: 2, unitPrice: 690 },
    ],
    orderDate: "2026-03-13",
    expectedDate: "2026-03-18",
    technician: "Anna Lindberg",
    serviceTicket: "TICKET-2026-1205",
  },
  {
    id: "WEB-2026-0891",
    customer: "Grönyta Entreprenad AB",
    source: "Webshop",
    priority: "low",
    status: "pending",
    items: [
      { name: "Husqvarna X-CUT SP33G", partNr: "585 40 46-84", system: "Svärd & kedjor", qty: 20, unitPrice: 349 },
    ],
    orderDate: "2026-03-14",
  },
  // ── Orderutkast ──
  {
    id: "DRAFT-2026-004",
    customer: "Landskapet Trädgård AB",
    source: "Webshop",
    priority: "low",
    status: "draft",
    items: [
      { name: "Husqvarna Automower 430X NERA", partNr: "585 57 28-01", system: "Robotgräsklippare", qty: 2, unitPrice: 29990 },
    ],
    orderDate: "2026-03-10",
  },
  // ── Aktiva / processing ──
  {
    id: "ORD-2026-3341",
    customer: "Stenungsunds kommun",
    source: "EDI",
    priority: "high",
    status: "processing",
    items: [
      { name: "Husqvarna P 525DX", partNr: "967 32 57-01", system: "Frontrotorklippare", qty: 1, unitPrice: 189000 },
    ],
    orderDate: "2026-03-08",
    expectedDate: "2026-03-22",
  },
  {
    id: "ORD-2026-3338",
    customer: "Grönyta Entreprenad AB",
    source: "Telefon",
    priority: "medium",
    status: "processing",
    items: [
      { name: "Husqvarna 535RXT röjsåg", partNr: "966 60 43-02", system: "Röjsågar", qty: 3, unitPrice: 7490 },
      { name: "Husqvarna 525iB Mark II", partNr: "967 91 57-12", system: "Lövblåsar", qty: 2, unitPrice: 4990 },
    ],
    orderDate: "2026-03-06",
    expectedDate: "2026-03-20",
  },
  // ── Backorder ──
  {
    id: "ORD-2026-3290",
    customer: "JL Maskin & Trädgård",
    source: "ServiceHub",
    priority: "high",
    status: "backorder",
    items: [
      { name: "ECU Control Board v3", partNr: "585 69 82-05", system: "Electrical", qty: 1, unitPrice: 4200 },
    ],
    orderDate: "2026-02-28",
    expectedDate: "2026-04-01",
    serviceTicket: "TICKET-2026-1088",
  },
  // ── Levererade ──
  {
    id: "ORD-2026-3280",
    customer: "Swedish Motors AB",
    source: "Webshop",
    priority: "low",
    status: "delivered",
    items: [
      { name: "Air Filter Kit Pro", partNr: "575 29 34-01", system: "Engine", qty: 5, unitPrice: 189 },
      { name: "Spark Plug NGK CMR6H", partNr: "503 23 51-11", system: "Engine", qty: 10, unitPrice: 59 },
    ],
    orderDate: "2026-03-01",
    deliveredDate: "2026-03-10",
    trackingNr: "SE-DHL-29384756",
  },
  {
    id: "ORD-2026-3255",
    customer: "Automower Service Stockholm",
    source: "EDI",
    priority: "medium",
    status: "delivered",
    items: [
      { name: "Husqvarna Automower 315X", partNr: "585 57 26-01", system: "Robotgräsklippare", qty: 2, unitPrice: 17990 },
    ],
    orderDate: "2026-02-20",
    deliveredDate: "2026-03-05",
    trackingNr: "SE-POSTNORD-884756",
  },
  // ── Returer ──
  {
    id: "RMA-2026-012",
    customer: "JL Maskin & Trädgård",
    source: "ServiceHub",
    priority: "medium",
    status: "returned",
    items: [
      { name: "Wheel Motor Assembly (defekt)", partNr: "585 44 77-01", system: "Drive System", qty: 1, unitPrice: 1850 },
    ],
    orderDate: "2026-02-15",
    returnReason: "Fabrikationsfel — motor låser sig efter <10h drift",
  },
];

/* ═══════════════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════════════ */

const fmt = (n: number) =>
  n.toLocaleString("sv-SE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const statusConfig: Record<OrderStatus, { label: string; bg: string; text: string }> = {
  pending: { label: "Väntande", bg: "bg-[#fff3e0]", text: "text-[#e65100]" },
  processing: { label: "Aktiv", bg: "bg-[#e3f2fd]", text: "text-[#1565c0]" },
  shipped: { label: "Skickad", bg: "bg-[#e8f5e9]", text: "text-[#2e7d32]" },
  delivered: { label: "Levererad", bg: "bg-[#e8f5e9]", text: "text-[#2e7d32]" },
  returned: { label: "Retur", bg: "bg-[#fce8e8]", text: "text-[#c62828]" },
  draft: { label: "Utkast", bg: "bg-[#f5f5f5]", text: "text-[#888]" },
  backorder: { label: "Restorder", bg: "bg-[#fff3e0]", text: "text-[#e65100]" },
};

const priorityConfig: Record<Priority, { label: string; bg: string; text: string }> = {
  high: { label: "HÖG", bg: "bg-[#fce8e8]", text: "text-[#c62828]" },
  medium: { label: "MEDEL", bg: "bg-[#fff3e0]", text: "text-[#e65100]" },
  low: { label: "LÅG", bg: "bg-[#f5f5f5]", text: "text-[#888]" },
};

const sourceConfig: Record<Source, { bg: string; text: string }> = {
  ServiceHub: { bg: "bg-[#273A60]", text: "text-white" },
  Webshop: { bg: "bg-[#e3f2fd]", text: "text-[#1565c0]" },
  Telefon: { bg: "bg-[#f5f5f5]", text: "text-[#666]" },
  EDI: { bg: "bg-[#e8f5e9]", text: "text-[#2e7d32]" },
};

type Tab = "cart" | "active" | "delivered" | "returns";
const tabs: { id: Tab; label: string; filter: (o: Order) => boolean }[] = [
  { id: "cart", label: "Varukorg", filter: (o) => o.status === "pending" || o.status === "draft" },
  { id: "active", label: "Aktiva order", filter: (o) => o.status === "processing" || o.status === "backorder" },
  { id: "delivered", label: "Levererade", filter: (o) => o.status === "delivered" || o.status === "shipped" },
  { id: "returns", label: "Returer", filter: (o) => o.status === "returned" },
];

/* ═══════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════ */

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState<Tab>("cart");
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set(orders.map((o) => o.id)));

  const toggleOrder = (id: string) => {
    setExpandedOrders((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const tabCounts = tabs.map((t) => ({
    ...t,
    count: orders.filter(t.filter).length,
  }));

  const filtered = orders.filter(tabs.find((t) => t.id === activeTab)!.filter);

  // Summary counts
  const cartCount = orders.filter((o) => o.status === "pending" || o.status === "draft").length;
  const activeCount = orders.filter((o) => o.status === "processing" || o.status === "backorder").length;
  const deliveredCount = orders.filter((o) => o.status === "delivered" || o.status === "shipped").length;
  const returnCount = orders.filter((o) => o.status === "returned").length;

  const summaryCards = [
    {
      label: "Varukorg",
      count: cartCount,
      color: "text-[#e65100]",
      iconBg: "bg-[#fff3e0]",
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#e65100" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 3h1.5l1 10h9l1.5-7H6" />
          <circle cx="8" cy="16" r="1.5" />
          <circle cx="14" cy="16" r="1.5" />
        </svg>
      ),
    },
    {
      label: "Aktiva order",
      count: activeCount,
      color: "text-[#1565c0]",
      iconBg: "bg-[#e3f2fd]",
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#1565c0" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4l2 2M16 4l-2 2M10 2v3" />
          <circle cx="10" cy="11" r="6" />
          <path d="M10 8v3l2 1" />
        </svg>
      ),
    },
    {
      label: "Levererade",
      count: deliveredCount,
      color: "text-[#2e7d32]",
      iconBg: "bg-[#e8f5e9]",
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#2e7d32" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="10" cy="10" r="7" />
          <path d="M7 10l2 2 4-4" />
        </svg>
      ),
    },
    {
      label: "Returer",
      count: returnCount,
      color: "text-[#c62828]",
      iconBg: "bg-[#fce8e8]",
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#c62828" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="10" cy="10" r="7" />
          <path d="M7 7l6 6M13 7l-6 6" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <NavHeader />

      <main className="mx-auto max-w-[1320px] px-6 py-6">
        {/* ── Breadcrumb ── */}
        <Breadcrumb
          items={[
            { label: "Min verksamhet", href: "/nav-v2/min-verksamhet" },
            { label: "Orderhantering", href: "/nav-v2/min-verksamhet/orders" },
          ]}
        />

        {/* ── Page header ── */}
        <div className="mt-5 flex items-end justify-between">
          <div>
            <h1 className="text-[26px] font-bold text-[#111]">Orderhantering</h1>
            <p className="mt-1 max-w-xl text-[13px] leading-relaxed text-[#888]">
              Samlad vy för alla beställningar, leveranser, returer och utkast.
            </p>
          </div>
          <button className="rounded-lg bg-[#273A60] px-5 py-2.5 text-[12px] font-semibold text-white transition-colors hover:bg-[#1a2d4d]">
            Bulkbeställning
          </button>
        </div>

        {/* ── Summary cards ── */}
        <div className="mt-6 grid gap-4 sm:grid-cols-4">
          {summaryCards.map((card) => (
            <div
              key={card.label}
              className="flex items-center gap-4 rounded-xl border border-[#e0e0e0] bg-white px-5 py-4"
            >
              <span className={`flex h-10 w-10 items-center justify-center rounded-lg ${card.iconBg}`}>
                {card.icon}
              </span>
              <div>
                <span className="text-[12px] font-medium text-[#999]">{card.label}</span>
                <span className={`mt-0.5 block text-[22px] font-bold ${card.color}`}>
                  {card.count}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ── Content card ── */}
        <div className="mt-6 rounded-xl border border-[#e0e0e0] bg-white">
          {/* Tabs */}
          <div className="border-b border-[#e5e5e5] px-6">
            <nav className="-mb-px flex gap-0 overflow-x-auto">
              {tabCounts.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`relative shrink-0 border-b-2 px-5 py-3.5 text-[13px] font-semibold transition-colors ${
                    activeTab === t.id
                      ? "border-[#273A60] text-[#273A60]"
                      : "border-transparent text-[#888] hover:text-[#555]"
                  }`}
                >
                  {t.label}{" "}
                  <span
                    className={`ml-1 text-[12px] ${
                      activeTab === t.id ? "text-[#273A60]" : "text-[#bbb]"
                    }`}
                  >
                    ({t.count})
                  </span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab header */}
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-2">
              <h2 className="text-[15px] font-bold text-[#111]">
                {tabs.find((t) => t.id === activeTab)!.label}
              </h2>
            </div>
            <span className="text-[12px] text-[#999]">
              {activeTab === "cart" && "Artikelförfrågningar från ServiceHub, butik och anställda"}
              {activeTab === "active" && "Order under behandling och restorder"}
              {activeTab === "delivered" && "Slutförda leveranser"}
              {activeTab === "returns" && "Returer och reklamationer (RMA)"}
            </span>
          </div>

          {/* Orders */}
          <div className="divide-y divide-[#f0f0f0]">
            {filtered.length === 0 && (
              <div className="px-6 py-12 text-center text-[13px] text-[#999]">
                Inga order att visa i denna kategori.
              </div>
            )}

            {filtered.map((order) => {
              const isExpanded = expandedOrders.has(order.id);
              const orderTotal = order.items.reduce((s, i) => s + i.qty * i.unitPrice, 0);
              const st = statusConfig[order.status];
              const pr = priorityConfig[order.priority];
              const src = sourceConfig[order.source];

              return (
                <div key={order.id} className="px-6">
                  {/* Order header row */}
                  <button
                    onClick={() => toggleOrder(order.id)}
                    className="flex w-full items-center gap-4 py-4 text-left transition-colors"
                  >
                    {/* Expand icon */}
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      className={`shrink-0 text-[#ccc] transition-transform ${
                        isExpanded ? "rotate-90" : ""
                      }`}
                    >
                      <path d="M6 4l4 4-4 4" />
                    </svg>

                    {/* Order ID + customer */}
                    <div className="min-w-0 flex-1">
                      <span className="text-[14px] font-bold text-[#111]">{order.id}</span>
                      <span className="ml-2 text-[13px] text-[#888]">{order.customer}</span>
                    </div>

                    {/* Badges */}
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${src.bg} ${src.text}`}
                      >
                        {order.source}
                      </span>
                      {order.priority !== "low" && (
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${pr.bg} ${pr.text}`}
                        >
                          {pr.label}
                        </span>
                      )}
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${st.bg} ${st.text}`}
                      >
                        {st.label}
                      </span>
                    </div>
                  </button>

                  {/* Expanded content */}
                  {isExpanded && (
                    <div className="pb-5 pl-8">
                      <div className="grid gap-5 lg:grid-cols-[1fr_280px]">
                        {/* Left: Order items */}
                        <div>
                          <span className="mb-2 block text-[11px] font-semibold uppercase tracking-wide text-[#bbb]">
                            Orderrader
                          </span>
                          <div className="space-y-1.5">
                            {order.items.map((item, idx) => (
                              <div
                                key={idx}
                                className="flex items-center justify-between rounded-lg border border-[#f0f0f0] bg-[#fafafa] px-4 py-3"
                              >
                                <div>
                                  <span className="text-[13px] font-medium text-[#222]">
                                    {item.name}
                                  </span>
                                  <span className="mt-0.5 block text-[11px] text-[#aaa]">
                                    Art. #{item.partNr} · {item.system}
                                  </span>
                                </div>
                                <div className="text-right">
                                  <span className="text-[13px] font-semibold text-[#111]">
                                    {item.qty}x {fmt(item.unitPrice)} kr
                                  </span>
                                  <span className="mt-0.5 block text-[11px] text-[#aaa]">
                                    {fmt(item.qty * item.unitPrice)} kr
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Right: Order info */}
                        <div className="rounded-lg border border-[#f0f0f0] bg-[#fafafa] p-4">
                          <span className="mb-3 block text-[11px] font-semibold uppercase tracking-wide text-[#bbb]">
                            Orderinformation
                          </span>
                          <dl className="space-y-2 text-[13px]">
                            <div className="flex justify-between">
                              <dt className="text-[#888]">Totalt:</dt>
                              <dd className="font-bold text-[#111]">{fmt(orderTotal)} kr</dd>
                            </div>
                            <div className="flex justify-between">
                              <dt className="text-[#888]">Orderdatum:</dt>
                              <dd className="text-[#333]">{order.orderDate}</dd>
                            </div>
                            {order.expectedDate && (
                              <div className="flex justify-between">
                                <dt className="text-[#888]">Förväntas:</dt>
                                <dd className="text-[#333]">{order.expectedDate}</dd>
                              </div>
                            )}
                            {order.deliveredDate && (
                              <div className="flex justify-between">
                                <dt className="text-[#888]">Levererad:</dt>
                                <dd className="text-[#2e7d32] font-medium">{order.deliveredDate}</dd>
                              </div>
                            )}
                            {order.technician && (
                              <div className="flex justify-between">
                                <dt className="text-[#888]">Tekniker:</dt>
                                <dd className="text-[#333]">{order.technician}</dd>
                              </div>
                            )}
                            {order.serviceTicket && (
                              <div className="flex justify-between">
                                <dt className="text-[#888]">Ärende:</dt>
                                <dd>
                                  <a href="#" className="font-medium text-[#273A60] hover:underline">
                                    {order.serviceTicket}
                                  </a>
                                </dd>
                              </div>
                            )}
                            {order.trackingNr && (
                              <div className="flex justify-between">
                                <dt className="text-[#888]">Spårning:</dt>
                                <dd>
                                  <a href="#" className="font-medium text-[#273A60] hover:underline">
                                    {order.trackingNr}
                                  </a>
                                </dd>
                              </div>
                            )}
                            {order.returnReason && (
                              <div className="mt-2 rounded-md bg-[#fce8e8] px-3 py-2 text-[12px] text-[#c62828]">
                                <span className="font-semibold">Returorsak:</span>{" "}
                                {order.returnReason}
                              </div>
                            )}
                          </dl>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="mt-4 flex items-center gap-2">
                        {order.status === "pending" && (
                          <button className="rounded-lg bg-[#273A60] px-4 py-2 text-[12px] font-semibold text-white transition-colors hover:bg-[#1a2d4d]">
                            Lägg i order
                          </button>
                        )}
                        {order.status === "draft" && (
                          <button className="rounded-lg bg-[#273A60] px-4 py-2 text-[12px] font-semibold text-white transition-colors hover:bg-[#1a2d4d]">
                            Slutför beställning
                          </button>
                        )}
                        {order.status === "processing" && (
                          <button className="rounded-lg border border-[#d0d0d0] px-4 py-2 text-[12px] font-medium text-[#555] transition-colors hover:border-[#273A60]/30 hover:text-[#273A60]">
                            Kontakta om status
                          </button>
                        )}
                        {order.status === "delivered" && (
                          <>
                            <button className="rounded-lg border border-[#d0d0d0] px-4 py-2 text-[12px] font-medium text-[#555] transition-colors hover:border-[#273A60]/30 hover:text-[#273A60]">
                              Beställ igen
                            </button>
                            <button className="rounded-lg border border-[#d0d0d0] px-4 py-2 text-[12px] font-medium text-[#555] transition-colors hover:border-[#c62828]/30 hover:text-[#c62828]">
                              Initiera retur
                            </button>
                          </>
                        )}
                        {order.status === "returned" && (
                          <button className="rounded-lg border border-[#d0d0d0] px-4 py-2 text-[12px] font-medium text-[#555] transition-colors hover:border-[#273A60]/30 hover:text-[#273A60]">
                            Visa RMA-status
                          </button>
                        )}
                        {order.status === "backorder" && (
                          <button className="rounded-lg border border-[#d0d0d0] px-4 py-2 text-[12px] font-medium text-[#555] transition-colors hover:border-[#273A60]/30 hover:text-[#273A60]">
                            Visa leveransuppdatering
                          </button>
                        )}
                        {/* Eye icon for all */}
                        <button
                          className="ml-auto flex h-8 w-8 items-center justify-center rounded-lg border border-[#e5e5e5] text-[#bbb] transition-colors hover:border-[#273A60]/30 hover:text-[#273A60]"
                          title="Förhandsgranska"
                        >
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" />
                            <circle cx="8" cy="8" r="2" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
