"use client"

import { useState } from "react"
import { Send, Loader2 } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { sendGeneralContact } from "@/lib/api"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export function ContactSection() {
  const { t } = useLanguage()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      await Promise.all([
        sendGeneralContact({ name, email, message }),
        new Promise((r) => setTimeout(r, 1000)),
      ])
      setSent(true)
      setName("")
      setEmail("")
      setMessage("")
    } catch {
      setError("Failed to send message. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="bg-[#0A3038] py-16 md:py-20">
      <div className="mx-auto max-w-xl px-4 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="font-mono text-2xl font-bold tracking-tight text-[#E8F0F2] md:text-3xl">
            {t.contactSectionTitle}
          </h2>
          <p className="mt-3 text-sm text-[#A8C5CC] md:text-base">
            {t.contactSectionSubtitle}
          </p>
        </div>

        {sent ? (
          <p className="rounded-xl border border-[#1A4550] bg-[#0C2830] py-8 text-center text-sm font-medium text-[#0C90FF]">
            {t.contactSectionSent}
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="gs-name" className="text-[#A8C5CC]">{t.name}</Label>
              <Input
                id="gs-name"
                placeholder={t.namePlaceholder}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="border-[#1A4550] bg-[#0C2830] text-[#E8F0F2] placeholder:text-[#4A7A84] focus-visible:ring-[#0C90FF]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="gs-email" className="text-[#A8C5CC]">{t.email}</Label>
              <Input
                id="gs-email"
                type="email"
                placeholder={t.emailPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-[#1A4550] bg-[#0C2830] text-[#E8F0F2] placeholder:text-[#4A7A84] focus-visible:ring-[#0C90FF]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="gs-message" className="text-[#A8C5CC]">{t.message}</Label>
              <Textarea
                id="gs-message"
                placeholder={t.messagePlaceholder}
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="border-[#1A4550] bg-[#0C2830] text-[#E8F0F2] placeholder:text-[#4A7A84] focus-visible:ring-[#0C90FF]"
              />
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <Button
              type="submit"
              disabled={submitting || !name || !email || !message}
              className="w-full bg-gradient-to-r from-[#1A59FC] to-[#0C90FF] text-white hover:from-[#1550E0] hover:to-[#0A80E8] sm:w-auto sm:self-end"
            >
              {submitting ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Send className="size-4" />
              )}
              {t.send}
            </Button>
          </form>
        )}
      </div>
    </section>
  )
}
