export type Locale = "nl" | "en"

export const translations = {
  nl: {
    // Header
    about: "Over Ons",
    viewOptions: "Bekijk Opties",
    upload: "Uploaden",
    // Hero
    heroTitle: "Voetbalschoenen Ruilen",
    heroSubtitle: "De Nederlandse marktplaats voor tweedehands kinder voetbalschoenen.",
    searchLabel: "Vind schoenen in jouw buurt",
    allProvinces: "Alle Provincies",
    // Grid
    province: "Provincie",
    contact: "Contact",
    noResults: "Geen schoenen gevonden in deze provincie.",
    size: "Maat",
    // Contact Modal
    contactTitle: "Neem Contact Op",
    contactDescription: "Stuur een bericht naar de verkoper.",
    name: "Naam",
    email: "E-mail",
    message: "Bericht",
    send: "Verstuur",
    messageSent: "Jouw bericht is verstuurd naar de huidige eigenaar.",
    namePlaceholder: "Jouw naam",
    emailPlaceholder: "jouw@email.nl",
    messagePlaceholder: "Ik ben geïnteresseerd in deze schoenen...",
    // Upload Modal
    uploadTitle: "Schoenen Uploaden",
    uploadDescription: "Plaats jouw voetbalschoenen op de marktplaats.",
    title: "Titel",
    titlePlaceholder: "bijv. Nike Jr. Mercurial - Maat 33",
    sizePlaceholder: "bijv. 33",
    selectProvince: "Selecteer een provincie",
    photo: "Foto",
    dropzoneText: "Sleep je foto hierheen of klik om te uploaden",
    dropzoneHint: "PNG, JPG tot 5MB",
    uploadButton: "Plaatsen",
    // Footer
    privacy: "Privacy",
    terms: "Algemene Voorwaarden",
    rights: "Alle rechten voorbehouden.",
  },
  en: {
    // Header
    about: "About",
    viewOptions: "View Options",
    upload: "Upload",
    // Hero
    heroTitle: "Swap Football Shoes",
    heroSubtitle: "The Dutch marketplace for second-hand kids' football shoes.",
    searchLabel: "Find shoes in your area",
    allProvinces: "All Provinces",
    // Grid
    province: "Province",
    contact: "Contact",
    noResults: "No shoes found in this province.",
    size: "Size",
    // Contact Modal
    contactTitle: "Get in Touch",
    contactDescription: "Send a message to the seller.",
    name: "Name",
    email: "Email",
    message: "Message",
    send: "Send",
    messageSent: "Your message has been sent to the current owner.",
    namePlaceholder: "Your name",
    emailPlaceholder: "your@email.com",
    messagePlaceholder: "I'm interested in these shoes...",
    // Upload Modal
    uploadTitle: "Upload Shoes",
    uploadDescription: "List your football shoes on the marketplace.",
    title: "Title",
    titlePlaceholder: "e.g. Nike Jr. Mercurial - Size 33",
    sizePlaceholder: "e.g. 33",
    selectProvince: "Select a province",
    photo: "Photo",
    dropzoneText: "Drag your photo here or click to upload",
    dropzoneHint: "PNG, JPG up to 5MB",
    uploadButton: "Submit",
    // Footer
    privacy: "Privacy",
    terms: "Terms of Service",
    rights: "All rights reserved.",
  },
} as const

export const provinces = [
  "Drenthe",
  "Flevoland",
  "Friesland",
  "Gelderland",
  "Groningen",
  "Limburg",
  "Noord-Brabant",
  "Noord-Holland",
  "Overijssel",
  "Utrecht",
  "Zeeland",
  "Zuid-Holland",
]

