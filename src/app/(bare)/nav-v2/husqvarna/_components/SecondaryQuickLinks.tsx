const links = [
  {
    label: "Pris & tillgänglighet",
    desc: "Lagerstatus, leveranstider och återförsäljarpriser",
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
    label: "Manualer & SB",
    desc: "Produktmanualer och servicebulletiner",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 3h5a2 2 0 012 2v12a1.5 1.5 0 00-1.5-1.5H4V3z" />
        <path d="M16 3h-5a2 2 0 00-2 2v12a1.5 1.5 0 011.5-1.5H16V3z" />
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
  {
    label: "Kampanjer",
    desc: "Aktiva och kommande erbjudanden",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4l12 6-12 6V4z" />
      </svg>
    ),
  },
];

export default function SecondaryQuickLinks() {
  return (
    <section aria-labelledby="quick-heading" className="mt-12 mb-8">
      <h2 id="quick-heading" className="text-[15px] font-semibold text-[#111]">
        Snabbåtkomst
      </h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((l) => (
          <a
            key={l.label}
            href="#"
            className="group flex items-center gap-4 rounded-xl border border-[#d0d0d0] bg-white px-5 py-4 transition-all hover:border-[#273A60]/30 hover:shadow-md"
          >
            <span className="shrink-0 rounded-lg bg-[#f0f3f8] p-2.5 text-[#273A60] transition-colors group-hover:bg-[#273A60] group-hover:text-white">
              {l.icon}
            </span>
            <div>
              <span className="text-[14px] font-semibold text-[#111]">{l.label}</span>
              <span className="mt-0.5 block text-[12px] text-[#888]">{l.desc}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
