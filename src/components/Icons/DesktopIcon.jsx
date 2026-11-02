import { useRef } from "react"
import useWindowStore from "../../store/windowStore"

export default function DesktopIcon({ icon, name, app }) {
  const openWindow = useWindowStore(state => state.openWindow)
  const selectApp = useWindowStore(state => state.selectApp)
  const selectedApp = useWindowStore(state => state.selectedApp)
  const lastTap = useRef({ id: null, time: 0 })

  const isSelected = selectedApp === app.id

  const handleClick = (e) => {
    e.stopPropagation()
    selectApp(app.id)

    // Touch screens do not reliably send a double-click event.
    if (window.matchMedia("(hover: none)").matches) {
      const now = Date.now()
      if (lastTap.current.id === app.id && now - lastTap.current.time < 600) {
        openWindow(app)
        lastTap.current = { id: null, time: 0 }
      } else {
        lastTap.current = { id: app.id, time: now }
      }
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      selectApp(app.id)
      openWindow(app)
    }
  }

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`${name}, double click or tap twice to open`}
      onPointerDown={() => selectApp(app.id)}
      onClick={handleClick}
      onDoubleClick={() => openWindow(app)}
      onKeyDown={handleKeyDown}
      className={`
        group flex w-full flex-col items-center justify-center cursor-pointer select-none
        rounded-xl p-1 transition-all duration-200 touch-manipulation
        sm:w-auto sm:p-2
        ${isSelected
          ? "bg-white/20 backdrop-blur-md ring-1 ring-white/40"
          : "hover:bg-white/15 hover:backdrop-blur-md active:bg-white/20 active:backdrop-blur-md"}
      `}
    >
      <div className="flex h-10 w-10 items-center justify-center sm:h-12 sm:w-12 lg:h-14 lg:w-14">
        <img
          src={icon}
          alt=""
          draggable="false"
          className="pointer-events-none h-8 w-8 object-contain sm:h-10 sm:w-10 lg:h-10 lg:w-10"
        />
      </div>

      <p className={`
        mt-1 max-w-full truncate px-1 text-center text-[10px] transition-colors
        sm:text-xs
        ${isSelected ? "text-white" : "text-white group-hover:text-white"}
      `}>
        {name}
      </p>
    </div>
  )
}
