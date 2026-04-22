"use client";

import { useEffect } from "react";

type Props = {
  onClose: () => void;
};

export default function QrScanMockModal({ onClose }: Props) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-[#999] transition-colors hover:text-[#333]"
          aria-label="Stäng"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M5 5l10 10M15 5L5 15" />
          </svg>
        </button>

        {/* QR viewfinder mock */}
        <div className="mx-auto mt-2 flex h-48 w-48 items-center justify-center rounded-xl border-2 border-dashed border-[#273A60]/30 bg-[#f8f9fc]">
          <div className="relative">
            {/* Corner brackets */}
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none" stroke="#273A60" strokeWidth="3" strokeLinecap="round">
              <path d="M10 30V10h20" />
              <path d="M90 10h20v20" />
              <path d="M110 90v20H90" />
              <path d="M30 110H10V90" />
            </svg>
            {/* Scanning line animation */}
            <div className="absolute left-3 right-3 top-1/2 h-0.5 animate-pulse rounded bg-[#273A60]/40" />
          </div>
        </div>

        <h3 className="mt-5 text-center text-[15px] font-semibold text-[#111]">
          Skanna QR-kod
        </h3>
        <p className="mt-1.5 text-center text-[13px] leading-relaxed text-[#888]">
          Rikta kameran mot QR-koden på produkten för att identifiera rätt modell eller maskin.
        </p>

        <div className="mt-5 rounded-lg bg-[#f8f9fc] px-4 py-3 text-center">
          <p className="text-[12px] text-[#999]">
            Prototyp — kameraskanning ej aktiv i denna demo
          </p>
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full rounded-lg border border-[#d0d0d0] py-2.5 text-[13px] font-medium text-[#333] transition-colors hover:border-[#273A60]/30 hover:text-[#273A60]"
        >
          Stäng
        </button>
      </div>
    </div>
  );
}
