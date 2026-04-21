import apps from "../../data/apps"
import useWindowStore from "../../store/windowStore"
import Window from "./Window"

export default function WindowManager() {
  const windows = useWindowStore(state => state.windows)

  return (
    <>
      {windows.map((win) => {
        // 🔥 reconnect window with real app config
        const appConfig = apps.find(a => a.id === win.id)

        if (!appConfig) return null

        return (
          <Window
            key={win.id}
            win={win}
            app={appConfig}
          />
        )
      })}
    </>
  )
}