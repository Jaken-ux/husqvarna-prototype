"use client";

import { useState, Fragment } from "react";

/* ═══════════════════════════════════════════════════════
   i18n
   ═══════════════════════════════════════════════════════ */

type Lang = "en" | "de" | "fr";

const langs: { id: Lang; label: string; flag: string }[] = [
  { id: "en", label: "English", flag: "🇬🇧" },
  { id: "de", label: "Deutsch", flag: "🇩🇪" },
  { id: "fr", label: "Français", flag: "🇫🇷" },
];

const t: Record<Lang, Record<string, string>> = {
  en: {
    title: "Dealer Workspace",
    subtitle: "Unified workspace — products, customers, contracts and daily tasks",
    lastUpdated: "Last updated: today 09:15",
    tabProducts: "Products",
    tabCustomers: "Customers",
    tabContracts: "Contracts & programs",
    tabToday: "Today",
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
    colInstallation: "Installation",
    colWarranty: "Warranty",
    colServiceContract: "Service contract",
    colLeasing: "Leasing",
    colHyperCare: "HyperCare",
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
    colProgram: "Program",
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
    q6: "Would you prefer to add products one by one or in bulk?",
    q6o1: "One by one — as they arrive or are sold",
    q6o2: "In bulk — periodic batch uploads",
    q6o3: "Both — depending on the situation",
    q7: "What information in this view is most valuable to you?",
    q7placeholder: "Please describe which columns or data points you find most useful, and if anything is missing...",
    q8: "Any other feedback or thoughts?",
    q8placeholder: "Share any observations, concerns or ideas...",
    qSubmit: "Submit answers",
    qSubmitted: "Thank you! Your answers have been recorded.",
  },
  de: {
    title: "Händler-Arbeitsbereich",
    subtitle: "Einheitlicher Arbeitsbereich — Produkte, Kunden, Verträge und tägliche Aufgaben",
    lastUpdated: "Zuletzt aktualisiert: heute 09:15",
    tabProducts: "Produkte",
    tabCustomers: "Kunden",
    tabContracts: "Verträge & Programme",
    tabToday: "Heute",
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
    colInstallation: "Installation",
    colWarranty: "Garantie",
    colServiceContract: "Servicevertrag",
    colLeasing: "Leasing",
    colHyperCare: "HyperCare",
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
    colProgram: "Programm",
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
    q6: "Würden Sie Produkte lieber einzeln oder in großen Mengen hinzufügen?",
    q6o1: "Einzeln — wenn sie ankommen oder verkauft werden",
    q6o2: "In großen Mengen — periodische Batch-Uploads",
    q6o3: "Beides — je nach Situation",
    q7: "Welche Informationen in dieser Ansicht sind für Sie am wertvollsten?",
    q7placeholder: "Bitte beschreiben Sie, welche Spalten oder Datenpunkte für Sie am nützlichsten sind, und ob etwas fehlt...",
    q8: "Weiteres Feedback oder Gedanken?",
    q8placeholder: "Teilen Sie Beobachtungen, Bedenken oder Ideen...",
    qSubmit: "Antworten absenden",
    qSubmitted: "Vielen Dank! Ihre Antworten wurden erfasst.",
  },
  fr: {
    title: "Espace de travail concessionnaire",
    subtitle: "Espace de travail unifié — produits, clients, contrats et tâches quotidiennes",
    lastUpdated: "Dernière mise à jour : aujourd'hui 09:15",
    tabProducts: "Produits",
    tabCustomers: "Clients",
    tabContracts: "Contrats & programmes",
    tabToday: "Aujourd'hui",
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
    colInstallation: "Installation",
    colWarranty: "Garantie",
    colServiceContract: "Contrat de service",
    colLeasing: "Leasing",
    colHyperCare: "HyperCare",
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
    colProgram: "Programme",
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
    q6: "Préféreriez-vous ajouter des produits un par un ou en masse ?",
    q6o1: "Un par un — à leur arrivée ou vente",
    q6o2: "En masse — uploads périodiques par lots",
    q6o3: "Les deux — selon la situation",
    q7: "Quelles informations dans cette vue sont les plus précieuses pour vous ?",
    q7placeholder: "Veuillez décrire quelles colonnes ou données vous trouvez les plus utiles, et s'il manque quelque chose...",
    q8: "Autres commentaires ou réflexions ?",
    q8placeholder: "Partagez vos observations, préoccupations ou idées...",
    qSubmit: "Envoyer les réponses",
    qSubmitted: "Merci ! Vos réponses ont été enregistrées.",
  },
};

/* ═══════════════════════════════════════════════════════
   TYPES & SHARED
   ═══════════════════════════════════════════════════════ */

type Tab = "products" | "customers" | "contracts" | "today";

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

/* ═══════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════ */

const products = [
  { model: "Automower 435X AWD", serial: "2024-435X-00891", pnc: "967 85 32-01", customer: "Lindström Fastigheter", soldDate: "2024-11-15", installed: "pending", warranty: "pending", serviceContract: "missing", leasing: "—", hypercare: "—" },
  { model: "Automower 550X Mark II", serial: "2024-550X-01244", pnc: "967 85 45-02", customer: "Eriksson Trädgård AB", soldDate: "2024-10-20", installed: "completed", warranty: "pending", serviceContract: "active", leasing: "—", hypercare: "—" },
  { model: "CEORA 546 EPOS", serial: "2024-C546-00087", pnc: "967 93 12-01", customer: "AB Grönytor", soldDate: "missing", installed: "missing", warranty: "missing", serviceContract: "missing", leasing: "active", hypercare: "active" },
  { model: "Husqvarna 346XP", serial: "2024-346X-03211", pnc: "966 99 18-35", customer: "Skogsservice Norr AB", soldDate: "2024-09-05", installed: "completed", warranty: "active", serviceContract: "active", leasing: "—", hypercare: "active" },
  { model: "Automower 310 Mark II", serial: "2024-310M-02198", pnc: "967 85 21-03", customer: "Nilsson Villaservice", soldDate: "2024-12-01", installed: "completed", warranty: "active", serviceContract: "active", leasing: "—", hypercare: "—" },
  { model: "CEORA 526 EPOS", serial: "2024-C526-00045", pnc: "967 93 10-02", customer: "Karlsson Park & Trädgård", soldDate: "2024-08-14", installed: "completed", warranty: "active", serviceContract: "active", leasing: "active", hypercare: "active" },
  { model: "Automower 450X NERA", serial: "2024-450N-01567", pnc: "967 85 38-01", customer: "BRF Solsidan", soldDate: "2024-07-22", installed: "completed", warranty: "active", serviceContract: "expiring", leasing: "—", hypercare: "—" },
  { model: "Husqvarna 572XP", serial: "2024-572X-00432", pnc: "966 73 31-18", customer: "Skogsservice Norr AB", soldDate: "2024-06-10", installed: "completed", warranty: "active", serviceContract: "missing", leasing: "—", hypercare: "—" },
  { model: "Automower 405X NERA", serial: "2025-405N-00312", pnc: "967 85 40-01", customer: "Fastighets AB Solbacken", soldDate: "2025-01-15", installed: "completed", warranty: "active", serviceContract: "active", leasing: "—", hypercare: "—" },
  { model: "Husqvarna 562XP", serial: "2024-562X-01987", pnc: "966 57 03-18", customer: "Lundgren Maskin AB", soldDate: "2024-06-20", installed: "completed", warranty: "expiring", serviceContract: "missing", leasing: "—", hypercare: "—" },
  { model: "Automower 320 NERA", serial: "2025-320N-00156", pnc: "967 85 25-01", customer: "Malmö Grönska HB", soldDate: "2025-02-01", installed: "completed", warranty: "active", serviceContract: "active", leasing: "—", hypercare: "—" },
  { model: "Husqvarna 535RXT", serial: "2024-535R-04521", pnc: "967 86 12-03", customer: "Eriksson Trädgård AB", soldDate: "2024-11-08", installed: "completed", warranty: "active", serviceContract: "active", leasing: "—", hypercare: "—" },
  { model: "Automower 430X NERA", serial: "2024-430N-02876", pnc: "585 57 28-01", customer: "Lindström Fastigheter", soldDate: "2024-05-12", installed: "completed", warranty: "active", serviceContract: "active", leasing: "—", hypercare: "—" },
  { model: "Automower 310 Mark II", serial: "2025-310M-03401", pnc: "967 85 21-03", customer: "Villa Ekbacken", soldDate: "missing", installed: "missing", warranty: "missing", serviceContract: "missing", leasing: "—", hypercare: "—" },
  { model: "Husqvarna 562XP", serial: "2025-562X-02100", pnc: "966 57 03-18", customer: "Skog & Mark HB", soldDate: "missing", installed: "missing", warranty: "missing", serviceContract: "missing", leasing: "—", hypercare: "—" },
];

const existingCustomers = [
  "Lindström Fastigheter", "Eriksson Trädgård AB", "AB Grönytor", "Skogsservice Norr AB",
  "Nilsson Villaservice", "Karlsson Park & Trädgård", "BRF Solsidan", "Fastighets AB Solbacken",
  "Lundgren Maskin AB", "Malmö Grönska HB", "Villa Ekbacken", "Skog & Mark HB",
];

const customers = [
  { name: "Lindström Fastigheter", contact: "Anna Lindström", products: 4, contracts: 2, hypercare: 0, program: "Service Plus", status: "active" },
  { name: "Eriksson Trädgård AB", contact: "Per Eriksson", products: 3, contracts: 3, hypercare: 0, program: "Service Plus", status: "active" },
  { name: "AB Grönytor", contact: "Maria Svensson", products: 6, contracts: 4, hypercare: 2, program: "Lease Plus", status: "pending" },
  { name: "Skogsservice Norr AB", contact: "Johan Bergström", products: 8, contracts: 5, hypercare: 2, program: "Service Plus", status: "active" },
  { name: "Nilsson Villaservice", contact: "Erik Nilsson", products: 2, contracts: 1, hypercare: 0, program: "Service Plus", status: "active" },
  { name: "Karlsson Park & Trädgård", contact: "Lisa Karlsson", products: 5, contracts: 4, hypercare: 1, program: "Lease Plus", status: "active" },
  { name: "BRF Solsidan", contact: "Karin Holm", products: 3, contracts: 2, hypercare: 0, program: "Service Plus", status: "expiring" },
  { name: "Fastighets AB Solbacken", contact: "Anders Björk", products: 1, contracts: 0, hypercare: 0, program: "—", status: "pending" },
];

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
    setTimeout(() => { onAdd({ model, serial, pnc: pnc || "—", customer: customer || "—", soldDate: "missing", installed: "missing", warranty: "missing", serviceContract: "missing", leasing: "—", hypercare: "—" }); }, 1000);
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
                  {existingCustomers.map((c) => <option key={c} value={c}>{c}</option>)}
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
  const [date, setDate] = useState("");
  const [customer, setCustomer] = useState(product.customer);
  const [customerSearch, setCustomerSearch] = useState(product.customer);
  const [showList, setShowList] = useState(false);
  const [comment, setComment] = useState("");
  const [registered, setRegistered] = useState(false);

  const filtered = existingCustomers.filter((c) => c.toLowerCase().includes(customerSearch.toLowerCase()));

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
                  {filtered.map((c) => (
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
                  <span className="mt-0.5 block text-[11px] text-[#888]">{p.serial} · {p.customer}</span>
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
   QUESTIONNAIRE DRAWER — discussion guide
   ═══════════════════════════════════════════════════════ */

function DiscussionQuestion({ num, question, options }: { num: string; question: string; options: string[] }) {
  return (
    <div>
      <p className="text-[14px] font-bold text-[#111]">{num}. {question}</p>
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

function OpenQuestion({ num, question, hint }: { num: string; question: string; hint: string }) {
  return (
    <div>
      <p className="text-[14px] font-bold text-[#111]">{num}. {question}</p>
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

          <DiscussionQuestion num="1" question={i.q1} options={[i.q1o1, i.q1o2, i.q1o3, i.q1o4]} />
          <DiscussionQuestion num="2" question={i.q2} options={[i.q2o1, i.q2o2, i.q2o3, i.q2o4]} />
          <DiscussionQuestion num="3" question={i.q3} options={[i.q3o1, i.q3o2, i.q3o3, i.q3o4]} />
          <DiscussionQuestion num="4" question={i.q4} options={[i.q4o1, i.q4o2, i.q4o3, i.q4o4]} />
          <DiscussionQuestion num="5" question={i.q5} options={[i.q5o1, i.q5o2, i.q5o3, i.q5o4]} />
          <DiscussionQuestion num="6" question={i.q6} options={[i.q6o1, i.q6o2, i.q6o3]} />
          <OpenQuestion num="7" question={i.q7} hint={i.q7placeholder} />
          <OpenQuestion num="8" question={i.q8} hint={i.q8placeholder} />
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

  const tabConfig: { id: Tab; label: string; badge?: number }[] = [
    { id: "products", label: i.tabProducts, badge: 87 },
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

  const productCols = [i.colModel, i.colSerialPnc, i.colCustomer, i.colSoldDate, i.colInstallation, i.colWarranty, i.colServiceContract, i.colLeasing, i.colHyperCare];

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
                    <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold leading-none ${activeTab === tab.id ? "bg-[#273A60] text-white" : "bg-[#e5e5e5] text-[#888]"}`}>{tab.badge}</span>
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
                    {productData.map((p) => (
                      <tr key={p.serial} className="transition-colors hover:bg-[#fafafa]">
                        <td className="px-4 py-3"><input type="checkbox" className="rounded border-[#ccc]" /></td>
                        <td className="px-3 py-3"><span className="text-[13px] font-semibold text-[#273A60]">{p.model}</span></td>
                        <td className="px-3 py-3"><span className="block text-[12px] font-medium text-[#333]">{p.serial}</span><span className="text-[10px] text-[#aaa]">{p.pnc}</span></td>
                        <td className="px-3 py-3 text-[12px] text-[#555]">{p.customer}</td>
                        <td className="px-3 py-3">
                          {p.soldDate === "missing" ? (
                            <button onClick={() => setSalesDateProduct(p)} className="inline-flex items-center gap-1 rounded-full bg-[#fce8e8] px-2 py-0.5 text-[10px] font-semibold text-[#c44] transition-colors hover:bg-[#c44] hover:text-white">
                              {i.missing}
                              <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 3v6M3 6h6" /></svg>
                            </button>
                          ) : <span className="text-[12px] text-[#555]">{p.soldDate}</span>}
                        </td>
                        <td className="px-3 py-3"><StatusBadge status={p.installed} lang={lang} /></td>
                        <td className="px-3 py-3"><StatusBadge status={p.warranty} lang={lang} /></td>
                        <td className="px-3 py-3"><StatusBadge status={p.serviceContract} lang={lang} /></td>
                        <td className="px-3 py-3"><StatusBadge status={p.leasing} lang={lang} /></td>
                        <td className="px-3 py-3"><StatusBadge status={p.hypercare} lang={lang} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "customers" && (
            <div className="space-y-5">
              <div>
                <h2 className="text-base font-semibold text-[#111]">{i.customerOverview}</h2>
                <p className="text-[12px] text-[#888]">{i.customerOverviewDesc}</p>
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
                    {customers.map((c) => (
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
      {showQuestionnaire && <QuestionnaireDrawer lang={lang} onClose={() => setShowQuestionnaire(false)} />}
    </div>
  );
}
