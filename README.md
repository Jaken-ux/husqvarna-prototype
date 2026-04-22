# Husqvarna Dealer Portal — Vision Prototype

A functional prototype exploring a reimagined B2B dealer portal for Husqvarna. Built to validate UX concepts, navigation architecture, and dealer workflows before production development.

**Live:** [husqvarna-prototype.vercel.app](https://husqvarna-prototype.vercel.app)

---

## Tech stack

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- No external UI libraries — all components are custom

---

## Getting started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Open in browser
open http://localhost:3000/nav-v2
```

Password for the prototype gate: `supersecret`

---

## Project structure

```
src/app/
├── (bare)/                         # Password-gated prototype area
│   ├── PasswordGate.tsx            # Session-based auth gate
│   ├── layout.tsx                  # Wraps all prototype pages
│   └── nav-v2/                     # Main prototype
│       ├── page.tsx                # Start page (dashboard)
│       ├── NavHeader.tsx           # Global header + floating buttons
│       ├── Footer.tsx              # Global footer
│       ├── CartContext.tsx          # Shared cart state (sessionStorage)
│       ├── ShowroomContext.tsx      # Dealer/customer price toggle
│       ├── husqvarna/              # Husqvarna (OEM) domain
│       │   ├── page.tsx            # Product workspace landing
│       │   ├── kampanjer/          # Campaign listing
│       │   ├── nyheter/            # News & launches
│       │   ├── forsaljning/        # Sales resources & docs
│       │   └── kategori/           # Product listing with cart
│       ├── min-verksamhet/         # Dealer workspace domain
│       │   ├── page.tsx            # Landing page with puffs
│       │   ├── workspace/          # Dealer Workspace (5 tabs)
│       │   ├── orders/             # Unified order management
│       │   ├── fakturor/           # Invoices
│       │   ├── betalningar/        # Payments & balance
│       │   ├── rapporter/          # Reports catalog
│       │   ├── wishlist/           # Customer wishlists
│       │   └── kampanjer/          # (redirects to husqvarna)
│       ├── offerter/               # Quote management
│       ├── varukorg/               # Shopping cart (multi-cart)
│       ├── kampanj/                # Campaign detail page
│       ├── task-flows/             # Task flow documentation
│       ├── sitemap/                # Visual sitemap
│       └── design-system/          # Design tokens reference
├── portal-concept/                 # Alt. IA concept (standalone)
│   └── page.tsx                    # Workspace concept showcase
├── usertest2026/                   # User test page (standalone)
│   └── page.tsx                    # Multilingual test with questionnaire
├── layout.tsx                      # Root layout
├── page.tsx                        # Redirects to /nav-v2
└── globals.css                     # Global styles
```

---

## Key pages

| URL | Description |
|---|---|
| `/nav-v2` | Start page — dealer dashboard |
| `/nav-v2/husqvarna` | Product workspace (search, categories, AI parts) |
| `/nav-v2/min-verksamhet` | Dealer landing (orders, invoices, reports) |
| `/nav-v2/min-verksamhet/workspace` | Dealer Workspace (products, customers, contracts) |
| `/nav-v2/offerter` | Quote management with showroom mode |
| `/nav-v2/task-flows` | Task flow documentation (7 flows) |
| `/portal-concept` | Alternative portal concept (Workspace layout) |
| `/usertest2026` | User test page (EN/SV/DE/FR) with sell-out flow |

---

## Floating buttons

The prototype has 4 floating buttons (bottom-right corner) for quick access:

1. **Portal Concept** (purple) — alternative IA proposal
2. **UserTest 2026** (green) — standalone user test page
3. **Task Flows Spec** (navy) — flow documentation
4. **Utforska prototypen** (orange) — scope overview with rationale

---

## Standalone pages

Pages outside the `(bare)` group don't inherit the prototype's header, footer, or password gate:

- `/portal-concept` — alternative portal layout concept with comparison modal
- `/usertest2026` — multilingual user test with sell-out flow and questionnaire

---

## Notes

- All data is mocked — no backend or API integration
- Cart state persists in `sessionStorage` (per browser session)
- The prototype is deployed on Vercel via GitHub
- Mobile responsiveness is implemented for the main prototype pages
- The password gate uses `sessionStorage` (key: `bare-auth`)

---

## Deployment

Pushes to `main` trigger automatic deployment on Vercel.

```bash
# Push to both remotes
git push origin main
git push husqvarna main
```
