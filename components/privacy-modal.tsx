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

export function PrivacyModal({ open, onOpenChange }: Props) {
  const { t } = useLanguage()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-mono">{t.privacy}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-5 text-sm text-muted-foreground leading-relaxed">
          <section>
            <h3 className="mb-1 font-semibold text-foreground">{t.privacyWhoTitle}</h3>
            <p>{t.privacyWho}</p>
          </section>
          <section>
            <h3 className="mb-1 font-semibold text-foreground">{t.privacyDataTitle}</h3>
            <p>{t.privacyData}</p>
          </section>
          <section>
            <h3 className="mb-1 font-semibold text-foreground">{t.privacyWhyTitle}</h3>
            <p>{t.privacyWhy}</p>
          </section>
          <section>
            <h3 className="mb-1 font-semibold text-foreground">{t.privacyStorageTitle}</h3>
            <p>{t.privacyStorage}</p>
          </section>
          <section>
            <h3 className="mb-1 font-semibold text-foreground">{t.privacyRightsTitle}</h3>
            <p>{t.privacyRightsText}</p>
          </section>
          <section>
            <h3 className="mb-1 font-semibold text-foreground">{t.privacyCookiesTitle}</h3>
            <p>{t.privacyCookies}</p>
          </section>
          <section>
            <h3 className="mb-1 font-semibold text-foreground">{t.privacyContactTitle}</h3>
            <p>{t.privacyContact}</p>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  )
}
