"use client"

import { motion } from "framer-motion"
import { Search, Wifi, Volume2, Battery, ChevronUp } from "lucide-react"
import { useState, useEffect } from "react"

interface TaskbarProps {
  openWindows: string[]
  apps: Array<{ id: string; name: string; icon: string }>
  onAppClick: (appId: string) => void
  onStartClick: () => void
  isStartMenuOpen: boolean
}

export default function Taskbar({ openWindows, apps, onAppClick, onStartClick, isStartMenuOpen }: TaskbarProps) {
  const [currentTime, setCurrentTime] = useState("")
  const [currentDate, setCurrentDate] = useState("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }))
      setCurrentDate(now.toLocaleDateString("en-GB", { month: "numeric", day: "numeric", year: "numeric" }))
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed bottom-0 left-0 right-0 h-12 bg-black/80 backdrop-blur-xl border-t border-white/10 flex items-center justify-between px-2 z-[9998]">
      {/* Start Button */}
      <motion.button
        whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
        whileTap={{ scale: 0.95 }}
        onClick={(e) => {
          e.stopPropagation()
          onStartClick()
        }}
        className={`h-10 w-12 rounded flex items-center justify-center transition-colors ${
          isStartMenuOpen ? "bg-white/20" : ""
        }`}
      >
        <img src="/windows.png" alt="Windows" className="w-6 h-6 brightness-100 invert  " />
      </motion.button>

      {/* Search */}
      <motion.div
        whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
        className="flex items-center space-x-2 bg-white/5 rounded px-3 py-2 ml-2 cursor-text"
      >
        <Search className="w-4 h-4 text-white/70" />
        <span className="text-white/70 text-sm">Type here to search</span>
      </motion.div>

      {/* Task View Button */}
      <motion.button
        whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
        className="h-10 w-12 rounded flex items-center justify-center ml-2"
      >
        <div className="grid grid-cols-2 gap-0.5">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 bg-white/70 rounded-sm" />
          ))}
        </div>
      </motion.button>

      {/* Open Apps */}
      <div className="flex items-center space-x-1 mx-4 flex-1">
        {openWindows.map((windowId) => {
          const app = apps.find((a) => a.id === windowId)
          if (!app) return null

          return (
            <motion.button
              key={windowId}
              whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onAppClick(windowId)}
              className="h-10 px-3 bg-white/10 rounded border-b-2 border-blue-400 flex items-center space-x-2 hover:bg-white/20 transition-colors"
            >
              <span className="text-lg">{app.icon}</span>
              <span className="text-white text-sm font-medium max-w-[100px] truncate">{app.name}</span>
            </motion.button>
          )
        })}
      </div>

      {/* System Tray */}
      <div className="flex items-center space-x-1">
        <motion.button
          whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
          className="h-10 px-2 rounded flex items-center space-x-1"
        >
          <ChevronUp className="w-3 h-3 text-white/70" />
        </motion.button>

        <div className="flex items-center space-x-2 text-white/80 px-2">
          <Wifi className="w-4 h-4" />
          <Volume2 className="w-4 h-4" />
          <Battery className="w-4 h-4" />
        </div>

        {/* Clock */}
        <motion.button
          whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
          className="h-10 px-3 rounded flex flex-col items-center justify-center text-white text-xs leading-tight"
        >
          <div className="font-medium">{currentTime}</div>
          <div className="text-white/70">{currentDate}</div>
        </motion.button>
      </div>
    </div>
  )
}
