import { useState } from "react"

export default function StartMenu({ onLogout }) {
  const [open, setOpen] = useState(false)

  // ✅ XP BUTTON STYLE (reusable)
  const xpBtn =
    "px-2 py-[2px] text-sm bg-[#ECE9D8] border border-t-white border-l-white border-r-gray-500 border-b-gray-500 hover:bg-blue-100 active:border-t-gray-500 active:border-l-gray-500 active:border-r-white active:border-b-white transition"

  return (
    <div className="relative">

      {/* 🟢 START BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-[3px] ml-5 text-white text-sm font-semibold
        bg-gradient-to-b from-green-400 to-green-700
        border border-green-900
        shadow-[inset_0_1px_2px_rgba(255,255,255,0.4)]
        active:scale-95 transition"
      >
        <img src="/icons/start.png" className="w-5 h-4" />
        Start
      </button>

      {/* 🟦 START MENU */}
      {open && (
        <div className="absolute ml-5 bottom-12 left-0 w-[300px] h-[420px]
        bg-[#ECE9D8]
        border border-t-white border-l-white border-r-gray-500 border-b-gray-500
        shadow-xl overflow-hidden">

          <div className="flex h-full">

            {/* 🔵 LEFT XP STRIP */}
            <div className="w-10 bg-gradient-to-b from-[#245edb] to-[#0c2c84] flex items-center justify-center">
              <div className="rotate-[-90deg] flex items-center gap-1">
                <span className="text-white shadow-2xl font-bold text-sm">Windows</span>
                <span className="text-orange-400 shadow-2xl font-bold text-sm">XP</span>
              </div>
            </div>

            {/* 🟡 RIGHT PANEL */}
            <div className="flex-1 flex flex-col">

              {/* 👤 PROFILE */}
              <div className="px-2 py-1 border-b border-gray-400 flex items-center gap-2 bg-[#d6d3ce]">
                <img src="/icons/profile.png" className="w-10 h-9" />
                <div>
                  <p className="text-sm font-semibold text-black">
                    Rishi Panchal
                  </p>
                  <p className="text-[11px] text-gray-700">
                    Web Developer
                  </p>
                </div>
              </div>

              {/* 📂 APPS LIST */}
              <div className="flex-1 px-2 py-2 space-y-[2px] text-sm text-black">

                <button className={`w-full flex items-center gap-2 ${xpBtn}`}>
                  <img src="/icons/browser.png" className="w-4 h-4" />
                  Internet
                </button>

                <button className={`w-full flex items-center gap-2 ${xpBtn}`}>
                  <img src="/icons/email.png" className="w-4 h-4" />
                  E-mail
                </button>

              </div>

              {/* 🔻 FOOTER */}
              <div className="px-2 py-2 border-t border-gray-400 flex justify-end bg-[#d6d3ce]">

                <button
                  onClick={() => {
                    setOpen(false)
                    setTimeout(() => onLogout(), 1500)
                  }}
                  className="flex items-center gap-2 px-3 py-[3px] text-sm
                  bg-[#ECE9D8] text-orange-600
                  border border-t-white border-l-white border-r-gray-500 border-b-gray-500
                  hover:bg-orange-200
                  active:border-t-gray-500 active:border-l-gray-500 active:border-r-white active:border-b-white
                  transition"
                >
                  <span className="text-orange-600">⏻</span>
                  Turn Off Computer
                </button>

              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  )
}