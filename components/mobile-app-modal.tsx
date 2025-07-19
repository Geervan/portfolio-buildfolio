"use client"

import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import AppContent from "@/components/app-content"

interface MobileAppModalProps {
  app: {
    id: string
    name: string
    icon: string
    color: string
  }
  onClose: () => void
}

export default function MobileAppModal({ app, onClose }: MobileAppModalProps) {
  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="fixed inset-0 bg-slate-900 z-40 overflow-y-auto"
      style={{ height: "100vh" }}
    >
      {/* App Header */}
      <div className="h-16 bg-black/20 border-b border-white/10 flex items-center px-4 mt-6">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-4"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </motion.button>

        <div className="flex items-center space-x-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-lg"
            style={{ backgroundColor: app.color }}
          >
            {app.icon}
          </div>
          <span className="text-white text-lg font-medium">{app.name}</span>
        </div>
      </div>

      {/* App Content */}
      <div className="flex-1 overflow-auto" style={{ height: "calc(100vh - 88px)" }}>
        <AppContent app={app} isMobile={true} />
      </div>
    </motion.div>
  )
}
