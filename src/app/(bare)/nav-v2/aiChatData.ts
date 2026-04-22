export type ChatMessage = {
  role: "user" | "ai";
  text: string;
  parts?: { name: string; action: string }[];
};

export const initialMessages: ChatMessage[] = [
  {
    role: "user",
    text: "Jag har en Automower 315X och behöver byta knivblad.",
  },
  {
    role: "ai",
    text: "Jag hittade din modell: Automower 315X (2020–2024). Jag letar upp rätt sprängskiss för knivsystemet.",
  },
  {
    role: "ai",
    text: "Här är de mest sannolika matchningarna:",
    parts: [
      { name: "Knivblad 9-pack (art. 577 86 46-01)", action: "#" },
      { name: "Knivbult M5 (art. 529 03 52-18)", action: "#" },
      { name: "Knivskiva komplett (art. 580 79 50-01)", action: "#" },
    ],
  },
];

export const fakeAiResponses: string[] = [
  "Tack! Kan du ange modell och serienummer så kan jag hitta rätt sprängskiss åt dig?",
  "Jag söker i vårt sortiment... Prova att beskriva felet mer i detalj så kan jag föreslå rätt delar.",
  "Baserat på din beskrivning rekommenderar jag att du kontrollerar knivskivan. Öppna sprängskiss under 'Klippsystem' för att se alla ingående delar.",
];
