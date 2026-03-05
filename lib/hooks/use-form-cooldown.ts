import { useEffect, useRef, useState } from "react"

export function useFormCooldown(durationMs = 8000) {
  const [coolingDown, setCoolingDown] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current)
    },
    []
  )

  const startCooldown = () => {
    if (timer.current) clearTimeout(timer.current)
    setCoolingDown(true)
    timer.current = setTimeout(() => setCoolingDown(false), durationMs)
  }

  return { coolingDown, startCooldown }
}
