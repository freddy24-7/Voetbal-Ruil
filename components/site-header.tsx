"use client"

import { Code2, Upload, Sun, Moon, Menu } from "lucide-react"
import { useTheme } from "next-themes"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { useLanguage } from "@/lib/language-context"

type MobileMenuProps = {
  onUploadClick: () => void
  onTechClick: () => void
  onClose: () => void
  open: boolean
  onOpenChange: (open: boolean) => void
}

function MobileMenu({ onUploadClick, onTechClick, onClose, open, onOpenChange }: MobileMenuProps) {
  const { locale, setLocale, t } = useLanguage()
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex items-center gap-2 md:hidden">
      <button
        onClick={() => setLocale(locale === "nl" ? "en" : "nl")}
        className="rounded-md border border-[#1A4550] px-2 py-1 text-xs font-semibold text-[#A8C5CC]"
      >
        {locale === "nl" ? "EN" : "NL"}
      </button>
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="text-[#A8C5CC] hover:bg-[#1A4550] hover:text-[#E8F0F2]"
      >
        <Sun className="size-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
        <Moon className="absolute size-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
        <span className="sr-only">{t.toggleTheme}</span>
      </Button>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon-sm"
            className="text-[#A8C5CC] hover:bg-[#1A4550] hover:text-[#E8F0F2]"
          >
            <Menu className="size-5" />
            <span className="sr-only">{t.openMenu}</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="border-border bg-[#0A3038] text-[#E8F0F2]">
          <SheetTitle className="sr-only">{t.navigationMenu}</SheetTitle>
          <nav className="flex flex-col gap-4 pt-8">
            <a
              href="#about"
              onClick={onClose}
              className="text-base font-medium text-[#A8C5CC] hover:text-[#E8F0F2]"
            >
              {t.about}
            </a>
            <a
              href="#grid"
              onClick={onClose}
              className="text-base font-medium text-[#A8C5CC] hover:text-[#E8F0F2]"
            >
              {t.viewOptions}
            </a>
            <Button
              onClick={() => {
                onClose()
                onTechClick()
              }}
              className="mt-2 bg-orange-500 text-white hover:bg-orange-600"
            >
              <Code2 className="size-4" />
              Tech
            </Button>
            <Button
              onClick={() => {
                onClose()
                onUploadClick()
              }}
              className="bg-gradient-to-r from-[#1A59FC] to-[#0C90FF] text-[#FFFFFF] hover:from-[#1550E0] hover:to-[#0A80E8]"
            >
              <Upload className="size-4" />
              {t.upload}
            </Button>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export function SiteHeader({
  onUploadClick,
  onTechClick,
}: {
  onUploadClick: () => void
  onTechClick: () => void
}) {
  const { locale, setLocale, t } = useLanguage()
  const { theme, setTheme } = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-[#0A3038] text-[#E8F0F2]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <div className="flex size-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#1A59FC] to-[#0C90FF]">
            <span className="text-lg font-bold text-[#FFFFFF]">VR</span>
          </div>
          <span className="font-mono text-lg font-bold tracking-tight text-[#E8F0F2]">
            Voetbal-Ruil
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 md:flex">
          <a
            href="#about"
            className="text-sm font-medium text-[#A8C5CC] transition-colors hover:text-[#E8F0F2]"
          >
            {t.about}
          </a>
          <a
            href="#grid"
            className="text-sm font-medium text-[#A8C5CC] transition-colors hover:text-[#E8F0F2]"
          >
            {t.viewOptions}
          </a>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          <button
            onClick={() => setLocale(locale === "nl" ? "en" : "nl")}
            className="rounded-md border border-[#1A4550] px-2.5 py-1 text-xs font-semibold text-[#A8C5CC] transition-colors hover:border-[#0C90FF] hover:text-[#E8F0F2]"
          >
            {locale === "nl" ? "EN" : "NL"}
          </button>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-[#A8C5CC] hover:bg-[#1A4550] hover:text-[#E8F0F2]"
          >
            <Sun className="size-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
            <Moon className="absolute size-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
            <span className="sr-only">{t.toggleTheme}</span>
          </Button>
          <Button
            onClick={onTechClick}
            className="bg-orange-500 text-white hover:bg-orange-600"
          >
            <Code2 className="size-4" />
            Tech
          </Button>
          <Button
            onClick={onUploadClick}
            className="bg-gradient-to-r from-[#1A59FC] to-[#0C90FF] text-[#FFFFFF] hover:from-[#1550E0] hover:to-[#0A80E8]"
          >
            <Upload className="size-4" />
            {t.upload}
          </Button>
        </div>

        <MobileMenu
          onUploadClick={onUploadClick}
          onTechClick={onTechClick}
          open={mobileOpen}
          onOpenChange={setMobileOpen}
          onClose={() => setMobileOpen(false)}
        />
      </div>
    </header>
  )
}
