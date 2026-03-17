export type NavItem = {
  label: string;
  href: string;
  badge?: string;
};

export type NavShowcase = {
  type: "showcase";
  title: string;
  description: string;
  badge: string;
  cta: string;
  action: string;
};

export type NavGroup = {
  label: string;
  items: NavItem[];
  showcase?: NavShowcase;
  primary?: boolean;
};

export type NavSection = {
  id: string;
  label: string;
  groups: NavGroup[];
};

/* ═══════════════════════════════════════════════════════
   HUSQVARNA (OEM-domän)
   ═══════════════════════════════════════════════════════ */

export const husqvarnaNav: NavSection = {
  id: "husqvarna",
  label: "Husqvarna",
  groups: [
    {
      label: "Produktkatalog",
      primary: true,
      items: [
        { label: "Produktkategorier", href: "#categories" },
        { label: "Pris & tillgänglighet", href: "#pricing" },
        { label: "Lagerstatus", href: "#stock" },
        { label: "Produktjämförelse", href: "#compare" },
      ],
    },
    {
      label: "Produktidentifiering",
      primary: true,
      items: [
        { label: "Sök via PNC / artikelnummer", href: "#pnc" },
        { label: "Sök via serienummer", href: "#serial" },
        { label: "QR-skanning", href: "#qr" },
      ],
      showcase: {
        type: "showcase",
        title: "AI-assisterad reservdelssök",
        description:
          "Beskriv maskinen och felet — få guidning till rätt sprängskiss och del.",
        badge: "Beta",
        cta: "Starta AI-sök",
        action: "ai-parts-finder",
      },
    },
    {
      label: "Sprängskisser & reservdelar",
      primary: true,
      items: [
        { label: "Sök sprängskiss", href: "#exploded" },
        { label: "Reservdelsbeställning", href: "#parts-order" },
      ],
    },
    {
      label: "Dokument & manualer",
      items: [
        { label: "Produktmanualer", href: "#manuals" },
        { label: "Servicebulletiner", href: "#bulletins" },
        { label: "Tekniska specifikationer", href: "#specs" },
        { label: "Installationsguider", href: "#install-guides" },
      ],
    },
    {
      label: "Digitala verktyg",
      items: [
        { label: "Fleet Services", href: "#fleet" },
        { label: "Automower Connect Pro", href: "#connect" },
        { label: "CEORA-planering", href: "#ceora" },
      ],
    },
    {
      label: "Kampanjer & nyheter",
      items: [
        { label: "Aktiva kampanjer", href: "#campaigns" },
        { label: "Kommande kampanjer", href: "#upcoming" },
        { label: "Nyheter & lanseringar", href: "#news" },
      ],
    },
    {
      label: "Utbildning & support",
      items: [
        { label: "Husqvarna University", href: "#university" },
        { label: "Supportcenter", href: "#support" },
        { label: "Kontakt & eskalering", href: "#contact" },
      ],
    },
  ],
};

/* ═══════════════════════════════════════════════════════
   MIN VERKSAMHET (Dealer Workspace)
   ═══════════════════════════════════════════════════════ */

export const minVerksamhetNav: NavSection = {
  id: "min-verksamhet",
  label: "Min verksamhet",
  groups: [
    {
      label: "Dashboard",
      items: [
        { label: "KPI-översikt", href: "#dashboard", badge: "NY" },
        { label: "Trender & prognoser", href: "#trends" },
        { label: "Snabbåtgärder", href: "#quick-actions" },
      ],
    },
    {
      label: "Kunder",
      items: [
        { label: "Kundöversikt", href: "#customers" },
        { label: "Registrera ny kund", href: "#customer-new" },
        { label: "Kundkommunikation", href: "#customer-comms" },
      ],
    },
    {
      label: "Produkter",
      items: [
        { label: "Mitt sortiment", href: "#my-products" },
        { label: "Registrerade produkter", href: "#registered" },
        { label: "Produktregistrering", href: "#register-product" },
        { label: "Garantistatus", href: "#warranty" },
      ],
    },
    {
      label: "Avtal & program",
      items: [
        { label: "Service Plus", href: "#service-plus" },
        { label: "Lease Plus", href: "#lease-plus" },
        { label: "Second Life", href: "#second-life" },
        { label: "Programöversikt", href: "#programs" },
      ],
    },
    {
      label: "Sellout & installation",
      items: [
        { label: "Markera såld produkt", href: "#sellout" },
        { label: "Installationsguide", href: "#installation" },
        { label: "Överlämningschecklist", href: "#handover" },
        { label: "CX Bonus", href: "#cx-bonus" },
      ],
    },
    {
      label: "HyperCare",
      items: [
        { label: "Aktiva ärenden", href: "#hypercare" },
        { label: "Ärendehistorik", href: "#hypercare-history" },
        { label: "Eskalering", href: "#escalation" },
      ],
    },
    {
      label: "Order & ekonomi",
      items: [
        { label: "Beställningar", href: "#orders" },
        { label: "Restorder", href: "#backorders" },
        { label: "Leveranser", href: "#deliveries" },
        { label: "Fakturor", href: "#invoices" },
        { label: "Returer / RMA", href: "#returns" },
      ],
    },
    {
      label: "Försäljning",
      items: [
        { label: "Offerter", href: "#quotes" },
        { label: "Orderutkast", href: "#drafts" },
        { label: "Wishlist", href: "#wishlist" },
      ],
    },
    {
      label: "Aviseringar & uppgifter",
      items: [
        { label: "Att göra", href: "#tasks" },
        { label: "Notifieringar", href: "#notifications" },
        { label: "Systemmeddelanden", href: "#system-messages" },
      ],
    },
    {
      label: "Administration",
      items: [
        { label: "Företagsprofil", href: "#company" },
        { label: "Användarhantering", href: "#users" },
        { label: "Prislistor", href: "#pricelists" },
        { label: "Fakturering & leveransadresser", href: "#billing" },
      ],
    },
  ],
};

/* ═══════════════════════════════════════════════════════
   MITT KONTO (personligt)
   ═══════════════════════════════════════════════════════ */

export const accountNav = {
  label: "Mitt konto",
  items: [
    { label: "Min profil", href: "#profile" },
    { label: "Notifikationsinställningar", href: "#notification-settings" },
    { label: "Språk", href: "#language" },
    { label: "Lösenord", href: "#password" },
    { label: "Användarpreferenser", href: "#preferences" },
    { label: "Logga ut", href: "#logout" },
  ],
};

/* ═══════════════════════════════════════════════════════
   JSON IA SPEC (för utveckling & Figma)
   ═══════════════════════════════════════════════════════ */

export const iaSpec = {
  version: "1.0",
  domains: [
    {
      id: "husqvarna",
      label: "Husqvarna",
      role: "OEM-innehåll",
      description: "Produkter, reservdelar, dokument och OEM-tjänster",
      nodes: [
        {
          id: "catalog",
          label: "Produktkatalog",
          type: "grid-filter",
          intent: "Bläddra i sortimentet, jämföra och se priser",
          primaryActions: ["Filtrera", "Jämför", "Se pris"],
          secondaryActions: ["Exportera", "Lägg i wishlist"],
          children: ["categories", "pricing", "stock", "compare"],
        },
        {
          id: "identification",
          label: "Produktidentifiering",
          type: "search-form",
          intent: "Hitta rätt produkt via PNC, serienummer eller QR",
          primaryActions: ["Sök", "Skanna QR"],
          secondaryActions: ["AI-sök", "Gå till sprängskiss"],
          children: ["pnc-search", "serial-search", "qr-scan", "ai-search"],
        },
        {
          id: "exploded-parts",
          label: "Sprängskisser & reservdelar",
          type: "interactive-view",
          intent: "Hitta och beställa en reservdel",
          primaryActions: ["Sök modell", "Navigera sprängskiss"],
          secondaryActions: ["Beställ del", "Se alternativ"],
        },
        {
          id: "documents",
          label: "Dokument & manualer",
          type: "list-search",
          intent: "Hitta manual eller servicebulettin",
          primaryActions: ["Sök", "Filtrera på typ"],
          secondaryActions: ["Ladda ned", "Skriv ut"],
        },
        {
          id: "tools",
          label: "Digitala verktyg",
          type: "card-grid",
          intent: "Nå Fleet Services, Connect Pro etc.",
          primaryActions: ["Öppna verktyg"],
          secondaryActions: ["Se dokumentation"],
        },
        {
          id: "campaigns",
          label: "Kampanjer & nyheter",
          type: "timeline-cards",
          intent: "Se aktiva kampanjer och nyheter",
          primaryActions: ["Visa kampanjdetaljer"],
          secondaryActions: ["Ladda ned material"],
        },
        {
          id: "education",
          label: "Utbildning & support",
          type: "card-grid",
          intent: "Boka utbildning eller kontakta support",
          primaryActions: ["Gå till University", "Öppna ärende"],
          secondaryActions: ["Se certifieringar"],
        },
      ],
    },
    {
      id: "min-verksamhet",
      label: "Min verksamhet",
      role: "Dealer operations",
      description: "Dashboard, kunder, order, avtal och daglig drift",
      nodes: [
        {
          id: "dashboard",
          label: "Dashboard",
          type: "dashboard-kpi",
          intent: "Se vad som kräver min uppmärksamhet",
          primaryActions: ["Gå till uppgifter", "Se trender"],
          secondaryActions: ["Filtrera period", "Exportera"],
        },
        {
          id: "customers",
          label: "Kunder",
          type: "list-detail",
          intent: "Hantera mina kundrelationer",
          primaryActions: ["Sök kund", "Registrera ny"],
          secondaryActions: ["Se tidslinje", "Koppla produkt"],
          children: ["customer-list", "customer-profile", "customer-new"],
        },
        {
          id: "products",
          label: "Produkter",
          type: "list-filter",
          intent: "Se registrerade produkter och status",
          primaryActions: ["Registrera produkt", "Filtrera"],
          secondaryActions: ["Exportera", "Garanti-check"],
        },
        {
          id: "contracts",
          label: "Avtal & program",
          type: "list-detail-wizard",
          intent: "Skapa och följa upp avtal",
          primaryActions: ["Skapa avtal", "Förnya"],
          secondaryActions: ["Se historik", "Kalkylera"],
          children: ["service-plus", "lease-plus", "second-life"],
        },
        {
          id: "sellout",
          label: "Sellout",
          type: "action-form-list",
          intent: "Markera en produkt som såld",
          primaryActions: ["Markera såld", "Rapportera"],
          secondaryActions: ["Se historik", "Exportera"],
        },
        {
          id: "installation",
          label: "Installation & överlämning",
          type: "wizard-checklist",
          intent: "Slutföra en installation",
          primaryActions: ["Starta installation", "Checka av"],
          secondaryActions: ["Boka tid", "Dokumentera"],
        },
        {
          id: "cx-bonus",
          label: "CX Bonus",
          type: "dashboard-list",
          intent: "Se min bonusstatus",
          primaryActions: ["Se krav", "Granska utbetalning"],
          secondaryActions: ["Exportera rapport"],
        },
        {
          id: "hypercare",
          label: "HyperCare",
          type: "list-detail",
          intent: "Hantera prioriterade ärenden",
          primaryActions: ["Öppna ärende", "Eskalera"],
          secondaryActions: ["Se historik", "Kommentera"],
        },
        {
          id: "orders",
          label: "Order & ekonomi",
          type: "tab-list",
          intent: "Se orderstatus, fakturor och leveranser",
          primaryActions: ["Filtrera", "Sök order"],
          secondaryActions: ["Exportera", "Reklamera"],
          children: ["orders", "backorders", "deliveries", "invoices", "returns"],
        },
        {
          id: "sales",
          label: "Försäljning",
          type: "list-form",
          intent: "Skapa offerter och hantera utkast",
          primaryActions: ["Skapa offert", "Redigera utkast"],
          secondaryActions: ["Konvertera till order"],
        },
        {
          id: "alerts",
          label: "Aviseringar & uppgifter",
          type: "notification-feed",
          intent: "Se vad jag behöver agera på",
          primaryActions: ["Markera klar", "Öppna ärende"],
          secondaryActions: ["Filtrera", "Snooze"],
        },
        {
          id: "admin",
          label: "Administration",
          type: "form-list",
          intent: "Hantera företagsinfo och användare",
          primaryActions: ["Redigera profil", "Bjud in användare"],
          secondaryActions: ["Ladda ned prislistor"],
        },
      ],
    },
    {
      id: "my-account",
      label: "Mitt konto",
      role: "Personligt",
      description: "Profilinställningar, notifikationer, språk",
      nodes: [
        { id: "profile", label: "Min profil", type: "form" },
        { id: "notifications", label: "Notifikationsinställningar", type: "form" },
        { id: "language", label: "Språk", type: "form" },
        { id: "password", label: "Lösenord", type: "form" },
        { id: "preferences", label: "Användarpreferenser", type: "form" },
      ],
    },
  ],
  navigationRules: {
    domainSeparation: "Husqvarna = OEM-innehåll, Min verksamhet = Dealer-operationer, Mitt konto = Personligt",
    crossDomainLinks: "Från produktdetalj (OEM) → 'Registrera till kund' → Min verksamhet",
    alertBubbling: "Tasks/alerts visas i Dashboard + header badge, hanteras under Aviseringar & uppgifter",
    breadcrumbs: "Inom varje domän. Toppnav visar domänbyte",
    searchScope: "Header-sök: OEM-produkter. Workspace-sök: kunder, order, ärenden",
    mobile: "Hamburger-meny med domänflikar. Dashboard som startvy",
  },
};
