"use client"

import { useState, useEffect } from "react"
import DesktopLayout from "@/components/desktop-layout"
import MobileLayout from "@/components/mobile-layout"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function Portfolio() {
  const [mounted, setMounted] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0078d4] flex items-center justify-center">
        <div className="text-white text-xl">Starting Geervan's Windows...</div>
      </div>
    )
  }

  return <div className="min-h-screen overflow-hidden">{isMobile ? <MobileLayout /> : <DesktopLayout />}</div>
}
