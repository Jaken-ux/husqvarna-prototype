"use client";

type StatusColor = "green" | "amber" | "red" | "neutral";

type Widget = {
  label: string;
  value: number;
  helper: string;
  cta: string;
  statusColor: StatusColor;
  trend?: { direction: "up" | "down"; text: string };
  href: string;
};

const statusColorMap: Record<StatusColor, string> = {
  green: "border-l-[#2a9d5c]",
  amber: "border-l-[#b8860b]",
  red: "border-l-[#c44]",
  neutral: "border-l-[#ccc]",
};

const widgets: Widget[] = [
  {
    label: "Pågående order",
    value: 14,
    helper: "Sedan senaste login",
    cta: "Visa lista",
    statusColor: "amber",
    trend: { direction: "up", text: "+3 sedan igår" },
    href: "/nav-v2/min-verksamhet/orders",
  },
  {
    label: "Restorder",
    value: 6,
    helper: "3 kritiska",
    cta: "Visa lista",
    statusColor: "red",
    trend: { direction: "up", text: "+1 denna vecka" },
    href: "/nav-v2/min-verksamhet/orders",
  },
  {
    label: "Nya fakturor",
    value: 8,
    helper: "Sedan senaste login",
    cta: "Visa fakturor",
    statusColor: "neutral",
    href: "/nav-v2/min-verksamhet/fakturor",
  },
  {
    label: "Leveranser denna vecka",
    value: 12,
    helper: "Nästa: Imorgon 08:00",
    cta: "Visa leveranser",
    statusColor: "green",
    trend: { direction: "down", text: "-2 mot förra veckan" },
    href: "/nav-v2/min-verksamhet/orders",
  },
  {
    label: "Att hantera",
    value: 3,
    helper: "Inkl. HyperCare-ärenden",
    cta: "Granska alla",
    statusColor: "red",
    href: "/nav-v2/min-verksamhet/workspace",
  },
];

const statusDotMap: Record<StatusColor, string> = {
  green: "bg-[#2a9d5c]",
  amber: "bg-[#b8860b]",
  red: "bg-[#c44]",
  neutral: "bg-[#ccc]",
};

export default function DashboardWidgets() {
  return (
    <section aria-labelledby="dashboard-heading">
      <h2 id="dashboard-heading" className="sr-only">
        Översikt
      </h2>

      {/* Desktop — card grid */}
      <div className="hidden sm:grid sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
        {widgets.map((w) => (
          <a
            key={w.label}
            href={w.href}
            className={`group flex flex-col rounded-xl border border-[#d0d0d0] border-l-[3px] bg-white p-5 transition-all hover:border-[#ccc] hover:shadow-md ${statusColorMap[w.statusColor]}`}
          >
            <p className="text-[12px] font-semibold uppercase tracking-widest text-[#999]">
              {w.label}
            </p>
            <p className="mt-2 text-[2rem] font-extrabold leading-none text-[#111]">
              {w.value}
            </p>
            <p className="mt-2 text-[12px] text-[#888]">{w.helper}</p>
            {w.trend && (
              <p
                className={`mt-1 text-[11px] font-medium ${
                  w.trend.direction === "up"
                    ? "text-[#c44]"
                    : "text-[#2a9d5c]"
                }`}
              >
                {w.trend.direction === "up" ? "↑" : "↓"} {w.trend.text}
              </p>
            )}
            <span className="mt-3 text-[11px] font-semibold text-[#273A60] opacity-0 transition-opacity group-hover:opacity-100">
              {w.cta} →
            </span>
          </a>
        ))}
      </div>

      {/* Mobile — compact list */}
      <div className="sm:hidden rounded-xl border border-[#d0d0d0] bg-white divide-y divide-[#f0f0f0]">
        {widgets.map((w) => (
          <a
            key={w.label}
            href={w.href}
            className="flex items-center gap-3 px-4 py-2.5 active:bg-[#fafafa]"
          >
            {/* Status dot */}
            <span className={`h-2 w-2 shrink-0 rounded-full ${statusDotMap[w.statusColor]}`} />

            {/* Label */}
            <span className="flex-1 text-[12px] font-semibold text-[#555]">{w.label}</span>

            {/* Value */}
            <span className="text-[18px] font-extrabold text-[#111] tabular-nums">{w.value}</span>

            {/* Trend */}
            {w.trend ? (
              <span className={`w-16 text-right text-[10px] font-semibold ${
                w.trend.direction === "up" ? "text-[#c44]" : "text-[#2a9d5c]"
              }`}>
                {w.trend.direction === "up" ? "↑" : "↓"} {w.trend.text.split(" ")[0]}
              </span>
            ) : (
              <span className="w-16" />
            )}

            {/* Chevron */}
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#ccc" strokeWidth="1.8" strokeLinecap="round" className="shrink-0">
              <path d="M6 4l4 4-4 4" />
            </svg>
          </a>
        ))}
      </div>
    </section>
  );
}
