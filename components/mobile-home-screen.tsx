"use client"

import { motion } from "framer-motion"
import AppIcon from "@/components/app-icon"

interface MobileHomeScreenProps {
  apps: Array<{
    id: string
    name: string
    icon: string
    color: string
  }>
  onAppOpen: (appId: string) => void
}

export default function MobileHomeScreen({ apps, onAppOpen }: MobileHomeScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-8 pb-20 px-6 overflow-y-auto"
      style={{ height: "calc(100vh - 24px)" }}
    >
      <div className="grid grid-cols-4 gap-6 mt-8">
        {apps.map((app, index) => (
          <motion.div
            key={app.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <AppIcon app={app} onClick={() => onAppOpen(app.id)} isDesktop={false} />
          </motion.div>
        ))}
      </div>

      {/* Dock */}
      <div className="fixed bottom-4 left-4 right-4 h-16 bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 flex items-center justify-center space-x-6">
        {apps.slice(0, 4).map((app) => (
          <motion.button
            key={app.id}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onAppOpen(app.id)}
            className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
            style={{ backgroundColor: app.color }}
          >
            {app.icon}
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}
