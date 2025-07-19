"use client"

import { motion } from "framer-motion"
import { Power, RotateCcw } from "lucide-react"
import AppIcon from "@/components/app-icon"

interface StartMenuProps {
  onClose: () => void
  onAppClick: (appId: string) => void
  onShutdown: () => void
  onRestart: () => void
  apps: Array<{ id: string; name: string; icon: string; color: string }>
}

export default function StartMenu({ onClose, onAppClick, onShutdown, onRestart, apps }: StartMenuProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="fixed bottom-14 left-2 w-[580px] h-[600px] bg-black/90 backdrop-blur-xl rounded-lg border border-purple-500/30 shadow-2xl z-[9999]"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="p-4 border-b border-purple-500/30">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center overflow-hidden">
            <img src="/me.jpg" alt="Profile" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="text-white font-medium">Geervan</div>
            <div className="text-purple-200 text-sm">Developer</div>
          </div>
        </div>
      </div>

      {/* Pinned Apps */}
      <div className="p-4">
        <div className="text-purple-200 text-sm font-medium mb-3">Pinned</div>
        <div className="grid grid-cols-6 gap-3">
          {apps.map((app) => (
            <motion.div key={app.id} whileHover={{ scale: 1.1, rotate: 5 }} onClick={() => onAppClick(app.id)}>
              <AppIcon app={app} onClick={() => onAppClick(app.id)} isDesktop={false} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recommended */}
      <div className="px-4 pb-4">
        <div className="text-purple-200 text-sm font-medium mb-3">Recommended</div>
        <div className="space-y-2">
          {apps.slice(0, 3).map((app) => (
            <motion.button
              key={app.id}
              whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)", x: 5 }}
              onClick={() => onAppClick(app.id)}
              className="w-full flex items-center space-x-3 p-1 rounded-lg hover:bg-white/10 transition-colors"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-lg"
                style={{ backgroundColor: app.color }}
              >
                {app.icon}
              </div>
              <div className="flex-1 text-left">
                <div className="text-white text-sm font-medium">{app.name}</div>
                <div className="text-purple-200 text-xs">Recently used</div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Power Options */}
      <div className="absolute bottom-4 right-4 flex items-center space-x-2">
        <motion.button
          whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)", scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRestart}
          className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors border border-purple-500/30"
          title="Restart"
        >
          <RotateCcw className="w-5 h-5 text-white" />
        </motion.button>

        <motion.button
          whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)", scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onShutdown}
          className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors border border-purple-500/30"
          title="Shut down"
        >
          <Power className="w-5 h-5 text-white" />
        </motion.button>
      </div>
    </motion.div>
  )
}
