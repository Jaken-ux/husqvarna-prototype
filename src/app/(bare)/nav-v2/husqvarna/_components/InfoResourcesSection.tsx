const items = [
  {
    label: "Manualer & servicebulletiner",
    desc: "Produktmanualer, SB och teknisk dokumentation",
    href: "#",
  },
  {
    label: "Kampanjer",
    desc: "Aktiva och kommande erbjudanden",
    href: "/nav-v2/husqvarna/kampanjer",
    badge: "2",
  },
  {
    label: "Nyheter & lanseringar",
    desc: "Senaste nytt från Husqvarna",
    href: "/nav-v2/husqvarna/nyheter",
    badge: "NY",
    badgeColor: "orange",
  },
];

export default function InfoResourcesSection() {
  return (
    <section aria-labelledby="info-heading" className="mt-10 mb-8">
      <h2 id="info-heading" className="text-[14px] font-semibold text-[#888]">
        Information & resurser
      </h2>
      <div className="mt-3 flex flex-wrap gap-3">
        {items.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="group flex items-center gap-3 rounded-lg border border-[#e8e8e8] bg-white px-4 py-3 transition-all hover:border-[#273A60]/20 hover:shadow-sm"
          >
            <div>
              <span className="text-[13px] font-medium text-[#333] group-hover:text-[#273A60]">
                {item.label}
              </span>
              <span className="mt-0.5 block text-[11px] text-[#aaa]">{item.desc}</span>
            </div>
            <div className="flex items-center gap-1.5">
              {item.badge && (
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold text-white ${
                    item.badgeColor === "orange" ? "bg-[#ff6b00]" : "bg-[#273A60]"
                  }`}
                >
                  {item.badge}
                </span>
              )}
              <span className="shrink-0 text-[#ccc] transition-colors group-hover:text-[#273A60]">→</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
