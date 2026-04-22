"use client";

import Image from "next/image";
import Breadcrumb from "../../Breadcrumb";

export default function HusqvarnaLandingIntro() {
  return (
    <div>
      <Breadcrumb items={[{ label: "Husqvarna", href: "/nav-v2/husqvarna" }]} />

      <div className="mt-6 flex items-center gap-3">
        <Image src="/images/Husqvarna-logo.png" alt="Husqvarna" width={36} height={36} />
        <div>
          <h1 className="text-[22px] font-bold text-[#111]">Husqvarna</h1>
          <p className="text-[13px] text-[#777]">Produkter, reservdelar och tjänster</p>
        </div>
      </div>
    </div>
  );
}
