"use client"

import { Loader2, Save } from "lucide-react"
import { useEffect, useState } from "react"

import { DropzoneField } from "@/components/dropzone-field"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { updateShoe, uploadImage } from "@/lib/api"
import { useFormCooldown } from "@/lib/hooks/use-form-cooldown"
import { useLanguage } from "@/lib/language-context"
import { provinces } from "@/lib/translations"
import type { Shoe } from "@/lib/types"

type FormBodyProps = {
  shoeTitle?: string
  title: string
  setTitle: (v: string) => void
  size: string
  setSize: (v: string) => void
  province: string
  setProvince: (v: string) => void
  fileName: string | null
  onFileSelected: (f: File) => void
  submitting: boolean
  coolingDown: boolean
  error: string | null
  onSubmit: (e: React.SyntheticEvent) => Promise<void>
}

function EditFormBody({
  shoeTitle,
  title,
  setTitle,
  size,
  setSize,
  province,
  setProvince,
  fileName,
  onFileSelected,
  submitting,
  coolingDown,
  error,
  onSubmit,
}: FormBodyProps) {
  const { t } = useLanguage()
  return (
    <>
      <DialogHeader>
        <DialogTitle className="font-mono">{t.editTitle}</DialogTitle>
        <DialogDescription>{shoeTitle}</DialogDescription>
      </DialogHeader>
      <form
        onSubmit={(e) => void onSubmit(e)}
        aria-busy={submitting}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col gap-2">
          <Label htmlFor="edit-title">{t.title}</Label>
          <Input
            id="edit-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="edit-size">{t.size}</Label>
            <Input id="edit-size" value={size} onChange={(e) => setSize(e.target.value)} required />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="edit-province">{t.province}</Label>
            <Select value={province} onValueChange={setProvince}>
              <SelectTrigger id="edit-province" className="w-full">
                <SelectValue placeholder={t.selectProvince} />
              </SelectTrigger>
              <SelectContent>
                {provinces.map((p) => (
                  <SelectItem key={p} value={p}>
                    {p}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Label>{t.photo}</Label>
          <DropzoneField
            inputId="edit-file"
            fileName={fileName}
            onFileSelected={onFileSelected}
            dropzoneText={t.dropzoneText}
            compact
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
            disabled={submitting || coolingDown || !title || !size || !province}
            className="w-full bg-gradient-to-r from-[#1A59FC] to-[#0C90FF] text-[#FFFFFF] hover:from-[#1550E0] hover:to-[#0A80E8] sm:w-auto"
          >
            {submitting ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
            {t.editButton}
          </Button>
        </DialogFooter>
      </form>
    </>
  )
}

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  shoe: Shoe | null
  onSuccess: () => void
}

export function EditShoeModal({ open, onOpenChange, shoe, onSuccess }: Props) {
  const { t } = useLanguage()
  const [title, setTitle] = useState("")
  const [size, setSize] = useState("")
  const [province, setProvince] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { coolingDown, startCooldown } = useFormCooldown()

  useEffect(() => {
    if (shoe) {
      setTitle(shoe.title)
      setSize(shoe.size)
      setProvince(shoe.province)
      setFile(null)
      setFileName(null)
      setError(null)
    }
  }, [shoe])

  const handleFileSelected = (picked: File) => {
    setFile(picked)
    setFileName(picked.name)
  }

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (!shoe) return
    setSubmitting(true)
    setError(null)
    try {
      let image = shoe.image
      if (file) image = await uploadImage(file)
      await updateShoe(shoe.id, { title, size, province, image })
      onOpenChange(false)
      onSuccess()
    } catch {
      setError(t.errorSaveChanges)
      startCooldown()
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <EditFormBody
          shoeTitle={shoe?.title}
          title={title}
          setTitle={setTitle}
          size={size}
          setSize={setSize}
          province={province}
          setProvince={setProvince}
          fileName={fileName}
          onFileSelected={handleFileSelected}
          submitting={submitting}
          coolingDown={coolingDown}
          error={error}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  )
}
