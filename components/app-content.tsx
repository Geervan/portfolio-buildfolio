"use client"
import { apps } from "@/lib/apps-data";
import ContactModal from "@/components/ContactModal";
import { motion,AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react" // useEffect is added for the new apps
import { 
  Download, 
  Mail, 
  Gamepad2, 
  Trash2, 
  Send, 
  Inbox, 
  Star, 
  Archive,
  Menu,
  X,
  Github,   // Added for the new GitHub app
  Linkedin,
  FileText   // Added for the new LinkedIn app
} from "lucide-react"
import VSCodeWindow from "@/components/vscode-window"
import TerminalWindow from "@/components/terminal-window"
import { Description } from "@radix-ui/react-toast";

interface AppContentProps {
  app: {
    id: string
    name: string
    icon: string
  }
  isMobile?: boolean
  onOpenApp?: (appId: string) => void
  onShutdown?: () => void
}

export default function AppContent({ app, isMobile = false, onOpenApp, onShutdown }: AppContentProps) {
  const [skillLevels, setSkillLevels] = useState({
    design: 70,
    javascript: 60,
    python: 75,
    flutter: 65,
    typescript: 40,
    react: 45,
    nodejs: 50,
    leveragingAI: 100,
  })

  const containerClass = isMobile ? "p-4 space-y-6 h-full" : "p-6 space-y-8 h-full"

  const renderContent = () => {
    switch (app.id) {
      case "terminal":
        return <TerminalWindow onOpenApp={onOpenApp} onShutdown={onShutdown} />
      
      // --- NEW GITHUB APP ---
      case "github":
        // This effect runs once when the component mounts
        useEffect(() => {
          const timer = setTimeout(() => {
            window.open("https://github.com/geervan", "_blank")
            
          }, 1500) // Redirect after 1.5 seconds
          
          return () => clearTimeout(timer) // Cleanup timer on unmount
        }, [])

        return (
          <div className={`${containerClass} flex items-center justify-center text-center`}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white/10 backdrop-blur-xl rounded-lg p-8 space-y-4 border border-purple-500/30 shadow-lg max-w-md"
            >
              <Github className="w-16 h-16 text-white mx-auto" />
              <h2 className="text-2xl font-bold text-white">Redirecting to GitHub...</h2>
              <p className="text-purple-200">Opening Geervan's GitHub profile in a new tab.</p>
              <div className="w-full bg-white/10 rounded-full h-2 mt-4">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.5, ease: "linear" }}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                 
                />
                
              </div>
            </motion.div>
          </div>
        )

      // --- NEW LINKEDIN APP ---
      case "linkedin":
        useEffect(() => {
          const timer = setTimeout(() => {
            window.open("https://www.linkedin.com/in/geervan/", "_blank")
          }, 1500)
          return () => clearTimeout(timer)
        }, [])

        return (
          <div className={`${containerClass} flex items-center justify-center text-center`}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white/10 backdrop-blur-xl rounded-lg p-8 space-y-4 border border-purple-500/30 shadow-lg max-w-md"
            >
              <Linkedin className="w-16 h-16 text-blue-400 mx-auto" />
              <h2 className="text-2xl font-bold text-white">Redirecting to LinkedIn...</h2>
              <p className="text-purple-200">Opening Geervan's LinkedIn profile in a new tab.</p>
              <div className="w-full bg-white/10 rounded-full h-2 mt-4">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.5, ease: "linear" }}
                  className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2 rounded-full"
                />
              </div>
            </motion.div>
          </div>
        )

      case "email":
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    // AnimatePresence should wrap the modal, but the main layout should be outside
    // to prevent the entire email app from unmounting.
    <>
      <div className="h-full bg-white flex relative lg:static">
        {/* Sidebar */}
        <div
          className={`w-64 bg-gray-50 border-r border-gray-200 flex flex-col
                      fixed lg:static inset-y-0 left-0 z-20
                      transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
                      lg:translate-x-0 transition-transform duration-300 ease-in-out`}
        >
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <a href="mailto:geervan99@gmail.com" target="_blank">Get in touch</a>
            </motion.button>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-2 -mr-2"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <div className="flex-1 p-2">
            <div className="space-y-1">
              {[
                { icon: Inbox, label: "Inbox", count: 3, active: true },
                { icon: Star, label: "Starred", count: 0 },
                { icon: Send, label: "Sent", count: 12 },
                { icon: Archive, label: "Archive", count: 45 },
                { icon: Trash2, label: "Trash", count: 2 },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer ${
                    item.active ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                  {item.count > 0 && (
                    <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">{item.count}</span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {isSidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black opacity-50 z-10"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}

        <div className="flex-1 flex flex-col min-w-0 h-full">
          <div className="p-4 border-b border-gray-200 bg-white flex items-center">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden mr-4 p-2 -ml-2 text-gray-600"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="text-lg font-semibold text-gray-900">Inbox (geervan99@gmail.com)</h2>
          </div>

          <div className="flex-1 overflow-y-auto">
            {[
              {
                from: "Results @Buildfolio",
                subject: "Something Exciting for you",
                preview: "Hi Geervan, I came across your portfolio and I'm impressed with your work (👉ﾟヮﾟ)👉...",
                time: "2h ago",
                unread: true,
              },
              { from: "GitHub", subject: "Your repository 'portfolio' received a star!", preview: "Someone starred your repository. Keep up the great work!", time: "5h ago", unread: false },
              { from: "LinkedIn", subject: "You have 3 new connection requests", preview: "People are interested in connecting with you based on your profile...", time: "1d ago", unread: true },
              { from: "Stack Overflow", subject: "Your answer was accepted!", preview: "Congratulations! Your answer to 'How to center a div' was marked as accepted.", time: "2d ago", unread: false },
              { from: "Dev Community", subject: "Weekly digest: Top React articles", preview: "Here are the most popular React articles from this week...", time: "3d ago", unread: false },
            ].map((email, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.02)" }}
                className={`p-4 border-b border-gray-100 cursor-pointer ${email.unread ? "bg-blue-50" : "bg-white"}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className={`text-sm truncate ${email.unread ? "font-semibold text-gray-900" : "font-medium text-gray-700"}`}>{email.from}</span>
                      {email.unread && <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>}
                    </div>
                    <h3 className={`text-sm mb-1 truncate ${email.unread ? "font-semibold text-gray-900" : "text-gray-800"}`}>{email.subject}</h3>
                    <p className="text-sm text-gray-600 truncate">{email.preview}</p>
                  </div>
                  <span className="text-xs text-gray-500 ml-4 flex-shrink-0">{email.time}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quick Actions Footer */}
          {/* --- THIS IS THE CORRECTED LINE --- */}
          <div className="p-4 bg-gray-50 border-t border-gray-200">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-600 text-center md:text-left">
                Want to get in touch? Email me directly or use the form:{" "}
                <a href="mailto:geervan99@gmail.com" className="text-blue-600 hover:text-blue-800 font-medium">
                  geervan99@gmail.com
                </a>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm flex items-center space-x-2 w-full md:w-auto"
              >
                <Mail className="w-4 h-4" />
                <span>Send me an Email</span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
      
      {/* The modal is now rendered here, outside the main layout div */}
      <AnimatePresence>
        {isModalOpen && <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
      </AnimatePresence>
    </>
  );
        

      case "gallery":
        return (
          <div className={containerClass}>
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold text-white mb-6"
            >
              📸 Photo Gallery
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[calc(100%-4rem)] overflow-y-auto">
              {[
                { id: 1, title: "Me Chilling in a beautiful place", description: "It was a very awesomely beautifully place near the Arunchal-Assam border",imageUrl: "/me.jpg" },
                { id: 2, title: "Foggy Fog", description: "The time Manipal was in fog, was so cool haha", imageUrl:"/fog.jpg?height=100&width=300" },
                { id: 3, title: "Patrika Gate", description: "Just Jaipur and its beauty hehe", imageUrl:"patrika.jpg?height=100&width=300" },
                { id: 4, title: "The famous dome", description: "Like everybody else this was my first day exploring the college haha",imageUrl:"/dome.jpg" },
              ].map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.02, rotate: 0 }}
                  className="bg-white/10 backdrop-blur-xl rounded-lg border border-purple-500/30 shadow-lg"
                >
                  <div className="aspect-video bg-gradient-to-br from-purple-500 to-pink-500 rounded-t-lg flex items-center justify-center text-white font-bold text-lg cursor-pointer">
                    <img
                      // src={`/me.jpg?height=200&width=300&text=Photo+${item.id}`}
                        src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover rounded-t-lg"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                    <p className="text-purple-200 text-sm">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )

     
case "resume":
  // 1. Create a state to track the loading status of the PDF
  const [isPdfLoading, setIsPdfLoading] = useState(true);

  // 2. A function to call when the iframe has successfully loaded its content
  const handlePdfLoad = () => {
    setIsPdfLoading(false);
  };

  return (
    <div className="h-full flex flex-col p-4 md:p-6">
      {/* Header section (no changes needed here) */}
      <div className="flex justify-between items-center mb-6 flex-shrink-0">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold text-white"
        >
          📄 Resume 
        </motion.h2>
        
        <motion.a
          href="https://www.dropbox.com/scl/fi/9i4aimc45id32llgbcuxg/resume_geervan.pdf?rlkey=oyrxx0p27bfjs58mr22ao2nem&raw=1"
          target="_blank"
          download="Geervan_Resume.pdf"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 shadow-lg"
        >
          <Download className="w-4 h-4" />
          <span>Download/View</span>
        </motion.a>
      </div>

      {/* --- PDF Viewer Section (with loading state) --- */}
      {/* 3. This container needs `relative` positioning to place the loader inside */}
      <div 
        className="flex-1 min-h-0 bg-white rounded-lg shadow-lg overflow-hidden relative overflow-y-auto"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        
        {/* 4. The Loading Indicator: This shows only when `isPdfLoading` is true */}
        {isPdfLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50">
            <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-500 font-medium">Loading Resume...</p>
          </div>
        )}

        {/* 5. The iframe: It calls `handlePdfLoad` when ready and is hidden while loading */}
        <iframe 
          src="https://www.dropbox.com/scl/fi/9i4aimc45id32llgbcuxg/resume_geervan.pdf?rlkey=oyrxx0p27bfjs58mr22ao2nem&raw=1"
          onLoad={handlePdfLoad}
          className={`w-full h-full transition-opacity duration-300 ${
            isPdfLoading ? "opacity-0" : "opacity-100"
          }`}
          title="Resume PDF Viewer" 
          style={{ border: "none" }} 
        />
      </div>
    </div>
  );

      case "projects":
        return (
          <div className={containerClass}>
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold text-white mb-6"
            >
              💼 Projects
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[calc(100%-4rem)] overflow-y-auto">
              {[
                {
                  name: "Class Reminder App ↗️",
                  description: "An App that doesnt let me forget things from my class with constant vibration techniques",
                  tech: ["Flutter", "Dart"],
                  href: "https://github.com/geervan/class_reminder",
                  imageUrl: "/1.jpg",
                },
                {
                  name: "Cosmos Classroom ↗️",
                  description: "Purely Vibe Coded for a vibe coding hackathon, its a 3d space featuring , My College's 3D elements like building trying to create a learning environment",
                  tech: ["Javascript", "TailwindCSS", "Three.js"],
                  href: "https://void-nine-kohl.vercel.app/",
                  imageUrl: "/2.png",
                },
                {
                  name: "Spacebasic Bot ↗️",
                  description: "Made an Automation/Bot which automates the process of calling the housekeeping for my hostel room, more over it also automates accessing my Attendance from my Student Management System",
                  tech: ["Python", "Discord.Py", "Playwright"],
                  href: "https://github.com/Geervan/SpaceBasic-Automation",
                  imageUrl: "/3.jpg",
                },
                {
                  name: "SL-Security ↗️",
                  description: "Contributed to the design and development of a simulated phishing website frontend for an awarenessbased competition.",
                  tech: ["Javascript", "HTML", "CSS"],
                  href: "https://geervan.github.io/SL-security_non_sarcarstic/",
                  imageUrl: "/4.jpg",
                }
              ].map((project, i) => {
                const content = (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.02, rotate: 0 }}
                    className="bg-white/10 backdrop-blur-xl rounded-lg border border-purple-500/30 shadow-lg cursor-pointer"
                  >
                    <div className="h-[200px] bg-gradient-to-br from-purple-500 to-pink-500 rounded-t-lg flex items-center justify-center relative overflow-hidden">
                      { <img
                        src={project.imageUrl}
                        alt={project.name}
                        className="w-full h-full object-cover rounded-t-lg"
                      /> }
                    </div>
                    <div className="p-4 space-y-3">
                      <h3 className="text-white font-semibold text-lg">{project.name}</h3>
                      <p className="text-purple-200 text-sm">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="bg-purple-600/20 text-purple-300 px-2 py-1 rounded text-xs border border-purple-500/30"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );

                return project.href ? (
                  <a
                    key={i}
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    {content}
                  </a>
                ) : (
                  <div key={i}>{content}</div>
                );
              })}
            </div>
          </div>
        );

      case "skills":
        return (
          <div className={containerClass}>
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold text-white mb-6"
            >
              ⚙️ Skills & Technologies
            </motion.h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100%-4rem)] overflow-y-auto pr-2">
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-white">Technical Skills</h3>
                {Object.entries(skillLevels).map(([skill, level], i) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between">
                      <span className="text-white capitalize font-medium">{skill}</span>
                      <span className="text-purple-400">{level}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${level}%` }}
                        transition={{ duration: 1, delay: 0.2 + i * 0.1 }}
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                      />
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={level}
                      onChange={(e) =>
                        setSkillLevels((prev) => ({
                          ...prev,
                          [skill]: Number.parseInt(e.target.value),
                        }))
                      }
                      className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </motion.div>
                ))}
              </div>

              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-white">Certifications & Tools</h3>
                <div className="space-y-4">
                  {[
                     { category: "Tools", items: ["Git", "Vercel","VsCode","CLI","Notion","Google Docs"] },
                    { category: "Postman API Fundamentals Student Expert", items: ["Postman API"] },
                    { category: "Design Tools", items: ["Figma", "Canva"] },
                    { category: "Databases", items: ["MongoDB", "PostgreSQL","MySQL"] },
                   
                    
                  ].map((category, i) => (
                    <motion.div
                      key={category.category}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-white/10 backdrop-blur-xl rounded-lg p-4 border border-purple-500/30"
                    >
                      <h4 className="text-white font-medium mb-3">{category.category}</h4>
                      <div className="flex flex-wrap gap-2">
                        {category.items.map((item) => (
                          <span
                            key={item}
                            className="bg-purple-600/20 text-purple-300 px-2 py-1 rounded text-sm border border-purple-500/30"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      case "hobbies":
        return (
          <div className={containerClass}>
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold text-white mb-6"
            >
              🎨 Hobbies & Interests
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-[calc(100%-4rem)] overflow-y-auto pr-2">
              {[
                { icon: "🎮", title: "Gaming/Sports", desc: "I like playing sports and games, not much into them, but I like doing it occasionally ", color: "from-red-500 to-orange-500" },
                { icon: "🎥", title: "Sitcoms/Anime", desc: "I loveee Sitcoms and Anime,can binge watch, can rewatch, give me something to munch and I'll meet yall after few days or so lol", color: "from-blue-500 to-cyan-500" },
                { icon: "🎵", title: "Music", desc: "Electronic, ambient, and lo-fi music production, also Tesla Coil music slaps hard", color: "from-purple-500 to-pink-500" },
                { icon: "🔨", title: "Building/Fixing", desc: "I like building stuff but not as much as I like opening up stuff and trying to assemble them back, sometimes they work, sometimes Mum's scoldings work 😂", color: "from-green-500 to-emerald-500" },
                { icon: "📱", title: "Doom Scrolling", desc: "Professional Doom Scoller, I dont think so anything more is required", color: "from-yellow-500 to-orange-500" },
                { icon: "😎", title: "Creative sarcarsm", desc: "I always this urge of making something creative and tailor it to my personality, this is shown in almost everything I do, You'll probably notice it in this project at certain places too", color: "from-red-500 to-pink-500" },
              ].map((hobby, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  className="bg-white/10 backdrop-blur-xl rounded-lg p-6 space-y-4 border border-purple-500/30 shadow-lg"
                >


                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${hobby.color} rounded-full flex items-center justify-center text-2xl mx-auto`}
                  >
                    {hobby.icon}
                  </div>
                  <div className="text-center">
                    <h3 className="text-white font-semibold text-lg">{hobby.title}</h3>
                    <p className="text-purple-200 text-sm mt-2">{hobby.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )

      case "games":
        return (
          <div className={`${containerClass} text-center flex items-center justify-center`}>
            <motion.div
              initial={{ scale: 0.8, rotate: -5 }}
              animate={{ scale: 1, rotate: 0 }}
              className="bg-white/10 backdrop-blur-xl rounded-lg p-8 space-y-4 border border-purple-500/30 shadow-lg max-w-md"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
              >
                <Gamepad2 className="w-16 h-16 text-purple-400 mx-auto" />
              </motion.div>
              <h2 className="text-2xl font-bold text-white">🎮 Games</h2>
              <p className="text-purple-200 text-lg">You didn't expect me to put a game here, did you?</p>
              <p className="text-sm text-purple-300">
                This is a portfolio, not Steam! 😄 But I do love gaming in my free time.
              </p>
              <div className="text-4xl">
                <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, delay: 0 }}>🕹️</motion.span>{" "}
                <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, delay: 0.5 }}>🎯</motion.span>{" "}
                <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, delay: 1 }}>🏆</motion.span>
              </div>
            </motion.div>
          </div>
        )

      case "for-fun":
        return (
          <div className={`${containerClass} text-center flex items-center justify-center`}>
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="bg-white/10 backdrop-blur-xl rounded-lg p-6 space-y-4 border border-purple-500/30 shadow-lg max-w-2xl"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3, ease: "linear" }}
                className="text-6xl"
              >
                🎵
              </motion.div>
              <h2 className="text-2xl font-bold text-white">🎉 You've Been Rickrolled!</h2>
              <div className="aspect-video bg-black rounded-lg overflow-hidden border border-purple-500/30">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&start=0"
                  title="Rick Roll"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg"
                ></iframe>
                

              </div>
              <motion.p
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                className="text-purple-200"
              >
                Never gonna give you up! 🕺
              </motion.p>
              <h3 className="text-white">Okay I apologise lmao</h3>
            </motion.div>
            
          </div>
        )

      case "easter-egg":
        return (
          <div className={`${containerClass} flex items-center justify-center`}>
            <motion.div
              initial={{ scale: 0.8, rotate: -5 }}
              animate={{ scale: 1, rotate: 0 }}
              className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-lg p-8 text-center space-y-6 border border-purple-500/30 shadow-lg max-w-md"
            >
              <motion.div
                animate={{ bounce: [0, -20, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                className="text-6xl"
              >
                🎉
              </motion.div>
              <h2 className="text-2xl font-bold text-white">🥚 Easter Egg Found!</h2>
              <h3 className="text-xl font-bold text-white">Congratulations!</h3>
              <p className="text-purple-200">
                Idk why I put this, this is just there for fun lmao, good job exploring the project with interest!!
              </p>
              <div className="text-4xl">
                <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3 }} className="inline-block">😎</motion.span>{" "}
                💻{" "}
                <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }} className="inline-block">🚀</motion.span>
              </div>
            </motion.div>
          </div>
        )
 
      case "recycle-bin":
        return (
          <div className={containerClass}>
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold text-white mb-6 flex items-center space-x-2"
            >
              <Trash2 className="w-6 h-6" />
              <span>Recycle Bin</span>
            </motion.h2>
            <div className="space-y-3 h-[calc(100%-4rem)] overflow-y-auto pr-2">
              {[
                "anxiety.exe", "procrastination.dll", "perfectionism.sys", "imposter-syndrome.bat",
                "old-portfolio-v1.zip", "unused-css-classes.css", "todo-app-attempt-47.js",
                "broken-dreams.txt", "failed-startup-idea.pdf", "why-doesnt-this-work.log",
              ].map((file, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="bg-white/10 backdrop-blur-xl rounded-lg p-4 flex items-center justify-between border border-purple-500/30 shadow-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-red-500/20 rounded flex items-center justify-center">
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </div>
                    <span className="text-white">{file}</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-red-400 hover:text-red-300 px-3 py-1 rounded bg-red-500/10 border border-red-500/30"
                  >
                    Delete Forever
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </div>
        )

      case "geervan":
        return (
          <div className={`${containerClass} h-full flex items-center justify-center`}>
            <div className="max-h-[85vh] overflow-y-auto w-full px-4 py-6 scroll-smooth">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-6 max-w-xl mx-auto"
              >
                {/* <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mx-auto flex items-center justify-center overflow-hidden border-4 border-purple-400/50 shadow-lg"
                > */}
                 <motion.div
  whileHover={{ scale: 1.05, rotate: -2 }} // A slight rotation on hover adds personality
  className="w-36 h-36 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl mx-auto flex items-center justify-center overflow-hidden border-4 border-purple-400/50 shadow-lg"
> 
                  {/* <motion.div 
  whileHover={{ scale: 1.1, rotate: 0 }} // Straightens out on hover
  className="w-28 h-auto p-2 bg-slate-100 rounded-lg shadow-xl mx-auto transform -rotate-6"
> */}

{/* <motion.div
  whileHover={{ scale: 1.05 }}
  className="w-32 h-32 p-1 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mx-auto shadow-lg"
> */}
                  <img src="/suit.jpg" alt="Geervan Avatar" className="w-full h-full object-cover" />
                </motion.div>

                <div>
                  <motion.h2
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl font-bold text-white mb-2"
                  >
                    Hello, I'm Geervan!
                  </motion.h2>
                  <p className="text-purple-200 text-lg">Developer & Creative Problem Solver</p>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white/10 backdrop-blur-xl rounded-lg p-6 text-left space-y-6 border border-purple-500/30 shadow-lg"
                >
                  <h3 className="text-xl font-semibold text-white text-center">My Motto</h3>
                  <p className="text-purple-200 text-base leading-relaxed text-center">
                    "My compiler and I are in a toxic relationship but hey we ship cool stuff."
                  </p>
                  <h2 className="text-2xl text-center font-semibold text-white"> My Achievements</h2>

                  <div className="grid grid-cols-2 gap-4 mt-6">
                    {[
                      { icon: "🚀", text: "9.31 CGPA", desc: "Two Dean's List under my Pocket" },
                      { icon: "💡", text: "Web Dev Team", desc: "Part of the Web Development Team of Google Developer Groups-MUJ" },
                      { icon: "🤝", text: "Technical Team", desc: "Part of the Technical Team of our hostel's beloved App: CampusAdda " },
                      { icon: "💻", text: "Open Source Contributor", desc: "Contributor @GSSoC'24 EXT Finished with an overall Rank: 479" },
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        whileHover={{ scale: 1.1 }}
                        className="text-center bg-white/5 rounded-lg p-3 border border-purple-500/20"
                      >

                        
                  

                        <div className="text-2xl mb-2">{item.icon}</div>
                        <p className="text-white font-medium text-sm">{item.text}</p>
                        <p className="text-purple-300 text-xs mt-1">{item.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-sm shadow-lg text-base"
                >
                  <a href="https://www.linkedin.com/in/geervan/" target="_blank" className="text-sm">Let's Build Something Amazing Together!<br /> Connect with me on linkedin!</a>
                </motion.button>
              </motion.div>
            </div>
          </div>
        );

      case "vscode":
        return <VSCodeWindow />

      case "help":
  // This data structure defines the description for each app.
  // It's linked by the `id` to your main `apps` array.
  const helpContent = [
    {
      id: "geervan",
      description: `The core operating system user. This contains my personal bio, philosophy, and key achievements,basically an About-Me Section`
    },
    {
      id: "email",
      description: "The direct communication protocol. For sending inquiries, feedback, or collaboration proposals directly to me."
    },
    {
      id:"terminal",
      description: " Hey its a developer's website right? so here we have terminal, access profiles,apps all from the cli, its fun trust me! "
    },
    {
      id: "hobbies",
      description: "User enrichment programs. These apps showcase personal interests that fuel creativity and problem-solving skills."
    },
    
    
    {
      id: "resume",
      description: "The official system record. Provides a detailed, downloadable PDF of my professional skills, experience, and education."
    },
    {
      id: "projects",
      description: "The evidence locker. A curated gallery of my work, demonstrating practical application of my technical skills."
    },

    {
      id: "skills",
      description: "The technical specifications. A detailed breakdown of my proficiency in various technologies and programming languages."
    },
    {
      id: "github",
      description: "The source code repository. Provides a direct link to the raw source code and contribution history for my projects."
    },
    {
      id: "linkedin",
      description: "The professional networking interface. Connects to my LinkedIn profile for networking and career-related inquiries."
    },
    {
      id: "games",
      description: "This is just a fun element to add some energy into portfolio and not make it boring like usual ones"
    },

    {
      id: "gallery",
      description: "A few snapshots through my lens which I thought were cool and aesthetic"
    },
    {
      id: "vscode",
      description: "We all bow down to Vs code, so why not include it here to hehe, but this is included here to give a more home screen feel"
    },
   {
      id: "for-fun",
      description: "No comments I apologise already 😂"
    },
    
    {
      id: "recycle-bin",
      description: "System cleanup utility. A humorous collection of discarded ideas, failed experiments, and classic developer frustrations."
    },
  ];

  return (
    // This container creates the "text note" appearance
    <div className="h-full bg-slate-50 text-gray-800 flex flex-col font-mono">
      {/* Header of the note */}
      <div className="p-3 border-b border-slate-300 bg-slate-100 flex-shrink-0">
        <h2 className="text-lg font-semibold text-slate-700 flex items-center space-x-2">
          <FileText className="w-5 h-5" />
          <span>README.md</span>
        </h2>
      </div>

      {/* Scrollable content area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h1 className="text-3xl font-bold text-slate-800">Portfolio Documentation</h1>
          <p className="mt-2 text-slate-600">A guide to the applications and their purpose within this OS-Styled Portfolio. <br />Also for showcasing some of the "useless" apps like "games",the main reason was to add fun in the portfolio to avoid ending up with a boring one <br /> Please read in entirety before judging</p>
        </motion.div>
        
        {/* Mapping over the help content */}
        {helpContent.map((topic, i) => {
          // Find the corresponding app from your main apps array
          const app = apps.find((a) => a.id === topic.id);
          if (!app) return null; // Don't render if app isn't found

          return (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              className="border-t border-slate-200 pt-6"
            >
              <div className="flex items-center space-x-3 mb-3">
                {/* Icon rendering logic that handles all types */}
                <div className="w-7 h-7 flex items-center justify-center">
                  {typeof app.icon === 'function' ? (
                    <app.icon />
                  ) : typeof app.icon === 'string' && app.icon.startsWith('/') ? (
                    <img src={app.icon} alt={app.name} className="w-full h-full" />
                  ) : (
                    <span className="text-2xl">{app.icon}</span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-slate-800">{app.name}</h3>
              </div>
              <p className="text-slate-600 leading-relaxed pl-10">
                {topic.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );

      default:
        return (
          <div className={`${containerClass} flex items-center justify-center`}>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white">Coming Soon...</h2>
              <p className="text-purple-200">This app is still in development!</p>
            </div>
          </div>
        )
    }
  }

  return <div className="h-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">{renderContent()}</div>
}