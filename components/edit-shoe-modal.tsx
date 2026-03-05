"use client"

import { useCallback, useEffect, useState } from "react"
import { ImagePlus, Loader2, Save } from "lucide-react"
import { updateShoe, uploadImage } from "@/lib/api"
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
import type { Shoe } from "@/lib/types"

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
  const [dragActive, setDragActive] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

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

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(e.type === "dragenter" || e.type === "dragover")
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    const picked = e.dataTransfer.files?.[0]
    if (picked) { setFile(picked); setFileName(picked.name) }
  }, [])

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = e.target.files?.[0]
    if (picked) { setFile(picked); setFileName(picked.name) }
  }, [])

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
      setError("Failed to save changes. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-mono">{t.editTitle}</DialogTitle>
          <DialogDescription>{shoe?.title}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
              <Input
                id="edit-size"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>{t.province}</Label>
              <Select value={province} onValueChange={setProvince}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t.selectProvince} />
                </SelectTrigger>
                <SelectContent>
                  {provinces.map((p) => (
                    <SelectItem key={p} value={p}>{p}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label>{t.photo}</Label>
            <label
              htmlFor="edit-file"
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-6 text-center transition-colors ${
                dragActive
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50 hover:bg-muted/50"
              }`}
            >
              <ImagePlus className="mb-2 size-7 text-muted-foreground" />
              {fileName ? (
                <p className="text-sm font-medium text-foreground">{fileName}</p>
              ) : (
                <p className="text-sm text-muted-foreground">{t.dropzoneText}</p>
              )}
              <input
                id="edit-file"
                type="file"
                accept="image/png,image/jpeg"
                className="sr-only"
                onChange={handleFileChange}
              />
            </label>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <DialogFooter>
            <Button
              type="submit"
              disabled={submitting || !title || !size || !province}
              className="w-full bg-gradient-to-r from-[#1A59FC] to-[#0C90FF] text-[#FFFFFF] hover:from-[#1550E0] hover:to-[#0A80E8] sm:w-auto"
            >
              {submitting ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
              {t.editButton}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
