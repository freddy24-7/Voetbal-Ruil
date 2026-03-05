"use client"

import { useState, useEffect } from "react"
import { LanguageProvider, useLanguage } from "@/lib/language-context"
import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ShoeGrid } from "@/components/shoe-grid"
import { ContactModal } from "@/components/contact-modal"
import { UploadModal } from "@/components/upload-modal"
import { EditShoeModal } from "@/components/edit-shoe-modal"
import { SiteFooter } from "@/components/site-footer"
import { fetchShoes, deleteShoe } from "@/lib/api"
import { removeOwnedShoe } from "@/lib/owned-shoes"
import type { Shoe } from "@/lib/types"

function VoetbalRuilApp() {
  const { t } = useLanguage()
  const [selectedProvince, setSelectedProvince] = useState("all")
  const [contactOpen, setContactOpen] = useState(false)
  const [uploadOpen, setUploadOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [selectedShoe, setSelectedShoe] = useState<Shoe | null>(null)
  const [shoes, setShoes] = useState<Shoe[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadShoes = () => {
    setLoading(true)
    setError(null)
    fetchShoes(selectedProvince)
      .then(setShoes)
      .catch(() => setError(t.errorLoadShoes))
      .finally(() => setLoading(false))
  }

  useEffect(() => { loadShoes() }, [selectedProvince])

  const handleContactClick = (shoe: Shoe) => {
    setSelectedShoe(shoe)
    setContactOpen(true)
  }

  const handleEditClick = (shoe: Shoe) => {
    setSelectedShoe(shoe)
    setEditOpen(true)
  }

  const handleDeleteClick = async (shoe: Shoe) => {
    await deleteShoe(shoe.id)
    removeOwnedShoe(shoe.id)
    loadShoes()
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader onUploadClick={() => setUploadOpen(true)} />

      <main className="flex-1">
        <HeroSection
          selectedProvince={selectedProvince}
          onProvinceChange={setSelectedProvince}
        />
        <AboutSection />
        <ShoeGrid
          shoes={shoes}
          loading={loading}
          error={error}
          selectedProvince={selectedProvince}
          onContactClick={handleContactClick}
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteClick}
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
      <EditShoeModal
        open={editOpen}
        onOpenChange={setEditOpen}
        shoe={selectedShoe}
        onSuccess={loadShoes}
      />
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
