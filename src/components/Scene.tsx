import { OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import { Assembly } from './Assembly'

interface SceneProps {
  autoRotate: boolean
}

export function Scene({ autoRotate }: SceneProps) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[8, 12, 5]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight position={[-5, 5, -5]} intensity={0.4} />

      <Assembly />

      <ContactShadows
        position={[0, -0.01, 0]}
        opacity={0.6}
        scale={12}
        blur={2.5}
        far={4}
      />

      <gridHelper args={[20, 40, '#1a1a2e', '#12121a']} />

      <Environment preset="warehouse" />

      <OrbitControls
        autoRotate={autoRotate}
        autoRotateSpeed={0.8}
        enablePan={false}
        minDistance={3}
        maxDistance={15}
        minPolarAngle={0.2}
        maxPolarAngle={Math.PI / 2 - 0.05}
      />
    </>
  )
}
