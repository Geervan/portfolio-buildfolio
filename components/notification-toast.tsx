"use client"

import { motion } from "framer-motion"

interface NotificationToastProps {
  message: string
}

export default function NotificationToast({ message }: NotificationToastProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 300, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.8 }}
      className="bg-black/90 backdrop-blur-xl border border-white/20 rounded-lg p-4 text-white text-sm shadow-2xl max-w-xs"
    >
      <div className="flex items-start space-x-3">
        <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-xs font-bold">G</div>
        <div className="flex-1">
          <div className="font-medium text-xs text-gray-300 mb-1">Geervan's Security I think</div>
          <div>{message}</div>
        </div>
      </div>
    </motion.div>
  )
}
