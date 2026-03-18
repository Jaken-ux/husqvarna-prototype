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
    href: "#orders?status=pending",
  },
  {
    label: "Restorder",
    value: 6,
    helper: "3 kritiska",
    cta: "Visa lista",
    statusColor: "red",
    trend: { direction: "up", text: "+1 denna vecka" },
    href: "#orders?status=backorder",
  },
  {
    label: "Nya fakturor",
    value: 8,
    helper: "Sedan senaste login",
    cta: "Visa lista",
    statusColor: "neutral",
    href: "#invoices?status=new",
  },
  {
    label: "Leveranser denna vecka",
    value: 12,
    helper: "Nästa: Imorgon 08:00",
    cta: "Visa lista",
    statusColor: "green",
    trend: { direction: "down", text: "-2 mot förra veckan" },
    href: "#deliveries?period=week",
  },
  {
    label: "Att hantera",
    value: 3,
    helper: "Inkl. HyperCare-ärenden",
    cta: "Granska alla",
    statusColor: "red",
    href: "#alerts",
  },
];

export default function DashboardWidgets() {
  return (
    <section aria-labelledby="dashboard-heading">
      <h2 id="dashboard-heading" className="sr-only">
        Översikt
      </h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
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
    </section>
  );
}
