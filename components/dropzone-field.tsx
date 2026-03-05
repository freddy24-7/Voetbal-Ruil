import { ImagePlus } from "lucide-react"
import { useCallback, useState } from "react"

type DropzoneFieldProps = {
  inputId: string
  fileName: string | null
  onFileSelected: (file: File) => void
  dropzoneText: string
  dropzoneHint?: string
  compact?: boolean
}

export function DropzoneField({
  inputId,
  fileName,
  onFileSelected,
  dropzoneText,
  dropzoneHint,
  compact = false,
}: DropzoneFieldProps) {
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(e.type === "dragenter" || e.type === "dragover")
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setDragActive(false)
      const picked = e.dataTransfer.files?.[0]
      if (picked) onFileSelected(picked)
    },
    [onFileSelected]
  )

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const picked = e.target.files?.[0]
      if (picked) onFileSelected(picked)
    },
    [onFileSelected]
  )

  const iconSize = compact ? "size-7" : "size-8"
  const iconColor = !compact && fileName ? "text-primary" : "text-muted-foreground"
  const padding = compact ? "py-6" : "py-8"

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={fileName ?? dropzoneText}
      onClick={() => document.getElementById(inputId)?.click()}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          document.getElementById(inputId)?.click()
        }
      }}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 ${padding} text-center transition-colors ${
        dragActive
          ? "border-primary bg-primary/5"
          : "border-border hover:border-primary/50 hover:bg-muted/50"
      }`}
    >
      <ImagePlus className={`mb-2 ${iconSize} ${iconColor}`} />
      {fileName ? (
        <p className="text-foreground text-sm font-medium">{fileName}</p>
      ) : (
        <>
          <p
            className={`text-sm ${compact ? "text-muted-foreground" : "text-foreground font-medium"}`}
          >
            {dropzoneText}
          </p>
          {!compact && dropzoneHint && (
            <p className="text-muted-foreground mt-1 text-xs">{dropzoneHint}</p>
          )}
        </>
      )}
      <input
        id={inputId}
        type="file"
        accept="image/png,image/jpeg"
        className="sr-only"
        onChange={handleFileChange}
      />
    </div>
  )
}
