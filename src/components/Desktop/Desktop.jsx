import React from 'react'
import DesktopIcons from "./DesktopIcons"
import WindowManager from "../Window/WindowManager"
import useWindowStore from "../../store/windowStore"
import Taskbar from '../Taskbar/Taskbar'

export default function Desktop({ children, onLogout }) {
  const clearSelection = useWindowStore(state => state.clearSelection)

  return (
    <div onClick={(e) => {
      // only clear if clicked directly on desktop (not child)
      if (e.target === e.currentTarget) {
        clearSelection()
      }
    }} className="relative h-dvh w-screen min-h-0 overflow-hidden bg-[url('/wallpapers/background.png')] bg-cover bg-center text-white">

      {/* Icons */}
      <DesktopIcons />
      <WindowManager />
      <Taskbar onLogout={onLogout}/>

      {/* Other content */}
      {children}
    </div>
  )
}
