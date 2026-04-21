import apps from "../../data/apps"
import DesktopIcon from "../Icons/DesktopIcon"

export default function DesktopIcons() {
  return (
    <div className="absolute top-4 left-4 grid grid-flow-col grid-rows-5 gap-x-8 gap-y-6">
      {apps.map((app, index) => (
        <DesktopIcon
          key={app.id + index}
          icon={app.icon}
          name={app.name}
          app={app}
        />
      ))}
    </div>
  )
}