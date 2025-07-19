"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Search, Settings, ExpandIcon as Extensions, FileText } from "lucide-react"

export default function VSCodeWindow() {
  const [activeFile, setActiveFile] = useState("portfolio.js")

  const files = [
    {
      name: "portfolio.js",
      icon: "📄",
      content: `// Welcome to my portfolio! 🚀
// This is where the magic happens ✨

class Developer {
  constructor() {
    this.name = "Geervan";
    this.skills = ["React", "Node.js", "TypeScript", "Python"];
    this.coffeeLevel = "MAXIMUM";
    this.debugMode = true;
  }

  writeCode() {
    while (this.coffeeLevel > 0) {
      console.log("Creating awesome stuff...");
      this.coffeeLevel--;
      
      if (this.debugMode) {
        console.log("// TODO: Fix this later 😅");
      }
    }
    
    return "Another masterpiece completed! 🎉";
  }

  handleBugs(bug) {
    const solutions = [
      "Have you tried turning it off and on again?",
      "It's not a bug, it's a feature!",
      "Works on my machine 🤷‍♂️",
      "Let me Google that real quick..."
    ];
    
    return solutions[Math.floor(Math.random() * solutions.length)];
  }
}

const me = new Developer();
console.log(me.writeCode());

// Fun fact: This portfolio was built with:
// - 47 cups of coffee ☕
// - 23 Stack Overflow visits 📚
// - 156 "why doesn't this work?" moments 🤔
// - 1 rubber duck for debugging 🦆
// - Infinite patience (just kidding, I ran out) 😂

export default me;`,
    },
    {
      name: "secrets.md",
      icon: "📝",
      content: `# Secret Developer Confessions 🤫

## Things I Google Daily:
- "How to center a div"
- "JavaScript array methods"
- "Git commands I forgot again"
- "Why is my code not working"
- "CSS flexbox vs grid (for the 100th time)"

## My Development Process:
1. Write code
2. It doesn't work
3. Panic slightly
4. Google the error
5. Copy solution from Stack Overflow
6. It works!
7. Pretend I knew what I was doing all along

## Debugging Techniques:
- console.log() everything
- Comment out half the code
- Blame the browser
- Restart VS Code
- Take a coffee break
- Ask the rubber duck
- Finally find the missing semicolon

## Code Comments I Actually Write:
- // This shouldn't work but it does
- // Don't touch this, it's magic
- // I have no idea why this fixes it
- // Future me will hate past me for this
- // TODO: Refactor this mess someday

*Remember: If it's stupid but it works, it's not stupid!* 😄`,
    },
    {
      name: "package.json",
      icon: "📦",
      content: `{
  "name": "geervan-portfolio",
  "version": "2.0.0",
  "description": "A developer's journey through code and coffee",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "build": "webpack --mode production",
    "test": "jest --coverage",
    "debug": "console.log('Good luck!')",
    "fix-everything": "rm -rf node_modules && npm install",
    "panic": "git reset --hard HEAD",
    "coffee": "echo 'Brewing coffee...' && sleep 3 && echo 'Ready to code!'"
  },
  "dependencies": {
    "react": "^18.0.0",
    "next": "^14.0.0",
    "coffee": "^999.9.9",
    "stack-overflow": "^1.0.0",
    "rubber-duck": "^1.0.0",
    "patience": "^0.0.1"
  },
  "devDependencies": {
    "imposter-syndrome": "^10.0.0",
    "procrastination": "^5.0.0",
    "perfectionism": "^3.0.0"
  },
  "author": "Geervan <geervan@developer.com>",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/geervan/portfolio/issues",
    "note": "There are no bugs, only features"
  },
  "homepage": "https://geervan.dev",
  "keywords": [
    "developer",
    "portfolio",
    "coffee-powered",
    "bug-free",
    "definitely-not-copied-from-stackoverflow"
  ]
}`,
    },
  ]

  const currentFile = files.find((f) => f.name === activeFile)

  return (
    <div className="h-full bg-[#1e1e1e] text-white flex flex-col">
      {/* VS Code Title Bar */}
      <div className="h-8 bg-[#323233] flex items-center justify-between px-4 text-xs">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-[#007ACC] rounded-sm flex items-center justify-center">
              <span className="text-white text-[8px]">💻</span>
            </div>
            <span className="text-[#cccccc]">Visual Studio Code</span>
          </div>
        </div>
        <div className="text-[#cccccc]">Geervan's Portfolio - VS Code</div>
      </div>

      {/* Menu Bar */}
      <div className="h-8 bg-[#2d2d30] flex items-center px-4 text-xs text-[#cccccc] space-x-4">
        <span className="hover:bg-white/10 px-2 py-1 rounded cursor-pointer">File</span>
        <span className="hover:bg-white/10 px-2 py-1 rounded cursor-pointer">Edit</span>
        <span className="hover:bg-white/10 px-2 py-1 rounded cursor-pointer">View</span>
        <span className="hover:bg-white/10 px-2 py-1 rounded cursor-pointer">Go</span>
        <span className="hover:bg-white/10 px-2 py-1 rounded cursor-pointer">Run</span>
        <span className="hover:bg-white/10 px-2 py-1 rounded cursor-pointer">Terminal</span>
        <span className="hover:bg-white/10 px-2 py-1 rounded cursor-pointer">Help</span>
      </div>

      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-12 bg-[#333333] flex flex-col items-center py-4 space-y-4">
          <FileText className="w-6 h-6 text-white" />
          <Search className="w-6 h-6 text-[#858585]" />
          <Extensions className="w-6 h-6 text-[#858585]" />
          <Settings className="w-6 h-6 text-[#858585]" />
        </div>

        {/* File Explorer */}
        <div className="w-64 bg-[#252526] border-r border-[#3e3e42]">
          <div className="p-2 text-xs text-[#cccccc] font-semibold border-b border-[#3e3e42]">EXPLORER</div>
          <div className="p-2">
            <div className="text-xs text-[#cccccc] font-semibold mb-2">PORTFOLIO</div>
            {files.map((file) => (
              <motion.div
                key={file.name}
                whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                onClick={() => setActiveFile(file.name)}
                className={`flex items-center space-x-2 px-2 py-1 text-xs cursor-pointer rounded ${
                  activeFile === file.name ? "bg-[#37373d]" : ""
                }`}
              >
                <span>{file.icon}</span>
                <span className="text-[#cccccc]">{file.name}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Main Editor */}
        <div className="flex-1 flex flex-col">
          {/* Tabs */}
          <div className="h-8 bg-[#2d2d30] border-b border-[#3e3e42] flex">
            {files.map((file) => (
              <motion.div
                key={file.name}
                whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                onClick={() => setActiveFile(file.name)}
                className={`flex items-center space-x-2 px-4 text-xs cursor-pointer border-r border-[#3e3e42] ${
                  activeFile === file.name ? "bg-[#1e1e1e] text-white" : "text-[#969696]"
                }`}
              >
                <span>{file.icon}</span>
                <span>{file.name}</span>
              </motion.div>
            ))}
          </div>

          {/* Code Editor */}
          <div className="flex-1 bg-[#1e1e1e] p-4 overflow-auto">
            <pre className="text-sm text-[#d4d4d4] font-mono leading-relaxed whitespace-pre-wrap">
              {currentFile?.content}
            </pre>
          </div>

          {/* Status Bar */}
          <div className="h-6 bg-[#007ACC] flex items-center justify-between px-4 text-xs text-white">
            <div className="flex items-center space-x-4">
              <span>Ln 1, Col 1</span>
              <span>JavaScript</span>
              <span>UTF-8</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>🚀 Ready to code!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
