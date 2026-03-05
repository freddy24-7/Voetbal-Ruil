"use client"

import { useState, useEffect } from "react"
import { LanguageProvider } from "@/lib/language-context"
import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/hero-section"
import { ShoeGrid } from "@/components/shoe-grid"
import { ContactModal } from "@/components/contact-modal"
import { UploadModal } from "@/components/upload-modal"
import { SiteFooter } from "@/components/site-footer"
import { fetchShoes } from "@/lib/api"
import type { Shoe } from "@/lib/types"

function VoetbalRuilApp() {
  const [selectedProvince, setSelectedProvince] = useState("all")
  const [contactOpen, setContactOpen] = useState(false)
  const [uploadOpen, setUploadOpen] = useState(false)
  const [selectedShoe, setSelectedShoe] = useState<Shoe | null>(null)
  const [shoes, setShoes] = useState<Shoe[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadShoes = () => {
    setLoading(true)
    setError(null)
    fetchShoes(selectedProvince)
      .then(setShoes)
      .catch(() => setError("Could not load shoes. Is the backend running?"))
      .finally(() => setLoading(false))
  }

  useEffect(() => { loadShoes() }, [selectedProvince])

  const handleContactClick = (shoe: Shoe) => {
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
          shoes={shoes}
          loading={loading}
          error={error}
          selectedProvince={selectedProvince}
          onContactClick={handleContactClick}
        />
      </main>

      <SiteFooter />

      <ContactModal
        open={contactOpen}
        onOpenChange={setContactOpen}
        shoeId={selectedShoe?.id}
        shoeTitle={selectedShoe?.title}
      />
      <UploadModal open={uploadOpen} onOpenChange={setUploadOpen} onSuccess={loadShoes} />
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
