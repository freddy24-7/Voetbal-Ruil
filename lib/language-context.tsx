"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

import { type Locale, translations } from "@/lib/translations"

type LanguageContextType = {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (typeof translations)["nl"]
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("nl")

  return (
    <LanguageContext.Provider
      value={{
        locale,
        setLocale,
        t: translations[locale],
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
