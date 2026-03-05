"use client"

import { Search, MessageCircle, Upload } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function AboutSection() {
  const { t } = useLanguage()

  return (
    <section id="about" className="border-b bg-muted/30 py-16 md:py-20">
      <div className="mx-auto max-w-4xl px-4 lg:px-8">
        {/* Intro */}
        <div className="mb-12 text-center">
          <h2 className="font-mono text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            {t.aboutTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-base text-muted-foreground md:text-lg">
            {t.aboutIntro}
          </p>
        </div>

        {/* How it works */}
        <div className="mb-12">
          <h3 className="mb-6 text-center font-mono text-lg font-semibold text-foreground">
            {t.aboutHowTitle}
          </h3>
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="flex flex-col items-center gap-3 rounded-xl border bg-background p-6 text-center shadow-sm">
              <div className="flex size-11 items-center justify-center rounded-full bg-gradient-to-br from-[#1A59FC] to-[#0C90FF]">
                <Search className="size-5 text-white" />
              </div>
              <p className="font-semibold text-foreground">{t.aboutStep1Title}</p>
              <p className="text-sm text-muted-foreground">{t.aboutStep1}</p>
            </div>
            <div className="flex flex-col items-center gap-3 rounded-xl border bg-background p-6 text-center shadow-sm">
              <div className="flex size-11 items-center justify-center rounded-full bg-gradient-to-br from-[#1A59FC] to-[#0C90FF]">
                <MessageCircle className="size-5 text-white" />
              </div>
              <p className="font-semibold text-foreground">{t.aboutStep2Title}</p>
              <p className="text-sm text-muted-foreground">{t.aboutStep2}</p>
            </div>
            <div className="flex flex-col items-center gap-3 rounded-xl border bg-background p-6 text-center shadow-sm">
              <div className="flex size-11 items-center justify-center rounded-full bg-gradient-to-br from-[#1A59FC] to-[#0C90FF]">
                <Upload className="size-5 text-white" />
              </div>
              <p className="font-semibold text-foreground">{t.aboutStep3Title}</p>
              <p className="text-sm text-muted-foreground">{t.aboutStep3}</p>
            </div>
          </div>
        </div>

        {/* Why */}
        <div className="rounded-xl border bg-background p-6 text-center shadow-sm">
          <h3 className="mb-2 font-mono text-lg font-semibold text-foreground">
            {t.aboutWhyTitle}
          </h3>
          <p className="text-sm text-muted-foreground md:text-base">{t.aboutWhy}</p>
        </div>
      </div>
    </section>
  )
}
