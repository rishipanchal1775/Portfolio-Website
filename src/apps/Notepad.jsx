import { useState, useEffect } from "react"

export default function Notepad() {
  const [text, setText] = useState(`Dear Hiring Manager,

I'm excited to apply for the position at your esteemed company. My experience with full stack development, machine learning, and building beautiful web experiences (like this portfolio!) makes me a great fit.

Let's connect!
Best,
Rishi Panchal`)

  const [fileHandle, setFileHandle] = useState(null)
  const [fileName, setFileName] = useState("Untitled.txt")
  const [saved, setSaved] = useState(true)
  const [time, setTime] = useState(new Date())

  // ⏱ clock
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  // 📊 counts
  const chars = text.length
  const words = text.trim() ? text.trim().split(/\s+/).length : 0
  const lines = text.split("\n").length

  // ================= NEW =================
  const handleNew = () => {
    setText("")
    setFileHandle(null)
    setFileName("Untitled.txt")
    setSaved(false)
  }

  // ================= OPEN =================
  const handleOpen = async () => {
    try {
      const [handle] = await window.showOpenFilePicker({
        types: [{ description: "Text Files", accept: { "text/plain": [".txt"] } }],
      })

      const file = await handle.getFile()
      const content = await file.text()

      setText(content)
      setFileHandle(handle)
      setFileName(file.name)
      setSaved(true)
    } catch {}
  }

  // ================= SAVE =================
  const handleSave = async () => {
    try {
      if (!fileHandle) return handleSaveAs()

      const writable = await fileHandle.createWritable()
      await writable.write(text)
      await writable.close()

      setSaved(true)
    } catch {}
  }

  // ================= SAVE AS =================
  const handleSaveAs = async () => {
    try {
      const handle = await window.showSaveFilePicker({
        suggestedName: fileName,
        types: [{ description: "Text Files", accept: { "text/plain": [".txt"] } }],
      })

      const writable = await handle.createWritable()
      await writable.write(text)
      await writable.close()

      setFileHandle(handle)
      setFileName(handle.name || "file.txt")
      setSaved(true)
    } catch {}
  }

  // ================= GENERATE =================
  const generateCover = () => {
    setText(`Dear Hiring Manager,

I am excited to apply for this opportunity. With strong experience in full stack development, I build scalable applications.

Looking forward to contributing.

Best,
Rishi Panchal`)
    setSaved(false)
  }

  const handleChange = (e) => {
    setText(e.target.value)
    setSaved(false)
  }

  return (
    <div className="flex flex-col h-full bg-[#ece9d8] text-black text-[12px]">

      {/* MENU BAR */}
      <div className="px-2 py-[2px] bg-[#d4d0c8] border-b flex gap-4">
        <span>File</span>
        <span>Edit</span>
        <span>Format</span>
        <span>View</span>
        <span>Help</span>
      </div>

      {/* FILE INFO */}
      <div className="flex justify-between px-2 py-[2px] border-b bg-[#ece9d8]">
        <span>User: Rishi Panchal</span>
        <span>{fileName} | {time.toUTCString()}</span>
      </div>

      {/* ACTION BAR */}
      <div className="flex items-center gap-1 px-2 py-1 border-b bg-[#ece9d8]">

        <button onClick={handleNew} className="xp-btn">New</button>
        <button onClick={handleOpen} className="xp-btn">Open...</button>
        <button onClick={handleSave} className="xp-btn">Save</button>
        <button onClick={handleSaveAs} className="xp-btn">Save As...</button>

        <div className="w-px h-5 bg-gray-400 mx-2"></div>

        <button
          onClick={generateCover}
          className="px-2 py-[2px] text-white bg-blue-600 border border-blue-900 text-[11px]"
        >
          Generate Cover Letter
        </button>
      </div>

      {/* TEXT AREA */}
      <textarea
        value={text}
        onChange={handleChange}
        className="flex-1 p-3 font-mono text-[12px] outline-none resize-none bg-white border border-gray-400"
      />

      {/* STATUS BAR */}
      <div className="flex justify-between px-2 py-[2px] bg-[#d4d0c8] border-t text-[11px]">

        <div className="flex gap-3">
          <span>Chars: {chars}</span>
          <span>Lines: {lines}</span>
          <span>Words: {words}</span>

          <span className={saved ? "text-green-700" : "text-red-600"}>
            {saved ? "✔ Saved" : "● Unsaved"}
          </span>
        </div>

        <div>UTF-8 &nbsp; Windows (CRLF)</div>
      </div>

    </div>
  )
}