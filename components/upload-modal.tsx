"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { ImagePlus, Upload, Loader2 } from "lucide-react"
import { createShoe, uploadImage } from "@/lib/api"
import { addOwnedShoe } from "@/lib/owned-shoes"
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
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useLanguage } from "@/lib/language-context"
import { provinces } from "@/lib/translations"

type UploadModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export function UploadModal({ open, onOpenChange, onSuccess }: UploadModalProps) {
  const { t } = useLanguage()
  const [dragActive, setDragActive] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [title, setTitle] = useState("")
  const [size, setSize] = useState("")
  const [province, setProvince] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [coolingDown, setCoolingDown] = useState(false)
  const cooldownTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => { if (cooldownTimer.current) clearTimeout(cooldownTimer.current) }, [])

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    const picked = e.dataTransfer.files?.[0]
    if (picked) {
      setFile(picked)
      setFileName(picked.name)
    }
  }, [])

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const picked = e.target.files?.[0]
      if (picked) {
        setFile(picked)
        setFileName(picked.name)
      }
    },
    []
  )

  const reset = () => {
    setTitle("")
    setSize("")
    setProvince("")
    setFile(null)
    setFileName(null)
    setDragActive(false)
    setError(null)
  }

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      let imageUrl: string | undefined
      if (file) {
        imageUrl = await uploadImage(file)
      }
      const shoe = await createShoe({title, size, province, image: imageUrl})
      addOwnedShoe(shoe.id)
      reset()
      onOpenChange(false)
      onSuccess?.()
    } catch {
      setError(t.errorSubmitListing)
      if (cooldownTimer.current) clearTimeout(cooldownTimer.current)
      setCoolingDown(true)
      cooldownTimer.current = setTimeout(() => setCoolingDown(false), 8000)
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
        <DialogHeader>
          <DialogTitle className="font-mono">{t.uploadTitle}</DialogTitle>
          <DialogDescription>{t.uploadDescription}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} aria-busy={submitting} className="flex flex-col gap-4">
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
            <label
              htmlFor="upload-file"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  document.getElementById("upload-file")?.click()
                }
              }}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-8 text-center transition-colors ${
                dragActive
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50 hover:bg-muted/50"
              }`}
            >
              {fileName ? (
                <>
                  <ImagePlus className="mb-2 size-8 text-primary" />
                  <p className="text-sm font-medium text-foreground">{fileName}</p>
                </>
              ) : (
                <>
                  <ImagePlus className="mb-2 size-8 text-muted-foreground" />
                  <p className="text-sm font-medium text-foreground">{t.dropzoneText}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{t.dropzoneHint}</p>
                </>
              )}
              <input
                id="upload-file"
                type="file"
                accept="image/png,image/jpeg"
                className="sr-only"
                onChange={handleFileChange}
              />
            </label>
          </div>

          {error && <p role="alert" aria-live="assertive" className="text-sm text-destructive">{error}</p>}

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
      </DialogContent>
    </Dialog>
  )
}
