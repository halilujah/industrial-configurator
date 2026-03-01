import { Canvas } from '@react-three/fiber'
import { Scene } from './components/Scene'
import { ConfigPanel } from './components/ConfigPanel'
import { useConfigStore } from './store'

export function App() {
  const autoRotate = useConfigStore((s) => s.autoRotate)

  return (
    <>
      <ConfigPanel />
      <div style={{ flex: 1, position: 'relative' }}>
        <Canvas
          camera={{ position: [5, 3, 5], fov: 45 }}
          shadows
          gl={{ antialias: true, alpha: false }}
          style={{ background: '#0a0a0f' }}
        >
          <Scene autoRotate={autoRotate} />
        </Canvas>
        <div
          style={{
            position: 'absolute',
            bottom: 16,
            left: 16,
            fontSize: 11,
            color: '#555',
            userSelect: 'none',
          }}
        >
          Drag to orbit &middot; Scroll to zoom
        </div>
      </div>
    </>
  )
}
