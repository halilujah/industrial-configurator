import { create } from 'zustand'

export type MaterialFinish = 'steel' | 'copper' | 'matte-black' | 'industrial-blue'

export interface ModuleConfig {
  enabled: boolean
}

export interface ConfigState {
  // Assembly parameters
  baseWidth: number
  baseDepth: number
  baseHeight: number
  pipeRadius: number
  pipeSegments: number

  // Material
  finish: MaterialFinish

  // Modules
  modules: {
    intakeValve: ModuleConfig
    exhaustPort: ModuleConfig
    pressureGauge: ModuleConfig
    coolingFins: ModuleConfig
  }

  // Camera
  autoRotate: boolean

  // Actions
  setBaseWidth: (v: number) => void
  setBaseDepth: (v: number) => void
  setBaseHeight: (v: number) => void
  setPipeRadius: (v: number) => void
  setPipeSegments: (v: number) => void
  setFinish: (f: MaterialFinish) => void
  toggleModule: (key: keyof ConfigState['modules']) => void
  setAutoRotate: (v: boolean) => void
  resetConfig: () => void
}

const DEFAULT_STATE = {
  baseWidth: 2,
  baseDepth: 1.2,
  baseHeight: 1.2,
  pipeRadius: 0.25,
  pipeSegments: 3,
  finish: 'steel' as MaterialFinish,
  modules: {
    intakeValve: { enabled: true },
    exhaustPort: { enabled: true },
    pressureGauge: { enabled: false },
    coolingFins: { enabled: false },
  },
  autoRotate: true,
}

export const useConfigStore = create<ConfigState>((set) => ({
  ...DEFAULT_STATE,

  setBaseWidth: (v) => set({ baseWidth: v }),
  setBaseDepth: (v) => set({ baseDepth: v }),
  setBaseHeight: (v) => set({ baseHeight: v }),
  setPipeRadius: (v) => set({ pipeRadius: v }),
  setPipeSegments: (v) => set({ pipeSegments: v }),
  setFinish: (f) => set({ finish: f }),
  toggleModule: (key) =>
    set((state) => ({
      modules: {
        ...state.modules,
        [key]: { enabled: !state.modules[key].enabled },
      },
    })),
  setAutoRotate: (v) => set({ autoRotate: v }),
  resetConfig: () => set(DEFAULT_STATE),
}))

export const FINISH_COLORS: Record<MaterialFinish, string> = {
  steel: '#b0b0b8',
  copper: '#c87533',
  'matte-black': '#1a1a1a',
  'industrial-blue': '#2a5c8a',
}
