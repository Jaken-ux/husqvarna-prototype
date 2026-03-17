/* ═══════════════════════════════════════════════════════════════
   HUSQVARNA DEALER PORTAL — DESIGN TOKENS
   Version 1.0 · 2026-03-13
   ═══════════════════════════════════════════════════════════════ */

export const tokens = {
  /* ─── A1. COLOR PALETTE ─── */
  color: {
    // Primary — brand navy
    "primary-900": "#1a2d4d",
    "primary-800": "#1f3459",
    primary: "#273A60",
    "primary-400": "#4a6190",
    "primary-200": "#a3b5d4",
    "primary-100": "#e8edf5",
    "primary-50": "#f5f7fb",

    // Secondary — Husqvarna orange
    "secondary-900": "#a34500",
    secondary: "#ff6b00",
    "secondary-400": "#ff9b4d",
    "secondary-100": "#fff3e0",

    // Success / green
    "success-900": "#1a5c30",
    success: "#2a9d5c",
    "success-100": "#e8f5e9",

    // Warning / amber
    "warning-900": "#7a5400",
    warning: "#b8860b",
    "warning-400": "#e6a817",
    "warning-100": "#fff8e1",

    // Danger / red
    "danger-900": "#7a1a1a",
    danger: "#c44",
    "danger-400": "#e57373",
    "danger-100": "#fce8e8",

    // Info / blue
    "info-900": "#0d3b75",
    info: "#1565c0",
    "info-100": "#e3f2fd",

    // Purple (contracts/programs)
    purple: "#7b1fa2",
    "purple-100": "#f3e5f5",

    // Neutrals — 11-stop grayscale
    "neutral-0": "#ffffff",
    "neutral-50": "#fafafa",
    "neutral-100": "#f5f5f5",
    "neutral-150": "#f0f0f0",
    "neutral-200": "#e5e5e5",
    "neutral-300": "#d0d0d0",
    "neutral-400": "#bbb",
    "neutral-500": "#999",
    "neutral-600": "#888",
    "neutral-700": "#555",
    "neutral-800": "#333",
    "neutral-900": "#111",

    // Surface / background
    "bg-page": "#fafafa",
    "bg-card": "#ffffff",
    "bg-input": "#f8f8f8",
    "bg-code": "#f0f3f8",

    // Borders
    "border-default": "#d0d0d0",
    "border-subtle": "#e5e5e5",
    "border-focus": "#999",
  },

  /* ─── A2. TYPOGRAPHY ─── */
  font: {
    family: {
      sans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      mono: "'JetBrains Mono', 'Fira Code', monospace",
    },

    // Heading scale
    h1: { size: 24, line: 32, weight: 700, tracking: -0.3 },
    h2: { size: 18, line: 26, weight: 600, tracking: 0 },
    h3: { size: 16, line: 22, weight: 600, tracking: 0 },
    h4: { size: 14, line: 20, weight: 600, tracking: 0 },
    h5: { size: 13, line: 18, weight: 600, tracking: 0 },
    h6: { size: 12, line: 16, weight: 600, tracking: 0 },

    // Body
    body: { size: 14, line: 20, weight: 400 },
    bodySmall: { size: 13, line: 18, weight: 400 },

    // Labels & helpers
    label: { size: 11, line: 14, weight: 600, tracking: 1.2, transform: "uppercase" },
    helper: { size: 11, line: 14, weight: 400 },
    badge: { size: 10, line: 12, weight: 700, tracking: 0.5 },

    // Data-dense tables
    tableHeader: { size: 11, line: 14, weight: 600, tracking: 1.0, transform: "uppercase" },
    tableCell: { size: 12, line: 16, weight: 400 },
    tableCellBold: { size: 13, line: 18, weight: 600 },
  },

  /* ─── A3. SPACING & GRID ─── */
  spacing: {
    scale: [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 96],
    //        0  1  2   3   4   5   6   7   8   9  10  11  12  13

    // Semantic aliases
    sectionGap: 48,        // between major page sections
    cardPadding: 20,       // inside cards
    cardGap: 12,           // between cards in grid
    tableCellPx: 12,       // horizontal cell padding
    tableCellPy: 12,       // vertical cell padding
    inputHeight: 36,       // standard input height
    inputHeightLg: 44,     // large search input
    buttonPx: 16,          // button horizontal padding
    buttonPy: 10,          // button vertical padding
  },

  grid: {
    maxWidth: 1320,
    columns: 12,
    gutter: 24,
    margin: 24,            // page side margin
  },

  breakpoints: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1440,
  },

  /* ─── A4. BORDERS & RADIUS ─── */
  radius: {
    sm: 6,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },

  border: {
    thin: 1,
    medium: 2,
    thick: 3,              // left accent on KPI cards
  },

  /* ─── A5. SHADOWS ─── */
  shadow: {
    card: "0 1px 3px rgba(0,0,0,.06)",
    cardHover: "0 6px 18px rgba(0,0,0,.08)",
    dropdown: "0 8px 24px rgba(0,0,0,.12)",
    focus: "0 0 0 2px rgba(39,58,96,0.25)",
    toast: "0 4px 12px rgba(0,0,0,.15)",
  },

  /* ─── A6. TRANSITIONS ─── */
  transition: {
    fast: "150ms ease",
    normal: "200ms ease",
    slow: "300ms ease",
    motionReduce: "0ms",
  },

  /* ─── A7. Z-INDEX ─── */
  zIndex: {
    dropdown: 30,
    sticky: 40,
    modal: 50,
    toast: 60,
    tooltip: 70,
  },
} as const;

/* ─── ICON SIZES ─── */
export const iconSizes = {
  xs: { size: 12, clickArea: 24 },
  sm: { size: 16, clickArea: 32 },
  md: { size: 20, clickArea: 40 },
  lg: { size: 24, clickArea: 48 },
} as const;

/* ─── STATUS TOKENS ─── */
export const statusTokens = {
  active:    { bg: tokens.color["success-100"], text: tokens.color["success-900"], label: "Aktiv" },
  expiring:  { bg: tokens.color["warning-100"], text: tokens.color["warning-900"], label: "Löper ut" },
  expired:   { bg: tokens.color["danger-100"],  text: tokens.color["danger-900"],  label: "Utgånget" },
  pending:   { bg: tokens.color["info-100"],    text: tokens.color["info-900"],    label: "Väntar" },
  missing:   { bg: tokens.color["danger-100"],  text: tokens.color["danger-900"],  label: "Saknas" },
  completed: { bg: tokens.color["success-100"], text: tokens.color["success-900"], label: "Klar" },
  draft:     { bg: tokens.color["neutral-100"], text: tokens.color["neutral-700"], label: "Utkast" },
  beta:      { bg: tokens.color["secondary-100"], text: tokens.color["secondary-900"], label: "Beta" },
  new:       { bg: tokens.color.secondary,      text: tokens.color["neutral-0"],   label: "NY" },
} as const;

/* ─── PRIORITY TOKENS ─── */
export const priorityTokens = {
  high:   { bg: tokens.color["danger-100"],  text: tokens.color.danger,  label: "Hög" },
  medium: { bg: tokens.color["warning-100"], text: tokens.color.warning, label: "Medel" },
  low:    { bg: tokens.color["success-100"], text: tokens.color.success, label: "Låg" },
} as const;

/* ─── ACTION TAG TOKENS ─── */
export const actionTagTokens = {
  installation:   { bg: tokens.color["info-100"],      text: tokens.color.info },
  avtal:          { bg: tokens.color["purple-100"],     text: tokens.color.purple },
  hypercare:      { bg: tokens.color["danger-100"],     text: tokens.color.danger },
  "överlämning":  { bg: tokens.color["warning-100"],    text: tokens.color.warning },
  sellout:        { bg: tokens.color["secondary-100"],  text: tokens.color["secondary-900"] },
  garanti:        { bg: tokens.color["success-100"],    text: tokens.color.success },
} as const;

/* ─── EVENT INSTRUMENTATION ─── */
export const eventSchema = {
  evt_nav_click: {
    description: "Användaren klickar i navigationen",
    payload: {
      domain: "husqvarna | min-verksamhet | mitt-konto",
      section: "string",
      item: "string",
      device: "desktop | tablet | mobile",
    },
    example: {
      event: "evt_nav_click",
      domain: "husqvarna",
      section: "Produktkatalog",
      item: "Produktkategorier",
      device: "desktop",
      timestamp: "2026-03-13T09:15:22Z",
    },
  },

  evt_dash_action: {
    description: "Interaktion med Dashboard-KPI eller snabbåtgärd",
    payload: {
      action: "kpi_click | quick_action | program_toggle | task_click",
      target: "string",
      value: "string | undefined",
    },
    example: {
      event: "evt_dash_action",
      action: "quick_action",
      target: "sellout_add",
      value: undefined,
      timestamp: "2026-03-13T09:16:00Z",
    },
  },

  evt_filter_apply: {
    description: "Användaren applicerar ett filter",
    payload: {
      view: "products | customers | contracts | today",
      filterType: "program | status | category | search",
      filterValue: "string",
      resultCount: "number",
    },
    example: {
      event: "evt_filter_apply",
      view: "products",
      filterType: "program",
      filterValue: "HyperCare",
      resultCount: 8,
      timestamp: "2026-03-13T09:17:30Z",
    },
  },

  evt_bulk_action: {
    description: "Användaren utför en bulkåtgärd på markerade rader",
    payload: {
      view: "products | contracts",
      action: "add_sold_date | add_installation | register_contract | export",
      selectedCount: "number",
    },
    example: {
      event: "evt_bulk_action",
      view: "products",
      action: "add_sold_date",
      selectedCount: 3,
      timestamp: "2026-03-13T09:18:45Z",
    },
  },

  evt_sellout_add: {
    description: "Registrering av sålddatum",
    payload: {
      productId: "string",
      customerId: "string",
      soldDate: "ISO 8601",
      source: "workspace | today_panel | product_detail",
    },
    example: {
      event: "evt_sellout_add",
      productId: "2024-C546-00087",
      customerId: "cust-groenytor-001",
      soldDate: "2026-03-13",
      source: "today_panel",
      timestamp: "2026-03-13T09:20:00Z",
    },
  },

  evt_install_add: {
    description: "Registrering av installation/överlämning",
    payload: {
      productId: "string",
      customerId: "string",
      installDate: "ISO 8601",
      handoverComplete: "boolean",
      source: "workspace | today_panel | product_detail",
    },
    example: {
      event: "evt_install_add",
      productId: "2024-435X-00891",
      customerId: "cust-lindstrom-001",
      installDate: "2026-03-13",
      handoverComplete: false,
      source: "workspace",
      timestamp: "2026-03-13T09:21:15Z",
    },
  },

  evt_contract_add: {
    description: "Registrering av serviceavtal",
    payload: {
      contractType: "service_plus | lease_plus | hypercare",
      productId: "string",
      customerId: "string",
      startDate: "ISO 8601",
      endDate: "ISO 8601",
      bonusEligible: "boolean",
    },
    example: {
      event: "evt_contract_add",
      contractType: "service_plus",
      productId: "2024-310M-02198",
      customerId: "cust-nilsson-001",
      startDate: "2026-03-13",
      endDate: "2027-03-13",
      bonusEligible: true,
      timestamp: "2026-03-13T09:22:30Z",
    },
  },

  evt_search: {
    description: "Sökhändelse",
    payload: {
      scope: "global | products | customers | documents",
      query: "string",
      method: "text | pnc | serial | qr | ean",
      resultCount: "number",
    },
    example: {
      event: "evt_search",
      scope: "global",
      query: "435X",
      method: "text",
      resultCount: 3,
      timestamp: "2026-03-13T09:23:00Z",
    },
  },

  evt_tab_switch: {
    description: "Användaren byter flik i Workspace",
    payload: {
      from: "dashboard | products | customers | contracts | today",
      to: "dashboard | products | customers | contracts | today",
    },
    example: {
      event: "evt_tab_switch",
      from: "dashboard",
      to: "products",
      timestamp: "2026-03-13T09:24:00Z",
    },
  },
} as const;
