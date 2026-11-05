import appComponents from "../../apps/appComponents"
import useWindowStore from "../../store/windowStore"
import Window from "./Window"

export default function WindowManager() {
  const windows = useWindowStore(state => state.windows)

  return (
    <>
      {windows.map((win) => {
        const Component = appComponents[win.id]
        if (!Component) return null

        return (
          <Window
            key={win.id}
            win={win}
            Component={Component}
          />
        )
      })}
    </>
  )
}
