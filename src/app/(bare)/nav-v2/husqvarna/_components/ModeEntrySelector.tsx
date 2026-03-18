"use client";

type ActiveMode = "identify" | "browse" | null;

type Props = {
  activeMode: ActiveMode;
  onIdentify: () => void;
  onBrowse: () => void;
};

export default function ModeEntrySelector({ activeMode, onIdentify, onBrowse }: Props) {
  return (
    <section className="mt-10">
      <h2 className="text-lg font-bold text-[#111]">Hitta rätt produkt eller reservdel</h2>
      <p className="mt-1 max-w-2xl text-[13px] leading-relaxed text-[#666]">
        Använd sök för att identifiera rätt produkt direkt, eller bläddra efter kategori om du vill
        utforska sortimentet.
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {/* ── Identifiera direkt ── */}
        <button
          onClick={onIdentify}
          className={`group flex flex-col rounded-xl border p-6 text-left transition-all ${
            activeMode === "identify"
              ? "border-[#273A60] bg-[#273A60]/[0.04] shadow-md"
              : "border-[#d0d0d0] bg-white hover:border-[#273A60]/40 hover:shadow-md"
          }`}
        >
          <span
            className={`inline-flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${
              activeMode === "identify"
                ? "bg-[#273A60] text-white"
                : "bg-[#f0f3f8] text-[#273A60] group-hover:bg-[#273A60] group-hover:text-white"
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <circle cx="8.5" cy="8.5" r="5" />
              <path d="M12.5 12.5L17 17" />
            </svg>
          </span>
          <h3 className="mt-4 text-[15px] font-semibold text-[#111]">Identifiera direkt</h3>
          <p className="mt-1 text-[13px] leading-relaxed text-[#888]">
            Sök med modellnamn, PNC, serienummer eller QR-kod.
          </p>
          <span
            className={`mt-auto pt-4 text-[13px] font-semibold text-[#273A60] transition-opacity ${
              activeMode === "identify" ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            }`}
          >
            {activeMode === "identify" ? "Aktiv — sök nedan ↓" : "Gå till sökning →"}
          </span>
        </button>

        {/* ── Bläddra efter kategori ── */}
        <button
          onClick={onBrowse}
          className={`group flex flex-col rounded-xl border p-6 text-left transition-all ${
            activeMode === "browse"
              ? "border-[#273A60] bg-[#273A60]/[0.04] shadow-md"
              : "border-[#d0d0d0] bg-white hover:border-[#273A60]/40 hover:shadow-md"
          }`}
        >
          <span
            className={`inline-flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${
              activeMode === "browse"
                ? "bg-[#273A60] text-white"
                : "bg-[#f0f3f8] text-[#273A60] group-hover:bg-[#273A60] group-hover:text-white"
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="6" height="6" rx="1" />
              <rect x="11" y="3" width="6" height="6" rx="1" />
              <rect x="3" y="11" width="6" height="6" rx="1" />
              <rect x="11" y="11" width="6" height="6" rx="1" />
            </svg>
          </span>
          <h3 className="mt-4 text-[15px] font-semibold text-[#111]">Bläddra efter kategori</h3>
          <p className="mt-1 text-[13px] leading-relaxed text-[#888]">
            Navigera via produktkategorier och underkategorier för att hitta rätt produkt.
          </p>
          <span
            className={`mt-auto pt-4 text-[13px] font-semibold text-[#273A60] transition-opacity ${
              activeMode === "browse" ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            }`}
          >
            {activeMode === "browse" ? "Aktiv — välj kategori nedan ↓" : "Visa kategorier →"}
          </span>
        </button>
      </div>
    </section>
  );
}
