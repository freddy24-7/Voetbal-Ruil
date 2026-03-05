"use client"

import { useState, useEffect } from "react"
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
import { Send, Loader2 } from "lucide-react"
import { createContact } from "@/lib/api"

type ContactModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  shoeId?: number
  shoeTitle?: string
}

export function ContactModal({ open, onOpenChange, shoeId, shoeTitle }: ContactModalProps) {
  const { t } = useLanguage()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sent, setSent] = useState(false)

  const reset = () => {
    setName("")
    setEmail("")
    setMessage("")
    setError(null)
    setSent(false)
  }

  useEffect(() => {
    if (!open) return
    reset()
  }, [shoeId, open])

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (!shoeId || !shoeTitle) return
    setSubmitting(true)
    setError(null)
    try {
      await Promise.all([
        createContact({ name, email, message, shoeId, shoeTitle }),
        new Promise((r) => setTimeout(r, 2000)),
      ])
      setSent(true)
      await new Promise((r) => setTimeout(r, 2500))
      onOpenChange(false)
      reset()
    } catch {
      setError("Failed to send message. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) reset(); onOpenChange(isOpen) }}>
      <DialogContent className="sm:max-w-md">
        {sent ? (
          <p className="py-10 text-center text-sm font-medium text-primary">{t.messageSent}</p>
        ) : (
          <>
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
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="contact-name">{t.name}</Label>
              <Input
                id="contact-name"
                placeholder={t.namePlaceholder}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="contact-email">{t.email}</Label>
              <Input
                id="contact-email"
                type="email"
                placeholder={t.emailPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="contact-message">{t.message}</Label>
              <Textarea
                id="contact-message"
                placeholder={t.messagePlaceholder}
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <DialogFooter>
              <Button
                type="submit"
                disabled={submitting || !name || !email || !message}
                className="w-full bg-gradient-to-r from-[#1A59FC] to-[#0C90FF] text-[#FFFFFF] hover:from-[#1550E0] hover:to-[#0A80E8] sm:w-auto"
              >
                {submitting ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Send className="size-4" />
                )}
                {t.send}
              </Button>
            </DialogFooter>
          </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
