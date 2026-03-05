"use client"

import { Upload, Loader2 } from "lucide-react"
import { useState } from "react"

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
import { createShoe, uploadImage } from "@/lib/api"
import { useFormCooldown } from "@/lib/hooks/use-form-cooldown"
import { useLanguage } from "@/lib/language-context"
import { addOwnedShoe } from "@/lib/owned-shoes"
import { provinces } from "@/lib/translations"

type FormBodyProps = {
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

function UploadFormBody({
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
        <DialogTitle className="font-mono">{t.uploadTitle}</DialogTitle>
        <DialogDescription>{t.uploadDescription}</DialogDescription>
      </DialogHeader>
      <form
        onSubmit={(e) => void onSubmit(e)}
        aria-busy={submitting}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col gap-2">
          <Label htmlFor="upload-title">{t.title}</Label>
          <Input
            id="upload-title"
            placeholder={t.titlePlaceholder}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="upload-size">{t.size}</Label>
            <Input
              id="upload-size"
              placeholder={t.sizePlaceholder}
              value={size}
              onChange={(e) => setSize(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="upload-province">{t.province}</Label>
            <Select value={province} onValueChange={setProvince} required>
              <SelectTrigger id="upload-province" className="w-full">
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
            inputId="upload-file"
            fileName={fileName}
            onFileSelected={onFileSelected}
            dropzoneText={t.dropzoneText}
            dropzoneHint={t.dropzoneHint}
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
            {submitting ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Upload className="size-4" />
            )}
            {t.uploadButton}
          </Button>
        </DialogFooter>
      </form>
    </>
  )
}

type UploadModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export function UploadModal({ open, onOpenChange, onSuccess }: UploadModalProps) {
  const { t } = useLanguage()
  const [file, setFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [title, setTitle] = useState("")
  const [size, setSize] = useState("")
  const [province, setProvince] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { coolingDown, startCooldown } = useFormCooldown()

  const reset = () => {
    setTitle("")
    setSize("")
    setProvince("")
    setFile(null)
    setFileName(null)
    setError(null)
  }

  const handleFileSelected = (picked: File) => {
    setFile(picked)
    setFileName(picked.name)
  }

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      let imageUrl: string | undefined
      if (file) imageUrl = await uploadImage(file)
      const shoe = await createShoe({ title, size, province, image: imageUrl })
      addOwnedShoe(shoe.id)
      reset()
      onOpenChange(false)
      onSuccess?.()
    } catch {
      setError(t.errorSubmitListing)
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
      <DialogContent className="sm:max-w-lg">
        <UploadFormBody
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
