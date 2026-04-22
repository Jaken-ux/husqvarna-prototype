/* ═══════════════════════════════════════════════════════════════
   TASK FLOWS — 2026 Sellout & Customer Registration
   7 flows: Identify → Sellout → Install → Handover →
            Warranty → Service Contract → HyperCare
   ═══════════════════════════════════════════════════════════════ */

export type FieldDef = {
  name: string;
  label: string;
  type: "text" | "date" | "select" | "autocomplete" | "email" | "tel" | "textarea" | "checkbox" | "file" | "radio" | "number";
  required: boolean;
  placeholder?: string;
  helper?: string;
  validation?: string;
  errorMsg?: string;
  options?: string[];
  prefill?: string;
};

export type FlowStep = {
  id: string;
  title: string;
  subtitle: string;
  fields: FieldDef[];
  actions: { label: string; type: "primary" | "secondary" | "link"; href?: string }[];
  states: {
    empty?: string;
    error?: string;
    success?: string;
    loading?: string;
  };
  notes?: string[];
};

export type TransitionRule = {
  from: string;
  to: string;
  condition?: string;
  label: string;
};

export type TaskFlow = {
  id: string;
  title: string;
  subtitle: string;
  entryPoints: string[];
  steps: FlowStep[];
  transitions: TransitionRule[];
  bulkSupport: boolean;
  mobileVariant?: string;
};

/* ═══════════════════════════════════════════════════════
   A) IDENTIFY PRODUCT
   ═══════════════════════════════════════════════════════ */

export const identifyProductFlow: TaskFlow = {
  id: "identify_product",
  title: "Identifiera produkt",
  subtitle: "Hitta en produkt via PNC, serienummer, QR/EAN eller HID",
  entryPoints: [
    "Dashboard → Snabbåtgärder → Identifiera produkt",
    "Produkter → + Identifiera",
    "Header → Global sök",
    "Idag-panel → Saknat sellout → klick",
    "Mobil → Hamburger → Sök / QR-skanning",
  ],
  steps: [
    {
      id: "identify_input",
      title: "Sök produkt",
      subtitle: "Ange PNC, serienummer, skanna QR/EAN eller ange HID",
      fields: [
        {
          name: "search_method",
          label: "Sökmetod",
          type: "radio",
          required: true,
          options: ["PNC / Artikelnummer", "Serienummer", "QR / EAN (skanna)", "HID (CEORA)"],
          helper: "Välj hur du vill identifiera produkten",
        },
        {
          name: "search_value",
          label: "Sökvärde",
          type: "text",
          required: true,
          placeholder: "T.ex. 967 85 32-01 eller 2024-435X-00891",
          validation: "PNC: ###-##-##-## / Serial: fritext min 6 tecken / EAN: 13 siffror / HID: alfanumerisk",
          errorMsg: "Ogiltigt format — kontrollera och försök igen",
          helper: "Formatet anpassas automatiskt efter vald metod",
        },
      ],
      actions: [
        { label: "Sök", type: "primary" },
        { label: "Skanna QR-kod", type: "secondary" },
      ],
      states: {
        empty: "Ange sökvärde för att hitta en produkt",
        loading: "Söker produkt...",
        error: "Ingen produkt hittades — kontrollera värdet och försök igen",
      },
      notes: [
        "Autocomplete aktiveras efter 3 tecken — visar modell + PNC + kund",
        "QR-skanning öppnar enhetens kamera (mobil) eller filuppladdning (desktop)",
        "HID-fält visas enbart för CEORA-kategorin",
      ],
    },
    {
      id: "identify_result",
      title: "Produktkort — sökresultat",
      subtitle: "Visar produktinformation och tillgängliga åtgärder",
      fields: [
        { name: "model", label: "Modell", type: "text", required: false, prefill: "Automower 435X AWD" },
        { name: "serial", label: "Serienummer", type: "text", required: false, prefill: "2024-435X-00891" },
        { name: "pnc", label: "PNC", type: "text", required: false, prefill: "967 85 32-01" },
        { name: "customer", label: "Kund", type: "text", required: false, prefill: "— Ej registrerad" },
        { name: "sold_date", label: "Sålddatum", type: "text", required: false, prefill: "— Saknas" },
        { name: "installed", label: "Installation", type: "text", required: false, prefill: "— Ej genomförd" },
        { name: "warranty", label: "Garanti", type: "text", required: false, prefill: "— Ej aktiverad" },
        { name: "service_contract", label: "Serviceavtal", type: "text", required: false, prefill: "— Inget avtal" },
        { name: "hypercare", label: "HyperCare", type: "text", required: false, prefill: "— Ej tillämpligt" },
      ],
      actions: [
        { label: "Registrera sellout", type: "primary", href: "sellout" },
        { label: "Starta installation", type: "secondary", href: "installation" },
        { label: "Registrera överlämning", type: "secondary", href: "handover" },
        { label: "Aktivera garanti", type: "secondary", href: "warranty_start" },
        { label: "Nytt serviceavtal", type: "secondary", href: "service_contract" },
        { label: "Visa produktdetaljer →", type: "link", href: "product_detail" },
      ],
      states: {
        success: "Produkten hittades — välj åtgärd nedan",
        error: "Produkten kunde inte laddas — försök igen",
      },
      notes: [
        "Åtgärdsknappar visas kontextuellt — redan utförda steg gråmarkeras",
        "Statusbadges (Saknas/Väntar/Aktiv) vid varje fält",
        "Kund-fältet är klickbart → öppnar kundprofil",
      ],
    },
  ],
  transitions: [
    { from: "identify_result", to: "sellout", label: "Registrera sellout", condition: "sold_date saknas" },
    { from: "identify_result", to: "installation", label: "Starta installation", condition: "sold_date finns, installation saknas" },
    { from: "identify_result", to: "handover", label: "Registrera överlämning", condition: "installation klar, handover saknas" },
    { from: "identify_result", to: "warranty_start", label: "Aktivera garanti", condition: "garanti ej aktiverad" },
    { from: "identify_result", to: "service_contract", label: "Nytt serviceavtal", condition: "alltid tillgänglig" },
  ],
  bulkSupport: false,
  mobileVariant: "Fullscreen-modal med kameraskanning som primär CTA. Resultatkort komprimerat till accordion.",
};

/* ═══════════════════════════════════════════════════════
   B) SELLOUT
   ═══════════════════════════════════════════════════════ */

export const selloutFlow: TaskFlow = {
  id: "sellout",
  title: "Registrera sellout",
  subtitle: "Rapportera säljdatum — aktiverar statutory warranty",
  entryPoints: [
    "Dashboard → Snabbåtgärder → Registrera säljdatum",
    "Produkter → Bulk action → Registrera säljdatum",
    "Idag-panel → Saknat sellout → Åtgärda",
    "Identifiera produkt → Resultat → Registrera sellout",
    "Produktdetalj → Åtgärdsknapp",
  ],
  steps: [
    {
      id: "sellout_select",
      title: "Steg 1 — Välj produkt(er)",
      subtitle: "Välj en eller flera produkter att registrera sellout för",
      fields: [
        {
          name: "product_search",
          label: "Sök produkt",
          type: "autocomplete",
          required: true,
          placeholder: "Sök på modell, PNC eller serienummer...",
          helper: "Välj en eller flera produkter. Redan registrerade produkter är gråmarkerade.",
          validation: "Minst 1 produkt måste väljas",
          errorMsg: "Välj minst en produkt för att fortsätta",
        },
        {
          name: "customer",
          label: "Kund",
          type: "autocomplete",
          required: true,
          placeholder: "Sök befintlig kund eller registrera ny...",
          helper: "Kunden kopplas till produkten. Du kan också registrera en ny kund.",
          validation: "Kund måste anges",
          errorMsg: "Ange en kund — sök eller registrera ny",
        },
      ],
      actions: [
        { label: "Fortsätt →", type: "primary" },
        { label: "Avbryt", type: "secondary" },
        { label: "Ladda upp CSV (bulk)", type: "link" },
      ],
      states: {
        empty: "Sök och välj produkter att registrera sellout för",
        error: "Produkten har redan registrerat sellout",
        loading: "Söker produkter...",
      },
    },
    {
      id: "sellout_date",
      title: "Steg 2 — Ange sålddatum",
      subtitle: "Ange datum för försäljningen",
      fields: [
        {
          name: "sold_date",
          label: "Sålddatum",
          type: "date",
          required: true,
          helper: "Datum då produkten såldes till slutkund",
          validation: "Får ej vara i framtiden. Får ej vara mer än 365 dagar bakåt.",
          errorMsg: "Ogiltigt datum — måste vara mellan idag och 365 dagar bakåt",
        },
        {
          name: "invoice_reference",
          label: "Fakturareferens",
          type: "text",
          required: false,
          placeholder: "T.ex. INV-2024-00891",
          helper: "Valfritt — underlättar spårning",
        },
        {
          name: "comment",
          label: "Kommentar",
          type: "textarea",
          required: false,
          placeholder: "Valfri notering...",
          helper: "Intern anteckning, visas inte för kund",
        },
      ],
      actions: [
        { label: "Granska & bekräfta →", type: "primary" },
        { label: "← Tillbaka", type: "secondary" },
      ],
      states: {
        error: "Kontrollera markerade fält",
      },
    },
    {
      id: "sellout_confirm",
      title: "Steg 3 — Bekräfta sellout",
      subtitle: "Granska och bekräfta registreringen",
      fields: [],
      actions: [
        { label: "Bekräfta sellout", type: "primary" },
        { label: "← Ändra uppgifter", type: "secondary" },
      ],
      states: {
        success: "Sellout registrerat! Statutory warranty har aktiverats.",
        error: "Registreringen misslyckades — försök igen",
        loading: "Registrerar sellout...",
      },
      notes: [
        "Sammanfattningskort: produkt + kund + datum + referens",
        "Statusändring: 'Saknas' → 'Registrerad' med grön badge",
        "Automatisk trigger: statutory warranty startar vid bekräftelse",
      ],
    },
  ],
  transitions: [
    { from: "sellout_confirm", to: "installation", label: "Fortsätt med installation →", condition: "installation saknas" },
    { from: "sellout_confirm", to: "warranty_start", label: "Aktivera garanti →", condition: "garanti ej aktiverad" },
    { from: "sellout_confirm", to: "dashboard", label: "Tillbaka till Dashboard" },
  ],
  bulkSupport: true,
};

/* ═══════════════════════════════════════════════════════
   C) INSTALLATION
   ═══════════════════════════════════════════════════════ */

export const installationFlow: TaskFlow = {
  id: "installation",
  title: "Registrera installation",
  subtitle: "Logga installationsdatum — CEORA via MIT API (valfritt)",
  entryPoints: [
    "Dashboard → Snabbåtgärder → Starta installation",
    "Idag-panel → Installation väntar → Åtgärda",
    "Sellout-bekräftelse → Fortsätt med installation",
    "Produktdetalj → Registrera installation",
  ],
  steps: [
    {
      id: "install_select",
      title: "Steg 1 — Välj produkt",
      subtitle: "Välj produkt att registrera installation för",
      fields: [
        {
          name: "product",
          label: "Produkt",
          type: "autocomplete",
          required: true,
          placeholder: "Sök på modell, PNC eller serienummer...",
          helper: "Visar produkter med registrerat sellout men utan installation",
          validation: "Produkt måste ha sellout registrerat",
          errorMsg: "Denna produkt saknar sellout — registrera sellout först",
        },
      ],
      actions: [
        { label: "Fortsätt →", type: "primary" },
        { label: "Avbryt", type: "secondary" },
      ],
      states: {
        empty: "Sök och välj en produkt",
        error: "Sellout saknas — registrera sellout innan installation",
      },
      notes: [
        "Om entry point är från sellout → produkt är förfylld",
        "Visar kompakt produktkort med kund + sålddatum",
      ],
    },
    {
      id: "install_details",
      title: "Steg 2 — Installationsdetaljer",
      subtitle: "Ange datum och installationsuppgifter",
      fields: [
        {
          name: "install_date",
          label: "Installationsdatum",
          type: "date",
          required: true,
          helper: "Datum då produkten installerades hos kund",
          validation: "Får ej vara före sålddatum. Får ej vara i framtiden.",
          errorMsg: "Datum måste vara mellan sålddatum och idag",
          prefill: "Om MIT-parkoppling finns: installationsdatum hämtas automatiskt",
        },
        {
          name: "install_address",
          label: "Installationsadress",
          type: "text",
          required: false,
          placeholder: "Gatuadress, ort",
          helper: "Förfylls från kundprofil om tillgänglig",
        },
        {
          name: "installer_name",
          label: "Installatör",
          type: "text",
          required: false,
          placeholder: "Namn på ansvarig tekniker",
        },
        {
          name: "ceora_mit_paired",
          label: "CEORA MIT-parkoppling",
          type: "checkbox",
          required: false,
          helper: "Markera om produkten är parkopplad via MIT API (gäller enbart CEORA)",
        },
        {
          name: "install_notes",
          label: "Installationsanteckningar",
          type: "textarea",
          required: false,
          placeholder: "Valfria anteckningar om installationen...",
        },
      ],
      actions: [
        { label: "Granska & bekräfta →", type: "primary" },
        { label: "← Tillbaka", type: "secondary" },
      ],
      states: {
        error: "Kontrollera markerade fält",
      },
      notes: [
        "CEORA-produkter: MIT-checkbox visas automatiskt baserat på produktkategori",
        "Om MIT-parkoppling detekteras: installationsdatum prefylls och fältet markeras '✓ Hämtat från MIT'",
      ],
    },
    {
      id: "install_confirm",
      title: "Steg 3 — Bekräfta installation",
      subtitle: "Granska och bekräfta",
      fields: [],
      actions: [
        { label: "Bekräfta installation", type: "primary" },
        { label: "← Ändra uppgifter", type: "secondary" },
      ],
      states: {
        success: "Installation registrerad!",
        error: "Registreringen misslyckades — försök igen",
        loading: "Registrerar installation...",
      },
      notes: [
        "Sammanfattning: produkt + kund + installationsdatum + adress + MIT-status",
        "Statusändring: 'Väntar' → 'Klar' med grön badge",
      ],
    },
  ],
  transitions: [
    { from: "install_confirm", to: "handover", label: "Fortsätt med överlämning →", condition: "handover saknas" },
    { from: "install_confirm", to: "warranty_start", label: "Aktivera garanti →", condition: "garanti ej aktiverad" },
    { from: "install_confirm", to: "dashboard", label: "Tillbaka till Dashboard" },
  ],
  bulkSupport: false,
};

/* ═══════════════════════════════════════════════════════
   D) HANDOVER
   ═══════════════════════════════════════════════════════ */

export const handoverFlow: TaskFlow = {
  id: "handover",
  title: "Registrera överlämning",
  subtitle: "Markera produkt som överlämnad till kund — knyter till CX Bonus",
  entryPoints: [
    "Dashboard → Snabbåtgärder → Överlämning",
    "Idag-panel → Överlämning väntar → Åtgärda",
    "Installation-bekräftelse → Fortsätt med överlämning",
    "Produktdetalj → Registrera överlämning",
  ],
  steps: [
    {
      id: "handover_select",
      title: "Steg 1 — Välj produkt",
      subtitle: "Välj installerad produkt att överlämna",
      fields: [
        {
          name: "product",
          label: "Produkt",
          type: "autocomplete",
          required: true,
          placeholder: "Sök installerade produkter utan överlämning...",
          helper: "Visar produkter med slutförd installation men utan överlämning",
          validation: "Produkt måste ha installation registrerad",
          errorMsg: "Installationen saknas — registrera installation först",
        },
      ],
      actions: [
        { label: "Fortsätt →", type: "primary" },
        { label: "Avbryt", type: "secondary" },
      ],
      states: {
        empty: "Sök och välj en produkt",
      },
    },
    {
      id: "handover_details",
      title: "Steg 2 — Överlämningsdetaljer",
      subtitle: "Ange överlämningsdatum och bekräftelse",
      fields: [
        {
          name: "handover_date",
          label: "Överlämningsdatum",
          type: "date",
          required: true,
          helper: "Datum då produkten överlämnades till slutkund",
          validation: "Får ej vara före installationsdatum. Får ej vara i framtiden.",
          errorMsg: "Datum måste vara mellan installationsdatum och idag",
        },
        {
          name: "customer_acceptance",
          label: "Kunden har godkänt överlämningen",
          type: "checkbox",
          required: true,
          helper: "Bekräftar att kunden mottagit produkten och fått instruktioner",
          errorMsg: "Kundacceptans krävs för att slutföra överlämningen",
        },
        {
          name: "handover_checklist",
          label: "Överlämningschecklista",
          type: "checkbox",
          required: false,
          options: [
            "Produkt demovisad för kund",
            "Säkerhetsinstruktioner genomgångna",
            "Underhållsschema kommunicerat",
            "Kontaktuppgifter utbytta",
            "App/Connect-koppling genomförd",
          ],
          helper: "Frivillig checklista — dokumenterar vad som ingick i överlämningen",
        },
        {
          name: "handover_notes",
          label: "Anteckningar",
          type: "textarea",
          required: false,
          placeholder: "Valfria noteringar om överlämningen...",
        },
      ],
      actions: [
        { label: "Granska & bekräfta →", type: "primary" },
        { label: "← Tillbaka", type: "secondary" },
      ],
      states: {
        error: "Kontrollera markerade fält — kundacceptans krävs",
      },
      notes: [
        "Digital signatur (framtida): fält förberett men ej aktivt i MVP — visa 'Kommer snart'-label",
      ],
    },
    {
      id: "handover_confirm",
      title: "Steg 3 — Bekräfta överlämning",
      subtitle: "Granska och bekräfta",
      fields: [],
      actions: [
        { label: "Bekräfta överlämning", type: "primary" },
        { label: "← Ändra uppgifter", type: "secondary" },
      ],
      states: {
        success: "Överlämning registrerad! Kontrollera din CX Bonus-status.",
        error: "Registreringen misslyckades — försök igen",
        loading: "Registrerar överlämning...",
      },
      notes: [
        "Vid bekräftelse: toast med 'Överlämning registrerad' + länk till CX Bonus",
        "Statusändring: 'Väntar' → 'Klar'",
      ],
    },
  ],
  transitions: [
    { from: "handover_confirm", to: "warranty_start", label: "Aktivera garanti →", condition: "garanti ej aktiverad" },
    { from: "handover_confirm", to: "cx_bonus", label: "Visa CX Bonus-status →" },
    { from: "handover_confirm", to: "dashboard", label: "Tillbaka till Dashboard" },
  ],
  bulkSupport: false,
};

/* ═══════════════════════════════════════════════════════
   E) WARRANTY START
   ═══════════════════════════════════════════════════════ */

export const warrantyStartFlow: TaskFlow = {
  id: "warranty_start",
  title: "Aktivera garanti",
  subtitle: "Starta tillverkargaranti — kunden får tillgång till T&C digitalt",
  entryPoints: [
    "Dashboard → Snabbåtgärder → Aktivera garanti",
    "Idag-panel → Garanti ej aktiverad → Åtgärda",
    "Sellout/Installation/Handover-bekräftelse → Aktivera garanti",
    "Produktdetalj → Aktivera garanti",
  ],
  steps: [
    {
      id: "warranty_product",
      title: "Steg 1 — Produkt & kund",
      subtitle: "Bekräfta produkten och kundens uppgifter",
      fields: [
        {
          name: "product",
          label: "Produkt",
          type: "autocomplete",
          required: true,
          placeholder: "Sök produkt...",
          helper: "Förfylld om du kommer från produktvyn",
          prefill: "Automower 435X AWD · 2024-435X-00891",
        },
        {
          name: "customer_name",
          label: "Kundens namn",
          type: "text",
          required: true,
          placeholder: "Förnamn Efternamn eller Företagsnamn",
          validation: "Minst 2 tecken",
          errorMsg: "Ange kundens namn",
          prefill: "Förfylls från kundprofil",
        },
        {
          name: "customer_email",
          label: "E-postadress",
          type: "email",
          required: true,
          placeholder: "kund@example.se",
          validation: "Giltig e-postadress",
          errorMsg: "Ange en giltig e-postadress",
          helper: "Garantivillkor och bekräftelse skickas hit",
        },
        {
          name: "customer_phone",
          label: "Telefonnummer",
          type: "tel",
          required: true,
          placeholder: "+46 70 123 45 67",
          validation: "Giltigt telefonnummer (internationellt format tillåtet)",
          errorMsg: "Ange ett giltigt telefonnummer",
        },
        {
          name: "customer_address",
          label: "Postadress",
          type: "text",
          required: false,
          placeholder: "Gatuadress, postnummer, ort",
          helper: "Valfritt — används för garantiärenden",
        },
      ],
      actions: [
        { label: "Fortsätt →", type: "primary" },
        { label: "Avbryt", type: "secondary" },
      ],
      states: {
        empty: "Fyll i kundens kontaktuppgifter",
        error: "Kontrollera markerade fält",
      },
      notes: [
        "Fält prefylls om kund redan finns i systemet",
        "Landskod: detekteras automatiskt men kan ändras manuellt",
      ],
    },
    {
      id: "warranty_date",
      title: "Steg 2 — Garantistart",
      subtitle: "Ange startdatum för tillverkargarantin",
      fields: [
        {
          name: "warranty_start_date",
          label: "Garantistartdatum",
          type: "date",
          required: true,
          helper: "Standardvärde: sålddatum eller installationsdatum",
          validation: "Får ej vara i framtiden. Får ej vara mer än 365 dagar bakåt.",
          errorMsg: "Ogiltigt datum",
          prefill: "Hämtas automatiskt från sellout/installation",
        },
        {
          name: "warranty_type",
          label: "Garantityp",
          type: "select",
          required: true,
          options: ["Tillverkargaranti (standard)", "Utökad garanti"],
          helper: "Standardgaranti är förvalt — utökad garanti kräver avtal",
        },
        {
          name: "accept_terms",
          label: "Kunden har tagit del av garantivillkor (T&C)",
          type: "checkbox",
          required: true,
          errorMsg: "Kunden måste godkänna garantivillkoren",
          helper: "Länk till fullständiga villkor visas bredvid",
        },
      ],
      actions: [
        { label: "Granska & bekräfta →", type: "primary" },
        { label: "← Tillbaka", type: "secondary" },
        { label: "Visa garantivillkor (PDF)", type: "link" },
      ],
      states: {
        error: "Kontrollera markerade fält",
      },
    },
    {
      id: "warranty_confirm",
      title: "Steg 3 — Bekräfta garanti",
      subtitle: "Granska och aktivera",
      fields: [],
      actions: [
        { label: "Aktivera garanti", type: "primary" },
        { label: "← Ändra uppgifter", type: "secondary" },
      ],
      states: {
        success: "Garanti aktiverad! Bekräftelse skickas till kunden via e-post.",
        error: "Aktiveringen misslyckades — försök igen",
        loading: "Aktiverar garanti...",
      },
      notes: [
        "Sammanfattning: produkt + kund + startdatum + typ",
        "E-post trigger: kunden får garantibevis + T&C som PDF",
        "Statusändring: 'Ej aktiverad' → 'Aktiv' med grön badge",
      ],
    },
  ],
  transitions: [
    { from: "warranty_confirm", to: "service_contract", label: "Registrera serviceavtal →", condition: "alltid tillgänglig" },
    { from: "warranty_confirm", to: "dashboard", label: "Tillbaka till Dashboard" },
  ],
  bulkSupport: false,
};

/* ═══════════════════════════════════════════════════════
   F) SERVICE CONTRACT (SERVICE PLUS)
   ═══════════════════════════════════════════════════════ */

export const serviceContractFlow: TaskFlow = {
  id: "service_contract",
  title: "Registrera serviceavtal",
  subtitle: "Service Plus — välj kund, produkt och plan",
  entryPoints: [
    "Dashboard → Snabbåtgärder → Nytt serviceavtal",
    "Garanti-bekräftelse → Registrera serviceavtal",
    "Avtal & program → + Nytt avtal",
    "Produktdetalj → Nytt serviceavtal",
    "Kundprofil → Nytt avtal",
  ],
  steps: [
    {
      id: "contract_customer",
      title: "Steg 1 — Välj kund",
      subtitle: "Sök och välj kund för avtalet",
      fields: [
        {
          name: "customer",
          label: "Kund",
          type: "autocomplete",
          required: true,
          placeholder: "Sök kund...",
          helper: "Visar befintliga kunder med produkter utan avtal",
          validation: "Kund måste finnas i systemet",
          errorMsg: "Kunden hittades inte — registrera ny kund först",
        },
      ],
      actions: [
        { label: "Fortsätt →", type: "primary" },
        { label: "Avbryt", type: "secondary" },
        { label: "+ Registrera ny kund", type: "link" },
      ],
      states: {
        empty: "Sök och välj en kund",
        loading: "Söker kunder...",
      },
      notes: [
        "Kundkort visas med: namn, antal produkter, befintliga avtal",
        "Förfylld om entry point är från kundprofil",
      ],
    },
    {
      id: "contract_product",
      title: "Steg 2 — Välj produkt",
      subtitle: "Välj kundens produkt att knyta avtal till",
      fields: [
        {
          name: "product",
          label: "Produkt",
          type: "select",
          required: true,
          helper: "Visar kundens produkter som saknar serviceavtal",
          validation: "Produkt måste tillhöra vald kund",
          errorMsg: "Ingen produkt vald",
          options: ["Automower 435X AWD · 2024-435X-00891", "Automower 550X Mark II · 2024-550X-01244"],
        },
      ],
      actions: [
        { label: "Fortsätt →", type: "primary" },
        { label: "← Tillbaka", type: "secondary" },
      ],
      states: {
        empty: "Kunden har inga produkter utan avtal",
      },
    },
    {
      id: "contract_plan",
      title: "Steg 3 — Välj serviceplan",
      subtitle: "Välj plan och ange avtalstid",
      fields: [
        {
          name: "plan_type",
          label: "Serviceplan",
          type: "radio",
          required: true,
          options: ["Service Plus Basic", "Service Plus Premium", "Service Plus Pro"],
          helper: "Jämför planer nedan",
        },
        {
          name: "contract_start",
          label: "Avtalets startdatum",
          type: "date",
          required: true,
          helper: "Standard: idag",
          validation: "Får ej vara i det förflutna",
          errorMsg: "Startdatum måste vara idag eller framåt",
        },
        {
          name: "contract_period",
          label: "Avtalsperiod",
          type: "select",
          required: true,
          options: ["12 månader", "24 månader", "36 månader"],
          helper: "Längre period ger bättre pris per månad",
        },
        {
          name: "bonus_eligible",
          label: "CX Bonus-berättigad",
          type: "checkbox",
          required: false,
          helper: "Markera om avtalet kvalificerar för CX Bonus",
        },
      ],
      actions: [
        { label: "Granska & bekräfta →", type: "primary" },
        { label: "← Tillbaka", type: "secondary" },
      ],
      states: {
        error: "Välj serviceplan och avtalsperiod",
      },
      notes: [
        "PDP-liknande layout: plan-jämförelse med pris per månad, inkluderade tjänster, rekommendation",
        "Prisvisning: baserad på produktmodell + vald period",
        "Bonusberättigad: automatiskt ifyllt baserat på kund/produkt-status",
      ],
    },
    {
      id: "contract_confirm",
      title: "Steg 4 — Bekräfta avtal",
      subtitle: "Granska avtalssammanfattning",
      fields: [],
      actions: [
        { label: "Registrera avtal", type: "primary" },
        { label: "← Ändra uppgifter", type: "secondary" },
      ],
      states: {
        success: "Serviceavtal registrerat! Avtals-ID: SP-2026-XXX",
        error: "Registreringen misslyckades — försök igen",
        loading: "Registrerar avtal...",
      },
      notes: [
        "Sammanfattning: kund + produkt + plan + period + pris + bonus-status",
        "Avtals-ID genereras vid bekräftelse",
        "E-post: avtalsbekräftelse till kund + intern notifikation",
      ],
    },
  ],
  transitions: [
    { from: "contract_confirm", to: "dashboard", label: "Tillbaka till Dashboard" },
    { from: "contract_confirm", to: "contracts", label: "Visa alla avtal →" },
  ],
  bulkSupport: false,
};

/* ═══════════════════════════════════════════════════════
   G) CEORA HYPERCARE
   ═══════════════════════════════════════════════════════ */

export const hypercareFlow: TaskFlow = {
  id: "hypercare",
  title: "CEORA HyperCare",
  subtitle: "Hantera HyperCare-steg, checklista, claim och bonusstatus",
  entryPoints: [
    "Dashboard → KPI → HyperCare",
    "Dashboard → Prioritetslista → HyperCare-ärende",
    "Idag-panel → HyperCare steg väntar → Åtgärda",
    "Avtal & program → HyperCare-filter",
    "Produktdetalj → HyperCare-status",
  ],
  steps: [
    {
      id: "hc_overview",
      title: "HyperCare-översikt",
      subtitle: "Alla aktiva HyperCare-enheter och deras steg",
      fields: [
        {
          name: "filter_status",
          label: "Filtrera status",
          type: "select",
          required: false,
          options: ["Alla", "Väntar på åtgärd", "Pågår", "Avslutade"],
        },
        {
          name: "filter_step",
          label: "Filtrera steg",
          type: "select",
          required: false,
          options: ["Alla steg", "Steg 1 — Initial", "Steg 2 — Uppföljning", "Steg 3 — Avslut"],
        },
      ],
      actions: [
        { label: "Starta nytt HyperCare", type: "primary" },
      ],
      states: {
        empty: "Inga aktiva HyperCare-enheter",
        loading: "Laddar HyperCare-enheter...",
      },
      notes: [
        "Listvy med: produkt, kund, aktuellt steg, status, senast uppdaterad",
        "Steg-progress visas som horisontell stepper (1/3, 2/3, 3/3)",
        "Klick öppnar detaljvy",
      ],
    },
    {
      id: "hc_start",
      title: "Starta HyperCare",
      subtitle: "Initiera HyperCare för CEORA-enhet",
      fields: [
        {
          name: "product",
          label: "CEORA-produkt",
          type: "autocomplete",
          required: true,
          placeholder: "Sök CEORA-enhet...",
          helper: "Enbart CEORA-produkter visas",
          validation: "Produkten måste vara en CEORA-modell med aktiv installation",
          errorMsg: "Produkten är inte en CEORA eller saknar installation",
        },
        {
          name: "start_date",
          label: "HyperCare startdatum",
          type: "date",
          required: true,
          helper: "Standard: installationsdatum",
          validation: "Får ej vara i framtiden",
          errorMsg: "Ogiltigt datum",
        },
        {
          name: "responsible_technician",
          label: "Ansvarig tekniker",
          type: "text",
          required: true,
          placeholder: "Namn på ansvarig",
        },
        {
          name: "notes",
          label: "Initiala anteckningar",
          type: "textarea",
          required: false,
          placeholder: "Bakgrund, kända issues, specifika krav...",
        },
      ],
      actions: [
        { label: "Starta HyperCare", type: "primary" },
        { label: "Avbryt", type: "secondary" },
      ],
      states: {
        success: "HyperCare initierat! HC-ID: HC-XXX",
        error: "Kunde inte starta HyperCare — kontrollera fälten",
      },
    },
    {
      id: "hc_step_manage",
      title: "Hantera HyperCare-steg",
      subtitle: "Utför checklista och dokumentera varje steg",
      fields: [
        {
          name: "step_number",
          label: "Aktuellt steg",
          type: "radio",
          required: true,
          options: ["Steg 1 — Initial kontroll", "Steg 2 — Uppföljning", "Steg 3 — Avslutande kontroll"],
        },
        {
          name: "checklist",
          label: "Checklista",
          type: "checkbox",
          required: true,
          options: [
            "Driftstatus kontrollerad",
            "Klippkvalitet verifierad",
            "Slingtest genomfört",
            "Firmware uppdaterad",
            "Kundkommunikation utförd",
            "Bilduppladdning (dokumentation)",
          ],
          helper: "Alla obligatoriska punkter måste bockas av",
          errorMsg: "Slutför alla obligatoriska checklistepunkter",
        },
        {
          name: "step_date",
          label: "Stegdatum",
          type: "date",
          required: true,
          helper: "Datum då steget genomfördes",
          validation: "Får ej vara i framtiden",
          errorMsg: "Ogiltigt datum",
        },
        {
          name: "technician_notes",
          label: "Teknikeranteckningar",
          type: "textarea",
          required: false,
          placeholder: "Observationer, åtgärder, avvikelser...",
        },
        {
          name: "photo_upload",
          label: "Bilduppladdning",
          type: "file",
          required: false,
          helper: "Ladda upp foton som dokumentation (max 5 st, JPG/PNG)",
          validation: "Max 5 filer, max 10 MB styck",
          errorMsg: "Filen är för stor eller i fel format",
        },
      ],
      actions: [
        { label: "Slutför steg", type: "primary" },
        { label: "Spara utkast", type: "secondary" },
      ],
      states: {
        success: "Steg slutfört! Nästa steg aktiverat.",
        error: "Slutför alla obligatoriska checklistepunkter",
        loading: "Sparar...",
      },
      notes: [
        "Stepper-komponent visar progress (1/3 → 2/3 → 3/3)",
        "Avslutade steg markeras med ✓ och är readonly",
        "Utkast sparas automatiskt var 30:e sekund",
      ],
    },
    {
      id: "hc_claim",
      title: "Skapa HyperCare Claim",
      subtitle: "Registrera claim för bonusberättigande",
      fields: [
        {
          name: "claim_type",
          label: "Claim-typ",
          type: "select",
          required: true,
          options: ["Slutförd HyperCare (alla steg)", "Partiell claim (vid byte av ÅF)"],
          helper: "Välj typ baserat på slutförd status",
        },
        {
          name: "claim_amount",
          label: "Claimbelopp",
          type: "number",
          required: false,
          helper: "Beräknas automatiskt baserat på produkt och slutförda steg",
          prefill: "Auto-beräknat",
        },
        {
          name: "claim_notes",
          label: "Claim-anteckningar",
          type: "textarea",
          required: false,
          placeholder: "Valfri kommentar till claim...",
        },
      ],
      actions: [
        { label: "Skicka claim", type: "primary" },
        { label: "Avbryt", type: "secondary" },
      ],
      states: {
        success: "Claim inskickad! Bearbetning tar 5–10 arbetsdagar.",
        error: "Claimen kunde inte skickas — kontrollera fälten",
        loading: "Skickar claim...",
      },
    },
    {
      id: "hc_bonus",
      title: "Bonusstatus",
      subtitle: "Visa och följ upp HyperCare-bonus",
      fields: [],
      actions: [
        { label: "Exportera rapport", type: "secondary" },
        { label: "Tillbaka till HyperCare-översikt", type: "link" },
      ],
      states: {
        empty: "Inga claims registrerade ännu",
      },
      notes: [
        "Visar: totalt intjänat, utbetalt, väntar på bearbetning",
        "Per-enhet: produkt, kund, steg-progress, claim-status, belopp",
        "Exporterbar som CSV/PDF",
      ],
    },
  ],
  transitions: [
    { from: "hc_start", to: "hc_step_manage", label: "Gå till steg 1" },
    { from: "hc_step_manage", to: "hc_step_manage", label: "Nästa steg", condition: "steg ej 3" },
    { from: "hc_step_manage", to: "hc_claim", label: "Skapa claim", condition: "alla steg slutförda" },
    { from: "hc_claim", to: "hc_bonus", label: "Visa bonusstatus" },
    { from: "hc_bonus", to: "hc_overview", label: "Tillbaka till översikt" },
  ],
  bulkSupport: false,
};

/* ═══════════════════════════════════════════════════════
   ALL FLOWS COMBINED
   ═══════════════════════════════════════════════════════ */

export const allFlows: TaskFlow[] = [
  identifyProductFlow,
  selloutFlow,
  installationFlow,
  handoverFlow,
  warrantyStartFlow,
  serviceContractFlow,
  hypercareFlow,
];

/* ═══════════════════════════════════════════════════════
   JSON EXPORT STRUCTURE
   ═══════════════════════════════════════════════════════ */

export const flowsJsonExport = {
  version: "1.0",
  scope: "2026 Sellout & Customer Registration",
  flows: Object.fromEntries(
    allFlows.map((f) => [
      f.id,
      {
        title: f.title,
        subtitle: f.subtitle,
        entryPoints: f.entryPoints,
        bulkSupport: f.bulkSupport,
        mobileVariant: f.mobileVariant,
        steps: f.steps.map((s) => ({
          id: s.id,
          title: s.title,
          subtitle: s.subtitle,
          fieldCount: s.fields.length,
          requiredFields: s.fields.filter((fd) => fd.required).map((fd) => fd.name),
          actions: s.actions.map((a) => a.label),
          states: s.states,
        })),
        transitions: f.transitions,
      },
    ])
  ),
  journeySequence: [
    "identify_product",
    "sellout",
    "installation",
    "handover",
    "warranty_start",
    "service_contract",
    "hypercare",
  ],
  transitionMap: {
    identify_product: ["sellout", "installation", "handover", "warranty_start", "service_contract"],
    sellout: ["installation", "warranty_start", "dashboard"],
    installation: ["handover", "warranty_start", "dashboard"],
    handover: ["warranty_start", "cx_bonus", "dashboard"],
    warranty_start: ["service_contract", "dashboard"],
    service_contract: ["dashboard", "contracts"],
    hypercare: ["hc_step_manage", "hc_claim", "hc_bonus", "dashboard"],
  },
};
