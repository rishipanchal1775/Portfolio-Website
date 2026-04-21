import { useState } from "react"

export default function Login({ onLogin }) {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const CORRECT_PASSWORD = "admin123"

  const handleLogin = () => {
    if (password === CORRECT_PASSWORD) {
      onLogin()
    } else {
      setError("Incorrect password. Try again.")
    }
  }

  return (
    <div
      className="w-screen h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/wallpapers/login.png')" }}
    >

      {/* 🟦 LOGIN CARD */}
      <div
        className="
        flex items-center gap-4 px-5 py-4 mt-40

        bg-gradient-to-b from-[#5a7edc] to-[#2f56b3]

        border
        border-t-[#9db9ff]
        border-l-[#9db9ff]
        border-r-[#1f3c88]
        border-b-[#1f3c88]

        shadow-[inset_0_1px_4px_rgba(255,255,255,0.4)]
        "
      >

        {/* 👤 USER ICON */}
        <div
          className="
          w-[64px] h-[64px] flex items-center justify-center

          bg-[#3f6ed8]

          border
          border-t-[#9db9ff]
          border-l-[#9db9ff]
          border-r-[#1f3c88]
          border-b-[#1f3c88]
          "
        >
          <img src="/icons/profile.png" className="w-16 h-16" />
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col">

          {/* USER LABEL */}
          <span className="text-white text-[18px] font-semibold">
            Users
          </span>

          {/* INPUT ROW */}
          <div className="flex items-center mt-1">

            {/* INPUT */}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              placeholder="Enter password"
              className="
              w-[200px] h-[26px]
              px-2 text-[12px]

              bg-white outline-none

              border
              border-t-[#808080]
              border-l-[#808080]
              border-r-white
              border-b-white
              "
            />

            {/* ➡ XP BUTTON */}
            <button
              onClick={handleLogin}
              className="
              ml-2 w-[28px] h-[26px] flex items-center justify-center

              bg-gradient-to-b from-[#f3f3f3] to-[#d6d6d6]

              border
              border-t-white
              border-l-white
              border-r-[#7a7a7a]
              border-b-[#7a7a7a]

              active:border-t-[#7a7a7a]
              active:border-l-[#7a7a7a]
              active:border-r-white
              active:border-b-white
              "
            >
              <img src="/icons/arrow.png" className="w-4" />
            </button>

          </div>

          {/* HINT */}
          <span className="text-[10px] mt-1 text-[#d6e3ff]">
            Hint: admin123
          </span>

          {/* ERROR */}
          {error && (
            <span className="text-[10px] mt-1 text-[#ffb3b3]">
              {error}
            </span>
          )}

        </div>
      </div>

    </div>
  )
}