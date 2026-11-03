import apps from "../../data/apps"
import DesktopIcon from "../Icons/DesktopIcon"

export default function DesktopIcons() {
  return (
    <div className="absolute left-2 right-2 top-2 z-0 grid grid-cols-3 gap-1 sm:left-4 sm:right-auto sm:top-4 sm:grid-flow-col sm:grid-cols-none sm:grid-rows-5 sm:gap-x-8 sm:gap-y-6 max-sm:top-6">
      {apps.map((app) => (
        <DesktopIcon
          key={app.id}
          icon={app.icon}
          name={app.name}
          app={app}
        />
      ))}
    </div>
  )
}
