import { create } from "zustand"

const STORAGE_KEY = "xp_windows_state"

const loadState = () => {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY)) || {
      windows: [],
      cascadeIndex: 0,
      highestZ: 1,
    }
  } catch {
    return {
      windows: [],
      cascadeIndex: 0,
      highestZ: 1,
    }
  }
}

const saveState = (state) => {
  sessionStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      windows: state.windows,
      cascadeIndex: state.cascadeIndex,
      highestZ: state.highestZ,
    })
  )
}

const useWindowStore = create((set, get) => ({
  ...loadState(),
  selectedApp: null,

  selectApp: (id) => set({ selectedApp: id }),
  clearSelection: () => set({ selectedApp: null }),

  // 🔥 OPEN WINDOW WITH MEMORY
  openWindow: (app) => {
    const existing = get().windows.find(w => w.id === app.id)

    if (existing) {
      get().focusWindow(app.id)
      return
    }

    const index = get().cascadeIndex

    const MAX_ROWS = 6
    const MAX_COLS = 2
    const STEP = 28
    const COL_WIDTH = 260

    const baseX = 120
    const baseY = 80

    const col = Math.floor(index / MAX_ROWS) % MAX_COLS
    const row = index % MAX_ROWS

    const x = baseX + col * COL_WIDTH + row * STEP
    const y = baseY + row * STEP

    const newZ = get().highestZ + 1

    set(state => {
      const newState = {
        windows: [
          ...state.windows,
          {
            ...app,
            x,
            y,
            width: 600,
            height: 400,
            isMinimized: false,
            isMaximized: false,
            zIndex: newZ,
          }
        ],
        cascadeIndex: (index + 1) % (MAX_ROWS * MAX_COLS),
        highestZ: newZ,
      }

      saveState(newState)
      return newState
    })
  },

  // 🔥 UPDATE WINDOW (IMPORTANT)
  updateWindow: (id, updates) => {
    set(state => {
      const newState = {
        ...state,
        windows: state.windows.map(w =>
          w.id === id ? { ...w, ...updates } : w
        )
      }
      saveState(newState)
      return newState
    })
  },

  focusWindow: (id) => {
    const newZ = get().highestZ + 1

    set(state => {
      const newState = {
        ...state,
        windows: state.windows.map(w =>
          w.id === id ? { ...w, zIndex: newZ } : w
        ),
        highestZ: newZ,
      }
      saveState(newState)
      return newState
    })
  },

  closeWindow: (id) => {
    set(state => {
      const newState = {
        ...state,
        windows: state.windows.filter(w => w.id !== id)
      }
      saveState(newState)
      return newState
    })
  },

  toggleMaximize: (id) => {
    set(state => {
      const newState = {
        ...state,
        windows: state.windows.map(w =>
          w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
        )
      }
      saveState(newState)
      return newState
    })
  },

  toggleMinimize: (id) => {
    set(state => {
      const newState = {
        ...state,
        windows: state.windows.map(w =>
          w.id === id ? { ...w, isMinimized: !w.isMinimized } : w
        )
      }
      saveState(newState)
      return newState
    })
  },

  clearAll: () => {
    sessionStorage.removeItem(STORAGE_KEY)
    set({
      windows: [],
      cascadeIndex: 0,
      highestZ: 1,
      selectedApp: null,
    })
  }
}))

export default useWindowStore
