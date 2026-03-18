"use client";

import { useState, useRef, useMemo } from "react";
import AiPartsCard from "./AiPartsCard";
import QrScanMockModal from "./QrScanMockModal";

/* ═══════════════════════════════════════════════════════
   TYPES & DATA
   ═══════════════════════════════════════════════════════ */

type Mode = "produkt" | "reservdel" | "dokument";
type Method = "pnc" | "serial" | "qr" | null;

const modes: { id: Mode; label: string }[] = [
  { id: "produkt", label: "Produkt" },
  { id: "dokument", label: "Dokument" },
  { id: "reservdel", label: "Reservdel" },
];

/* Placeholder & helper text per mode+method combination */
const getPlaceholder = (mode: Mode, method: Method): string => {
  if (method === "serial") return "Ange serienummer…";
  if (method === "pnc") {
    if (mode === "reservdel") return "Ange PNC eller artikelnummer för reservdel…";
    if (mode === "dokument") return "Ange PNC eller modellnamn för dokumentsökning…";
    return "Ange PNC eller artikelnummer…";
  }
  // No method selected — use mode-level defaults
  if (mode === "reservdel") return "PNC, modell eller beskriv delen du behöver…";
  if (mode === "dokument") return "Modellnamn, PNC eller dokumenttyp (IPL, OM, SB)…";
  return "PNC, serienummer, modellnamn…";
};

const getHelper = (mode: Mode, method: Method): string => {
  if (method === "serial") return "Serienummer används för att identifiera en specifik maskin.";
  if (method === "pnc") return "Använd produktnummer när du vet exakt vilken produkt eller del du söker.";
  if (mode === "reservdel") return "Ange PNC eller beskriv delen — du kan också använda AI-söket till höger.";
  if (mode === "dokument") return "Sök efter manualer, sprängskisser eller servicebulletiner.";
  return "Ange produktens PNC, serienummer eller modellnamn för att identifiera rätt produkt.";
};

/* Soft input interpretation */
function interpretInput(value: string): string | null {
  const trimmed = value.trim();
  if (trimmed.length < 3) return null;

  // Document keywords
  if (/\b(IPL|OM|SB|manual|bulletin)\b/i.test(trimmed)) {
    return "Detta verkar vara en dokumentsökning.";
  }
  // Mostly digits + long enough → serial
  const digitRatio = (trimmed.replace(/\D/g, "").length) / trimmed.length;
  if (digitRatio > 0.8 && trimmed.length >= 8) {
    return "Detta ser ut som ett serienummer.";
  }
  // Contains digits mixed with spaces/dashes (article number pattern like "585 57 28-01")
  if (/^\d{3}\s?\d{2}\s?\d{2}[-–]\d{2}$/.test(trimmed)) {
    return "Detta ser ut som ett artikelnummer.";
  }
  // Mixed alphanumeric
  if (/\d/.test(trimmed) && /[a-zA-Z]/.test(trimmed) && trimmed.length >= 4) {
    return "Detta kan vara ett artikelnummer eller modellnamn.";
  }

  return null;
}

/* Soft validation guidance per method */
function getGuidance(method: Method, value: string): string | null {
  const trimmed = value.trim();
  if (trimmed.length === 0) return null;

  if (method === "serial") {
    const letterCount = (trimmed.match(/[a-zA-Z]/g) || []).length;
    if (letterCount > trimmed.length * 0.5 && trimmed.length >= 4) {
      return "Serienummer brukar främst innehålla siffror.";
    }
  }
  if (method === "pnc") {
    if (trimmed.length > 0 && trimmed.length < 4) {
      return "PNC eller artikelnummer är ofta längre än så här.";
    }
  }
  return null;
}

/* Method card definitions */
const methodCards: { id: "pnc" | "serial" | "qr"; label: string; desc: string; icon: React.ReactNode }[] = [
  {
    id: "pnc",
    label: "PNC / Artikelnummer",
    desc: "Sök via produktnummer",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="14" height="12" rx="2" />
        <path d="M7 8h6M7 11h4" />
      </svg>
    ),
  },
  {
    id: "serial",
    label: "Serienummer",
    desc: "Identifiera specifik maskin",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="16" height="10" rx="2" />
        <path d="M6 8v4M9 8v4M12 8v4M15 8v4" />
      </svg>
    ),
  },
  {
    id: "qr",
    label: "QR-skanning",
    desc: "Skanna QR-kod på produkten",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="5" height="5" />
        <rect x="12" y="3" width="5" height="5" />
        <rect x="3" y="12" width="5" height="5" />
        <path d="M12 12h2v2h-2zM15 15h2v2h-2zM12 15h1M15 12h2" />
      </svg>
    ),
  },
];

/* ═══════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════ */

type Props = {
  onOpenAi: () => void;
};

export default function IdentificationHub({ onOpenAi }: Props) {
  const [mode, setMode] = useState<Mode>("produkt");
  const [method, setMethod] = useState<Method>(null);
  const [inputValue, setInputValue] = useState("");
  const [qrOpen, setQrOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const placeholder = getPlaceholder(mode, method);
  const helper = getHelper(mode, method);
  const interpretation = useMemo(() => interpretInput(inputValue), [inputValue]);
  const guidance = useMemo(() => getGuidance(method, inputValue), [method, inputValue]);

  const selectMethod = (id: "pnc" | "serial" | "qr") => {
    if (id === "qr") {
      setQrOpen(true);
      return;
    }
    setMethod(method === id ? null : id);
    inputRef.current?.focus();
  };

  return (
    <>
      <section
        id="identification-hub"
        aria-labelledby="id-hub-heading"
        className="mt-10 rounded-2xl border border-[#d0d0d0] bg-gradient-to-br from-[#f8f9fc] to-white p-6 sm:p-8"
      >
        <div className="grid gap-6 lg:grid-cols-[1fr_260px]">
          {/* ── Left column ── */}
          <div>
            {/* Heading */}
            <h2 id="id-hub-heading" className="text-[17px] font-bold text-[#111]">
              Hitta rätt produkt eller reservdel
            </h2>
            <p className="mt-1 max-w-lg text-[13px] leading-relaxed text-[#666]">
              Identifiera via PNC, serienummer eller modellnamn — eller beskriv problemet för att få
              hjälp vidare.
            </p>

            {/* Mode switch */}
            <div className="mt-5 inline-flex rounded-lg border border-[#e0e0e0] bg-[#f4f4f4] p-0.5">
              {modes.map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    setMode(m.id);
                    setMethod(null);
                    inputRef.current?.focus();
                  }}
                  className={`rounded-md px-4 py-1.5 text-[13px] font-medium transition-all ${
                    mode === m.id
                      ? "bg-white text-[#111] shadow-sm"
                      : "text-[#888] hover:text-[#555]"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="mt-4">
              <label className="mb-1.5 block text-[12px] font-semibold uppercase tracking-wide text-[#aaa]">
                Jag vill hitta
              </label>
              <div className="relative">
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#999]"
                  width="18"
                  height="18"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                >
                  <circle cx="7" cy="7" r="4.5" />
                  <path d="M10.5 10.5L14 14" />
                </svg>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={placeholder}
                  aria-label={`Sök ${mode}`}
                  className="h-12 w-full rounded-xl border border-[#d0d0d0] bg-white pl-12 pr-4 text-[15px] text-[#333] placeholder-[#aaa] shadow-sm transition-colors focus:border-[#273A60] focus:shadow-md focus:outline-none"
                />
              </div>

              {/* Helper text */}
              <p className="mt-2 text-[12px] text-[#999]">{helper}</p>

              {/* Soft interpretation hint */}
              {interpretation && !guidance && (
                <p className="mt-1 flex items-center gap-1.5 text-[12px] text-[#273A60]/70">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <circle cx="7" cy="7" r="5.5" />
                    <path d="M7 4.5v3M7 9.5v0" />
                  </svg>
                  {interpretation}
                </p>
              )}

              {/* Soft validation guidance */}
              {guidance && (
                <p className="mt-1 flex items-center gap-1.5 text-[12px] text-[#b08800]">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <circle cx="7" cy="7" r="5.5" />
                    <path d="M7 4.5v3M7 9.5v0" />
                  </svg>
                  {guidance}
                </p>
              )}
            </div>

            {/* Method cards */}
            <div className="mt-5">
              <span className="mb-2.5 block text-[11px] font-semibold uppercase tracking-wide text-[#bbb]">
                Hur vill du identifiera?
              </span>
              <div className="flex flex-wrap gap-3">
                {methodCards.map((m) => {
                  const isActive = method === m.id;
                  return (
                    <button
                      key={m.id}
                      onClick={() => selectMethod(m.id)}
                      className={`group flex items-center gap-2.5 rounded-lg border px-4 py-2.5 transition-all ${
                        isActive
                          ? "border-[#273A60] bg-[#273A60]/[0.05] shadow-sm"
                          : "border-[#e5e5e5] bg-white hover:border-[#273A60]/30 hover:shadow-sm"
                      }`}
                    >
                      <span
                        className={`transition-colors ${
                          isActive ? "text-[#273A60]" : "text-[#999] group-hover:text-[#273A60]"
                        }`}
                      >
                        {m.icon}
                      </span>
                      <div className="text-left">
                        <span
                          className={`text-[13px] font-semibold ${
                            isActive ? "text-[#273A60]" : "text-[#222]"
                          }`}
                        >
                          {m.label}
                        </span>
                        <span className="block text-[11px] text-[#999]">{m.desc}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Right column: AI fallback ── */}
          <AiPartsCard onOpen={onOpenAi} />
        </div>
      </section>

      {qrOpen && <QrScanMockModal onClose={() => setQrOpen(false)} />}
    </>
  );
}
