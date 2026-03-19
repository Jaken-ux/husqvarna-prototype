"use client";

import Image from "next/image";
import Link from "next/link";
import NavHeader from "../NavHeader";

/* ═══ CAMPAIGN DATA ═══ */
const tiers = [
  {
    name: "Silver",
    target: "5–14 registrerade enheter",
    bonus: "2 %",
    extra: "Grundnivå — automatiskt kvalificerad",
    color: "from-[#bbb] to-[#999]",
    ring: "ring-[#ccc]",
  },
  {
    name: "Guld",
    target: "15–29 registrerade enheter",
    bonus: "4 %",
    extra: "Prioriterad kampanjsupport + material",
    color: "from-[#d4a843] to-[#b8860b]",
    ring: "ring-[#d4a843]",
    popular: true,
  },
  {
    name: "Platina",
    target: "30+ registrerade enheter",
    bonus: "6 %",
    extra: "Exklusiv Co-op marknadsföring + demo-enheter",
    color: "from-[#273A60] to-[#1a2d4d]",
    ring: "ring-[#273A60]",
  },
];

const eligibleProducts = [
  { category: "Automower®", models: "310E Mark II, 410XE NERA, 430X NERA, 450X NERA, 520 EPOS, 550 EPOS", icon: "🤖" },
  { category: "Åkgräsklippare", models: "R 316TsX AWD, R 320X AWD, Rider 115C, Rider 216T AWD", icon: "🚜" },
  { category: "Forest & Garden", models: "572 XP Mark II, 545 Mark II, 535i XP, T540i XP", icon: "🪚" },
  { category: "Batteriserien POWER+", models: "Hela 500-serien (trimmer, blåsare, häcksax, grästrimmer)", icon: "🔋" },
];

const timeline = [
  { date: "1 mar", label: "Kampanjstart", desc: "Registrering öppnar i Dealer Portal", active: true },
  { date: "15 apr", label: "Halvtidsrapport", desc: "Progressrapport skickas via e-post" },
  { date: "31 maj", label: "Kampanjslut", desc: "Sista dag för sell-out-registrering" },
  { date: "15 jun", label: "Bonusutbetalning", desc: "Kreditnota på nästa faktura" },
];

const faq = [
  { q: "Vilka produkter ingår i kampanjen?", a: "Alla modeller listade under \"Kvalificerade produkter\" ovan. Produkten måste vara registrerad som Sell-out i Dealer Portal med giltig slutkund under kampanjperioden." },
  { q: "Hur beräknas bonusmarginalen?", a: "Bonusen beräknas på nettoinköpspriset (exkl. moms) för varje kvalificerad enhet. Den ackumuleras under hela perioden och betalas ut som kreditnota efter kampanjslut." },
  { q: "Kan jag kombinera med andra kampanjer?", a: "Ja, vårkampanjen kan kombineras med HyperCare-bonus och Service Plus-avtalsprovision. Dock ej med volumrabatter på samma enhet." },
  { q: "Vad händer om jag når nästa nivå mitt i perioden?", a: "Nivån räknas retroaktivt. Om du når Guld-nivå appliceras 4 % bonus på samtliga registrerade enheter från kampanjstart." },
  { q: "Hur registrerar jag en sell-out?", a: "Gå till Min Verksamhet → Produkter, välj enheten och klicka \"Registrera sell-out\". Du kan även göra det direkt från Idag-panelen på startsidan." },
];

export default function KampanjPage() {
  return (
    <div className="min-h-screen bg-white">
      <NavHeader />

      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden bg-[#273A60]">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/H150-0083.webp"
            alt="Husqvarna motorsåg i arbete"
            fill
            className="object-cover opacity-30"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#273A60] via-[#273A60]/80 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[1.5px] text-white/80 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-[#2a9d5c] animate-pulse" />
              Aktiv kampanj · 1 mars – 31 maj 2026
            </span>

            <h1 className="mt-6 text-3xl font-bold leading-tight text-white md:text-5xl md:leading-[1.15]">
              Vårkampanj 2026
              <br />
              <span className="text-[#ff9b4d]">Återförsäljarprogram</span>
            </h1>

            <p className="mt-5 text-base leading-relaxed text-white/75 md:text-lg md:leading-relaxed">
              Tjäna upp till <strong className="text-white">6 % bonusmarginal</strong> på utvalda Automower®,
              Forest &amp; Garden och Batteriprodukter. Ju fler sell-outs du registrerar, desto högre bonus — retroaktivt
              på alla enheter.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#tiers"
                className="inline-flex items-center rounded-lg bg-[#ff6b00] px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-[#e56000] hover:shadow-xl"
              >
                Se bonusnivåer
              </a>
              <a
                href="#products"
                className="inline-flex items-center rounded-lg border border-white/25 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur transition-all hover:bg-white/20"
              >
                Kvalificerade produkter
              </a>
            </div>

            {/* Stats */}
            <div className="mt-10 flex flex-wrap gap-8 border-t border-white/15 pt-6">
              {[
                { value: "6 %", label: "Max bonus" },
                { value: "91", label: "Dagar kvar" },
                { value: "4", label: "Produktkategorier" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-bold text-white">{s.value}</p>
                  <p className="text-[12px] text-white/50">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TIER CARDS ═══ */}
      <section id="tiers" className="mx-auto max-w-6xl px-6 py-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#111]">Bonusnivåer</h2>
          <p className="mt-2 text-sm text-[#888]">
            Nivån räknas retroaktivt — nå en ny nivå och hela perioden räknas upp
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`relative overflow-hidden rounded-2xl border bg-white shadow-sm transition-shadow hover:shadow-lg ${
                t.popular ? "ring-2 " + t.ring + " border-transparent" : "border-[#e5e5e5]"
              }`}
            >
              {t.popular && (
                <div className="absolute right-4 top-4 rounded-full bg-[#b8860b] px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                  Populärast
                </div>
              )}

              {/* Tier header */}
              <div className={`bg-gradient-to-br ${t.color} px-6 py-8 text-center text-white`}>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-white/70">{t.name}</p>
                <p className="mt-2 text-5xl font-extrabold">{t.bonus}</p>
                <p className="mt-1 text-[13px] text-white/70">bonusmarginal</p>
              </div>

              {/* Tier body */}
              <div className="px-6 py-6">
                <p className="text-sm font-medium text-[#333]">{t.target}</p>
                <p className="mt-2 text-[13px] leading-relaxed text-[#888]">{t.extra}</p>
                <button className="mt-6 w-full rounded-lg border border-[#e5e5e5] py-2.5 text-[13px] font-medium text-[#333] transition-colors hover:border-[#273A60] hover:bg-[#f5f7fb] hover:text-[#273A60]">
                  Delta i kampanjen
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ ELIGIBLE PRODUCTS ═══ */}
      <section id="products" className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-2xl font-bold text-[#111]">Kvalificerade produkter</h2>
          <p className="mt-2 text-sm text-[#888]">
            Alla modeller nedan ger bonuspoäng vid registrerad sell-out under kampanjperioden
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {eligibleProducts.map((p) => (
              <div
                key={p.category}
                className="rounded-xl border border-[#e5e5e5] bg-[#fafafa] p-5 transition-colors hover:border-[#d0d0d0]"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#e8edf5] text-lg">
                    {p.icon}
                  </span>
                  <h3 className="text-[15px] font-semibold text-[#111]">{p.category}</h3>
                </div>
                <p className="mt-3 text-[13px] leading-relaxed text-[#666]">{p.models}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TIMELINE ═══ */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-2xl font-bold text-[#111]">Tidslinje</h2>
        <p className="mt-2 text-sm text-[#888]">Viktiga datum under kampanjperioden</p>

        <div className="mt-10">
          <div className="relative border-l-2 border-[#e5e5e5] pl-8">
            {timeline.map((t, i) => (
              <div key={i} className="relative mb-10 last:mb-0">
                {/* Dot */}
                <div
                  className={`absolute -left-[41px] flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                    t.active
                      ? "border-[#2a9d5c] bg-[#2a9d5c]"
                      : "border-[#d0d0d0] bg-white"
                  }`}
                >
                  {t.active && (
                    <span className="h-2 w-2 rounded-full bg-white" />
                  )}
                </div>

                <p className="text-[11px] font-semibold uppercase tracking-wider text-[#999]">
                  {t.date} 2026
                </p>
                <h3 className="mt-1 text-[15px] font-semibold text-[#111]">{t.label}</h3>
                <p className="mt-0.5 text-[13px] text-[#888]">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="bg-[#273A60] py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-2xl font-bold text-white">Så fungerar det</h2>
          <p className="mt-2 text-sm text-white/60">Tre steg till din bonus</p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                step: "1",
                title: "Registrera deltagande",
                desc: "Klicka \"Delta i kampanjen\" ovan eller gå till Min Verksamhet → Kampanjer. Anmälan tar 30 sekunder.",
              },
              {
                step: "2",
                title: "Registrera sell-outs",
                desc: "Registrera varje såld enhet med slutkund och sålddatum i Dealer Portal. Tidsåtgång: ca 1 minut per enhet.",
              },
              {
                step: "3",
                title: "Få bonusen",
                desc: "Den 15 juni beräknas din totala bonus och krediteras som kreditnota på nästkommande faktura.",
              },
            ].map((s) => (
              <div
                key={s.step}
                className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ff6b00] text-sm font-bold text-white">
                  {s.step}
                </div>
                <h3 className="mt-4 text-[15px] font-semibold text-white">{s.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-white/60">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="mx-auto max-w-3xl px-6 py-16">
        <h2 className="text-center text-2xl font-bold text-[#111]">Vanliga frågor</h2>
        <div className="mt-8 divide-y divide-[#e5e5e5]">
          {faq.map((f, i) => (
            <details key={i} className="group py-5">
              <summary className="flex cursor-pointer items-center justify-between text-[14px] font-medium text-[#333] transition-colors hover:text-[#273A60]">
                {f.q}
                <svg
                  className="h-4 w-4 shrink-0 text-[#999] transition-transform group-open:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-3 text-[13px] leading-relaxed text-[#666]">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ═══ CTA FOOTER ═══ */}
      <section className="bg-gradient-to-r from-[#ff6b00] to-[#e56000] py-16">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            Redo att tjäna bonusmarginal?
          </h2>
          <p className="mt-3 text-sm text-white/80">
            Anmäl dig idag och börja registrera sell-outs. Kampanjen pågår till 31 maj 2026.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button className="inline-flex items-center rounded-lg bg-white px-8 py-3 text-sm font-semibold text-[#e56000] shadow-lg transition-all hover:shadow-xl">
              Delta i kampanjen
            </button>
            <Link
              href="/nav-v2"
              className="inline-flex items-center rounded-lg border border-white/30 px-8 py-3 text-sm font-medium text-white transition-all hover:bg-white/10"
            >
              ← Tillbaka till portalen
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
