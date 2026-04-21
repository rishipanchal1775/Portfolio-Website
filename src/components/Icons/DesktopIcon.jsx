import useWindowStore from "../../store/windowStore"

export default function DesktopIcon({ icon, name, app }) {
  const openWindow = useWindowStore(state => state.openWindow)
  const selectApp = useWindowStore(state => state.selectApp)
  const selectedApp = useWindowStore(state => state.selectedApp)

  const isSelected = selectedApp === app.id

  return (
    <div
      onClick={(e) => {
        e.stopPropagation()
        selectApp(app.id)
      }}
      onDoubleClick={(e) => {
        e.stopPropagation()
        openWindow(app)
      }}
      className={`
        group flex flex-col items-center cursor-pointer select-none
        p-2 rounded-xl transition-all duration-200

        ${isSelected
          ? "bg-blue-500 backdrop-blur-lg"
          : "hover:bg-white/10 hover:backdrop-blur-md"}
      `}
    >
      <div className="w-14 h-14 flex items-center justify-center">
        <img
          src={icon}
          alt={name}
          className="w-10 h-10 object-contain pointer-events-none"
        />
      </div>

      <p
        className={`
          mt-1 text-xs text-center px-1 transition-colors duration-200
          ${isSelected
            ? "text-black"
            : "text-white group-hover:text-black"}`}>
        {name}
      </p>
    </div>
  )
}