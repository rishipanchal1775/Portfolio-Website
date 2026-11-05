import apps, { getAppByName } from "../data/apps"
import profile from "../data/profile"
import { calculate } from "./calculate"

const pick = (items) => items[Math.floor(Math.random() * items.length)]

function runMatrix(addLine) {
  let count = 0
  const interval = setInterval(() => {
    addLine(Math.random().toString(36).substring(2, 10))
    count += 1
    if (count > 20) clearInterval(interval)
  }, 100)
}

function runHacker(addLine) {
  const messages = [
    "Initializing hack...",
    "Bypassing firewall...",
    "Access granted...",
    "Downloading data...",
    "Completed ✔",
  ]
  let index = 0
  const interval = setInterval(() => {
    addLine(messages[index])
    index += 1
    if (index >= messages.length) clearInterval(interval)
  }, 500)
}

export async function executeTerminalCommand(command, { addLine, openWindow, clearLines }) {
  const args = command.trim().split(/\s+/)
  const commandName = args[0].toLowerCase()

  switch (commandName) {
    case "help":
      [
        "Available commands:",
        "help       - Show this help",
        "dir        - List directory contents",
        "resume     - Open Resume",
        "projects   - Open Projects",
        "skills     - Open Skills",
        "contact    - Open Contact",
        "open [app] - Open any app",
        "download   - Download resume PDF",
        "clear      - Clear screen",
        "",
        "Fun commands:",
        "joke - Programming joke",
        "fortune - Random quote",
        "ascii - ASCII art",
        "matrix - Matrix mode",
        "hacker - Hacker sim",
        "weather - Weather info",
        "music - Play music",
        "calc - Calculator",
        "flip - Flip coin",
        "roll - Roll dice",
        "motivate - Motivation",
      ].forEach(addLine)
      break

    case "dir":
      addLine("Directory of Portfolio:")
      apps.forEach((app) => addLine(`📁 ${app.name}`))
      break

    case "clear":
    case "cls":
      clearLines()
      break

    case "date":
      addLine(new Date().toString())
      break

    case "whoami":
      addLine(`${profile.name} - ${profile.title}`)
      break

    case "resume":
    case "projects":
    case "skills":
    case "contact": {
      const app = getAppByName(commandName)
      if (app) {
        openWindow(app)
        addLine(`Opening ${app.name}...`)
      }
      break
    }

    case "open": {
      const app = getAppByName(args[1])
      if (!app) {
        addLine("App not found")
        break
      }
      openWindow(app)
      addLine(`Opening ${app.name}...`)
      break
    }

    case "download": {
      const link = document.createElement("a")
      link.href = "/resume.pdf"
      link.download = "Resume.pdf"
      link.click()
      addLine("Downloading resume...")
      break
    }

    case "joke":
      try {
        const response = await fetch("https://v2.jokeapi.dev/joke/Programming?type=single")
        if (!response.ok) throw new Error("Request failed")
        const joke = await response.json()
        addLine(joke.joke || "Could not load a joke")
      } catch {
        addLine("Could not load a joke")
      }
      break

    case "fortune":
      addLine(pick(["Stay hungry, stay foolish.", "Code is poetry.", "Dream big. Build bigger.", "Push limits."]))
      break

    case "ascii":
      addLine("\n /\\_/\\  \n( o.o ) \n > ^ <\n")
      break

    case "flip":
      addLine(Math.random() > 0.5 ? "Heads" : "Tails")
      break

    case "roll":
      addLine(`🎲 ${Math.floor(Math.random() * 6) + 1}`)
      break

    case "motivate":
      addLine(pick(["You got this 🚀", "Keep building 💻", "Never stop learning 🔥"]))
      break

    case "calc":
      try {
        addLine(String(calculate(args.slice(1).join(" "))))
      } catch {
        addLine("Invalid expression")
      }
      break

    case "matrix":
      runMatrix(addLine)
      break

    case "hacker":
      runHacker(addLine)
      break

    case "weather":
      try {
        const city = args.slice(1).join(" ") || "Vadodara"
        const geocodingResponse = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}`,
        )
        if (!geocodingResponse.ok) throw new Error("Geocoding failed")
        const geocoding = await geocodingResponse.json()
        const location = geocoding.results?.[0]
        if (!location) {
          addLine("City not found")
          break
        }

        const weatherResponse = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current_weather=true`,
        )
        if (!weatherResponse.ok) throw new Error("Weather request failed")
        const weather = await weatherResponse.json()
        addLine(`📍 ${location.name}`)
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
      addLine(`'${command}' is not recognized`)
  }
}
