import { useRef } from 'react'
import { Mesh } from 'three'
import { useFrame } from '@react-three/fiber'

interface Props {
  color: string
  baseHeight: number
  baseDepth: number
}

export function PressureGauge({ color, baseHeight, baseDepth }: Props) {
  const needleRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (needleRef.current) {
      needleRef.current.rotation.z =
        -0.4 + Math.sin(state.clock.elapsedTime * 1.2) * 0.15
    }
  })

  const y = baseHeight / 2 + 0.02

  return (
    <group position={[0, y, baseDepth / 2 - 0.05]}>
      {/* Gauge housing */}
      <mesh castShadow>
        <cylinderGeometry args={[0.2, 0.2, 0.08, 24]} />
        <meshStandardMaterial color={color} metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Gauge face */}
      <mesh position={[0, 0.041, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.17, 32]} />
        <meshStandardMaterial color="#f5f0e8" metalness={0.1} roughness={0.8} />
      </mesh>

      {/* Needle */}
      <mesh
        ref={needleRef}
        position={[0, 0.045, 0]}
        rotation={[-Math.PI / 2, 0, -0.4]}
      >
        <boxGeometry args={[0.12, 0.008, 0.005]} />
        <meshStandardMaterial color="#cc0000" />
      </mesh>

      {/* Center pin */}
      <mesh position={[0, 0.048, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.015, 12]} />
        <meshStandardMaterial color="#333" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Glass cover */}
      <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.18, 32]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transparent
          opacity={0.15}
          metalness={0}
          roughness={0}
          transmission={0.9}
        />
      </mesh>

      {/* Connector stem */}
      <mesh position={[0, -0.08, 0]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 0.12, 8]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  )
}
