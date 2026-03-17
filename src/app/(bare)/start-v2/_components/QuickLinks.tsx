type QuickLink = {
  label: string;
  description: string;
  href: string;
};

const links: QuickLink[] = [
  { label: "Prislisteexport", description: "Ladda ned aktuella återförsäljarlistor", href: "#" },
  { label: "Husqvarna Leasing", description: "Leasingalternativ och kalkylator", href: "#" },
  { label: "Marknadsportal", description: "Kampanjmaterial och resurser", href: "#" },
  { label: "Power Portal", description: "Teknisk produktinformation", href: "#" },
  { label: "Service Hub / RMA", description: "Retur- och reparationshantering", href: "#" },
  { label: "Husqvarna University", description: "Certifieringar och e-learning", href: "#" },
  { label: "Utbildningsportal", description: "Boka utbildningstillfällen", href: "#" },
  { label: "Fleet Services", description: "Verktyg för fordonsflottan", href: "#" },
];

export default function QuickLinks() {
  return (
    <section aria-labelledby="quicklinks-heading">
      <h2
        id="quicklinks-heading"
        className="text-lg font-semibold text-[#111]"
      >
        Snabblänkar
      </h2>
      <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-3 lg:grid-cols-4">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="group rounded-lg px-2 py-2 transition-colors hover:bg-[#f5f5f5]"
          >
            <p className="text-sm font-medium text-[#333] group-hover:text-[#111]">
              {link.label}
            </p>
            <p className="mt-0.5 text-[12px] text-[#aaa]">
              {link.description}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}
