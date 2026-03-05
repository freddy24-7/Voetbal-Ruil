"use client"

import { Search } from "lucide-react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useLanguage } from "@/lib/language-context"
import { provinces } from "@/lib/translations"

export function HeroSection({
  selectedProvince,
  onProvinceChange,
}: {
  selectedProvince: string
  onProvinceChange: (value: string) => void
}) {
  const { t } = useLanguage()

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#1A59FC] to-[#0C90FF] py-20 md:py-28">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 50%, rgba(255,255,255,0.15) 0%, transparent 50%), radial-gradient(circle at 75% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 text-center">
        <h1 className="font-mono text-4xl font-bold tracking-tight text-balance text-[#FFFFFF] md:text-5xl lg:text-6xl">
          {t.heroTitle}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-pretty text-[#C8DEFF] md:text-xl">
          {t.heroSubtitle}
        </p>

        {/* Province Selector */}
        <div className="mx-auto mt-10 max-w-md">
          <label className="mb-3 flex items-center justify-center gap-2 text-sm font-medium text-[#C8DEFF]">
            <Search className="size-4" />
            {t.searchLabel}
          </label>
          <Select value={selectedProvince} onValueChange={onProvinceChange}>
            <SelectTrigger className="h-12 w-full rounded-xl border-[#3B7BFF] bg-[#FFFFFF]/15 text-[#FFFFFF] shadow-lg backdrop-blur-sm transition-colors hover:bg-[#FFFFFF]/20 focus:ring-[#FFFFFF]/30 [&_svg]:text-[#FFFFFF]">
              <SelectValue placeholder={t.allProvinces} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.allProvinces}</SelectItem>
              {provinces.map((province) => (
                <SelectItem key={province} value={province}>
                  {province}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </section>
  )
}
