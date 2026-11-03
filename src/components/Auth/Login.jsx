import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

export default function Login({ onLogin }) {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const CORRECT_PASSWORD = "password123"

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
        flex max-w-full items-center gap-3 px-3 py-4 mt-8 sm:mt-40 sm:gap-4 sm:px-5 max-sm:mt-40 max-sm:gap-3 max-sm:px-4 max-sm:py-3

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
            <div className="relative min-w-0">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                placeholder="Enter password"
                className="
                h-[26px] w-32 min-w-0
                pl-2 pr-7 text-[12px] sm:w-[200px]

                bg-white outline-none

                border
                border-t-[#808080]
                border-l-[#808080]
                border-r-white
                border-b-white
                "
              />
              <button
                type="button"
                onClick={() => setShowPassword((visible) => !visible)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
                className="absolute right-1 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center text-[#555]"
              >
                {showPassword ? <EyeOff size={14} aria-hidden="true" /> : <Eye size={14} aria-hidden="true" />}
              </button>
            </div>

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
            Hint: password123
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
