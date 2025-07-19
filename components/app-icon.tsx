"use client"

import { motion } from "framer-motion"

interface AppIconProps {
  app: {
    id: string
    name: string
    icon: string
    color: string
  }
  onClick: () => void
  isDesktop: boolean
}

export default function AppIcon({ app, onClick, isDesktop }: AppIconProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`group flex flex-col items-center space-y-1 p-2 rounded-lg hover:bg-white/10 transition-colors ${
        isDesktop ? "w-20" : "w-16"
      }`}
    >
      <div
        className={`${isDesktop ? "w-12 h-12" : "w-10 h-10"} rounded-xl flex items-center justify-center text-xl shadow-lg border border-white/20`}
        style={{ backgroundColor: app.color }}
      >
        {app.icon}
      </div>
      <span className="text-white text-xs font-medium text-center leading-tight group-hover:text-blue-200 transition-colors max-w-full ">
        {app.name}
      </span>
    </motion.button>
  )
}
