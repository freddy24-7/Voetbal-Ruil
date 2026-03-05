"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useLanguage } from "@/lib/language-context"

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TermsModal({ open, onOpenChange }: Props) {
  const { t } = useLanguage()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-mono">{t.terms}</DialogTitle>
        </DialogHeader>
        <div className="text-muted-foreground flex flex-col gap-5 text-sm leading-relaxed">
          <section>
            <h3 className="text-foreground mb-1 font-semibold">{t.termsServiceTitle}</h3>
            <p>{t.termsService}</p>
          </section>
          <section>
            <h3 className="text-foreground mb-1 font-semibold">{t.termsUsersTitle}</h3>
            <p>{t.termsUsers}</p>
          </section>
          <section>
            <h3 className="text-foreground mb-1 font-semibold">{t.termsListingsTitle}</h3>
            <p>{t.termsListings}</p>
          </section>
          <section>
            <h3 className="text-foreground mb-1 font-semibold">{t.termsLiabilityTitle}</h3>
            <p>{t.termsLiability}</p>
          </section>
          <section>
            <h3 className="text-foreground mb-1 font-semibold">{t.termsContactTitle}</h3>
            <p>{t.termsContactText}</p>
          </section>
          <section>
            <h3 className="text-foreground mb-1 font-semibold">{t.termsChangesTitle}</h3>
            <p>{t.termsChanges}</p>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  )
}
