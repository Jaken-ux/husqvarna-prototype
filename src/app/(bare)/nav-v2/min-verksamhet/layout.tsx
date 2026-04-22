"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import NavHeader from "../NavHeader";

type PanelItem = {
  label: string;
  href: string;
  primary?: boolean;
  badge?: string;
  pill?: string;
};

type PanelGroup = {
  heading?: string;
  items: PanelItem[];
};

const panelGroups: PanelGroup[] = [
  {
    items: [
      { label: "Dealer Workspace", href: "/nav-v2/min-verksamhet/workspace", primary: true },
    ],
  },
  {
    heading: "FÖRSÄLJNING",
    items: [
      { label: "Offerter", href: "/nav-v2/min-verksamhet/offerter", pill: "NY" },
      { label: "Wishlist", href: "/nav-v2/min-verksamhet/wishlist", pill: "NY" },
      { label: "Kampanjbonus", href: "/nav-v2/min-verksamhet/kampanjbonus", badge: "2" },
      { label: "Prisavtal", href: "/nav-v2/min-verksamhet/kundpriser" },
    ],
  },
  {
    heading: "EKONOMI",
    items: [
      { label: "Betalningar & saldo", href: "/nav-v2/min-verksamhet/betalningar" },
      { label: "Rapporter", href: "/nav-v2/min-verksamhet/rapporter" },
    ],
  },
];

export default function MinVerksamhetLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Redirect page just passes through
  if (pathname === "/nav-v2/min-verksamhet") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-white">
      <NavHeader />
      <div className="mx-auto flex max-w-[1320px] gap-6 px-6">
        {/* Left panel */}
        <aside className="w-[240px] shrink-0 py-6">
          <nav className="sticky top-[120px] space-y-5 rounded-xl border border-[#e5e5e5] bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
            {panelGroups.map((group, gi) => (
              <div key={gi}>
                {group.heading && (
                  <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-widest text-[#bbb]">
                    {group.heading}
                  </p>
                )}
                <div className="space-y-0.5">
                  {group.items.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`group flex items-center gap-2 rounded-lg px-3 py-2 text-left transition-all ${
                          isActive
                            ? "border-l-[3px] border-l-[#273A60] bg-[#f0f3f8] text-[#273A60]"
                            : "border-l-[3px] border-l-transparent text-[#555] hover:bg-[#fafafa] hover:text-[#111]"
                        }`}
                      >
                        {item.primary && (
                          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={isActive ? "text-[#273A60]" : "text-[#999]"}>
                            <rect x="3" y="3" width="6" height="6" rx="1" />
                            <rect x="11" y="3" width="6" height="6" rx="1" />
                            <rect x="3" y="11" width="6" height="6" rx="1" />
                            <rect x="11" y="11" width="6" height="6" rx="1" />
                          </svg>
                        )}
                        <span className={`flex-1 text-[13px] ${item.primary ? "font-bold" : "font-medium"}`}>
                          {item.label}
                        </span>
                        {item.badge && (
                          <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold leading-none ${
                            isActive ? "bg-[#273A60] text-white" : "bg-[#e5e5e5] text-[#888]"
                          }`}>{item.badge}</span>
                        )}
                        {item.pill && (
                          <span className="rounded-full bg-[#ff6b00] px-1.5 py-0.5 text-[9px] font-bold leading-none text-white">
                            {item.pill}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
                {gi === 0 && <div className="mt-3 border-b border-[#f0f0f0]" />}
              </div>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {children}
        </div>
      </div>
    </div>
  );
}
