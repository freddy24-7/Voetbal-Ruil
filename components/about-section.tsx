"use client"

import { Search, MessageCircle, Upload } from "lucide-react"

import { useLanguage } from "@/lib/language-context"

export function AboutSection() {
  const { t } = useLanguage()

  return (
    <section id="about" className="bg-muted/30 border-b py-16 md:py-20">
      <div className="mx-auto max-w-4xl px-4 lg:px-8">
        {/* Intro */}
        <div className="mb-12 text-center">
          <h2 className="text-foreground font-mono text-2xl font-bold tracking-tight md:text-3xl">
            {t.aboutTitle}
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-base text-pretty md:text-lg">
            {t.aboutIntro}
          </p>
        </div>

        {/* How it works */}
        <div className="mb-12">
          <h3 className="text-foreground mb-6 text-center font-mono text-lg font-semibold">
            {t.aboutHowTitle}
          </h3>
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="bg-background flex flex-col items-center gap-3 rounded-xl border p-6 text-center shadow-sm">
              <div className="flex size-11 items-center justify-center rounded-full bg-gradient-to-br from-[#1A59FC] to-[#0C90FF]">
                <Search className="size-5 text-white" />
              </div>
              <p className="text-foreground font-semibold">{t.aboutStep1Title}</p>
              <p className="text-muted-foreground text-sm">{t.aboutStep1}</p>
            </div>
            <div className="bg-background flex flex-col items-center gap-3 rounded-xl border p-6 text-center shadow-sm">
              <div className="flex size-11 items-center justify-center rounded-full bg-gradient-to-br from-[#1A59FC] to-[#0C90FF]">
                <MessageCircle className="size-5 text-white" />
              </div>
              <p className="text-foreground font-semibold">{t.aboutStep2Title}</p>
              <p className="text-muted-foreground text-sm">{t.aboutStep2}</p>
            </div>
            <div className="bg-background flex flex-col items-center gap-3 rounded-xl border p-6 text-center shadow-sm">
              <div className="flex size-11 items-center justify-center rounded-full bg-gradient-to-br from-[#1A59FC] to-[#0C90FF]">
                <Upload className="size-5 text-white" />
              </div>
              <p className="text-foreground font-semibold">{t.aboutStep3Title}</p>
              <p className="text-muted-foreground text-sm">{t.aboutStep3}</p>
            </div>
          </div>
        </div>

        {/* Why */}
        <div className="bg-background rounded-xl border p-6 text-center shadow-sm">
          <h3 className="text-foreground mb-2 font-mono text-lg font-semibold">
            {t.aboutWhyTitle}
          </h3>
          <p className="text-muted-foreground text-sm md:text-base">{t.aboutWhy}</p>
        </div>
      </div>
    </section>
  )
}
