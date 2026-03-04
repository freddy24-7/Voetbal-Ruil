"use client"

import { useState } from "react"
import { LanguageProvider } from "@/lib/language-context"
import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/hero-section"
import { ShoeGrid } from "@/components/shoe-grid"
import { ContactModal } from "@/components/contact-modal"
import { UploadModal } from "@/components/upload-modal"
import { SiteFooter } from "@/components/site-footer"
import { type mockShoes } from "@/lib/translations"

function VoetbalRuilApp() {
  const [selectedProvince, setSelectedProvince] = useState("all")
  const [contactOpen, setContactOpen] = useState(false)
  const [uploadOpen, setUploadOpen] = useState(false)
  const [selectedShoe, setSelectedShoe] = useState<(typeof mockShoes)[0] | null>(null)

  const handleContactClick = (shoe: (typeof mockShoes)[0]) => {
    setSelectedShoe(shoe)
    setContactOpen(true)
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader onUploadClick={() => setUploadOpen(true)} />

      <main className="flex-1">
        <HeroSection
          selectedProvince={selectedProvince}
          onProvinceChange={setSelectedProvince}
        />
        <ShoeGrid
          selectedProvince={selectedProvince}
          onContactClick={handleContactClick}
        />
      </main>

      <SiteFooter />

      <ContactModal
        open={contactOpen}
        onOpenChange={setContactOpen}
        shoeTitle={selectedShoe?.title}
      />
      <UploadModal open={uploadOpen} onOpenChange={setUploadOpen} />
    </div>
  )
}

export default function Page() {
  return (
    <LanguageProvider>
      <VoetbalRuilApp />
    </LanguageProvider>
  )
}
