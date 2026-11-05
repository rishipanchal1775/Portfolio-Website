import projects from "../data/projects"

export default function Projects() {
  return (
    <div className="flex h-full min-w-0 flex-col bg-[#ECE9D8] text-[12px] text-black @container">
      <div className="flex flex-wrap gap-x-4 gap-y-1 border-b border-gray-500 bg-[#D4D0C8] px-3 py-[3px]">
        <span>File</span><span>Edit</span><span>View</span><span>Tools</span><span>Help</span>
      </div>

      <div className="flex min-w-0 items-center gap-2 border-b border-gray-500 bg-[#ECE9D8] px-2 py-1">
        <button className="xp-btn px-2" aria-label="Back">◀</button>
        <button className="xp-btn px-2" aria-label="Forward">▶</button>
        <div className="min-w-0 flex-1 truncate border border-gray-500 bg-white px-2 py-[2px] text-[11px] shadow-[inset_1px_1px_0_#808080,inset_-1px_-1px_0_white]">
          📁 My Computer &gt; Portfolio &gt; Projects
        </div>
      </div>

      <div className="hidden grid-cols-[2fr_1.5fr_1fr_1.2fr] border-b border-gray-500 bg-[#D4D0C8] px-3 py-[3px] text-[11px] font-semibold @md:grid">
        <span>Name</span><span>Category</span><span>Size</span><span>Date Modified</span>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        {projects.map((project) => (
          <button
            key={project.name}
            onDoubleClick={() => window.open(project.link, "_blank", "noopener,noreferrer")}
            onClick={() => {
              if (window.matchMedia("(hover: none)").matches) {
                window.open(project.link, "_blank", "noopener,noreferrer")
              }
            }}
            className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-x-2 border-b border-[#c0c0c0] px-3 py-2 text-left hover:bg-[#cce0ff] @md:grid-cols-[2fr_1.5fr_1fr_1.2fr] @md:py-1"
          >
            <div className="col-span-2 flex min-w-0 items-center gap-2 @md:col-span-1">
              <span className="shrink-0 text-[14px]">{project.icon}</span>
              <div className="min-w-0">
                <p className="truncate font-semibold text-[12px]">{project.name}</p>
                <p className="text-[10px] text-gray-700">{project.description}</p>
              </div>
            </div>
            <span className="hidden items-center text-[11px] @md:flex">{project.category}</span>
            <span className="hidden items-center text-[11px] @md:flex">{project.size}</span>
            <span className="hidden items-center text-[11px] @md:flex">{project.date}</span>
            <span className="col-span-2 flex gap-3 text-[10px] text-gray-700 @md:hidden">
              <span>{project.category}</span><span>{project.size}</span><span>{project.date}</span>
            </span>
          </button>
        ))}
      </div>

      <div className="flex justify-between border-t border-gray-500 bg-[#D4D0C8] px-3 py-[2px] text-[11px]">
        <span>{projects.length} object(s)</span>
        <span>Portfolio Explorer</span>
      </div>
    </div>
  )
}
