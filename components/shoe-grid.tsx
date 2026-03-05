"use client"

import { AnimatePresence } from "framer-motion"
import { ShoeCard } from "@/components/shoe-card"
import { useLanguage } from "@/lib/language-context"
import { PackageOpen, Loader2 } from "lucide-react"
import type { Shoe } from "@/lib/types"

export function ShoeGrid({
  shoes,
  loading,
  error,
  selectedProvince,
  onContactClick,
}: {
  shoes: Shoe[]
  loading: boolean
  error: string | null
  selectedProvince: string
  onContactClick: (shoe: Shoe) => void
}) {
  const { t } = useLanguage()

  return (
    <section id="grid" className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="font-mono text-2xl font-bold text-foreground">
          {!loading && (selectedProvince === "all"
            ? shoes.length > 0 ? `${shoes.length} ${t.viewOptions}` : ""
            : `${selectedProvince} (${shoes.length})`)}
        </h2>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <Loader2 className="mb-4 size-12 animate-spin opacity-40" />
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-20 text-destructive">
          <p className="text-lg">{error}</p>
        </div>
      ) : shoes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
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
              />
            ))}
          </AnimatePresence>
        </div>
      )}
    </section>
  )
}
