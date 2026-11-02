import { useEffect, useState } from "react"
import useWindowStore from "../../store/windowStore"
import StartMenu from "./StartMenu"

export default function Taskbar({ onLogout }) {
  const windows = useWindowStore(state => state.windows)
  const focusWindow = useWindowStore(state => state.focusWindow)
  const toggleMinimize = useWindowStore(state => state.toggleMinimize)

  const [time, setTime] = useState("")
  const [date, setDate] = useState("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()

      setTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      )

      setDate(
        now.toLocaleDateString([], {
          weekday: "short",
          month: "short",
          day: "numeric",
        })
      )
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

 // ✅ XP BUTTON STYLE (reusable)
  const xpBtn =
    "flex items-center gap-1 px-2 py-[1px] h-[26px] text-[11px] text-white bg-gradient-to-b from-[#3a6fd9] to-[#1f3f8f] border border-t-[#7aa2ff] border-l-[#7aa2ff] border-r-[#0c2c84] border-b-[#0c2c84] shadow-[inset_0_1px_2px_rgba(255,255,255,0.3)] active:border-t-[#0c2c84] active:border-l-[#0c2c84] active:border-r-[#7aa2ff] active:border-b-[#7aa2ff] whitespace-nowrap"

  return (
    <div
      className="absolute bottom-0 left-0 z-50 flex h-12 w-full items-center justify-between gap-1 px-1 sm:px-2
      bg-gradient-to-b from-[#245edb] to-[#0c2c84]
      border-t border-[#7aa2ff]"
    >

      {/* LEFT SIDE */}
      <div className="flex min-w-0 flex-1 items-center gap-2">

        <StartMenu onLogout={onLogout} />

        {/* OPEN WINDOWS */}
        <div className="flex min-w-0 max-w-[65vw] gap-1 overflow-x-auto sm:max-w-none sm:gap-2">

          {windows.map((win) => (
            <button
              key={win.id}
              onClick={() => {
                if (win.isMinimized) {
                  toggleMinimize(win.id)
                } else {
                  focusWindow(win.id)
                }
              }}
              className={xpBtn + " max-w-28 shrink-0"}
            >
              <img src={win.icon} className="w-4 h-3" />
              <span className="truncate max-w-[110px] leading-none">
                {win.name}
              </span>
            </button>
          ))}

        </div>
      </div>

      {/* RIGHT SIDE (SYSTEM TRAY) */}
      <div
        className="flex items-center gap-2 px-2 py-[2px]
        bg-gradient-to-b from-[#3a6fd9] to-[#1f3f8f]
        border border-t-[#7aa2ff] border-l-[#7aa2ff] border-r-[#0c2c84] border-b-[#0c2c84]"
      >

        {/* ICONS */}
        <img src="/icons/browser.png" alt="" className="hidden h-4 w-4 sm:block hover:bg-white/10 hover:backdrop-blur-md rounded" />
        <img src="/icons/volume.png" alt="" className="hidden h-4 w-4 sm:block hover:bg-white/10 hover:backdrop-blur-md rounded" />
        <img src="/icons/battery.png" alt="" className="hidden h-5 w-5 sm:block hover:bg-white/10 hover:backdrop-blur-md rounded" />

        {/* TIME */}
        <div className="ml-1 text-right text-[10px] leading-tight text-white sm:text-[12px]">
          <div>{time}</div>
          <div className="hidden sm:block">{date}</div>
        </div>

      </div>
    </div>
  )
}