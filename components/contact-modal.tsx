"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import { Send } from "lucide-react"

type ContactModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  shoeTitle?: string
}

export function ContactModal({ open, onOpenChange, shoeTitle }: ContactModalProps) {
  const { t } = useLanguage()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-mono">{t.contactTitle}</DialogTitle>
          <DialogDescription>
            {t.contactDescription}
            {shoeTitle && (
              <span className="mt-1 block font-medium text-foreground">
                {shoeTitle}
              </span>
            )}
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            onOpenChange(false)
          }}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="contact-name">{t.name}</Label>
            <Input id="contact-name" placeholder={t.namePlaceholder} required />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="contact-email">{t.email}</Label>
            <Input
              id="contact-email"
              type="email"
              placeholder={t.emailPlaceholder}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="contact-message">{t.message}</Label>
            <Textarea
              id="contact-message"
              placeholder={t.messagePlaceholder}
              rows={4}
              required
            />
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#1A59FC] to-[#0C90FF] text-[#FFFFFF] hover:from-[#1550E0] hover:to-[#0A80E8] sm:w-auto"
            >
              <Send className="size-4" />
              {t.send}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
