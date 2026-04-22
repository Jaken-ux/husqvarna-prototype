"use client";

import { useState } from "react";
import NavHeader from "../NavHeader";
import AiPartsFinderModal from "../AiPartsFinderModal";
import HusqvarnaLandingIntro from "./_components/HusqvarnaLandingIntro";
import IdentificationHub from "./_components/IdentificationHub";
import BrowseByCategorySection from "./_components/BrowseByCategorySection";
import QuickAccessSection from "./_components/QuickAccessSection";
import InfoResourcesSection from "./_components/InfoResourcesSection";

export default function HusqvarnaPage() {
  const [aiModalOpen, setAiModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <NavHeader />

      <main className="mx-auto max-w-[1280px] px-4 sm:px-6 py-6 sm:py-8">
        {/* Desktop: full landing page */}
        <div className="hidden sm:block">
          <HusqvarnaLandingIntro />
        </div>

        {/* Mobile: simple heading */}
        <div className="sm:hidden mb-2">
          <h1 className="text-[18px] font-bold text-[#111]">Sök & Kategorier</h1>
          <p className="mt-0.5 text-[12px] text-[#888]">Hitta produkter och reservdelar</p>
        </div>

        {/* Search / Identify — both mobile and desktop */}
        <IdentificationHub onOpenAi={() => setAiModalOpen(true)} />

        {/* Browse by category — both mobile and desktop */}
        <BrowseByCategorySection />

        {/* Desktop only: quick access + info resources */}
        <div className="hidden sm:block">
          <QuickAccessSection />
          <InfoResourcesSection />
        </div>
      </main>

      {aiModalOpen && <AiPartsFinderModal onClose={() => setAiModalOpen(false)} />}
    </div>
  );
}
