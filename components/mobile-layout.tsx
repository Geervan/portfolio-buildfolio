"use client"

import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import StatusBar from "@/components/status-bar"
import MobileHomeScreen from "@/components/mobile-home-screen"
import MobileAppModal from "@/components/mobile-app-modal"
import { apps } from "@/lib/apps-data"

export default function MobileLayout() {
  const [openApp, setOpenApp] = useState<string | null>(null)

  const handleAppOpen = (appId: string) => {
    setOpenApp(appId)
  }

  const handleAppClose = () => {
    setOpenApp(null)
  }

  const currentApp = apps.find((app) => app.id === openApp)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <StatusBar />

      <AnimatePresence mode="wait">
        {openApp && currentApp ? (
          <MobileAppModal key={openApp} app={currentApp} onClose={handleAppClose} />
        ) : (
          <MobileHomeScreen key="home" apps={apps} onAppOpen={handleAppOpen} />
        )}
      </AnimatePresence>
    </div>
  )
}
