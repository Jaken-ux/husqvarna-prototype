export default function PromoBanner() {
  return (
    <section aria-labelledby="promo-heading">
      <a
        href="/nav-v2/kampanj"
        className="group relative block h-full overflow-hidden rounded-2xl border border-[#d0d0d0]"
      >
        <img
          src="/images/husqvarna.jpg"
          alt="Husqvarna Automower på gräsmatta"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        {/* Text content */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 sm:right-auto">
          <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-widest text-white/70">
            Vårkampanj 2026
          </p>
          <h2
            id="promo-heading"
            className="mt-1 text-lg sm:text-xl font-bold text-white md:text-2xl"
          >
            Återförsäljarprogram
          </h2>
          <p className="mt-1.5 sm:mt-2 max-w-md text-[12px] sm:text-[13px] leading-relaxed text-white/80">
            Tjäna bonusmarginal på utvalda Automower- och Forest &amp; Garden-modeller. 1 mars – 31 maj.
          </p>
          <span className="mt-3 sm:mt-4 inline-flex items-center gap-2 rounded-lg bg-white/90 px-4 sm:px-5 py-2 sm:py-2.5 text-[12px] sm:text-[13px] font-semibold text-[#111] backdrop-blur transition-colors group-hover:bg-white">
            Visa detaljer →
          </span>
        </div>
      </a>
    </section>
  );
}
