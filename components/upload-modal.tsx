"use client"

import { useCallback, useState } from "react"
import { ImagePlus, Upload } from "lucide-react"
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
}

export function UploadModal({ open, onOpenChange }: UploadModalProps) {
  const { t } = useLanguage()
  const [dragActive, setDragActive] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)

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
    if (e.dataTransfer.files?.[0]) {
      setFileName(e.dataTransfer.files[0].name)
    }
  }, [])

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.[0]) {
        setFileName(e.target.files[0].name)
      }
    },
    []
  )

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          setFileName(null)
          setDragActive(false)
        }
        onOpenChange(isOpen)
      }}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-mono">{t.uploadTitle}</DialogTitle>
          <DialogDescription>{t.uploadDescription}</DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            setFileName(null)
            onOpenChange(false)
          }}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="upload-title">{t.title}</Label>
            <Input
              id="upload-title"
              placeholder={t.titlePlaceholder}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="upload-size">{t.size}</Label>
              <Input
                id="upload-size"
                placeholder={t.sizePlaceholder}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>{t.province}</Label>
              <Select required>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t.selectProvince} />
                </SelectTrigger>
                <SelectContent>
                  {provinces.map((province) => (
                    <SelectItem key={province} value={province}>
                      {province}
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
                  <p className="text-sm font-medium text-foreground">
                    {fileName}
                  </p>
                </>
              ) : (
                <>
                  <ImagePlus className="mb-2 size-8 text-muted-foreground" />
                  <p className="text-sm font-medium text-foreground">
                    {t.dropzoneText}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {t.dropzoneHint}
                  </p>
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

          <DialogFooter>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#1A59FC] to-[#0C90FF] text-[#FFFFFF] hover:from-[#1550E0] hover:to-[#0A80E8] sm:w-auto"
            >
              <Upload className="size-4" />
              {t.uploadButton}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
