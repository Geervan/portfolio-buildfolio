"use client"

import { useState, useEffect } from "react"
import { Wifi, Signal, Battery } from "lucide-react"

export default function StatusBar() {
  const [currentTime, setCurrentTime] = useState("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }))
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 h-6 bg-black/90 flex items-center justify-between px-4 text-white text-xs z-50">
      <div className="flex items-center space-x-1">
        <span>{currentTime}</span>
      </div>

      <div className="flex items-center space-x-2">
        <Signal className="w-3 h-3" />
        <Wifi className="w-3 h-3" />
        <div className="flex items-center space-x-1">
          <Battery className="w-3 h-3" />
          <span>87%</span>
        </div>
      </div>
    </div>
  )
}
