"use client"

import { useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { GeneralContactModal } from "@/components/general-contact-modal"
import { PrivacyModal } from "@/components/privacy-modal"
import { TermsModal } from "@/components/terms-modal"

export function SiteFooter() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()
  const [contactOpen, setContactOpen] = useState(false)
  const [privacyOpen, setPrivacyOpen] = useState(false)
  const [termsOpen, setTermsOpen] = useState(false)

  return (
    <>
      <footer className="border-t bg-[#0A3038] text-[#A8C5CC]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-md bg-gradient-to-br from-[#1A59FC] to-[#0C90FF]">
              <span className="text-xs font-bold text-[#FFFFFF]">VR</span>
            </div>
            <span className="text-sm text-[#6B9AA3]">
              &copy; {year} Voetbal-Ruil. {t.rights}
            </span>
          </div>
          <nav className="flex items-center gap-6">
            <button
              onClick={() => setContactOpen(true)}
              className="text-sm text-[#6B9AA3] transition-colors hover:text-[#E8F0F2]"
            >
              {t.contact}
            </button>
            <button
              onClick={() => setPrivacyOpen(true)}
              className="text-sm text-[#6B9AA3] transition-colors hover:text-[#E8F0F2]"
            >
              {t.privacy}
            </button>
            <button
              onClick={() => setTermsOpen(true)}
              className="text-sm text-[#6B9AA3] transition-colors hover:text-[#E8F0F2]"
            >
              {t.terms}
            </button>
          </nav>
        </div>
      </footer>

      <GeneralContactModal open={contactOpen} onOpenChange={setContactOpen} />
      <PrivacyModal open={privacyOpen} onOpenChange={setPrivacyOpen} />
      <TermsModal open={termsOpen} onOpenChange={setTermsOpen} />
    </>
  )
}
