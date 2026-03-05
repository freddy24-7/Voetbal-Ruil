"use client"

import { AnimatePresence } from "framer-motion"
import { PackageOpen, Loader2 } from "lucide-react"

import { ShoeCard } from "@/components/shoe-card"
import { useLanguage } from "@/lib/language-context"
import type { Shoe } from "@/lib/types"

export function ShoeGrid({
  shoes,
  loading,
  error,
  selectedProvince,
  onContactClick,
  onEditClick,
  onDeleteClick,
}: {
  shoes: Shoe[]
  loading: boolean
  error: string | null
  selectedProvince: string
  onContactClick: (shoe: Shoe) => void
  onEditClick: (shoe: Shoe) => void
  onDeleteClick: (shoe: Shoe) => void
}) {
  const { t } = useLanguage()

  return (
    <section id="grid" className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-foreground font-mono text-2xl font-bold">
          {!loading &&
            (selectedProvince === "all"
              ? shoes.length > 0
                ? `${shoes.length} ${t.viewOptions}`
                : ""
              : `${selectedProvince} (${shoes.length})`)}
        </h2>
      </div>

      {loading ? (
        <div className="text-muted-foreground flex flex-col items-center justify-center py-20">
          <Loader2 className="mb-4 size-12 animate-spin opacity-40" />
        </div>
      ) : error ? (
        <div className="text-destructive flex flex-col items-center justify-center py-20">
          <p className="text-lg">{error}</p>
        </div>
      ) : shoes.length === 0 ? (
        <div className="text-muted-foreground flex flex-col items-center justify-center py-20">
          <PackageOpen className="mb-4 size-12 opacity-40" />
          <p className="text-lg">{t.noResults}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {shoes.map((shoe) => (
              <ShoeCard
                key={shoe.id}
                shoe={shoe}
                onContactClick={() => onContactClick(shoe)}
                onEditClick={() => onEditClick(shoe)}
                onDeleteClick={() => onDeleteClick(shoe)}
              />
            ))}
          </AnimatePresence>
        </div>
      )}
    </section>
  )
}
