import { useState } from "react"
import Login from "./components/Auth/Login"
import Desktop from "./components/Desktop/Desktop"

export default function App() {
  const [stage, setStage] = useState(() => {
    try {
      return sessionStorage.getItem("xp_authenticated") === "true" ? "desktop" : "login"
    } catch {
      return "login"
    }
  })
  // login → loading → desktop → shutdown

  // ================= LOGIN =================
  const handleLogin = () => {
    setStage("loading")

    setTimeout(() => {
      const audio = new Audio("/music/login.mp3")
      audio.play()
      try {
        sessionStorage.setItem("xp_authenticated", "true")
      } catch {
        // Continue even when session storage is unavailable.
      }
      setStage("desktop")
    }, 2500)
  }

  // ================= LOGOUT (XP STYLE) =================
  const handleLogout = () => {
    setStage("shutdown")

    // play shutdown sound
    const audio = new Audio("/music/logout.mp3")
    audio.play()

    // after delay go back to login
    setTimeout(() => {
      try {
        sessionStorage.removeItem("xp_authenticated")
      } catch {
        // Continue even when session storage is unavailable.
      }
      setStage("login")
    }, 2500)
  }

  return (
    <div className="h-dvh w-screen overflow-hidden">

      {/* ================= LOGIN ================= */}
      {stage === "login" && (
        <Login onLogin={handleLogin} />
      )}

      {/* ================= LOADING ================= */}
      {stage === "loading" && (
        <div className="w-full h-full bg-[#0a246a] flex flex-col items-center justify-center text-white">

          <div className="text-xl font-semibold mb-4">
            Loading your personal settings...
          </div>

          <div className="w-[200px] h-[6px] bg-[#1f3c88] overflow-hidden rounded">
            <div className="h-full w-[40%] bg-white animate-xpLoader"></div>
          </div>

        </div>
      )}

      {/* ================= DESKTOP ================= */}
      {stage === "desktop" && (
        <div className="w-full h-full animate-fadeIn">
          <Desktop onLogout={handleLogout} />
        </div>
      )}

      {/* ================= SHUTDOWN ================= */}
      {stage === "shutdown" && (
        <div className="w-full h-full bg-[#1f3c88] flex flex-col items-center justify-center text-white">

          <div className="text-xl font-semibold mb-4">
            Saving your settings...
          </div>

          <div className="text-sm text-gray-300">
            Windows is logging off
          </div>

        </div>
      )}

    </div>
  )
}