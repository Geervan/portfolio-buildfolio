"use client"

import { useState } from "react"
import { motion, type PanInfo } from "framer-motion"
import { X, Minus, Square } from "lucide-react"
import AppContent from "@/components/app-content"

interface WindowProps {
  app: {
    id: string
    name: string
    icon: string
  }
  onClose: () => void
  onFocus: () => void
  zIndex: number
  onOpenApp?: (appId: string) => void
  onShutdown?: () => void
}

export default function Window({ app, onClose, onFocus, zIndex, onOpenApp, onShutdown }: WindowProps) {
  const [isMinimized, setIsMinimized] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)
  const [position, setPosition] = useState({
    x: (window.innerWidth - 900) / 2,
    y: (window.innerHeight - 600) / 2 - 24,
  })
  const [size, setSize] = useState({ width: 900, height: 600 })

  const handleDragEnd = (event: any, info: PanInfo) => {
    if (!isMaximized) {
      setPosition({
        x: Math.max(0, Math.min(window.innerWidth - size.width, position.x + info.offset.x)),
        y: Math.max(0, Math.min(window.innerHeight - size.height - 48, position.y + info.offset.y)),
      })
    }
  }

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized)
  }

  if (isMinimized) return null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{
        opacity: 1,
        scale: 1,
        x: isMaximized ? 0 : position.x,
        y: isMaximized ? 0 : position.y,
        width: isMaximized ? "100vw" : size.width,
        height: isMaximized ? "calc(100dvh - 48px)" : size.height,
      }}
      exit={{ opacity: 0, scale: 0.9 }}
      drag={!isMaximized}
      dragMomentum={false}
      dragElastic={0}
      onDragEnd={handleDragEnd}
      onClick={onFocus}
      className="fixed bg-slate-900 rounded-lg shadow-2xl overflow-hidden border border-purple-500/30"
      style={{ zIndex }}
      dragConstraints={{
        left: 0,
        right: window.innerWidth - size.width,
        top: 0,
        bottom: window.innerHeight - size.height - 48,
      }}
    >
      {/* Window Header */}
      <div
        className="h-8 bg-slate-800 border-b border-purple-500/30 flex items-center justify-between px-4 cursor-move select-none"
        onDoubleClick={toggleMaximize}
      >
        <div className="flex items-center space-x-2">
          <span className="text-sm">{app.icon}</span>
          <span className="text-white text-sm font-medium">{app.name}</span>
        </div>

        <div className="flex items-center space-x-1">
          <motion.button
            whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation()
              setIsMinimized(true)
            }}
            className="w-11 h-7 rounded flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <Minus className="w-3 h-3 text-white" />
          </motion.button>

          <motion.button
            whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation()
              toggleMaximize()
            }}
            className="w-11 h-7 rounded flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <Square className="w-3 h-3 text-white" />
          </motion.button>

          <motion.button
            whileHover={{ backgroundColor: "#ef4444" }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
            className="w-11 h-7 rounded flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors group"
          >
            <X className="w-3 h-3 text-white group-hover:text-white" />
          </motion.button>
        </div>
      </div>

      {/* Window Content */}
      <div className="h-[calc(100%-2rem)] overflow-auto bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <AppContent app={app} onOpenApp={onOpenApp} onShutdown={onShutdown} />
      </div>
    </motion.div>
  )
}
