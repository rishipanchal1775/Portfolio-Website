import { useState, useRef } from "react"
import useWindowStore from "../../store/windowStore"

export default function Window({ win, app }) {
  const updateWindow = useWindowStore(state => state.updateWindow)
  const closeWindow = useWindowStore(state => state.closeWindow)
  const toggleMaximize = useWindowStore(state => state.toggleMaximize)
  const toggleMinimize = useWindowStore(state => state.toggleMinimize)
  const focusWindow = useWindowStore(state => state.focusWindow)

  const [position, setPosition] = useState({
    x: win.x || 150,
    y: win.y || 100
  })
  const dragging = useRef(false)
  const offset = useRef({ x: 0, y: 0 })

  const [size, setSize] = useState({ width: win.width || 600, height: win.height || 400 })
  const resizing = useRef(false)
  const resizeDir = useRef(null)


  if (win.isMinimized) return null

  // 🟢 START DRAG
  const handleMouseDown = (e) => {
    if (win.isMaximized) return

    if (e.detail === 2) return

    dragging.current = true

    offset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseup", handleMouseUp)
  }

  // 🟢 DRAG MOVE
  const handleMouseMove = (e) => {
    if (!dragging.current) return

    setPosition({
      x: e.clientX - offset.current.x,
      y: e.clientY - offset.current.y,
    })
  }

  // 🟢 STOP DRAG
  const handleMouseUp = () => {
    dragging.current = false

    updateWindow(win.id, {
      x: position.x,
      y: position.y
    })

    window.removeEventListener("mousemove", handleMouseMove)
    window.removeEventListener("mouseup", handleMouseUp)
  }

  // 🟢 RESIZE START
  const handleResizeStart = (e, dir) => {
    e.stopPropagation()
    if (win.isMaximized) return

    resizing.current = true
    resizeDir.current = dir

    window.addEventListener("mousemove", handleResizing)
    window.addEventListener("mouseup", stopResizing)
  }

  // 🟢 RESIZING
  const handleResizing = (e) => {
    if (!resizing.current) return

    const { width, height } = size
    const { x, y } = position

    let newWidth = width
    let newHeight = height
    let newX = x
    let newY = y

    if (resizeDir.current.includes("right")) {
      newWidth = e.clientX - x
    }

    if (resizeDir.current.includes("bottom")) {
      newHeight = e.clientY - y
    }

    if (resizeDir.current.includes("left")) {
      newWidth = width + (x - e.clientX)
      newX = e.clientX
    }

    if (resizeDir.current.includes("top")) {
      newHeight = height + (y - e.clientY)
      newY = e.clientY
    }

    if (newWidth > 300 && newHeight > 200) {
      setSize({ width: newWidth, height: newHeight })
      setPosition({ x: newX, y: newY })
    }
  }

  // 🟢 STOP RESIZE
  const stopResizing = () => {
    resizing.current = false

    updateWindow(win.id, {
      width: size.width,
      height: size.height,
      x: position.x,
      y: position.y
    })

    window.removeEventListener("mousemove", handleResizing)
    window.removeEventListener("mouseup", stopResizing)
  }

  return (
    <div
      onMouseDown={() => focusWindow(win.id)}
      className={`
        absolute flex flex-col
        bg-[#ECE9D8]
        border border-gray-400
        shadow-[inset_1px_1px_0_#fff,inset_-1px_-1px_0_#999]
        overflow-hidden

        ${win.isMaximized
          ? "top-0 left-0 w-full h-full"
          : ""}
      `}
      style={{
        zIndex: win.zIndex,
        ...(win.isMaximized
          ? {}
          : {
            top: position.y,
            left: position.x,
            width: size.width,
            height: size.height,
          }),
      }}
    >

      {/* 🔵 TITLE BAR */}
      <div
        onMouseDown={handleMouseDown}
        onDoubleClick={() => toggleMaximize(win.id)}
        className="flex items-center justify-between px-2 py-1 bg-gradient-to-r from-blue-700 to-blue-500 cursor-move"
      >
        {/* LEFT: ICON + TITLE */}
        <div className="flex items-center gap-2">

          {/* ICON BOX */}
          <div className="w-5 h-5 bg-blue-600 flex items-center justify-center rounded-sm shadow-[0_0_1px_white]">
            <img
              src={win.icon || "/icons/default.png"}
              className="w-2.5 h-3"
            />
          </div>

          <span className="text-white text-sm font-semibold">
            {win.name}
          </span>

        </div>

        {/* RIGHT BUTTONS */}
        <div className="flex items-center gap-1">

          <img
            src="/icons/minimize.png"
            onClick={() => toggleMinimize(win.id)}
            className="w-5 h-5 cursor-pointer hover:brightness-75"
          />

          <img
            src={win.isMaximized ? "/icons/restore.png" : "/icons/maximize.png"}
            onClick={() => toggleMaximize(win.id)}
            className="w-5 h-5 cursor-pointer hover:brightness-75"
          />

          <img
            src="/icons/close.png"
            onClick={() => closeWindow(win.id)}
            className="w-5 h-5 cursor-pointer hover:brightness-75"
          />

        </div>
      </div>

      {/* RESIZE HANDLES */}
      <div onMouseDown={(e) => handleResizeStart(e, "right")} className="absolute top-0 right-0 w-2 h-full cursor-ew-resize" />
      <div onMouseDown={(e) => handleResizeStart(e, "bottom")} className="absolute bottom-0 left-0 h-2 w-full cursor-ns-resize" />
      <div onMouseDown={(e) => handleResizeStart(e, "bottom-right")} className="absolute bottom-0 right-0 w-3 h-3 cursor-nwse-resize" />
      <div onMouseDown={(e) => handleResizeStart(e, "left")} className="absolute top-0 left-0 w-2 h-full cursor-ew-resize" />
      <div onMouseDown={(e) => handleResizeStart(e, "top")} className="absolute top-0 left-0 w-full h-2 cursor-ns-resize" />

      {/* 📦 CONTENT AREA */}
      <div className="flex-1 p-1 bg-[#ECE9D8] min-h-5">

        <div className="w-full h-full bg-gray-100 border border-gray-300 rounded-sm p-1 overflow-y-auto shadow-inner">

          {app?.component && <app.component />}

        </div>

      </div>

    </div>
  )
}