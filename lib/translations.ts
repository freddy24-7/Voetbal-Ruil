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
    // Edit / Delete
    edit: "Bewerken",
    editTitle: "Advertentie bewerken",
    editButton: "Opslaan",
    delete: "Verwijderen",
    deleteConfirmTitle: "Advertentie verwijderen?",
    deleteConfirmDescription: "Deze actie kan niet ongedaan worden gemaakt.",
    deleteConfirm: "Ja, verwijderen",
    cancel: "Annuleren",
    // About
    aboutTitle: "Wat is Voetbal-Ruil?",
    aboutIntro:
      "Kinderen groeien snel. Voetbalschoenen niet mee. Voetbal-Ruil is een gratis marktplaats waar ouders tweedehands voetbalschoenen van goede kwaliteit kunnen aanbieden of vinden — dicht bij huis, zonder gedoe.",
    aboutHowTitle: "Hoe werkt het?",
    aboutStep1Title: "Zoek op provincie",
    aboutStep1: "Bekijk het beschikbare aanbod in jouw regio.",
    aboutStep2Title: "Neem contact op",
    aboutStep2: "Stuur een bericht naar de aanbieder via het contactformulier.",
    aboutStep3Title: "Bied jouw schoenen aan",
    aboutStep3: "Klik op Uploaden en zet jouw schoenen online in minder dan een minuut.",
    aboutWhyTitle: "Waarom Voetbal-Ruil?",
    aboutWhy:
      "Nieuwe voetbalschoenen zijn duur. Tweedehands ruilen is duurzaam, betaalbaar en helpt andere voetbalfamilies. Samen houden we kinderen op het veld.",
    // Privacy Modal
    privacyWhoTitle: "Wie zijn wij?",
    privacyWho:
      "Voetbal-Ruil is een gratis online marktplaats voor tweedehands kinder voetbalschoenen, bedoeld als dienst voor particulieren in Nederland.",
    privacyDataTitle: "Welke gegevens verwerken wij?",
    privacyData:
      "Wij verwerken alleen de gegevens die jij actief invoert: jouw naam, e-mailadres en het bericht dat je stuurt via het contactformulier. Wij slaan geen wachtwoorden, betalingsgegevens of locatiegegevens op.",
    privacyWhyTitle: "Waarvoor gebruiken wij jouw gegevens?",
    privacyWhy:
      "Jouw contactgegevens worden uitsluitend gebruikt om jouw bericht door te sturen naar de aanbieder van de schoenen en om jou een bevestiging te sturen. Wij verkopen of delen jouw gegevens niet met derden voor marketingdoeleinden.",
    privacyStorageTitle: "Hoe lang bewaren wij jouw gegevens?",
    privacyStorage:
      "Contactberichten worden niet permanent opgeslagen door Voetbal-Ruil. Ze worden via e-mail verstuurd en daarna niet verder verwerkt of bewaard in onze systemen.",
    privacyRightsTitle: "Jouw rechten (AVG)",
    privacyRightsText:
      "Op grond van de Algemene Verordening Gegevensbescherming (AVG) heb je het recht op inzage, correctie en verwijdering van jouw persoonsgegevens. Neem hiervoor contact met ons op via het contactformulier.",
    privacyCookiesTitle: "Cookies",
    privacyCookies:
      "Voetbal-Ruil maakt geen gebruik van tracking cookies of analytische cookies van derden. Er worden alleen functionele cookies gebruikt die strikt noodzakelijk zijn voor het functioneren van de website.",
    privacyContactTitle: "Vragen?",
    privacyContact:
      "Heb je vragen over het gebruik van jouw gegevens? Stuur ons een bericht via het contactformulier op de website.",
    // Terms Modal
    termsServiceTitle: "Over deze dienst",
    termsService:
      "Voetbal-Ruil is een gratis platform waar particulieren tweedehands kinder voetbalschoenen kunnen aanbieden en vinden. Voetbal-Ruil treedt niet op als koper, verkoper of tussenpersoon bij transacties tussen gebruikers.",
    termsUsersTitle: "Gebruik van het platform",
    termsUsers:
      "Het platform is uitsluitend bedoeld voor particulier gebruik. Je mag alleen advertenties plaatsen voor schoenen die je daadwerkelijk bezit. Het is niet toegestaan om misleidende, onjuiste of commerciële advertenties te plaatsen.",
    termsListingsTitle: "Inhoud van advertenties",
    termsListings:
      "Gebruikers zijn zelf verantwoordelijk voor de inhoud van hun advertentie, inclusief foto's en beschrijvingen. Voetbal-Ruil behoudt het recht om advertenties zonder opgaaf van reden te verwijderen.",
    termsLiabilityTitle: "Aansprakelijkheid",
    termsLiability:
      "Voetbal-Ruil is niet aansprakelijk voor geschillen, schade of verliezen die voortvloeien uit contact of transacties tussen gebruikers. Ruilen of kopen doe je op eigen risico.",
    termsContactTitle: "Contact tussen gebruikers",
    termsContactText:
      "Berichten die via het platform worden verstuurd zijn bedoeld om contact te leggen. Voetbal-Ruil is geen partij in gesprekken en kan de inhoud van berichten niet garanderen of monitoren.",
    termsChangesTitle: "Wijzigingen in de voorwaarden",
    termsChanges:
      "Voetbal-Ruil behoudt het recht om deze voorwaarden op ieder moment te wijzigen. Voortgezet gebruik van het platform na een wijziging geldt als aanvaarding van de nieuwe voorwaarden.",
    // Contact Section
    contactSectionTitle: "Neem Contact Op",
    contactSectionSubtitle:
      "Heb je een vraag of opmerking? Stuur ons een bericht en we reageren zo snel mogelijk.",
    contactSectionSent: "Bedankt voor je bericht! We nemen zo snel mogelijk contact met je op.",
    generalMessagePlaceholder: "Jouw bericht...",
    // Errors
    errorLoadShoes: "Kan schoenen niet laden. Staat de backend aan?",
    errorSendMessage: "Verzenden mislukt. Probeer het opnieuw.",
    errorSubmitListing: "Plaatsen mislukt. Probeer het opnieuw.",
    errorSaveChanges: "Opslaan mislukt. Probeer het opnieuw.",
    // Accessibility
    toggleTheme: "Thema wisselen",
    openMenu: "Menu openen",
    navigationMenu: "Navigatiemenu",
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
    // Edit / Delete
    edit: "Edit",
    editTitle: "Edit listing",
    editButton: "Save",
    delete: "Delete",
    deleteConfirmTitle: "Delete listing?",
    deleteConfirmDescription: "This action cannot be undone.",
    deleteConfirm: "Yes, delete",
    cancel: "Cancel",
    // About
    aboutTitle: "What is Voetbal-Ruil?",
    aboutIntro:
      "Kids grow fast. Football shoes don't. Voetbal-Ruil is a free marketplace where parents can list or find quality second-hand football shoes — close to home, hassle-free.",
    aboutHowTitle: "How does it work?",
    aboutStep1Title: "Search by province",
    aboutStep1: "Browse available listings in your region.",
    aboutStep2Title: "Get in touch",
    aboutStep2: "Send a message to the seller directly through the contact form.",
    aboutStep3Title: "List your shoes",
    aboutStep3: "Click Upload and get your shoes online in under a minute.",
    aboutWhyTitle: "Why Voetbal-Ruil?",
    aboutWhy:
      "New football shoes are expensive. Second-hand swapping is sustainable, affordable, and helps other football families. Together we keep kids on the pitch.",
    // Privacy Modal
    privacyWhoTitle: "Who are we?",
    privacyWho:
      "Voetbal-Ruil is a free online marketplace for second-hand children's football shoes, intended as a service for private individuals in the Netherlands.",
    privacyDataTitle: "What data do we process?",
    privacyData:
      "We only process data that you actively provide: your name, email address, and the message you send via the contact form. We do not store passwords, payment details, or location data.",
    privacyWhyTitle: "Why do we use your data?",
    privacyWhy:
      "Your contact details are used solely to forward your message to the shoe listing owner and to send you a confirmation. We do not sell or share your data with third parties for marketing purposes.",
    privacyStorageTitle: "How long do we retain your data?",
    privacyStorage:
      "Contact messages are not permanently stored by Voetbal-Ruil. They are sent via email and not further processed or retained in our systems.",
    privacyRightsTitle: "Your rights (GDPR)",
    privacyRightsText:
      "Under the General Data Protection Regulation (GDPR), you have the right to access, correct, and delete your personal data. Please contact us via the contact form on the website.",
    privacyCookiesTitle: "Cookies",
    privacyCookies:
      "Voetbal-Ruil does not use tracking or third-party analytics cookies. Only strictly necessary functional cookies are used to ensure the website operates correctly.",
    privacyContactTitle: "Questions?",
    privacyContact:
      "If you have questions about how your data is used, please send us a message via the contact form on the website.",
    // Terms Modal
    termsServiceTitle: "About this service",
    termsService:
      "Voetbal-Ruil is a free platform where private individuals can list and find second-hand children's football shoes. Voetbal-Ruil does not act as buyer, seller, or intermediary in transactions between users.",
    termsUsersTitle: "Use of the platform",
    termsUsers:
      "The platform is intended for private use only. You may only list shoes that you actually own. Misleading, inaccurate, or commercial listings are not permitted.",
    termsListingsTitle: "Listing content",
    termsListings:
      "Users are solely responsible for the content of their listings, including photos and descriptions. Voetbal-Ruil reserves the right to remove listings without giving reasons.",
    termsLiabilityTitle: "Liability",
    termsLiability:
      "Voetbal-Ruil is not liable for disputes, damages, or losses arising from contact or transactions between users. Any exchange or purchase is done at your own risk.",
    termsContactTitle: "Contact between users",
    termsContactText:
      "Messages sent via the platform are intended to establish contact. Voetbal-Ruil is not a party to conversations and cannot guarantee or monitor the content of messages.",
    termsChangesTitle: "Changes to these terms",
    termsChanges:
      "Voetbal-Ruil reserves the right to modify these terms at any time. Continued use of the platform after a change constitutes acceptance of the updated terms.",
    // Contact Section
    contactSectionTitle: "Get in Touch",
    contactSectionSubtitle:
      "Have a question or a comment? Send us a message and we'll get back to you as soon as possible.",
    contactSectionSent: "Thanks for your message! We'll get back to you as soon as possible.",
    generalMessagePlaceholder: "Your message...",
    // Errors
    errorLoadShoes: "Could not load shoes. Is the backend running?",
    errorSendMessage: "Failed to send message. Please try again.",
    errorSubmitListing: "Failed to submit. Please try again.",
    errorSaveChanges: "Failed to save changes. Please try again.",
    // Accessibility
    toggleTheme: "Toggle theme",
    openMenu: "Open menu",
    navigationMenu: "Navigation menu",
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
