"use client";

type Action = {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
};

type ActionGroup = {
  heading: string;
  actions: Action[];
};

/* ── SVG icon helpers ── */

const IconUpload = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 14v2a2 2 0 002 2h10a2 2 0 002-2v-2" />
    <polyline points="6 7 10 3 14 7" />
    <line x1="10" y1="3" x2="10" y2="13" />
  </svg>
);

const IconExport = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 14v2a2 2 0 002 2h10a2 2 0 002-2v-2" />
    <polyline points="6 10 10 14 14 10" />
    <line x1="10" y1="14" x2="10" y2="3" />
  </svg>
);

const IconRegister = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="14" height="14" rx="2" />
    <line x1="7" y1="10" x2="13" y2="10" />
    <line x1="10" y1="7" x2="10" y2="13" />
  </svg>
);

const IconExploded = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="10" cy="10" r="2" />
    <path d="M10 2v4M10 14v4M2 10h4M14 10h4" />
    <path d="M4.93 4.93l2.83 2.83M12.24 12.24l2.83 2.83M4.93 15.07l2.83-2.83M12.24 7.76l2.83-2.83" />
  </svg>
);

const IconWarranty = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 2l6 3v5c0 3.5-2.5 6.5-6 8-3.5-1.5-6-4.5-6-8V5l6-3z" />
    <polyline points="7.5 10 9.5 12 13 8" />
  </svg>
);

const IconHyperCare = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="10 2 12 8 18 8 13 12 15 18 10 14 5 18 7 12 2 8 8 8" />
  </svg>
);

const groups: ActionGroup[] = [
  {
    heading: "Order",
    actions: [
      {
        title: "Orderimport",
        description: "Ladda upp och behandla bulkorder",
        href: "#",
        icon: <IconUpload />,
      },
      {
        title: "Produktdataexport",
        description: "Exportera produktdata och dokumentation",
        href: "#",
        icon: <IconExport />,
      },
    ],
  },
  {
    heading: "Produkter",
    actions: [
      {
        title: "Produktregistrering",
        description: "Registrera nya produkter i återförsäljarlagret",
        href: "#",
        icon: <IconRegister />,
      },
      {
        title: "Sprängskiss",
        description: "Sök modell för att visa reservdelsuppdelning",
        href: "#exploded-view",
        icon: <IconExploded />,
      },
    ],
  },
  {
    heading: "Support",
    actions: [
      {
        title: "Webbgaranti",
        description: "Skicka in eller kontrollera garantiärenden",
        href: "#",
        icon: <IconWarranty />,
      },
      {
        title: "HyperCare",
        description: "Prioriterad support & eskaleringar",
        href: "#",
        icon: <IconHyperCare />,
      },
    ],
  },
];

export default function QuickActions() {
  const allActions = groups.flatMap((g) =>
    g.actions.map((a) => ({ ...a, group: g.heading }))
  );

  return (
    <section
      aria-labelledby="quick-actions-heading"
      className="flex h-full flex-col rounded-2xl border border-[#d0d0d0] bg-white"
    >
      <h2
        id="quick-actions-heading"
        className="border-b border-[#e5e5e5] px-5 py-4 text-lg font-semibold text-[#111]"
      >
        Snabbåtgärder
      </h2>
      <div className="flex flex-1 flex-col divide-y divide-[#e5e5e5]">
        {allActions.map((a) => (
          <a
            key={a.title}
            href={a.href}
            className="group flex items-center gap-3.5 px-5 py-3.5 transition-colors hover:bg-[#fafafa] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#273A60]"
          >
            <span className="shrink-0 rounded-lg bg-[#f5f5f5] p-2 text-[#555] transition-colors group-hover:bg-[#eee] group-hover:text-[#111]">
              {a.icon}
            </span>
            <div className="min-w-0 flex-1">
              <span className="text-sm font-semibold text-[#111]">
                {a.title}
              </span>
              <span className="mt-0.5 block truncate text-[12px] text-[#888]">
                {a.description}
              </span>
            </div>
            <span className="shrink-0 text-sm font-medium text-[#999] group-hover:text-[#273A60]">
              →
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
