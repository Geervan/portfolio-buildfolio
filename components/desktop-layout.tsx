"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Taskbar from "@/components/taskbar"
import Window from "@/components/window"
import AppIcon from "@/components/app-icon"
import NotificationToast from "@/components/notification-toast"
import StartMenu from "@/components/start-menu"
import { apps } from "@/lib/apps-data"
import { Eye } from "lucide-react"

export default function DesktopLayout() {
  const [openWindows, setOpenWindows] = useState<string[]>([])
  const [notifications, setNotifications] = useState<Array<{ id: string; message: string }>>([])
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false)
  const [isShuttingDown, setIsShuttingDown] = useState(false)
  const [viewCount, setViewCount] = useState<number | null>(null);

  const addNotification = (message: string, duration = 5000) => {
    const id = Math.random().toString(36).substr(2, 9)
    setNotifications((prev) => [...prev, { id, message }])
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id))
    }, duration)
  }
  
  // Combined useEffect for all initial actions
  useEffect(() => {
    // Welcome notifications
    const welcomeTimer = setTimeout(() => {
      addNotification("Hey there you're here\nWelcome!!! do explore all the elements and hey have fun!!");
      addNotification("PS. For Mobile Judging an Android is preferred over iPhone,if Still Using iPhone please use Google  and not Chrome")
    }, 1000);

    // Visitor count logic
    const logVisitAndFetchCount = async () => {
      try {
        await fetch('/api/views', { method: 'POST' });
        const response = await fetch('/api/views');
        if (!response.ok) throw new Error('Failed to fetch count');
        const data = await response.json();
        setViewCount(data.count);
      } catch (error) {
        console.error("Failed to update or fetch view count:", error);
      }
    };

    logVisitAndFetchCount();

    // Cleanup the timer when the component unmounts
    return () => clearTimeout(welcomeTimer);
  }, []); // The empty array ensures this runs only once on component mount

  const openApp = (appId: string) => {
    if (!openWindows.includes(appId)) {
      setOpenWindows((prev) => [...prev, appId])
      if (appId === "games" || appId === "for-fun") {
        const app = apps.find((app) => app.id === appId)
        addNotification(`${app?.name} opened`)
      }
    }
    setIsStartMenuOpen(false)
  }

  const closeApp = (appId: string) => {
    setOpenWindows((prev) => prev.filter((id) => id !== appId))
  }

  const bringToFront = (appId: string) => {
    setOpenWindows((prev) => [...prev.filter((id) => id !== appId), appId])
  }

  const handleShutdown = () => {
    setIsShuttingDown(true)
    setTimeout(() => {
      window.close()
      document.body.innerHTML =
        '<div style="background: #000; color: #fff; display: flex; align-items: center; justify-content: center; height: 100vh; font-size: 24px;">System Shutdown</div>'
    }, 2000)
  }

  const handleRestart = () => {
    addNotification("🔄 Restarting... Just kidding! This is a portfolio, not a real OS 😄")
    setIsStartMenuOpen(false)
  }

  if (isShuttingDown) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center text-white">
        <div className="text-2xl mb-4">Shutting down...</div>
        <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  const professionalApps = apps.filter((app) =>
    ["resume", "projects", "skills", "gallery", "vscode", "geervan", "terminal", "email","github","linkedin","help"].includes(app.id),
  )
  const funApps = apps.filter((app) => ["hobbies","games", "for-fun", "easter-egg", "messages", "recycle-bin"].includes(app.id))

  return (
    <div
      className="h-[100dvh] w-screen flex flex-col relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
      onClick={() => setIsStartMenuOpen(false)}
    >
      {/* Main Desktop Area that fills the space above the taskbar */}
      <div className="flex-1 relative">
        
        {/* Animated Backgrounds */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-purple-400/20 rounded-full"
              animate={{ x: [0, Math.random() * window.innerWidth], y: [0, Math.random() * window.innerHeight], scale: [0, 1.5, 0] }}
              transition={{ duration: Math.random() * 10 + 10, repeat: Number.POSITIVE_INFINITY, delay: Math.random() * 5 }}
              style={{ left: Math.random() * window.innerWidth, top: Math.random() * window.innerHeight }}
            />
          ))}
          {/* Orbs */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-32 h-32 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-xl"
              animate={{ x: [0, 100, -100, 0], y: [0, -100, 100, 0], scale: [1, 1.2, 0.8, 1] }}
              transition={{ duration: Math.random() * 20 + 15, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              style={{ left: Math.random() * window.innerWidth, top: Math.random() * window.innerHeight }}
            />
          ))}
        </div>
        
        {/* Wallpaper Text & Avatar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="absolute inset-0 flex flex-col items-center pt-32 pointer-events-none select-none z-0"
        >
          <img 
            src="/ai.png"
            alt="Geervan's Avatar"
            className="w-36 h-36 bg-gradient-to-br from-purple-500 to-cyan-800 rounded-3xl mx-auto flex items-center justify-center overflow-hidden border-4 border-purple-400/50 shadow-lg object-cover"
          />
          <h1 className="text-4xl md:text-5xl font-bold text-white/80 shadow-lg mt-6">
            Welcome to Geervan's Portfolio
          </h1>
          <p className="mt-4 text-lg md:text-xl font-light text-purple-300/70 italic">
            "Feel free to look around. Just don't break anything, I just fixed the CSS."
          </p>
          <p className="mt-2 text-sm md:text-sm font-light text-purple-300/70 italic">
            "Centering a div is indeed pretty hard even with vibe coding ☠️"
          </p>
        </motion.div>

        {/* Desktop App Icons */}
        <div className="absolute top-4 left-4 p-4 z-10">
          <div className="grid grid-cols-2 gap-4 w-fit">
            {professionalApps.map((app, index) => (
              <motion.div key={app.id} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.1 }} whileHover={{ scale: 1.1, rotate: 5 }}>
                <AppIcon app={app} onClick={() => openApp(app.id)} isDesktop={true} />
              </motion.div>
            ))}
          </div>
        </div>
        <div className="absolute top-4 right-4 p-4 z-10">
          <div className="grid grid-cols-1 gap-6">
            {funApps.slice(0, 2).map((app, index) => (
              <motion.div key={app.id} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: (professionalApps.length + index) * 0.1 }} whileHover={{ scale: 1.1, rotate: -5 }}>
                <AppIcon app={app} onClick={() => openApp(app.id)} isDesktop={true} />
              </motion.div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-20 right-4 p-4 z-10">
          <div className="grid grid-cols-1 gap-4">
            {funApps.slice(2).map((app, index) => (
              <motion.div key={app.id} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: (professionalApps.length + 2 + index) * 0.1 }} whileHover={{ scale: 1.1, rotate: 10 }}>
                <AppIcon app={app} onClick={() => openApp(app.id)} isDesktop={true} />
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Visitor Count Display */}
        <div className="fixed bottom-14 left-1/2 -translate-x-1/2 z-[9990]">
          <AnimatePresence>
            {viewCount !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center space-x-2 bg-black/30 backdrop-blur-sm text-white text-sm px-3 py-1.5 rounded-full border border-white/10"
              >
                <Eye className="w-4 h-4 text-purple-300" />
                <span>#{viewCount.toLocaleString()} Viewer</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Windows and Start Menu */}
        <AnimatePresence>
          {openWindows.map((windowId, index) => {
            const app = apps.find((a) => a.id === windowId)
            if (!app) return null
            return <Window key={windowId} app={app} onClose={() => closeApp(windowId)} onFocus={() => bringToFront(windowId)} zIndex={1000 + index} onOpenApp={openApp} onShutdown={handleShutdown} />
          })}
        </AnimatePresence>
        <AnimatePresence>
          {isStartMenuOpen && ( <StartMenu onClose={() => setIsStartMenuOpen(false)} onAppClick={openApp} onShutdown={handleShutdown} onRestart={handleRestart} apps={apps} /> )}
        </AnimatePresence>
      </div>

      {/* Notifications */}
      <div className="fixed top-4 right-4 z-[9999] space-y-2">
        <AnimatePresence>
          {notifications.map((notification) => (
            <NotificationToast key={notification.id} message={notification.message} />
          ))}
        </AnimatePresence>
      </div>

      {/* Taskbar */}
      <div className="flex-shrink-0">
        <Taskbar
          openWindows={openWindows}
          apps={apps}
          onAppClick={openApp}
          onStartClick={() => setIsStartMenuOpen(!isStartMenuOpen)}
          isStartMenuOpen={isStartMenuOpen}
        />
      </div>
    </div>
  );
}