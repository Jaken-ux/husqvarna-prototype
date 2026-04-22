const items = [
  {
    label: "Pris & tillgänglighet",
    desc: "Återförsäljarpriser och leveranstider",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="16" height="12" rx="2" />
        <path d="M2 8h16" />
        <path d="M6 13h3" />
      </svg>
    ),
  },
  {
    label: "Lagerstatus",
    desc: "Realtidsstatus för lager och leveranstider",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="7" width="14" height="10" rx="2" />
        <path d="M7 7V5a3 3 0 016 0v2" />
      </svg>
    ),
  },
  {
    label: "Digitala verktyg",
    desc: "Fleet Services, Connect Pro och planering",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="14" height="14" rx="2" />
        <path d="M3 8h14M8 3v14" />
      </svg>
    ),
  },
];

export default function QuickAccessSection() {
  return (
    <section aria-labelledby="quick-heading" className="mt-12">
      <h2 id="quick-heading" className="text-[15px] font-semibold text-[#111]">
        Snabbåtkomst
      </h2>
      <p className="mt-1 text-[12px] text-[#999]">Operativa verktyg och prisuppgifter</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {items.map((item) => (
          <a
            key={item.label}
            href="#"
            className="group flex items-center gap-3.5 rounded-xl border border-[#e0e0e0] bg-[#fafafa] px-4 py-3.5 transition-all hover:border-[#273A60]/30 hover:bg-white hover:shadow-sm"
          >
            <span className="shrink-0 rounded-lg bg-white p-2 text-[#273A60] shadow-sm transition-colors group-hover:bg-[#273A60] group-hover:text-white">
              {item.icon}
            </span>
            <div>
              <span className="text-[13px] font-semibold text-[#222]">{item.label}</span>
              <span className="mt-0.5 block text-[11px] text-[#999]">{item.desc}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
