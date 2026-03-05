"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useLanguage } from "@/lib/language-context"

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PrivacyModal({ open, onOpenChange }: Props) {
  const { t } = useLanguage()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-mono">{t.privacy}</DialogTitle>
        </DialogHeader>
        <div className="text-muted-foreground flex flex-col gap-5 text-sm leading-relaxed">
          <section>
            <h3 className="text-foreground mb-1 font-semibold">{t.privacyWhoTitle}</h3>
            <p>{t.privacyWho}</p>
          </section>
          <section>
            <h3 className="text-foreground mb-1 font-semibold">{t.privacyDataTitle}</h3>
            <p>{t.privacyData}</p>
          </section>
          <section>
            <h3 className="text-foreground mb-1 font-semibold">{t.privacyWhyTitle}</h3>
            <p>{t.privacyWhy}</p>
          </section>
          <section>
            <h3 className="text-foreground mb-1 font-semibold">{t.privacyStorageTitle}</h3>
            <p>{t.privacyStorage}</p>
          </section>
          <section>
            <h3 className="text-foreground mb-1 font-semibold">{t.privacyRightsTitle}</h3>
            <p>{t.privacyRightsText}</p>
          </section>
          <section>
            <h3 className="text-foreground mb-1 font-semibold">{t.privacyCookiesTitle}</h3>
            <p>{t.privacyCookies}</p>
          </section>
          <section>
            <h3 className="text-foreground mb-1 font-semibold">{t.privacyContactTitle}</h3>
            <p>{t.privacyContact}</p>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  )
}
