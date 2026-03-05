"use client"

import { MapPin, Pencil, Trash2 } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useLanguage } from "@/lib/language-context"
import { isOwnedShoe } from "@/lib/owned-shoes"

type ShoeCardProps = {
  shoe: {
    id: number
    title: string
    province: string
    size: string
    image?: string
  }
  onContactClick: () => void
  onEditClick: () => void
  onDeleteClick: () => void
}

export function ShoeCard({ shoe, onContactClick, onEditClick, onDeleteClick }: ShoeCardProps) {
  const { t } = useLanguage()
  const isOwned = isOwnedShoe(shoe.id)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Card className="group overflow-hidden border-border bg-card py-0 transition-shadow hover:shadow-lg">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={shoe.image ?? "/placeholder.jpg"}
            alt={shoe.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <Badge key={shoe.size} className="absolute top-3 right-3 bg-[#0A3038]/80 text-[#E8F0F2] backdrop-blur-sm hover:bg-[#0A3038]/90">
            {t.size} {shoe.size}
          </Badge>
          {isOwned && (
            <div className="absolute top-3 left-3 flex gap-1.5">
              <button
                onClick={onEditClick}
                className="flex size-7 items-center justify-center rounded-md bg-white/90 text-slate-700 shadow transition-colors hover:bg-white"
                aria-label={t.edit}
              >
                <Pencil className="size-3.5" />
              </button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button
                    className="flex size-7 items-center justify-center rounded-md bg-white/90 text-destructive shadow transition-colors hover:bg-white"
                    aria-label={t.delete}
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>{t.deleteConfirmTitle}</AlertDialogTitle>
                    <AlertDialogDescription>{t.deleteConfirmDescription}</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>{t.cancel}</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={onDeleteClick}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      {t.deleteConfirm}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </div>
        <CardContent className="flex flex-col gap-3 p-4">
          <h3 className="text-balance font-mono text-sm font-semibold text-card-foreground">
            {shoe.title}
          </h3>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <MapPin className="size-3.5" />
            <span className="text-xs">
              {t.province}: {shoe.province}
            </span>
          </div>
          <Button
            onClick={onContactClick}
            variant="outline"
            size="sm"
            className="mt-1 w-full border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground"
          >
            {t.contact}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}
