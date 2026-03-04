"use client"

import { AnimatePresence } from "framer-motion"
import { ShoeCard } from "@/components/shoe-card"
import { useLanguage } from "@/lib/language-context"
import { mockShoes } from "@/lib/translations"
import { PackageOpen } from "lucide-react"

export function ShoeGrid({
  selectedProvince,
  onContactClick,
}: {
  selectedProvince: string
  onContactClick: (shoe: (typeof mockShoes)[0]) => void
}) {
  const { t } = useLanguage()

  const filteredShoes =
    selectedProvince === "all"
      ? mockShoes
      : mockShoes.filter((shoe) => shoe.province === selectedProvince)

  return (
    <section id="grid" className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="font-mono text-2xl font-bold text-foreground">
          {selectedProvince === "all"
            ? filteredShoes.length > 0
              ? `${filteredShoes.length} ${t.viewOptions}`
              : ""
            : `${selectedProvince} (${filteredShoes.length})`}
        </h2>
      </div>

      {filteredShoes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <PackageOpen className="mb-4 size-12 opacity-40" />
          <p className="text-lg">{t.noResults}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filteredShoes.map((shoe) => (
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
