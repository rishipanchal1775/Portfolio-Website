import { useEffect, useState, useRef } from "react"
import useWindowStore from "../../store/windowStore"

export default function Window({ win, app }) {
  const updateWindow = useWindowStore(state => state.updateWindow)
  const closeWindow = useWindowStore(state => state.closeWindow)
  const toggleMaximize = useWindowStore(state => state.toggleMaximize)
  const toggleMinimize = useWindowStore(state => state.toggleMinimize)
  const focusWindow = useWindowStore(state => state.focusWindow)

  const [position, setPosition] = useState({ x: win.x || 150, y: win.y || 100 })
  const positionRef = useRef(position)
  const [size, setSize] = useState({ width: win.width || 600, height: win.height || 400 })
  const sizeRef = useRef(size)
  const [viewport, setViewport] = useState(() => ({
    width: window.innerWidth,
    height: window.innerHeight,
  }))
  const dragging = useRef(false)
  const resizing = useRef(false)
  const resizeStart = useRef(null)
  const resizeDir = useRef(null)
  const dragOffset = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const updateViewport = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight })
    }

    window.addEventListener("resize", updateViewport)
    return () => window.removeEventListener("resize", updateViewport)
  }, [])

  const visibleWidth = Math.min(size.width, Math.max(1, viewport.width - 16))
  const visibleHeight = Math.min(size.height, Math.max(1, viewport.height - 56))
  const visibleX = Math.min(Math.max(position.x, 8), Math.max(8, viewport.width - visibleWidth - 8))
  const visibleY = Math.min(Math.max(position.y, 8), Math.max(8, viewport.height - visibleHeight - 48))

  if (win.isMinimized) return null

  const handlePointerDown = (e) => {
    if (win.isMaximized || e.detail === 2 || e.target.closest("[data-window-control]")) return

    e.preventDefault()
    dragging.current = true
    dragOffset.current = {
      x: e.clientX - visibleX,
      y: e.clientY - visibleY,
    }

    window.addEventListener("pointermove", handlePointerMove)
    window.addEventListener("pointerup", stopDragging)
  }

  const handlePointerMove = (e) => {
    if (!dragging.current) return

    const width = Math.min(size.width, Math.max(1, viewport.width - 16))
    const height = Math.min(size.height, Math.max(1, viewport.height - 56))
    const nextPosition = {
      x: Math.min(Math.max(e.clientX - dragOffset.current.x, 8), Math.max(8, viewport.width - width - 8)),
      y: Math.min(Math.max(e.clientY - dragOffset.current.y, 8), Math.max(8, viewport.height - height - 48)),
    }
    positionRef.current = nextPosition
    setPosition(nextPosition)
  }

  const stopDragging = () => {
    if (!dragging.current) return
    dragging.current = false
    updateWindow(win.id, positionRef.current)
    window.removeEventListener("pointermove", handlePointerMove)
    window.removeEventListener("pointerup", stopDragging)
  }

  const handleResizeStart = (e, direction) => {
    e.stopPropagation()
    if (win.isMaximized) return

    e.preventDefault()
    resizing.current = true
    resizeDir.current = direction
    resizeStart.current = {
      x: visibleX,
      y: visibleY,
      width: visibleWidth,
      height: visibleHeight,
      clientX: e.clientX,
      clientY: e.clientY,
    }

    window.addEventListener("pointermove", handleResizing)
    window.addEventListener("pointerup", stopResizing)
  }

  const handleResizing = (e) => {
    if (!resizing.current || !resizeStart.current) return

    const start = resizeStart.current
    const deltaX = e.clientX - start.clientX
    const deltaY = e.clientY - start.clientY
    const direction = resizeDir.current
    const minWidth = Math.min(300, Math.max(1, viewport.width - 16))
    const minHeight = Math.min(200, Math.max(1, viewport.height - 56))
    const maxWidth = Math.max(1, viewport.width - 16)
    const maxHeight = Math.max(1, viewport.height - 56)

    let width = start.width
    let height = start.height
    let x = start.x
    let y = start.y

    if (direction.includes("right")) width = Math.min(maxWidth, start.width + deltaX)
    if (direction.includes("bottom")) height = Math.min(maxHeight, start.height + deltaY)
    if (direction.includes("left")) {
      width = Math.min(maxWidth, start.width - deltaX)
      x = start.x + (start.width - width)
    }
    if (direction.includes("top")) {
      height = Math.min(maxHeight, start.height - deltaY)
      y = start.y + (start.height - height)
    }

    if (width >= minWidth && height >= minHeight) {
      const nextSize = { width, height }
      const nextPosition = { x, y }
      sizeRef.current = nextSize
      positionRef.current = nextPosition
      setSize(nextSize)
      setPosition(nextPosition)
    }
  }

  const stopResizing = () => {
    if (!resizing.current) return
    resizing.current = false
    resizeStart.current = null
    updateWindow(win.id, { ...sizeRef.current, ...positionRef.current })
    window.removeEventListener("pointermove", handleResizing)
    window.removeEventListener("pointerup", stopResizing)
  }

  return (
    <div
      onPointerDown={() => focusWindow(win.id)}
      className={`
        absolute z-10 flex min-h-0 min-w-0 flex-col overflow-hidden
        border border-gray-400 bg-[#ECE9D8]
        shadow-[inset_1px_1px_0_#fff,inset_-1px_-1px_0_#999]
        ${win.isMaximized ? "left-0 top-0" : ""}
      `}
      style={{
        zIndex: win.zIndex,
        top: win.isMaximized ? 0 : visibleY,
        left: win.isMaximized ? 0 : visibleX,
        width: win.isMaximized ? viewport.width : visibleWidth,
        height: win.isMaximized ? Math.max(1, viewport.height - 48) : visibleHeight,
      }}
    >
      <div
        onPointerDown={handlePointerDown}
        onDoubleClick={() => toggleMaximize(win.id)}
        className="flex shrink-0 touch-none select-none items-center justify-between gap-2 bg-gradient-to-r from-blue-700 to-blue-500 px-2 py-1"
      >
        <div className="flex min-w-0 items-center gap-2">
          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-sm bg-blue-600 shadow-[0_0_1px_white]">
            <img src={win.icon || "/icons/default.png"} alt="" className="h-3 w-2.5" />
          </div>
          <span className="truncate text-sm font-semibold text-white">{win.name}</span>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <button data-window-control onPointerDown={e => e.stopPropagation()} onClick={() => toggleMinimize(win.id)} aria-label={`Minimize ${win.name}`} className="flex h-7 w-7 items-center justify-center sm:h-6 sm:w-6">
            <img src="/icons/minimize.png" alt="" className="h-5 w-5" />
          </button>
          <button data-window-control onPointerDown={e => e.stopPropagation()} onClick={() => toggleMaximize(win.id)} aria-label={win.isMaximized ? `Restore ${win.name}` : `Maximize ${win.name}`} className="flex h-7 w-7 items-center justify-center sm:h-6 sm:w-6">
            <img src={win.isMaximized ? "/icons/restore.png" : "/icons/maximize.png"} alt="" className="h-5 w-5" />
          </button>
          <button data-window-control onPointerDown={e => e.stopPropagation()} onClick={() => closeWindow(win.id)} aria-label={`Close ${win.name}`} className="flex h-7 w-7 items-center justify-center sm:h-6 sm:w-6">
            <img src="/icons/close.png" alt="" className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="flex min-h-0 min-w-0 flex-1 p-1">
        <div className="h-full min-h-0 min-w-0 w-full overflow-auto rounded-sm border border-gray-300 bg-gray-100 p-1 shadow-inner @container">
          {app?.component && <app.component />}
        </div>
      </div>

      <div onPointerDown={e => handleResizeStart(e, "right")} className="absolute bottom-0 right-0 top-8 w-3 touch-none cursor-ew-resize sm:w-2" />
      <div onPointerDown={e => handleResizeStart(e, "bottom")} className="absolute bottom-0 left-0 h-3 w-full touch-none cursor-ns-resize sm:h-2" />
      <div onPointerDown={e => handleResizeStart(e, "bottom-right")} className="absolute bottom-0 right-0 h-4 w-4 touch-none cursor-nwse-resize" />
      <div onPointerDown={e => handleResizeStart(e, "left")} className="absolute bottom-0 left-0 top-8 w-3 touch-none cursor-ew-resize sm:w-2" />
      <div onPointerDown={e => handleResizeStart(e, "top")} className="absolute left-3 right-3 top-0 h-3 touch-none cursor-ns-resize sm:h-2" />
    </div>
  )
}
