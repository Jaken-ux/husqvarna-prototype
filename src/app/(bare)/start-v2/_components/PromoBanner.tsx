export default function PromoBanner() {
  return (
    <section aria-labelledby="promo-heading">
      <div className="rounded-xl border border-[#e8e8f0] bg-gradient-to-r from-[#fafafe] to-[#f5f5ff] px-8 py-8 md:flex md:items-center md:justify-between">
        <div>
          <h2
            id="promo-heading"
            className="text-base font-semibold text-[#333]"
          >
            Spring Campaign 2026 — Dealer Incentive Program
          </h2>
          <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-[#777]">
            Earn bonus margin on selected Automower and Forest &amp; Garden
            models. Program runs March 1 – May 31. Check eligible products and
            register your participation.
          </p>
        </div>
        <a
          href="/nav-v2/kampanj"
          className="mt-4 inline-flex shrink-0 items-center rounded-lg border border-[#d0d0e0] bg-white px-5 py-2.5 text-sm font-medium text-[#333] transition-colors hover:bg-[#f5f5f5] md:mt-0"
        >
          View details
        </a>
      </div>
    </section>
  );
}
