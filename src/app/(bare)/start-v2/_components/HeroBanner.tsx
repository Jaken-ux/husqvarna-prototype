import Image from "next/image";

export default function HeroBanner() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative h-full min-h-[320px] overflow-hidden rounded-2xl"
    >
      <Image
        src="/images/husqvarna.jpg"
        alt="Husqvarna Automower på en golfbana i soluppgång"
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 50vw"
        priority
      />

      {/* Overlay with campaign info */}
      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-black/20 to-transparent p-6">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-white/70">
            Vårkampanj 2026
          </p>
          <h2
            id="hero-heading"
            className="mt-1 text-lg font-bold text-white"
          >
            Återförsäljarprogram
          </h2>
          <p className="mt-1 text-[13px] leading-relaxed text-white/80">
            Tjäna bonusmarginal på utvalda Automower- och Forest &amp;
            Garden-modeller. 1 mars – 31 maj.
          </p>
          <a
            href="/nav-v2/kampanj"
            className="mt-3 inline-flex items-center rounded-lg bg-white/90 px-4 py-2 text-[13px] font-medium text-[#222] backdrop-blur transition-colors hover:bg-white"
          >
            Visa detaljer →
          </a>
        </div>
      </div>
    </section>
  );
}
