"use client"

import type React from "react"
import { motion } from "framer-motion"
import { useState, useRef, useEffect } from "react"

interface TerminalWindowProps {
  onOpenApp?: (appId: string) => void
  onShutdown?: () => void
}

export default function TerminalWindow({ onOpenApp, onShutdown }: TerminalWindowProps) {
  const [history, setHistory] = useState<
    Array<{ command: string; output: string; type: "command" | "output" | "error" }>
  >([
    { command: "", output: "Geervan Terminal v2.0.1", type: "output" },
    { command: "", output: 'Type "help" for available commands', type: "output" },
    { command: "", output: 'Commands to open apps i.e `cd [appName]` do not work in mobile view, please switch to desktop view', type: "output" },
    
    { command: "", output: "", type: "output" },
  ])

  
  const [currentCommand, setCurrentCommand] = useState("")
  const [isMobile, setIsMobile] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  const availableApps = [
    "gallery",
    "resume",
    "projects",
    "skills",
    "hobbies",
    "vscode",
    "games",
    "for-fun",
    "easter-egg",
    "recycle-bin",
    "geervan",
    "email",
    "help",
  ]

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    if (inputRef.current && !isMobile) {
      inputRef.current.focus()
    }
  }, [isMobile])

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  const processCommand = (cmd: string) => {
    const command = cmd.trim().toLowerCase()
    let output = ""
    let type: "output" | "error" = "output"

    switch (command) {
      case "help":
        output = `Available commands:
  help          - Show this help message
  clear         - Clear terminal screen
  ls            - List available apps
  cd [app]      - Open an app (e.g., cd gallery)
  github        - Open GitHub profile
  linkedin      - Open LinkedIn profile  
  mail          - Open email app
  resume        - Show current date and time
  shutdown      - Shutdown the system
  whoami        - Display user info
  date          - Show current date and time
  
Apps you can open:
  gallery, resume, projects, skills, hobbies, vscode, games, geervan, email`
        break

      case "clear":
        setHistory([
          { command: "", output: "Geervan Terminal v2.0.1", type: "output" },
          { command: "", output: 'Type "help" for available commands', type: "output" },
        ])
        return

      case "ls":
        output = `Available apps:
${availableApps.map((app) => `  ${app}`).join("\n")}

Use 'cd [app-name]' to open an app`
        break

      case "github":
        output = `Opening GitHub profile...`
        setTimeout(() => {
          window.open("https://github.com/geervan", "_blank")
        }, 1000)
        break

      case "linkedin":
        output = `Opening LinkedIn profile...`
        setTimeout(() => {
          window.open("https://linkedin.com/in/geervan", "_blank")
        }, 1000)
        break

       case "resume":
        output = `getting Geervan's resume ...`
        setTimeout(() => {
          window.open("https://www.dropbox.com/scl/fi/9i4aimc45id32llgbcuxg/resume_geervan.pdf?rlkey=oyrxx0p27bfjs58mr22ao2nem&st=6xn9lmat&dl=0", "_blank")
        }, 1000)
        break

      case "mail":
        output = `Opening email app...`
        setTimeout(() => {
          if (onOpenApp) onOpenApp("email")
        }, 500)
        break

      case "help":
        output = `Opening help app...`
        setTimeout(() => {
          if (onOpenApp) onOpenApp("help")
        }, 500)
        break

      case "shutdown":
        output = `Initiating system shutdown...
Goodbye! 👋`
        setTimeout(() => {
          if (onShutdown) onShutdown()
        }, 2000)
        break

      case "whoami":
        output = `geervan@portfolio:~$ 
 Developer | Creative Problem Solver | Sarcarsm Enthusiast ☕
"Turning ideas into interactive experiences, one line of code at a time"`
        break

      case "date":
        output = new Date().toString()
        break

      case "":
        output = ""
        break

      default:
        if (command.startsWith("cd ")) {
          const appName = command.substring(3).trim()
          if (availableApps.includes(appName)) {
            output = `Opening ${appName}...`
            setTimeout(() => {
              if (onOpenApp) onOpenApp(appName)
            }, 500)
          } else {
            output = `cd: ${appName}: No such app found
Use 'ls' to see available apps`
            type = "error"
          }
        } else {
          output = `Command not found: ${command}
Type 'help' for available commands`
          type = "error"
        }
    }

    setHistory((prev) => [
      ...prev,
      { command: `geervan@portfolio:~$ ${cmd}`, output: "", type: "command" },
      { command: "", output, type },
    ])
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (currentCommand.trim()) {
      processCommand(currentCommand)
      setCurrentCommand("")
    }
  }

  const handleTerminalClick = () => {
    if (inputRef.current && !isMobile) {
      inputRef.current.focus()
    }
  }

  const handleQuickCommand = (command: string) => {
    setCurrentCommand(command)
    processCommand(command)
    setCurrentCommand("")
  }

  return (
    <div className="h-full bg-black text-green-400 font-mono text-sm flex flex-col">
      {/* Terminal Header */}
      <div className="bg-gray-800 px-4 py-2 flex items-center space-x-2 border-b border-gray-700">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <span className="text-gray-300 text-xs ml-4">Terminal - geervan@portfolio</span>
      </div>

      {/* Mobile Quick Commands */}
      {isMobile && (
        <div className="bg-gray-900 p-2 border-b border-gray-700">
          <div className="text-xs text-gray-400 mb-2">Quick Commands:</div>
          <div className="flex flex-wrap gap-2">
            {["help", "ls", "whoami", "clear"].map((cmd) => (
              <button
                key={cmd}
                onClick={() => handleQuickCommand(cmd)}
                className="px-2 py-1 bg-gray-700 text-green-400 rounded text-xs hover:bg-gray-600 transition-colors"
              >
                {cmd}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {["cd resume", "cd email", "cd projects", "github"].map((cmd) => (
              <button
                key={cmd}
                onClick={() => handleQuickCommand(cmd)}
                className="px-2 py-1 bg-gray-700 text-green-400 rounded text-xs hover:bg-gray-600 transition-colors"
              >
                {cmd}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Terminal Content */}
      <div
        ref={terminalRef}
        className="flex-1 p-4 overflow-y-auto cursor-text"
        onClick={handleTerminalClick}
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {history.map((entry, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1 }}
            className="mb-1"
          >
            {entry.command && <div className="text-green-400">{entry.command}</div>}
            {entry.output && (
              <div className={`whitespace-pre-line ${entry.type === "error" ? "text-red-400" : "text-gray-300"}`}>
                {entry.output}
              </div>
            )}
          </motion.div>
        ))}

        {/* Current Input Line */}
        <form onSubmit={handleSubmit} className="flex items-center">
          <span className="text-green-400 mr-2 flex-shrink-0">geervan@portfolio:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={currentCommand}
            onChange={(e) => setCurrentCommand(e.target.value)}
            className="flex-1 bg-transparent text-green-400 outline-none caret-green-400 min-w-0"
            autoComplete="off"
            spellCheck={false}
            autoCapitalize="off"
            autoCorrect="off"
            placeholder={isMobile ? "Type command or use buttons above" : ""}
          />
        </form>

        {/* Blinking Cursor */}
        <motion.div
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
          className="inline-block w-2 h-4 bg-green-400 ml-1"
        />
      </div>

      {/* Mobile Virtual Keyboard Helper */}
      {isMobile && (
        <div className="bg-gray-900 p-2 border-t border-gray-700">
          <div className="text-xs text-gray-400 text-center">
            Tap input field above to type commands, or use quick command buttons
          </div>
          
          
        </div>
      )}

      {/* Terminal Footer */}
      <div className="bg-gray-800 px-4 py-1 text-xs text-gray-400 border-t border-gray-700">
        Press Ctrl+C to interrupt | Type 'help' for commands
      </div>
    </div>
  )
}
