import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-[#e0e0e0] bg-[#fafafa]">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
        {/* Main footer content */}
        <div className="grid gap-8 py-10 sm:grid-cols-3 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <Image
                src="/images/Husqvarna-logo.png"
                alt="Husqvarna"
                width={32}
                height={32}
                className="opacity-40"
              />
              <span className="text-[14px] font-semibold text-[#555]">Dealer Portal</span>
            </div>
            <p className="mt-3 text-[12px] leading-relaxed text-[#999]">
              Husqvarna Vision Prototype — alla funktioner är mockups för konceptvalidering.
            </p>
          </div>

          {/* Husqvarna links */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#bbb]">Husqvarna</p>
            <nav className="mt-3 flex flex-col gap-2">
              <Link href="/nav-v2/husqvarna" className="text-[13px] text-[#666] transition-colors hover:text-[#273A60]">Sök & Kategorier</Link>
              <Link href="/nav-v2/husqvarna/kampanjer" className="text-[13px] text-[#666] transition-colors hover:text-[#273A60]">Kampanjer</Link>
              <Link href="/nav-v2/husqvarna/nyheter" className="text-[13px] text-[#666] transition-colors hover:text-[#273A60]">Nyheter & Lanseringar</Link>
            </nav>
          </div>

          {/* Min verksamhet links */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#bbb]">Min verksamhet</p>
            <nav className="mt-3 flex flex-col gap-2">
              <Link href="/nav-v2/min-verksamhet/workspace" className="text-[13px] text-[#666] transition-colors hover:text-[#273A60]">Dealer Workspace</Link>
              <Link href="/nav-v2/min-verksamhet/orders" className="text-[13px] text-[#666] transition-colors hover:text-[#273A60]">Orderhantering</Link>
              <Link href="/nav-v2/min-verksamhet/fakturor" className="text-[13px] text-[#666] transition-colors hover:text-[#273A60]">Fakturor</Link>
              <Link href="/nav-v2/min-verksamhet/betalningar" className="text-[13px] text-[#666] transition-colors hover:text-[#273A60]">Betalningar & Saldo</Link>
              <Link href="/nav-v2/min-verksamhet/rapporter" className="text-[13px] text-[#666] transition-colors hover:text-[#273A60]">Rapporter</Link>
              <Link href="/nav-v2/offerter" className="text-[13px] text-[#666] transition-colors hover:text-[#273A60]">Offerter</Link>
            </nav>
          </div>

          {/* Utility links */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#bbb]">Portal</p>
            <nav className="mt-3 flex flex-col gap-2">
              <Link href="/nav-v2" className="text-[13px] text-[#666] transition-colors hover:text-[#273A60]">Startsidan</Link>
              <Link href="/nav-v2/sitemap" className="text-[13px] text-[#666] transition-colors hover:text-[#273A60]">Sitemap</Link>
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-2 border-t border-[#e5e5e5] py-5 sm:flex-row">
          <p className="text-[11px] text-[#bbb]">Husqvarna Vision Prototype — Concept validation only</p>
          <Link href="/nav-v2/sitemap" className="text-[11px] font-medium text-[#999] transition-colors hover:text-[#273A60]">
            Sitemap
          </Link>
        </div>
      </div>
    </footer>
  );
}
