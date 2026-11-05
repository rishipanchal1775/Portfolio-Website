import { useState } from "react"
import useWindowStore from "../store/windowStore"
import { getAppById } from "../data/apps"
import contact from "../data/contact"

export default function Contact() {
  const [activeTab, setActiveTab] = useState("info")
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState("")

  const openWindow = useWindowStore((s) => s.openWindow)

  const openAppById = (id) => {
    const app = getAppById(id)
    if (app) openWindow(app)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus("")

    const formData = new FormData(e.target)

    formData.append("access_key", import.meta.env.VITE_WEB3FORMS_ACCESS_KEY)
    formData.append("subject", contact.form.subject)

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      })

      const data = await res.json()

      if (data.success) {
        setStatus(contact.messages.sent)
        e.target.reset()
      } else {
        setStatus(contact.messages.failed)
      }
    } catch {
      setStatus(contact.messages.error)
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

        {contact.tabs.map((tab, index) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 py-[3px] ${index === 0 ? "border-r border-gray-500" : ""}
            ${activeTab === tab.id ? "bg-white font-semibold" : "bg-[#D4D0C8]"}`}
          >
            {tab.label}
          </button>
        ))}

      </div>

      {/* MAIN */}
      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden @md:flex-row">

        {/* 🧱 SIDEBAR */}
        <div className="max-h-24 w-full shrink-0 overflow-y-auto border-b border-gray-500 bg-[#ECE9D8] p-2 @md:max-h-none @md:w-[180px] @md:border-b-0 @md:border-r">

          <div>
            <p className="font-semibold mb-1">{contact.navigation.title}</p>

            <div className="space-y-1">
              {contact.navigation.items.map((item) => (
                <div key={item.label} onClick={() => openAppById(item.appId)} className="cursor-pointer hover:bg-blue-100 px-1">
                  {item.label}
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="font-semibold mb-1">{contact.quickActions.title}</p>

            <div className="space-y-1">
              {contact.quickActions.items.map((item) => (
                <div
                  key={item.label}
                  onClick={() => item.appId ? openAppById(item.appId) : setActiveTab(item.tabId)}
                  className="cursor-pointer hover:bg-blue-100 px-1"
                >
                  {item.label}
                </div>
              ))}
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

                <p className="font-bold text-[13px]">{contact.person.name}</p>
                <p className="text-[11px] text-gray-700">{contact.person.title}</p>

              </div>

              {/* DETAILS */}
              <div className="border border-gray-500 bg-white p-3">

                <p className="break-all"><b>Email:</b> {contact.person.email}</p>
                <p><b>Phone:</b> {contact.person.phone}</p>

              </div>

              {/* LINKS */}
              <div className="border border-gray-500 bg-white p-3">

                <p className="font-semibold mb-1">{contact.labels.onlinePresence}</p>

                <a href={contact.links.linkedin} target="_blank" className="block text-blue-700 underline">LinkedIn</a>
                <a href={contact.links.github} target="_blank" className="block text-blue-700 underline">GitHub</a>
                <a href={contact.links.portfolio} target="_blank" className="block text-blue-700 underline">Portfolio</a>

              </div>

            </div>
          )}

          {/* MESSAGE TAB */}
          {activeTab === "message" && (
            <div className="space-y-4">

              <form onSubmit={handleSubmit} className="border border-gray-500 bg-white p-3 space-y-2">

                {contact.form.fields.map((field) => field.type === "textarea" ? (
                  <textarea key={field.name} name={field.name} placeholder={field.placeholder} required className="w-full border border-gray-500 px-2 py-[2px]" />
                ) : (
                  <input key={field.name} name={field.name} type={field.type} placeholder={field.placeholder} required className="w-full border border-gray-500 px-2 py-[2px]" />
                ))}

                <button className="xp-btn px-3 py-[2px]">
                  {loading ? contact.form.sendingLabel : contact.form.sendLabel}
                </button>

                {status && <p className="text-[11px]">{status}</p>}

              </form>

              <div className="border border-gray-500 bg-[#ECE9D8] p-3 text-[11px]">
                <p>{contact.labels.alternative}</p>
                <a href={`mailto:${contact.person.email}`} className="block underline">{contact.labels.email}</a>
                <a href={contact.links.linkedin} target="_blank" className="block underline">LinkedIn</a>
                <a href={contact.links.github} target="_blank" className="block underline">GitHub</a>
              </div>

            </div>
          )}

        </div>

      </div>

      {/* 📊 STATUS BAR */}
      <div className="px-3 py-[2px] bg-[#D4D0C8] border-t border-gray-500 text-[11px]">
        {contact.labels.ready}
      </div>

    </div>
  )
}
