import React from "react"

const projects = [
  {
    name: "SteadFast AI",
    description: "An AI Saas App with multiple AI features.",
    category: "AI Saas App",
    size: "5 MB",
    date: "Dec , 2025",
    icon: "🤖",
    link: "https://github.com/rishipanchal1775",
  },
  {
    name: "Agency AI",
    description: "A frontend dynamic and responsive marketing website.",
    category: "Frontend Website",
    size: "5 MB",
    date: "Mar, 2026",
    icon: "📋",
    link: "https://github.com/rishipanchal1775",
  }
]

export default function Projects() {
  return (
    <div className="flex flex-col h-full text-[12px] bg-[#ECE9D8] text-black">

      {/* 🟦 MENU BAR */}
      <div className="flex gap-5 px-3 py-[3px] bg-[#D4D0C8] border-b border-gray-500">
        <span className="cursor-default">File</span>
        <span className="cursor-default">Edit</span>
        <span className="cursor-default">View</span>
        <span className="cursor-default">Tools</span>
        <span className="cursor-default">Help</span>
      </div>

      {/* 📂 TOOLBAR */}
      <div className="flex items-center gap-2 px-2 py-1 bg-[#ECE9D8] border-b border-gray-500">

        {/* XP BUTTONS */}
        <button className="xp-btn px-2">◀</button>
        <button className="xp-btn px-2">▶</button>

        {/* PATH BAR */}
        <div className="flex-1 px-2 py-[2px] bg-white border border-gray-500 shadow-[inset_1px_1px_0_#808080,inset_-1px_-1px_0_white] text-[11px]">
          📁 My Computer &gt; Portfolio &gt; Projects
        </div>

        <button className="xp-btn px-2">⬜</button>
      </div>

      {/* 📊 HEADER */}
      <div className="grid grid-cols-[2fr_1.5fr_1fr_1.2fr] px-3 py-[3px] bg-[#D4D0C8] border-b border-gray-500 font-semibold text-[11px]">
        <span>Name</span>
        <span>Category</span>
        <span>Size</span>
        <span>Date Modified</span>
      </div>

      {/* 📁 LIST */}
      <div className="flex-1 overflow-y-auto">

        {projects.map((proj, index) => (
          <div
            key={index}
            onDoubleClick={() => window.open(proj.link, "_blank")}
            className="grid grid-cols-[2fr_1.5fr_1fr_1.2fr] px-3 py-1 border-b border-[#c0c0c0] hover:bg-[#cce0ff] cursor-default"
          >

            {/* NAME */}
            <div className="flex items-center gap-2">
              <span className="text-[14px]">{proj.icon}</span>

              <div>
                <p className="font-semibold text-[12px]">{proj.name}</p>
                <p className="text-[10px] text-gray-700">{proj.description}</p>
              </div>
            </div>

            {/* CATEGORY */}
            <span className="flex items-center text-[11px]">
              {proj.category}
            </span>

            {/* SIZE */}
            <span className="flex items-center text-[11px]">
              {proj.size}
            </span>

            {/* DATE */}
            <span className="flex items-center text-[11px]">
              {proj.date}
            </span>

          </div>
        ))}

      </div>

      {/* STATUS BAR */}
      <div className="flex justify-between px-3 py-[2px] text-[11px] bg-[#D4D0C8] border-t border-gray-500">
        <span>{projects.length} object(s)</span>
        <span>Portfolio Explorer</span>
      </div>

    </div>
  )
}