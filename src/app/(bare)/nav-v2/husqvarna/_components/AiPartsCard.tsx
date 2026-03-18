"use client";

type Props = {
  onOpen: () => void;
};

export default function AiPartsCard({ onOpen }: Props) {
  return (
    <button
      onClick={onOpen}
      className="group flex flex-col rounded-xl border border-dashed border-[#273A60]/25 bg-[#273A60]/[0.02] p-5 text-left transition-all hover:border-[#273A60]/40 hover:bg-[#273A60]/[0.04] hover:shadow-md"
    >
      <div className="flex items-center gap-2">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#273A60] text-white">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <circle cx="8" cy="8" r="6" />
            <path d="M6 6.5c0-1.1.9-2 2-2s2 .9 2 2c0 .8-.5 1.4-1.2 1.7-.3.1-.8.4-.8.8" />
            <circle cx="8" cy="12" r=".5" fill="currentColor" />
          </svg>
        </span>
        <span className="text-[13px] font-semibold text-[#111]">Hittar du inte rätt del?</span>
        <span className="rounded bg-[#273A60]/10 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#273A60]">
          Beta
        </span>
      </div>
      <span className="mt-2 text-[12px] leading-relaxed text-[#777]">
        Beskriv maskinen och problemet — få hjälp att hitta rätt reservdel även utan artikelnummer.
      </span>
      <span className="mt-auto pt-4 text-[13px] font-semibold text-[#273A60] transition-colors group-hover:text-[#1a2d4d]">
        Starta AI-sök →
      </span>
    </button>
  );
}
