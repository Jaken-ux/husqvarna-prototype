"use client";

import { useState } from "react";

type StatusVariant = "shipped" | "waiting" | "action" | "registered" | "open";
type TimePeriod = "7d" | "30d" | "all";

type ActivityItem = {
  title: string;
  timestamp: string;
  status: string;
  variant: StatusVariant;
};

type ActivityGroup = {
  label: string;
  viewAllHref: string;
  items: ActivityItem[];
};

const statusStyles: Record<StatusVariant, string> = {
  shipped: "bg-[#e6f4ea] text-[#2a9d5c]",
  waiting: "bg-[#fff8e1] text-[#b8860b]",
  action: "bg-[#fce8e8] text-[#c44]",
  registered: "bg-[#e8eaf6] text-[#273A60]",
  open: "bg-[#f0f0f0] text-[#777]",
};

const groups: ActivityGroup[] = [
  {
    label: "Senaste orderuppdateringar",
    viewAllHref: "#orders",
    items: [
      { title: "Order #38291 — skickad", timestamp: "Idag 09:12", status: "Skickad", variant: "shipped" },
      { title: "Order #38284 — inväntar lager", timestamp: "Idag 08:45", status: "Väntar", variant: "waiting" },
      { title: "Order #38270 — bekräftelse krävs", timestamp: "Igår 16:30", status: "Åtgärd krävs", variant: "action" },
    ],
  },
  {
    label: "Senaste garantiärenden",
    viewAllHref: "#warranty",
    items: [
      { title: "Ärende #W-1022 — 346XP kedjedefekt", timestamp: "Idag 10:05", status: "Öppet", variant: "open" },
      { title: "Ärende #W-1019 — batteribyte godkänt", timestamp: "Igår 14:20", status: "Åtgärd krävs", variant: "action" },
      { title: "Ärende #W-1015 — löst", timestamp: "2 mar", status: "Klart", variant: "shipped" },
    ],
  },
  {
    label: "Senaste produktregistreringar",
    viewAllHref: "#registrations",
    items: [
      { title: "Automower 435X AWD — SN 2024-10582", timestamp: "Idag 08:30", status: "Registrerad", variant: "registered" },
      { title: "535RXT — SN 2024-09871", timestamp: "Igår 11:00", status: "Registrerad", variant: "registered" },
      { title: "T540XP — SN 2024-09654", timestamp: "1 mar", status: "Väntar", variant: "waiting" },
    ],
  },
];

const periods: { value: TimePeriod; label: string }[] = [
  { value: "7d", label: "7 dagar" },
  { value: "30d", label: "30 dagar" },
  { value: "all", label: "Alla" },
];

export default function RecentActivity() {
  const [period, setPeriod] = useState<TimePeriod>("7d");

  return (
    <section aria-labelledby="recent-heading">
      <div className="flex items-center justify-between">
        <h2 id="recent-heading" className="text-lg font-semibold text-[#111]">
          Senaste aktivitet
        </h2>

        {/* Time period segment control */}
        <div
          className="flex rounded-lg border border-[#d0d0d0] bg-[#f5f5f5] p-0.5"
          role="tablist"
          aria-label="Tidsperiod"
        >
          {periods.map((p) => (
            <button
              key={p.value}
              role="tab"
              aria-selected={period === p.value}
              onClick={() => setPeriod(p.value)}
              className={`rounded-md px-3 py-1 text-[12px] font-medium transition-colors ${
                period === p.value
                  ? "bg-white text-[#111] shadow-sm"
                  : "text-[#888] hover:text-[#555]"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {groups.map((group) => (
          <div
            key={group.label}
            className="rounded-xl border border-[#d0d0d0] bg-white"
          >
            <div className="flex items-center justify-between border-b border-[#e5e5e5] px-5 py-3">
              <h3 className="text-[13px] font-semibold text-[#555]">
                {group.label}
              </h3>
              <a
                href={group.viewAllHref}
                className="text-[11px] font-semibold text-[#273A60] transition-colors hover:text-[#1a2d4d]"
              >
                Visa alla
              </a>
            </div>
            <ul className="divide-y divide-[#e5e5e5]">
              {group.items.map((item) => (
                <li key={item.title} className="px-5 py-3">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-medium text-[#222]">
                      {item.title}
                    </p>
                    <span
                      className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                        statusStyles[item.variant]
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <p className="mt-0.5 text-[12px] text-[#aaa]">
                    {item.timestamp}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
