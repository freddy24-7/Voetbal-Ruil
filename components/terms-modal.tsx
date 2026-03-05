"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useLanguage } from "@/lib/language-context"

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TermsModal({ open, onOpenChange }: Props) {
  const { t } = useLanguage()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-mono">{t.terms}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-5 text-sm text-muted-foreground leading-relaxed">
          <section>
            <h3 className="mb-1 font-semibold text-foreground">{t.termsServiceTitle}</h3>
            <p>{t.termsService}</p>
          </section>
          <section>
            <h3 className="mb-1 font-semibold text-foreground">{t.termsUsersTitle}</h3>
            <p>{t.termsUsers}</p>
          </section>
          <section>
            <h3 className="mb-1 font-semibold text-foreground">{t.termsListingsTitle}</h3>
            <p>{t.termsListings}</p>
          </section>
          <section>
            <h3 className="mb-1 font-semibold text-foreground">{t.termsLiabilityTitle}</h3>
            <p>{t.termsLiability}</p>
          </section>
          <section>
            <h3 className="mb-1 font-semibold text-foreground">{t.termsContactTitle}</h3>
            <p>{t.termsContactText}</p>
          </section>
          <section>
            <h3 className="mb-1 font-semibold text-foreground">{t.termsChangesTitle}</h3>
            <p>{t.termsChanges}</p>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  )
}
