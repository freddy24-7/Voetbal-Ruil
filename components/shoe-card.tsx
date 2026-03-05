"use client"

import React from "react"
import { MapPin } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/lib/language-context"

type ShoeCardProps = {
  shoe: {
    id: number
    title: string
    province: string
    size: string
    image?: string
  }
  onContactClick: () => void
}

export function ShoeCard({ shoe, onContactClick }: ShoeCardProps) {
  const { t } = useLanguage()

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
          <Badge className="absolute top-3 right-3 bg-[#0A3038]/80 text-[#E8F0F2] backdrop-blur-sm hover:bg-[#0A3038]/90">
            {t.size} {shoe.size}
          </Badge>
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
