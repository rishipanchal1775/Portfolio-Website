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
      className="flex h-dvh w-screen items-center justify-center overflow-hidden bg-cover bg-center px-3"
      style={{ backgroundImage: "url('/wallpapers/login.png')" }}
    >

      {/* 🟦 LOGIN CARD */}
      <div
        className="
        flex max-w-full items-center gap-3 px-3 py-4 mt-8 sm:mt-40 sm:gap-4 sm:px-5

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
          h-12 w-12 shrink-0 flex items-center justify-center sm:h-16 sm:w-16

          bg-[#3f6ed8]

          border
          border-t-[#9db9ff]
          border-l-[#9db9ff]
          border-r-[#1f3c88]
          border-b-[#1f3c88]
          "
        >
          <img src="/icons/profile.png" className="h-full w-full" />
        </div>

        {/* RIGHT SIDE */}
        <div className="min-w-0 flex-1 flex flex-col">

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
              h-[26px] w-32 min-w-0 sm:w-[200px]
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