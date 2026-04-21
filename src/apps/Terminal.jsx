import useWindowStore from "../store/windowStore"
import apps from "../data/apps"
import { useState, useEffect, useRef } from "react"
import axios from "axios"

export default function Terminal() {
  const [lines, setLines] = useState([])
  const [input, setInput] = useState("")
  const endRef = useRef(null)
  const initialized = useRef(false)

  const openWindow = useWindowStore(state => state.openWindow)

  const prompt = "C:\\Rishi>"

  // ✅ Prevent double welcome
  useEffect(() => {
    if (initialized.current) return
    initialized.current = true
    printWelcome()
  }, [])

  // ✅ Auto scroll
  useEffect(() => {
    endRef.current?.scrollIntoView()
  }, [lines])

  const addLine = (text) => {
    setLines(prev => [...prev, text])
  }

  const printWelcome = () => {
    addLine("Microsoft Windows XP [Version 5.1.2600]")
    addLine("(C) Copyright 1985-2001 Microsoft Corp.")
    addLine("")
    addLine("Type 'help' to view available commands.")
    addLine("")
  }

  // ================= COMMAND HANDLER =================
  const handleCommand = async (cmd) => {
    const args = cmd.trim().split(" ")
    const base = args[0].toLowerCase()

    switch (base) {

      case "help":
        addLine("Available commands:\n")
        addLine("help       - Show this help")
        addLine("dir        - List directory contents")
        addLine("resume     - Open Resume")
        addLine("projects   - Open Projects")
        addLine("skills     - Open Skills")
        addLine("contact    - Open Contact")
        addLine("open [app] - Open any app")
        addLine("download   - Download resume PDF")
        addLine("clear      - Clear screen\n")

        addLine("Fun commands:") 
        addLine("joke - Programming joke") 
        addLine("fortune - Random quote") 
        addLine("ascii - ASCII art") 
        addLine("matrix - Matrix mode") 
        addLine("hacker - Hacker sim") 
        addLine("weather - Weather info") 
        addLine("music - Play music") 
        addLine("calc - Calculator") 
        addLine("flip - Flip coin") 
        addLine("roll - Roll dice") 
        addLine("motivate - Motivation")
        break

      case "dir":
        addLine("Directory of Portfolio:\n")
        apps.forEach(app => addLine(`📁 ${app.name}`))
        break

      case "clear":
      case "cls":
        setLines([])
        return

      case "date":
        addLine(new Date().toString())
        break

      case "whoami":
        addLine("Rishi Panchal - Web Developer")
        break

      case "resume":
      case "projects":
      case "skills":
      case "contact":
        const found = apps.find(a => a.name.toLowerCase() === base)
        if (found) {
          openWindow(found)
          addLine(`Opening ${found.name}...`)
        }
        break

      case "open":
        const appName = args[1]?.toLowerCase()
        const app = apps.find(a => a.name.toLowerCase() === appName)

        if (app) {
          openWindow(app)
          addLine(`Opening ${app.name}...`)
        } else {
          addLine("App not found")
        }
        break

      case "download":
        const link = document.createElement("a")
        link.href = "/resume.pdf"
        link.download = "Resume.pdf"
        link.click()
        addLine("Downloading resume...")
        break

      case "joke":
        const joke = await axios.get("https://v2.jokeapi.dev/joke/Programming?type=single")
        addLine(joke.data.joke)
        break

      case "fortune":
        const quotes = [
          "Stay hungry, stay foolish.",
          "Code is poetry.",
          "Dream big. Build bigger.",
          "Push limits."
        ]
        addLine(quotes[Math.floor(Math.random() * quotes.length)])
        break

      case "ascii":
        addLine(`
 /\\_/\\  
( o.o ) 
 > ^ <
        `)
        break

      case "flip":
        addLine(Math.random() > 0.5 ? "Heads" : "Tails")
        break

      case "roll":
        addLine("🎲 " + (Math.floor(Math.random() * 6) + 1))
        break

      case "motivate":
        const msgs = [
          "You got this 🚀",
          "Keep building 💻",
          "Never stop learning 🔥"
        ]
        addLine(msgs[Math.floor(Math.random() * msgs.length)])
        break

      case "calc":
        try {
          const result = eval(args.slice(1).join(" "))
          addLine(result.toString())
        } catch {
          addLine("Invalid expression")
        }
        break

      case "matrix":
        runMatrix()
        break

      case "hacker":
        runHacker()
        break

      case "weather":
        try {
          const city = args[1] || "Vadodara"

          const geo = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
          )
          const geoData = await geo.json()

          if (!geoData.results) {
            addLine("City not found")
            break
          }

          const { latitude, longitude, name } = geoData.results[0]

          const weatherRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
          )

          const weather = await weatherRes.json()

          addLine(`📍 ${name}`)
          addLine(`🌤 Temp: ${weather.current_weather.temperature}°C`)
          addLine(`💨 Wind: ${weather.current_weather.windspeed} km/h`)

        } catch {
          addLine("Weather error")
        }
        break

      case "music":
        try {
          if (window.__terminalAudio) {
            window.__terminalAudio.pause()
            window.__terminalAudio.currentTime = 0
            window.__terminalAudio = null
            addLine("Music stopped.")
          } else {
            const audio = new Audio("/music/sample.mpeg")
            audio.loop = true
            audio.play()

            window.__terminalAudio = audio
            addLine("Playing music... 🎵 (type 'music' again to stop)")
          }
        } catch {
          addLine("Music failed to play")
        }
        break

      default:
        addLine(`'${cmd}' is not recognized`)
    }
  }

  // ================= MATRIX =================
  const runMatrix = () => {
    let count = 0
    const interval = setInterval(() => {
      addLine(Math.random().toString(36).substring(2, 10))
      count++
      if (count > 20) clearInterval(interval)
    }, 100)
  }

  // ================= HACKER =================
  const runHacker = () => {
    const texts = [
      "Initializing hack...",
      "Bypassing firewall...",
      "Access granted...",
      "Downloading data...",
      "Completed ✔"
    ]

    let i = 0
    const interval = setInterval(() => {
      addLine(texts[i])
      i++
      if (i >= texts.length) clearInterval(interval)
    }, 500)
  }

  // ================= INPUT =================
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    addLine(prompt + input)
    await handleCommand(input)
    setInput("")
  }

  return (
    <div className="h-full w-full bg-black text-green-400 font-mono text-[12px] p-3 overflow-y-auto">

      {/* OUTPUT */}
      {lines.map((line, i) => (
        <div key={i} className="leading-[1.4]">{line}</div>
      ))}

      {/* INPUT */}
      <form onSubmit={handleSubmit} className="flex items-center mt-1">
        <span className="text-green-300">{prompt}</span>

        <input
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-black text-green-400 outline-none ml-2 flex-1 caret-green-400"
        />
      </form>

      <div ref={endRef} />
    </div>
  )
}