/* ═══════════════════════════════════════════════════════
   BROWSE-BY-CATEGORY MOCK DATA
   ═══════════════════════════════════════════════════════ */

export type Product = {
  name: string;
  articleNr: string;
  status?: "active" | "discontinued";
};

export type Subcategory = {
  label: string;
  products: Product[];
};

export type Category = {
  id: string;
  label: string;
  icon: string; // emoji placeholder
  subcategories: Subcategory[];
};

export const browseCategories: Category[] = [
  {
    id: "construction",
    label: "Construction",
    icon: "🏗️",
    subcategories: [
      {
        label: "Kapmaskiner",
        products: [
          { name: "Husqvarna K 770", articleNr: "967 68 20-01", status: "active" },
          { name: "Husqvarna K 770 VAC", articleNr: "967 79 59-01", status: "active" },
          { name: "Husqvarna K 760", articleNr: "967 18 10-02", status: "discontinued" },
          { name: "Husqvarna K 1270", articleNr: "968 42 38-01", status: "active" },
          { name: "Husqvarna K 3600 MK II", articleNr: "968 42 40-01", status: "active" },
        ],
      },
      {
        label: "Borrmaskiner",
        products: [
          { name: "Husqvarna DM 230", articleNr: "966 55 47-01", status: "active" },
          { name: "Husqvarna DMS 240", articleNr: "966 77 10-02", status: "active" },
          { name: "Husqvarna DM 400", articleNr: "968 37 38-01", status: "discontinued" },
        ],
      },
      {
        label: "Golvmaskiner",
        products: [
          { name: "Husqvarna PG 530", articleNr: "967 66 09-01", status: "active" },
          { name: "Husqvarna PG 820", articleNr: "967 66 10-01", status: "active" },
        ],
      },
      {
        label: "Diamantverktyg",
        products: [
          { name: "Husqvarna VARI-CUT S65", articleNr: "579 82 08-20", status: "active" },
          { name: "Husqvarna ELITE-CUT S35", articleNr: "579 81 20-30", status: "active" },
          { name: "Husqvarna FR3", articleNr: "543 09 14-01", status: "active" },
        ],
      },
    ],
  },
  {
    id: "lawn-mowing",
    label: "Gräsklippning",
    icon: "🌿",
    subcategories: [
      {
        label: "Robotgräsklippare",
        products: [
          { name: "Husqvarna Automower 430X NERA", articleNr: "585 57 28-01", status: "active" },
          { name: "Husqvarna Automower 435X AWD", articleNr: "585 69 82-01", status: "active" },
          { name: "Husqvarna Automower 315X", articleNr: "585 57 26-01", status: "active" },
          { name: "Husqvarna Automower 115H", articleNr: "585 02 99-01", status: "active" },
          { name: "Husqvarna Automower 430X", articleNr: "967 85 33-12", status: "discontinued" },
          { name: "Husqvarna Automower 310", articleNr: "967 67 29-05", status: "discontinued" },
        ],
      },
      {
        label: "Gräsklippare",
        products: [
          { name: "Husqvarna LC 353iVX", articleNr: "970 59 38-01", status: "active" },
          { name: "Husqvarna LC 247SP", articleNr: "967 68 00-01", status: "active" },
          { name: "Husqvarna LC 141Li", articleNr: "967 34 11-01", status: "discontinued" },
        ],
      },
      {
        label: "Åkgräsklippare",
        products: [
          { name: "Husqvarna Rider R 316TsX AWD", articleNr: "967 84 79-01", status: "active" },
          { name: "Husqvarna Z248F", articleNr: "970 46 74-01", status: "active" },
          { name: "Husqvarna R 213C", articleNr: "967 03 61-02", status: "discontinued" },
        ],
      },
      {
        label: "Trädgårdstraktorer",
        products: [
          { name: "Husqvarna TC 242TX", articleNr: "960 51 02-72", status: "active" },
          { name: "Husqvarna TC 138", articleNr: "960 51 01-78", status: "active" },
          { name: "Husqvarna TS 146TXD", articleNr: "960 43 03-25", status: "discontinued" },
        ],
      },
      {
        label: "Frontrotorklippare",
        products: [
          { name: "Husqvarna P 525DX", articleNr: "967 32 57-01", status: "active" },
          { name: "Husqvarna P 525D", articleNr: "967 32 56-01", status: "active" },
        ],
      },
      {
        label: "Zero Turn-klippare",
        products: [
          { name: "Husqvarna Z560X", articleNr: "970 46 80-01", status: "active" },
          { name: "Husqvarna Z254F", articleNr: "970 46 75-01", status: "active" },
        ],
      },
      {
        label: "Transmissioner",
        products: [
          { name: "Husqvarna AWD Transmission Kit", articleNr: "585 44 77-01", status: "active" },
        ],
      },
    ],
  },
  {
    id: "sawing-cutting",
    label: "Sågning och kapning",
    icon: "🪚",
    subcategories: [
      {
        label: "Motorsågar",
        products: [
          { name: "Husqvarna 572 XP", articleNr: "966 73 30-14", status: "active" },
          { name: "Husqvarna 550 XP Mark II", articleNr: "967 69 08-12", status: "active" },
          { name: "Husqvarna 545 Mark II", articleNr: "967 69 07-35", status: "active" },
          { name: "Husqvarna 120 Mark II", articleNr: "967 09 82-01", status: "active" },
          { name: "Husqvarna 440 e-series", articleNr: "967 65 01-01", status: "discontinued" },
        ],
      },
      {
        label: "Batterimotorsågar",
        products: [
          { name: "Husqvarna T542i XP", articleNr: "970 54 69-12", status: "active" },
          { name: "Husqvarna 540i XP", articleNr: "967 86 14-12", status: "active" },
          { name: "Husqvarna 340i", articleNr: "967 98 48-12", status: "active" },
        ],
      },
      {
        label: "Svärd & kedjor",
        products: [
          { name: "Husqvarna X-CUT SP33G", articleNr: "585 40 46-84", status: "active" },
          { name: "Husqvarna X-FORCE svärd", articleNr: "585 95 07-72", status: "active" },
        ],
      },
    ],
  },
  {
    id: "trimming",
    label: "Trimning och röjning",
    icon: "🌾",
    subcategories: [
      {
        label: "Röjsågar",
        products: [
          { name: "Husqvarna 535RXT", articleNr: "966 60 43-02", status: "active" },
          { name: "Husqvarna 525RX", articleNr: "967 71 37-01", status: "active" },
        ],
      },
      {
        label: "Grästrimmer",
        products: [
          { name: "Husqvarna 520iRX", articleNr: "967 94 23-12", status: "active" },
          { name: "Husqvarna 325iLK", articleNr: "967 98 45-12", status: "active" },
        ],
      },
    ],
  },
  {
    id: "soil-ground",
    label: "Jord- och markskötsel",
    icon: "🌍",
    subcategories: [
      {
        label: "Jordfräsar",
        products: [
          { name: "Husqvarna TF 338", articleNr: "967 10 19-01", status: "active" },
          { name: "Husqvarna T 300", articleNr: "967 10 18-01", status: "discontinued" },
        ],
      },
      {
        label: "Snöslungor",
        products: [
          { name: "Husqvarna ST 430T", articleNr: "970 46 15-01", status: "active" },
          { name: "Husqvarna ST 227", articleNr: "961 93 01-96", status: "active" },
        ],
      },
    ],
  },
  {
    id: "garden-care",
    label: "Trädgårdsskötsel",
    icon: "🌳",
    subcategories: [
      {
        label: "Häcksaxar",
        products: [
          { name: "Husqvarna 522iHD60", articleNr: "967 09 81-01", status: "active" },
          { name: "Husqvarna 215H45S", articleNr: "967 09 80-01", status: "active" },
        ],
      },
      {
        label: "Lövblåsar",
        products: [
          { name: "Husqvarna 525iB Mark II", articleNr: "967 91 57-12", status: "active" },
          { name: "Husqvarna 580BTS", articleNr: "966 62 91-02", status: "active" },
        ],
      },
    ],
  },
  {
    id: "watering",
    label: "Bevattning",
    icon: "💧",
    subcategories: [
      {
        label: "Bevattningssystem",
        products: [
          { name: "Husqvarna Sprinkler S1", articleNr: "599 00 10-01", status: "active" },
          { name: "Husqvarna Smart Watering Kit", articleNr: "599 00 20-01", status: "active" },
        ],
      },
    ],
  },
];
