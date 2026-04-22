"use client";

import { useState, Fragment } from "react";

/* ═══════════════════════════════════════════════════════
   i18n
   ═══════════════════════════════════════════════════════ */

type Lang = "en" | "sv" | "de" | "fr";

const langs: { id: Lang; label: string; flag: string }[] = [
  { id: "en", label: "English", flag: "🇬🇧" },
  { id: "sv", label: "Svenska", flag: "🇸🇪" },
  { id: "de", label: "Deutsch", flag: "🇩🇪" },
  { id: "fr", label: "Français", flag: "🇫🇷" },
];

const t: Record<Lang, Record<string, string>> = {
  en: {
    title: "Dealer Workspace",
    subtitle: "Unified workspace — products, customers, contracts and daily tasks",
    lastUpdated: "Last updated: today 09:15",
    tabProducts: "Products",
    tabOrders: "Orders",
    tabInvoices: "Invoices",
    tabCustomers: "Customers",
    tabContracts: "Contracts & programs",
    tabToday: "Today",
    ordersTitle: "Orders",
    ordersDesc: "Track order status — from cart to delivery",
    ordersPending: "Pending",
    ordersProcessing: "Processing",
    ordersShipped: "In transit",
    ordersDelivered: "Delivered",
    ordersBackorder: "Back order",
    invoicesTitle: "Invoices",
    invoicesDesc: "Invoice overview, payment status and export",
    invOpen: "Open",
    invPaid: "Paid",
    invOverdue: "Overdue",
    invCredited: "Credited",
    invAll: "All types",
    invExport: "Export selected",
    allProducts: "All products",
    allProductsDesc: "Products under your management — filter by program and status",
    addProduct: "+ Add product",
    addSalesDate: "Add sales date",
    export: "Export",
    selectProduct: "Select a product to register sales date",
    salesDateTitle: "Register sales date",
    salesDateLabel: "Sales date *",
    salesDateHelper: "Date when the product was sold to end customer",
    salesDateCustomer: "Customer",
    salesDateCustomerHelper: "End customer who purchased the product",
    salesDateComment: "Comment",
    salesDateCommentHelper: "Optional note about the sale",
    salesDateRegister: "Register sales date",
    salesDateRegistered: "✓ Registered!",
    salesDateSearchPlaceholder: "Search customer...",
    salesDateMissingBadge: "Missing sales date",
    missingSoldDate: "Products missing sold date",
    missingSoldDateDesc: "Click \"Missing\" in the table to register",
    colModel: "Model",
    colSerialPnc: "Serial / PNC",
    colCustomer: "Customer",
    colSoldDate: "Sold date",
    colInstallation: "Setup & First use",
    colInstalled: "Installed",
    colFirstUse: "First use",
    colWarranty: "Warranty",
    colServiceContract: "Service contract",
    colLeasing: "Leasing",
    colHyperCare: "HyperCare",
    colLastUpdated: "Last updated",
    missing: "Missing",
    filterAll: "All",
    filterHyperCare: "HyperCare",
    filterServicePlus: "Service Plus",
    filterLeasePlus: "Lease Plus",
    filterMissingData: "Missing data",
    filterNeedsRenewal: "Needs renewal",
    customerOverview: "Customer overview",
    customerOverviewDesc: "All customers you support — click for details",
    colContact: "Contact person",
    colProducts: "Products",
    colContracts: "Contracts",
    colProgram: "Service",
    addCustomer: "+ Add customer",
    addContract: "+ Add contract",
    addCustomerTitle: "Add customer",
    custCompanyName: "Company name *",
    custContactPerson: "Contact person",
    custEmail: "Email",
    custPhone: "Phone",
    custAddress: "Address",
    custCity: "City",
    custPostalCode: "Postal code",
    custCountry: "Country",
    custOrgNr: "Org. number / VAT ID",
    custNotes: "Notes",
    custNotesPlaceholder: "Internal notes about this customer...",
    custSave: "Save customer",
    qScan: "What data do you save from scanning products?",
    qScano1: "GTIN / EAN",
    qScano2: "Own SKU / internal article number",
    qScano3: "Husqvarna PNC",
    qScano4: "Serial number",
    qScano5: "We don't scan products",
    tagProducts: "Products",
    tagSellout: "Sell-out",
    tagCustomers: "Customer overview",
    tagGeneral: "General",
    qCust: "How useful would this customer overview be in your daily work?",
    qCusto1: "Very useful — I would use it daily",
    qCusto2: "Somewhat useful — I would check it regularly",
    qCusto3: "Limited use — only occasionally",
    qCusto4: "Not useful for my workflow",
    colStatus: "Status",
    statusActive: "Active",
    statusExpiring: "Expiring",
    statusExpired: "Expired",
    statusPending: "Pending",
    statusMissing: "Missing",
    statusCompleted: "Completed",
    contractsPlaceholder: "Contracts & programs — see full prototype",
    todayPlaceholder: "Today — see full prototype",
    addProductTitle: "Add product",
    scanTab: "QR / Barcode",
    manualTab: "Manual",
    uploadTab: "Upload file",
    scanning: "Scanning...",
    scanQr: "Scan the product QR code",
    startCamera: "Start camera",
    productIdentified: "Product identified via QR",
    modelLabel: "Model *",
    serialLabel: "Serial number *",
    pncLabel: "Article number (PNC)",
    customerLabel: "Assign customer",
    selectCustomer: "Select customer (optional)",
    cancel: "Cancel",
    registerProduct: "Register product",
    added: "✓ Added!",
    dragDrop: "Drag and drop file here",
    chooseFile: "Choose file",
    acceptedFormats: "Accepted formats",
    questionnaire: "Questionnaire",
    qIntro: "Thank you for exploring this prototype. This is not a test of you — it is a probe to understand how you perceive the value of this type of workspace view. Your honest answers help us understand what matters most to dealers in their daily work.",
    qInstructions: "Please answer the questions below based on your experience. There are no right or wrong answers.",
    q1: "How useful would this product overview be in your daily work?",
    q1o1: "Very useful — I would use it daily",
    q1o2: "Somewhat useful — I would check it regularly",
    q1o3: "Limited use — only occasionally",
    q1o4: "Not useful for my workflow",
    q2: "Would you add your products using the \"Add product\" function?",
    q2o1: "Yes, if it saves me time elsewhere",
    q2o2: "Yes, but only if the process is quick",
    q2o3: "Probably not — too much effort",
    q2o4: "Only if it was required",
    q3: "Does the benefit of having this view outweigh the effort of adding product data?",
    q3o1: "Definitely — the overview alone justifies the effort",
    q3o2: "Probably — if the data is used for warranties and contracts too",
    q3o3: "Unsure — depends on how much effort it takes",
    q3o4: "No — the effort is too high for the value",
    q4: "How would you prefer to add products?",
    q4o1: "QR / barcode scanning (one at a time)",
    q4o2: "File upload (bulk, CSV/Excel)",
    q4o3: "Manual entry (one at a time)",
    q4o4: "Automatic sync from my own system",
    q5: "Do you already register products in another system?",
    q5o1: "Yes, in our own business system (ERP/CRM)",
    q5o2: "Yes, in spreadsheets",
    q5o3: "No, we do not track individual products",
    q5o4: "Partially — only for some product types",
    q6: "Would you prefer to add products and report sell-outs one by one or in bulk?",
    q6o1: "One by one — as each product arrives or is sold",
    q6o2: "In bulk — periodic batch uploads or reports",
    q6o3: "Both — depending on the situation",
    q6o4: "Automatically synced from my own system",
    q7: "How useful would the sell-out reporting feature be for your business?",
    q7o1: "Very useful — I would report every sale",
    q7o2: "Somewhat useful — I would report regularly",
    q7o3: "Limited use — only if required",
    q7o4: "Not useful for my workflow",
    q8: "Which benefit of sell-out reporting matters most to you?",
    q8o1: "Warranty activated automatically from sale date",
    q8o2: "Sales tracked in my analytics and reports",
    q8o3: "Bonus eligibility and campaign qualification",
    q8o4: "Better product supply aligned to my actual sales",
    q8o5: "Follow-up services become available",
    q9: "Do you currently report sell-outs to Husqvarna? If so, how?",
    q9o1: "Yes — through the current B2B portal",
    q9o2: "Yes — via email or spreadsheet",
    q9o3: "Partially — only for some product types",
    q9o4: "No — we do not report sell-outs today",
    q10: "Would you prefer to report sell-outs immediately at point of sale, or in batches later?",
    q10o1: "Immediately — as each sale happens",
    q10o2: "In batches — weekly or monthly",
    q10o3: "Both — depending on the situation",
    q10o4: "Automatically synced from my own system",
    q11: "What information in this view is most valuable to you?",
    q11placeholder: "Please describe which columns or data points you find most useful, and if anything is missing...",
    q12: "Any other feedback or thoughts?",
    q12placeholder: "Share any observations, concerns or ideas...",
    qSubmit: "Submit answers",
    qSubmitted: "Thank you! Your answers have been recorded.",
    // Sell-out tab
    tabSellout: "Sell-out",
    selloutTitle: "Sell-out",
    selloutSubtitle: "Report sales to Husqvarna and unlock benefits",
    soInStock: "In stock",
    soInStockSub: "across products",
    soSoldMonth: "Sold this month",
    soSoldMonthSub: "March 2026",
    soPendingBonus: "Pending bonus",
    soPendingBonusSub: "awaiting review",
    soInventory: "Your inventory",
    soInStockBadge: "in stock",
    soReportSale: "Report sale",
    soRecentSellouts: "Recent sell-outs",
    soReportSellout: "+ Report sell-out",
    soStep: "Step",
    soWhatReport: "What would you like to report?",
    soChooseMode: "Choose single or bulk reporting.",
    soSingleProduct: "Single product",
    soSingleDesc: "One product with full details",
    soBulkReport: "Bulk report",
    soBulkDesc: "Multiple products in one go",
    soWhichProduct: "Which product was sold?",
    soWhichProductDesc: "Select from inventory, enter PNC manually, or scan with photo.",
    soTabInventory: "Inventory",
    soTabPnc: "Enter PNC",
    soTabPhoto: "Photo",
    soPncNumber: "PNC number",
    soPncPlaceholder: "e.g. 967 62 25-03",
    soPhotoDesc: "Take a photo of the product label — we'll detect the PNC automatically.",
    soSimulateScan: "Simulate scan",
    soContinue: "Continue",
    soEnterSaleDetails: "Enter sale details",
    soSaleDate: "Sale date *",
    soSerialNumber: "Serial number",
    soSerialRecommended: "(recommended)",
    soSerialHelper: "Needed to activate warranty per unit and register the product.",
    soSerialPlaceholder: "e.g. AMX-2026-00123",
    soReviewSubmit: "Review & submit",
    soReviewTitle: "Review your sell-out",
    soProduct: "Product",
    soPnc: "PNC",
    soSerialNumberLabel: "Serial number",
    soNotProvided: "— not provided",
    soWhatUnlocks: "What this unlocks for you:",
    soUnlockWarranty: "Warranty activated from sale date",
    soUnlockAnalytics: "Sale tracked in your analytics",
    soUnlockBonus: "Bonus eligibility opened at Husqvarna",
    soUnlockServices: "Follow-up services now available",
    soSubmitSellout: "Submit sell-out",
    soSelloutReported: "Sell-out reported!",
    soSelloutReportedDesc: "Husqvarna has been notified. Here's what's been activated:",
    soBackToOverview: "Back to overview",
    soReportAnother: "Report another",
    soAddSoldProducts: "Add sold products",
    soAddSoldProductsDesc: "Add each product sold. Serial number is optional but recommended.",
    soAddAnotherProduct: "+ Add another product",
    soSubmitBulk: "Submit sell-outs",
  },
  sv: {
    title: "Återförsäljararbetsyta",
    subtitle: "Enhetlig arbetsyta — produkter, kunder, avtal och dagliga uppgifter",
    lastUpdated: "Senast uppdaterad: idag 09:15",
    tabProducts: "Produkter",
    tabOrders: "Order",
    tabInvoices: "Fakturor",
    tabCustomers: "Kunder",
    tabContracts: "Avtal & program",
    tabToday: "Idag",
    ordersTitle: "Order",
    ordersDesc: "Spåra orderstatus — från varukorg till leverans",
    ordersPending: "Väntande",
    ordersProcessing: "Behandlas",
    ordersShipped: "Under transport",
    ordersDelivered: "Levererade",
    ordersBackorder: "Restorder",
    invoicesTitle: "Fakturor",
    invoicesDesc: "Fakturaöversikt, betalningsstatus och export",
    invOpen: "Öppna",
    invPaid: "Betalda",
    invOverdue: "Förfallna",
    invCredited: "Krediterade",
    invAll: "Alla typer",
    invExport: "Exportera valda",
    allProducts: "Alla produkter",
    allProductsDesc: "Produkter under din hantering — filtrera efter program och status",
    addProduct: "+ Lägg till produkt",
    addSalesDate: "Lägg till säljdatum",
    export: "Exportera",
    selectProduct: "Välj en produkt för att registrera säljdatum",
    salesDateTitle: "Registrera säljdatum",
    salesDateLabel: "Säljdatum *",
    salesDateHelper: "Datum då produkten såldes till slutkund",
    salesDateCustomer: "Kund",
    salesDateCustomerHelper: "Slutkund som köpte produkten",
    salesDateComment: "Kommentar",
    salesDateCommentHelper: "Valfri notering om försäljningen",
    salesDateRegister: "Registrera säljdatum",
    salesDateRegistered: "✓ Registrerat!",
    salesDateSearchPlaceholder: "Sök kund...",
    salesDateMissingBadge: "Saknar säljdatum",
    missingSoldDate: "Produkter saknar säljdatum",
    missingSoldDateDesc: "Klicka på \"Saknas\" i tabellen för att registrera",
    colModel: "Modell",
    colSerialPnc: "Serie / PNC",
    colCustomer: "Kund",
    colSoldDate: "Säljdatum",
    colInstallation: "Installation & Första start",
    colInstalled: "Installerad",
    colFirstUse: "Första start",
    colWarranty: "Garanti",
    colServiceContract: "Serviceavtal",
    colLeasing: "Leasing",
    colHyperCare: "HyperCare",
    colLastUpdated: "Senast uppdaterad",
    missing: "Saknas",
    filterAll: "Alla",
    filterHyperCare: "HyperCare",
    filterServicePlus: "Service Plus",
    filterLeasePlus: "Lease Plus",
    filterMissingData: "Saknar data",
    filterNeedsRenewal: "Behöver förnyelse",
    customerOverview: "Kundöversikt",
    customerOverviewDesc: "Alla kunder du stöttar — klicka för detaljer",
    colContact: "Kontaktperson",
    colProducts: "Produkter",
    colContracts: "Avtal",
    colProgram: "Service",
    addCustomer: "+ Lägg till kund",
    addContract: "+ Lägg till avtal",
    addCustomerTitle: "Lägg till kund",
    custCompanyName: "Företagsnamn *",
    custContactPerson: "Kontaktperson",
    custEmail: "E-post",
    custPhone: "Telefon",
    custAddress: "Adress",
    custCity: "Ort",
    custPostalCode: "Postnummer",
    custCountry: "Land",
    custOrgNr: "Org.-nr / Moms-nr",
    custNotes: "Anteckningar",
    custNotesPlaceholder: "Interna anteckningar om kunden...",
    custSave: "Spara kund",
    qScan: "Vilken data sparar du när du scannar produkter?",
    qScano1: "GTIN / EAN",
    qScano2: "Egen SKU / internt artikelnummer",
    qScano3: "Husqvarna PNC",
    qScano4: "Serienummer",
    qScano5: "Vi scannar inte produkter",
    tagProducts: "Produkter",
    tagSellout: "Sell-out",
    tagCustomers: "Kundöversikt",
    tagGeneral: "Allmänt",
    qCust: "Hur användbar skulle denna kundöversikt vara i ditt dagliga arbete?",
    qCusto1: "Mycket användbar — jag skulle använda den dagligen",
    qCusto2: "Ganska användbar — jag skulle kolla den regelbundet",
    qCusto3: "Begränsad användning — bara ibland",
    qCusto4: "Inte användbar för mitt arbetsflöde",
    colStatus: "Status",
    statusActive: "Aktiv",
    statusExpiring: "Löper ut",
    statusExpired: "Utgånget",
    statusPending: "Väntar",
    statusMissing: "Saknas",
    statusCompleted: "Klar",
    contractsPlaceholder: "Avtal & program — se hela prototypen",
    todayPlaceholder: "Idag — se hela prototypen",
    addProductTitle: "Lägg till produkt",
    scanTab: "QR / Streckkod",
    manualTab: "Manuell",
    uploadTab: "Ladda upp fil",
    scanning: "Scannar...",
    scanQr: "Scanna produktens QR-kod",
    startCamera: "Starta kamera",
    productIdentified: "Produkt identifierad via QR",
    modelLabel: "Modell *",
    serialLabel: "Serienummer *",
    pncLabel: "Artikelnummer (PNC)",
    customerLabel: "Tilldela kund",
    selectCustomer: "Välj kund (valfritt)",
    cancel: "Avbryt",
    registerProduct: "Registrera produkt",
    added: "✓ Tillagd!",
    dragDrop: "Dra och släpp filen här",
    chooseFile: "Välj fil",
    acceptedFormats: "Accepterade format",
    questionnaire: "Frågeformulär",
    qIntro: "Tack för att du utforskar denna prototyp. Detta är inte ett test av dig — det är en undersökning för att förstå hur du upplever värdet av denna typ av arbetsyta. Dina ärliga svar hjälper oss förstå vad som är viktigast för återförsäljare i deras dagliga arbete.",
    qInstructions: "Vänligen besvara frågorna nedan baserat på din erfarenhet. Det finns inga rätta eller fel svar.",
    q1: "Hur användbar skulle denna produktöversikt vara i ditt dagliga arbete?",
    q1o1: "Mycket användbar — jag skulle använda den dagligen",
    q1o2: "Ganska användbar — jag skulle kolla den regelbundet",
    q1o3: "Begränsad användning — bara ibland",
    q1o4: "Inte användbar för mitt arbetsflöde",
    q2: "Skulle du lägga till dina produkter via funktionen \"Lägg till produkt\"?",
    q2o1: "Ja, om det sparar tid på annat håll",
    q2o2: "Ja, men bara om processen är snabb",
    q2o3: "Förmodligen inte — för mycket jobb",
    q2o4: "Bara om det krävdes",
    q3: "Överväger nyttan av denna vy ansträngningen att lägga till produktdata?",
    q3o1: "Definitivt — översikten ensam motiverar arbetet",
    q3o2: "Förmodligen — om datan även används för garantier och avtal",
    q3o3: "Osäker — beror på hur mycket jobb det är",
    q3o4: "Nej — arbetet är för stort för värdet",
    q4: "Hur skulle du föredra att lägga till produkter?",
    q4o1: "QR / streckkodsscanning (en åt gången)",
    q4o2: "Filuppladdning (bulk, CSV/Excel)",
    q4o3: "Manuell inmatning (en åt gången)",
    q4o4: "Automatisk synk från mitt eget system",
    q5: "Registrerar du redan produkter i ett annat system?",
    q5o1: "Ja, i vårt eget affärssystem (ERP/CRM)",
    q5o2: "Ja, i kalkylblad",
    q5o3: "Nej, vi spårar inte enskilda produkter",
    q5o4: "Delvis — bara för vissa produkttyper",
    q6: "Skulle du föredra att lägga till produkter och rapportera sell-outs en åt gången eller i bulk?",
    q6o1: "En åt gången — när varje produkt anländer eller säljs",
    q6o2: "I bulk — periodiska batchuppladdningar eller rapporter",
    q6o3: "Båda — beroende på situation",
    q6o4: "Automatisk synk från mitt eget system",
    q7: "Hur användbar skulle sell-out-rapportering vara för din verksamhet?",
    q7o1: "Mycket användbar — jag skulle rapportera varje försäljning",
    q7o2: "Ganska användbar — jag skulle rapportera regelbundet",
    q7o3: "Begränsad användning — bara om det krävs",
    q7o4: "Inte användbar för mitt arbetsflöde",
    q8: "Vilken fördel med sell-out-rapportering är viktigast för dig?",
    q8o1: "Garanti aktiveras automatiskt från säljdatum",
    q8o2: "Försäljning spåras i mina analyser och rapporter",
    q8o3: "Bonusberättigande och kampanjkvalificering",
    q8o4: "Bättre produktförsörjning anpassad till min verkliga försäljning",
    q8o5: "Uppföljningstjänster blir tillgängliga",
    q9: "Rapporterar du sell-outs till Husqvarna idag? Om ja, hur?",
    q9o1: "Ja — via nuvarande B2B-portal",
    q9o2: "Ja — via e-post eller kalkylblad",
    q9o3: "Delvis — bara för vissa produkttyper",
    q9o4: "Nej — vi rapporterar inte sell-outs idag",
    q10: "Skulle du föredra att rapportera sell-outs direkt vid försäljning eller i batcher senare?",
    q10o1: "Direkt — vid varje försäljning",
    q10o2: "I batcher — veckovis eller månadsvis",
    q10o3: "Båda — beroende på situation",
    q10o4: "Automatiskt synkat från mitt eget system",
    q11: "Vilken information i denna vy är mest värdefull för dig?",
    q11placeholder: "Beskriv vilka kolumner eller datapunkter du tycker är mest användbara, och om något saknas...",
    q12: "Övrig feedback eller tankar?",
    q12placeholder: "Dela observationer, funderingar eller idéer...",
    qSubmit: "Skicka svar",
    qSubmitted: "Tack! Dina svar har registrerats.",
    tabSellout: "Sell-out",
    selloutTitle: "Sell-out",
    selloutSubtitle: "Rapportera försäljning till Husqvarna och lås upp förmåner",
    soInStock: "I lager",
    soInStockSub: "över produkter",
    soSoldMonth: "Sålda denna månad",
    soSoldMonthSub: "Mars 2026",
    soPendingBonus: "Väntande bonus",
    soPendingBonusSub: "väntar på granskning",
    soInventory: "Ditt lager",
    soInStockBadge: "i lager",
    soReportSale: "Rapportera försäljning",
    soRecentSellouts: "Senaste sell-outs",
    soReportSellout: "+ Rapportera sell-out",
    soStep: "Steg",
    soWhatReport: "Vad vill du rapportera?",
    soChooseMode: "Välj enstaka eller bulk-rapportering.",
    soSingleProduct: "Enstaka produkt",
    soSingleDesc: "En produkt med fullständiga detaljer",
    soBulkReport: "Bulk-rapport",
    soBulkDesc: "Flera produkter på en gång",
    soWhichProduct: "Vilken produkt såldes?",
    soWhichProductDesc: "Välj från lager, ange PNC manuellt eller scanna med foto.",
    soTabInventory: "Lager",
    soTabPnc: "Ange PNC",
    soTabPhoto: "Foto",
    soPncNumber: "PNC-nummer",
    soPncPlaceholder: "t.ex. 967 62 25-03",
    soPhotoDesc: "Ta ett foto av produktetiketten — vi identifierar PNC automatiskt.",
    soSimulateScan: "Simulera scan",
    soContinue: "Fortsätt",
    soEnterSaleDetails: "Ange säljdetaljer",
    soSaleDate: "Säljdatum *",
    soSerialNumber: "Serienummer",
    soSerialRecommended: "(rekommenderat)",
    soSerialHelper: "Krävs för att aktivera garanti per enhet och registrera produkten.",
    soSerialPlaceholder: "t.ex. AMX-2026-00123",
    soReviewSubmit: "Granska & skicka",
    soReviewTitle: "Granska din sell-out",
    soProduct: "Produkt",
    soPnc: "PNC",
    soSerialNumberLabel: "Serienummer",
    soNotProvided: "— ej angivet",
    soWhatUnlocks: "Vad detta låser upp för dig:",
    soUnlockWarranty: "Garanti aktiverad från säljdatum",
    soUnlockAnalytics: "Försäljning spårad i dina analyser",
    soUnlockBonus: "Bonusberättigande öppnat hos Husqvarna",
    soUnlockServices: "Uppföljningstjänster nu tillgängliga",
    soSubmitSellout: "Skicka sell-out",
    soSelloutReported: "Sell-out rapporterad!",
    soSelloutReportedDesc: "Husqvarna har notifierats. Här är vad som har aktiverats:",
    soBackToOverview: "Tillbaka till översikt",
    soReportAnother: "Rapportera en till",
    soAddSoldProducts: "Lägg till sålda produkter",
    soAddSoldProductsDesc: "Lägg till varje såld produkt. Serienummer är valfritt men rekommenderas.",
    soAddAnotherProduct: "+ Lägg till en till produkt",
    soSubmitBulk: "Skicka sell-outs",
  },
  de: {
    title: "Händler-Arbeitsbereich",
    subtitle: "Einheitlicher Arbeitsbereich — Produkte, Kunden, Verträge und tägliche Aufgaben",
    lastUpdated: "Zuletzt aktualisiert: heute 09:15",
    tabProducts: "Produkte",
    tabOrders: "Bestellungen",
    tabInvoices: "Rechnungen",
    tabCustomers: "Kunden",
    tabContracts: "Verträge & Programme",
    tabToday: "Heute",
    ordersTitle: "Bestellungen",
    ordersDesc: "Bestellstatus verfolgen — vom Warenkorb bis zur Lieferung",
    ordersPending: "Ausstehend",
    ordersProcessing: "In Bearbeitung",
    ordersShipped: "Im Transport",
    ordersDelivered: "Geliefert",
    ordersBackorder: "Nachbestellung",
    invoicesTitle: "Rechnungen",
    invoicesDesc: "Rechnungsübersicht, Zahlungsstatus und Export",
    invOpen: "Offen",
    invPaid: "Bezahlt",
    invOverdue: "Überfällig",
    invCredited: "Gutgeschrieben",
    invAll: "Alle Typen",
    invExport: "Ausgewählte exportieren",
    allProducts: "Alle Produkte",
    allProductsDesc: "Produkte unter Ihrer Verwaltung — nach Programm und Status filtern",
    addProduct: "+ Produkt hinzufügen",
    addSalesDate: "Verkaufsdatum erfassen",
    export: "Exportieren",
    selectProduct: "Produkt auswählen, um Verkaufsdatum zu erfassen",
    salesDateTitle: "Verkaufsdatum erfassen",
    salesDateLabel: "Verkaufsdatum *",
    salesDateHelper: "Datum, an dem das Produkt an den Endkunden verkauft wurde",
    salesDateCustomer: "Kunde",
    salesDateCustomerHelper: "Endkunde, der das Produkt gekauft hat",
    salesDateComment: "Kommentar",
    salesDateCommentHelper: "Optionale Anmerkung zum Verkauf",
    salesDateRegister: "Verkaufsdatum registrieren",
    salesDateRegistered: "✓ Registriert!",
    salesDateSearchPlaceholder: "Kunde suchen...",
    salesDateMissingBadge: "Verkaufsdatum fehlt",
    missingSoldDate: "Produkte ohne Verkaufsdatum",
    missingSoldDateDesc: 'Klicken Sie auf "Fehlt" in der Tabelle, um es zu registrieren',
    colModel: "Modell",
    colSerialPnc: "Serie / PNC",
    colCustomer: "Kunde",
    colSoldDate: "Verkaufsdatum",
    colInstallation: "Installation & Erststart",
    colInstalled: "Installiert",
    colFirstUse: "Erststart",
    colWarranty: "Garantie",
    colServiceContract: "Servicevertrag",
    colLeasing: "Leasing",
    colHyperCare: "HyperCare",
    colLastUpdated: "Zuletzt aktualisiert",
    missing: "Fehlt",
    filterAll: "Alle",
    filterHyperCare: "HyperCare",
    filterServicePlus: "Service Plus",
    filterLeasePlus: "Lease Plus",
    filterMissingData: "Fehlende Daten",
    filterNeedsRenewal: "Erneuerung nötig",
    customerOverview: "Kundenübersicht",
    customerOverviewDesc: "Alle Kunden, die Sie betreuen — klicken für Details",
    colContact: "Kontaktperson",
    colProducts: "Produkte",
    colContracts: "Verträge",
    colProgram: "Service",
    addCustomer: "+ Kunde hinzufügen",
    addContract: "+ Vertrag hinzufügen",
    addCustomerTitle: "Kunde hinzufügen",
    custCompanyName: "Firmenname *",
    custContactPerson: "Kontaktperson",
    custEmail: "E-Mail",
    custPhone: "Telefon",
    custAddress: "Adresse",
    custCity: "Stadt",
    custPostalCode: "Postleitzahl",
    custCountry: "Land",
    custOrgNr: "Org.-Nr. / USt-IdNr.",
    custNotes: "Notizen",
    custNotesPlaceholder: "Interne Notizen zu diesem Kunden...",
    custSave: "Kunde speichern",
    qScan: "Welche Daten speichern Sie beim Scannen von Produkten?",
    qScano1: "GTIN / EAN",
    qScano2: "Eigene SKU / interne Artikelnummer",
    qScano3: "Husqvarna PNC",
    qScano4: "Seriennummer",
    qScano5: "Wir scannen keine Produkte",
    tagProducts: "Produkte",
    tagSellout: "Sell-out",
    tagCustomers: "Kundenübersicht",
    tagGeneral: "Allgemein",
    qCust: "Wie nützlich wäre diese Kundenübersicht in Ihrer täglichen Arbeit?",
    qCusto1: "Sehr nützlich — ich würde sie täglich nutzen",
    qCusto2: "Ziemlich nützlich — ich würde sie regelmäßig prüfen",
    qCusto3: "Begrenzt nützlich — nur gelegentlich",
    qCusto4: "Nicht nützlich für meinen Arbeitsablauf",
    colStatus: "Status",
    statusActive: "Aktiv",
    statusExpiring: "Läuft ab",
    statusExpired: "Abgelaufen",
    statusPending: "Ausstehend",
    statusMissing: "Fehlt",
    statusCompleted: "Abgeschlossen",
    contractsPlaceholder: "Verträge & Programme — siehe vollständigen Prototyp",
    todayPlaceholder: "Heute — siehe vollständigen Prototyp",
    addProductTitle: "Produkt hinzufügen",
    scanTab: "QR / Barcode",
    manualTab: "Manuell",
    uploadTab: "Datei hochladen",
    scanning: "Wird gescannt...",
    scanQr: "QR-Code des Produkts scannen",
    startCamera: "Kamera starten",
    productIdentified: "Produkt über QR identifiziert",
    modelLabel: "Modell *",
    serialLabel: "Seriennummer *",
    pncLabel: "Artikelnummer (PNC)",
    customerLabel: "Kunde zuweisen",
    selectCustomer: "Kunde auswählen (optional)",
    cancel: "Abbrechen",
    registerProduct: "Produkt registrieren",
    added: "✓ Hinzugefügt!",
    dragDrop: "Datei hierher ziehen",
    chooseFile: "Datei wählen",
    acceptedFormats: "Akzeptierte Formate",
    questionnaire: "Fragebogen",
    qIntro: "Vielen Dank, dass Sie diesen Prototyp erkunden. Dies ist kein Test — es ist eine Untersuchung, um zu verstehen, welchen Wert Sie in dieser Art von Arbeitsbereich sehen. Ihre ehrlichen Antworten helfen uns zu verstehen, was für Händler in ihrer täglichen Arbeit am wichtigsten ist.",
    qInstructions: "Bitte beantworten Sie die folgenden Fragen basierend auf Ihrer Erfahrung. Es gibt keine richtigen oder falschen Antworten.",
    q1: "Wie nützlich wäre diese Produktübersicht in Ihrer täglichen Arbeit?",
    q1o1: "Sehr nützlich — ich würde sie täglich nutzen",
    q1o2: "Ziemlich nützlich — ich würde sie regelmäßig prüfen",
    q1o3: "Begrenzt nützlich — nur gelegentlich",
    q1o4: "Nicht nützlich für meinen Arbeitsablauf",
    q2: 'Würden Sie Ihre Produkte über die Funktion "Produkt hinzufügen" erfassen?',
    q2o1: "Ja, wenn es mir anderswo Zeit spart",
    q2o2: "Ja, aber nur wenn der Prozess schnell geht",
    q2o3: "Wahrscheinlich nicht — zu viel Aufwand",
    q2o4: "Nur wenn es erforderlich wäre",
    q3: "Überwiegt der Nutzen dieser Ansicht den Aufwand der Dateneingabe?",
    q3o1: "Definitiv — die Übersicht allein rechtfertigt den Aufwand",
    q3o2: "Wahrscheinlich — wenn die Daten auch für Garantien und Verträge genutzt werden",
    q3o3: "Unsicher — hängt vom Aufwand ab",
    q3o4: "Nein — der Aufwand ist zu hoch für den Nutzen",
    q4: "Wie würden Sie Produkte am liebsten hinzufügen?",
    q4o1: "QR- / Barcode-Scan (einzeln)",
    q4o2: "Datei-Upload (Bulk, CSV/Excel)",
    q4o3: "Manuelle Eingabe (einzeln)",
    q4o4: "Automatische Synchronisation aus meinem eigenen System",
    q5: "Registrieren Sie Produkte bereits in einem anderen System?",
    q5o1: "Ja, in unserem eigenen Geschäftssystem (ERP/CRM)",
    q5o2: "Ja, in Tabellenkalkulationen",
    q5o3: "Nein, wir verfolgen keine einzelnen Produkte",
    q5o4: "Teilweise — nur für bestimmte Produkttypen",
    q6: "Würden Sie Produkte und Sell-outs lieber einzeln oder in großen Mengen erfassen?",
    q6o1: "Einzeln — bei Ankunft oder Verkauf jedes Produkts",
    q6o2: "In großen Mengen — periodische Batch-Uploads oder Meldungen",
    q6o3: "Beides — je nach Situation",
    q6o4: "Automatische Synchronisation aus meinem eigenen System",
    q7: "Wie nützlich wäre die Sell-out-Meldefunktion für Ihr Geschäft?",
    q7o1: "Sehr nützlich — ich würde jeden Verkauf melden",
    q7o2: "Ziemlich nützlich — ich würde regelmäßig melden",
    q7o3: "Begrenzt nützlich — nur wenn erforderlich",
    q7o4: "Nicht nützlich für meinen Arbeitsablauf",
    q8: "Welcher Vorteil der Sell-out-Meldung ist für Sie am wichtigsten?",
    q8o1: "Garantie wird automatisch ab Verkaufsdatum aktiviert",
    q8o2: "Verkäufe werden in meinen Analysen und Berichten erfasst",
    q8o3: "Bonusberechtigung und Kampagnenqualifikation",
    q8o4: "Bessere Produktversorgung basierend auf meinen tatsächlichen Verkäufen",
    q8o5: "Folgedienste werden verfügbar",
    q9: "Melden Sie derzeit Sell-outs an Husqvarna? Wenn ja, wie?",
    q9o1: "Ja — über das aktuelle B2B-Portal",
    q9o2: "Ja — per E-Mail oder Tabellenkalkulation",
    q9o3: "Teilweise — nur für bestimmte Produkttypen",
    q9o4: "Nein — wir melden derzeit keine Sell-outs",
    q10: "Würden Sie Sell-outs lieber sofort am Verkaufsort oder später in Chargen melden?",
    q10o1: "Sofort — bei jedem einzelnen Verkauf",
    q10o2: "In Chargen — wöchentlich oder monatlich",
    q10o3: "Beides — je nach Situation",
    q10o4: "Automatisch aus meinem eigenen System synchronisiert",
    q11: "Welche Informationen in dieser Ansicht sind für Sie am wertvollsten?",
    q11placeholder: "Bitte beschreiben Sie, welche Spalten oder Datenpunkte für Sie am nützlichsten sind, und ob etwas fehlt...",
    q12: "Weiteres Feedback oder Gedanken?",
    q12placeholder: "Teilen Sie Beobachtungen, Bedenken oder Ideen...",
    qSubmit: "Antworten absenden",
    qSubmitted: "Vielen Dank! Ihre Antworten wurden erfasst.",
    tabSellout: "Sell-out",
    selloutTitle: "Sell-out",
    selloutSubtitle: "Verkäufe an Husqvarna melden und Vorteile freischalten",
    soInStock: "Auf Lager",
    soInStockSub: "über Produkte",
    soSoldMonth: "Diesen Monat verkauft",
    soSoldMonthSub: "März 2026",
    soPendingBonus: "Ausstehender Bonus",
    soPendingBonusSub: "wird überprüft",
    soInventory: "Ihr Inventar",
    soInStockBadge: "auf Lager",
    soReportSale: "Verkauf melden",
    soRecentSellouts: "Letzte Sell-outs",
    soReportSellout: "+ Sell-out melden",
    soStep: "Schritt",
    soWhatReport: "Was möchten Sie melden?",
    soChooseMode: "Wählen Sie Einzel- oder Massenmeldung.",
    soSingleProduct: "Einzelnes Produkt",
    soSingleDesc: "Ein Produkt mit allen Details",
    soBulkReport: "Massenmeldung",
    soBulkDesc: "Mehrere Produkte auf einmal",
    soWhichProduct: "Welches Produkt wurde verkauft?",
    soWhichProductDesc: "Aus Inventar wählen, PNC eingeben oder per Foto scannen.",
    soTabInventory: "Inventar",
    soTabPnc: "PNC eingeben",
    soTabPhoto: "Foto",
    soPncNumber: "PNC-Nummer",
    soPncPlaceholder: "z.B. 967 62 25-03",
    soPhotoDesc: "Fotografieren Sie das Produktetikett — die PNC wird automatisch erkannt.",
    soSimulateScan: "Scan simulieren",
    soContinue: "Weiter",
    soEnterSaleDetails: "Verkaufsdetails eingeben",
    soSaleDate: "Verkaufsdatum *",
    soSerialNumber: "Seriennummer",
    soSerialRecommended: "(empfohlen)",
    soSerialHelper: "Zur Garantieaktivierung pro Einheit und Produktregistrierung erforderlich.",
    soSerialPlaceholder: "z.B. AMX-2026-00123",
    soReviewSubmit: "Überprüfen & absenden",
    soReviewTitle: "Überprüfen Sie Ihren Sell-out",
    soProduct: "Produkt",
    soPnc: "PNC",
    soSerialNumberLabel: "Seriennummer",
    soNotProvided: "— nicht angegeben",
    soWhatUnlocks: "Was das für Sie freischaltet:",
    soUnlockWarranty: "Garantie ab Verkaufsdatum aktiviert",
    soUnlockAnalytics: "Verkauf in Ihren Analysen erfasst",
    soUnlockBonus: "Bonusberechtigung bei Husqvarna eröffnet",
    soUnlockServices: "Folgedienste jetzt verfügbar",
    soSubmitSellout: "Sell-out absenden",
    soSelloutReported: "Sell-out gemeldet!",
    soSelloutReportedDesc: "Husqvarna wurde benachrichtigt. Folgendes wurde aktiviert:",
    soBackToOverview: "Zurück zur Übersicht",
    soReportAnother: "Weiteren melden",
    soAddSoldProducts: "Verkaufte Produkte hinzufügen",
    soAddSoldProductsDesc: "Fügen Sie jedes verkaufte Produkt hinzu. Seriennummer ist optional, aber empfohlen.",
    soAddAnotherProduct: "+ Weiteres Produkt hinzufügen",
    soSubmitBulk: "Sell-outs absenden",
  },
  fr: {
    title: "Espace de travail concessionnaire",
    subtitle: "Espace de travail unifié — produits, clients, contrats et tâches quotidiennes",
    lastUpdated: "Dernière mise à jour : aujourd'hui 09:15",
    tabProducts: "Produits",
    tabOrders: "Commandes",
    tabInvoices: "Factures",
    tabCustomers: "Clients",
    tabContracts: "Contrats & programmes",
    tabToday: "Aujourd'hui",
    ordersTitle: "Commandes",
    ordersDesc: "Suivre le statut des commandes — du panier à la livraison",
    ordersPending: "En attente",
    ordersProcessing: "En cours",
    ordersShipped: "En transit",
    ordersDelivered: "Livrées",
    ordersBackorder: "En rupture",
    invoicesTitle: "Factures",
    invoicesDesc: "Aperçu des factures, statut de paiement et export",
    invOpen: "Ouvertes",
    invPaid: "Payées",
    invOverdue: "En retard",
    invCredited: "Créditées",
    invAll: "Tous les types",
    invExport: "Exporter la sélection",
    allProducts: "Tous les produits",
    allProductsDesc: "Produits sous votre gestion — filtrer par programme et statut",
    addProduct: "+ Ajouter un produit",
    addSalesDate: "Ajouter date de vente",
    export: "Exporter",
    selectProduct: "Sélectionnez un produit pour enregistrer la date de vente",
    salesDateTitle: "Enregistrer la date de vente",
    salesDateLabel: "Date de vente *",
    salesDateHelper: "Date de vente au client final",
    salesDateCustomer: "Client",
    salesDateCustomerHelper: "Client final ayant acheté le produit",
    salesDateComment: "Commentaire",
    salesDateCommentHelper: "Note optionnelle sur la vente",
    salesDateRegister: "Enregistrer la date de vente",
    salesDateRegistered: "✓ Enregistré !",
    salesDateSearchPlaceholder: "Rechercher un client...",
    salesDateMissingBadge: "Date de vente manquante",
    missingSoldDate: "Produits sans date de vente",
    missingSoldDateDesc: 'Cliquez sur "Manquant" dans le tableau pour enregistrer',
    colModel: "Modèle",
    colSerialPnc: "Série / PNC",
    colCustomer: "Client",
    colSoldDate: "Date de vente",
    colInstallation: "Installation & Première util.",
    colInstalled: "Installé",
    colFirstUse: "Première util.",
    colWarranty: "Garantie",
    colServiceContract: "Contrat de service",
    colLeasing: "Leasing",
    colHyperCare: "HyperCare",
    colLastUpdated: "Dernière mise à jour",
    missing: "Manquant",
    filterAll: "Tous",
    filterHyperCare: "HyperCare",
    filterServicePlus: "Service Plus",
    filterLeasePlus: "Lease Plus",
    filterMissingData: "Données manquantes",
    filterNeedsRenewal: "Renouvellement nécessaire",
    customerOverview: "Aperçu des clients",
    customerOverviewDesc: "Tous les clients que vous assistez — cliquez pour les détails",
    colContact: "Personne de contact",
    colProducts: "Produits",
    colContracts: "Contrats",
    colProgram: "Service",
    addCustomer: "+ Ajouter un client",
    addContract: "+ Ajouter un contrat",
    addCustomerTitle: "Ajouter un client",
    custCompanyName: "Nom de l'entreprise *",
    custContactPerson: "Personne de contact",
    custEmail: "E-mail",
    custPhone: "Téléphone",
    custAddress: "Adresse",
    custCity: "Ville",
    custPostalCode: "Code postal",
    custCountry: "Pays",
    custOrgNr: "N° d'org. / TVA",
    custNotes: "Notes",
    custNotesPlaceholder: "Notes internes sur ce client...",
    custSave: "Enregistrer le client",
    qScan: "Quelles données enregistrez-vous lors du scan de produits ?",
    qScano1: "GTIN / EAN",
    qScano2: "SKU propre / numéro d'article interne",
    qScano3: "PNC Husqvarna",
    qScano4: "Numéro de série",
    qScano5: "Nous ne scannons pas les produits",
    tagProducts: "Produits",
    tagSellout: "Sell-out",
    tagCustomers: "Aperçu clients",
    tagGeneral: "Général",
    qCust: "Quelle serait l'utilité de cet aperçu des clients dans votre travail quotidien ?",
    qCusto1: "Très utile — je l'utiliserais quotidiennement",
    qCusto2: "Assez utile — je le consulterais régulièrement",
    qCusto3: "Utilité limitée — seulement occasionnellement",
    qCusto4: "Pas utile pour mon activité",
    colStatus: "Statut",
    statusActive: "Actif",
    statusExpiring: "Expire bientôt",
    statusExpired: "Expiré",
    statusPending: "En attente",
    statusMissing: "Manquant",
    statusCompleted: "Terminé",
    contractsPlaceholder: "Contrats & programmes — voir le prototype complet",
    todayPlaceholder: "Aujourd'hui — voir le prototype complet",
    addProductTitle: "Ajouter un produit",
    scanTab: "QR / Code-barres",
    manualTab: "Manuel",
    uploadTab: "Télécharger",
    scanning: "Scan en cours...",
    scanQr: "Scanner le code QR du produit",
    startCamera: "Démarrer la caméra",
    productIdentified: "Produit identifié par QR",
    modelLabel: "Modèle *",
    serialLabel: "Numéro de série *",
    pncLabel: "Numéro d'article (PNC)",
    customerLabel: "Attribuer un client",
    selectCustomer: "Sélectionner un client (facultatif)",
    cancel: "Annuler",
    registerProduct: "Enregistrer le produit",
    added: "✓ Ajouté !",
    dragDrop: "Glissez-déposez le fichier ici",
    chooseFile: "Choisir un fichier",
    acceptedFormats: "Formats acceptés",
    questionnaire: "Questionnaire",
    qIntro: "Merci d'explorer ce prototype. Il ne s'agit pas d'un test — c'est une exploration pour comprendre la valeur que vous percevez dans ce type d'espace de travail. Vos réponses honnêtes nous aident à comprendre ce qui compte le plus pour les concessionnaires dans leur travail quotidien.",
    qInstructions: "Veuillez répondre aux questions ci-dessous en fonction de votre expérience. Il n'y a pas de bonnes ou de mauvaises réponses.",
    q1: "Quelle serait l'utilité de cet aperçu des produits dans votre travail quotidien ?",
    q1o1: "Très utile — je l'utiliserais quotidiennement",
    q1o2: "Assez utile — je le consulterais régulièrement",
    q1o3: "Utilité limitée — seulement occasionnellement",
    q1o4: "Pas utile pour mon flux de travail",
    q2: 'Utiliseriez-vous la fonction "Ajouter un produit" pour enregistrer vos produits ?',
    q2o1: "Oui, si cela me fait gagner du temps ailleurs",
    q2o2: "Oui, mais seulement si le processus est rapide",
    q2o3: "Probablement pas — trop d'effort",
    q2o4: "Seulement si c'était obligatoire",
    q3: "L'avantage de cette vue justifie-t-il l'effort de saisie des données ?",
    q3o1: "Absolument — l'aperçu seul justifie l'effort",
    q3o2: "Probablement — si les données sont aussi utilisées pour les garanties et contrats",
    q3o3: "Incertain — cela dépend de l'effort requis",
    q3o4: "Non — l'effort est trop important par rapport à la valeur",
    q4: "Comment préféreriez-vous ajouter des produits ?",
    q4o1: "Scan QR / code-barres (un par un)",
    q4o2: "Téléchargement de fichier (en masse, CSV/Excel)",
    q4o3: "Saisie manuelle (un par un)",
    q4o4: "Synchronisation automatique depuis mon propre système",
    q5: "Enregistrez-vous déjà des produits dans un autre système ?",
    q5o1: "Oui, dans notre propre système (ERP/CRM)",
    q5o2: "Oui, dans des tableurs",
    q5o3: "Non, nous ne suivons pas les produits individuels",
    q5o4: "Partiellement — uniquement pour certains types de produits",
    q6: "Préféreriez-vous ajouter des produits et déclarer des sell-outs un par un ou en masse ?",
    q6o1: "Un par un — à l'arrivée ou à la vente de chaque produit",
    q6o2: "En masse — uploads ou déclarations périodiques par lots",
    q6o3: "Les deux — selon la situation",
    q6o4: "Synchronisation automatique depuis mon propre système",
    q7: "Quelle serait l'utilité de la fonction de déclaration sell-out pour votre activité ?",
    q7o1: "Très utile — je déclarerais chaque vente",
    q7o2: "Assez utile — je déclarerais régulièrement",
    q7o3: "Utilité limitée — uniquement si requis",
    q7o4: "Pas utile pour mon activité",
    q8: "Quel avantage de la déclaration sell-out est le plus important pour vous ?",
    q8o1: "Garantie activée automatiquement à partir de la date de vente",
    q8o2: "Ventes suivies dans mes analyses et rapports",
    q8o3: "Éligibilité au bonus et qualification aux campagnes",
    q8o4: "Meilleur approvisionnement produit aligné sur mes ventes réelles",
    q8o5: "Services de suivi deviennent disponibles",
    q9: "Déclarez-vous actuellement des sell-outs à Husqvarna ? Si oui, comment ?",
    q9o1: "Oui — via le portail B2B actuel",
    q9o2: "Oui — par e-mail ou tableur",
    q9o3: "Partiellement — uniquement pour certains types de produits",
    q9o4: "Non — nous ne déclarons pas de sell-outs actuellement",
    q10: "Préféreriez-vous déclarer les sell-outs immédiatement au point de vente ou par lots plus tard ?",
    q10o1: "Immédiatement — à chaque vente",
    q10o2: "Par lots — hebdomadaire ou mensuel",
    q10o3: "Les deux — selon la situation",
    q10o4: "Synchronisation automatique depuis mon propre système",
    q11: "Quelles informations dans cette vue sont les plus précieuses pour vous ?",
    q11placeholder: "Veuillez décrire quelles colonnes ou données vous trouvez les plus utiles, et s'il manque quelque chose...",
    q12: "Autres commentaires ou réflexions ?",
    q12placeholder: "Partagez vos observations, préoccupations ou idées...",
    qSubmit: "Envoyer les réponses",
    qSubmitted: "Merci ! Vos réponses ont été enregistrées.",
    tabSellout: "Sell-out",
    selloutTitle: "Sell-out",
    selloutSubtitle: "Déclarez vos ventes à Husqvarna et débloquez des avantages",
    soInStock: "En stock",
    soInStockSub: "sur les produits",
    soSoldMonth: "Vendus ce mois",
    soSoldMonthSub: "Mars 2026",
    soPendingBonus: "Bonus en attente",
    soPendingBonusSub: "en cours de vérification",
    soInventory: "Votre inventaire",
    soInStockBadge: "en stock",
    soReportSale: "Déclarer vente",
    soRecentSellouts: "Sell-outs récents",
    soReportSellout: "+ Déclarer un sell-out",
    soStep: "Étape",
    soWhatReport: "Que souhaitez-vous déclarer ?",
    soChooseMode: "Choisissez une déclaration unique ou groupée.",
    soSingleProduct: "Produit unique",
    soSingleDesc: "Un produit avec tous les détails",
    soBulkReport: "Déclaration groupée",
    soBulkDesc: "Plusieurs produits en une fois",
    soWhichProduct: "Quel produit a été vendu ?",
    soWhichProductDesc: "Sélectionnez dans l'inventaire, saisissez le PNC ou scannez par photo.",
    soTabInventory: "Inventaire",
    soTabPnc: "Saisir PNC",
    soTabPhoto: "Photo",
    soPncNumber: "Numéro PNC",
    soPncPlaceholder: "ex. 967 62 25-03",
    soPhotoDesc: "Prenez une photo de l'étiquette — le PNC sera détecté automatiquement.",
    soSimulateScan: "Simuler le scan",
    soContinue: "Continuer",
    soEnterSaleDetails: "Saisir les détails de vente",
    soSaleDate: "Date de vente *",
    soSerialNumber: "Numéro de série",
    soSerialRecommended: "(recommandé)",
    soSerialHelper: "Nécessaire pour activer la garantie par unité et enregistrer le produit.",
    soSerialPlaceholder: "ex. AMX-2026-00123",
    soReviewSubmit: "Vérifier & soumettre",
    soReviewTitle: "Vérifiez votre sell-out",
    soProduct: "Produit",
    soPnc: "PNC",
    soSerialNumberLabel: "Numéro de série",
    soNotProvided: "— non fourni",
    soWhatUnlocks: "Ce que cela débloque pour vous :",
    soUnlockWarranty: "Garantie activée à partir de la date de vente",
    soUnlockAnalytics: "Vente suivie dans vos analyses",
    soUnlockBonus: "Éligibilité au bonus ouverte chez Husqvarna",
    soUnlockServices: "Services de suivi maintenant disponibles",
    soSubmitSellout: "Soumettre le sell-out",
    soSelloutReported: "Sell-out déclaré !",
    soSelloutReportedDesc: "Husqvarna a été notifié. Voici ce qui a été activé :",
    soBackToOverview: "Retour à l'aperçu",
    soReportAnother: "Déclarer un autre",
    soAddSoldProducts: "Ajouter les produits vendus",
    soAddSoldProductsDesc: "Ajoutez chaque produit vendu. Le numéro de série est facultatif mais recommandé.",
    soAddAnotherProduct: "+ Ajouter un autre produit",
    soSubmitBulk: "Soumettre les sell-outs",
  },
};

/* ═══════════════════════════════════════════════════════
   TYPES & SHARED
   ═══════════════════════════════════════════════════════ */

type Tab = "products" | "sellout" | "orders" | "invoices" | "customers" | "contracts" | "today";

type SetupSource = "Fleet" | "MIT" | "AMS" | "Connect" | "";
type SetupData = { date: string; source: SetupSource } | "missing";

type ProductRow = {
  model: string;
  serial: string;
  pnc: string;
  customer: string;
  soldDate: string;
  installed: SetupData;
  firstUse: SetupData;
  warranty: string;
  serviceContract: string;
  leasing: string;
  hypercare: string;
  lastUpdated?: string;
};

function StatusBadge({ status, lang }: { status: string; lang: Lang }) {
  if (status === "—") return <span className="text-[12px] text-[#ccc]">—</span>;
  const styles: Record<string, { bg: string; text: string }> = {
    active: { bg: "bg-[#e8f5e9]", text: "text-[#2e7d32]" },
    expiring: { bg: "bg-[#fff3e0]", text: "text-[#e65100]" },
    expired: { bg: "bg-[#fce8e8]", text: "text-[#c44]" },
    pending: { bg: "bg-[#e3f2fd]", text: "text-[#1565c0]" },
    missing: { bg: "bg-[#fce8e8]", text: "text-[#c44]" },
    completed: { bg: "bg-[#e8f5e9]", text: "text-[#2e7d32]" },
  };
  const labelMap: Record<string, string> = {
    active: t[lang].statusActive,
    expiring: t[lang].statusExpiring,
    expired: t[lang].statusExpired,
    pending: t[lang].statusPending,
    missing: t[lang].statusMissing,
    completed: t[lang].statusCompleted,
  };
  const s = styles[status] ?? styles.pending;
  const label = labelMap[status] ?? status;
  return <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${s.bg} ${s.text}`}>{label}</span>;
}

const sourceColors: Record<SetupSource, { bg: string; text: string }> = {
  Fleet: { bg: "bg-[#e3f2fd]", text: "text-[#1565c0]" },
  MIT: { bg: "bg-[#e8eaf6]", text: "text-[#273A60]" },
  AMS: { bg: "bg-[#fff3e0]", text: "text-[#e65100]" },
  Connect: { bg: "bg-[#e8f5e9]", text: "text-[#2e7d32]" },
  "": { bg: "bg-[#f5f5f5]", text: "text-[#888]" },
};

function SetupCell({ installed, firstUse, lang }: { installed: SetupData; firstUse: SetupData; lang: Lang }) {
  const i = t[lang];
  const bothMissing = installed === "missing" && firstUse === "missing";

  if (bothMissing) {
    return <span className="inline-flex items-center gap-1 rounded-full bg-[#fce8e8] px-2 py-0.5 text-[10px] font-semibold text-[#c44]">{i.missing}</span>;
  }

  return (
    <div className="space-y-2.5">
      {/* Installed */}
      <div>
        <span className="text-[9px] font-bold uppercase tracking-wider text-[#bbb]">{i.colInstalled}</span>
        {installed !== "missing" ? (
          <div className="mt-0.5 flex items-center gap-1.5 pl-2">
            <span className="text-[12px] font-medium text-[#333]">{installed.date}</span>
            <span className={`rounded px-1.5 py-0.5 text-[9px] font-bold ${sourceColors[installed.source].bg} ${sourceColors[installed.source].text}`}>{installed.source}</span>
          </div>
        ) : (
          <div className="mt-0.5 pl-2">
            <span className="text-[11px] text-[#ccc]">—</span>
          </div>
        )}
      </div>

      {/* First use */}
      <div>
        <span className="text-[9px] font-bold uppercase tracking-wider text-[#bbb]">{i.colFirstUse}</span>
        {firstUse !== "missing" ? (
          <div className="mt-0.5 flex items-center gap-1.5 pl-2">
            <span className="text-[12px] font-medium text-[#333]">{firstUse.date}</span>
            <span className={`rounded px-1.5 py-0.5 text-[9px] font-bold ${sourceColors[firstUse.source].bg} ${sourceColors[firstUse.source].text}`}>{firstUse.source}</span>
          </div>
        ) : (
          <div className="mt-0.5 pl-2">
            {installed !== "missing" ? (
              <span className="rounded-full bg-[#fff3e0] px-1.5 py-0.5 text-[9px] font-semibold text-[#b8860b]">{i.statusPending}</span>
            ) : (
              <span className="text-[11px] text-[#ccc]">—</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════ */

const products: ProductRow[] = [
  // Full data — both installed & first use from different sources
  { model: "Automower 435X AWD", serial: "2024-435X-00891", pnc: "967 85 32-01", customer: "Lindström Fastigheter", soldDate: "2024-11-15", installed: { date: "2024-11-20", source: "MIT" }, firstUse: "missing", warranty: "pending", serviceContract: "missing", leasing: "—", hypercare: "—", lastUpdated: "2026-04-08" },
  { model: "CEORA 526 EPOS", serial: "2024-C526-00045", pnc: "967 93 10-02", customer: "Karlsson Park & Trädgård", soldDate: "2024-08-14", installed: { date: "2024-08-20", source: "MIT" }, firstUse: { date: "2024-08-22", source: "Fleet" }, warranty: "active", serviceContract: "active", leasing: "active", hypercare: "active", lastUpdated: "2026-03-22" },
  { model: "Husqvarna 346XP", serial: "2024-346X-03211", pnc: "966 99 18-35", customer: "Skogsservice Norr AB", soldDate: "2024-09-05", installed: { date: "2024-09-05", source: "MIT" }, firstUse: { date: "2024-09-05", source: "Connect" }, warranty: "active", serviceContract: "active", leasing: "—", hypercare: "active", lastUpdated: "2026-04-02" },
  { model: "Automower 430X NERA", serial: "2024-430N-02876", pnc: "585 57 28-01", customer: "Lindström Fastigheter", soldDate: "2024-05-12", installed: { date: "2024-05-18", source: "MIT" }, firstUse: { date: "2024-05-25", source: "AMS" }, warranty: "active", serviceContract: "active", leasing: "—", hypercare: "—", lastUpdated: "2026-02-14" },

  // Installed but not yet first-used
  { model: "Automower 550X Mark II", serial: "—", pnc: "967 85 45-02", customer: "Eriksson Trädgård AB", soldDate: "2024-10-20", installed: { date: "2024-10-25", source: "MIT" }, firstUse: "missing", warranty: "pending", serviceContract: "active", leasing: "—", hypercare: "—", lastUpdated: "2026-03-30" },
  { model: "Automower 450X NERA", serial: "—", pnc: "967 85 38-01", customer: "BRF Solsidan", soldDate: "2024-07-22", installed: { date: "2024-07-28", source: "MIT" }, firstUse: { date: "2024-08-03", source: "AMS" }, warranty: "active", serviceContract: "expiring", leasing: "—", hypercare: "—", lastUpdated: "2026-01-18" },

  // First use from Connect (chainsaw/trimmer — no "installation" step)
  { model: "Husqvarna 572XP", serial: "2024-572X-00432", pnc: "966 73 31-18", customer: "—", soldDate: "2024-06-10", installed: "missing", firstUse: { date: "2024-06-15", source: "Connect" }, warranty: "active", serviceContract: "missing", leasing: "—", hypercare: "—", lastUpdated: "2026-04-09" },
  { model: "Husqvarna 535RXT", serial: "2024-535R-04521", pnc: "967 86 12-03", customer: "—", soldDate: "2024-11-08", installed: "missing", firstUse: { date: "2024-11-10", source: "Connect" }, warranty: "active", serviceContract: "active", leasing: "—", hypercare: "—", lastUpdated: "2026-03-15" },

  // Fleet-reported first use (professional robotic mower)
  { model: "Automower 405X NERA", serial: "2025-405N-00312", pnc: "967 85 40-01", customer: "—", soldDate: "2025-01-15", installed: { date: "2025-01-22", source: "MIT" }, firstUse: { date: "2025-01-24", source: "Fleet" }, warranty: "active", serviceContract: "active", leasing: "—", hypercare: "—", lastUpdated: "2026-02-28" },

  // AMS-reported first use (consumer app)
  { model: "Automower 310 Mark II", serial: "—", pnc: "967 85 21-03", customer: "—", soldDate: "2024-12-01", installed: { date: "2024-12-08", source: "MIT" }, firstUse: { date: "2024-12-15", source: "AMS" }, warranty: "active", serviceContract: "active", leasing: "—", hypercare: "—", lastUpdated: "2025-12-10" },

  // Nothing — no installation, no first use
  { model: "Husqvarna 562XP", serial: "—", pnc: "966 57 03-18", customer: "—", soldDate: "2024-06-20", installed: "missing", firstUse: "missing", warranty: "expiring", serviceContract: "missing", leasing: "—", hypercare: "—", lastUpdated: "2025-11-05" },
  { model: "Automower 320 NERA", serial: "—", pnc: "967 85 25-01", customer: "—", soldDate: "2025-02-01", installed: { date: "2025-02-10", source: "MIT" }, firstUse: "missing", warranty: "active", serviceContract: "active", leasing: "—", hypercare: "—", lastUpdated: "2026-02-05" },

  // Missing sold date entirely
  { model: "CEORA 546 EPOS", serial: "2024-C546-00087", pnc: "967 93 12-01", customer: "AB Grönytor", soldDate: "missing", installed: "missing", firstUse: "missing", warranty: "missing", serviceContract: "missing", leasing: "active", hypercare: "active", lastUpdated: "2026-01-12" },
  { model: "Automower 310 Mark II", serial: "—", pnc: "967 85 21-03", customer: "—", soldDate: "missing", installed: "missing", firstUse: "missing", warranty: "missing", serviceContract: "missing", leasing: "—", hypercare: "—", lastUpdated: "2025-10-22" },
  { model: "Husqvarna 562XP", serial: "—", pnc: "966 57 03-18", customer: "—", soldDate: "missing", installed: "missing", firstUse: "missing", warranty: "missing", serviceContract: "missing", leasing: "—", hypercare: "—", lastUpdated: "2025-09-30" },
];

/* Customer key (stable identifier across languages) → localized {name, contact} */
type CustomerLocale = { name: string; contact: string };

const customerLocales: Record<string, Record<Lang, CustomerLocale>> = {
  c1: {
    en: { name: "Greenfield Properties Ltd", contact: "Andrew Miller" },
    sv: { name: "Lindström Fastigheter", contact: "Anna Lindström" },
    de: { name: "Lindström Immobilien GmbH", contact: "Emilia Schmidt" },
    fr: { name: "Propriétés Verts SARL", contact: "Gabriel Martin" },
  },
  c2: {
    en: { name: "Eriksson Garden Co", contact: "Peter Edwards" },
    sv: { name: "Eriksson Trädgård AB", contact: "Per Eriksson" },
    de: { name: "Eriksson Garten GmbH", contact: "Peter Müller" },
    fr: { name: "Eriksson Jardins SARL", contact: "Pierre Dubois" },
  },
  c3: {
    en: { name: "AB Green Areas", contact: "Mary Stevens" },
    sv: { name: "AB Grönytor", contact: "Maria Svensson" },
    de: { name: "Grünflächen AG", contact: "Marie Becker" },
    fr: { name: "AB Espaces Verts", contact: "Marie Lefèvre" },
  },
  c4: {
    en: { name: "Northern Forest Service Ltd", contact: "John Morgan" },
    sv: { name: "Skogsservice Norr AB", contact: "Johan Bergström" },
    de: { name: "Waldservice Nord GmbH", contact: "Johannes Berger" },
    fr: { name: "Service Forestier Nord SARL", contact: "Jean Bernard" },
  },
  c5: {
    en: { name: "Nilsson Home Service", contact: "Eric Nicholson" },
    sv: { name: "Nilsson Villaservice", contact: "Erik Nilsson" },
    de: { name: "Nilsson Hausdienst", contact: "Erik Neumann" },
    fr: { name: "Nilsson Service Maison", contact: "Éric Noël" },
  },
  c6: {
    en: { name: "Karlsson Park & Garden", contact: "Lisa Carlton" },
    sv: { name: "Karlsson Park & Trädgård", contact: "Lisa Karlsson" },
    de: { name: "Karlsson Park & Garten", contact: "Lisa Krüger" },
    fr: { name: "Karlsson Parc & Jardin", contact: "Lise Caron" },
  },
  c7: {
    en: { name: "Sunset Housing Co-op", contact: "Karen Holmes" },
    sv: { name: "BRF Solsidan", contact: "Karin Holm" },
    de: { name: "Sonnenseite Wohnen eG", contact: "Karin Hoffmann" },
    fr: { name: "Coopérative Côté Soleil", contact: "Karine Hubert" },
  },
  c8: {
    en: { name: "Sunbeam Properties Plc", contact: "Andrew Birch" },
    sv: { name: "Fastighets AB Solbacken", contact: "Anders Björk" },
    de: { name: "Solbacken Immobilien AG", contact: "Andreas Brandt" },
    fr: { name: "Propriétés Soleil SA", contact: "André Béranger" },
  },
};

const customerStats: Record<string, { products: number; contracts: number; hypercare: number; program: string; status: string }> = {
  c1: { products: 4, contracts: 2, hypercare: 0, program: "Service Plus", status: "active" },
  c2: { products: 3, contracts: 3, hypercare: 0, program: "Service Plus", status: "active" },
  c3: { products: 6, contracts: 4, hypercare: 2, program: "Lease Plus", status: "pending" },
  c4: { products: 8, contracts: 5, hypercare: 2, program: "Service Plus", status: "active" },
  c5: { products: 2, contracts: 1, hypercare: 0, program: "Service Plus", status: "active" },
  c6: { products: 5, contracts: 4, hypercare: 1, program: "Lease Plus", status: "active" },
  c7: { products: 3, contracts: 2, hypercare: 0, program: "Service Plus", status: "expiring" },
  c8: { products: 1, contracts: 0, hypercare: 0, program: "—", status: "pending" },
};

/* Map Swedish customer names (used in product mock data) → customer key */
const customerNameToKey: Record<string, string> = {
  "Lindström Fastigheter": "c1",
  "Eriksson Trädgård AB": "c2",
  "AB Grönytor": "c3",
  "Skogsservice Norr AB": "c4",
  "Nilsson Villaservice": "c5",
  "Karlsson Park & Trädgård": "c6",
  "BRF Solsidan": "c7",
  "Fastighets AB Solbacken": "c8",
};

function localizedCustomerName(swedishName: string, lang: Lang): string {
  if (swedishName === "—" || swedishName === "missing") return swedishName;
  const key = customerNameToKey[swedishName];
  if (!key) return swedishName;
  return customerLocales[key][lang].name;
}

function getLocalizedCustomers(lang: Lang) {
  return Object.entries(customerLocales).map(([key, locales]) => ({
    name: locales[lang].name,
    contact: locales[lang].contact,
    ...customerStats[key],
  }));
}

function getExistingCustomerNames(lang: Lang): string[] {
  return Object.values(customerLocales).map((c) => c[lang].name);
}

/* ═══════════════════════════════════════════════════════
   ADD PRODUCT PANEL
   ═══════════════════════════════════════════════════════ */

function AddProductPanel({ onClose, onAdd, lang }: { onClose: () => void; onAdd: (p: typeof products[0]) => void; lang: Lang }) {
  const [mode, setMode] = useState<"scan" | "manual" | "upload">("scan");
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [model, setModel] = useState("");
  const [serial, setSerial] = useState("");
  const [pnc, setPnc] = useState("");
  const [customer, setCustomer] = useState("");
  const [added, setAdded] = useState(false);
  const i = t[lang];

  function handleScan() {
    setScanning(true);
    setTimeout(() => { setScanning(false); setScanned(true); setModel("Husqvarna 545 Mark II"); setSerial("2025-545M-00" + Math.floor(Math.random() * 900 + 100)); setPnc("967 69 07-35"); }, 2000);
  }

  function handleAdd() {
    if (!model || !serial) return;
    setAdded(true);
    setTimeout(() => { onAdd({ model, serial, pnc: pnc || "—", customer: customer || "—", soldDate: "missing", installed: "missing", firstUse: "missing", warranty: "missing", serviceContract: "missing", leasing: "—", hypercare: "—", lastUpdated: new Date().toISOString().split("T")[0] }); }, 1000);
  }

  const modeButtons = [
    { id: "scan" as const, label: i.scanTab, icon: "M3 3h5v5H3zM12 3h5v5h-5zM3 12h5v5H3zM12 12h5v5h-5z" },
    { id: "manual" as const, label: i.manualTab, icon: "M11 4H4a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" },
    { id: "upload" as const, label: i.uploadTab, icon: "M3 14v2a2 2 0 002 2h10a2 2 0 002-2v-2M6 7l4-4 4 4M10 3v10" },
  ];

  return (
    <>
      <div className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed right-0 top-0 z-[9999] flex h-full w-full max-w-md flex-col bg-white shadow-2xl sm:w-[440px]">
        <div className="flex items-center justify-between border-b border-[#e5e5e5] px-6 py-4">
          <h2 className="text-[16px] font-bold text-[#111]">{i.addProductTitle}</h2>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-lg text-[#999] hover:bg-[#f5f5f5]">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 4l8 8M12 4l-8 8" /></svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="mx-6 mt-5 flex gap-1 rounded-lg bg-[#f5f5f5] p-1">
            {modeButtons.map((m) => (
              <button key={m.id} onClick={() => { setMode(m.id); if (m.id === "scan") setScanned(false); }}
                className={`flex flex-1 items-center justify-center gap-1.5 rounded-md py-2.5 text-[11px] font-semibold transition-all ${mode === m.id ? "bg-white text-[#111] shadow-sm" : "text-[#888]"}`}>
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={m.icon} /></svg>
                {m.label}
              </button>
            ))}
          </div>
          {mode === "scan" && !scanned && (
            <div className="px-6 pt-6">
              <div className="flex h-48 flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#d0d0d0] bg-[#fafafa]">
                {scanning ? (
                  <><div className="h-10 w-10 animate-spin rounded-full border-4 border-[#273A60]/20 border-t-[#273A60]" /><p className="mt-3 text-[13px] font-semibold text-[#555]">{i.scanning}</p></>
                ) : (
                  <>
                    <svg width="40" height="40" viewBox="0 0 48 48" fill="none" stroke="#bbb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="6" width="12" height="12" rx="2" /><rect x="30" y="6" width="12" height="12" rx="2" /><rect x="6" y="30" width="12" height="12" rx="2" /><rect x="30" y="30" width="12" height="12" rx="2" /></svg>
                    <p className="mt-3 text-[13px] font-semibold text-[#555]">{i.scanQr}</p>
                    <button onClick={handleScan} className="mt-3 rounded-lg bg-[#273A60] px-5 py-2.5 text-[12px] font-semibold text-white hover:bg-[#1a2d4d]">{i.startCamera}</button>
                  </>
                )}
              </div>
            </div>
          )}
          {mode === "upload" && (
            <div className="px-6 pt-6 space-y-4">
              <div className="flex h-40 flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#d0d0d0] bg-[#fafafa] hover:border-[#273A60]/40">
                <svg width="36" height="36" viewBox="0 0 40 40" fill="none" stroke="#bbb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 28v4a2 2 0 002 2h24a2 2 0 002-2v-4" /><polyline points="12 14 20 6 28 14" /><line x1="20" y1="6" x2="20" y2="26" /></svg>
                <p className="mt-2 text-[13px] font-semibold text-[#555]">{i.dragDrop}</p>
                <button className="mt-2 rounded-lg border border-[#d0d0d0] bg-white px-4 py-1.5 text-[12px] font-semibold text-[#555]">{i.chooseFile}</button>
              </div>
              <div className="rounded-lg bg-[#f8f9fb] px-4 py-3">
                <p className="text-[11px] font-semibold text-[#273A60]">{i.acceptedFormats}</p>
                <div className="mt-1.5 flex gap-2">
                  <span className="rounded-full bg-[#e8f5e9] px-2 py-0.5 text-[10px] font-bold text-[#2e7d32]">CSV</span>
                  <span className="rounded-full bg-[#e3f2fd] px-2 py-0.5 text-[10px] font-bold text-[#1565c0]">Excel</span>
                  <span className="rounded-full bg-[#fff3e0] px-2 py-0.5 text-[10px] font-bold text-[#e65100]">XML</span>
                </div>
              </div>
            </div>
          )}
          {(mode === "manual" || scanned) && (
            <div className="px-6 pt-5 space-y-4">
              {scanned && (
                <div className="flex items-center gap-2 rounded-xl border border-[#2a9d5c]/30 bg-[#f0faf4] p-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2a9d5c] text-white">
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M3.5 8.5l3 3 6-6" /></svg>
                  </span>
                  <span className="text-[13px] font-semibold text-[#2e7d32]">{i.productIdentified}</span>
                </div>
              )}
              <div><label className="text-[13px] font-bold text-[#111]">{i.modelLabel}</label><input type="text" value={model} onChange={(e) => setModel(e.target.value)} className="mt-1.5 h-10 w-full rounded-lg border border-[#d0d0d0] px-3 text-[13px] text-[#333] placeholder-[#aaa] focus:border-[#273A60] focus:outline-none" /></div>
              <div><label className="text-[13px] font-bold text-[#111]">{i.serialLabel}</label><input type="text" value={serial} onChange={(e) => setSerial(e.target.value)} className="mt-1.5 h-10 w-full rounded-lg border border-[#d0d0d0] px-3 text-[13px] text-[#333] placeholder-[#aaa] focus:border-[#273A60] focus:outline-none" /></div>
              <div><label className="text-[13px] font-bold text-[#111]">{i.pncLabel}</label><input type="text" value={pnc} onChange={(e) => setPnc(e.target.value)} className="mt-1.5 h-10 w-full rounded-lg border border-[#d0d0d0] px-3 text-[13px] text-[#333] placeholder-[#aaa] focus:border-[#273A60] focus:outline-none" /></div>
              <div>
                <label className="text-[13px] font-bold text-[#111]">{i.customerLabel}</label>
                <select value={customer} onChange={(e) => setCustomer(e.target.value)} className="mt-1.5 h-10 w-full rounded-lg border border-[#d0d0d0] bg-white px-3 text-[13px] text-[#333] focus:border-[#273A60] focus:outline-none">
                  <option value="">{i.selectCustomer}</option>
                  {getExistingCustomerNames(lang).map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
          )}
        </div>
        <div className="flex gap-3 border-t border-[#e5e5e5] px-6 py-4">
          <button onClick={onClose} className="flex-1 rounded-lg border border-[#d0d0d0] py-3 text-[13px] font-semibold text-[#555] hover:bg-[#f5f5f5]">{i.cancel}</button>
          <button onClick={handleAdd} disabled={!model || !serial || added} className={`flex-1 rounded-lg py-3 text-[13px] font-bold text-white transition-all ${added ? "bg-[#2e7d32]" : model && serial ? "bg-[#273A60] hover:bg-[#1a2d4d]" : "bg-[#273A60]/50 cursor-not-allowed"}`}>
            {added ? i.added : i.registerProduct}
          </button>
        </div>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════
   SALES DATE PANEL
   ═══════════════════════════════════════════════════════ */

function SalesDatePanel({
  product,
  lang,
  onClose,
  onRegister,
}: {
  product: typeof products[0];
  lang: Lang;
  onClose: () => void;
  onRegister: (serial: string, date: string, customer: string) => void;
}) {
  const i = t[lang];
  const localizedInitial = localizedCustomerName(product.customer, lang);
  const initialCustomer = localizedInitial === "—" ? "" : localizedInitial;
  const [date, setDate] = useState("");
  const [customer, setCustomer] = useState(initialCustomer);
  const [customerSearch, setCustomerSearch] = useState(initialCustomer);
  const [showList, setShowList] = useState(false);
  const [comment, setComment] = useState("");
  const [registered, setRegistered] = useState(false);

  const filtered = getExistingCustomerNames(lang).filter((c) => c.toLowerCase().includes(customerSearch.toLowerCase()));

  function handleRegister() {
    if (!date) return;
    setRegistered(true);
    setTimeout(() => onRegister(product.serial, date, customer), 1000);
  }

  return (
    <>
      <div className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed right-0 top-0 z-[9999] flex h-full w-full max-w-md flex-col bg-white shadow-2xl sm:w-[440px]">
        <div className="flex items-center justify-between border-b border-[#e5e5e5] px-6 py-4">
          <h2 className="text-[16px] font-bold text-[#111]">{i.salesDateTitle}</h2>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-lg text-[#999] hover:bg-[#f5f5f5]">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 4l8 8M12 4l-8 8" /></svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {/* Product info */}
          <div className="mx-6 mt-5 rounded-xl border border-[#e5e5e5] bg-[#fafafa] p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-[14px] font-semibold text-[#111]">{product.model}</h3>
                <p className="mt-0.5 text-[12px] text-[#888]">{product.serial}</p>
                <p className="text-[12px] text-[#888]">{product.pnc}</p>
              </div>
              <span className="rounded-full bg-[#fce8e8] px-2 py-0.5 text-[10px] font-bold text-[#c44]">{i.salesDateMissingBadge}</span>
            </div>
          </div>
          {/* Date */}
          <div className="px-6 pt-5">
            <label className="text-[13px] font-bold text-[#111]">{i.salesDateLabel}</label>
            <p className="mt-0.5 text-[11px] text-[#888]">{i.salesDateHelper}</p>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-2 h-10 w-full rounded-lg border border-[#d0d0d0] px-3 text-[13px] text-[#333] focus:border-[#273A60] focus:outline-none" />
          </div>
          {/* Customer */}
          <div className="px-6 pt-5">
            <label className="text-[13px] font-bold text-[#111]">{i.salesDateCustomer}</label>
            <p className="mt-0.5 text-[11px] text-[#888]">{i.salesDateCustomerHelper}</p>
            <div className="relative mt-2">
              <input type="text" value={customerSearch}
                onChange={(e) => { setCustomerSearch(e.target.value); setCustomer(e.target.value); setShowList(true); }}
                onFocus={() => setShowList(true)} onBlur={() => setTimeout(() => setShowList(false), 200)}
                placeholder={i.salesDateSearchPlaceholder}
                className="h-10 w-full rounded-lg border border-[#d0d0d0] px-3 text-[13px] text-[#333] placeholder-[#aaa] focus:border-[#273A60] focus:outline-none" />
              {showList && filtered.length > 0 && (
                <div className="absolute left-0 right-0 top-full z-10 mt-1 max-h-40 overflow-y-auto rounded-lg border border-[#d0d0d0] bg-white shadow-lg">
                  {filtered.map((c: string) => (
                    <button key={c} onMouseDown={() => { setCustomer(c); setCustomerSearch(c); setShowList(false); }}
                      className="flex w-full items-center gap-2 px-3 py-2 text-left text-[13px] text-[#333] hover:bg-[#f5f5f5]">{c}</button>
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* Comment */}
          <div className="px-6 pt-5 pb-6">
            <label className="text-[13px] font-bold text-[#111]">{i.salesDateComment}</label>
            <p className="mt-0.5 text-[11px] text-[#888]">{i.salesDateCommentHelper}</p>
            <textarea value={comment} onChange={(e) => setComment(e.target.value)} rows={3}
              className="mt-2 w-full resize-none rounded-lg border border-[#d0d0d0] px-3 py-2.5 text-[13px] text-[#333] placeholder-[#aaa] focus:border-[#273A60] focus:outline-none" />
          </div>
        </div>
        <div className="flex gap-3 border-t border-[#e5e5e5] px-6 py-4">
          <button onClick={onClose} className="flex-1 rounded-lg border border-[#d0d0d0] py-3 text-[13px] font-semibold text-[#555] hover:bg-[#f5f5f5]">{i.cancel}</button>
          <button onClick={handleRegister} disabled={!date || registered}
            className={`flex-1 rounded-lg py-3 text-[13px] font-bold text-white transition-all ${registered ? "bg-[#2e7d32]" : date ? "bg-[#273A60] hover:bg-[#1a2d4d]" : "bg-[#273A60]/50 cursor-not-allowed"}`}>
            {registered ? i.salesDateRegistered : i.salesDateRegister}
          </button>
        </div>
      </div>
    </>
  );
}

function SalesDatePickerPanel({
  products: prods,
  lang,
  onClose,
  onSelectProduct,
}: {
  products: typeof products;
  lang: Lang;
  onClose: () => void;
  onSelectProduct: (p: typeof products[0]) => void;
}) {
  const i = t[lang];
  const missing = prods.filter((p) => p.soldDate === "missing");

  return (
    <>
      <div className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed right-0 top-0 z-[9999] flex h-full w-full max-w-md flex-col bg-white shadow-2xl sm:w-[440px]">
        <div className="flex items-center justify-between border-b border-[#e5e5e5] px-6 py-4">
          <h2 className="text-[16px] font-bold text-[#111]">{i.addSalesDate}</h2>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-lg text-[#999] hover:bg-[#f5f5f5]">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 4l8 8M12 4l-8 8" /></svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          <p className="px-6 pt-5 text-[13px] text-[#888]">{i.selectProduct}</p>
          <div className="mt-3 divide-y divide-[#f0f0f0]">
            {missing.map((p) => (
              <button key={p.serial} onClick={() => onSelectProduct(p)}
                className="flex w-full items-center gap-4 px-6 py-4 text-left transition-colors hover:bg-[#fafafa]">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#fce8e8]">
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="#c44" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="10" cy="10" r="8" /><path d="M10 6v4l2.5 2.5" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[13px] font-semibold text-[#111]">{p.model}</span>
                  <span className="mt-0.5 block text-[11px] text-[#888]">{p.serial} · {localizedCustomerName(p.customer, lang)}</span>
                </div>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#ccc" strokeWidth="1.8" strokeLinecap="round"><path d="M6 4l4 4-4 4" /></svg>
              </button>
            ))}
          </div>
          {missing.length === 0 && (
            <div className="px-6 py-12 text-center">
              <p className="text-[14px] text-[#999]">✓</p>
              <p className="mt-1 text-[13px] text-[#888]">{i.statusCompleted}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════
   ADD CUSTOMER PANEL
   ═══════════════════════════════════════════════════════ */

function AddCustomerPanel({ lang, onClose }: { lang: Lang; onClose: () => void }) {
  const i = t[lang];
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(onClose, 1200);
  }

  return (
    <>
      <div className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed right-0 top-0 z-[9999] flex h-full w-full max-w-lg flex-col bg-white shadow-2xl sm:w-[480px]">
        <div className="flex items-center justify-between border-b border-[#e5e5e5] px-6 py-4">
          <h2 className="text-[16px] font-bold text-[#111]">{i.addCustomerTitle}</h2>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-lg text-[#999] hover:bg-[#f5f5f5]">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 4l8 8M12 4l-8 8" /></svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
          {saved ? (
            <div className="flex flex-col items-center justify-center pt-16">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#e8f5e9]">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2e7d32" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5" /></svg>
              </span>
              <p className="mt-3 text-[15px] font-bold text-[#111]">✓</p>
            </div>
          ) : (
            <>
              <div>
                <label className="text-[13px] font-bold text-[#111]">{i.custCompanyName}</label>
                <input type="text" className="mt-1.5 h-10 w-full rounded-lg border border-[#d0d0d0] px-3 text-[13px] text-[#333] placeholder-[#aaa] focus:border-[#273A60] focus:outline-none" />
              </div>
              <div>
                <label className="text-[13px] font-bold text-[#111]">{i.custContactPerson}</label>
                <input type="text" className="mt-1.5 h-10 w-full rounded-lg border border-[#d0d0d0] px-3 text-[13px] text-[#333] placeholder-[#aaa] focus:border-[#273A60] focus:outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[13px] font-bold text-[#111]">{i.custEmail}</label>
                  <input type="email" className="mt-1.5 h-10 w-full rounded-lg border border-[#d0d0d0] px-3 text-[13px] text-[#333] placeholder-[#aaa] focus:border-[#273A60] focus:outline-none" />
                </div>
                <div>
                  <label className="text-[13px] font-bold text-[#111]">{i.custPhone}</label>
                  <input type="tel" className="mt-1.5 h-10 w-full rounded-lg border border-[#d0d0d0] px-3 text-[13px] text-[#333] placeholder-[#aaa] focus:border-[#273A60] focus:outline-none" />
                </div>
              </div>
              <div>
                <label className="text-[13px] font-bold text-[#111]">{i.custAddress}</label>
                <input type="text" className="mt-1.5 h-10 w-full rounded-lg border border-[#d0d0d0] px-3 text-[13px] text-[#333] placeholder-[#aaa] focus:border-[#273A60] focus:outline-none" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[13px] font-bold text-[#111]">{i.custPostalCode}</label>
                  <input type="text" className="mt-1.5 h-10 w-full rounded-lg border border-[#d0d0d0] px-3 text-[13px] text-[#333] placeholder-[#aaa] focus:border-[#273A60] focus:outline-none" />
                </div>
                <div>
                  <label className="text-[13px] font-bold text-[#111]">{i.custCity}</label>
                  <input type="text" className="mt-1.5 h-10 w-full rounded-lg border border-[#d0d0d0] px-3 text-[13px] text-[#333] placeholder-[#aaa] focus:border-[#273A60] focus:outline-none" />
                </div>
                <div>
                  <label className="text-[13px] font-bold text-[#111]">{i.custCountry}</label>
                  <input type="text" defaultValue="Sweden" className="mt-1.5 h-10 w-full rounded-lg border border-[#d0d0d0] px-3 text-[13px] text-[#333] focus:border-[#273A60] focus:outline-none" />
                </div>
              </div>
              <div>
                <label className="text-[13px] font-bold text-[#111]">{i.custOrgNr}</label>
                <input type="text" className="mt-1.5 h-10 w-full rounded-lg border border-[#d0d0d0] px-3 text-[13px] text-[#333] placeholder-[#aaa] focus:border-[#273A60] focus:outline-none" />
              </div>
              <div>
                <label className="text-[13px] font-bold text-[#111]">{i.custNotes}</label>
                <textarea rows={3} placeholder={i.custNotesPlaceholder} className="mt-1.5 w-full resize-none rounded-lg border border-[#d0d0d0] px-3 py-2.5 text-[13px] text-[#333] placeholder-[#aaa] focus:border-[#273A60] focus:outline-none" />
              </div>
            </>
          )}
        </div>

        {!saved && (
          <div className="flex gap-3 border-t border-[#e5e5e5] px-6 py-4">
            <button onClick={onClose} className="flex-1 rounded-lg border border-[#d0d0d0] py-2.5 text-[13px] font-semibold text-[#555]">{i.cancel}</button>
            <button onClick={handleSave} className="flex-1 rounded-lg bg-[#273A60] py-2.5 text-[13px] font-bold text-white transition-colors hover:bg-[#1a2d4d]">{i.custSave}</button>
          </div>
        )}
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════
   SELL-OUT VIEW + REPORT DRAWER
   ═══════════════════════════════════════════════════════ */

type InventoryItem = { name: string; pnc: string; category: string; stock: number };

const inventoryData: InventoryItem[] = [
  { name: "Automower 430X", pnc: "967 62 25-03", category: "Robotic Mower", stock: 8 },
  { name: "Automower 320 Nera", pnc: "967 65 48-01", category: "Robotic Mower", stock: 3 },
  { name: "LC 353iV", pnc: "967 77 20-02", category: "Lawnmower", stock: 12 },
  { name: "535i XP", pnc: "967 84 10-05", category: "Chainsaw", stock: 5 },
];

const recentSellouts = [
  { product: "Automower 430X", serial: "AMX-2026-0328", date: "28 Mar" },
  { product: "Automower 320 Nera", serial: "AMN-2026-0325", date: "25 Mar" },
  { product: "LC 353iV", serial: "LC3-2026-0320", date: "20 Mar" },
  { product: "535i XP", serial: "535-2026-0315", date: "15 Mar" },
  { product: "Automower 430X", serial: "AMX-2026-0310", date: "10 Mar" },
];

type SelloutStep = "choose" | "select-product" | "sale-details" | "review" | "done";
type SelloutMode = "single" | "bulk";
type ProductSelectTab = "inventory" | "pnc" | "photo";

type BulkItem = { product: string; pnc: string; date: string; serial: string };

function SelloutView({ lang, products, onRegisterSale }: { lang: Lang; products: ProductRow[]; onRegisterSale: (serial: string, date: string) => void }) {
  const i = t[lang];
  const [showReport, setShowReport] = useState(false);
  const [preselectedProduct, setPreselectedProduct] = useState<InventoryItem | null>(null);
  const totalStock = inventoryData.reduce((s, p) => s + p.stock, 0);
  const soldThisMonth = recentSellouts.length;
  const missingProducts = products.filter((p) => p.soldDate === "missing");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-[#111]">{i.selloutTitle}</h2>
          <p className="text-[12px] text-[#888]">{i.selloutSubtitle}</p>
        </div>
        <button
          onClick={() => { setPreselectedProduct(null); setShowReport(true); }}
          className="rounded-lg bg-[#e65100] px-5 py-2.5 text-[13px] font-bold text-white transition-colors hover:bg-[#d84300]"
        >
          {i.soReportSellout}
        </button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-xl border border-[#d0d0d0] bg-white px-5 py-4 text-center">
          <span className="text-[24px] font-extrabold text-[#e65100]">{totalStock}</span>
          <span className="mt-0.5 block text-[12px] font-medium text-[#888]">{i.soInStock}</span>
          <span className="text-[11px] text-[#bbb]">{inventoryData.length} {i.soInStockSub}</span>
        </div>
        <div className="rounded-xl border border-[#d0d0d0] bg-white px-5 py-4 text-center">
          <span className="text-[24px] font-extrabold text-[#111]">{soldThisMonth}</span>
          <span className="mt-0.5 block text-[12px] font-medium text-[#888]">{i.soSoldMonth}</span>
          <span className="text-[11px] text-[#bbb]">{i.soSoldMonthSub}</span>
        </div>
        <div className="rounded-xl border border-[#d0d0d0] bg-white px-5 py-4 text-center">
          <span className="text-[24px] font-extrabold text-[#2e7d32]">3</span>
          <span className="mt-0.5 block text-[12px] font-medium text-[#888]">{i.soPendingBonus}</span>
          <span className="text-[11px] text-[#bbb]">{i.soPendingBonusSub}</span>
        </div>
      </div>

      {/* Inventory list */}
      <div className="rounded-xl border border-[#d0d0d0] bg-white">
        <div className="border-b border-[#f0f0f0] px-5 py-4">
          <h3 className="text-[14px] font-semibold text-[#111]">{i.soInventory}</h3>
        </div>
        <div className="divide-y divide-[#f0f0f0]">
          {inventoryData.map((item) => (
            <div key={item.pnc} className="flex items-center justify-between px-5 py-3.5">
              <div>
                <span className="text-[13px] font-semibold text-[#111]">{item.name}</span>
                <span className="mt-0.5 block text-[11px] text-[#888]">PNC {item.pnc} · {item.category}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-[#e8f5e9] px-2.5 py-0.5 text-[11px] font-bold text-[#2e7d32]">{item.stock} {i.soInStockBadge}</span>
                <button
                  onClick={() => { setPreselectedProduct(item); setShowReport(true); }}
                  className="rounded-lg border border-[#d0d0d0] px-3 py-1.5 text-[12px] font-semibold text-[#555] transition-colors hover:bg-[#f5f5f5]"
                >
                  {i.soReportSale}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* Recent sell-outs */}
      <div className="rounded-xl border border-[#d0d0d0] bg-white">
        <div className="border-b border-[#f0f0f0] px-5 py-4">
          <h3 className="text-[14px] font-semibold text-[#111]">{i.soRecentSellouts}</h3>
        </div>
        <div className="divide-y divide-[#f0f0f0]">
          {recentSellouts.map((so, idx) => (
            <div key={idx} className="flex items-center justify-between px-5 py-3">
              <div>
                <span className="text-[13px] font-semibold text-[#111]">{so.product}</span>
                <span className="mt-0.5 block text-[11px] text-[#888]">S/N: {so.serial}</span>
              </div>
              <span className="text-[12px] text-[#999]">{so.date}</span>
            </div>
          ))}
        </div>
      </div>

      {showReport && <ReportSelloutDrawer lang={lang} preselected={preselectedProduct} onClose={() => { setShowReport(false); setPreselectedProduct(null); }} onRegisterSale={onRegisterSale} />}
    </div>
  );
}

function ReportSelloutDrawer({ lang, preselected, prefillSerial, prefillCustomer, onClose, onRegisterSale }: { lang: Lang; preselected?: InventoryItem | null; prefillSerial?: string; prefillCustomer?: string; onClose: () => void; onRegisterSale: (serial: string, date: string) => void }) {
  const i = t[lang];
  const [step, setStep] = useState<SelloutStep>(preselected ? "sale-details" : "choose");
  const [mode, setMode] = useState<SelloutMode>("single");

  // Single flow state
  const [productTab, setProductTab] = useState<ProductSelectTab>("inventory");
  const [selectedProduct, setSelectedProduct] = useState<InventoryItem | null>(preselected ?? null);
  const [pncInput, setPncInput] = useState("");
  const [photoScanned, setPhotoScanned] = useState(false);
  const [saleDate, setSaleDate] = useState("2026-04-02");
  const [serialNumber, setSerialNumber] = useState(prefillSerial ?? "");
  const [saleCustomer, setSaleCustomer] = useState(prefillCustomer ?? "");

  // Bulk flow state
  const [bulkItems, setBulkItems] = useState<BulkItem[]>([
    { product: "", pnc: "", date: "2026-04-02", serial: "" },
  ]);

  function handleSelectFromInventory(item: InventoryItem) {
    setSelectedProduct(item);
    setStep("sale-details");
  }

  function handlePncContinue() {
    const match = inventoryData.find((p) => p.pnc === pncInput.trim());
    setSelectedProduct(match ?? { name: pncInput, pnc: pncInput, category: "—", stock: 0 });
    setStep("sale-details");
  }

  function handlePhotoScan() {
    setPhotoScanned(true);
    setTimeout(() => {
      setSelectedProduct(inventoryData[0]);
      setStep("sale-details");
    }, 2000);
  }

  function handleSubmitSingle() {
    if (selectedProduct) {
      onRegisterSale(serialNumber || `${selectedProduct.name.substring(0, 3).toUpperCase()}-${Date.now()}`, saleDate);
    }
    setStep("done");
  }

  function handleSubmitBulk() {
    bulkItems.forEach((item) => {
      if (item.product) onRegisterSale(item.serial || `BULK-${Date.now()}`, item.date);
    });
    setStep("done");
  }

  function addBulkRow() {
    setBulkItems([...bulkItems, { product: "", pnc: "", date: "2026-04-02", serial: "" }]);
  }

  function updateBulkItem(idx: number, field: keyof BulkItem, value: string) {
    setBulkItems(bulkItems.map((item, j) => j === idx ? { ...item, [field]: value } : item));
  }

  function removeBulkItem(idx: number) {
    if (bulkItems.length > 1) setBulkItems(bulkItems.filter((_, j) => j !== idx));
  }

  const stepNumber = step === "choose" ? 1 : step === "select-product" ? 1 : step === "sale-details" ? 2 : 3;
  const totalSteps = mode === "single" ? 3 : 2;

  return (
    <>
      <div className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed right-0 top-0 z-[9999] flex h-full w-full max-w-lg flex-col bg-white shadow-2xl sm:w-[520px]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#e5e5e5] px-6 py-4">
          <div className="flex items-center gap-3">
            {step !== "choose" && step !== "done" && (
              <div className="flex gap-1">
                {Array.from({ length: totalSteps }).map((_, idx) => (
                  <span key={idx} className={`h-2 w-2 rounded-full ${idx < stepNumber ? "bg-[#e65100]" : "bg-[#e0e0e0]"}`} />
                ))}
              </div>
            )}
            <span className="text-[12px] text-[#999]">
              {step !== "choose" && step !== "done" && `${i.soStep} ${stepNumber} / ${totalSteps}`}
            </span>
          </div>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-lg text-[#999] hover:bg-[#f5f5f5]">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 4l8 8M12 4l-8 8" /></svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {/* ── Step: Choose single/bulk ── */}
          {step === "choose" && (
            <div className="space-y-5">
              <div>
                <h3 className="text-[18px] font-bold text-[#111]">{i.soWhatReport}</h3>
                <p className="mt-1 text-[13px] text-[#888]">{i.soChooseMode}</p>
              </div>
              <button
                onClick={() => { setMode("single"); setStep("select-product"); }}
                className="flex w-full items-center gap-4 rounded-xl border border-[#d0d0d0] bg-white p-5 text-left transition-all hover:border-[#e65100]/40 hover:shadow-md"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#fff3e0]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e65100" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="3" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                </span>
                <div>
                  <span className="text-[15px] font-bold text-[#111]">{i.soSingleProduct}</span>
                  <span className="mt-0.5 block text-[13px] text-[#888]">{i.soSingleDesc}</span>
                </div>
              </button>
              <button
                onClick={() => { setMode("bulk"); setStep("sale-details"); }}
                className="flex w-full items-center gap-4 rounded-xl border border-[#d0d0d0] bg-white p-5 text-left transition-all hover:border-[#e65100]/40 hover:shadow-md"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#fff3e0]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e65100" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="3" />
                    <path d="M8 8h8M8 12h8M8 16h5" />
                  </svg>
                </span>
                <div>
                  <span className="text-[15px] font-bold text-[#111]">{i.soBulkReport}</span>
                  <span className="mt-0.5 block text-[13px] text-[#888]">{i.soBulkDesc}</span>
                </div>
              </button>
            </div>
          )}

          {/* ── Step: Select product (single) ── */}
          {step === "select-product" && mode === "single" && (
            <div className="space-y-5">
              <div>
                <h3 className="text-[18px] font-bold text-[#111]">{i.soWhichProduct}</h3>
                <p className="mt-1 text-[13px] text-[#888]">{i.soWhichProductDesc}</p>
              </div>

              {/* Product select tabs */}
              <div className="flex rounded-lg border border-[#e0e0e0] bg-[#f5f5f5] p-0.5">
                {([
                  { id: "inventory" as const, label: i.soTabInventory },
                  { id: "pnc" as const, label: i.soTabPnc },
                  { id: "photo" as const, label: "📷 " + i.soTabPhoto },
                ]).map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setProductTab(tab.id)}
                    className={`flex-1 rounded-md px-3 py-2 text-[12px] font-semibold transition-all ${
                      productTab === tab.id ? "bg-white text-[#111] shadow-sm" : "text-[#888] hover:text-[#555]"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Inventory selection */}
              {productTab === "inventory" && (
                <div className="space-y-2">
                  {inventoryData.map((item) => (
                    <button
                      key={item.pnc}
                      onClick={() => handleSelectFromInventory(item)}
                      className="flex w-full items-center justify-between rounded-xl border border-[#d0d0d0] bg-white px-5 py-3.5 text-left transition-all hover:border-[#e65100]/40 hover:shadow-sm"
                    >
                      <div>
                        <span className="text-[14px] font-semibold text-[#111]">{item.name}</span>
                        <span className="mt-0.5 block text-[11px] text-[#888]">PNC {item.pnc}</span>
                      </div>
                      <span className="rounded-full bg-[#e8f5e9] px-2.5 py-0.5 text-[11px] font-bold text-[#2e7d32]">{item.stock} {i.soInStockBadge}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* PNC entry */}
              {productTab === "pnc" && (
                <div className="space-y-4">
                  <div>
                    <label className="text-[13px] font-bold text-[#111]">{i.soPncNumber}</label>
                    <input
                      type="text"
                      value={pncInput}
                      onChange={(e) => setPncInput(e.target.value)}
                      placeholder={i.soPncPlaceholder}
                      className="mt-1.5 h-10 w-full rounded-lg border border-[#d0d0d0] px-3 text-[13px] text-[#333] placeholder-[#aaa] focus:border-[#e65100] focus:outline-none"
                    />
                  </div>
                  <button
                    onClick={handlePncContinue}
                    disabled={!pncInput.trim()}
                    className={`w-full rounded-lg py-3 text-[13px] font-bold text-white transition-colors ${pncInput.trim() ? "bg-[#e65100] hover:bg-[#d84300]" : "bg-[#e0e0e0] cursor-not-allowed"}`}
                  >
                    {i.soContinue} →
                  </button>
                </div>
              )}

              {/* Photo scan */}
              {productTab === "photo" && (
                <div className="space-y-4">
                  <div className="flex h-40 flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#d0d0d0] bg-[#fafafa]">
                    {photoScanned ? (
                      <div className="text-center">
                        <span className="text-[32px]">✅</span>
                        <p className="mt-2 text-[13px] font-semibold text-[#2e7d32]">{i.productIdentified}</p>
                      </div>
                    ) : (
                      <>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="5" width="18" height="14" rx="2" />
                          <circle cx="12" cy="12" r="3.5" />
                          <path d="M8 5V3h8v2" />
                        </svg>
                        <p className="mt-2 text-[13px] text-[#888]">{i.soPhotoDesc}</p>
                      </>
                    )}
                  </div>
                  {!photoScanned && (
                    <button
                      onClick={handlePhotoScan}
                      className="w-full rounded-lg bg-[#e65100] py-3 text-[13px] font-bold text-white transition-colors hover:bg-[#d84300]"
                    >
                      {i.soSimulateScan}
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ── Step: Sale details (single) ── */}
          {step === "sale-details" && mode === "single" && selectedProduct && (
            <div className="space-y-5">
              {/* Selected product card */}
              <div className="rounded-xl border border-[#d0d0d0] bg-[#fafafa] px-5 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[14px] font-bold text-[#111]">{selectedProduct.name}</span>
                    <span className="mt-0.5 block text-[11px] text-[#888]">PNC {selectedProduct.pnc}</span>
                  </div>
                  <span className="rounded-full bg-[#fff3e0] px-2.5 py-0.5 text-[10px] font-bold text-[#e65100]">{selectedProduct.category}</span>
                </div>
              </div>

              <h3 className="text-[16px] font-bold text-[#111]">{i.soEnterSaleDetails}</h3>

              <div>
                <label className="text-[13px] font-bold text-[#111]">{i.soSaleDate}</label>
                <input
                  type="date"
                  value={saleDate}
                  onChange={(e) => setSaleDate(e.target.value)}
                  className="mt-1.5 h-10 w-full rounded-lg border border-[#d0d0d0] px-3 text-[13px] text-[#333] focus:border-[#e65100] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[13px] font-bold text-[#111]">
                  {i.soSerialNumber} <span className="font-normal text-[#999]">{i.soSerialRecommended}</span>
                </label>
                <p className="mt-0.5 text-[11px] text-[#888]">{i.soSerialHelper}</p>
                <input
                  type="text"
                  value={serialNumber}
                  onChange={(e) => setSerialNumber(e.target.value)}
                  placeholder={i.soSerialPlaceholder}
                  className="mt-1.5 h-10 w-full rounded-lg border border-[#d0d0d0] px-3 text-[13px] text-[#333] placeholder-[#aaa] focus:border-[#e65100] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[13px] font-bold text-[#111]">
                  {i.salesDateCustomer} <span className="font-normal text-[#999]">(optional)</span>
                </label>
                <select
                  value={saleCustomer}
                  onChange={(e) => setSaleCustomer(e.target.value)}
                  className="mt-1.5 h-10 w-full rounded-lg border border-[#d0d0d0] bg-white px-3 text-[13px] text-[#333] focus:border-[#e65100] focus:outline-none"
                >
                  <option value="">{i.selectCustomer}</option>
                  {getExistingCustomerNames(lang).map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <button
                onClick={() => setStep("review")}
                className="w-full rounded-lg bg-[#e65100] py-3 text-[13px] font-bold text-white transition-colors hover:bg-[#d84300]"
              >
                {i.soReviewSubmit} →
              </button>
            </div>
          )}

          {/* ── Step: Sale details (bulk) ── */}
          {step === "sale-details" && mode === "bulk" && (
            <div className="space-y-5">
              <div>
                <h3 className="text-[16px] font-bold text-[#111]">{i.soAddSoldProducts}</h3>
                <p className="mt-1 text-[13px] text-[#888]">{i.soAddSoldProductsDesc}</p>
              </div>

              {/* Input method tabs */}
              <div className="flex rounded-lg border border-[#e0e0e0] bg-[#f5f5f5] p-0.5">
                {([
                  { id: "manual", label: i.manualTab, icon: "M13.5 3.5l3 3L7 16l-4 1 1-4L13.5 3.5z" },
                  { id: "scan", label: i.scanTab, icon: "M3 3h4M17 3h-4M3 3v4M17 3v4M3 17h4M17 17h-4M3 17v-4M17 17v-4M7 7h6v6H7z" },
                  { id: "upload", label: i.uploadTab, icon: "M12 15V3M12 3l-4 4M12 3l4 4M4 17h16" },
                ] as { id: string; label: string; icon: string }[]).map((tab) => (
                  <button
                    key={tab.id}
                    className={`flex flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-2 text-[12px] font-semibold transition-all ${
                      tab.id === "manual" ? "bg-white text-[#111] shadow-sm" : "text-[#888]"
                    }`}
                  >
                    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d={tab.icon} />
                    </svg>
                    {tab.label}
                  </button>
                ))}
              </div>

              {bulkItems.map((item, idx) => (
                <div key={idx} className="rounded-xl border border-[#d0d0d0] bg-white p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-bold text-[#e65100]">{i.soProduct} {idx + 1}</span>
                    {bulkItems.length > 1 && (
                      <button onClick={() => removeBulkItem(idx)} className="text-[#ccc] hover:text-[#c44]">
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 4l8 8M12 4l-8 8" /></svg>
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-[#999]">{i.soProduct}</label>
                      <select
                        value={item.product}
                        onChange={(e) => {
                          const val = e.target.value;
                          const inv = inventoryData.find((p) => p.name === val);
                          setBulkItems((prev) => prev.map((it, j) => j === idx ? { ...it, product: val, pnc: inv?.pnc ?? "" } : it));
                        }}
                        className="mt-1 h-9 w-full rounded-lg border border-[#d0d0d0] bg-white px-2 text-[12px] text-[#333] focus:border-[#e65100] focus:outline-none"
                      >
                        <option value="">Select...</option>
                        {inventoryData.map((p) => <option key={p.pnc} value={p.name}>{p.name}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-[#999]">{i.soSaleDate}</label>
                      <input type="date" value={item.date} onChange={(e) => updateBulkItem(idx, "date", e.target.value)} className="mt-1 h-9 w-full rounded-lg border border-[#d0d0d0] px-2 text-[12px] text-[#333] focus:border-[#e65100] focus:outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-[#999]">{i.soSerialNumber} <span className="font-normal text-[#bbb]">(optional)</span></label>
                    <input type="text" value={item.serial} onChange={(e) => updateBulkItem(idx, "serial", e.target.value)} placeholder={i.soSerialPlaceholder} className="mt-1 h-9 w-full rounded-lg border border-[#d0d0d0] px-3 text-[12px] text-[#333] placeholder-[#aaa] focus:border-[#e65100] focus:outline-none" />
                  </div>
                </div>
              ))}

              <button onClick={addBulkRow} className="w-full rounded-lg border border-dashed border-[#d0d0d0] py-2.5 text-[12px] font-semibold text-[#888] transition-colors hover:border-[#999] hover:text-[#555]">
                {i.soAddAnotherProduct}
              </button>

              <button
                onClick={handleSubmitBulk}
                disabled={!bulkItems.some((item) => item.product)}
                className={`w-full rounded-lg py-3 text-[13px] font-bold text-white transition-colors ${bulkItems.some((item) => item.product) ? "bg-[#e65100] hover:bg-[#d84300]" : "bg-[#e0e0e0] cursor-not-allowed"}`}
              >
                {i.soSubmitBulk} ({bulkItems.filter((item) => item.product).length}) →
              </button>
            </div>
          )}

          {/* ── Step: Review (single) ── */}
          {step === "review" && mode === "single" && selectedProduct && (
            <div className="space-y-5">
              <h3 className="text-[18px] font-bold text-[#111]">{i.soReviewTitle}</h3>

              <div className="rounded-xl border border-[#d0d0d0] bg-white">
                <div className="divide-y divide-[#f0f0f0]">
                  {[
                    [i.soProduct, selectedProduct.name],
                    [i.soPnc, selectedProduct.pnc],
                    [i.soSaleDate, saleDate],
                    [i.soSerialNumberLabel, serialNumber || i.soNotProvided],
                    [i.salesDateCustomer, saleCustomer || i.soNotProvided],
                  ].map(([label, value]) => (
                    <div key={label} className="flex items-center justify-between px-5 py-3">
                      <span className="text-[12px] text-[#888]">{label}</span>
                      <span className="text-[13px] font-semibold text-[#111]">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* What this unlocks */}
              <div className="rounded-xl bg-[#fff8f0] px-5 py-4">
                <p className="text-[12px] font-bold text-[#e65100]">{i.soWhatUnlocks}</p>
                <div className="mt-2 space-y-1.5">
                  {[i.soUnlockWarranty, i.soUnlockAnalytics, i.soUnlockBonus, i.soUnlockServices].map((txt) => (
                    <div key={txt} className="flex items-center gap-2">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#2e7d32" strokeWidth="2" strokeLinecap="round"><path d="M4 8l3 3 5-5" /></svg>
                      <span className="text-[12px] text-[#555]">{txt}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={handleSubmitSingle}
                className="w-full rounded-lg bg-[#e65100] py-3 text-[13px] font-bold text-white transition-colors hover:bg-[#d84300]"
              >
                ✓ {i.soSubmitSellout}
              </button>
            </div>
          )}

          {/* ── Step: Done ── */}
          {step === "done" && (
            <div className="flex flex-col items-center pt-12">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#e8f5e9]">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2e7d32" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5" /></svg>
              </span>
              <h3 className="mt-4 text-[18px] font-bold text-[#111]">{i.soSelloutReported}</h3>
              <p className="mt-1 text-center text-[13px] text-[#888]">{i.soSelloutReportedDesc}</p>

              <div className="mt-5 w-full space-y-2">
                {[i.soUnlockWarranty, i.soUnlockAnalytics, i.soUnlockBonus, i.soUnlockServices].map((txt) => (
                  <div key={txt} className="flex items-center gap-3 rounded-lg bg-[#fafafa] px-4 py-3">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#2e7d32" strokeWidth="2" strokeLinecap="round"><path d="M4 8l3 3 5-5" /></svg>
                    <span className="text-[13px] text-[#333]">{txt}</span>
                  </div>
                ))}
              </div>

              {selectedProduct && (
                <div className="mt-5 w-full rounded-xl border border-[#e5e5e5] bg-[#fafafa] px-5 py-3">
                  <p className="text-[11px] text-[#999]">Reported product</p>
                  <p className="text-[13px] font-bold text-[#111]">{selectedProduct.name}</p>
                  <p className="text-[11px] text-[#888]">PNC {selectedProduct.pnc} · Sold {saleDate}</p>
                </div>
              )}

              <div className="mt-6 flex w-full gap-3">
                <button onClick={onClose} className="flex-1 rounded-lg border border-[#d0d0d0] py-2.5 text-[13px] font-semibold text-[#555]">
                  {i.soBackToOverview}
                </button>
                <button
                  onClick={() => { setStep("choose"); setSelectedProduct(null); setSerialNumber(""); setPhotoScanned(false); setPncInput(""); setBulkItems([{ product: "", pnc: "", date: "2026-04-02", serial: "" }]); }}
                  className="flex-1 rounded-lg bg-[#e65100] py-2.5 text-[13px] font-bold text-white"
                >
                  {i.soReportAnother} →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════
   ORDERS VIEW
   ═══════════════════════════════════════════════════════ */

const mockOrders = [
  { id: "SR-2026-0156", customer: "Swedish Motors AB", status: "pending" as const, source: "ServiceHub", date: "2026-03-12", total: 4230, items: 2 },
  { id: "SR-2026-0157", customer: "Automower Service Stockholm", status: "pending" as const, source: "ServiceHub", date: "2026-03-13", total: 4520, items: 3 },
  { id: "WEB-2026-0891", customer: "Grönyta Entreprenad AB", status: "pending" as const, source: "Webshop", date: "2026-03-14", total: 1290, items: 1 },
  { id: "ORD-2026-1042", customer: "Lindström Fastigheter", status: "processing" as const, source: "EDI", date: "2026-03-10", total: 24990, items: 2 },
  { id: "ORD-2026-1038", customer: "Skogsservice Norr AB", status: "shipped" as const, source: "Webshop", date: "2026-03-08", total: 8740, items: 4 },
  { id: "ORD-2026-1035", customer: "Karlsson Park & Trädgård", status: "shipped" as const, source: "EDI", date: "2026-03-06", total: 15200, items: 3 },
  { id: "ORD-2026-0998", customer: "Eriksson Trädgård AB", status: "delivered" as const, source: "Webshop", date: "2026-02-28", total: 6490, items: 2 },
  { id: "ORD-2026-0991", customer: "BRF Solsidan", status: "delivered" as const, source: "Telefon", date: "2026-02-25", total: 32400, items: 1 },
];

const orderStatusConfig: Record<string, { label: Record<Lang, string>; bg: string; text: string }> = {
  pending: { label: { en: "Pending", sv: "Väntande", de: "Ausstehend", fr: "En attente" }, bg: "bg-[#fff3e0]", text: "text-[#e65100]" },
  processing: { label: { en: "Processing", sv: "Behandlas", de: "In Bearbeitung", fr: "En cours" }, bg: "bg-[#e3f2fd]", text: "text-[#1565c0]" },
  shipped: { label: { en: "In transit", sv: "Under transport", de: "Im Transport", fr: "En transit" }, bg: "bg-[#e8eaf6]", text: "text-[#273A60]" },
  delivered: { label: { en: "Delivered", sv: "Levererad", de: "Geliefert", fr: "Livrée" }, bg: "bg-[#e8f5e9]", text: "text-[#2e7d32]" },
};

function OrdersView({ lang }: { lang: Lang }) {
  const i = t[lang];
  const [orderFilter, setOrderFilter] = useState("all");

  const filtered = orderFilter === "all" ? mockOrders : mockOrders.filter((o) => o.status === orderFilter);

  const statusCounts: Record<string, number> = {};
  mockOrders.forEach((o) => { statusCounts[o.status] = (statusCounts[o.status] ?? 0) + 1; });

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-[#111]">{i.ordersTitle}</h2>
          <p className="text-[12px] text-[#888]">{i.ordersDesc}</p>
        </div>
        <button className="rounded-lg border border-[#d0d0d0] bg-white px-3 py-2 text-[12px] font-semibold text-[#555] transition-colors hover:bg-[#f5f5f5]">+ {i.ordersTitle}</button>
      </div>

      {/* Status summary cards */}
      <div className="grid grid-cols-4 gap-3">
        {(["pending", "processing", "shipped", "delivered"] as const).map((s) => {
          const sc = orderStatusConfig[s];
          const count = statusCounts[s] ?? 0;
          const isActive = orderFilter === s;
          return (
            <button
              key={s}
              onClick={() => setOrderFilter(orderFilter === s ? "all" : s)}
              className={`rounded-xl border p-4 text-left transition-all ${
                isActive ? "border-[#273A60] shadow-sm" : "border-[#e5e5e5] hover:border-[#d0d0d0]"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${sc.bg.replace("bg-", "bg-")}`} style={{ backgroundColor: sc.text.match(/#[0-9a-f]+/i)?.[0] }} />
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#888]">{sc.label[lang]}</span>
              </div>
              <p className="mt-1 text-[22px] font-extrabold text-[#111]">{count}</p>
            </button>
          );
        })}
      </div>

      {/* Orders table */}
      <div className="overflow-auto max-h-[70vh] rounded-xl border border-[#d0d0d0] bg-white">
        <table className="w-full min-w-[700px] text-left">
          <thead className="sticky top-0 z-10">
            <tr className="border-b border-[#e5e5e5] bg-[#fafafa]">
              <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#999]">Order ID</th>
              <th className="px-3 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#999]">{i.colCustomer}</th>
              <th className="px-3 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#999]">Source</th>
              <th className="px-3 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#999]">{i.colStatus}</th>
              <th className="px-3 py-3 text-right text-[11px] font-semibold uppercase tracking-wider text-[#999]">Items</th>
              <th className="px-3 py-3 text-right text-[11px] font-semibold uppercase tracking-wider text-[#999]">Total (SEK)</th>
              <th className="px-3 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#999]">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f0f0f0]">
            {filtered.map((o) => {
              const sc = orderStatusConfig[o.status];
              return (
                <tr key={o.id} className="transition-colors hover:bg-[#fafafa]">
                  <td className="px-5 py-3 text-[13px] font-semibold text-[#273A60]">{o.id}</td>
                  <td className="px-3 py-3 text-[12px] text-[#555]">{localizedCustomerName(o.customer, lang)}</td>
                  <td className="px-3 py-3"><span className="rounded-full bg-[#f0f3f8] px-2 py-0.5 text-[10px] font-semibold text-[#273A60]">{o.source}</span></td>
                  <td className="px-3 py-3"><span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${sc.bg} ${sc.text}`}>{sc.label[lang]}</span></td>
                  <td className="px-3 py-3 text-right text-[13px] font-medium text-[#333]">{o.items}</td>
                  <td className="px-3 py-3 text-right text-[13px] font-semibold text-[#111]">{o.total.toLocaleString("sv-SE")}</td>
                  <td className="px-3 py-3 text-[12px] text-[#888]">{o.date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   INVOICES VIEW
   ═══════════════════════════════════════════════════════ */

const mockInvoices = [
  { id: "90366751", date: "2026-02-17", due: "2026-03-20", total: 42890, status: "open" as const, type: "Invoice", customer: "Landskapet Trädgård AB", orderNr: "2638633" },
  { id: "90366296", date: "2026-02-10", due: "2026-03-13", total: 18450, status: "open" as const, type: "Invoice", customer: "Swedish Motors AB", orderNr: "2637101" },
  { id: "12006575", date: "2026-01-07", due: "2026-02-06", total: 9500, status: "paid" as const, type: "Invoice", customer: "Grönyta Entreprenad AB", orderNr: "2627861" },
  { id: "90362893", date: "2026-01-05", due: "2026-01-08", total: -9500, status: "credited" as const, type: "Credit note", customer: "Grönyta Entreprenad AB", orderNr: "2627425" },
  { id: "12005923", date: "2025-12-30", due: "2026-01-29", total: 1444, status: "paid" as const, type: "Partial", customer: "JL Maskin & Trädgård", orderNr: "2626782" },
  { id: "12005326", date: "2025-12-22", due: "2026-01-21", total: 4249, status: "paid" as const, type: "Invoice", customer: "Stenungsunds kommun", orderNr: "2626030" },
  { id: "12005325", date: "2025-12-22", due: "2026-01-21", total: 4249, status: "paid" as const, type: "Invoice", customer: "Automower Service Stockholm", orderNr: "2626029" },
  { id: "12005324", date: "2025-12-22", due: "2026-01-21", total: 4249, status: "paid" as const, type: "Invoice", customer: "Automower Service Stockholm", orderNr: "2625983" },
  { id: "90361100", date: "2025-12-15", due: "2026-01-14", total: 67200, status: "overdue" as const, type: "Invoice", customer: "Landskapet Trädgård AB", orderNr: "2624550" },
  { id: "12004998", date: "2025-12-10", due: "2026-01-09", total: 2890, status: "paid" as const, type: "Invoice", customer: "JL Maskin & Trädgård", orderNr: "2624100" },
  { id: "12004887", date: "2025-12-01", due: "2025-12-31", total: 15600, status: "paid" as const, type: "Invoice", customer: "Swedish Motors AB", orderNr: "2623800" },
];

const invStatusConfig: Record<string, { label: Record<Lang, string>; bg: string; text: string }> = {
  open: { label: { en: "Open", sv: "Öppen", de: "Offen", fr: "Ouverte" }, bg: "bg-[#e3f2fd]", text: "text-[#1565c0]" },
  paid: { label: { en: "Paid", sv: "Betald", de: "Bezahlt", fr: "Payée" }, bg: "bg-[#e8f5e9]", text: "text-[#2e7d32]" },
  overdue: { label: { en: "Overdue", sv: "Förfallen", de: "Überfällig", fr: "En retard" }, bg: "bg-[#fce8e8]", text: "text-[#c62828]" },
  credited: { label: { en: "Credited", sv: "Krediterad", de: "Gutgeschrieben", fr: "Créditée" }, bg: "bg-[#f5f5f5]", text: "text-[#888]" },
};

function InvoicesView({ lang }: { lang: Lang }) {
  const i = t[lang];
  const [invFilter, setInvFilter] = useState("all");
  const [selectedInvs, setSelectedInvs] = useState<Set<string>>(new Set());

  const filtered = invFilter === "all" ? mockInvoices : mockInvoices.filter((inv) => inv.status === invFilter);

  const openTotal = mockInvoices.filter((inv) => inv.status === "open").reduce((s, inv) => s + inv.total, 0);
  const overdueTotal = mockInvoices.filter((inv) => inv.status === "overdue").reduce((s, inv) => s + inv.total, 0);
  const fmtSEK = (n: number) => n.toLocaleString("sv-SE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-[#111]">{i.invoicesTitle}</h2>
          <p className="text-[12px] text-[#888]">{i.invoicesDesc}</p>
        </div>
        {selectedInvs.size > 0 && (
          <button className="rounded-lg bg-[#273A60] px-4 py-2 text-[12px] font-semibold text-white">{i.invExport} ({selectedInvs.size})</button>
        )}
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={() => setInvFilter(invFilter === "open" ? "all" : "open")}
          className={`rounded-xl border p-4 text-left transition-all ${invFilter === "open" ? "border-[#1565c0] shadow-sm" : "border-[#e5e5e5]"}`}
        >
          <span className="text-[11px] font-semibold text-[#888]">{i.invOpen} ({mockInvoices.filter((inv) => inv.status === "open").length})</span>
          <p className="mt-1 text-[20px] font-bold text-[#1565c0]">{fmtSEK(openTotal)} kr</p>
        </button>
        <button
          onClick={() => setInvFilter(invFilter === "overdue" ? "all" : "overdue")}
          className={`rounded-xl border p-4 text-left transition-all ${invFilter === "overdue" ? "border-[#c62828] shadow-sm" : "border-[#e5e5e5]"}`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-[#888]">{i.invOverdue} ({mockInvoices.filter((inv) => inv.status === "overdue").length})</span>
            {overdueTotal > 0 && <span className="h-2 w-2 animate-pulse rounded-full bg-[#c62828]" />}
          </div>
          <p className="mt-1 text-[20px] font-bold text-[#c62828]">{fmtSEK(overdueTotal)} kr</p>
        </button>
        <div className="rounded-xl border border-[#e5e5e5] p-4">
          <span className="text-[11px] font-semibold text-[#888]">{i.invPaid}</span>
          <p className="mt-1 text-[20px] font-bold text-[#2e7d32]">{fmtSEK(mockInvoices.filter((inv) => inv.status === "paid").reduce((s, inv) => s + inv.total, 0))} kr</p>
        </div>
      </div>

      {/* Status pills */}
      <div className="flex gap-1.5">
        {(["all", "open", "paid", "overdue", "credited"] as const).map((s) => {
          const label = s === "all" ? i.invAll : invStatusConfig[s].label[lang];
          return (
            <button
              key={s}
              onClick={() => setInvFilter(s)}
              className={`rounded-full px-3 py-1.5 text-[12px] font-medium transition-all ${
                invFilter === s ? "bg-[#273A60] text-white" : "bg-[#f5f5f5] text-[#666] hover:bg-[#e8e8e8]"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Invoice table */}
      <div className="overflow-auto max-h-[70vh] rounded-xl border border-[#d0d0d0] bg-white">
        <table className="w-full min-w-[750px] text-left">
          <thead className="sticky top-0 z-10">
            <tr className="border-b border-[#e5e5e5] bg-[#fafafa]">
              <th className="w-8 px-4 py-3">
                <input
                  type="checkbox"
                  checked={selectedInvs.size === filtered.length && filtered.length > 0}
                  onChange={() => setSelectedInvs(selectedInvs.size === filtered.length ? new Set() : new Set(filtered.map((inv) => inv.id)))}
                  className="rounded border-[#ccc]"
                />
              </th>
              <th className="px-3 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#999]">Invoice #</th>
              <th className="px-3 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#999]">{i.colCustomer}</th>
              <th className="px-3 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#999]">Type</th>
              <th className="px-3 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#999]">Issued</th>
              <th className="px-3 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#999]">Due</th>
              <th className="px-3 py-3 text-right text-[11px] font-semibold uppercase tracking-wider text-[#999]">Amount</th>
              <th className="px-3 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#999]">{i.colStatus}</th>
              <th className="px-3 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#999]">Order</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f0f0f0]">
            {filtered.map((inv) => {
              const sc = invStatusConfig[inv.status];
              const isOverdue = inv.status === "overdue";
              return (
                <tr key={inv.id} className={`transition-colors hover:bg-[#fafafa] ${isOverdue ? "bg-[#fce8e8]/20" : ""}`}>
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedInvs.has(inv.id)}
                      onChange={() => {
                        const next = new Set(selectedInvs);
                        if (next.has(inv.id)) next.delete(inv.id); else next.add(inv.id);
                        setSelectedInvs(next);
                      }}
                      className="rounded border-[#ccc]"
                    />
                  </td>
                  <td className="px-3 py-3 text-[13px] font-semibold text-[#111]">{inv.id}</td>
                  <td className="px-3 py-3 text-[12px] text-[#555]">{inv.customer}</td>
                  <td className="px-3 py-3 text-[12px] text-[#555]">{inv.type}</td>
                  <td className="px-3 py-3 text-[12px] text-[#666]">{inv.date}</td>
                  <td className="px-3 py-3">
                    <span className={`text-[12px] ${isOverdue ? "font-semibold text-[#c62828]" : "text-[#666]"}`}>{inv.due}</span>
                  </td>
                  <td className="px-3 py-3 text-right">
                    <span className={`text-[13px] font-semibold ${inv.total < 0 ? "text-[#c62828]" : "text-[#111]"}`}>{fmtSEK(inv.total)} kr</span>
                  </td>
                  <td className="px-3 py-3">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-bold ${sc.bg} ${sc.text}`}>
                      {isOverdue && <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#c62828]" />}
                      {sc.label[lang]}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-[12px] font-medium text-[#273A60]">{inv.orderNr}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   QUESTIONNAIRE DRAWER — discussion guide
   ═══════════════════════════════════════════════════════ */

function DiscussionQuestion({ num, question, options, tag }: { num: string; question: string; options: string[]; tag?: string }) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <p className="text-[14px] font-bold text-[#111]">{num}. {question}</p>
        {tag && <span className={`shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${tag === "Sell-out" ? "bg-[#fff3e0] text-[#e65100]" : /^(Products|Produkte|Produits)$/.test(tag) ? "bg-[#e3f2fd] text-[#1565c0]" : /^(Customer|Kunden|Aperçu)/.test(tag) ? "bg-[#e8f5e9] text-[#2e7d32]" : "bg-[#f5f5f5] text-[#888]"}`}>{tag}</span>}
      </div>
      <div className="mt-2 space-y-1">
        {options.map((opt, i) => (
          <div key={i} className="flex items-start gap-2.5 rounded-lg bg-[#fafafa] px-4 py-2.5">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#d0d0d0] text-[10px] font-bold text-[#999]">{String.fromCharCode(65 + i)}</span>
            <span className="text-[13px] text-[#555]">{opt}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function OpenQuestion({ num, question, hint, tag }: { num: string; question: string; hint: string; tag?: string }) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <p className="text-[14px] font-bold text-[#111]">{num}. {question}</p>
        {tag && <span className={`shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${tag === "Sell-out" ? "bg-[#fff3e0] text-[#e65100]" : /^(Products|Produkte|Produits)$/.test(tag) ? "bg-[#e3f2fd] text-[#1565c0]" : /^(Customer|Kunden|Aperçu)/.test(tag) ? "bg-[#e8f5e9] text-[#2e7d32]" : "bg-[#f5f5f5] text-[#888]"}`}>{tag}</span>}
      </div>
      <div className="mt-2 rounded-lg border border-dashed border-[#d0d0d0] bg-[#fafafa] px-4 py-3">
        <p className="text-[12px] italic text-[#aaa]">{hint}</p>
      </div>
    </div>
  );
}

function QuestionnaireDrawer({ lang, onClose }: { lang: Lang; onClose: () => void }) {
  const i = t[lang];

  return (
    <>
      <div className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed right-0 top-0 z-[9999] flex h-full w-full max-w-lg flex-col bg-white shadow-2xl sm:w-[520px]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#e5e5e5] px-6 py-4">
          <h2 className="text-[16px] font-bold text-[#111]">{i.questionnaire}</h2>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-lg text-[#999] hover:bg-[#f5f5f5]">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 4l8 8M12 4l-8 8" /></svg>
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-7">
          {/* Intro */}
          <div className="rounded-xl bg-[#f0f3f8] px-5 py-4">
            <p className="text-[13px] leading-relaxed text-[#555]">{i.qIntro}</p>
            <p className="mt-3 text-[12px] font-semibold text-[#273A60]">{i.qInstructions}</p>
          </div>

          <DiscussionQuestion num="1" question={i.q1} options={[i.q1o1, i.q1o2, i.q1o3, i.q1o4]} tag={i.tagProducts} />
          <DiscussionQuestion num="2" question={i.q2} options={[i.q2o1, i.q2o2, i.q2o3, i.q2o4]} tag={i.tagProducts} />
          <DiscussionQuestion num="3" question={i.q4} options={[i.q4o1, i.q4o2, i.q4o3, i.q4o4]} tag={i.tagProducts} />
          <DiscussionQuestion num="4" question={i.qScan} options={[i.qScano1, i.qScano2, i.qScano3, i.qScano4, i.qScano5]} tag={i.tagProducts} />
          <DiscussionQuestion num="5" question={i.q3} options={[i.q3o1, i.q3o2, i.q3o3, i.q3o4]} tag={i.tagProducts} />
          <DiscussionQuestion num="6" question={i.q6} options={[i.q6o1, i.q6o2, i.q6o3, i.q6o4]} tag={i.tagSellout} />
          <DiscussionQuestion num="7" question={i.q7} options={[i.q7o1, i.q7o2, i.q7o3, i.q7o4]} tag={i.tagSellout} />
          <DiscussionQuestion num="8" question={i.q8} options={[i.q8o1, i.q8o2, i.q8o3, i.q8o4, i.q8o5]} tag={i.tagSellout} />
          <DiscussionQuestion num="9" question={i.qCust} options={[i.qCusto1, i.qCusto2, i.qCusto3, i.qCusto4]} tag={i.tagCustomers} />
          <OpenQuestion num="10" question={i.q11} hint={i.q11placeholder} tag={i.tagGeneral} />
          <OpenQuestion num="11" question={i.q12} hint={i.q12placeholder} tag={i.tagGeneral} />
        </div>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════ */

export default function UserTest2026Page() {
  const [lang, setLang] = useState<Lang>("en");
  const [activeTab, setActiveTab] = useState<Tab>("products");
  const [productFilter, setProductFilter] = useState("all");
  const [productData, setProductData] = useState(products);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showSalesDatePicker, setShowSalesDatePicker] = useState(false);
  const [salesDateProduct, setSalesDateProduct] = useState<typeof products[0] | null>(null);
  const [reportSelloutFromPill, setReportSelloutFromPill] = useState<InventoryItem | null>(null);
  const [reportSelloutPrefill, setReportSelloutPrefill] = useState<{ serial?: string; customer?: string }>({});
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [expandedCustomer, setExpandedCustomer] = useState<string | null>(null);

  const i = t[lang];

  function handleAddProduct(p: typeof products[0]) {
    setProductData((prev) => [p, ...prev]);
    setShowAddProduct(false);
  }

  function handleSalesDateRegistered(serial: string, date: string, customer: string) {
    setProductData((prev) => prev.map((p) => p.serial === serial ? { ...p, soldDate: date, customer: customer || p.customer } : p));
    setSalesDateProduct(null);
  }

  const missingCount = productData.filter((p) => p.soldDate === "missing").length;

  const tabConfig: { id: Tab; label: string; badge?: number; highlight?: boolean }[] = [
    { id: "products", label: i.tabProducts, badge: 87 },
    { id: "sellout", label: i.tabSellout, badge: 14, highlight: true },
    { id: "orders", label: i.tabOrders, badge: 8 },
    { id: "invoices", label: i.tabInvoices, badge: 11 },
    { id: "customers", label: i.tabCustomers, badge: 142 },
    { id: "contracts", label: i.tabContracts, badge: 23 },
    { id: "today", label: i.tabToday, badge: 14 },
  ];

  const filterConfig = [
    { key: "all", label: i.filterAll, count: 87 },
    { key: "hypercare", label: i.filterHyperCare, count: 8 },
    { key: "service-plus", label: i.filterServicePlus, count: 23 },
    { key: "lease-plus", label: i.filterLeasePlus, count: 11 },
    { key: "missing", label: i.filterMissingData, count: 5 },
    { key: "renewal", label: i.filterNeedsRenewal, count: 3 },
  ];

  const productCols = [i.colModel, i.colSerialPnc, i.colCustomer, i.colSoldDate, i.colInstallation, i.colWarranty, i.colServiceContract, i.colLeasing, i.colHyperCare, i.colLastUpdated];

  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto max-w-[1320px] px-6 py-6">
        {/* Page header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#111]">{i.title}</h1>
            <p className="mt-1 text-[13px] text-[#888]">{i.subtitle}</p>
          </div>
          {/* Language switcher */}
          <div className="flex items-center gap-1 rounded-lg border border-[#e5e5e5] bg-[#fafafa] p-1">
            {langs.map((l) => (
              <button
                key={l.id}
                onClick={() => setLang(l.id)}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[12px] font-semibold transition-all ${
                  lang === l.id ? "bg-white text-[#111] shadow-sm" : "text-[#888] hover:text-[#555]"
                }`}
              >
                <span className="text-[16px]">{l.flag}</span>
                {l.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab bar */}
        <div className="relative mt-6 border-b border-[#d0d0d0]">
          <nav className="-mb-px flex gap-0 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
            {tabConfig.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`relative shrink-0 border-b-2 px-5 py-3 text-[13px] font-semibold transition-colors ${activeTab === tab.id ? "border-[#273A60] text-[#273A60]" : "border-transparent text-[#888] hover:text-[#555]"}`}>
                <span className="flex items-center gap-1.5">
                  {tab.label}
                  {tab.badge !== undefined && (
                    <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold leading-none ${
                      activeTab === tab.id ? "bg-[#273A60] text-white" :
                      tab.highlight ? "bg-[#e65100] text-white" :
                      "bg-[#e5e5e5] text-[#888]"
                    }`}>{tab.badge}</span>
                  )}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab content */}
        <div className="mt-6">
          {activeTab === "products" && (
            <div className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-base font-semibold text-[#111]">{i.allProducts}</h2>
                  <p className="text-[12px] text-[#888]">{i.allProductsDesc}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setShowAddProduct(true)} className="rounded-lg border border-[#d0d0d0] bg-white px-3 py-2 text-[12px] font-semibold text-[#555] transition-colors hover:bg-[#f5f5f5]">{i.addProduct}</button>
                  <button onClick={() => setShowSalesDatePicker(true)} className="rounded-lg border border-[#d0d0d0] bg-white px-3 py-2 text-[12px] font-semibold text-[#555] transition-colors hover:bg-[#f5f5f5]">{i.addSalesDate}</button>
                  <button className="rounded-lg border border-[#d0d0d0] bg-white px-3 py-2 text-[12px] font-semibold text-[#555] transition-colors hover:bg-[#f5f5f5]">{i.export}</button>
                </div>
              </div>

              {missingCount > 0 && (
                <div className="flex items-center gap-3 rounded-xl border-l-4 border-l-[#e65100] bg-[#fff8f0] px-5 py-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e65100] text-[12px] font-bold text-white">{missingCount}</span>
                  <div>
                    <p className="text-[13px] font-semibold text-[#111]">{i.missingSoldDate}</p>
                    <p className="text-[12px] text-[#888]">{i.missingSoldDateDesc}</p>
                  </div>
                </div>
              )}


              <div className="overflow-auto max-h-[70vh] rounded-xl border border-[#d0d0d0] bg-white">
                <table className="w-full text-left">
                  <thead className="sticky top-0 z-10">
                    <tr className="border-b border-[#e5e5e5] bg-[#fafafa]">
                      <th className="w-8 px-4 py-3"><input type="checkbox" className="rounded border-[#ccc]" /></th>
                      {productCols.map((col) => (
                        <th key={col} className="px-3 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#999]">{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f0f0f0]">
                    {productData.map((p, idx) => (
                      <tr key={`${p.pnc}-${p.serial}-${idx}`} className="transition-colors hover:bg-[#fafafa]">
                        <td className="px-4 py-3"><input type="checkbox" className="rounded border-[#ccc]" /></td>
                        <td className="px-3 py-3"><span className="text-[13px] font-semibold text-[#273A60]">{p.model}</span></td>
                        <td className="px-3 py-3"><span className="block text-[12px] font-medium text-[#333]">{p.serial}</span><span className="text-[10px] text-[#aaa]">{p.pnc}</span></td>
                        <td className="px-3 py-3 text-[12px] text-[#555]">{localizedCustomerName(p.customer, lang)}</td>
                        <td className="px-3 py-3">
                          {p.soldDate === "missing" ? (
                            <button onClick={() => {
                              const inv = inventoryData.find((inv) => p.model.includes(inv.name)) ?? { name: p.model, pnc: p.pnc, category: "—", stock: 0 };
                              setReportSelloutPrefill({
                                serial: p.serial !== "—" ? p.serial : undefined,
                                customer: p.customer !== "—" ? localizedCustomerName(p.customer, lang) : undefined,
                              });
                              setReportSelloutFromPill(inv);
                            }} className="inline-flex items-center gap-1 rounded-full bg-[#fce8e8] px-2 py-0.5 text-[10px] font-semibold text-[#c44] transition-colors hover:bg-[#c44] hover:text-white">
                              {i.missing}
                              <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 3v6M3 6h6" /></svg>
                            </button>
                          ) : <span className="text-[12px] text-[#555]">{p.soldDate}</span>}
                        </td>
                        <td className="px-3 py-3">
                          <SetupCell installed={p.installed} firstUse={p.firstUse} lang={lang} />
                        </td>
                        <td className="px-3 py-3"><StatusBadge status={p.warranty} lang={lang} /></td>
                        <td className="px-3 py-3"><StatusBadge status={p.serviceContract} lang={lang} /></td>
                        <td className="px-3 py-3"><StatusBadge status={p.leasing} lang={lang} /></td>
                        <td className="px-3 py-3"><StatusBadge status={p.hypercare} lang={lang} /></td>
                        <td className="px-3 py-3 text-[12px] text-[#888]">{p.lastUpdated ?? "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "customers" && (
            <div className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-base font-semibold text-[#111]">{i.customerOverview}</h2>
                  <p className="text-[12px] text-[#888]">{i.customerOverviewDesc}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setShowAddCustomer(true)} className="rounded-lg border border-[#d0d0d0] bg-white px-3 py-2 text-[12px] font-semibold text-[#555] transition-colors hover:bg-[#f5f5f5]">{i.addCustomer}</button>
                  <button className="rounded-lg border border-[#d0d0d0] bg-white px-3 py-2 text-[12px] font-semibold text-[#555] transition-colors hover:bg-[#f5f5f5]">{i.addContract}</button>
                </div>
              </div>
              <div className="overflow-auto max-h-[70vh] rounded-xl border border-[#d0d0d0] bg-white">
                <table className="w-full min-w-[700px] text-left">
                  <thead className="sticky top-0 z-10">
                    <tr className="border-b border-[#e5e5e5] bg-[#fafafa]">
                      <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#999]">{i.colCustomer}</th>
                      <th className="px-3 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#999]">{i.colContact}</th>
                      <th className="px-3 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#999] text-center">{i.colProducts}</th>
                      <th className="px-3 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#999] text-center">{i.colContracts}</th>
                      <th className="px-3 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#999]">{i.colProgram}</th>
                      <th className="px-3 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#999]">{i.colStatus}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f0f0f0]">
                    {getLocalizedCustomers(lang).map((c) => (
                      <tr key={c.name} className="cursor-pointer transition-colors hover:bg-[#fafafa]">
                        <td className="px-5 py-3"><span className="text-[13px] font-semibold text-[#273A60]">{c.name}</span></td>
                        <td className="px-3 py-3 text-[12px] text-[#555]">{c.contact}</td>
                        <td className="px-3 py-3 text-center text-[13px] font-bold text-[#111]">{c.products}</td>
                        <td className="px-3 py-3 text-center text-[13px] font-bold text-[#111]">{c.contracts}</td>
                        <td className="px-3 py-3">
                          {c.program !== "—" ? <span className="rounded-full bg-[#f0f3f8] px-2 py-0.5 text-[10px] font-semibold text-[#273A60]">{c.program}</span> : <span className="text-[12px] text-[#ccc]">—</span>}
                        </td>
                        <td className="px-3 py-3"><StatusBadge status={c.status} lang={lang} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "sellout" && <SelloutView lang={lang} products={productData} onRegisterSale={(serial, date) => handleSalesDateRegistered(serial, date, "")} />}

          {activeTab === "orders" && <OrdersView lang={lang} />}

          {activeTab === "invoices" && <InvoicesView lang={lang} />}

          {activeTab === "contracts" && <div className="py-12 text-center"><p className="text-[14px] text-[#999]">{i.contractsPlaceholder}</p></div>}
          {activeTab === "today" && <div className="py-12 text-center"><p className="text-[14px] text-[#999]">{i.todayPlaceholder}</p></div>}
        </div>
      </main>

      {/* Floating questionnaire button */}
      <button
        onClick={() => setShowQuestionnaire(true)}
        className="fixed bottom-6 right-6 z-[9990] flex items-center gap-2 rounded-full bg-[#273A60] px-5 py-3 text-[13px] font-bold text-white shadow-lg shadow-[#273A60]/25 transition-all hover:scale-105 hover:shadow-xl active:scale-[0.98]"
      >
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 5H5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-4" />
          <path d="M16 3l-8 8" />
          <path d="M12 3h4v4" />
        </svg>
        {i.questionnaire}
      </button>

      {showAddProduct && <AddProductPanel onClose={() => setShowAddProduct(false)} onAdd={handleAddProduct} lang={lang} />}
      {showSalesDatePicker && !salesDateProduct && (
        <SalesDatePickerPanel
          products={productData}
          lang={lang}
          onClose={() => setShowSalesDatePicker(false)}
          onSelectProduct={(p) => { setShowSalesDatePicker(false); setSalesDateProduct(p); }}
        />
      )}
      {salesDateProduct && (
        <SalesDatePanel
          product={salesDateProduct}
          lang={lang}
          onClose={() => setSalesDateProduct(null)}
          onRegister={handleSalesDateRegistered}
        />
      )}
      {showAddCustomer && <AddCustomerPanel lang={lang} onClose={() => setShowAddCustomer(false)} />}
      {reportSelloutFromPill && (
        <ReportSelloutDrawer
          lang={lang}
          preselected={reportSelloutFromPill}
          prefillSerial={reportSelloutPrefill.serial}
          prefillCustomer={reportSelloutPrefill.customer}
          onClose={() => { setReportSelloutFromPill(null); setReportSelloutPrefill({}); }}
          onRegisterSale={(serial, date) => {
            handleSalesDateRegistered(serial, date, "");
            setReportSelloutFromPill(null);
            setReportSelloutPrefill({});
          }}
        />
      )}
      {showQuestionnaire && <QuestionnaireDrawer lang={lang} onClose={() => setShowQuestionnaire(false)} />}
    </div>
  );
}
