import { useState } from "react"
import useWindowStore from "../store/windowStore"
import apps from "../data/apps"

export default function Contact() {
  const [activeTab, setActiveTab] = useState("info")
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState("")

  const openWindow = useWindowStore((s) => s.openWindow)

  const openAppByName = (name) => {
    const app = apps.find((a) => a.name === name)
    if (app) openWindow(app)
  }

  const links = {
    linkedin: "https://www.linkedin.com/in/rishi-panchal",
    github: "https://github.com/rishipanchal1775",
    portfolio: "https://your-portfolio.vercel.app",
    email: "rishipanchalbca39a@gmail.com"
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus("")

    const formData = new FormData(e.target)

    formData.append("access_key", import.meta.env.VITE_WEB3FORMS_ACCESS_KEY)
    formData.append("subject", "Portfolio Message")

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      })

      const data = await res.json()

      if (data.success) {
        setStatus("Message sent successfully")
        e.target.reset()
      } else {
        setStatus("Failed to send")
      }
    } catch {
      setStatus("Error sending message")
    }

    setLoading(false)
  }

  return (
    <div className="flex h-full min-w-0 flex-col bg-[#ECE9D8] text-[12px] text-black @container">

      {/* 🟦 MENU BAR */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 px-3 py-[3px] bg-[#D4D0C8] border-b border-gray-500">
        <span>File</span>
        <span>Edit</span>
        <span>View</span>
        <span>Tools</span>
        <span>Help</span>
      </div>

      {/* 📂 TOOLBAR */}
      <div className="flex min-w-0 items-center gap-2 px-2 py-1 bg-[#ECE9D8] border-b border-gray-500">

        <button className="xp-btn px-2">◀</button>
        <button className="xp-btn px-2">▶</button>

        <div className="min-w-0 flex-1 truncate px-2 py-[2px] bg-white border border-gray-500 
        shadow-[inset_1px_1px_0_#808080,inset_-1px_-1px_0_white] text-[11px]">
          📁 My Computer &gt; Portfolio &gt; Contact
        </div>

      </div>

      {/* 🧭 TABS */}
      <div className="flex min-w-0 overflow-x-auto border-b border-gray-500 bg-[#D4D0C8]">

        <button
          onClick={() => setActiveTab("info")}
          className={`px-3 py-[3px] border-r border-gray-500 
          ${activeTab === "info"
              ? "bg-white font-semibold"
              : "bg-[#D4D0C8]"
            }`}
        >
          Contact Information
        </button>

        <button
          onClick={() => setActiveTab("message")}
          className={`px-3 py-[3px] 
          ${activeTab === "message"
              ? "bg-white font-semibold"
              : "bg-[#D4D0C8]"
            }`}
        >
          Send Message
        </button>

      </div>

      {/* MAIN */}
      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden @md:flex-row">

        {/* 🧱 SIDEBAR */}
        <div className="max-h-24 w-full shrink-0 overflow-y-auto border-b border-gray-500 bg-[#ECE9D8] p-2 @md:max-h-none @md:w-[180px] @md:border-b-0 @md:border-r">

          <div>
            <p className="font-semibold mb-1">Navigation</p>

            <div className="space-y-1">
              <div onClick={() => openAppByName("Resume")} className="cursor-pointer hover:bg-blue-100 px-1">About Me</div>
              <div onClick={() => openAppByName("Resume")} className="cursor-pointer hover:bg-blue-100 px-1">Experience</div>
              <div onClick={() => openAppByName("Projects")} className="cursor-pointer hover:bg-blue-100 px-1">Projects</div>
              <div onClick={() => openAppByName("Resume")} className="cursor-pointer hover:bg-blue-100 px-1">Education</div>
            </div>
          </div>

          <div>
            <p className="font-semibold mb-1">Quick Actions</p>

            <div className="space-y-1">
              <div onClick={() => openAppByName("Resume")} className="cursor-pointer hover:bg-blue-100 px-1">
                View Resume
              </div>

              <div onClick={() => setActiveTab("message")} className="cursor-pointer hover:bg-blue-100 px-1">
                Send Message
              </div>
            </div>
          </div>

        </div>

        {/* 📄 CONTENT */}
        <div className="min-h-0 min-w-0 flex-1 overflow-y-auto p-3 sm:p-4">

          {/* INFO TAB */}
          {activeTab === "info" && (
            <div className="space-y-4">

              {/* HEADER */}
              <div className="border border-gray-500 bg-[#ECE9D8] 
              shadow-[inset_1px_1px_0_white,inset_-1px_-1px_0_#808080] p-3">

                <p className="font-bold text-[13px]">Rishi Panchal</p>
                <p className="text-[11px] text-gray-700">Web Developer</p>

              </div>

              {/* DETAILS */}
              <div className="border border-gray-500 bg-white p-3">

                <p className="break-all"><b>Email:</b> {links.email}</p>
                <p><b>Phone:</b> +91-9313386032</p>

              </div>

              {/* LINKS */}
              <div className="border border-gray-500 bg-white p-3">

                <p className="font-semibold mb-1">Online Presence</p>

                <a href={links.linkedin} target="_blank" className="block text-blue-700 underline">LinkedIn</a>
                <a href={links.github} target="_blank" className="block text-blue-700 underline">GitHub</a>
                <a href={links.portfolio} target="_blank" className="block text-blue-700 underline">Portfolio</a>

              </div>

            </div>
          )}

          {/* MESSAGE TAB */}
          {activeTab === "message" && (
            <div className="space-y-4">

              <form onSubmit={handleSubmit} className="border border-gray-500 bg-white p-3 space-y-2">

                <input name="name" placeholder="Name" required className="w-full border border-gray-500 px-2 py-[2px]" />

                <input name="email" type="email" placeholder="Email" required className="w-full border border-gray-500 px-2 py-[2px]" />

                <textarea name="message" placeholder="Message" required className="w-full border border-gray-500 px-2 py-[2px]" />

                <button className="xp-btn px-3 py-[2px]">
                  {loading ? "Sending..." : "Send"}
                </button>

                {status && <p className="text-[11px]">{status}</p>}

              </form>

              <div className="border border-gray-500 bg-[#ECE9D8] p-3 text-[11px]">
                <p>Alternative:</p>
                <a href={`mailto:${links.email}`} className="block underline">Email</a>
                <a href={links.linkedin} target="_blank" className="block underline">LinkedIn</a>
                <a href={links.github} target="_blank" className="block underline">GitHub</a>
              </div>

            </div>
          )}

        </div>

      </div>

      {/* 📊 STATUS BAR */}
      <div className="px-3 py-[2px] bg-[#D4D0C8] border-t border-gray-500 text-[11px]">
        Contact Manager Ready
      </div>

    </div>
  )
}