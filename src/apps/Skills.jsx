import useWindowStore from "../store/windowStore"
import apps from "../data/apps"

export default function Skills() {

    const projectApp = apps.find(a => a.id === "projects")
    const contactApp = apps.find(a => a.id === "contact")

    const openWindow = useWindowStore(state => state.openWindow)

    const coreTech = [
        "React", "Next.js", "Node.js", "REST API",
        "MongoDB"
    ]

    const highlights = [
        {
            title: "Web Development",
            desc: "Built scalable web apps using MERN & modern frameworks"
        }
    ]

    return (
        <div className="w-full h-full flex flex-col bg-[#ECE9D8] text-black text-[12px]">

            {/* 🟦 MENU BAR */}
            <div className="flex gap-5 px-3 py-[3px] bg-[#D4D0C8] border-b border-gray-500">
                <span>File</span>
                <span>Edit</span>
                <span>View</span>
                <span>Tools</span>

                <div className="ml-auto flex gap-5">
                    <span
                        className="cursor-pointer hover:underline"
                        onClick={() => openWindow(projectApp)}
                    >
                        Projects
                    </span>

                    <span
                        className="cursor-pointer hover:underline"
                        onClick={() => openWindow(contactApp)}
                    >
                        Contact
                    </span>
                </div>
            </div>

            {/* 📂 TOOLBAR */}
            <div className="flex items-center gap-2 px-2 py-1 bg-[#ECE9D8] border-b border-gray-500">

                <button className="xp-btn px-2">◀</button>
                <button className="xp-btn px-2">▶</button>

                <div className="flex-1 px-2 py-[2px] bg-white border border-gray-500 
                shadow-[inset_1px_1px_0_#808080,inset_-1px_-1px_0_white] text-[11px]">
                    📁 My Computer &gt; Portfolio &gt; Skills
                </div>

                <button className="xp-btn px-2">⟳</button>
            </div>

            {/* 📦 CONTENT */}
            <div className="flex-1 overflow-y-auto p-4 space-y-5">

                {/* HEADER PANEL */}
                <div className="border border-gray-500 bg-[#ECE9D8] 
                shadow-[inset_1px_1px_0_white,inset_-1px_-1px_0_#808080] p-3">

                    <p className="font-bold text-[14px] mb-1">
                        Technical Skills & Expertise
                    </p>

                    <p className="text-[11px] text-gray-700">
                        Full Stack Developer focused on building practical and scalable applications.
                    </p>
                </div>

                {/* CORE TECH PANEL */}
                <div className="border border-gray-500 bg-[#ECE9D8] 
                shadow-[inset_1px_1px_0_white,inset_-1px_-1px_0_#808080] p-3">

                    <p className="font-semibold mb-2">
                        ⚡ Core Technologies
                    </p>

                    <div className="flex flex-wrap gap-2">
                        {coreTech.map((tech, i) => (
                            <span
                                key={i}
                                className="px-2 py-[2px] bg-[#D4D0C8] border border-gray-500 text-[11px]"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                {/* EXPERIENCE PANEL */}
                <div className="border border-gray-500 bg-[#ECE9D8] 
                shadow-[inset_1px_1px_0_white,inset_-1px_-1px_0_#808080] p-3">

                    <p className="font-semibold mb-2">
                        🚀 Experience Highlights
                    </p>

                    {highlights.map((item, i) => (
                        <div key={i} className="mb-2">
                            <p className="font-semibold text-[12px]">
                                {item.title}
                            </p>
                            <p className="text-[11px] text-gray-700">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>

            </div>

            {/* 📊 STATUS BAR */}
            <div className="flex justify-between px-3 py-[2px] bg-[#D4D0C8] border-t border-gray-500 text-[11px]">

                <span>Skills Overview</span>

                <div className="flex gap-4">
                    <span
                        className="cursor-pointer hover:underline"
                        onClick={() => openWindow(projectApp)}
                    >
                        View Projects
                    </span>

                    <span
                        className="cursor-pointer hover:underline"
                        onClick={() => openWindow(contactApp)}
                    >
                        Contact
                    </span>
                </div>

            </div>

        </div>
    )
}