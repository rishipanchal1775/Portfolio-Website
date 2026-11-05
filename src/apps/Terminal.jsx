import { useEffect, useRef, useState } from "react"
import useWindowStore from "../store/windowStore"
import { executeTerminalCommand } from "../utils/terminalCommands"

const PROMPT = "C:\\Rishi>"
const WELCOME_LINES = [
  "Microsoft Windows XP [Version 5.1.2600]",
  "(C) Copyright 1985-2001 Microsoft Corp.",
  "",
  "Type 'help' to view available commands.",
  "",
]

export default function Terminal() {
  const [lines, setLines] = useState(WELCOME_LINES)
  const [input, setInput] = useState("")
  const endRef = useRef(null)
  const openWindow = useWindowStore((state) => state.openWindow)

  useEffect(() => {
    endRef.current?.scrollIntoView()
  }, [lines])

  const addLine = (line) => setLines((currentLines) => [...currentLines, line])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const command = input.trim()
    if (!command) return

    addLine(PROMPT + command)
    await executeTerminalCommand(command, {
      addLine,
      openWindow,
      clearLines: () => setLines([]),
    })
    setInput("")
  }

  return (
    <div className="h-full w-full overflow-y-auto bg-black p-3 font-mono text-[12px] text-green-400">
      {lines.map((line, index) => (
        <div key={`${index}-${line}`} className="leading-[1.4]">{line}</div>
      ))}

      <form onSubmit={handleSubmit} className="mt-1 flex items-center">
        <label htmlFor="terminal-input" className="text-green-300">{PROMPT}</label>
        <input
          id="terminal-input"
          autoFocus
          value={input}
          onChange={(event) => setInput(event.target.value)}
          className="ml-2 flex-1 bg-black text-green-400 outline-none caret-green-400"
        />
      </form>

      <div ref={endRef} />
    </div>
  )
}
