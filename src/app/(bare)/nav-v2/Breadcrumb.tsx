"use client";

import Link from "next/link";

type Crumb = {
  label: string;
  href: string;
};

export default function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Länkstig" className="flex items-center gap-1.5 text-[13px]">
      <Link
        href="/nav-v2"
        className="text-[#888] transition-colors hover:text-[#273A60]"
      >
        Startsidan
      </Link>
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={item.href} className="flex items-center gap-1.5">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              stroke="#bbb"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              <path d="M4.5 2.5l3.5 3.5-3.5 3.5" />
            </svg>
            {isLast ? (
              <span className="font-medium text-[#333]">{item.label}</span>
            ) : (
              <Link
                href={item.href}
                className="text-[#888] transition-colors hover:text-[#273A60]"
              >
                {item.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
