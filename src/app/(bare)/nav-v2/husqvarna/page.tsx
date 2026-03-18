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

      <main className="mx-auto max-w-[1280px] px-6 py-8">
        {/* 1) Page identity */}
        <HusqvarnaLandingIntro />

        {/* 2) Primary: Search / Identify */}
        <IdentificationHub onOpenAi={() => setAiModalOpen(true)} />

        {/* 3) Primary: Browse by category */}
        <BrowseByCategorySection />

        {/* 4) Secondary: Operational quick actions */}
        <QuickAccessSection />

        {/* 5) Tertiary: Info & resources */}
        <InfoResourcesSection />
      </main>

      {aiModalOpen && <AiPartsFinderModal onClose={() => setAiModalOpen(false)} />}
    </div>
  );
}
