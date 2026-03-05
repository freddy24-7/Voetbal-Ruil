"use client"

import { Send, Loader2 } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
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
import { sendGeneralContact } from "@/lib/api"
import { useFormCooldown } from "@/lib/hooks/use-form-cooldown"
import { useLanguage } from "@/lib/language-context"

type FormBodyProps = {
  name: string
  setName: (v: string) => void
  email: string
  setEmail: (v: string) => void
  message: string
  setMessage: (v: string) => void
  submitting: boolean
  coolingDown: boolean
  error: string | null
  onSubmit: (e: React.SyntheticEvent) => Promise<void>
}

function GeneralContactFormBody({
  name,
  setName,
  email,
  setEmail,
  message,
  setMessage,
  submitting,
  coolingDown,
  error,
  onSubmit,
}: FormBodyProps) {
  const { t } = useLanguage()
  return (
    <>
      <DialogHeader>
        <DialogTitle className="font-mono">{t.contactSectionTitle}</DialogTitle>
        <DialogDescription>{t.contactSectionSubtitle}</DialogDescription>
      </DialogHeader>
      <form
        onSubmit={(e) => void onSubmit(e)}
        aria-busy={submitting}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col gap-2">
          <Label htmlFor="gc-name">{t.name}</Label>
          <Input
            id="gc-name"
            placeholder={t.namePlaceholder}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="gc-email">{t.email}</Label>
          <Input
            id="gc-email"
            type="email"
            placeholder={t.emailPlaceholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="gc-message">{t.message}</Label>
          <Textarea
            id="gc-message"
            placeholder={t.generalMessagePlaceholder}
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        {error && (
          <p role="alert" aria-live="assertive" className="text-destructive text-sm">
            {error}
          </p>
        )}
        <DialogFooter>
          <Button
            type="submit"
            disabled={submitting || coolingDown || !name || !email || !message}
            className="w-full bg-gradient-to-r from-[#1A59FC] to-[#0C90FF] text-[#FFFFFF] hover:from-[#1550E0] hover:to-[#0A80E8] sm:w-auto"
          >
            {submitting ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
            {t.send}
          </Button>
        </DialogFooter>
      </form>
    </>
  )
}

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function GeneralContactModal({ open, onOpenChange }: Props) {
  const { t } = useLanguage()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { coolingDown, startCooldown } = useFormCooldown()

  const reset = () => {
    setName("")
    setEmail("")
    setMessage("")
    setError(null)
    setSent(false)
  }

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      await Promise.all([
        sendGeneralContact({ name, email, message }),
        new Promise((r) => setTimeout(r, 1000)),
      ])
      setSent(true)
      await new Promise((r) => setTimeout(r, 2500))
      onOpenChange(false)
      reset()
    } catch {
      setError(t.errorSendMessage)
      startCooldown()
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) reset()
        onOpenChange(isOpen)
      }}
    >
      <DialogContent className="sm:max-w-md">
        {sent ? (
          <p
            role="status"
            aria-live="polite"
            className="text-primary py-10 text-center text-sm font-medium"
          >
            {t.contactSectionSent}
          </p>
        ) : (
          <GeneralContactFormBody
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            message={message}
            setMessage={setMessage}
            submitting={submitting}
            coolingDown={coolingDown}
            error={error}
            onSubmit={handleSubmit}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
